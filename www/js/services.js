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
.factory('Recommendations', function($http, SERVER, $q){
  var media;
  var o = {
    queue: []
  };
  o.playCurrentVideo = function() {
    var defer = $q.defer();
    media = new Video(o.queue[0].url);
    // when song loaded, resolve the promise to let controller know.
    media.addEventListener("loadeddata", function() {
      defer.resolve();
    });
    media.play();
    return defer.promise;
  }
  // used when switching to favorites tab
  o.haltVideo = function() {
    if (media) media.pause();
  }


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
    o.haltVideo();
    if (o.queue.length <= 3) {
      o.getNextAnimes();
    }
  }
  return o;
});
