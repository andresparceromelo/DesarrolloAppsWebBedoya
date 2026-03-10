/* ============================================================================
   VËKTOR - Service Modal Logic
   ============================================================================ */

const ServiceModal = (() => {
    let currentModal = null;

    function init() {
        // Create modal container if it doesn't exist
        if (!document.getElementById('service-modal-overlay')) {
            const overlay = document.createElement('div');
            overlay.id = 'service-modal-overlay';
            overlay.className = 'modal-overlay';
            overlay.innerHTML = `
                <div class="modal" id="service-modal">
                    <div class="modal__header">
                        <button class="modal__close" id="modal-close">×</button>
                        <h2 class="modal__title" id="modal-title"></h2>
                        <p class="modal__subtitle" id="modal-subtitle"></p>
                    </div>
                    <div class="modal__body" id="modal-body"></div>
                    <div class="modal__footer" id="modal-footer"></div>
                </div>
            `;
            document.body.appendChild(overlay);

            // Event listeners
            document.getElementById('modal-close').addEventListener('click', close);
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) close();
            });

            // ESC key to close
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && currentModal) close();
            });
        }
    }

    function open(serviceData) {
        currentModal = serviceData;

        // Populate modal
        document.getElementById('modal-title').textContent = serviceData.title;
        document.getElementById('modal-subtitle').textContent = serviceData.subtitle || '';
        document.getElementById('modal-body').innerHTML = serviceData.body;
        document.getElementById('modal-footer').innerHTML = serviceData.footer;

        // Show modal
        document.getElementById('service-modal-overlay').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        document.getElementById('service-modal-overlay').classList.remove('active');
        document.body.style.overflow = '';
        currentModal = null;
    }

    return { init, open, close };
})();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', ServiceModal.init);

/* ============================================================================
   VËKTOR - Service Data & Handlers
   ============================================================================ */

