const carrito = document.querySelector ("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
const card = document.querySelector(".card");
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
    //Al hacer click agregamos el curso
    listaCursos.addEventListener('click', agregarCurso);

    //Eliminamos el curdo al apretar la X
    carrito.addEventListener('click', eliminarCurso);

    //Funcion anonima para vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //reiniciamos el arreglo 

        limpiarHTML(); //limpiamos el HTML , lo borramos
    })
}

//1-Funcion que selecciona los elementos al hacer click en el botton "agregar carrito", usamos traversing para evitar debubbling
//Si al hacer click en algun lugar de lista-cursos hay una clase llamada boton__agregar, se ejecuta la accion
//creamos una variable y guardamos todo el card completo usando traversing de padres a hijos
//Mandamos a llamar otra variable para leer los datos del curso y le pasamos como parametro la variable con el card guardado

function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('boton__agregar')) { 
        const cursoSeleccionado = e.target.parentElement; //con un solo parent element funciona porque el a esta fuera de info__curso, tambien funciona closest(.card)
        leerDatosCurso(cursoSeleccionado); 
        //console.log("agrenando al carrito")
    }
}
//5-Funcion que elimina elementos del carrito al apretar la X

function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id'); //obtenemos el id del elemento que deseo eliminar y lo almaceno en una variable
        //una vez que lo encontramos, lo eliminamos con filter
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId); //nos traemos todo el producto menos el el que borramos

        carritoHTML() //Iterar sobre el carrito y mostrar su HTML porque sino no me borra los articulos del carrito en el html
    }
}



//2-Funcion que lee el contenido html al que le dimos click, en este caso el card(recibe como parametro la variable "cursoSeleccionado")
//Crea un objeto con la info del curso al que le dimos click
//Agregamos los articulos(el objeto) al arreglo de carrito de compras 

function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.card__precio').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1 //ponemos la cantidad para saber cuantos cursos seleciconamos de un mismo tipo
    }

   // console.log(infoCurso);

   //Revisamos si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe) { //si el elemento ya existe en el carrito
      //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            }else {
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    } else {
       articulosCarrito = [...articulosCarrito, infoCurso];
    }

   
   //console.log(articulosCarrito);
   carritoHTML();
}

//3-Funcion que muestra el carrito de compras en el HTML
//creamos una variable que guarde el elemento html,
//dentro de esa variable ponemos el codigo html que vamos a necesitar
//y lo agregamos a contenedor carrito como hijo
//al poner appendChild se copia y se mantiene el html previo, por eso vamos a llamar a una funcion para que lo limpie antes de crear el html

function carritoHTML() {

    limpiarHTML(); //se borran los hijos del contenedorCarrito del html, antes de crear el html 

    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${curso.imagen}"> 
        </td>

    
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>${curso.cantidad}</td>

        <td>
            <a href = "#" class="borrar-curso" data-id = ${curso.id}>X</a>
        </td>

        `

        contenedorCarrito.appendChild(row);
    })
} 

//4-Funcion que limpia(borra) codigo HTML

function limpiarHTML() {
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

//Ahora hacemos un evento en cargar event listeners que va a llamar a una funcion que elimine el articulos del carrito