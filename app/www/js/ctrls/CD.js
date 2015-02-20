/**
 * Created by guinetik on 2/20/15.
 */
angular.module('mt.controllers').controller('CD', CD);
function CD($scope, $rootScope, api, $stateParams, $timeout, toastr) {
    $scope.cd = {};
    $scope.cd.id = $stateParams.id;
    $scope.$on('$ionicView.beforeEnter', function (event) {
        $scope.dataLoaded = false;
        $timeout(function () {
            api.getCD($scope.cd.id, function (result) {
                if (result.status == 200) {
                    $scope.dataLoaded = true;
                    $scope.cd = result.cd;
                }
            });
        });
    });
    $scope.addToPlaylist = function (musica) {
        musica.cd = $scope.cd;
        $rootScope.$emit("add-to-playlist", musica);
    };
}