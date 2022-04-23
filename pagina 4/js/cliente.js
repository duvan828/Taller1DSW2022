const apiCLiente = "https://61e1d9a23050a10017682016.mockapi.io/Cliente";

let ide; ///
let numb; /// Variable global para hacer visible un formulario
let el;  ///

let cambiarTitulo = document.getElementById("titulo-api");
//////////////////////// Funcion////////////////////////
function inseTh(dato) {
  const insertarTH = document.getElementById("tr");
  const newTh = document.createElement("th");
  newTh.textContent = dato;
  newTh.scope = "col";
  insertarTH.appendChild(newTh);
}
////////////////////Funciones para hacer visisble los visibles///////////////
function HacerVisibleFormTrabajos() {
  seccion = document.getElementById("FormTrabajos");
  seccion.classList.remove("d-none");
}
function HacerVisibleFormTrabajador() {
  seccion = document.getElementById("FormTrabajador");
  seccion.classList.remove("d-none");
}
function HacerVisibleFormCliente() {
  seccion = document.getElementById("FormCliente");
  seccion.classList.remove("d-none");
}
function HacerVisibleFormRegistro() {
  seccion = document.getElementById("FormRegistro");
  seccion.classList.remove("d-none");
}
function hacerVissibleTabla() {
  seccion = document.getElementById("datos");
  seccion.classList.remove("d-none");
}

///////////////////////////////////////////////Funcion para insertar html donde ira el contenido de la tabla////////////////////////////////////
function insetarhtml() {
  let table = document.getElementById("tblDatos");
  let html = `<thead id="thead">
  <tr id="tr" class="text-center">
  </tr>
</thead>
<tbody id="tbdDatos" class="text-center">
</tbody>`;
  table.innerHTML = html;
}

////////////Funcion para eliminar las tablas creadas
const eliminarhtml = () => {
  eliminar = document.getElementById("thead");
  eliminart = document.getElementById("tbdDatos");
  eliminar.remove();
  eliminart.remove();
};

 /////////////////Permite actualizar la tabla al momento de modificar un elemento
function actualizar() {
  const elemento = document.getElementById("thead");
  if (elemento) {
    eliminarhtml();
    if (numb === 1) {
      trabajos();
      numb = 1;
    } else if (numb === 2) {
      cliente();
      numb = 2;
    } else if (numb === 3) {
      registro(3);
      numb = 3;
    } else if (numb === 4) {
      trabajador();
      numb = 4;
    }
  } else {
    if (numb === 1) {
      trabajos();
      numb = 1;
    } else if (numb === 2) {
      cliente();
      numb = 2;
    } else if (numb === 3) {
      registro(3);
      numb = 3;
    } else if (numb === 4) {
      trabajador();
      numb = 4;
    }
  }
}
///////////////Funcion para agregar 
function btnagregar() {
  if (numb === 2) {
    HacerVisibleFormCliente();
    LimpiarFC();
    ocultarBtnModificarC();
  } else if (numb === 1) {
    HacerVisibleFormTrabajos();
    limpiarTrbj();
    ocultarBtnModificarTs();
  } else if (numb === 4) {
    HacerVisibleFormTrabajador();
    LimpiarFTrbjr();
    ocultarBtnModificarTr();
  } else if (numb === 3) {
    HacerVisibleFormRegistro();
    LimpiarFR();
    ocultarBtnModificarR();
  }
}
///////////77<   Funcion para hacer invisible el formulario 
function btnCancelar() {
  if (numb === 2) {
    seccion = document.getElementById("FormCliente");
    seccion.classList.add("d-none");
  } else if (numb === 1) {
    seccion = document.getElementById("FormTrabajos");
    seccion.classList.add("d-none");
  } else if (numb === 4) {
    seccion = document.getElementById("FormTrabajador");
    seccion.classList.add("d-none");
  } else if (numb === 3) {
    seccion = document.getElementById("FormRegistro");
    seccion.classList.add("d-none");
  }
}

let datosJson;
/** Funciones para consulta de API */
/** Obtener todos los datos */
const getAll = async (api) => {
  try {
    const respuesta = await fetch(api);
    //const data = await respuesta.json();
    if (respuesta.status == 200) {
      let json = await respuesta.json(); // (3)
      return json;
    }
  } catch (error) {
    console.log("ERROR: " + error);
  }
};

