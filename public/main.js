let newSW;
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').then(result => {
      result.addEventListener('updatefound', () => {
        newSW = result.installing;
        console.log('Hay un nuevo SW', newSW)


      })
    })

  })
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => navigator.serviceWorker.ready)
    .then(registration => {
      if ('SyncManager' in window) {
        registration.sync.register('sync-messages')
      }
    })
}
document.addEventListener('DOMContentLoaded', function () {
  let elems = document.querySelectorAll('select', '.datepicker');
  let instances = M.FormSelect.init(elems);

});
$(document).ready(function () {
  $('#txtFecha').datepicker();
});
$(document).ready(function () {
  $('#txtHora').timepicker();
});

document.addEventListener('DOMContentLoaded', () => {
  let txtNombre = document.querySelector('#txtNombre')
  let txtApellidos = document.querySelector('#txtApellidos')
  let txtTelefono = document.querySelector('#txtTelefono')
  let txtEmail = document.querySelector('#txtEmail')
  let txtFecha = document.querySelector('#txtFecha')
  let txtHora = document.querySelector('#txtHora')
  let TxtDescripcion = document.querySelector('#TxtDescripcion')
  let btnEnviar = document.querySelector('#btnEnviar')
})
btnEnviar.addEventListener('click', () => {
  let cita = {
    nombre: txtNombre.value,
    apellidos: txtApellidos.value,
    telefono: txtTelefono.value,
    email: txtEmail.value,
    fecha: txtFecha.value,
    hora: txtHora.value,
    descripcion: TxtDescripcion.value,
  }
  console.log(cita)
  let citaObjeto = JSON.stringify(cita)
  fetch('/api/enviarCita', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: citaObjeto
  }).catch(err => {
    saveMessagesInOffline(citaObjeto)
  })
})
async function saveMessagesInOffline(messages) {
  const db = await openDB('messages', 1, {
    upgrade(db) {
      db.createObjectStore('messageToSync', { keyPath: 'id' });
    }
  });
  const tx = db.transaction('messagesToSync', 'readwrite');
  tx.store.put({ ...messages });
  await tx.done;
}
let bd;
function iniciar() {
  boton = document.getElementById("btnEnviar")
  boton.addEventListener("click", agregarobjeto, false)

  let solicitud = indexedDB.open("Base-V1");

  solicitud.onsuccess = function (e) {
    bd = e.target.result;
  }
  solicitud.onupgradeneeded = function (e) {
    bd = e.target.result;
    bd.createObjectStore('reservacion', { keyPath: 'nombre' });
  }
}
function agregarobjeto() {
  let txtNombre = document.getElementById("txtNombre").value;
  let txtApellidos = document.getElementById("txtApellidos").value;
  let txtTelefono = document.getElementById("txtTelefono").value;
  let txtEmail = document.getElementById("txtEmail").value;
  let txtFecha = document.getElementById("txtFecha").value;
  let txtHora = document.getElementById("txtHora").value;
  let TxtDescripcion = document.getElementById("TxtDescripcion").value;
  let transaccion = bd.transaction(["reservacion"], "readwrite");
  let almacen = transaccion.objectStore("reservacion")
  let agregar = almacen.add({
    nombre: txtNombre, apellidos: txtApellidos,
    telefono: txtTelefono, email: txtEmail,
    fecha: txtFecha, hora: txtHora, descripcion: TxtDescripcion,

  });
}
window.addEventListener("load", iniciar, false);

//-----------------------------------------
var words = document.getElementsByClassName('word');
var wordArray = [];
var currentWord = 0;

words[currentWord].style.opacity = 1;
for (var i = 0; i < words.length; i++) {
  splitLetters(words[i]);
}

function changeWord() {
  var cw = wordArray[currentWord];
  var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
  for (var i = 0; i < cw.length; i++) {
    animateLetterOut(cw, i);
  }
  
  for (var i = 0; i < nw.length; i++) {
    nw[i].className = 'letter behind';
    nw[0].parentElement.style.opacity = 1;
    animateLetterIn(nw, i);
  }
  
  currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
}

function animateLetterOut(cw, i) {
  setTimeout(function() {
		cw[i].className = 'letter out';
  }, i*80);
}

function animateLetterIn(nw, i) {
  setTimeout(function() {
		nw[i].className = 'letter in';
  }, 340+(i*80));
}

function splitLetters(word) {
  var content = word.innerHTML;
  word.innerHTML = '';
  var letters = [];
  for (var i = 0; i < content.length; i++) {
    var letter = document.createElement('span');
    letter.className = 'letter';
    letter.innerHTML = content.charAt(i);
    word.appendChild(letter);
    letters.push(letter);
  }
  
  wordArray.push(letters);
}

changeWord();
setInterval(changeWord, 4000);
