from django.shortcuts import render
from .models import Customers
from .serializers import CustomerSerializer
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

# Create your views here.

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_customers(request):
    customers = Customers.objects.all()
    serializer = CustomerSerializer(customers, many =True)
    return Response(serializer.data, status=status.HTTP_200_OK)