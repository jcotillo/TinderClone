angular.module('otakufinder.controllers', ['ionic', 'otakufinder.services'])


/*
Controller for the discover page
*/
.controller('DiscoverCtrl', function($scope, $timeout, User) {
  $scope.animes = [{
    "title": "Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka Gaiden: Sword Oratoria",
    "video": "https://www.youtube.com/embed/_25Ar-rS-C4",
    "description": "n/a"
  }]

  $scope.currentAnime = angular.copy($scope.animes[0])
  $scope.sendFeedback = function(bool) {
    // first, add to favorites if they favorited
    if (bool) User.addAnimeToFavorites($scope.currentAnime);

    // set variable for the correct animation sequence
    $scope.currentAnime.rated = bool;
    $scope.currentAnime.hide = true;

    $timeout(function() {
     // $timeout to allow animation to complete before changing to next anime
     // set the current anime to one of our three songs
     var randomAnime = Math.round(Math.random() * ($scope.animes.length - 1));

     // update current anime in scope
     $scope.currentAnime = angular.copy($scope.animes[randomSong]);

   }, 250);


  }
})


/*
Controller for the favorites page
*/
.controller('FavoritesCtrl', function($scope, User) {
  // get the list of our favorites from the user service
  $scope.favorites = User.favorites;
  $scope.removeAnime = function(anime, index) {
    User.removeAnimeFromFavorites(anime, index);
  }
})


/*
Controller for our tab bar
*/
.controller('TabsCtrl', function($scope) {

});
