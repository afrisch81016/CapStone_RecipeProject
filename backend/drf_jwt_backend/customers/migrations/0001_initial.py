# Generated by Django 4.0.3 on 2022-04-07 16:21

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Customers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('favoritedRecipe', models.CharField(max_length=255)),
            ],
        ),
    ]