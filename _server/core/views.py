from django.shortcuts import render
from django.conf  import settings
import json
import os
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.forms.models import model_to_dict
from polygon import RESTClient
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

# this should (should) get the information about the previous day's close. We can use this information to evaluate the users current portfolio worth.
# Basically, number of stocks (n) multiplied by the value of each share (v). nv = total value of the client's shares in the tickered company
# we can also use this for overall change, where we take the current rate (r) multiplied by the n subtracted by the priceWhenBought*n, rn-pn=overallChange 

# We can use this for our homepage to get the total performace value, our portfolio values, and the value of featured stocks
# We can use this as well in 'buying shares' => putting the number of shares and for what ticker in a database.

# Removing stocks could be difficult because if a user has n stocks and they want to take out k stocks, where k<n, then we can't just delete the database entry.
# What we'll have to do is take the data, manipulate it, delete the entry, then make a new one, if k<n. If k>=n, we can just delete the entry. We might also consider making an error if k>n.

# Our portfolio again will be easy -- we run the following to get the current val per stock using information from the database.

# Database entries will have to look something like:
# id    ticker    shares     priceWhenBought
# 1     AAPL      3          57.49


@login_required
def getCloseInformation(req):
    ticker = "AAPL"
    adjusted = "true"
    url = f"https://api.polygon.io/v2/aggs/ticker/{ticker}prev?adjusted={adjusted}&apiKey={api_key}"
    headers = {
        "accept" : "application/json",
        "Authorization": "Bearer 3LsICkcEX4Y2lDe9Zq1bPGC7r9x_VBvv"
    }
    response = RESTClient.get(url, header=headers)
    print(response)