const SERVICES_DATA = {
    biomechanics: {
        title: 'Estudio Biomecánico Avanzado',
        subtitle: 'Optimización de posición y rendimiento',
        body: `
            <div class="modal__image">
                <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=90&fit=crop" 
                     alt="Estudio biomecánico profesional">
            </div>
            
            <div class="modal__section">
                <h3>¿Qué Incluye?</h3>
                <ul>
                    <li>Evaluación física y análisis de flexibilidad (60 min)</li>
                    <li>Captura de movimiento 3D en rodillo (45 min)</li>
                    <li>Análisis de distribución de presiones en sillín y pedales</li>
                    <li>Medición de ángulos articulares y eficiencia de pedaleo</li>
                    <li>Ajuste completo de posición en bicicleta</li>
                    <li>Informe técnico detallado con datos y recomendaciones</li>
                    <li>Seguimiento a 30 días para ajustes finos</li>
                </ul>
            </div>
            
            <div class="modal__section">
                <h3>Planes Disponibles</h3>
                <ul>
                    <li><strong>Básico</strong> - 2 horas - €280</li>
                    <li><strong>Avanzado</strong> (con captura 3D) - 3.5 horas - €480</li>
                    <li><strong>Pro</strong> (incluye análisis de potencia) - 5 horas + seguimiento - €720</li>
                </ul>
            </div>
            
            <div class="modal__section">
                <p><strong>Nota:</strong> Clientes que compran bicicleta completa VËKTOR reciben 50% de descuento en estudio biomecánico avanzado.</p>
            </div>
        `,
        footer: `
            <div>
                <span class="modal__price-label">Desde</span>
                <div class="modal__price">€280</div>
            </div>
            <button class="modal__cta" onclick="requestService('biomechanics')">
                Solicitar Estudio
            </button>
        `
    },

    roadToPro: {
        title: 'Programa Road to Pro',
        subtitle: 'Asesoramiento técnico integral',
        body: `
            <div class="modal__image">
                <img src="https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&q=90&fit=crop" 
                     alt="Programa Road to Pro">
            </div>
            
            <div class="modal__section">
                <h3>¿Para Quién?</h3>
                <ul>
                    <li>Ciclistas amateur con objetivos competitivos serios</li>
                    <li>Atletas que buscan transición a categorías superiores</li>
                    <li>Ciclistas con presupuesto para invertir en rendimiento medible</li>
                    <li>Personas con conocimientos técnicos que valoran datos objetivos</li>
                </ul>
            </div>
            
            <div class="modal__section">
                <h3>Qué Incluye</h3>
                <ul>
                    <li>Evaluación inicial completa (biomecánica + análisis de equipamiento)</li>
                    <li>Plan de optimización de equipamiento personalizado</li>
                    <li>Acceso a pruebas de componentes antes de compra</li>
                    <li>Análisis mensual de datos de entrenamiento (potencia, cadencia, aerodinámica)</li>
                    <li>Sesiones trimestrales de ajuste y optimización</li>
                    <li>Acceso prioritario a nuevos desarrollos y prototipos</li>
                    <li>Comunidad privada de usuarios Road to Pro</li>
                    <li>Descuentos en componentes y servicios (15-25%)</li>
                </ul>
            </div>
            
            <div class="modal__section">
                <h3>Planes</h3>
                <ul>
                    <li><strong>Trimestral</strong> - 3 meses - €890</li>
                    <li><strong>Anual</strong> - 12 meses - €2,800 (ahorro de €880)</li>
                    <li><strong>Pro Team</strong> (grupos 3-5 personas) - 12 meses - €2,200/persona</li>
                </ul>
            </div>
        `,
        footer: `
            <div>
                <span class="modal__price-label">Desde</span>
                <div class="modal__price">€890</div>
            </div>
            <button class="modal__cta" onclick="requestService('roadToPro')">
                Unirme al Programa
            </button>
        `
    },

    customBuild: {
        title: 'Construcción Personalizada',
        subtitle: 'Bicicleta a medida desde cero',
        body: `
            <div class="modal__image">
                <img src="https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800&q=90&fit=crop" 
                     alt="Construcción personalizada">
            </div>
            
            <div class="modal__section">
                <h3>Proceso de Construcción</h3>
                <ul>
                    <li><strong>Consulta inicial</strong> - Análisis de necesidades y objetivos</li>
                    <li><strong>Estudio biomecánico</strong> - Geometría personalizada</li>
                    <li><strong>Selección de componentes</strong> - Grupo, ruedas, cockpit</li>
                    <li><strong>Diseño y aprobación</strong> - Renders 3D y especificaciones</li>
                    <li><strong>Construcción</strong> - 4-6 semanas</li>
                    <li><strong>Entrega y ajuste</strong> - Prueba y optimización final</li>
                </ul>
            </div>
            
            <div class="modal__section">
                <h3>Opciones de Personalización</h3>
                <ul>
                    <li>Geometría adaptada a tus medidas exactas</li>
                    <li>Selección de layup de carbono según peso/rigidez</li>
                    <li>Acabado personalizado (colores, logos)</li>
                    <li>Componentes de cualquier marca premium</li>
                    <li>Integración de sistemas de medición (potencia, aerodinámica)</li>
                </ul>
            </div>
        `,
        footer: `
            <div>
                <span class="modal__price-label">Desde</span>
                <div class="modal__price">€12,000</div>
            </div>
            <button class="modal__cta" onclick="requestService('customBuild')">
                Iniciar Consulta
            </button>
        `
    }
};

// Service request handler
function requestService(serviceId) {
    const service = SERVICES_DATA[serviceId];
    if (!service) return;

    // Close modal
    ServiceModal.close();

    // Simulate service request (you can replace with actual form or redirect)
    alert(`¡Gracias por tu interés en ${service.title}!\n\nEn breve te contactaremos para coordinar los detalles.`);

    // TODO: Replace with actual form submission or redirect to contact page
    // window.location.href = `contactenos.html?service=${serviceId}`;
}

// Attach service card click handlers
function attachServiceHandlers() {
    document.querySelectorAll('[data-service]').forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on a link
            if (e.target.tagName === 'A') return;

            const serviceId = card.dataset.service;
            const serviceData = SERVICES_DATA[serviceId];

            if (serviceData) {
                ServiceModal.open(serviceData);
            }
        });
    });
}

// Initialize handlers when DOM is ready
document.addEventListener('DOMContentLoaded', attachServiceHandlers);
