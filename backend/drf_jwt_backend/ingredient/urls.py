from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_list_of_ingredients),
    path('<int:pk>/', views.update_pantry_items)
]