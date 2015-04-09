/**
 * Created by guinetik on 2/20/15.
 */
angular.module('mt.controllers').controller('Playlist', Playlist);
function Playlist($scope, $rootScope, $timeout, $state, mediaPlayer) {
    $scope.$on('$ionicView.beforeEnter', function (event) {
        $scope.dataLoaded = false;
        $timeout($scope.updateList);
    });
    $scope.updateList = function () {
        if ($rootScope.playlist.length == 0) {
            $state.go("app.home");
        } else {
            $scope.dataLoaded = true;
            functions.playlist.show();
        }
    };
    $scope.addToPlaylist = function (musica) {
        $rootScope.$emit("add-to-playlist", musica);
    };
    $scope.clearPlaylist = function () {
        $state.go("app.home");
        $rootScope.playlist = [];
        mediaPlayer.stopAndRelease();
    };
    $scope.shufflePlaylist = function () {
        $rootScope.playlist = shuffleArray($rootScope.playlist);
        $timeout(function () {
            mediaPlayer.play(0);
        });
    };
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
}