angular.module('songhop.services', [])
.factory('User', function() {

  var o = {
    favorites:[]
  }

  o.addSongToFavorites = function(song) {
    // make sure arguement is present
    if (!song) return false;
    // if so, add it to fav array @ the beginning to keep a last-to-first order
    o.favorites.unshift(song);
  }

  o.removeSongFromFavorites = function(song, index) {
    // make sure there's a song to add
    if (!song) return false;

    // add to favorites array
    o.favorites.splice(index, 1);
  }

  return o;
})
.factory('Recommendations', function($http, SERVER) {
  var o = {
    queue: []
  };

  o.getNextSongs = function() {
   return $http({
     method: 'GET',
     url: SERVER.url + '/recommendations'
   }).success(function(data){
     // merge data into the queue
     o.queue = o.queue.concat(data);
   });
 }
 
  return o;
})
