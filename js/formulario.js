
// Autor: Pablo Damian Romero
// Legajo: FAI-1652 


// CAPTURA DE ELEMENTOS 
const $formulario = document.getElementById('formulario');
const $elementos = [
    $inputNombre = document.getElementById('iNom'),
    $inputApellido = document.getElementById('iApe'),
    $selectMetContacto = document.getElementById('opcionesContacto'),
    $inputMetContacto = document.getElementById('metContactoInput'),
    $seleccionCompraAfirmativa = document.getElementById('compraSi'),
    $seleccionCompraAfirmativa = document.getElementById('compraNo'),
    $inputFecha = document.getElementById('iFecha'),
    $inputCantidadProd = document.getElementById('iCantProd'),
    $inputPrecioProd = document.getElementById('iPrecioProd'),
    $textArea = document.getElementById('iTextArea')
];

// CAPTURA DE ELEM DIV CON ID = GRUPO_
const $grupos = [
    $gNombre = document.getElementById('grupo_nombre'),
    $gApellido = document.getElementById('grupo_apellido'),
    $gMetodoContacto = document.getElementById('grupo_metodoContacto'),
    $gCompras = document.getElementById('grupo_compras'),
    $gCantidadProductos = document.getElementById('grupo_cantidadProductos'),
    $gPrecioProductos = document.getElementById('grupo_precioProductos'),
    $gDescripcion = document.getElementById('grupo_descripcion')
];

// ESTADOS DE CAMPOS PARA VALIDAR ANTES DE ENVIAR FORMULARIO
const $estadoDeCampo = {
    $grupo_nombre: false,
    $grupo_apellido: false,
    $grupo_metodoContacto: false,
    $grupo_descripcion: false,
    // Opcionales
    $estadoDeOpcional: false,
    $grupo_compras: false,
    $grupo_cantidadProductos: false,
    $grupo_precioProductos: false
}

// EXPRESIONES REGULARES PARA CADA TIPO DE DATO QUE SE DESEA VALIDAR
const $expresiones = {
    $nombre: /^[a-zA-ZÀ-ÿ\s]{4,40}$/, // Letras y espacios, pueden llevar acentos.
    $apellido: /^[a-zA-ZÀ-ÿ\s]{4,40}$/, // Letras y espacios, pueden llevar acentos.
    $correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    $telefonoFijo: /^\d{7,7}$/, // 7 a 14 numeros.
    $telefonoCel: /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/,
    $enteros: /^[1-9][0-9]{0,3}$/,
    $decimal: /^[0-9]+\.[0-9]{2}$/ // At least one number ; A decimal point ; One or two digits after the decimal point.
}


