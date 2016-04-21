reciffy.factory('RecipeService', ['Restangular', '$state', function(Restangular, $state) {
  var _recipes = {};
  var _comments = {};
  var _tags = {};

  var _currents = {
    recipe: {},
    tag: {name: "", recipe_id: null},
    comment: {comment_description: "", recipe_id: null},
    disabledStatus: true,
    rating: {rating: undefined, recipe_id: null},
  };

  var setRecipes = function() {
    Restangular
    .all('recipes')
    .getList()
    .then( function(recipes) {
      for( var r = 0; r < recipes.length; r++ ) {
        _recipes[recipes[r].id] = recipes[r];
      }
    });
  };

  var newRecipe = function() {
    _currents.recipe = {};
  };

  var getRecipes = function() {
    return _recipes;
  };

  var getTags = function() {
    return _tags;
  };

  var getTag = function() {
    return _currents.tag;
  };

  var getComment = function() {
    return _currents.comment;
  };

  var getComments = function() {
    return _comments;
  };

  var addRecipe = function(recipe) {
    _recipes.push(recipe);
  };

  var _setCurrents = function(recipe_id) {
    _currents.recipe = _recipes[recipe_id];

    if (_currents.recipe.comments) {
      for ( var c = 0; c < _currents.recipe.comments.length; c++) {
        _comments[_currents.recipe.comments[c].id] = _currents.recipe.comments[c];
        _currents.comment.recipe_id = recipe_id;
      }
    }
    if (_currents.recipe.tags) {
      for ( var t = 0; t < _currents.recipe.tags.length; t++) {
        _tags[_currents.recipe.tags[t].id] = _currents.recipe.tags[t];
        _currents.tag.recipe_id = recipe_id;
      }
    }

    _currents.rating.recipe_id = recipe_id;
  };

  var setCurrentRecipe = function(recipe_id,currentUser) {
    if ( !!_recipes[recipe_id] ) {
      _setCurrents(recipe_id);
    } else {
      Restangular
      .one('recipes', recipe_id)
      .get()
      .then( function(recipe) {
        _currents.disabledStatus = (currentUser.id != recipe.user_id)
        console.log("_currents.disabledStatus " +_currents.disabledStatus)
        console.log(recipe.user_id)

        _recipes[recipe.id] = recipe;
        _setCurrents(recipe.id);
        console.log(recipe);
      });
    }
  };

  var getCurrentRecipe = function() {
    return _currents.recipe;
  };

  var getdisabledStatus = function() {
    return _currents.disabledStatus;
  };

  var getCurrentStuff = function() {
    return _currents;
  };

  var addComment = function() {
    Restangular
    .one("recipes", _currents.recipe.id)
    .all("comments")
    .post(_currents.comment)
    .then( function(comment) {
      _comments[comment.id] = comment;
      _currents.comment.comment_description = "";
    });
  };

  var removeComment = function(comment_id) {
    Restangular
    .one("recipes", _currents.recipe.id)
    .one("comments", comment_id)
    .remove()
    .then(function(deletedComment) {
      delete _comments[deletedComment.id];
    });
  };

  var addTag = function() {
    Restangular
    .all('tags')
    .post(_currents.tag, {  taggable_id: _currents.recipe.id,
                            taggable_type: "Recipe" })
    .then( function(newTag) {
      _tags[newTag.id] = newTag;
      _currents.tag.name = "";
    });
  };

  // Actually only deletes that particular TAGGING, not the tag itself, but goes through the tag controller
  var removeTag = function(tag_id) {
    Restangular
    .one("tags", tag_id)
    .remove({ taggable_id: _currents.recipe.id,
              taggable_type: "Recipe"})
    .then(function(deletedTag) {
      delete _tags[deletedTag.id];
    });
  };

  var rateRecipe = function(rating) {
    console.log(rating);
    Restangular
    .all("ratings")
    .save({rating: {rating: rating}})
    .then(function(response) {
      console.log(response);
    }, function(error) {
      console.log(error);
    });
  }

  var updateRecipe = function() {
    recipe = getCurrentRecipe()
    Restangular
     .one('recipes', recipe.id)
     .patch({recipe})
     .then(function(newRecipe) {
        console.log(newRecipe);
    })
  };

  var makeRecipeIngredient = function() {
    recipe = getCurrentRecipe()
    recipe.recipe_ingredients << {ingredient_id: 0, unit_id: 0, quantity: 0}
    console.log(recipe.recipe_ingredients)
  };

  var removeRecipeIngredient = function(ri) {
    Restangular
    .one("recipe_ingredients", ri.id)
    .remove()
    .then(function(deletedRecipeIngredient) {
      recipe = getCurrentRecipe()
      var ind = recipe.recipe_ingredients.indexOf(ri);
      if (ind > 0) {
        recipe.recipe_ingredients.splice(ind,1);
      }
      console.log("Removed Recipe Ingreient");
    })
  };

  return {
    setRecipes: setRecipes,
    getRecipes: getRecipes,
    setCurrentRecipe: setCurrentRecipe,
    getCurrentRecipe: getCurrentRecipe,
    addComment: addComment,
    removeComment: removeComment,
    addTag: addTag,
    removeTag: removeTag,
    getTags: getTags,
    getTag: getTag,
    getComments: getComments,
    getComment: getComment,
    getCurrentStuff: getCurrentStuff,
    getdisabledStatus: getdisabledStatus,
    rateRecipe: rateRecipe,
    updateRecipe: updateRecipe,
    removeRecipeIngredient: removeRecipeIngredient,
    makeRecipeIngredient: makeRecipeIngredient
  };
}]);
