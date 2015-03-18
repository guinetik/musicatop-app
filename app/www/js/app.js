angular.module('mt', [
    'ionic',
    'ngSanitize',
    'com.2fdevs.videogular',
    'mt.controllers',
    'toastr',
    'blockUI',
    'angularMoment',
    'truncate',
    'uiGmapgoogle-maps',
    'dcbImgFallback'
    //'mediaPlayer'
]);
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {

}
angular.module("mt").run(function ($ionicPlatform, $rootScope) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
    $rootScope.seekPercentage = function ($event) {
        var percentage = ($event.offsetX / $event.target.offsetWidth);
        if (percentage <= 1) {
            return percentage;
        } else {
            return 0;
        }
    };
});