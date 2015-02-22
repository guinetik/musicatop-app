/**
 * Created by guinetik on 2/20/15.
 */
angular.module("mt").config(function ($stateProvider, $urlRouterProvider) {
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
        .state('app.cd', {
            url: "/cds/:id",
            views: {
                'menuContent': {
                    templateUrl: "views/screens/cd.html",
                    controller: 'CD'
                }
            }
        })
        .state('app.events', {
            url: "/events",
            views: {
                'menuContent': {
                    templateUrl: "views/screens/events.html",
                    controller: 'Events'
                }
            }
        })
        .state('app.event', {
            url: "/event/:id",
            views: {
                'menuContent': {
                    templateUrl: "views/screens/event.html",
                    controller: 'Event'
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
        })
        .state('app.perfil', {
            url: "/perfil/:id",
            views: {
                'menuContent': {
                    templateUrl: "views/screens/perfil.html",
                    controller: 'Perfil'
                }
            }
        }).state('app.playlist', {
            url: "/playlist",
            views: {
                'menuContent': {
                    templateUrl: "views/screens/playlist.html",
                    controller: 'Playlist'
                }
            }
        });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
});