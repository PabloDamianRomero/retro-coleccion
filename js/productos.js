// Autor: Pablo Damian Romero
// Legajo: FAI-1652 

var $item1 = {
     nombre: 'Dodge',
     modelo: 'Charger R/T',
     anio: 1969,
     escala: '1:25',
     precio: 21999
 };

 var $item2 = {
  nombre: 'Plymouth',
  modelo: 'GTX',
  anio: 1970,
  escala: '1:25',
  precio: 15999
 };

 var $item3 = {
  nombre: 'Chevrolet',
  modelo: 'Nova SS',
  anio: 1970,
  escala: '1:25',
  precio: 16999
};

 var $item4 = {
  nombre: 'Shelby',
  modelo: 'Cobra 427',
  anio: 1965,
  escala: '1:25',
  precio: 17999
};

var $item5 = {
  nombre: 'Dodge',
  modelo: 'Challenger R/T',
  anio: 1970,
  escala: '1:25',
  precio: 21999
};

var $item6 = {
  nombre: 'Ford',
  modelo: 'Mustang GT',
  anio: 1967,
  escala: '1:25',
  precio: 21999
};

var $item7 = {
  nombre: 'Ford',
  modelo: 'Fairlane Thunderbolt',
  anio: 1964,
  escala: '1:25',
  precio: 18999
};

var $item8 = {
  nombre: 'Dodge',
  modelo: 'Challenger R/T Convertible',
  anio: 1970,
  escala: '1:25',
  precio: 23999
};

var $item9 = {
  nombre: 'Chevrolet',
  modelo: 'Camaro SS 396 Convertible',
  anio: 1968,
  escala: '1:25',
  precio: 20999
};

var $item10 = {
  nombre: 'Ford',
  modelo: 'Pick Up',
  anio: 1956,
  escala: '1:24',
  precio: 21500
};

var $item11 = {
  nombre: 'Ford',
  modelo: 'F1 Pick Up',
  anio: 1948,
  escala: '1:25',
  precio: 20000
};

var $item12 = {
  nombre: 'Ford',
  modelo: 'F1 Pick Up',
  anio: 1951,
  escala: '1:18',
  precio: 27500
};

 let $colProductos = [];
 $colProductos[0] = $item1;
 $colProductos[1] = $item2;
 $colProductos[2] = $item3;
 $colProductos[3] = $item4;
 $colProductos[4] = $item5;
 $colProductos[5] = $item6;
 $colProductos[6] = $item7;
 $colProductos[7] = $item8;
 $colProductos[8] = $item9;
 $colProductos[9] = $item10;
 $colProductos[10] = $item11;
 $colProductos[11] = $item12;

 let $colCarrito = [];


 
//  INICIALIZA LOS PRODUCTOS QUE SERÁN MOSTRADOS EN LA PÁGINA
 function iniciar(){
  var  $longitud = $colProductos.length;
  for(var $i=0; $i < $longitud ; $i++){
    addElement($colProductos[$i],$i);
  }
}



