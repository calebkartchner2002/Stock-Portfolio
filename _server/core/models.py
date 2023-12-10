from django.db import models

# Create your models here.

class User(models.Model):
    email= models.EmailField(unique=True, primary_key=True)

class Trade(models.Model):
    id = models.BigAutoField(primary_key=True)
    ticker = models.TextField()
    shares = models.IntegerField()
    priceWhenBought = models.DecimalField(max_digits=4, decimal_places=2)
    User = models.ForeignKey("User", on_delete=models.CASCADE)