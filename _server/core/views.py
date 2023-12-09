from django.shortcuts import render
from django.conf  import settings
import json
import os
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.forms.models import model_to_dict
from polygon import RESTClient
from models import Trade
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
def getCloseInformation(req):
    ticker = "AAPL"
    adjusted = "true"
    url = f"https://api.polygon.io/v2/aggs/ticker/{ticker}prev?adjusted={adjusted}&apiKey={api_key}"
    response = RESTClient.get(url)
    print(response)

def makeTrade(req):
    ticker = req.POST["ticker"],
    share = req.POST['shares']
    priceWhenBought = req.POST["price"],
    user = req.POST['user']
    trade = Trade(
        ticker=ticker,
        share=share,
        priceWhenBought=priceWhenBought,
        user=user
    )
    trade.save()
    