// FUNCION FLECHA. SEGUN EL iD DEL CAMPO SELECCIONADO PARA COMPLETAR. SE VALIDA
const validarFormulario = (e) => {
    var $padre, $requisitoTelFijo, $requisitoCel, $requisitoMail;
    $padre = document.getElementById('grupo_metodoContacto');
    switch (e.target.id) { // La propiedad target de la interfaz del event.currentTarget es una referencia al objeto en el cual se lanzo el evento. Se toma su iD
        case 'iNom':
            document.getElementById('iNom').style.backgroundColor = '#fff';
            validarCampo($expresiones.$nombre, e.target, 'grupo_nombre');
            break;
        case 'iApe':
            document.getElementById('iApe').style.backgroundColor = '#fff';
            validarCampo($expresiones.$apellido, e.target, 'grupo_apellido');
            break;
        case 'metContactoInput1':
            document.getElementById('metContactoInput1').style.backgroundColor = '#fff';
            $requisitoTelFijo = $padre.childNodes[15].nextSibling; // La propiedad de sólo lectura Node.nextSibling devuelve el siguiente nodo con respecto al indicado en la lista de nodos (childNodes) a la que este pertenece o null si el nodo especificado es el último en dicha lista.
            $padre.childNodes[15].nextSibling.style.display = 'inline-block'; // Requisito Tel Fijo
            $padre.childNodes[17].nextSibling.style.display = 'none'; // Requisito Cel Fijo
            $padre.childNodes[19].nextSibling.style.display = 'none'; // Requisito Dir Mail
            validarCampoSegunOpcion($expresiones.$telefonoFijo, e.target, 'grupo_metodoContacto', $requisitoTelFijo);
            // console.log('INPUT TELEFONO FIJO');
            break;
        case 'metContactoInput2':
            document.getElementById('metContactoInput2').style.backgroundColor = '#fff';
            $requisitoCel = $padre.childNodes[17].nextSibling;
            $padre.childNodes[15].nextSibling.style.display = 'none'; // Requisito Tel Fijo
            $padre.childNodes[17].nextSibling.style.display = 'inline-block'; // Requisito Cel Fijo
            $padre.childNodes[19].nextSibling.style.display = 'none'; // Requisito Dir Mail
            validarCampoSegunOpcion($expresiones.$telefonoCel, e.target, 'grupo_metodoContacto', $requisitoCel);
            // console.log('INPUT TELEFONO CELULAR');
            break;
        case 'metContactoInput3':
            document.getElementById('metContactoInput3').style.backgroundColor = '#fff';
            $requisitoMail = $padre.childNodes[19].nextSibling;
            $padre.childNodes[15].nextSibling.style.display = 'none'; // Requisito Tel Fijo
            $padre.childNodes[17].nextSibling.style.display = 'none'; // Requisito Cel Fijo
            $padre.childNodes[19].nextSibling.style.display = 'inline-block'; // Requisito Dir Mail
            validarCampoSegunOpcion($expresiones.$correo, e.target, 'grupo_metodoContacto', $requisitoMail);
            // console.log('INPUT DIRECCION MAIL');
            break;
        case 'iFecha':
            document.getElementById('iFecha').style.backgroundColor = '#fff';
            validarFecha(e.target, 'grupo_compras');
            // console.log('INPUT FECHA');
            break;
        case 'iCantProd':
            document.getElementById('iCantProd').style.backgroundColor = '#fff';
            validarCampo($expresiones.$enteros, e.target, 'grupo_cantidadProductos');
            break;
        case 'iPrecioProd':
            document.getElementById('iPrecioProd').style.backgroundColor = '#fff';
            validarCampo($expresiones.$decimal, e.target, 'grupo_precioProductos');
            break;
        case 'iTextArea':
            document.getElementById('iTextArea').style.backgroundColor = '#fff';
            validarTextArea(e.target, 'grupo_descripcion');
            break;
    }
}

// VALIDACIÓN DE CAMPOS SEGÚN EXPRESION REGULAR, INPUT CORRESPONDIENTE E id
// SI EL VALOR INGRESADO EN INPUT ES CORRECTO O NO, MARCA EN TIEMPO REAL LA VERIFICACIÓN, USANDO ESTILOS
const validarCampo = ($expresion, $input, $iD) => {
    var $padre, $hijos, $requisito;
    $padre = document.getElementById($iD);
    $hijos = $padre.childNodes;
    $requisito = $padre.lastChild.previousSibling;
    if ($expresion.test($input.value)) {
        document.getElementById($iD).classList.remove('formulario__grupo-incorrecto');
        document.getElementById($iD).classList.add('formulario__grupo-correcto');
        $hijos[6].classList.remove('fa-times-circle');
        $hijos[6].classList.add('fa-check-circle');
        $requisito.style.visibility = 'hidden';
        $estadoDeCampo['$' + $iD] = true; // VALOR BOOLEANO PARA VERIFICAR ANTES DE ENVIAR FORMULARIO
    } else {
        document.getElementById($iD).classList.add('formulario__grupo-incorrecto');
        $hijos[6].classList.remove('fa-check-circle');
        $hijos[6].classList.add('fa-times-circle');
        $requisito.style.visibility = 'visible';
        $estadoDeCampo['$' + $iD] = false;
    }
}


// MISMO PROCESO QUE validarCampo, DEPENDE DE LO SELECCIONADO EN METODO DE CONTACTO
const validarCampoSegunOpcion = ($expresion, $input, $iD, $requisito) => {
    var $hijos = document.getElementById($iD).childNodes;
    // console.log($hijos[14]);
    if ($expresion.test($input.value)) {
        document.getElementById($iD).classList.remove('formulario__grupo-incorrecto');
        document.getElementById($iD).classList.add('formulario__grupo-correcto');
        $hijos[14].classList.remove('fa-times-circle');
        $hijos[14].classList.add('fa-check-circle');
        $requisito.style.display = 'none';
        $estadoDeCampo['$' + $iD] = true;
    } else {
        document.getElementById($iD).classList.add('formulario__grupo-incorrecto');
        $hijos[14].classList.remove('fa-check-circle');
        $hijos[14].classList.add('fa-times-circle');
        $requisito.style.display = 'inline-block';
        $estadoDeCampo['$' + $iD] = false;
    }
}

