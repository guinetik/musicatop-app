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
    .directive('sticky', function($ionicScrollDelegate) {
        var options,
            defaults = {
                classes: {
                    animated: 'item-animated',
                    container: 'item-wrapper',
                    hidden: 'item-hidden',
                    stationaryHeader: 'item item-divider'
                },
                selectors: {
                    groupContainer: 'item-container',
                    groupHeader: 'item-divider',
                    stationaryHeader: 'div'
                }
            };
        return {
            restrict: 'A',
            link: function(scope, element, attrs, ctrl) {

                var items = [],
                    options = angular.extend(defaults, attrs),
                    $element = angular.element(element),
                    $fakeHeader = angular.element('<div class="' + options.classes.stationaryHeader + '"/>'),
                    $groupContainer = angular.element($element[0].getElementsByClassName(options.selectors.groupContainer));

                $element.addClass('list-sticky');

                angular.element($element[0].getElementsByClassName('list')).addClass(options.classes.container);

                $element.prepend($fakeHeader);

                angular.forEach($groupContainer, function(elem, index) {

                    var $tmp_list = $groupContainer.eq(index);
                    $tmp_header = angular.element($tmp_list[0].getElementsByClassName(options.selectors.groupHeader)).eq(0),
                        $tmp_listHeight = $tmp_list.prop('offsetHeight'),
                        $tmp_listOffset = $tmp_list[0].getBoundingClientRect().top ;

                    items.push({
                        'list': $tmp_list,
                        'header': $tmp_header,
                        'listHeight': $tmp_listHeight,
                        'headerText': $tmp_header.text(),
                        'headerHeight': $tmp_header.prop('offsetHeight'),
                        'listOffset': $tmp_listOffset,
                        'listBottom': $tmp_listHeight + $tmp_listOffset
                    });
                });

                $fakeHeader.text(items[0].headerText);

                scope.checkPosition = function() {
                    var i = 0,
                        topElement, offscreenElement, topElementBottom,
                        currentTop = $ionicScrollDelegate.$getByHandle('scrollHandle').getScrollPosition().top;

                    while ((items[i].listOffset - currentTop) <= 0) {
                        topElement = items[i];
                        topElementBottom = -(topElement.listBottom - currentTop);

                        if (topElementBottom < -topElement.headerHeight) {
                            offscreenElement = topElement;
                        }

                        i++;

                        if (i >= items.length) {
                            break;
                        }
                    }


                    if (topElement) {

                        if (topElementBottom < 0 && topElementBottom > -topElement.headerHeight) {
                            $fakeHeader.addClass(options.classes.hidden);
                            angular.element(topElement.list).addClass(options.classes.animated);
                        } else {
                            $fakeHeader.removeClass(options.classes.hidden);
                            if (topElement) {
                                angular.element(topElement.list).removeClass(options.classes.animated);
                            }
                        }
                        $fakeHeader.text(topElement.headerText);
                    }
                }
            }

        }
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