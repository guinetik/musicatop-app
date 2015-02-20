/**
 * Created by guinetik on 2/20/15.
 */
angular.module('mt.controllers').controller('Home', Home);
function Home($scope, $rootScope) {
    $scope.playlists = [
        {title: 'Reggae', id: 1},
        {title: 'Chill', id: 2},
        {title: 'Dubstep', id: 3},
        {title: 'Indie', id: 4},
        {title: 'Rap', id: 5},
        {title: 'Cowbell', id: 6}
    ];
}