//  AGREGA CADA ELEMENTO DE LA COLECCIÓN EN LA PAGINA
function addElement ($obj, $k) {
  var $incremento, $aString, $newDiv, $img, $nombreImg, $currentDiv, $idItem, $marcaModelo, $anio, $escala, $precio, $div0, $divp1, $divp2, $divCompra, $button, $idBoton;
  $newDiv = document.createElement("div");
  $img = new Image (300,250);
  $incremento = $k+1;
  $aString = String($incremento);
  $nombreImg = 'img/items/i'+$aString+'.png';
  $img.src = $nombreImg;

  $currentDiv = document.getElementById('items');
  

    $newDiv.style.backgroundColor = '#fff';
    $newDiv.style.width = '300px';
    $newDiv.style.height = '350px';
    $newDiv.style.display = 'inline-block';
    $newDiv.style.marginTop = '15px';
    $newDiv.style.marginRight = '15px';
    $newDiv.style.marginBottom = '15px';
    $newDiv.style.position = 'relative';
    
    $newDiv.className = 'prod';
    $newDiv.appendChild($img); // appendChild() inserta un nuevo nodo dentro de la estructura DOM de un documento
    $currentDiv.append($newDiv); // El método Element.append () inserta un conjunto de objetos Node u objetos DOMString después del último hijo del Element. Los objetos DOMString se insertan como nodos de texto equivalentes.

    $idItem = document.createElement('p');
    $marcaModelo = document.createElement('p');
    $anio = document.createElement('p');
    $escala = document.createElement('p');
    $precio = document.createElement('p');
    
    $idItem.innerHTML = $k;
    
    $marcaModelo.innerHTML = $obj['nombre'] +' '+ $obj['modelo'];
    $anio.innerHTML = 'Año: '+$obj['anio'];
    $escala.innerHTML = 'Escala: '+$obj['escala'];
    $precio.innerHTML = 'Precio: '+$obj['precio'];

    $div0 = document.createElement("div");
    $divp1 = document.createElement("div");
    $divp2 = document.createElement("div");
    $divCompra = document.createElement("div");
    
    $div0.className = 'idItem';
    $divp1.className = 'marcaYModeloItem';
    $divp2.className = 'datosItem';
    $divCompra.className = 'botonCompra';


    $div0.appendChild($idItem);
    $divp1.appendChild($marcaModelo);
    $divp2.appendChild($anio);
    $divp2.appendChild($escala);
    $divp2.appendChild($precio);
    
    $div0.style.position = 'absolute';
    $div0.style.top = '0';
    $idItem.style.visibility = 'hidden';
    
    $newDiv.appendChild($div0);
    $newDiv.appendChild($divp1);
    $newDiv.appendChild($divp2);

    $button = document.createElement('button');
    $button.innerHTML='Agregar al carrito';
    $button.style.color = '#fff';
    $button.style.backgroundColor = '#60bbde';
    $idBoton = String('accionCompra' + $aString);
    $button.id = $idBoton;
    $divCompra.appendChild($button);
    $newDiv.appendChild($divCompra);
    $button.onclick = function(){
      realizarCompra($idBoton);
    }
}



// AGREGA AL CARRITO EL ELEMENTO SELECCIONADO PARA COMPRAR
function realizarCompra($idB){
   var $boton, $cancelar, $nuevoId, $parteNumerica;
     $boton = document.getElementById($idB);
     agregarAlCarrito($boton);
     $cancelar = document.createElement('button');
     $cancelar.innerHTML='Eliminar del carrito';
     $cancelar.style.color = '#fff';
     $cancelar.style.backgroundColor = '#de6060';
      $parteNumerica = $idB.substr(12);
      $nuevoId = 'accionCancelar'+ $parteNumerica;
       $cancelar.id = $nuevoId;
       $boton.replaceWith($cancelar);
       $cancelar.onclick = function(){
         reestablecerCompra($nuevoId);
       }
}

// REESTABLECE LA TARJETA DE COMPRA DEL PRODUCTO A SU ESTADO INICIAL
function reestablecerCompra($nId){  
  var $boton, $reset, $nuevoId, $parteNumerica;
  $boton = document.getElementById($nId);
  eliminarDelCarrito($boton);
  $reset = document.createElement('button');
  $reset.innerHTML='Agregar al carrito';
  $reset.style.color = '#fff';
  $reset.style.backgroundColor = '#60bbde';
  $parteNumerica = $nId.substr(14);
  $nuevoId = 'accionCompra'+ $parteNumerica;
   $reset.id = $nuevoId;
   $boton.replaceWith($reset);
   $boton = document.getElementById($nuevoId);
   $reset.onclick = function(){
     realizarCompra($nuevoId);
   }
}

// SI SE AGREGA UN ELEMENTO AL CARRITO, ESTE CAMBIA SU IMAGEN A LLENO Y SE AUMENTA SU COLECCION
function agregarAlCarrito($elemActual){
  var $elemPadre, $elemAbuelo, $hijos, $numProducto;
  $elemPadre = $elemActual.parentNode;
  $elemAbuelo = $elemPadre.parentNode;
  $hijos =  $elemAbuelo.childNodes;
  $numProducto = $hijos[1].firstChild.innerHTML;
  $colCarrito.push($colProductos[$numProducto]);
  cambiarImagenCarrito();
  mostrarElementosEnCarrito();
      calcularTotal();
}


