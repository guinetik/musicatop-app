/**
 * Created by guinetik on 2/20/15.
 */
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
            $('#playlist').animate({'height': '125px', 'border-top': 0});
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