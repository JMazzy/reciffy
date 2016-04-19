reciffy.factory('subscriptionService', ['Restangular', function(Restangular) {

    var obj = {};
    var subscriptions = [];

    obj.index = [];

    obj.getindex = function(){
      Restangular.all('subscriptions').getList().then(function(result){
        obj.populateSubscriptions(result);
      });
    
    };

    obj.populateSubscriptions = function(allSubscriptions) {
       console.log(allSubscriptions.length)
       if (allSubscriptions.length) {
          for (var i = 0; i < allSubscriptions.length; i++) { 
            subscriptions.push(allSubscriptions[i]);
          }
       }
    }

    obj.getSubscriptions = function() {
       return subscriptions;
    }


    obj.getIndexOfSubscription = function(subscriptionObj) {
      return boards.indexOf(boardObj);
    }

    obj.show = function( id ) {
      return Restangular.one( "subscriptions", id).get();
    };

    obj.create = function ( subscriptionObj ) {
        return Restangular.all('subscriptions').post(subscriptionObj).then(function(response)  {
            subscription.unshift(response);
            obj.refreshBoard(0);
        },
        function(response)  {
          alert("Could not add your board: " + subscriptionObj.title);
       });
    };

    obj.update = function ( boardObj,data ) {
        return Restangular.one('boards', boardObj.id).get().then(function(response)  {
             response.title = data.title;
             console.log(response);
             response.put();
        },
        function(response)  {
          alert("Could not update your board: " + boardObj.title);
       });
    };

    obj.destroy = function (boardObj) {
      return Restangular.one("boards/" + boardObj.id).remove().then(
        function(res)  {
          index = boards.indexOf(boardObj);
          boards.splice(index, 1);
          obj.refreshBoard(0);
        },
        function(res)  {
          alert("Could not delete your board: " + boardObj.title);
      }      
    )
    };

    return obj;
}]);
