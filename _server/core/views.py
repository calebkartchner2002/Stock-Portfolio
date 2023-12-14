from django.shortcuts import render, redirect
from django.conf  import settings
import json
import os
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponse, HttpRequest
from django.forms.models import model_to_dict
from polygon import RESTClient
from .models import Trade

api_key = os.environ.get("POLYGON_API_KEY")
client = RESTClient(api_key=api_key)

# Load manifest when server launches
MANIFEST = {}
if not settings.DEBUG:
    f = open(f"{settings.BASE_DIR}/core/static/manifest.json")
    MANIFEST = json.load(f)

# Create your views here.
@login_required
def index(req):
    context = {
        "asset_url": os.environ.get("ASSET_URL", ""),
        "debug": settings.DEBUG,
        "manifest": MANIFEST,
        "js_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["file"],
        "css_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["css"][0]
    }
    return render(req, "core/index.html", context)

@login_required
def me(req):
    return JsonResponse({"user": model_to_dict(req.user)})

@login_required
def getTrade(request : HttpRequest):
    user = model_to_dict(request.user)["email"]
    trades = Trade.objects.filter(user=user)
    trades_list = [model_to_dict(trade) for trade in trades]

    return JsonResponse({'trades': trades_list}, safe=False)

@login_required
def makeTrade(request : HttpRequest):
    user = model_to_dict(request.user)["email"]
    params = request.GET
    tickerAdd = params.get("tickerAdd")
    sharesAdd = params.get("sharesAdd")
    response = client.get_previous_close_agg(ticker=tickerAdd)[0]
    close = response.close
    trade = Trade(
            ticker=tickerAdd,
            shares=sharesAdd,  
            priceWhenBought=close,
            user=user)
    trade.save()
    return redirect("/#/portfolio/")
    
@login_required #Currently broken
def removeTrade(request):
    user = model_to_dict(request.user)["email"]
    params = request.GET
    ticker = params.get("tickerRemove")
    shares = int(params.get("sharesRemove"))
    data = Trade.objects.filter(user=user).filter(ticker=ticker)
    for trade in data:
        dataShares = int(trade.shares)
        if shares < dataShares:
            trade = Trade(
            ticker=ticker,
            shares=dataShares-shares,
            priceWhenBought=data.priceWhenBought,
            user=user)
            trade.save()
        else:
            shares -= dataShares
            data.delete()    
    return redirect("/#/portfolio")
