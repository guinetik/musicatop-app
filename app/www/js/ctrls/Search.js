/**
 * Created by guinetik on 2/20/15.
 */
angular.module('mt.controllers').controller('Search', Search);
function Search($scope, $rootScope, api) {
    $scope.cds = [];
    $scope.eventos = [];
    $scope.musicas = [];
    $scope.searchCD = function (q) {
        if (q != null) {
            $rootScope.$emit("search-query", q);
            api.searchCD(q, function (result) {
                if (result.status == 200) {
                    console.log("search", result);
                    $scope.cds = result.cds;
                    $scope.eventos = result.eventos;
                    $scope.musicas = result.musicas;
                }
            });
        }
    };
    $scope.addToPlaylist = function (musica) {
        $rootScope.$emit("add-to-playlist", musica);
    };
}