////////////////////////////////////////////////Funcion general para Eliminar datos en una api x
const BtnEliminar = async (api, id) => {
  try {
    const respuesta = await fetch(`${api}/${id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    const data = await respuesta.json();
    if (respuesta.status == 200) {
      console.log("Registro eliminado: " + data);
      let item = document.getElementById("row-" + id);
      item.parentNode.removeChild(item);

      alert(
         "Registro eliminado! \n"+
        `El ${id} ha sido eliminado`
      );
    }
  } catch (error) {
    console.log("ERROR: " + error);
  }
};

////////////////////////////////////////////////Funcion general para modificar datos en una api x
const Modificar = async (api, id, obj) => {
  try {
    const respuesta = await fetch(`${api}/${id}`, {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    const data = await respuesta.json();
    return data;
  } catch (error) {
    console.log("ERROR: " + error);
  }
};

////////////////////////////////////////////////Funcion general para guardar datos en una api x
const guardar = async (api, obj) => {
  try {
    const respuesta = await fetch(api, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    const data = await respuesta.json();
    if (respuesta.status == 201) {
      console.log("Registro creado!");
      return data;
    }
  } catch (error) {
    console.log("ERROR: " + error);
  }
};
////////////////////////////////////////////////



////////////////////////////////////Funcion para guardar el registro
let BtnModificarC = () => {
  //Funcion para modificar el cliente
  const obj = {
    //Creamos el objeto a partir de los datos ingresados en el formulario
    identificacion: document.getElementById("Identificacion").value,
    nombre: document.getElementById("nombreCliente").value,
    direccion: document.getElementById("direccion").value,
  };
  Modificar(apiCLiente, ide, obj)
    .then((response) => {
      return response;
    })
    .then((data) => {
      actualizar();
      cambiarTitulo.textContent ='Clientes';
      alert(
        "Cliente modificado! \n"+
        `El cliente: ${data.nombre}, ha sido modificado`
       );
    });
};

////////////////////////////////////Funcion para guardar el Cliente
const btnGuardarC = () => {
  obj = {
    //Creamos el objeto a partir de los datos ingresados en el formulario
    identificacion: document.getElementById("Identificacion").value,
    nombre: document.getElementById("nombreCliente").value,
    direccion: document.getElementById("direccion").value,
  };

  console.log(obj);
  guardar(apiCLiente, obj)
    .then((response) => {
      return response;
    })
    .then((data) => {
      alert(
       "Cliente agregado! \n"+
       `El cliente: ${data.nombre}, ha sido agregado`
      );
      actualizar();
      
      cambiarTitulo.textContent ='Clientes';
    })

    .catch(function (err) {
      console.log("Se presento un error en la petición");
      console.error(err);
    });
};

///Funcion que permite habilitar el formulario modificar
const BtnModificar = (id) => {
  if (numb === 2) {
    llenarFCliente(id);
    HacerVisibleFormCliente();
    ocultarBtnGuardarC();
  } else if (numb === 1) {
    llenarTrabajos(id);
    HacerVisibleFormTrabajos();
    ocultarBtnGuardarTs();
  } else if (numb === 4) {
    llenarTrabajador(id);
    HacerVisibleFormTrabajador();
    ocultarBtnGuardarTr();
  } else if (numb === 3) {
    llenarRegistro(id);
    HacerVisibleFormRegistro();
    ocultarBtnGuardarR();
  }
  ide = id;
  return ide;
};

////////////////////////////////////////////////////////////////////  Funcion para consumir la api Cliente y generar la tabla
function cliente(dato, titulo) {
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
  getAll(apiCLiente).then((data) => {
    inseTh("id");
    inseTh("Identificación");
    inseTh("Nombre");
    inseTh("Dirección");
    inseTh("Opciones");

    datosJson = data;

    data.forEach((element, index) => {
      //Por cada registro obtenido se crea una nueva fila y se agrega al Body de la tabla
      let row = document.createElement("TR");
      let col1 = document.createElement("TD");
      col1.innerHTML = element.id;
      let col2 = document.createElement("TD");
      col2.innerHTML = element.identificacion;
      let col3 = document.createElement("TD");
      col3.innerHTML = element.nombre;
      let col4 = document.createElement("TD");
      col4.innerHTML = element.direccion;
      let col5 = document.createElement("TD");
      col5.innerHTML = `<div id="opcliente" class="container">
        <button type="button" id="" onclick="BtnModificar('${element.id}')" class="btn btn-primary col-12 text-uppercase m-1">Modificar</button>
        <button type="button"  onclick="BtnEliminar('${apiCLiente}',${element.id})" class="btn btn-danger col-12 text-uppercase m-1">Eliminar</button>
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

/////////////////////////////////////----Funciones para hacer visible los botenes modificar y guardar//////////////////////////////
const ocultarBtnGuardarC = () => {
  const h2 = document.getElementById("agregarcliente");
  h2.textContent = "Modificar cliente";
  seccion = document.getElementById("btn-guardarC");
  seccion.classList.add("d-none");
  seccion = document.getElementById("btn-modificarC");
  seccion.classList.remove("d-none");
};
const ocultarBtnModificarC = () => {
  const h2 = document.getElementById("agregarcliente");
  h2.textContent = "Agregar cliente";
  seccion = document.getElementById("btn-modificarC");
  seccion.classList.add("d-none");
  seccion = document.getElementById("btn-guardarC");
  seccion.classList.remove("d-none");
};
   ///////////////////////////////////////////////////////////////////   ///////////////////////////////////////////////////////////////////
   //Funcion para llenar el formulario de cliente

const llenarFCliente = (id) => {
  getAll(`${apiCLiente}/${id}`).then((data) => {
    console.log(data);
    const idtc = `${data.identificacion}`;
    const nomc = `${data.nombre}`;
    const drec = `${data.direccion}`;
    
    document.getElementById("Identificacion").value = idtc;
    document.getElementById("nombreCliente").value = nomc;
    document.getElementById("direccion").value = drec;
  });
};

////////////////////////////////Funcion para limpiar el formulario cliente////////////////////////////////////
function LimpiarFC(){
  document.getElementById("Identificacion").value ="";
  document.getElementById("nombreCliente").value = "";
  document.getElementById("direccion").value = "";    
}