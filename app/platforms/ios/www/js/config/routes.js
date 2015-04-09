/**
 * Created by guinetik on 2/20/15.
 */
angular.module("mt").config(Routes);
function Routes($stateProvider, $urlRouterProvider) {
    var routesConfig = {
        'app': {
            url: "/app",
            abstract: true,
            templateUrl: "views/screens/menu.html",
            controller: 'AppCtrl'
        },
        'app.home': {
            url: "/home",
            views: {
                'menuContent': {
                    templateUrl: "views/screens/home.html",
                    controller: 'Home'
                }
            }
        },
        'app.discover': {
            url: "/discover",
            views: {
                'menuContent': {
                    controller: 'Discover',
                    templateUrl: "views/screens/discover.html"
                }
            }
        },
        'app.artists': {
            url: "/artists",
            views: {
                'menuContent': {
                    controller: 'Artists',
                    templateUrl: "views/screens/artists.html"
                }
            }
        },
        'app.cds': {
            url: "/cds",
            views: {
                'menuContent': {
                    templateUrl: "views/screens/cds.html",
                    controller: 'Cds'
                }
            }
        },
        'app.cd': {
            url: "/cds/:id",
            views: {
                'menuContent': {
                    templateUrl: "views/screens/cd.html",
                    controller: 'CD'
                }
            }
        },
        'app.events': {
            url: "/events",
            views: {
                'menuContent': {
                    templateUrl: "views/screens/events.html",
                    controller: 'Events'
                }
            }
        },
        'app.event': {
            url: "/event/:id",
            views: {
                'menuContent': {
                    templateUrl: "views/screens/event.html",
                    controller: 'Event'
                }
            }
        },
        'app.signup': {
            url: "/signup",
            views: {
                'menuContent': {
                    templateUrl: "views/screens/signup.html",
                    controller: 'Signup'
                }
            }
        },
        'app.perfil': {
            url: "/perfil/:id",
            views: {
                'menuContent': {
                    templateUrl: "views/screens/perfil.html",
                    controller: 'Perfil'
                }
            }
        },
        'app.playlist': {
            url: "/playlist",
            views: {
                'menuContent': {
                    templateUrl: "views/screens/playlist.html",
                    controller: 'Playlist'
                }
            }
        },
        'app.search': {
            url: "/buscar",
            views: {
                'menuContent': {
                    templateUrl: "views/screens/search.html",
                    controller: 'Search'
                }
            }
        }
    };
    angular.forEach(routesConfig, function(value, key) {
        console.log("route", key, value);
        $stateProvider.state(key, value);
    });
    $urlRouterProvider.otherwise('/app/home');
}