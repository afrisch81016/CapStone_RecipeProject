from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Recipes(models.Model):
    ingredient = models.ForeignKey(User, on_delete=models.CASCADE), models.CharField(max_length=255)
    favoritedRecipe = models.CharField(max_length=255)
    costOfIngredients = models.DecimalField(max_digits=6, decimal_places=2)
    bestByDate = models.DateField()
    expiredIngredients = models.IntegerField()




