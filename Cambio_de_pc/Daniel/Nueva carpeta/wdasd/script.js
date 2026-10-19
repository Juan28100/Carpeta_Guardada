// Seleccionamos los botones por su ID
const btnClaro = document.getElementById('btn-claro');
const btnOscuro = document.getElementById('btn-oscuro');

// Al hacer clic en "Modo Claro", quitamos la clase oscura
btnClaro.addEventListener('click', () => {
  document.body.classList.remove('tema-oscuro');
});

// Al hacer clic en "Modo Oscuro", agregamos la clase oscura
btnOscuro.addEventListener('click', () => {
  document.body.classList.add('tema-oscuro');
});