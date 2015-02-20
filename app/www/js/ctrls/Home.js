/**
 * Created by guinetik on 2/20/15.
 */
angular.module('mt.controllers').controller('Home', Home);
function Home($scope, $rootScope, api, $timeout) {
    $scope.home = {};
    $scope.$on('$ionicView.beforeEnter', function (event) {
        $scope.bannersLoaded = false;
    });
    $scope.$on('$ionicView.enter', function (event) {
        $timeout($scope.updateHome);
    });
    $scope.updateHome = function () {
        api.getHome(function (result) {
            if (result.status == 200) {
                $scope.bannersLoaded = true;
                $scope.home = result.home;
            } else {
                window.location.reload();
            }
        });
    };
}