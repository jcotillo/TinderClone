angular.module('songhop.controllers', ['ionic', 'songhop.services'])

/*
Controller for the discover page
*/
.controller('DiscoverCtrl', function($scope, $timeout, User, Recommendations) {
  // get the first 10 song recommendations
  Recommendations.getNextSongs()
    .then(function() {
      // initialize the current song
      $scope.currentSong = Recommendations.queue[0];
    });
  // fired when we favorite / skip a song.
  $scope.sendFeedback = function (bool) {

    if (bool) User.addSongToFavorites($scope.currentSong);
     $scope.currentSong.rated = bool;
     $scope.currentSong.hide = true;

     // prepare the next song and remove the one rated..
     Recommendations.nextSong();

     $timeout(function() {
     // $timeout to allow animation to complete before changing to next song
     $scope.currentSong = Recommendations.queue[0];
   }, 250);
   $scope.nextAlbumImg = function() {
     // if there isn't an album image available next, return empty string.
     if (Recommendations.queue.length > 1) {
       return Recommendations.queue[1].image_large;
     }
     return ' ';
   };
 };
})


/*
Controller for the favorites page
*/
.controller('FavoritesCtrl', function($scope, User) {

  // get the list of our favorites from the user service
  $scope.favorites = User.favorites;
  $scope.removeSong = function(song, index) {
    User.removeSongFromFavorites(song, index);
  };

})


/*
Controller for our tab bar
*/
.controller('TabsCtrl', function($scope) {

});
