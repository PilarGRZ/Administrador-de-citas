//Variables

const nombreInput = document.querySelector('#nombre');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const especialidadInput = document.querySelector('#especialidad');
const motivoConsultaInput = document.querySelector('#consulta');


const formulario = document.querySelector('#formulario');
const citasNueva = document.querySelector('#citas');




let editando;

//Eventos

eventListeners();

function eventListeners(){

    nombreInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    especialidadInput.addEventListener('input', datosCita);
    motivoConsultaInput.addEventListener('input', datosCita);
    formulario.addEventListener('submit', agregarCita);

    
};

//Objeto principal

const citaObj={

    nombre:'',
    telefono:'',
    fecha:'',
    hora:'',
    especialidad:'',
    consulta:'',
}

function datosCita(e){
    citaObj[e.target.name] = e.target.value;
    
}

//clase de funciones

class Cita{

    constructor (){

        this.citas =[];
    }

    crearCita(cita){

        this.citas = [...this.citas, cita];
        console.log(this.citas);

    }

    eliminarCita(id){

        this.citas = this.citas.filter(cita => cita.id !== id);
        console.log(this.citas);
    };

    editarCita(citaActualizada){

        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita)
    }

    


};


// clase de interfaz

class UI{

    imprimirAlertas(mensaje, tipo){

        const divMensaje = document.createElement('div');
        divMensaje.classList.add('alert', 'text-center', 'd-block');

        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger')
        }
        else{
            divMensaje.classList.add('alert-success');
        }

        divMensaje.textContent = mensaje;

        formulario.appendChild(divMensaje);

        setTimeout(()=>{
        divMensaje.remove();
        },3000)


    }

    //Mostrar las nuevas citas en un div

    nuevaCita({citas}){

        this.limpiarHtml();

        citas.forEach(cita => {

            

            const{nombre, telefono, fecha, hora, especialidad, consulta, id} = cita;

            const nuevaCita = document.createElement('div');
            nuevaCita.classList.add('cita');

            const pacienteParrafo = document.createElement('h4');
            pacienteParrafo.classList.add('card-tittle', 'fw-bolder', 'text-primary');
            pacienteParrafo.innerHTML=`
            <span class=" fw-bolder"></span>${nombre}`;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML=`
            <span class="fw-bolder">Teléfono:</span> ${telefono}`;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML=`
            <span class="fw-bolder">Fecha: </span> ${fecha}`;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML =`
            <span class="fw-bolder">Hora: </span>${hora}`;

            const especialidadParrafo = document.createElement('p');
            especialidadParrafo.innerHTML=`
            <span class="fw-bolder">Especialidad: </span> ${especialidad}`;

            const consultaParrafo = document.createElement('p');
            consultaParrafo.innerHTML=`
            <span class="fw-bolder">Motivo de consulta: </span> ${consulta}`;

            //Agrega el botón de eliminar

            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'fw-bolder');
            btnEliminar.innerHTML =`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>  Eliminar`;

          //función onclick del botón eliminar

            btnEliminar.onclick=()=>{
                eliminarCita(id);
            };


            //Agrega el botón de editar

            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-primary', 'ms-4', 'fw-bolder','text-white');
            btnEditar.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
          </svg>  Editar`;

          //Función del botón editar

          btnEditar.onclick=()=>{

            cargarEdicion(cita);
          };


          //Agregamos cada uno de los registros en el div padre
          
            nuevaCita.appendChild(pacienteParrafo);
            nuevaCita.appendChild(telefonoParrafo);
            nuevaCita.appendChild(fechaParrafo);
            nuevaCita.appendChild(horaParrafo);
            nuevaCita.appendChild(especialidadParrafo);
            nuevaCita.appendChild(consultaParrafo);
            nuevaCita.appendChild(btnEliminar);
            nuevaCita.appendChild(btnEditar);

            citasNueva.appendChild(nuevaCita);
        });
    };

    //Evita que se repitan las citas a medida que agregmos una cita nueva
    limpiarHtml(){

        while(citasNueva.firstChild){
            citasNueva.removeChild(citasNueva.firstChild);
        };
    };   
};


//Instanciar

let ui = new UI();
let administradorCitas= new Cita();


// Validar campos

function agregarCita(e){
    e.preventDefault();

    const fechaActual = new Date();
    const fechaInputUsuario = new Date(citaObj.fecha);
   

    const{nombre, telefono, fecha, hora, especialidad, consulta} = citaObj;
  

    if(nombre === '' || telefono === '' || fecha === '' || hora === '' || especialidad === '' || consulta === ''){
       ui.imprimirAlertas('Todos los campos deben ser diligenciados', 'error');  
       return;     
    } 

    if(isNaN(telefono)){
        ui.imprimirAlertas('Por favor indique un número telefónico válido', 'error');
         return;  
    }

    if(fechaInputUsuario < fechaActual){
        ui.imprimirAlertas('Por favor ingrese una fecha valida', 'error');
        return;
    }


    if(editando){
       ui.imprimirAlertas('Cita editada correctamente');
       administradorCitas.editarCita({...citaObj});

    
       formulario.querySelector('button[type="submit"]').textContent='Crear cita';

       editando = false;
      
    }

    else{

        citaObj.id = Date.now();

        administradorCitas.crearCita({...citaObj});

        ui.imprimirAlertas('Cita agregada correctamente');

     
    }


    formulario.reset();

    reiniciarFormulario();


    ui.nuevaCita(administradorCitas);
};

//Elimina las citas y actualiza el ui

function eliminarCita(id){

    administradorCitas.eliminarCita(id);

    ui.imprimirAlertas('Cita eliminada correctamente');

    ui.nuevaCita(administradorCitas);
};

//Habilita todos los registros en el formulario de la cita que vamos a editar

function cargarEdicion(cita){

    const{nombre, telefono, fecha, hora, especialidad, consulta, id} = cita;

    nombreInput.value = nombre;
    telefonoInput.value  = telefono;
    fechaInput.value  = fecha;
    horaInput.value  = hora;
    especialidadInput.value  = especialidad;
    motivoConsultaInput.value  = consulta;

    citaObj.nombre = nombre;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.especialidad = especialidad;
    citaObj.consulta = consulta;
    citaObj.id = id;

    formulario.querySelector('button[type="submit"]').textContent='Guardar cambios';

    editando = true;
}

// Reinicia el fomulario, nos coloca los campos en blanco.

function reiniciarFormulario(){

    citaObj.nombre='';
    citaObj.telefono ='';
    citaObj.fecha  ='';
    citaObj.hora ='';
    citaObj.especialidad ='';
    citaObj.consulta ='';

}
