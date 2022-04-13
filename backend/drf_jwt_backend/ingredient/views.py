from django.shortcuts import get_object_or_404, render
from rest_framework.response import Response
from .models import Ingredient
from .serializers import IngredientSerializer
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.
@api_view(['GET'])
@permission_classes([AllowAny])
def get_ingredients_pantry(request):
    name = Ingredient.objects.all()
    serializer = IngredientSerializer(name, many = True)
    return Response (serializer.data)
        

@api_view (['GET','POST'])
@permission_classes([IsAuthenticated])
def get_user_ingredients(request):
    print(
        'User', f"{request.user.id} {request.user.email} {request.user.username}")
    if request.method == 'POST':
        serializer = IngredientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response (serializer.data, status = status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        name = Ingredient.objects.filter(user_id=request.user.id)
        serializer = IngredientSerializer(name, many = True)
        return Response (serializer.data)
        
        
@api_view(['GET','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def update_pantry_items(request,pk):
    updated_ingredients = get_object_or_404(Ingredient,pk=pk)
    if request.method == 'GET':
        serializer=IngredientSerializer(updated_ingredients)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer=IngredientSerializer(updated_ingredients,data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    elif request.method == 'DELETE':
        updated_ingredients.delete(user=request.user)
        return Response(status=status.HTTP_204_NO_CONTENT)

