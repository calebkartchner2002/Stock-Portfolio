API INFORMATION:

https://github.com/polygon-io/client-python

API Key => 3LsICkcEX4Y2lDe9Zq1bPGC7r9x_VBvv

up to 5 calls a minute

data updates EOD

up to 2 years of previous data 

Queries will take the form =>

```
url = f"https://api.polygon.io/v2/aggs/ticker/{ticker}prev?adjusted={adjusted}&apiKey={api_key}"

```
Responses will take the form =>
```
{
  "adjusted": true,
  "queryCount": 1,
  "request_id": "6a7e466379af0a71039d60cc78e72282",
  "results": [
    {
      "T": "AAPL",
      "c": 115.97,
      "h": 117.59,
      "l": 114.13,
      "o": 115.55,
      "t": 1605042000000,
      "v": 131704427,
      "vw": 116.3058
    }
  ],
  "resultsCount": 1,
  "status": "OK",
  "ticker": "AAPL"
}
```
T : String stock ticker symbol

c : number is the close price in the given time period

h : number is the highest price in the given time period

l : number is the lowest price in the given time period

n : number is the number of transations in the aggregate window

o : number is the open price

t : number Unix Msec timestamp for start of aggregate

v : number is the trading volume in the given time

vw : number is the weighted average price

next_url : string If present, this value can be used to fetch the next page

this should (should) get the information about the previous day's close. We can use this information to evaluate the users current portfolio worth.

Basically, number of stocks (n) multiplied by the value of each share (v). nv = total value of the client's shares in the tickered company

we can also use this for overall change, where we take the current rate (r) multiplied by the n subtracted by the priceWhenBought*n, rn-pn=overallChange 

We can use this for our homepage to get the total performace value, our portfolio values, and the value of featured stocks

We can use this as well in 'buying shares' => putting the number of shares and for what ticker in a database.

Removing stocks could be difficult because if a user has n stocks and they want to take out k stocks, where k<n, then we cant just delete the database entry.

What we'll have to do is take the data, manipulate it, delete the entry, then make a new one, if k<n. If k>=n, we can just delete the entry. We might also consider making an error if k>n.

Our portfolio again will be easy -- we run the following to get the current val per stock using information from the database.


Database entries will have to look something like:

## TRADES
```
id    ticker    shares     priceWhenBought     UserEmail
1     AAPL      3          57.49               asdf@asdf.com
```

## USER
```
id    firstName  LastName   email             passwordHash
1     John       Smith      asdf@asdf.com     a1234bcdef124aabcdefff
```

where a user has many trades (1 to many relationship).

### TODO

([ ]) Django view

([ ]) Django Models (Database structures)

([ ]) Django add information from trade to the table

([ ]) Django remove stocks (see above for explanation)

([ ]) Vite use effect to call django




# 2610 Django + Vite Starting Point
This project serves as a starting point you to use as a starting point for Django applications that use Vite as the asset server for development. You are welcome to us this project for all of your assignments beginning with Module 5.

## Strategy
This application is a hybrid MPA and SPA. It reuses all of the login stuff that we did at the end of module 3 - there is a separate page for signup/signin. Once a user is logged in they are redirected to the / view which then renders the SPA application created using React and Vite.

## Creating a new application
1. Clone the repo `git clone git@github.com:dittonjs/2610DjangoViteStarter.git <your-new-project-name>`. Replace `<your-new-project-name>` with the name you want give to your project.
2. Open the pyproject.toml file and change the `name` property. You should use `-` to separate words in your name for this property.

## Initial Setup
1. Change the name property in the `pyproject.toml` file to be something unique to your project.
1. In the root directory, install the python dependencies `poetry install`
2. In the `client` directory, install the javascript dependencies `npm install`
3. In the `_server` directory, create a new file called `.env`
4. Copy the contents of `_server/.env.example` into the newly created `.env` file.
5. Activate the poetry env `poetry shell`
6. In the `_server` directory, run the migrations `python manage.py migrate`

## Running the appliction
1. In the `client` directory run `npm run dev`
2. In the `_server` directory (with your poetry env activated) run `python manage.py runserver`
3. Visit your application at `http://localhost:8000`
