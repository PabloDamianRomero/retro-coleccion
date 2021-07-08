// Autor: Pablo Damian Romero
// Legajo: FAI-1652 

// INSERTAR VÍDEOS DE YOUTUBE SIN PERJUDICAR LA CARGA DE LA WEB
// Fuente: https://internetrepublica.com/como-insertar-videos-de-youtube-sin-perjudicar-la-carga-de-tu-web/

(function() {
    var v = document.getElementsByClassName("reproductor");
    for (var n = 0; n < v.length; n++) {
        var p = document.createElement("div");
        p.innerHTML = labnolThumb(v[n].dataset.id);
        p.onclick = labnolIframe;
        v[n].appendChild(p);
    }
})();
function labnolThumb(id) {
    return '<img class="imagen-previa" src="https://i.ytimg.com/vi/' + id + '/maxresdefault.jpg"><div class="youtube-play"></div>';
}
function labnolIframe() {
    var iframe = document.createElement("iframe");
    iframe.setAttribute("src", "https://www.youtube.com/embed/" + this.parentNode.dataset.id + "?autoplay=1&autohide=2&border=0&wmode=opaque&enablejsapi=1&controls=0&showinfo=0");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("id", "youtube-iframe");
    this.parentNode.replaceChild(iframe, this);
}