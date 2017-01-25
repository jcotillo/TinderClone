angular.module('otakufinder.controllers', ['ionic', 'otakufinder.services'])


/*
Controller for the discover page
*/
.controller('DiscoverCtrl', function($scope, $sce) {
  $scope.animes = [{
    "title": "Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka Gaiden: Sword Oratoria",
    "video": "https://www.youtube.com/embed/_25Ar-rS-C4",
    "description": "n/a"
  }]

  $scope.currentAnime = angular.copy($scope.animes[0])
})


/*
Controller for the favorites page
*/
.controller('FavoritesCtrl', function($scope) {

})


/*
Controller for our tab bar
*/
.controller('TabsCtrl', function($scope) {

});
