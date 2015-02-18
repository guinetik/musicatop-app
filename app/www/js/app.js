angular.module('mt', ['ionic', 'mt.controllers'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "views/screens/menu.html",
                controller: 'AppCtrl'
            })

            .state('app.home', {
                url: "/home",
                views: {
                    'menuContent': {
                        templateUrl: "views/screens/home.html",
                        controller: 'Home'
                    }
                }
            })

            .state('app.discover', {
                url: "/discover",
                views: {
                    'menuContent': {
                        controller: 'Discover',
                        templateUrl: "views/screens/discover.html"
                    }
                }
            })

            .state('app.artists', {
                url: "/artists",
                views: {
                    'menuContent': {
                        controller: 'Artists',
                        templateUrl: "views/screens/artists.html"
                    }
                }
            })


            .state('app.cds', {
                url: "/cds",
                views: {
                    'menuContent': {
                        templateUrl: "views/screens/cds.html",
                        controller: 'Cds'
                    }
                }
            })
            .state('app.signup', {
                url: "/signup",
                views: {
                    'menuContent': {
                        templateUrl: "views/screens/signup.html",
                        controller: 'Signup'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/home');
    });