// MISMO PROCESO QUE validarCampo, EXCLUSIVO DE TEXTAREA
const validarTextArea = ($input, $iD) => {
    var $padre, $hijos, $requisito;
    $padre = document.getElementById($iD);
    $hijos = $padre.childNodes;
    $requisito = $padre.lastChild.previousSibling;
    if (($input.value) != '') {
        document.getElementById($iD).classList.remove('formulario__grupo-incorrecto');
        document.getElementById($iD).classList.add('formulario__grupo-correcto');
        $hijos[6].classList.add('fa-check-circle');
        $hijos[6].classList.remove('fa-times-circle');
        $requisito.style.visibility = 'hidden';
        $estadoDeCampo['$' + $iD] = true;
    } else {
        document.getElementById($iD).classList.add('formulario__grupo-incorrecto');
        $hijos[6].classList.add('fa-times-circle');
        $hijos[6].classList.remove('fa-check-circle');
        $requisito.style.visibility = 'visible';
        $estadoDeCampo['$' + $iD] = false;
    }
}

const validarFecha = ($input, $iD) => {
    var $padre, $hijos, $requisito, $esFechaValida;
    $padre = document.getElementById($iD);
    $hijos = $padre.childNodes;
    $requisito = $padre.lastChild.previousSibling;
    $esFechaValida = esfechavalida($input.value);
    if ($esFechaValida) {
        document.getElementById($iD).classList.remove('formulario__grupo-incorrecto');
        document.getElementById($iD).classList.add('formulario__grupo-correcto');
        $hijos[6].classList.remove('fa-times-circle');
        $hijos[6].classList.add('fa-check-circle');
        $requisito.style.visibility = 'hidden';
        $estadoDeCampo['$' + $iD] = true; // VALOR BOOLEANO PARA VERIFICAR ANTES DE ENVIAR FORMULARIO
    } else {
        document.getElementById($iD).classList.add('formulario__grupo-incorrecto');
        $hijos[6].classList.remove('fa-check-circle');
        $hijos[6].classList.add('fa-times-circle');
        $requisito.style.visibility = 'visible';
        $estadoDeCampo['$' + $iD] = false;
    }
}

function esfechavalida($fecha) {
    var $error = false;
    // La longitud de la fecha debe tener exactamente 10 caracteres
    if ($fecha.length != 10) {
        $error = true;
    }
    // Primero verifica el patron
    if ((!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test($fecha)) && !$error) {
        $error = true;
    }
    // Mediante el delimitador "/" separa dia, mes y año
    var $fecha = $fecha.split("/");
    var $dia = parseInt($fecha[0]);
    var $mes = parseInt($fecha[1]);
    var $anio = parseInt($fecha[2]);
    // Verifica que dia, mes, año, solo sean numeros
    if ((isNaN($dia) || isNaN($mes) || isNaN($anio)) && !$error) {
        $error = true;
    }
    // Verifica que valores no sean cero
    if (($dia == 0) || ($mes == 0) || ($anio == 0)) {
        $error = true;
    }
    // Lista de dias en los meses, por defecto no es año bisiesto
    var $listaDias = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (($mes == 1 || $mes > 2) && !$error) {
        if ($dia > $listaDias[$mes - 1] || $dia < 0 || $listaDias[$mes - 1] == undefined) {
            $error = true;
        }
    }
    // Detecta si es año bisiesto y asigna a febrero 29 dias
    if (($mes == 2) && !$error) {
        var $anioB;
        if ((!($anio % 4) && $anio % 100) || !($anio % 400)) {
            $anioB = true;
        } else {
            $anioB = false;
        }
        if (($anioB == false) && ($dia >= 29)) {
            $error = true;
        }

        if (($anioB == true) && ($dia > 29)) {
            $error = true;
        }
    }
    var $retorno = true;
    if ($error == true) {
        $retorno = false;
    }
    return $retorno;
}



$elementos[2].addEventListener('change', cambioOpciones); // POR CADA CAMBIO EN <select id = opcionesContacto>
$elementos[4].addEventListener('change', mostrarOpcional); // Si selecciono en <input type="radio" id="compraSi">
$elementos[5].addEventListener('change', ocultarOpcional); // Si selecciono en <input type="radio" id="compraNo">

// PARA CADA ELEMENTO CAPTURADO AL INICIO, SE VALIDA EL CONTENIDO POR CADA TECLA PRESIONADA
$elementos.forEach(($cadaElem) => {
    $cadaElem.addEventListener('keyup', validarFormulario);
    $cadaElem.addEventListener('blur', validarFormulario);
});


