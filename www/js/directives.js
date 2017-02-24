angular.module('otakufinder.directives',[])
.directive('youtube', function($window) {
  return {
    restrict: "E",

    scope: {
      height:   "@",
      width:    "@",
      videoid:  "@"
    },

    template: '<div></div>',

    link: function(scope, element) {
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      var player;

      $window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player(element.children()[0], {

          playerVars: {
            autoplay: 1,
            controls: 1
          },

          height: scope.height,
          width: scope.width,
          videoId: scope.videoid
        });

        scope.$watch('videoid', function(newValue, oldValue) {
          if (newValue == oldValue) {
            return;
          }

          player.cueVideoById({videoId: scope.videoid});
          player.playVideo();
        });
      };
    },
  }
});
