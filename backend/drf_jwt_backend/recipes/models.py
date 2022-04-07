from django.db import models


# Create your models here.

class Recipes(models.Model):
    name = models.CharField(max_length=255)
    recipeID = models.IntegerField()

    
    

    # name,id of recipe





# postend request for recipes

#junction table between ingried and user (many to many relationship)

# function addPantry(req, res, next) {
#   req.user.pantry.push(req.body.pantry);
#   req.user.save(function(err) {
#     res.redirect('/users/' + req.user.id);
#   });
# }

# function removePantry(req, res, next) {
#   req.user.pantry.splice(req.user.pantry.indexOf(req.params.pId), 1);
#   req.user.save(function(err) {
#     res.json({msg: 'Deleted pantry item'});
#   });
# }

# var recipeSchema = new Schema({
#   title: String,
# 	recipeId: Number,
# 	ingredients: [ingredientSchema],
# 	directions: String,
# 	nutrients: [nutrientSchema],
# 	cookingMinutes: Number,
# 	preparationMinutes: Number,
# 	readyInMinutes: Number,
# 	servingSize: Number,
# 	imageUrl: String,
# 	reviews: [reviewSchema]
# });
