angular.module('otakufinder.services', [])
.factory('User', function() {

  var o = {
    favorites: []
  }

  o.addAnimeToFavorites = function(anime) {
    // make sure there's a anime to add
    if (!anime) return false;

    // add to favorites array
    o.favorites.unshift(anime);
  }

  o.removeAnimeFromFavorites = function(anime, index) {
    // make sure there's a anime to add
    if (!anime) return false;

    o.favorites.splice(index, 1);
  }
  return o;
})
.factory('Recommendations', function($http, SERVER){
  var o = {
    queue: []
  };
  o.getNextAnimes = function() {
   return $http({
     method: 'GET',
     url: SERVER.url + '/animes'
   }).success(function(data){
     // merge data into the queue
     o.queue = o.queue.concat(data);
   });
 }

  return o;
});
