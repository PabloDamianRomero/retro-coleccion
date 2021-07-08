// Autor: Pablo Damian Romero
// Legajo: FAI-1652 

// FUNCIONES GENERALES

/* Funciones para subir al principio de una página */
function scrollUp(){
    var $currentScroll = document.documentElement.scrollTop; // Obtiene el número de pixels desplazados
    if($currentScroll > 0){
        window.requestAnimationFrame(scrollUp); // window.requestAnimationFrame informa al navegador que quieres realizar una animación y solicita que el navegador programe el repintado de la ventana para el próximo ciclo de animación. El método acepta como argumento una función a la que llamar antes de efectuar el repintado.
        window.scrollTo(0, $currentScroll - ($currentScroll / 15)); // Velocidad de scroll
    }
}

var $button = document.getElementById('subirPagina');
window.onscroll = function(){
    var $scroll = document.documentElement.scrollTop;
    if($scroll > 500){
        $button.style.transform = 'scale(1)';
       }else{
           $button.style.transform = 'scale(0)';
       }
   }

   //---------------------------------------------------------------------------------------------------


   // Funcion para dirigirse a index.html con un click
   function goToIndex(){
       window.location.replace('index.html');
   }

   // Funcion para dirigirse a redes (instagram) con un click
   function irARedes(){
        window.open('https://www.instagram.com/retrocoleccionoficial/?hl=es');
   }

   //-------------------------------------------------------------




