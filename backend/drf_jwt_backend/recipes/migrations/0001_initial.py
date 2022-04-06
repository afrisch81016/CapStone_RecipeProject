# Generated by Django 4.0.3 on 2022-04-06 20:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Recipes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('recipetitle', models.CharField(max_length=255)),
                ('recipeTimeTier', models.IntegerField()),
                ('ingredients', models.CharField(max_length=255)),
                ('costOfIngredients', models.DecimalField(decimal_places=2, max_digits=6)),
                ('bestByDate', models.DateField()),
                ('expiredIngredients', models.IntegerField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
