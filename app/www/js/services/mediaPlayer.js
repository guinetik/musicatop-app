'use strict';

/**
 * @ngdoc service
 * @name musicaApp.mediaPlayer
 * @description
 * # Media Player
 * Service in the musicaApp.
 */
angular.module('mt').service('mediaPlayer', ['$rootScope', '$timeout', mediaPlayer]);
function mediaPlayer($rootScope, $timeout) {
    var mediaPlayer = this;
    mediaPlayer.currentTrack = 0;
    mediaPlayer.currentMedia = null;
    mediaPlayer.nowPlaying = false;
    mediaPlayer.loop = -1;
    mediaPlayer.getFormatTime = function () {
        if (mediaPlayer.currentMedia != null) {
            mediaPlayer.currentMedia.getCurrentPosition(function (time) {
                console.log("getCurrentPosition", time);
                mediaPlayer.formatTime = mediaPlayer.formatTimeString(time);
                $rootScope.$apply();
            });
        } else
            return "00:00";
    };
    mediaPlayer.formatTimeString = function (time) {
        var duration = moment.duration(time, "seconds");
        console.log("duration", duration);
        return $rootScope.mostraZero(duration.minutes()) + ":" + $rootScope.mostraZero(duration.seconds());
    };
    mediaPlayer.getFormatDuration = function () {
        if (mediaPlayer.currentMedia != null) {
            var time = mediaPlayer.currentMedia.getDuration();
            return mediaPlayer.formatTimeString(time);
        } else
        return "00:00";
    };
    mediaPlayer.prev = function () {
        mediaPlayer.currentTrack--;
        if (mediaPlayer.currentTrack < 0) {
            mediaPlayer.currentTrack = $rootScope.playlist.length - 1;
        }
        mediaPlayer.stopAndRelease();
        mediaPlayer.play(mediaPlayer.currentTrack);
    };
    mediaPlayer.next = function () {
        mediaPlayer.currentTrack++;
        if (mediaPlayer.currentTrack > $rootScope.playlist.length) mediaPlayer.currentTrack = 0;
        mediaPlayer.stopAndRelease();
        mediaPlayer.play(mediaPlayer.currentTrack);
    };
    mediaPlayer.playPause = function () {
        if (mediaPlayer.nowPlaying) {
            mediaPlayer.pause();
            clearInterval(mediaPlayer.loop);
        } else {
            if (mediaPlayer.currentMedia != null) {
                mediaPlayer.nowPlaying = true;
                mediaPlayer.currentMedia.play();
            } else {
                mediaPlayer.play(mediaPlayer.currentTrack);
            }
            mediaPlayer.loop = setInterval(mediaPlayer.updateTime, 1000);
        }
        $rootScope.$apply();
    };
    mediaPlayer.stopAndRelease = function () {
        if (mediaPlayer.currentMedia != null) {
            console.log("stopping current");
            mediaPlayer.currentMedia.stop();
            mediaPlayer.currentMedia.release();
        }
    };
    mediaPlayer.play = function (id) {
        console.log("mediaPlayer.play", $rootScope.playlist[id].src);
        mediaPlayer.stopAndRelease();
        mediaPlayer.currentTrack = id;
        mediaPlayer.loaded = false;
        mediaPlayer.nowPlaying = true;
        mediaPlayer.currentMedia = new Media($rootScope.playlist[id].src, null, null, mediaPlayer.onMediaStatus);
        //console.log("new Media", JSON.stringify(mediaPlayer.currentMedia));
        $timeout(function () {
            mediaPlayer.currentMedia.play();
        }, 1000);
        $rootScope.$apply();
    };
    mediaPlayer.pause = function () {
        mediaPlayer.nowPlaying = false;
        if (mediaPlayer.currentMedia != null) {
            mediaPlayer.currentMedia.pause();
        }
    };
    mediaPlayer.onMediaStatus = function (id) {
        var sts = ["MEDIA_NONE", "MEDIA_STARTING", "MEDIA_RUNNING", "MEDIA_PAUSED", "MEDIA_STOPPED"];
        if (id == 2) {
            mediaPlayer.loaded = true;
            mediaPlayer.loop = setInterval(mediaPlayer.updateTime, 1000);
        } else if (id < 2) {
            mediaPlayer.loaded = false;
            clearInterval(mediaPlayer.loop);
        }
        console.log("mediaPlayer.onMediaStatus", id, sts[id], mediaPlayer.loaded);
        $rootScope.$apply();
    };
    mediaPlayer.updateTime = function () {
        mediaPlayer.formatTime = mediaPlayer.getFormatTime();
        mediaPlayer.formatDuration = mediaPlayer.getFormatDuration();
        $rootScope.$apply();
    };
}
