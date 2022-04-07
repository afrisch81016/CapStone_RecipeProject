from .models import Customers
from rest_framework import serializers


class CustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customers
        fields = ['id', 'user','favoritedRecipe']