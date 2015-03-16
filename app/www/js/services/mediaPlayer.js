'use strict';

/**
 * @ngdoc service
 * @name musicaApp.mediaPlayer
 * @description
 * # Media Player
 * Service in the musicaApp.
 */
angular.module('mt').service('mediaPlayer', ['$rootScope', '$cordovaMedia', mediaPlayer]);
function mediaPlayer($rootScope, $cordovaMedia) {
    var mediaPlayer = this;
    mediaPlayer.currentTrack = 0;
    mediaPlayer.currentMedia = null;
    mediaPlayer.nowPlaying = false;
    mediaPlayer.getFormatTime = function () {
        return "00:00";
    };
    mediaPlayer.getFormatDuration = function () {
        return "00:00";
    };
    mediaPlayer.prev = function () {
        mediaPlayer.play(Math.max(--mediaPlayer.currentTrack, 0));
    };
    mediaPlayer.next = function () {
        mediaPlayer.play(++mediaPlayer.currentTrack % $rootScope.playlist.length);
    };
    mediaPlayer.playPause = function () {
        if (mediaPlayer.nowPlaying) {
            mediaPlayer.pause();
        } else {
            if (mediaPlayer.currentMedia != null) {
                mediaPlayer.nowPlaying = true;
                mediaPlayer.currentMedia.play();
            } else {
                mediaPlayer.play(mediaPlayer.currentTrack);
            }
        }
    };
    mediaPlayer.play = function (id) {
        if (id != mediaPlayer.currentTrack) {
            if (mediaPlayer.currentMedia != null) {
                mediaPlayer.currentMedia.stop();
                mediaPlayer.currentMedia.release();
            }
        }
        mediaPlayer.currentTrack = id;
        mediaPlayer.nowPlaying = true;
        mediaPlayer.currentMedia = $cordovaMedia.newMedia($rootScope.playlist[id].src).then(function () {
            mediaPlayer.currentMedia.play();
        }, function () {
            alert("media player errror");
        });
    };
    mediaPlayer.pause = function () {
        mediaPlayer.nowPlaying = false;
        if (mediaPlayer.currentMedia != null) {
            mediaPlayer.currentMedia.pause();
        }
    }
    mediaPlayer.formatTime = mediaPlayer.getFormatTime();
    mediaPlayer.formatDuration = mediaPlayer.getFormatDuration();
}
