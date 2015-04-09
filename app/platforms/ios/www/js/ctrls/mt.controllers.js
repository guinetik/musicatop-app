var ctrls = angular.module('mt.controllers', []);
ctrls.controller('AppCtrl', function ($scope, $rootScope, $ionicModal, $timeout, $ionicSideMenuDelegate, mediaPlayer) {
    $scope.showPlayer = true;
    $rootScope.mediaPlayer = mediaPlayer;
    $rootScope.playlist = [];
    $scope.isMenuOpened = function () {
        return $ionicSideMenuDelegate.isOpen()
    };
    // Form data for the login modal
    $scope.loginData = {};
    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('views/screens/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $rootScope.mostraZero = function (v) {
        if (v < 10) return "0" + v.toString();
        else return v;
    };
    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };
    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };
    $rootScope.$on("add-cd-to-playlist", function (event, musica) {
        $scope.showPlayer = $scope.nowPlaying = true;
    });
    $rootScope.$on("add-to-playlist", function (event, musica) {
        $scope.showPlayer = $scope.nowPlaying = true;
    });
    $scope.$on('$ionicView.enter', function (event) {
        if ($scope.nowPlaying) {
            setTimeout(function () {
                functions.playlist.hide();
                $('.playlist-plug').addClass("closed");
            }, 100);
        }
    });
    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);
        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
});