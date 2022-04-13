from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_ingredients_pantry),
    path('addnew/', views.get_user_ingredients),
    path('update/<int:pk>/', views.update_pantry_items)
]