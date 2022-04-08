from django.shortcuts import get_object_or_404, render
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
        
@api_view(['GET','PUT','DELETE'])
def update_pantry_items(request,pk):
    updated_ingredients = get_object_or_404(Ingredient,pk=pk)
    if request.method == 'GET':
        serializer=IngredientSerializer(updated_ingredients)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer=IngredientSerializer(updated_ingredients,data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    elif request.method == 'DELETE':
        updated_ingredients.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

