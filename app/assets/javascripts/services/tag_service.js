reciffy.factory('TagService', ['Restangular', 'RecipeService', function(Restangular, RecipeService) {

  var _tags = {};
  var _tagIdList = [];
  var _tagList = [];
  var _tagHolder = {
    tag: null,
    userIds: [],
    recipeIds: [],
  };

  var setTagIdList = function() {
    Restangular
    .all('tags')
    .getList()
    .then(function(tags) {
      _tagIdList.length = 0;
      for( var t = 0; t < tags.length; t++) {
        _tags[tags[t].id] = tags[t];
        _tagIdList.push(tags[t].id)
      }
    });
  };

  var clearTagList = function() {
    _tagList.length = 0;
  }

  var addOneTag = function(index) {
    Restangular
    .one('tags', _tagIdList[index])
    .get()
    .then( function(tag) {
      _tagList.push(tag);
    });
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

  var getIdList = function() {
    return _tagIdList;
  }

  var getTagList = function() {
    return _tagList;
  }

  var getTagHolder = function() {
    return _tagHolder;
  }

  var callOneTag = function(tag_id) {
    _tagHolder.userIds = [];
    _tagHolder.recipeIds = [];

    Restangular
    .one('tags', tag_id)
    .get()
    .then( function(response) {
      _tagHolder.tag = response;
      for ( var t = 0; t < response.taggings.length; t++ ) {
        var tagging = response.taggings[t];
        if ( tagging.taggable_type === "Profile" ) {
          if ( _tagHolder.userIds.indexOf(tagging.taggable_id) === -1 ) {
            _tagHolder.userIds.push(tagging.taggable_id);
          }
        } else if ( tagging.taggable_type === "Recipe" ) {
          if ( _tagHolder.recipeIds.indexOf(tagging.taggable_id) === -1 ) {
            _tagHolder.recipeIds.push(tagging.taggable_id);
          }
          RecipeService.setOneRecipe(tagging.taggable_id);
        }
      }
    });
  }

  return {
    setTagIdList: setTagIdList,
    getIdList: getIdList,
    getTagList: getTagList,
    getTagHolder: getTagHolder,
    callOneTag: callOneTag,
    findTagByName: findTagByName,
    addOneTag: addOneTag,
    clearTagList: clearTagList,
  }

}]);
