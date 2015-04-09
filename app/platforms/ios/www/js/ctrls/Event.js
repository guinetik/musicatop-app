/**
 * Created by guinetik on 2/20/15.
 */
angular.module('mt.controllers').controller('Event', Event);
function Event($scope, $timeout, $stateParams, api) {
    $scope.evento = {};
    $scope.map = {center: {latitude: 45, longitude: -73}, zoom: 14, options: {scrollwheel: false}};
    $scope.id = $stateParams.id;
    $scope.$on('$ionicView.beforeEnter', function (event) {
        $scope.dataLoaded = false;
        $timeout($scope.updateEvent);
    });
    $scope.updateEvent = function () {
        console.log("updateEvent", $scope.id);
        api.getEvent($scope.id, function (result) {
            console.log("updateEvent", result);
            if (result.status == 200) {
                $scope.evento = result;
                $scope.updateMap();
                $scope.dataLoaded = true;
            }
        })
    };
    $scope.updateMap = function () {
        $scope.map.center = {latitude: $scope.evento.local.location.lat, longitude: $scope.evento.local.location.lng};
        $scope.marker = {
            id: 0,
            coords: {
                latitude: $scope.map.center.latitude,
                longitude: $scope.map.center.longitude
            },
            options: {scrollwheel: false},
            events: {
                click: function (marker, eventName, args) {
                    $scope.marker.options = {
                        draggable: false,
                        labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                        labelAnchor: "100 0",
                        labelClass: "marker-labels"
                    };
                }
            }
        };
    }
}