/* ============================================================================
   VËKTOR - Bot Recomendador Module
   ============================================================================ */

const BotRecommender = (() => {
    // Keywords logic
    const KEYWORDS = {
        'tt-triathlon': {
            primary: ['contrarreloj', 'triatlón', 'ironman', 'aerodinámica', 'aero', 'tt', 'crono', 'cronograma'],
            secondary: ['velocidad', 'plano', 'viento', 'posición']
        },
        'road-aero': {
            primary: ['ruta', 'carretera', 'road', 'competición', 'pelotón', 'subida', 'puerto', 'escalada'],
            secondary: ['sprint', 'etapa', 'fondo', 'montaña']
        },
        'gravel-racing': {
            primary: ['gravel', 'grava', 'tierra', 'mixto', 'aventura', 'viaje'],
            secondary: ['barro', 'piedras', 'resistencia', 'cómodo']
        }
    };

    let scores = {
        'tt-triathlon': 0,
        'road-aero': 0,
        'gravel-racing': 0
    };

    function analyzeInput(userInput) {
        const input = userInput.toLowerCase();

        // Reset scores
        Object.keys(scores).forEach(key => scores[key] = 0);

        // Analizar keywords
        Object.keys(KEYWORDS).forEach(discipline => {
            const keywords = KEYWORDS[discipline];

            keywords.primary.forEach(keyword => {
                if (input.includes(keyword)) scores[discipline] += 10;
            });

            keywords.secondary.forEach(keyword => {
                if (input.includes(keyword)) scores[discipline] += 5;
            });
        });

        return getBestMatch();
    }

    function getBestMatch() {
        const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
        const winner = sorted[0];

        if (winner[1] < 1) { // Umbral bajo para pruebas
            return {
                recommendation: null,
                message: 'No estoy seguro de qué recomendarte. ¿Buscas algo para triatlón, ruta o gravel?'
            };
        }

        return {
            recommendation: winner[0],
            message: generateRecommendationMessage(winner[0])
        };
    }

    function generateRecommendationMessage(disciplineId) {
        const discipline = DISCIPLINES.find(d => d.id === disciplineId);
        return `Basado en lo que me dices, creo que te interesaría nuestra categoría **${discipline.name}**.`;
    }

    return {
        analyze: analyzeInput
    };
})();

/* ============================================================================
   VËKTOR - Bot UI Module
   ============================================================================ */

const BotUI = (() => {
    let isOpen = false;

    function init() {
        render();
        setupEventListeners();

        // Mensaje de bienvenida tras 2 segundos
        setTimeout(() => {
            addMessage('bot', '¡Hola! Soy el asistente VËKTOR. ¿Qué tipo de ciclismo practicas o qué buscas hoy?');
        }, 2000);
    }

    function render() {
        const container = document.createElement('div');
        container.id = 'bot-container';
        container.className = 'bot-container';
        container.innerHTML = `
        <button id="bot-trigger" class="bot-trigger">
            <!-- Icono Chat SVG -->
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" fill="currentColor"/>
            </svg>
            <span class="bot-badge">1</span>
        </button>
        
        <div id="bot-panel" class="bot-panel">
          <div class="bot-header">
            <h3>Asistente VËKTOR</h3>
            <button id="bot-close">×</button>
          </div>
          
          <div id="bot-messages" class="bot-messages"></div>
          
          <div class="bot-input">
            <input type="text" id="bot-input-field" placeholder="Ej: Busco bici para triatlón...">
            <button id="bot-send">Enviar</button>
          </div>
        </div>
      `;

        document.body.appendChild(container);
    }

    function setupEventListeners() {
        document.getElementById('bot-trigger').addEventListener('click', toggle);
        document.getElementById('bot-close').addEventListener('click', toggle);
        document.getElementById('bot-send').addEventListener('click', sendMessage);

        document.getElementById('bot-input-field').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    function toggle() {
        isOpen = !isOpen;
        document.getElementById('bot-panel').classList.toggle('open');
        const badge = document.querySelector('.bot-badge');
        if (isOpen && badge) badge.style.display = 'none';
        if (isOpen) document.getElementById('bot-input-field').focus();
    }

    function sendMessage() {
        const input = document.getElementById('bot-input-field');
        const text = input.value.trim();

        if (!text) return;

        addMessage('user', text);
        input.value = '';

        // Simular delay y respuesta
        setTimeout(() => {
            const result = BotRecommender.analyze(text);
            addMessage('bot', result.message);

            if (result.recommendation) {
                showProductCard(result.recommendation);
            }
        }, 800);
    }

    function addMessage(sender, text) {
        const container = document.getElementById('bot-messages');
        const msg = document.createElement('div');
        msg.className = `bot-message bot-message--${sender}`;
        msg.innerHTML = `
        <div class="bot-message__content">${text}</div>
        <div class="bot-message__time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
      `;
        container.appendChild(msg);
        container.scrollTop = container.scrollHeight;
    }

    function showProductCard(disciplineId) {
        // Encontrar producto destacado de esa disciplina
        const product = PRODUCTS.find(p => p.discipline === disciplineId && p.featured) || PRODUCTS.find(p => p.discipline === disciplineId);

        if (!product) return;

        const container = document.getElementById('bot-messages');
        const card = document.createElement('div');
        card.className = 'bot-message bot-message--bot';
        card.innerHTML = `
            <div style="background: white; border: 1px solid #eee; border-radius: 8px; overflow: hidden; max-width: 85%;">
                <img src="${product.images[0]}" style="width: 100%; height: 120px; object-fit: cover;">
                <div style="padding: 10px;">
                    <h4 style="font-size: 0.9rem; margin-bottom: 4px;">${product.name}</h4>
                    <p style="font-size: 0.8rem; color: #666; margin-bottom: 8px;">${product.description.short}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: bold;">€${product.price.toLocaleString()}</span>
                        <a href="productos.html" style="font-size: 0.75rem; text-decoration: none; color: black; border: 1px solid black; padding: 2px 8px; border-radius: 4px;">Ver</a>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
        container.scrollTop = container.scrollHeight;
    }

    return { init };
})();

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', BotUI.init);
