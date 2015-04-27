/**
 * Created by guinetik on 2/20/15.
 */
angular.module('mt.controllers').controller('Perfil', Perfil);
function Perfil($scope, api, $stateParams, $timeout, auth, toastr) {
    $scope.perfil = {};
    $scope.id = $stateParams.id;
    $scope.$on('$ionicView.beforeEnter', function (event) {
        $scope.dataLoaded = false;
        $timeout($scope.updateProfile);
    });
    $scope.updateProfile = function () {
        console.log("updateProfile", $scope.id);
        api.getProfile($scope.id, function (result) {
            console.log("updateProfile", result);
            if (result.status == 200) {
                $scope.perfil = result.perfil;
                $scope.dataLoaded = true;
            }
        })
    };
    $scope.processVote = function () {
        var uuid = auth.getUuid();
        api.voteForArtist($scope.perfil, uuid, function (result) {
            console.log("voteForArtist", result.error);
            if (result.error) {
                if (result.msg) {
                    console.log("show warning");
                    toastr.warning(result.msg);
                } else {
                    console.log("show error");
                    toastr.error("Não foi possível conectar com o servidor. Tente novamente");
                }
            } else {
                toastr.success(result.msg);
            }
        });
    };
}