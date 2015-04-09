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
    mediaPlayer.currentPosition = 0;
    mediaPlayer.loop = -1;
    mediaPlayer.getFormatTime = function () {
        if (mediaPlayer.currentMedia != null) {
            mediaPlayer.formatTime = mediaPlayer.formatTimeString(mediaPlayer.currentPosition);
            mediaPlayer.currentMedia.getCurrentPosition(function (time) {
                //console.log("getCurrentPosition", time);
                mediaPlayer.currentPosition = time;
                var x = mediaPlayer.formatTimeString(mediaPlayer.currentPosition);
                if (x != mediaPlayer.formatTime) {
                    mediaPlayer.formatTime = x;
                    $rootScope.$apply();
                }
            });
        } else
            return "00:00";
    };
    mediaPlayer.formatTimeString = function (time) {
        var duration = moment.duration(time, "seconds");
        //console.log("duration", duration);
        return $rootScope.mostraZero(duration.minutes()) + ":" + $rootScope.mostraZero(duration.seconds());
    };
    mediaPlayer.getFormatDuration = function () {
        if (mediaPlayer.currentMedia != null && mediaPlayer.loaded) {
            var time = mediaPlayer.currentMedia.getDuration();
            mediaPlayer.duration = time;
            return mediaPlayer.formatTimeString(time);
        } else
            return "Carregando...";
    };
    mediaPlayer.prev = function () {
        if ($rootScope.playlist.length > 1) {
            if (mediaPlayer.currentPosition < 4) {
                mediaPlayer.currentTrack--;
                if (mediaPlayer.currentTrack < 0) {
                    mediaPlayer.currentTrack = $rootScope.playlist.length - 1;
                }
                mediaPlayer.canGoNext = false;
                mediaPlayer.stopAndRelease();
                mediaPlayer.play(mediaPlayer.currentTrack);
            } else {
                mediaPlayer.currentMedia.seekTo(0);
            }
        } else {
            mediaPlayer.currentMedia.seekTo(0);
        }
    };
    mediaPlayer.next = function () {
        if ($rootScope.playlist.length > 1) {
            mediaPlayer.currentTrack++;
            if (mediaPlayer.currentTrack > $rootScope.playlist.length) mediaPlayer.currentTrack = 0;
            mediaPlayer.canGoNext = false;
            mediaPlayer.stopAndRelease();
            mediaPlayer.play(mediaPlayer.currentTrack);
        }
    };
    mediaPlayer.seek = function (to) {
        console.log("seek", to);
        mediaPlayer.currentMedia.seekTo(to * 1000);
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
    mediaPlayer.stopAndRelease = function () {
        if (mediaPlayer.currentMedia != null) {
            //console.log("stopping current");
            mediaPlayer.nowPlaying = false;
            mediaPlayer.loaded = false;
            mediaPlayer.formatTime = "";
            mediaPlayer.formatDuration = "carregando";
            mediaPlayer.currentMedia.stop();
            mediaPlayer.currentMedia.release();
        }
    };
    mediaPlayer.play = function (id) {
        //console.log("mediaPlayer.play", $rootScope.playlist[id].src);
        mediaPlayer.stopAndRelease();
        mediaPlayer.currentTrack = id;
        mediaPlayer.loaded = false;
        mediaPlayer.nowPlaying = true;
        mediaPlayer.canGoNext = false;
        mediaPlayer.duration = mediaPlayer.currentPosition = 0;
        mediaPlayer.formatDuration = "carregando";
        mediaPlayer.formatTime = "";
        mediaPlayer.currentMedia = new Media($rootScope.playlist[id].src, null, null, mediaPlayer.onMediaStatus);
        //console.log("new Media", JSON.stringify(mediaPlayer.currentMedia));
        $timeout(function () {
            mediaPlayer.canGoNext = true;
            var metadata = {
                artist: $rootScope.playlist[id].cd.artista.nome,
                trackname: $rootScope.playlist[id].title,
                albumart: "http://musicatop.jelastic.websolute.net.br/public/img/" + $rootScope.playlist[id].cd.capa
            };
            console.log("metadata", JSON.stringify(metadata));
            mediaPlayer.currentMedia.setupInfoCenter();
            mediaPlayer.currentMedia.play({
                songdata: metadata
            });
        }, 1000);
    };
    mediaPlayer.pause = function () {
        mediaPlayer.nowPlaying = false;
        if (mediaPlayer.currentMedia != null) {
            mediaPlayer.currentMedia.pause();
        }
    };
    mediaPlayer.onMediaStatus = function (id) {
        var sts = ["MEDIA_NONE", "MEDIA_STARTING", "MEDIA_RUNNING", "MEDIA_PAUSED", "MEDIA_STOPPED", "MEDIA_NEXT", "MEDIA_PREV"];
        if (id == 2) {
            mediaPlayer.loaded = true;
            mediaPlayer.nowPlaying = true;
            mediaPlayer.updateTime();
        } else if (id < 2) {
            mediaPlayer.loaded = false;
        } else if (id == 4) {
            mediaPlayer.loaded = false;
            mediaPlayer.nowPlaying = false;
            if (mediaPlayer.canGoNext) mediaPlayer.next();
        } else if (id == 5) {
            mediaPlayer.next();
        } else if (id == 6) {
            mediaPlayer.prev();
        }
        console.log("mediaPlayer.onMediaStatus", id, sts[id], mediaPlayer.loaded);
    };
    mediaPlayer.updateTime = function () {
        if (mediaPlayer.loaded && mediaPlayer.nowPlaying) {
            console.log("updatingTime");
            mediaPlayer.formatTime = mediaPlayer.getFormatTime();
            mediaPlayer.formatDuration = mediaPlayer.getFormatDuration();
            $timeout(mediaPlayer.updateTime, 1000);
        }
    };
}
