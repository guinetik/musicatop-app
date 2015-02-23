/**
 * Created by guinetik on 2/20/15.
 */
angular.module("mt")
    .constant('API_URL', 'http://musicatop.jelastic.websolute.net.br/')
    .config(function (toastrConfig) {
        angular.extend(toastrConfig, {
            allowHtml: false,
            closeButton: true,
            closeHtml: '<button>&times;</button>',
            containerId: 'toast-container',
            extendedTimeOut: 500,
            iconClasses: {
                error: 'toast-error',
                info: 'toast-info',
                success: 'toast-success',
                warning: 'toast-warning'
            },
            tapToDismiss: true,
            timeOut: 1000
        });
    })
    .config(function (blockUIConfig) {
        blockUIConfig.autoBlock = false;
        blockUIConfig.resetOnException = true;
        blockUIConfig.message = 'Carregando';
        blockUIConfig.delay = 10;
        blockUIConfig.template = '<div class=\"block-ui-overlay\"></div><div class=\"block-ui-message-container\" aria-live=\"assertive\" aria-atomic=\"true\"><div class=\"block-ui-message\" ng-class=\"$_blockUiMessageClass\"><i class="icon ion-load-c spin"></i> {{ state.message }}</div></div>';
        blockUIConfig.requestFilter = function (config) {
            if (config.url.indexOf("mp3") > 0) {
                console.log("iffff");
                return false; // ... don't block it.
            } else {
                console.log("fowkfokwoef");
            }
        };
    })
    .config(function ($ionicConfigProvider) {
        $ionicConfigProvider.backButton.text('').icon('ion-ios7-arrow-left');
        $ionicConfigProvider.backButton.previousTitleText(false);
    });