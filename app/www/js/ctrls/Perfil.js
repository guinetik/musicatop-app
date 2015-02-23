/**
 * Created by guinetik on 2/20/15.
 */
angular.module('mt.controllers').controller('Perfil', Perfil);
function Perfil($scope, api, $stateParams, $timeout) {
    $scope.perfil = {};
    $scope.id = $stateParams.id;
    $scope.$on('$ionicView.beforeEnter', function (event) {
        $timeout($scope.updateProfile);
    });
    $scope.updateProfile = function () {
        console.log("updateProfile", $scope.id);
        api.getProfile($scope.id, function (result) {
            console.log("updateProfile", result);
            if (result.status == 200) {
                $scope.perfil = result.perfil;
            }
        })
    };
}