// SEGUN LO SELECCIONADO EN opcionesContacto, CAMBIA A EL INPUT CORRESPONDIENTE Y VALIDA SU CONTENIDO
function cambioOpciones() {
    var $opcion, $padre;
    $padre = document.getElementById('grupo_metodoContacto');
    $elemOption = document.getElementById('opcionesContacto');
    $opcion = $elemOption.value;
    // console.log($opcion);
    $padre.childNodes[15].nextSibling.style.display = 'none'; // Requisito Tel Fijo
    $padre.childNodes[17].nextSibling.style.display = 'none'; // Requisito Cel Fijo
    $padre.childNodes[19].nextSibling.style.display = 'none'; // Requisito Dir Mail
    document.getElementById('grupo_metodoContacto').classList.remove('formulario__grupo-incorrecto');
    document.getElementById('grupo_metodoContacto').classList.remove('formulario__grupo-correcto');
    $estadoDeCampo.$grupo_metodoContacto = false;
    switch ($opcion) {
        case 'op0':
            document.getElementById('metContactoInput').style.display = 'initial';
            document.getElementById('metContactoInput1').style.display = 'none';
            document.getElementById('metContactoInput2').style.display = 'none';
            document.getElementById('metContactoInput3').style.display = 'none';
            break;
        case 'op1':
            document.getElementById('metContactoInput').style.display = 'none';
            document.getElementById('metContactoInput1').style.display = 'initial';
            document.getElementById('metContactoInput2').style.display = 'none';
            document.getElementById('metContactoInput3').style.display = 'none';
            document.getElementById('metContactoInput1').addEventListener('keyup', validarFormulario);
            document.getElementById('metContactoInput1').addEventListener('blur', validarFormulario);
            break;
        case 'op2':
            document.getElementById('metContactoInput').style.display = 'none';
            document.getElementById('metContactoInput1').style.display = 'none';
            document.getElementById('metContactoInput2').style.display = 'initial';
            document.getElementById('metContactoInput3').style.display = 'none';
            document.getElementById('metContactoInput2').addEventListener('keyup', validarFormulario);
            document.getElementById('metContactoInput2').addEventListener('blur', validarFormulario);
            break;
        case 'op3':
            document.getElementById('metContactoInput').style.display = 'none';
            document.getElementById('metContactoInput1').style.display = 'none';
            document.getElementById('metContactoInput2').style.display = 'none';
            document.getElementById('metContactoInput3').style.display = 'initial';
            document.getElementById('metContactoInput3').addEventListener('keyup', validarFormulario);
            document.getElementById('metContactoInput3').addEventListener('blur', validarFormulario);
            break;
        default:
            document.getElementById('metContactoInput').style.display = 'initial';
            document.getElementById('metContactoInput1').style.display = 'none';
            document.getElementById('metContactoInput2').style.display = 'none';
            document.getElementById('metContactoInput3').style.display = 'none';
            break;
    }
}


// SI SELECCIONA EL INPUT RADIO EN SI, MUESTRO LOS INPUT CORRESPONDIENTES (OPCIONALES)
function mostrarOpcional() {
    var $grupoCompra, $icono, $requisito, $cantidadProductos, $precioProductos;
    $grupoCompra = document.getElementById('grupo_compras');
    $icono = $grupoCompra.childNodes[6];
    $requisito = $grupoCompra.childNodes[8];
    $icono.style.display = 'initial';
    $requisito.style.display = 'initial';
    $grupoCompra.style.visibility = 'visible';
    $cantidadProductos = document.getElementById('grupo_cantidadProductos');
    $precioProductos = document.getElementById('grupo_precioProductos');
    $cantidadProductos.style.display = 'inline-block';
    $precioProductos.style.display = 'inline-block';
    $estadoDeCampo.$estadoDeOpcional = true;
    // console.log('CAMBIADO A SI');
}

// SI SELECCIONA EL INPUT RADIO EN NO, OCULTO LOS INPUT CORRESPONDIENTES (OPCIONALES)
function ocultarOpcional() {
    var $grupoCompra, $icono, $requisito, $cantidadProductos, $precioProductos;
    $grupoCompra = document.getElementById('grupo_compras');
    $grupoCompra.style.visibility = 'hidden';
    $icono = $grupoCompra.childNodes[6];
    $requisito = $grupoCompra.childNodes[8];
    $icono.style.display = 'none';
    $requisito.style.display = 'none';
    $cantidadProductos = document.getElementById('grupo_cantidadProductos');
    $precioProductos = document.getElementById('grupo_precioProductos');
    $cantidadProductos.style.display = 'none';
    $precioProductos.style.display = 'none';
    $estadoDeCampo.$estadoDeOpcional = false;
    // console.log('CAMBIADO A NO');
}



