'use strict';

/**
 * @ngdoc service
 * @name musicaApp.Api
 * @description
 * # Api
 * Service in the musicaApp.
 */
angular.module('mt').service('api', ['ws', 'API_URL', api]);
function api(ws, API_URL, blockUI) {
    var api = this;
    api.getEstados = function (cb) {
        ws.consumeService("data/estados", null, null, cb, false, "GET");
    };
    api.getHome = function (cb) {
        ws.consumeService("data/home", null, null, cb, false, "GET");
    };
    api.getGeneros = function (cb) {
        ws.consumeService("data/generos", null, null, cb, false, "GET");
    };
    api.signup = function (user, cb) {
        ws.consumeService("usuarios/create", user, null, cb, false);
    };
    api.login = function (user, cb) {
        ws.consumeService("user/login", user, null, cb, false);
    };
    api.lookup = function (token, cb) {
        ws.consumeService("usuarios/lookup", null, token, cb, false);
    };
    api.addCd = function (token, cd, cb) {
        ws.consumeService("cd/add", cd, token, cb, false);
    };
    api.addEvento = function (token, evento, cb) {
        evento.local = evento.local.name;
        ws.consumeService("eventos/create", evento, token, cb, false);
    };
    api.saveCd = function (token, cd, cb) {
        ws.consumeService("cd/save", {id_cd: cd.id}, token, cb, false);
    };
    api.deleteMusic = function (music, token, cb) {
        ws.consumeService("musica/destroy/" + music.id, {id_music: music.id}, token, cb, false, "POST");
    };
    api.deleteCd = function (cd, token, cb) {
        ws.consumeService("cd/destroy/" + cd.id, {id_cd: cd.id}, token, cb, false, "POST");
    };
    api.deleteEvent = function (event, token, cb) {
        ws.consumeService("eventos/destroy/" + event.id, {id_evento: event.id}, token, cb, false, "POST");
    };
    api.updateMusic = function (music, token, cb) {
        var m = {
            id_music: music.id,
            cd: music.cd,
            nome: music.nome
        };
        ws.consumeService("musica/update/" + music.id, m, token, cb, false);
    };
    api.updateEvent = function (event, token, cb) {
        var e = {
            id: event.id,
            id_event: event.id,
            nome: event.nome,
            descricao: event.descricao,
            local: event.local.name,
            cidade: event.cidade.id,
            inicio: event.inicio,
            fim: event.fim,
            foto: event.foto,
            link: event.link
        };
        ws.consumeService("eventos/update/" + e.id, e, token, cb, false);
    };
    api.updateTrack = function (music, token, cb) {
        var m = {
            id_music: music.id,
            track: music.track
        };
        ws.consumeService("musica/update/track", m, token, cb, false);
    };
    api.getLatestEvents = function (cb) {
        ws.consumeService("eventos/latest", null, null, cb, false, "GET");
    };
    api.getUserCollection = function (token, cb) {
        ws.consumeService("usuarios/collection", null, token, cb, false, "GET");
    };
    api.getUserEvents = function (token, cb) {
        ws.consumeService("usuarios/eventos", null, token, cb, false, "GET");
    };
    api.getProfile = function (id, cb) {
        ws.consumeService("usuarios/perfil?id=" + id, null, null, cb, false, "GET");
    };
    api.getCD = function (id, cb) {
        ws.consumeService("cd/get?id=" + id, null, null, cb, false, "GET");
    };
    api.getCDs = function (cb) {
        ws.consumeService("cd", null, null, cb, false, "GET");
    };
    api.getEvent = function (id, cb) {
        ws.consumeService("eventos/" + id, null, null, cb, false, "GET");
    };
    api.updateProfile = function (user, token, cb) {
        var u = {
            id_user: user.id,
            id: user.id,
            nome: user.nome,
            email: user.email,
            sexo: user.sexo,
            cidade: user.cidade,
            twitter: user.twitter,
            facebook: user.facebook,
            instagram: user.instagram,
            nascimento: user.nascimento
        };
        ws.consumeService("usuarios/" + user.id, u, token, cb, false);
    };
    api.updateCD = function (cd, token, cb) {
        var c = {
            id_cd: cd.id,
            id: cd.id,
            titulo: cd.titulo,
            descricao: cd.descricao,
            private: cd.private,
            capa: cd.capa,
            genero: cd.genero
        };
        ws.consumeService("cd/update/" + cd.id, c, token, cb, false);
    };
    api.updatePassword = function (user, token, cb) {
        user.id_user = user.id;
        ws.consumeService("user/password/update", user, token, cb, false);
    };
    api.downloadCD = function (id, cb) {
        ws.consumeService("cd/download/", {id: id}, null, cb, false, "POST");
    };
    api.downloadMusic = function (id, cb) {
        ws.consumeService("musica/download/", {id: id}, null, cb, false, "POST");
    };
    api.getCdsByGenero = function (id, cb) {
        ws.consumeService("cd/genero?id=" + id, null, null, cb, false, "GET");
    };
    api.searchCD = function (q, cb) {
        ws.consumeService("cd/search?q=" + q, null, null, cb, false, "GET");
    };
    api.searchPlace = function (query, cidade, cb) {
        var cid = "EKMXJ3PZOKGAGZIVNWTRLXTTSMW4KOXSD0X0RROJCBNYDYB4";
        var shh = "NMTM2OWFGHC3XDINPQBWT4LO1HSOLLAWZGJKNRABFSBSFOS2";
        var url = "https://api.foursquare.com/v2/venues/search";
        url += "?client_id=" + cid;
        url += "&client_secret=" + shh;
        url += "&v=20130815";
        url += "&near=" + cidade.nome;
        url += "&query=" + query;
        ws.consumeService(url, null, null, function (result) {
            //console.log("searchPlace", result);
            cb(result);
        }, true, "GET", false);

    };
}
