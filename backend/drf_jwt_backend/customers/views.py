from django.shortcuts import render
from .models import Customers
from .serializers import CustomerSerializer
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.response import Response

# Create your views here.

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_customers(request):
    customers = Customers.objects.all()
    serializer = CustomerSerializer(customers, many =True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def get_user_fav_recipe(request):
    if request.method == 'POST':
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.data, status = status.HTTP_400_BAD_REQUEST)

    elif request.method == 'GET':
        customers = Customers.objects.filter(user_id=request.user.id)
        serializer = CustomerSerializer(customers, many =True)
        return Response (serializer.data)

    