/**
 * Created by guinetik on 2/20/15.
 */
angular.module('mt.controllers').controller('Cds', Cds);
function Cds($scope, $timeout, api) {
    $scope.cds = [];
    $scope.$on('$ionicView.beforeEnter', function (event) {
        $scope.dataLoaded = false;
        $timeout($scope.updateCDs);
    });
    $scope.updateCDs = function () {
        api.getCDs(function (result) {
            if (result.status == 200) {

                $scope.dataLoaded = true;
                var cds = {};
                angular.forEach(result, function (cd, key) {
                    if (cd.genero) {
                        if (cds[cd.genero.id]) {
                            cds[cd.genero.id].cds.push(cd);
                        } else {
                            cds[cd.genero.id] = {
                                nome: cd.genero.nome,
                                cds: [cd]
                            };
                        }
                    }
                });
                angular.forEach(cds, function (gcd, key) {
                    gcd.t = gcd.cds.length;
                    $scope.cds.push(gcd);
                });
                console.log("cds", $scope.cds);
            } else {
                window.location.reload();
            }
        });
    };
}