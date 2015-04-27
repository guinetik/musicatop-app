'use strict';

/**
 * @ngdoc service
 * @name musicaApp.auth
 * @description
 * # auth
 * Factory in the musicaApp.
 */
angular.module('mt').factory('auth', function ($window, $rootScope, api) {
    var storage = $window.localStorage;
    var cachedToken = "-1";
    var cachedUser;
    return {
        setToken: function (token) {
            cachedToken = token;
            storage.setItem('userToken', token);
        },
        getToken: function () {
            if (cachedToken == "-1") cachedToken = storage.getItem('userToken');
            return cachedToken;
        },
        getUuid: function () {
            if (window.device != null && window.device.uuid != null) {
                console.log("device.uuid", device.uuid);
                return device.uuid;
            } else {
                var storageUuid = storage.getItem("MUSICATOP_DEVICE_UUID");
                if (storageUuid != null) {
                    return storageUuid;
                } else {
                    storageUuid = md5(new Date().getTime());
                    storage.setItem("MUSICATOP_DEVICE_UUID", storageUuid);
                    return storageUuid;
                }
            }
        },
        isAuthenticated: function () {
            //console.log("isAuth");
            return this.getToken() != "-1";
        },
        logout: function () {
            storage.removeItem('userToken');
            cachedToken = "-1";
            $rootScope.$emit("update-user-token", "-1");
        },
        getUser: function (token) {
            if (cachedUser) {
                return cachedUser;
            } else {
                var cb = function (result) {
                    if (result.status == 200) {
                        cachedUser = result.data;
                        $rootScope.$emit("user-lookup", result.data);
                    } else {
                        //console.log("getUser errror");
                        storage.removeItem('userToken');
                        cachedToken = "-1";
                        $rootScope.$emit("update-user-token", "-1");
                    }
                };
                api.lookup(token, cb);
                return cb;
            }
        }
    };
});
