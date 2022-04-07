from datetime import date
from unittest.util import _MAX_LENGTH
from django.db import models

# Create your models here.

class Ingredient(models.Model):
    name = models.CharField(max_length=255)
    best_by_date = models.DateField()
    costOfIngredient = models.DecimalField(max_digits = 6, decimal_places=2,)