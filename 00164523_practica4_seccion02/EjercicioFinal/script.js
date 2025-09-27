// Arreglo global para almacenar todos los recordatorios
let recordatoriosGuardados = [];

// Actividades base por día
const actividadesBase = {
  lunes: "Estudiar calculo II",
  martes: "Estudiar Programación Web",
  miercoles: "Estudiar Administración de base de datos",
  jueves: "Jugar minecraft",
  viernes: "Bailar salsa",
  sabado: "Ver anime",
  domingo: "Descansar (no hay actividades programadas)",
};

// Nombres completos de los días
const nombresDias = {
  lunes: "Lunes",
  martes: "Martes",
  miercoles: "Miércoles",
  jueves: "Jueves",
  viernes: "Viernes",
  sabado: "Sábado",
  domingo: "Domingo",
};

// Función para obtener la actividad base según el día
const obtenerActividadBase = (dia) => actividadesBase[dia];

// Función para obtener el nombre completo del día
const obtenerNombreDia = (dia) => nombresDias[dia];

// Guardar un nuevo recordatorio
const guardarRecordatorio = () => {
  const diaSeleccionado = document.getElementById("diaSemana").value;
  const mensajePersonal = document
    .getElementById("mensajePersonal")
    .value.trim();

  if (!diaSeleccionado) {
    alert("Por favor selecciona un día de la semana");
    return;
  }

  if (!mensajePersonal) {
    alert("Por favor ingresa un mensaje personalizado");
    return;
  }

  const nuevoRecordatorio = {
    id: Date.now(),
    dia: diaSeleccionado,
    nombreDia: obtenerNombreDia(diaSeleccionado),
    mensaje: mensajePersonal,
    actividadBase: obtenerActividadBase(diaSeleccionado),
  };

  recordatoriosGuardados.push(nuevoRecordatorio);

  document.getElementById("mensajePersonal").value = "";

  mostrarMensajeSimple(
    `✅ Recordatorio guardado para el ${nuevoRecordatorio.nombreDia}`
  );
  mostrarRecordatoriosSemana();
};

// Mostrar mensaje de confirmación
const mostrarMensajeSimple = (mensaje) => {
  const mensajeDiv = document.createElement("div");
  mensajeDiv.className = "mensaje-simple";
  mensajeDiv.textContent = mensaje;

  const botones = document.querySelector(".botones-principales");
  botones.parentNode.insertBefore(mensajeDiv, botones.nextSibling);

  setTimeout(() => mensajeDiv.remove(), 2000);
};

// Mostrar recordatorios y actividades
const mostrarRecordatoriosSemana = () => {
  const recordatorioDiv = document.getElementById("recordatorio");

  let contenidoHTML = `
    <div class="semana-header">
      <h2>📅 Actividades de la semana</h2>
      ${
        recordatoriosGuardados.length > 0
          ? `<div class="contador">Recordatorios agregados: ${recordatoriosGuardados.length}</div>`
          : ""
      }
    </div>
    <div class="actividades-base">
  `;

  const dias = Object.keys(actividadesBase);

  dias.forEach((dia) => {
    const actividad = obtenerActividadBase(dia);
    const nombreDia = obtenerNombreDia(dia);

    contenidoHTML += `
      <div class="dia-actividad-base">
        <h3>${nombreDia}</h3>
        <p>${actividad}</p>
    `;

    const recordatoriosDelDia = recordatoriosGuardados.filter(
      (r) => r.dia === dia
    );

    if (recordatoriosDelDia.length > 0) {
      contenidoHTML += `<div class="recordatorios-agregados">`;

      recordatoriosDelDia.forEach((recordatorio) => {
        contenidoHTML += `
          <div class="recordatorio-item" id="rec-${recordatorio.id}">
            <span class="recordatorio-mensaje">${recordatorio.mensaje}</span>
            <button onclick="eliminarRecordatorio(${recordatorio.id})" class="btn-eliminar">Eliminar</button>
          </div>
        `;
      });

      contenidoHTML += `</div>`;
    }

    contenidoHTML += `</div>`;
  });

  contenidoHTML += `</div>`;
  recordatorioDiv.innerHTML = contenidoHTML;
  recordatorioDiv.style.display = "block";
};

// Eliminar un recordatorio con animación
const eliminarRecordatorio = (id) => {
  if (confirm("¿Seguro que quieres eliminar este recordatorio?")) {
    const item = document.getElementById(`rec-${id}`);

    if (item) {
      item.style.transition = "opacity 0.5s ease";
      item.style.opacity = "0";
      setTimeout(() => {
        recordatoriosGuardados = recordatoriosGuardados.filter((r) => r.id !== id);
        mostrarRecordatoriosSemana();
      }, 500);
    }
  }
};

// Limpiar los resultados
const limpiarResultado = () => {
  document.getElementById("recordatorio").style.display = "none";
};

// Configurar día actual
const configurarDiaActual = () => {
  const diasSemana = [
    "domingo",
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
  ];
  const hoy = new Date().getDay();
  document.getElementById("diaSemana").value = diasSemana[hoy];
};

// Inicialización
window.onload = configurarDiaActual;