function reestablecerFormulario() {
    desmarcarCamposVacios();
    var $hijo, $requisito;
    $grupos.forEach($elem => {
        $padre = document.getElementById($elem.id);
        if (($padre.id) == 'grupo_metodoContacto') {
            $hijo = $padre.childNodes;
            $hijo[15].nextSibling.style.display = 'none'; // Requisito Tel Fijo
            $hijo[17].nextSibling.style.display = 'none'; // Requisito Cel Fijo
            $hijo[19].nextSibling.style.display = 'none'; // Requisito Dir Mail
            document.getElementById($elem.id).classList.remove('formulario__grupo-incorrecto');
            document.getElementById($elem.id).classList.remove('formulario__grupo-correcto');
        } else {
            $hijo = $padre.childNodes;
            $requisito = $padre.lastChild.previousSibling;
            document.getElementById($elem.id).classList.remove('formulario__grupo-incorrecto');
            document.getElementById($elem.id).classList.remove('formulario__grupo-correcto');
            $requisito.style.visibility = 'hidden';
        }
        ocultarOpcional();
        document.getElementById('exitoDelFormulario').style.display = 'none';
        document.getElementById('fracasoDelFormulario').style.display = 'none';
    }
    );
}


$formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    marcarCamposVacios();
    if (($estadoDeCampo.$grupo_nombre) && ($estadoDeCampo.$grupo_apellido) && ($estadoDeCampo.$grupo_metodoContacto) && ($estadoDeCampo.$grupo_descripcion)) {
        if (!$estadoDeCampo.$estadoDeOpcional) { // Si no se seleccionó mostrar campos adicionales, envio formulario
            console.log('OPCIONAL: ' + $estadoDeCampo.$estadoDeOpcional);
            document.getElementById('exitoDelFormulario').style.display = 'block';
            document.getElementById('fracasoDelFormulario').style.display = 'none';
        } else { // Si se selecciono mostrar opcional, verifico sus campos
            if ((!$estadoDeCampo.$grupo_compras) || (!$estadoDeCampo.$grupo_cantidadProductos) || (!$estadoDeCampo.$grupo_precioProductos)) {
                // Si algún campo del opcional es erroneo, muestro error
                document.getElementById('exitoDelFormulario').style.display = 'none';
                document.getElementById('fracasoDelFormulario').style.display = 'block';
            } else {
                // Si los campos del opcional son correctos, envio
                document.getElementById('exitoDelFormulario').style.display = 'block';
                document.getElementById('fracasoDelFormulario').style.display = 'none';
            }
        }

    } else {
        document.getElementById('exitoDelFormulario').style.display = 'none';
        document.getElementById('fracasoDelFormulario').style.display = 'block';
    }
});
/** Las funciones flecha o arrow funtions son funciones anónimas con una sintaxis más compacta y que aparte
 * de la diferencia en la sintaxis también tienen algunas peculiaridades como que no vinculan su propio this
 * o que no se pueden usar como constructores. */

function marcarCamposVacios() {
    $elementos.forEach($elem => {
        if ($elem.value == '') {
            $elem.style.backgroundColor = 'rgb(243 204 204)';
        }
    });
    var $input1, $input2, $input3;
    $input1 = document.getElementById('metContactoInput1');
    $input2 = document.getElementById('metContactoInput2');
    $input3 = document.getElementById('metContactoInput3');
    if ($input1.value == '') {
        $input1.style.backgroundColor = 'rgb(243 204 204)';
    }
    if ($input2.value == '') {
        $input2.style.backgroundColor = 'rgb(243 204 204)';
    }
    if ($input3.value == '') {
        $input3.style.backgroundColor = 'rgb(243 204 204)';
    }
}


function desmarcarCamposVacios() {
    $elementos.forEach($elem => {
        $elem.style.backgroundColor = '#fff';
    });
    var $input1, $input2, $input3;
    $input1 = document.getElementById('metContactoInput1');
    $input2 = document.getElementById('metContactoInput2');
    $input3 = document.getElementById('metContactoInput3');
    if ($input1.value == '') {
        $input1.style.backgroundColor = '#fff';
    }
    if ($input2.value == '') {
        $input2.style.backgroundColor = '#fff';
    }
    if ($input3.value == '') {
        $input3.style.backgroundColor = '#fff';
    }
}