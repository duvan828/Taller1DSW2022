const apiTrabajador = "https://61e1d9a23050a10017682016.mockapi.io/Trabajador";


////////////////////////////////////Funcion para Modificar al trabajador
const BtnModificarTrabajador = () => {
  //Funcion para modificar el cliente
  const obj = {
    //Creamos el objeto a partir de los datos ingresados en el formulario
    identificacion: document.getElementById("Identificaciontrabajador").value,
    nombre: document.getElementById("nombreTrabajador").value,
    tipo_trabajador: document.getElementById("idOpcioTrabajador").value,
  };
  Modificar(apiTrabajador, ide, obj)
    .then((response) => {
      return response;
    })
    .then((data) => {
      actualizar();
      
      cambiarTitulo.textContent ='Trabajador';
      alert(
        "Trabajador modificado! \n"+
       `El trabajador: ${data.tipo_trabajador} ha sido modificado`
     );;
    });
};
////////////////////////////////////Funcion para guardar el Trabajador
const btnGuardarTrabajador = () => {
  obj = {
    //Creamos el objeto a partir de los datos ingresados en el formulario
    identificacion: document.getElementById("Identificaciontrabajador").value,
    nombre: document.getElementById("nombreTrabajador").value,
    tipo_trabajador: document.getElementById("idOpcioTrabajador").value,
  };
  guardar(apiTrabajador, obj)
    .then((response) => {
      return response;
    })
    .then((data) => {
      alert(
         "Trabajador agregado! \n"+
        `El trabajador: ${data.tipo_trabajador} ha sido agregado`
      
      );
      actualizar();
      
      cambiarTitulo.textContent ='Trabajador';
    })

    .catch(function (err) {
      console.log("Se presento un error en la petición");
      console.error(err);
    });
};

////////////////////////////////////////////////////////////////////  Funcion para consumir la api Trabajador y generar la tabla
function trabajador(dato, titulo) {
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
  getAll(apiTrabajador).then((data) => {
    inseTh("Id");
    inseTh("Identificacion");
    inseTh("Nombre");
    inseTh("Tipo de trabajador");
    inseTh("Opciones");
    datosJson = data;
    // datosJsonAux =

    data.forEach((element) => {
      //Por cada registro obtenido se crea una nueva fila y se agrega al Body de la tabla
      let row = document.createElement("TR");
      let col1 = document.createElement("TD");
      col1.innerHTML = element.id;
      let col2 = document.createElement("TD");
      col2.innerHTML = element.identificacion;
      let col3 = document.createElement("TD");
      col3.innerHTML = element.nombre;
      let col4 = document.createElement("TD");
      col4.innerHTML = element.tipo_trabajador;
      let col5 = document.createElement("TD");
      col5.innerHTML = `<div id="myLink" class="container">
          <button type="button" id="" onclick="BtnModificar('${element.id}')" class="btn btn-primary col-12 text-uppercase m-1">Modificar</button>
          <button type="button"  onclick="BtnEliminar('${apiTrabajador}',${element.id})" class="btn btn-danger col-12 text-uppercase m-1">Eliminar</button>
         </div>`;

      row.appendChild(col1);
      row.appendChild(col2);
      row.appendChild(col3);
      row.appendChild(col4);
      row.appendChild(col5);
      row.id = "row-" + element.id;

      tBodyDatos.appendChild(row);
    });
  });
  numb = dato;
  return numb;
}

/////////////////////////////////////----Funciones para hacer visible los botenes modificar y agregar//////////////////////////////
const ocultarBtnGuardarTr = () => {
  const h2 = document.getElementById("agregarTrabajador");
  h2.textContent = "Modificar Trabajador";
  seccion = document.getElementById("btn-guardarTr");
  seccion.classList.add("d-none");

  seccion = document.getElementById("btn-modificarTr");
  seccion.classList.remove("d-none");
};
const ocultarBtnModificarTr = () => {
  const h2 = document.getElementById("agregarTrabajador");
  h2.textContent = "Agregar Trabajador";
  seccion = document.getElementById("btn-modificarTr");
  seccion.classList.add("d-none");

  seccion = document.getElementById("btn-guardarTr");
  seccion.classList.remove("d-none");
};
   ////////////////////////////////////////////////////Funcion para llenar el formulario de Trabajador///////////////
   const llenarTrabajador = (id) => {
    getAll(`${apiTrabajador}/${id}`).then((data) => {
      
      const idt = `${data.identificacion}`;
      const nom = `${data.nombre}`;
      const tip_t= `${data.tipo_trabajador}`;
      
  
      document.getElementById("Identificaciontrabajador").value=idt;
      document.getElementById("nombreTrabajador").value=nom;
      document.getElementById("inser").textContent=tip_t;

    });
  };

////////////////////////////////Funcion para limpiar el formulario Trabajador///////////////////////////////////
   function LimpiarFTrbjr(){
    document.getElementById("Identificaciontrabajador").value="";
    document.getElementById("nombreTrabajador").value="";
    document.getElementById("inser").textContent="Seleccione";
  }