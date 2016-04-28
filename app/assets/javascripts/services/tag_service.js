reciffy.factory('TagService', ['Restangular', 'RecipeService', function(Restangular, RecipeService) {

  // An object to hold the tags which have been retrieved from the API
  var _tags = {};

  // Get the tag storage object
  var getTags = function() {
    return _tags;
  }

  // API call all the tags (for index page)
  var callAllTags = function() {
    Restangular
    .all('tags')
    .getList()
    .then( function(tags) {
      for ( var t = 0; t < tags.length; t++ ) {
        _tags[tags[t].id] = tags[t];
      }
    })
  }

  // API call one tag, if not already loaded
  var callOneTag = function(tag_id) {
    if ( !_tags[tag_id] ) {
      Restangular
      .one('tags', tag_id)
      .get()
      .then( function(tag) {
        _tags[tag.id] = tag;
        _loadAssociations(tag);
      });
    } else {
      _loadAssociations(_tags[tag_id])
    }
  };

  // Find one tag by the name (among loaded tags, for search)
  var findTagByName = function(tagName) {
    var temp;
    for (var tag in _tags) {
      temp = _tags[tag];
      if (temp) {
        if (tagName == temp.name) {
          return temp;
        }
      }
    }
  };

  // Load associated recipes, to ensure they are loaded for display
  var _loadAssociations = function(tag) {
    for ( var t = 0; t < tag.taggings.length; t++ ) {
      var type = tag.taggings[t].taggable_type
      var id = tag.taggings[t].taggable_id

      if (type === "Recipe") {
        RecipeService.setOneRecipe(id);
      }
    }
  }

  var addTag = function(name, taggable_id, taggable_type) {
    Restangular
    .all('tags')
    .post(_current.tag, {   name: name,
                            taggable_id: taggable_id,
                            taggable_type: taggable_type })
    .then( function(newTag) {
      _current.recipe.tags.unshift(newTag);
      _current.tag.name = "";
    });
  };

  // Actually only deletes that particular TAGGING, not the tag itself, but goes through the tag controller
  var removeTag = function(tag_id, taggable_id, taggable_type) {
    Restangular
    .one("tags", tag_id)
    .remove({ taggable_id: _current.recipe.id,
              taggable_type: "Recipe"})
    .then(function(deletedTag) {
      var idx = _current.recipe.tags.indexOf(deletedTag);
      _current.recipe.tags.splice(idx, 1);
    });
  };

  return {
    callAllTags: callAllTags,
    callOneTag: callOneTag,
    findTagByName: findTagByName,
    getTags: getTags,
    addTag: addTag,
    removeTag: removeTag,
  }

}]);