// SI SE ELIMINA UN ELEMENTO DEL CARRITO, ESTE CAMBIA SU IMAGEN A VACIO Y SE LO SACA DEL ARREGLO
function eliminarDelCarrito($elemActual){
    var $elemPadre, $elemAbuelo, $hijos, $marcaYModeloProducto, $largoCadena, $i, $seguir, $modelo;
    $elemPadre = $elemActual.parentNode;
    $elemAbuelo = $elemPadre.parentNode;
    $hijos =  $elemAbuelo.childNodes;
    $marcaYModeloProducto = $hijos[2].firstChild.innerHTML;
    $largoCadena = $marcaYModeloProducto.length;
    $seguir = true;
    $i=0;
    while(($i<$largoCadena)&&($seguir)){
      if($marcaYModeloProducto[$i]==' '){
        $seguir = false;
      }
      $i++;
    }
    $modelo = $marcaYModeloProducto.substr($i);
    $i = 0;
    $seguir = true;
    while(($i<$colCarrito.length)&&($seguir)){
      if($colCarrito[$i]['modelo'] == $modelo){
        $seguir = false;
      }else{
        $i++;
      }
      
    }
    $colCarrito.splice($i,1); // cambia el contenido de un array eliminando elementos existentes y/o agregando nuevos elementos.
    cambiarImagenCarrito();
    mostrarElementosEnCarrito();
      calcularTotal();
}


function mostrarElementosEnCarrito(){
  var $longitud, $cadena;
  $longitud = $colCarrito.length;
  $cadena = '';
  for(var $i=0;$i<$longitud;$i++){
    // alert('MARCA: '+$colCarrito[$i]['nombre']+'\n MODELO: '+$colCarrito[$i]['modelo']);
    $cadena += ' Item '+$i+' - - - '+$colCarrito[$i]['nombre']+' '+$colCarrito[$i]['modelo']+' ('+$colCarrito[$i]['anio']+')  Escala ('+$colCarrito[$i]['escala']+')  -------------- $'+$colCarrito[$i]['precio']+'\n';
    
  }
  if($longitud == 0){    
    $cadena = 'No hay elementos actualmente en el carrito.';
    document.getElementById('iProductosComprados').innerHTML = $cadena;
  }else{
    document.getElementById('iProductosComprados').innerHTML = $cadena;
  }
}

function calcularTotal(){
  var $longitud, $suma;
  $longitud = $colCarrito.length;
  $suma = 0;
  for(var $i=0;$i<$longitud;$i++){
    $suma += parseInt($colCarrito[$i]['precio']);
  }
  if($longitud == 0){
    document.getElementById('precioTotal').innerHTML = '<p>Precio total:</p><p>$0</p>';
  }else{
    document.getElementById('precioTotal').innerHTML = '<p>Precio total:</p><p>$'+$suma+'</p>';
  }
}

function compraFinal(){
  var $longitud;
  $longitud = $colCarrito.length;
  if($longitud != 0){
    alert('COMPRA REALIZADA. MUCHAS GRACIAS!!!');
    location.reload();
  }else{
alert('NO HA SELECCIONADO NINGÚN ARTÍCULO PARA COMPRAR');
  }
  
}

function cancelarCompra(){
  location.reload();
}

// CAMBIA LA IMAGEN DEL CARRITO, DEPENDIENDO DE SI ESTA LLENO O VACIO
function cambiarImagenCarrito(){
  var $longitud, $imgCarrito;
  $longitud = $colCarrito.length;
  $imgCarrito = document.getElementById('carrito');
  if($longitud>0){
    $imgCarrito.style.backgroundImage = 'url(img/shopping-cartFull.svg)';
    $imgCarrito.style.transition = 'all 300ms ease';
  }else{
    $imgCarrito.style.backgroundImage = 'url(img/shopping-cart.svg)';
  }
}

