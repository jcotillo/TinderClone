angular.module('songhop.services', [])
// The service factory function generates the single object or function that represents the service to the rest of the application.
.factory('User', function() {

  var o = {
    favorites:[]
  }

  o.addSongToFavorites = function(song) {
    // make sure there is a song present
    if (!song) return false;
    // if so, add it to fav array @ the beginning to keep a last-to-first order
    o.favorites.unshift(song);
  }

  o.removeSongFromFavorites = function(song, index) {
    // make sure there's a song to remove
    if (!song) return false;

    // array.splice(start, deleteCount[, item1[, item2[, ...]]]) if !item1, splice just deletes. Also returns an array of removed items
    o.favorites.splice(index, 1);
  }

  return o;
})
.factory('Recommendations', function($http, $q, SERVER) {
  var media;
  var o = {
    queue: []
  }
  // The init method is used to initialize the mozContact object using a configuration object.
  o.init = function() {
    if (o.queue.length === 0) {
      return o.getNextSongs();
    } else {
      return o.playCurrentSong();
    }
  }
  o.getNextSongs = function() {
   return $http({
     method: 'GET',
     url: SERVER.url + '/recommendations'
   }).success(function(data){
     // merge data into the queue
     o.queue = o.queue.concat(data);
   });
 }

 o.nextSong = function() {
  // The shift() method removes the first element from an array and returns that element
   o.queue.shift();
   // end the song
    o.haltAudio();
   // low on the queue? lets fill it up
    if (o.queue.length <= 3) {
      o.getNextSongs();
    }
 }

 o.playCurrentSong = function() {
  // $q - A service that helps you run functions asynchronously, and use their return values (or exceptions) when they are done processing.
  // The purpose of the deferred object is to expose the associated Promise instance as well as APIs that can be used for signaling the successful or unsuccessful completion, as well as the status of the task.
   var defer = $q.defer();
  // what is the audio class in angular?
   media = new Audio(o.queue[0].preview_url);
   // when song loaded, resolve the promise to let controller know.
   media.addEventListener("loadeddata", function(){
     defer.resolve();
   });

   media.play();

  //  A new promise instance is created when a deferred instance is created and can be retrieved by calling deferred.promise.
   return defer.promise;
 }

  o.haltAudio = function() {
    if (media) media.pause();
  }
  return o;
})
