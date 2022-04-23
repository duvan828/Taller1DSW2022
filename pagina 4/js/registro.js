const apiRegistro = "https://61e1d9a23050a10017682016.mockapi.io/Registro";

const BtnModificarRegistro = () => {
  //Funcion para modificar el cliente
  const obj = {
    //Creamos el objeto a partir de los datos ingresados en el formulario
    fecha: document.getElementById("fecha").value,
    especificacion: document.getElementById("Especificacion").value,
    estado: document.getElementById("tipoEstado").value,
    id_trabajador: document.getElementById("id_trabajador").value,
  };
  Modificar(apiRegistro, ide, obj)
    .then((response) => {
      return response;
    })
    .then((data) => {
      actualizar();
      cambiarTitulo.textContent ='Registros';
      alert( "Registro modificado \n"+
        `El registro con especificacion: ${data.especificacion}, ha sido  modificado`
      );
    });
};
////////////////////////////////////Funcion para guardar el registro
const btnGuardarRegistro = () => {
  obj = {
    //Creamos el objeto a partir de los datos ingresados en el formulario
    fecha: document.getElementById("fecha").value,
    especificacion: document.getElementById("Especificacion").value,
    estado: document.getElementById("tipoEstado").value,
    id_trabajador: document.getElementById("id_trabajador").value,
  };
  guardar(apiRegistro, obj)
    .then((response) => {
      return response;
    })
    .then((data) => {
      alert( "Registro guardado \n"+
        `El registro con especificacion: ${data.especificacion}, ha sido agregado`
      );
      actualizar();
      cambiarTitulo.textContent ='Registros';
    })

    .catch(function (err) {
      console.log("Se presento un error en la petición");
      console.error(err);
    });
};


////////////////////////////////////////////////////////////////////  Funcion para consumir la api Registro y generar la tabla
function registro(dato, titulo) {
  cambiarTitulo.textContent = titulo;
  const elemento = document.getElementById("thead");
  if (elemento) {
    eliminarhtml();
    insetarhtml();
  } else {
    insetarhtml();
  }
  // var tablaDatos=document.getElementById("tblDatos");
  let tBodyDatos = document.getElementById("tbdDatos");
  hacerVissibleTabla();
  // HacerVisibleFormCliente();
  getAll(apiRegistro).then((data) => {
    inseTh("Id");
    inseTh("Fecha");
    inseTh("Especificacion");
    inseTh("Estado");
    inseTh("Id Trabajador");
    inseTh("Opciones");
    datosJson = data;
    // datosJsonAux =

    data.forEach((element) => {
      //Por cada registro obtenido se crea una nueva fila y se agrega al Body de la tabla
      let row = document.createElement("TR");
      let col1 = document.createElement("TD");
      col1.innerHTML = element.id;
      let col2 = document.createElement("TD");
      col2.innerHTML = element.fecha;
      let col3 = document.createElement("TD");
      col3.innerHTML = element.especificacion;
      let col4 = document.createElement("TD");
      col4.innerHTML = element.estado;
      let col5 = document.createElement("TD");
      col5.innerHTML = element.id_trabajador;
      let col6 = document.createElement("TD");
      col6.innerHTML = `<div id="myLink" class="container">
          <button type="button" id="" onclick="BtnModificar('${element.id}')" class="btn btn-primary col-12 text-uppercase m-1">Modificar</button>
          <button type="button"  onclick="BtnEliminar('${apiRegistro}',${element.id})" class="btn btn-danger col-12 text-uppercase m-1">Eliminar</button>
         </div>`;

      row.appendChild(col1);
      row.appendChild(col2);
      row.appendChild(col3);
      row.appendChild(col4);
      row.appendChild(col5);
      row.appendChild(col6);
      row.id = "row-" + element.id;

      tBodyDatos.appendChild(row);
    });
  });
  numb = dato;
  return numb;
}

/////////////////////////////////////----Funciones para hacer visible los botenes modificar y agregar//////////////////////////////
const ocultarBtnGuardarR = () => {
  const h2 = document.getElementById("agregarRegistro");
  h2.textContent = "Modificar Registro";

  seccion = document.getElementById("btn-guardarR");
  seccion.classList.add("d-none");

  seccion = document.getElementById("btn-modificarR");
  seccion.classList.remove("d-none");
};
const ocultarBtnModificarR = () => {
  const h2 = document.getElementById("agregarRegistro");
  h2.textContent = "Agregar Registro";
  seccion = document.getElementById("btn-modificarR");
  seccion.classList.add("d-none");

  seccion = document.getElementById("btn-guardarR");
  seccion.classList.remove("d-none");
};
   ////////////////////////////////////////////////////Funcion para llenar el formulario de Registro///////////////

const llenarRegistro = (id) => {
  getAll(`${apiRegistro}/${id}`).then((data) => {
    const fec = `${data.fecha}`;
    const esp = `${data.especificacion}`;
    const est= `${data.estado}`;
    const id_t=`${data.id_trabajador}`;

    document.getElementById("fecha").value=fec;
    document.getElementById("Especificacion").value=esp;
    document.getElementById("id_trabajador").value=id_t;
    document.getElementById('tipoE').textContent=est;
  
  });
};
////////////////////////////////Funcion para limpiar el formulario Registro///////////////////////////////////
function LimpiarFR(){
  document.getElementById("fecha").value="";
  document.getElementById("Especificacion").value="";
  document.getElementById("id_trabajador").value=""; 
  document.getElementById('tipoE').textContent='Seleccione';  
}