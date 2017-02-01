angular.module('otakufinder.controllers', ['ionic', 'otakufinder.services'])


/*
Controller for the discover page
*/
.controller('DiscoverCtrl', function($scope, $timeout, User, Recommendations) {

  Recommendations.getNextAnimes().then(function(){
    $scope.currentAnime = Recommendations.queue[0];
  });

  $scope.sendFeedback = function(bool) {
    // first, add to favorites if they favorited
    if (bool) User.addAnimeToFavorites($scope.currentAnime);

    // set variable for the correct animation sequence
    $scope.currentAnime.rated = bool;
    $scope.currentAnime.hide = true;

    // prepare the next Anime
    Recommendations.nextAnime();

    $timeout(function() {
    // $timeout to allow animation to complete
      $scope.currentAnime = Recommendations.queue[0];
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
