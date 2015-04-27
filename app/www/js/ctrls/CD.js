/**
 * Created by guinetik on 2/20/15.
 */
angular.module('mt.controllers').controller('CD', CD);
function CD($scope, $rootScope, api, $stateParams, $timeout, $state, auth, toastr) {
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
    $scope.addCdToPlaylist = function() {
        $rootScope.$emit("add-cd-to-playlist", $scope.cd);
        $state.go("app.playlist");
    };
    $scope.addToPlaylist = function (musica) {
        musica.cd = $scope.cd;
        $rootScope.$emit("add-to-playlist", musica);
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