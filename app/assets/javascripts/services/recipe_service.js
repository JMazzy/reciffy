reciffy.factory('RecipeService', ['Restangular', '$state', function(Restangular, $state) {
  var obj = {};

  var _recipeData = {
    recipes: [],

    currentRecipe: null,

    comment: {
      comment_description: "",
      recipe_id: null
    },

    comments: [],

    tag: {
      name: "",
      recipe_id: null
    },

    tags: [],

    setRecipes: function() {
      if ( this.recipes.length === 0 ) {
        this.recipes = Restangular.all('recipes').getList().$object;
      }
    },

    getRecipes: function() {
      return this.recipes;
    },

    addRecipe: function(recipe) {
      this.recipes.push(recipe);
    },

    setCurrentRecipe: function(recipe) {
      this.currentRecipe = recipe;
      this.comments = recipe.comments;
      this.comment.recipe_id = recipe.id;
      this.tags = recipe.tags;
      this.tag.recipe_id = recipe.id
    },

    getCurrentRecipe: function() {
      return this.currentRecipe;
    },

    addComment: function() {
      Restangular
      .one("recipes", this.currentRecipe.id)
      .all("comments")
      .post(this.comment)
      .then( function(comment) {
        this.comments.unshift(comment);
        this.comment.comment_description = "";
      })
    },

    removeComment: function(comment) {
      Restangular
      .one("recipes", this.currentRecipe.id)
      .one("comments", comment_id)
      .remove()
      .then(function(deletedComment) {
        for ( var c = 0; c < this.comments.length; c++ ) {
          if ( this.comments[c].id === deletedComment.id ) {
            this.comments.splice(c, 1);
          }
        }
      })
    },

    addTag: function() {
      Restangular
      .all('tags')
      .post(this.tag, { taggable_id: this.currentRecipe.id,
                        taggable_type: "Recipe" })
      .then( function(newTag) {
        this.tags.unshift(newTag);
        this.tag.name = "";
      })
    },

    // Actually only deletes that particular TAGGING, not the tag itself, but goes through the tag controller
    removeTag: function(tag) {
      Restangular
      .one("tags", tag.id)
      .remove({ taggable_id: this.currentRecipe.id,
                taggable_type: "Recipe"})
      .then(function(deletedTag) {
        for ( var t = 0; t < this.tags.length; t++ ) {
          if ( this.tags[t].id === deletedTag.id ) {
            this.tags.splice(t, 1);
          }
        }
      })
    },
  }

  obj.getRecipeData = function() {
    return _recipeData;
  }

  return obj;
}])
