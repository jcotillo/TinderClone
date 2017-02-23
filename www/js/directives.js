angular.module('otakufinder.directives',[])
.directive('youtube', function($window) {
  return {
    restrict: "E",

    template: '<div></div>',

    link: function(scope, element, attrs) {
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      var player;

      $window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player(element.children()[0], {
          height: '390',
          width: '640',
          videoId: 'M7lc1UVf-VE'
        });
      };
    },
  }
});
