from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_all_customers),
    path('addfav/',views.get_user_fav_recipe),

]