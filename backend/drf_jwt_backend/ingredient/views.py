from django.shortcuts import render
from rest_framework.response import Response
from .models import Ingredient
from .serializers import IngredientSerializer
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response

# Create your views here.

@api_view (['GET','POST'])
def get_list_of_ingredients(request):
    if request.method == 'GET':
        name = Ingredient.objects.all()
        serializer = IngredientSerializer(name, many = True)
        return Response (serializer.data)
        
    elif request.method == 'POST':
        serializer = IngredientSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response (serializer.data, status = status.HTTP_201_CREATED)
        
    