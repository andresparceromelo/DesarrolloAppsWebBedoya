// ============================================================================
// VËKTOR - Scroll Reveal Animations
// Animaciones sutiles al hacer scroll - Premium & Sobrio
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {

    // Configuración del Intersection Observer
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    // Callback para cuando un elemento entra en viewport
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Dejar de observar después de animar (una sola vez)
                observer.unobserve(entry.target);
            }
        });
    };

    // Crear el observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observar todos los artículos de componentes Y la nueva sección de servicios
    const animatableElements = document.querySelectorAll('main > section:nth-of-type(3) article, .services-cta-container');
    animatableElements.forEach(el => {
        observer.observe(el);
    });

    // Hero Slider Logic
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;
        const slideInterval = 3000; // 3 seconds

        setInterval(() => {
            // Remove active class from current slide
            slides[currentSlide].classList.remove('active');

            // Calculate next slide index
            currentSlide = (currentSlide + 1) % totalSlides;

            // Add active class to next slide
            slides[currentSlide].classList.add('active');
        }, slideInterval);
    }

});
