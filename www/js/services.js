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
     withCredentials: false,
     url: SERVER.url + '/animes'
   }).success(function(data){
     // merge data into the queue
     o.queue = o.queue.concat(data);
   });
 }

  o.nextAnime = function() {
    // pop off current song
    o.queue.shift();
    if (o.queue.length <= 3) {
      o.getNextAnimes();
    }
  }
  return o;
});
