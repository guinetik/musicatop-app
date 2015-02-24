/**
 * Created by guinetik on 2/20/15.
 */
angular.module('mt.controllers').controller('Artists', Artists);
function Artists($scope, $timeout, api) {
    $scope.users = [];
    $scope.$on('$ionicView.beforeEnter', function (event) {
        $scope.dataLoaded = false;
        $timeout($scope.updateArtists);
    });
    $scope.updateArtists = function () {
        api.getUsers(function (result) {
            if (result.status == 200) {
                $scope.dataLoaded = true;
                var u = [];
                angular.forEach(result.data, function (artist, key) {
                    artist.t = artist.cds.length;
                    u.push(artist);
                });
                $scope.users = u;
            } else {
                window.location.reload();
            }
        });
    };
}