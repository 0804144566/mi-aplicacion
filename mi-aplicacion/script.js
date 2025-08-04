// Espera a que el DOM esté completamente cargado para ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // 1. Obtiene los elementos del DOM
    const body = document.body;
    const themeToggleBtn = document.getElementById('theme-toggle');

    const homeBtn = document.getElementById('home-btn');
    const formBtn = document.getElementById('form-btn');
    const dashboardBtn = document.getElementById('dashboard-btn');

    const homeView = document.getElementById('home-view');
    const formView = document.getElementById('form-view');
    const dashboardView = document.getElementById('dashboard-view');
    
    // Obtiene el botón del CTA
    const ctaBtn = document.getElementById('cta-btn');

    // 2. Lógica para alternar el tema (modo oscuro/claro)
    function toggleTheme() {
        // Alterna la clase 'dark-mode' en el body
        body.classList.toggle('dark-mode');

        // Guarda la preferencia en el almacenamiento local del navegador
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
        
        // Actualiza el icono del botón según el tema
        updateThemeIcon();
    }

    // 3. Aplica el tema guardado al cargar la página
    function applySavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
        updateThemeIcon();
    }

    // 4. Actualiza el icono del botón de tema
    function updateThemeIcon() {
        const svgPath = themeToggleBtn.querySelector('path');
        if (body.classList.contains('dark-mode')) {
            // Ícono de sol para el modo oscuro
            svgPath.setAttribute('d', 'M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8.009 8.009 0 01-8 8z');
        } else {
            // Ícono de luna para el modo claro
            svgPath.setAttribute('d', 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z');
        }
    }

    // 5. Lógica para la navegación entre vistas
    function showView(viewToShow) {
        // Oculta todas las vistas
        [homeView, formView, dashboardView].forEach(view => view.classList.add('hidden'));
        // Muestra la vista seleccionada
        viewToShow.classList.remove('hidden');
    }

    // 6. Añade los eventos de clic a los botones
    themeToggleBtn.addEventListener('click', toggleTheme);
    homeBtn.addEventListener('click', () => showView(homeView));
    formBtn.addEventListener('click', () => showView(formView));
    dashboardBtn.addEventListener('click', () => showView(dashboardView));
    ctaBtn.addEventListener('click', () => showView(formView));

    // Lógica para manejar el envío del formulario (validación básica)
    const registrationForm = document.getElementById('registration-form');
    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');

        // Lógica de validación
        let isValid = true;
        
        // Limpia mensajes de error previos
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
            el.classList.add('hidden');
        });

        if (nameInput.value.trim() === '') {
            isValid = false;
            document.getElementById('name-error').textContent = 'El nombre es obligatorio.';
            document.getElementById('name-error').classList.remove('hidden');
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            isValid = false;
            document.getElementById('email-error').textContent = 'El formato del correo es inválido.';
            document.getElementById('email-error').classList.remove('hidden');
        }

        if (passwordInput.value.length < 8) {
            isValid = false;
            document.getElementById('password-error').textContent = 'La contraseña debe tener al menos 8 caracteres.';
            document.getElementById('password-error').classList.remove('hidden');
        }

        if (isValid) {
            // Muestra mensaje de éxito
            const successMessage = document.getElementById('form-success-message');
            successMessage.classList.remove('hidden');

            // Reinicia el formulario después de un breve período
            setTimeout(() => {
                registrationForm.reset();
                successMessage.classList.add('hidden');
                showView(dashboardView);
            }, 2000);
        }
    });

    // Aplica el tema guardado al cargar la página por primera vez
    applySavedTheme();
});
