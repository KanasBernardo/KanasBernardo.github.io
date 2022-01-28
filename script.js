// instanciar  las viables 
//variable tipo bandera 
let accion = "A";
let indice = -1;
let libros = localStorage.getItem("libros");
//Implementacion JSON
libros = JSON.parse(libros);
//Implemetar el uso de arreglo(lista) para guardar los libros.
if(libros==null) libros = [];

//funcion para listar los registros en JSON
function lista(){
	//Llamar a la tabla donde se encuentran los resultados "listado"
	document.getElementById("listado").innerHTML = "";
	let tabla = "<tr class='encabezado'><th>Nombre de tarea</th> <th>Descripción</th> <th>Curso</th> <th>Categraditico(a)</th> <th>Fecha de Entrega</th> <th>Enviada</th> <th>Editar Tarea</th> </tr>";
	//recorrido del arreglo de libros 
	for(let i in libros){

		let libro = JSON.parse(libros[i]);
		tabla += "<tr class='tablaE'><td>"+libro.nombre+"</td>";
		tabla += "<td>"+libro.descripcion+"</td>";
		tabla += "<td>"+libro.curso+"</td>";
		tabla += "<td>"+libro.catedratico+"</td>";
		tabla += "<td>"+libro.fecha+"</td>";
		tabla += "<td><input type='button' value='Terminada' onClick='borrar("+i+")' class='boton2'></td>"; 
		tabla += "<td><input type='button' value='Editar' onClick='editar("+i+")' class='boton3'></td>"; 
		tabla += "</tr>";
	}

	document.getElementById("listado").innerHTML = tabla;
}
function guardar(){
	//recuperar datos 
	let nombre = document.getElementById("nombre").value;
	let descripcion = document.getElementById("descripcion").value;
	let curso = document.getElementById("curso").value;
	let catedratico = document.getElementById("catedratico").value;
	let fecha = document.getElementById("fecha").value;

	//Creamos el objeto en JSON
	let libro = JSON.stringify({
		nombre: nombre,
		descripcion: descripcion,
		curso: curso,
		catedratico: catedratico,
		fecha: fecha
	});

	//Añadir objeto JSON
	if(accion == "A"){
		//guardarmos los datos
		libros.push(libro);
		localStorage.setItem("libros",JSON.stringify(libros));
		alert("Tarea guardada");
	}else{
		//actualizar los datos
		libros[indice] = libro;
		localStorage.setItem("libros",JSON.stringify(libros));
		alert("Tarea actualizada");
	}

	//limpiar cajas de texto
	document.getElementById("nombre").value ="";
	document.getElementById("descripcion").value ="";
	document.getElementById("curso").value ="";
	document.getElementById("catedratico").value ="";
	document.getElementById("fecha").value ="";

	lista();
	return true;
}

//Delete - Borrar
function borrar(i){
	indice = i;
	let libro = JSON.parse(libros[indice]);
	let nombre = libro.nombre;
	if(confirm("¿Enserio terminaste la tarea del curso de '"+libro.curso+"'?")){
		libros.splice(indice,3);
		localStorage.setItem("libros",JSON.stringify(libros));
		alert("La tarea del curso '"+libro.curso+"' ha sido enviada");
	}

	lista(); //actualizar la lista de los datos existentes en el localStorage
}

//Editar los datos encontrados en el LocalStorage
function editar(i){
	indice = i;
	accion = "E";
	//Carga de los datos  a las cajas de texto
	let libro = JSON.parse(libros[indice]);
	document.getElementById("nombre").value = libro.nombre;
	document.getElementById("descripcion").value = libro.descripcion;
	document.getElementById("curso").value = libro.curso;
	document.getElementById("catedratico").value = libro.catedratico;
	document.getElementById("fecha").value = libro.fecha;
}

//Arrancar partiendo de la funcion lista
window.onload = function(){
	lista();
}