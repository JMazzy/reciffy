reciffy.factory('TagService', ['Restangular', 'RecipeService', function(Restangular, RecipeService) {

  var _tags = {};

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

  var callOneTag = function(tag_id) {
    if ( !_tags[tag_id] ) {
      Restangular
      .one('tags', tag_id)
      .get()
      .then( function(tag) {
        _tags[tag.id] = tag;
        loadAssociations(tag);
      });
    }
  };

  var loadAssociations = function(tag) {
    for ( var t = 0; t < tag.taggings.length; t++ ) {
      var type = tag.taggings[t].taggable_type
      var id = tag.taggings[t].taggable_id

      if (type === "Recipe") {
        RecipeService.setOneRecipe(id);
      }
    }
  }

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

  var getTags = function() {
    return _tags;
  }

  return {
    callAllTags: callAllTags,
    callOneTag: callOneTag,
    findTagByName: findTagByName,
    getTags: getTags,
  }

}]);
