import imp
from .models import Ingredient
from rest_framework import serializers

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id','name','best_by_date','costOfIngredient']