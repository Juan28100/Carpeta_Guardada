// 1. Configuramos Global (apunta a tu servidor nativo)
const API_URL = 'http://localhost:3000/tasks';

// Intentamos leersi ya existe un nombre guardado en el disco del navegador
let AUTHOR = localStorage.getItem('todo_author_session');

// 2. Captura centralizada de elementos del DOM
const currentUserText = document.getElementById('currentUser');
const logoutBtn = document.getElementById('logoutBtn');
const taskForm = document.getElementById('taskForm');
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const tasksContainer = document.getElementById('tasksContainer');

// 2.1 Selectores de modales personalizados
const customModal = document.getElementById('customModal');
const modalTitle = document.getElementById('modalTitle');
const modalMenssage = document.getElementById('modalMessage');
const modalCancelBtn = document.getElementById ('modalCancelBtn')
const modalConfirmBtn = document.getElementById ('modalConfirmBtn');

const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const loginInput = document.getElementById('loginInput');

// 2.2 Controlador asincrono del modal de notificaciones
function openCustomModal (title, message, isConfirm = false, onConfirmCallback = null) {
    modalTitle.textContent = title;
    modalMenssage.textContent = message;
    
    modalCancelBtn.style.display = isConfirm ? 'block' : 'none';
    customModal.classList.add('active');

    const nuevoConfirmBtn = modalConfirmBtn.cloneNode(true);
    const nuevoCancelBtn = modalCancelBtn.cloneNode(true);
    modalConfirmBtn.parentNode.replaceChild(nuevoConfirmBtn, modalConfirmBtn);
    modalCancelBtn.parentNode.replaceChild(nuevoCancelBtn, modalCancelBtn);

    nuevoConfirmBtn.addEventListener('click', () => {
        customModal.classList.remove('active');
        if (onConfirmCallback) onConfirmCallback();
    })

    nuevoCancelBtn.addEventListener('click', () => {
        customModal.classList.remove('active');
    });
}

// 3. Guardia de autenticacion (manipulacion de modales de flujo)
function checkAuth() {
    if (!AUTHOR) {
        loginModal.classList.remove('active');
    } else {
        loginModal.classList.remove('active');
        currentUserText.textContent = AUTHOR;
        fetchTasks(); // Cargamos las tareas solo si ya esta identificado
    }
}

// 3.1 Escuchador para el formulario interno del modal login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = loginInput.ariaValueMax.trim();

    if (name && name.length >= 2) {
        AUTHOR = name;
        localStorage.setItem('todo_author_session', AUTHOR);
        loginModal.classList.remove('active');
        currentUserText.textContent = AUTHOR;
        fetchTasks();
    } else {
        openCustomModal('Validacion', 'Por favor ingresa un nombre valido (minimo 2 caracteres),', false);
    }
});

// 4. Leer tareas desde MySQL (GET)
async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        const json = await response.json();

        if (json.status === 'success' && json.data.tasks) {
            renderTasks(json.data.tasks);
        }
    } catch (error) {
        console.error('Error de red: ', error);
        tasksContainer.innerHTML = `<p class="error"> No se pudo conectar con el servidor nativo.</p>`;
    }
}

// 5. Pintar las tarjetas dinamicamente
function renderTasks(tasks) {
    tasksContainer.innerHTML = '';

    if (tasks.length === 0) {
        tasksContainer.innerHTML = '<p class="empty"> No hay tareas pendientes en la base de datos.</p>';
        return;
    }

    tasks.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.className = `task-card ${task.is_completed ? 'completed' : ''}`;

        const setHtmlModoLectura = () => {
            taskCard.innerHTML = 
            <div class="task-info">
                <h3>${task.title}</h3>
                <p>${task.description || ''}</p>
                <span class="author">Autor: ${task.author}</span>
            </div>
            
        }
    })
}