from datetime import date
from unittest.util import _MAX_LENGTH
from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Ingredient(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    best_by_date = models.DateField()
    costOfIngredient = models.DecimalField(max_digits=6, decimal_places=2)