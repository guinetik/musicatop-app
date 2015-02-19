angular.module('mt.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $ionicSideMenuDelegate) {
        $scope.showPlayer = true;
        $scope.nowPlaying = false;
        $scope.isMenuOpened = function () {
            return $ionicSideMenuDelegate.isOpen()
        };
        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('views/screens/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        $scope.$on('$ionicView.enter', function (event) {
            if ($scope.nowPlaying) {
                setTimeout(function () {
                    functions.playlist.hide();
                    $('.playlist-plug').addClass("closed");
                }, 100);
            }
        });

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };
    })

    .controller('Home', function ($scope, $rootScope) {
        $scope.playlists = [
            {title: 'Reggae', id: 1},
            {title: 'Chill', id: 2},
            {title: 'Dubstep', id: 3},
            {title: 'Indie', id: 4},
            {title: 'Rap', id: 5},
            {title: 'Cowbell', id: 6}
        ];
    })

    .controller('Discover', function ($scope, $stateParams) {
    })

    .controller('Cds', function ($scope, $stateParams) {
    })

    .controller('CD', function ($scope, $stateParams) {
    })

    .controller('Artists', function ($scope, $stateParams) {
    })

    .controller('Events', function ($scope, $stateParams) {
    })

    .controller('Event', function ($scope, $stateParams) {
    })

    .controller('Signup', function ($scope, $stateParams) {
    });
