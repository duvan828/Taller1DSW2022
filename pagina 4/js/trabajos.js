const apiTrabajos = "https://61e1d9a23050a10017682016.mockapi.io/Trabajos";

///////////////////////////////////   Funcion para modificar al trabajador
const BtnModificarTrabajos = () => {
  const obj = {
    //Creamos el objeto a partir de los datos ingresados en el formulario
    costo: document.getElementById("costo").value,
    tipo_trabajo: document.getElementById("tipoTrabajo").value,
    id_cliente: document.getElementById("id_cliente").value,
  };
  Modificar(apiTrabajos, ide, obj)
    .then((response) => {
      return response;
    })
    .then((data) => {
      alert(
        "Trabajo modificado! \n"+
       `El trabajo: ${data.tipo_trabajo}, ha sido modificado`
       
     );
      actualizar();
      
      cambiarTitulo.textContent ='Trabajos';
    });
};

///////////////////////////////////   Funcion para Guardar al trabajador
const btnGuardarTrabajos = () => {
  obj = {
    //Creamos el objeto a partir de los datos ingresados en el formulario
    costo: document.getElementById("costo").value,
    tipo_trabajo: document.getElementById("tipoTrabajo").value,
    id_cliente: document.getElementById("id_cliente").value,
  };
  guardar(apiTrabajos, obj)
    .then((response) => {
      return response;
    })
    .then((data) => {
      alert(
         "Trabajo agregado! \n"+
        `El trabajo: ${data.tipo_trabajo}, ha sido agregado`
        
      );
      actualizar();
      
      cambiarTitulo.textContent ='Trabajos';
    })

    .catch(function (err) {
      console.log("Se presento un error en la petición");
      console.error(err);
    });
};
function trabajos(dato, titulo) {
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
  getAll(apiTrabajos).then((data) => {
    inseTh("Id");
    inseTh("costo");
    inseTh("Tipo de trabajo");
    inseTh("Id cliente");
    inseTh("Opciones");
    datosJson = data;
    // datosJsonAux =

    data.forEach((element) => {
      //Por cada registro obtenido se crea una nueva fila y se agrega al Body de la tabla
      let row = document.createElement("TR");
      let col1 = document.createElement("TD");
      col1.innerHTML = element.id;
      let col2 = document.createElement("TD");
      col2.innerHTML = element.costo;
      let col3 = document.createElement("TD");
      col3.innerHTML = element.tipo_trabajo;
      let col4 = document.createElement("TD");
      col4.innerHTML = element.id_cliente;
      let col5 = document.createElement("TD");
      col5.innerHTML = `<div id="myLink" class=" container col-12 optrabajo col-sm-8">
          <button type="button" id="" onclick="BtnModificar('${element.id}')" class="btn btn-primary col-sm-9 text-uppercase m-1">Modificar</button>
          <button type="button"  onclick="BtnEliminar('${apiTrabajos}',${element.id})" class="btn btn-danger col-sm-9  text-uppercase m-1">Eliminar</button>
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
const ocultarBtnGuardarTs = () => {
  const h2 = document.getElementById("agregarTrabajos");
  h2.textContent = "Modificar Trabajos";

  seccion = document.getElementById("btn-guardarTs");
  seccion.classList.add("d-none");

  seccion = document.getElementById("btn-modificarTs");
  seccion.classList.remove("d-none");
};
const ocultarBtnModificarTs = () => {
  const h2 = document.getElementById("agregarTrabajos");
  h2.textContent = "Agregar Trabajos";

  seccion = document.getElementById("btn-modificarTs");
  seccion.classList.add("d-none");

  seccion = document.getElementById("btn-guardarTs");
  seccion.classList.remove("d-none");
};

///////////////////////////////////////////////////////////////////

const llenarTrabajos = (id) => {
  getAll(`${apiTrabajos}/${id}`).then((data) => {
    const cos = `${data.costo}`;
    const t_p = `${data.tipo_trabajo}`;
    const id_C = `${data.id_cliente}`;

    document.getElementById("costo").value=cos;
    document.getElementById("tipo_Trabajo").textContent=t_p;
    document.getElementById("id_cliente").value=id_C;
  });
};

function limpiarTrbj(){
  document.getElementById("costo").value="";
  document.getElementById("tipo_Trabajo").textContent="Seleccione";
  document.getElementById("id_cliente").value="";

}