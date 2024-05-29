const tablero = document.getElementById('tablero');
const piezas = [];
let turno = 1;
let pieza1 = null;
let pieza2 = null;
let aciertos = 0;
let errores = 0;

// Crear las piezas del juego
function crearPiezas() {
  const imagenes = ['a', 'b', 'c', 'd', 'e', 'f', 'a', 'b', 'c', 'd', 'e', 'f']; // Imagenes duplicadas para pares
  imagenes.sort(() => Math.random() - 0.5); // Mezclar aleatoriamente

  for (let i = 0; i < imagenes.length; i++) {
    const pieza = document.createElement('div');
    pieza.classList.add('pieza');
    pieza.textContent = imagenes[i];
    pieza.addEventListener('click', handleClick);
    piezas.push(pieza);
  }
}

// Mostrar las piezas en el tablero
function mostrarPiezas() {
  tablero.innerHTML = ''; // Borrar piezas anteriores

  piezas.forEach(pieza => {
    pieza.classList.remove('descubierta');
    pieza.classList.remove('emparejada');
    tablero.appendChild(pieza);
  });
}

// Manejar el clic en una pieza
function handleClick(event) {
  const pieza = event.target;

  if (pieza.classList.contains('emparejada')) {
    return; // Ignorar piezas ya emparejadas
  }

  if (turno === 1) {
    pieza1 = pieza;
    pieza1.classList.add('descubierta');
    turno = 2;
  } else if (turno === 2) {
    pieza2 = pieza;
    pieza2.classList.add('descubierta');

    if (pieza1.textContent === pieza2.textContent) {
      aciertos++;
      pieza1.classList.add('emparejada');
      pieza2.classList.add('emparejada');

      if (aciertos === piezas.length / 2) {
        alert('¡Felicidades! Ganaste el juego.');
      }

      turno = 1;
      pieza1 = null;
      pieza2 = null;
    } else {
      errores++;
      setTimeout(() => {
        pieza1.classList.remove('descubierta');
        pieza2.classList.remove('descubierta');
        turno = 1;
        pieza1 = null;
        pieza2 = null;
      }, 500);
    }
  }
}

// Iniciar el juego
crearPiezas();
mostrarPiezas();
