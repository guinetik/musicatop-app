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
    .config(function($ionicConfigProvider) {
        $ionicConfigProvider.backButton.text('').icon('ion-ios7-arrow-left');
        $ionicConfigProvider.backButton.previousTitleText(false);
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
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/home');
    });
var functions = functions || {};
functions = {
    playlist: {
        init: function (element) {
            var _this = $(element);
            _this.toggleClass('closed');
            if ($('#playlist').hasClass('visible')) {
                functions.playlist.hide();
            } else {
                functions.playlist.show();
            }
        },
        show: function () {
            $('#playlist').animate({'height': '110px', 'border-top': 0});
            $('.playlist-plug').attr('title', 'Esconder Playlist');
            $('#playlist').addClass('visible')
        },
        hide: function () {
            $('#playlist').animate({'height': '0px', 'border-top': '1px solid #3a3a3a'});
            $('.playlist-plug').attr('title', 'Abrir Playlist');
            $('#playlist').removeClass('visible');
        }
    }
};
$(window).load(function () {
    // Plug Playlist
    $(document).on('click', '.playlist-plug', function (e) {
        e.preventDefault();
        functions.playlist.init(this);
    });
});