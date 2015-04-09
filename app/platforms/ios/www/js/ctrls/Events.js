/**
 * Created by guinetik on 2/20/15.
 */
angular.module('mt.controllers').controller('Events', Events);
function Events($scope, $timeout, api) {
    $scope.eventos = [];
    $scope.$on('$ionicView.beforeEnter', function (event) {
        $scope.dataLoaded = false;
        $timeout($scope.updateEvents);
    });
    $scope.updateEvents = function () {
        api.getLatestEvents(function (result) {
            if (result.status == 200) {
                $scope.dataLoaded = true;
                $scope.eventos = result.eventos;
            } else {
                window.location.reload();
            }
        });
    };
}