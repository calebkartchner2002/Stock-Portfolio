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
def makeTrade(request : HttpRequest):
    user = model_to_dict(request.user)["email"]
    params = request.GET
    tickerAdd = params.get("tickerAdd")
    sharesAdd = params.get("sharesAdd")
    response = client.get_previous_close_agg(ticker=tickerAdd)[0]
    close = response.close
    data = Trade.objects.filter(user=user)
    if not (data):
        trade = Trade(
            ticker=tickerAdd,
            shares=sharesAdd,  
            priceWhenBought=close,
            user=user)
        trade.save()
    else:
        dataShares = 0
        for i in data:
            dataShares += i.shares
        data.delete()
        shares = int(sharesAdd) + int(dataShares)
        trade = Trade(
            ticker=tickerAdd,
            shares=shares,
            priceWhenBought=close,
            user=user)
        trade.save()
    return redirect("/#/portfolio/")
    
@login_required
def removeTrade(request):
    user = model_to_dict(request.user)["email"]
    params = request.GET
    ticker = params.get("tickerRemove")
    shares = params.get("sharesRemove")
    data = Trade.objects.filter(user=user)
    data = data.objects.filter(ticker=ticker)
    if shares < data.shares:
        trade = Trade(
        ticker=ticker,
        shares=data.shares-shares,
        priceWhenBought=data.priceWhenBought,
        user=user)
        trade.save()
    data.delete()
    return redirect("/#/portfolio")
