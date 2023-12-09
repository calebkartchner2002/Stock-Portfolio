from django.db import models

# Create your models here.

class User(models.Model):
    email= models.EmailField(unique=True, primary_key=True)

class Trade(models.Model):
    id = models.BigAutoField(primary_key=True)
    ticker = models.TextField()
    priceWhenBought = models.DecimalField()
    User = models.ForeignKey("User", on_delete=models.CASCADE)

