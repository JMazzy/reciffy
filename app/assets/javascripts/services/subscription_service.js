reciffy.factory('subscriptionService', ['Restangular', function(Restangular) {

    var obj = {};
    var subscriptions = [];

    obj.index = [];

    obj.getAllSubscriptions = function(){
      subscriptions.splice(0,subscriptions.length)
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
      return subscriptions.indexOf(subscriptionObj);
    }

    obj.show = function( id ) {
      return Restangular.one( "subscriptions", id).get();
    };

    obj.create = function ( subscriptionObj ) {
        return Restangular.all('subscriptions').post(subscriptionObj).then(function(response)  {
            subscriptions.unshift(response);
        },
        function(response)  {
          alert("Could not subscribe!");
       });
    };


    obj.destroy = function (subscriptionObj) {
      return Restangular.one("subscriptions/" + subscriptionObj.id).remove().then(
        function(res)  {
          index = subscriptions.indexOf(subscriptionObj);
          subscriptions.splice(index, 1);
        },
        function(res)  {
          alert("Could not Unsubscribe to: " + subscriptionObj.profile.first_name);
        }    
      )
    };

    return obj;
}]);
