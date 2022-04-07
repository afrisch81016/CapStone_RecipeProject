import imp
from .models import Ingredient
from rest_framework import serializers

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id','user','name','best_by_date','costOfIngredient']

        user_id = serializers.IntegerField(write_only = True)