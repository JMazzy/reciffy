reciffy.factory('RecipeService', ['Restangular', '$state', function(Restangular, $state) {
  var _recipes = {};
  var _comments = {};
  var _tags = {};
  var _currents = {
    recipe: {},
    tag: {name: "", recipe_id: null},
    comment: {comment_description: "", recipe_id: null},
  }

  var setRecipes = function() {
    if (Object.keys(_recipes).length === 0) {
      Restangular
      .all('recipes')
      .getList()
      .then( function(recipes) {
        for( var r = 0; r < recipes.length; r++ ) {
          _recipes[recipes[r].id] = recipes[r];
        }
        console.log(_recipes);
      });
    }
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

    for ( var c = 0; c < _currents.recipe.comments.length; c++) {
      _comments[_currents.recipe.comments[c].id] = _currents.recipe.comments[c];
      _currents.comment.recipe_id = recipe_id;
    }

    for ( var t = 0; t < _currents.recipe.tags.length; t++) {
      _tags[_currents.recipe.tags[t].id] = _currents.recipe.tags[t];
      _currents.tag.recipe_id = recipe_id;
    }
  }

  var setCurrentRecipe = function(recipe_id) {
    if ( !!_recipes[recipe_id] ) {
      _setCurrents(recipe_id);
    } else {
      Restangular
      .one('recipes', recipe_id)
      .get()
      .then( function(recipe) {
        _recipes[recipe.id] = recipe;
        _setCurrents(recipe.id);
      });
    }
  };

  var getCurrentRecipe = function() {
    return _currents.recipe;
  };

  var addComment = function() {
    Restangular
    .one("recipes", _currents.recipe.id)
    .all("comments")
    .post(_currents.comment)
    .then( function(comment) {
      _comments[comment.id] = comment;
      _currents.comment.comment_description = "";
    })
  };

  var removeComment = function(comment_id) {
    Restangular
    .one("recipes", _currents.recipe.id)
    .one("comments", comment_id)
    .remove()
    .then(function(deletedComment) {
      delete _comments[deletedComment.id];
    })
  };

  var addTag = function() {
    Restangular
    .all('tags')
    .post(_currents.tag, {  taggable_id: _currents.recipe.id,
                            taggable_type: "Recipe" })
    .then( function(newTag) {
      _tags[newTag.id] = newTag;
      _currents.tag.name = "";
    })
  };

  // Actually only deletes that particular TAGGING, not the tag itself, but goes through the tag controller
  var removeTag = function(tag_id) {
    Restangular
    .one("tags", tag_id)
    .remove({ taggable_id: _currents.recipe.id,
              taggable_type: "Recipe"})
    .then(function(deletedTag) {
      delete _tags[deletedTag.id];
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
  };
}])
