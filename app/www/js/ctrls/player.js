'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:PlayerCtrl
 * @description
 * # PlayerCtrl
 * Controller of the musicaApp
 */
angular.module('mt').controller('PlayerCtrl', ['$scope', '$rootScope', '$timeout', '$filter', 'API_URL', '$sce', PlayerCtrl]);
function PlayerCtrl($scope, $rootScope, $timeout, $filter, API_URL, $sce) {
    $scope.playload = false;
    $scope.hasBeenAddedToPlaylist = function (id) {
        var r = false;
        angular.forEach($rootScope.playlist, function (song, key) {
            if (song.id == id) {
                r = true;
            }
        });
        return r;
    };
    $scope.clearPlaylist = function () {
        $rootScope.playlist = [];
    };
    $scope.getSongById = function (id) {
        var k = -1;
        for (var i = 0; i < $rootScope.playlist.length; i++) {
            var song = $rootScope.playlist[i];
            if (song.id == id) {
                k = i;
            }
        }
        return k;
    };
    $rootScope.$on("add-cd-to-playlist", function (event, _cd) {
        var orderBy = $filter('orderBy');
        var cd = angular.copy(_cd);
        var list = orderBy(cd.musicas, 'track', true);
        delete cd.musicas;
        functions.playlist.show();
        $scope.playload = false;
        angular.forEach(list, function (song, key) {
            $rootScope.playlist.unshift(
                {
                    title: song.nome,
                    id: song.id,
                    cd: cd,
                    //src: $sce.trustAsResourceUrl(API_URL + 'public/music/' + song.filename),
                    src: API_URL + 'public/music/' + song.filename,
                    type: 'audio/mp3',
                    mimeType: 'image/png'
                }
            );
            $(".progress").width(0);
            $scope.playload = false;
        });
        $timeout(function () {
            $scope.playload = true;
            $scope.mediaPlayer.play(0, false);
            functions.playlist.show();
        }, 50);
    });
    $rootScope.$on("add-to-playlist", function (event, music) {
        console.log("add-to-playlist", music);
        var k = $scope.hasBeenAddedToPlaylist(music.id);
        if (!k) {
            $rootScope.playlist.unshift(
                {
                    id: music.id,
                    title: music.nome,
                    cd: music.cd,
                    //src: $sce.trustAsResourceUrl(API_URL + 'public/music/' + song.filename),
                    src: API_URL + 'public/music/' + music.filename,
                    type: 'audio/mp3'
                }
            );
            functions.playlist.show();
            $scope.playload = false;
            $timeout(function () {
                $scope.playload = true;
                functions.playlist.show();
                $scope.mediaPlayer.play(0, false);
            });
        } else {
            k = $scope.getSongById(music.id);
            $scope.mediaPlayer.play(k);
            functions.playlist.show();
        }
    });
    $scope.next = function (id) {
        functions.playlist.show();
        $scope.mediaPlayer.play(id, false);
    }
}