# VËKTOR - Bot Recomendador Inteligente

## 🎯 Objetivo

Crear un bot conversacional que analice las necesidades del usuario y recomiende la bicicleta adecuada usando solo JavaScript.

---

## 🧠 Sistema de Análisis

### 1. Keywords por Categoría

```javascript
const KEYWORDS = {
  'tt-triathlon': {
    primary: ['contrarreloj', 'triatlón', 'ironman', 'aerodinámica', 'aero', 'tt', 'crono'],
    secondary: ['velocidad', 'plano', 'viento', 'posición agresiva'],
    terrain: ['plano', 'circuito', 'velódromo'],
    distance: ['40km', '90km', '180km']
  },
  
  'road-aero': {
    primary: ['ruta', 'carretera', 'road', 'competición', 'pelotón'],
    secondary: ['escalada', 'bajada', 'sprint', 'etapa'],
    terrain: ['montaña', 'puerto', 'pendiente', 'subida'],
    distance: ['100km', '150km', '200km', 'gran fondo']
  },
  
  'track': {
    primary: ['pista', 'velódromo', 'track', 'sprint', 'keirin'],
    secondary: ['aceleración', 'explosivo', 'peralte', 'madison'],
    terrain: ['velódromo', 'pista cubierta'],
    distance: ['200m', '1km', '4km']
  },
  
  'gravel-racing': {
    primary: ['gravel', 'grava', 'tierra', 'mixto', 'adventure'],
    secondary: ['bikepacking', 'ultra', 'endurance', 'versatilidad'],
    terrain: ['grava', 'tierra', 'sendero', 'camino', 'mixto'],
    distance: ['100km', '200km', '300km', 'ultra']
  }
};
```

### 2. Sistema de Scoring

```javascript
const BotRecommender = (() => {
  let conversationHistory = [];
  let userProfile = {
    discipline: null,
    experience: null,
    budget: null,
    priorities: []
  };
  
  let scores = {
    'tt-triathlon': 0,
    'road-aero': 0,
    'track': 0,
    'gravel-racing': 0
  };
  
  // Analizar input del usuario
  function analyzeInput(userInput) {
    const input = userInput.toLowerCase();
    
    // Resetear scores
    Object.keys(scores).forEach(key => scores[key] = 0);
    
    // Analizar keywords
    Object.keys(KEYWORDS).forEach(discipline => {
      const keywords = KEYWORDS[discipline];
      
      // Keywords primarias (peso 10)
      keywords.primary.forEach(keyword => {
        if (input.includes(keyword)) {
          scores[discipline] += 10;
        }
      });
      
      // Keywords secundarias (peso 5)
      keywords.secondary.forEach(keyword => {
        if (input.includes(keyword)) {
          scores[discipline] += 5;
        }
      });
      
      // Terreno (peso 7)
      keywords.terrain.forEach(keyword => {
        if (input.includes(keyword)) {
          scores[discipline] += 7;
        }
      });
      
      // Distancia (peso 3)
      keywords.distance.forEach(keyword => {
        if (input.includes(keyword)) {
          scores[discipline] += 3;
        }
      });
    });
    
    // Análisis contextual adicional
    analyzeContext(input);
    
    return getBestMatch();
  }
  
  // Análisis contextual
  function analyzeContext(input) {
    // Experiencia
    if (input.includes('principiante') || input.includes('empezando')) {
      scores['road-aero'] += 5;
      scores['gravel-racing'] += 3;
    }
    
    if (input.includes('profesional') || input.includes('competición')) {
      scores['tt-triathlon'] += 5;
      scores['track'] += 5;
    }
    
    // Presupuesto
    if (input.includes('económico') || input.includes('barato')) {
      // Penalizar opciones premium
      scores['tt-triathlon'] -= 3;
    }
    
    if (input.includes('premium') || input.includes('alto rendimiento')) {
      scores['tt-triathlon'] += 5;
      scores['track'] += 5;
    }
    
    // Uso
    if (input.includes('entrenamiento') || input.includes('entrenar')) {
      scores['road-aero'] += 5;
    }
    
    if (input.includes('viaje') || input.includes('aventura')) {
      scores['gravel-racing'] += 8;
    }
  }
  
  // Obtener mejor match
  function getBestMatch() {
    const sorted = Object.entries(scores)
      .sort((a, b) => b[1] - a[1]);
    
    const winner = sorted[0];
    const runnerUp = sorted[1];
    
    // Si el score es muy bajo, pedir más info
    if (winner[1] < 5) {
      return {
        confidence: 'low',
        recommendation: null,
        message: 'Necesito más información. ¿Podrías contarme más sobre el tipo de ciclismo que practicas?'
      };
    }
    
    // Si hay empate técnico
    if (winner[1] - runnerUp[1] < 3) {
      return {
        confidence: 'medium',
        recommendations: [winner[0], runnerUp[0]],
        message: `Veo que podrías estar interesado en ${DISCIPLINES.find(d => d.id === winner[0]).name} o ${DISCIPLINES.find(d => d.id === runnerUp[0]).name}. ¿Cuál te interesa más?`
      };
    }
    
    // Match claro
    return {
      confidence: 'high',
      recommendation: winner[0],
      score: winner[1],
      message: generateRecommendationMessage(winner[0])
    };
  }
  
  // Generar mensaje de recomendación
  function generateRecommendationMessage(disciplineId) {
    const discipline = DISCIPLINES.find(d => d.id === disciplineId);
    const products = PRODUCTS.filter(p => p.discipline === disciplineId);
    
    if (products.length === 0) {
      return `Basándome en lo que me cuentas, ${discipline.name} sería ideal para ti. Actualmente estamos trabajando en nuevos modelos para esta categoría.`;
    }
    
    const featured = products.find(p => p.featured) || products[0];
    
    return `Basándome en lo que me cuentas, te recomendaría nuestra categoría de ${discipline.name}. 
    
Específicamente, la ${featured.name} sería perfecta para ti:
${featured.description.short}

Precio: €${featured.price.toLocaleString()}

¿Te gustaría ver más detalles?`;
  }
  
  // API pública
  return {
    analyze: analyzeInput,
    getScores: () => scores,
    reset: () => {
      scores = {
        'tt-triathlon': 0,
        'road-aero': 0,
        'track': 0,
        'gravel-racing': 0
      };
      conversationHistory = [];
    }
  };
})();
```

---

## 💬 Interfaz de Chat

### HTML Structure

```html
<!-- Bot flotante -->
<div id="bot-container" class="bot-container">
  <!-- Botón flotante -->
  <button id="bot-trigger" class="bot-trigger">
    <svg><!-- Icono chat --></svg>
    <span class="bot-badge">1</span>
  </button>
  
  <!-- Panel de chat -->
  <div id="bot-panel" class="bot-panel">
    <div class="bot-header">
      <h3>Asistente VËKTOR</h3>
      <button id="bot-close">×</button>
    </div>
    
    <div id="bot-messages" class="bot-messages">
      <!-- Mensajes aquí -->
    </div>
    
    <div class="bot-input">
      <input type="text" id="bot-input-field" placeholder="Escribe tu consulta...">
      <button id="bot-send">Enviar</button>
    </div>
  </div>
</div>
```

### JavaScript del Chat

```javascript
const BotUI = (() => {
  let isOpen = false;
  let isTyping = false;
  
  function init() {
    setupEventListeners();
    showWelcomeMessage();
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
    
    if (isOpen) {
      document.getElementById('bot-input-field').focus();
      document.querySelector('.bot-badge').style.display = 'none';
    }
  }
  
  function showWelcomeMessage() {
    setTimeout(() => {
      addMessage('bot', '¡Hola! Soy el asistente de VËKTOR. ¿En qué tipo de ciclismo estás interesado?');
    }, 1000);
  }
  
  function sendMessage() {
    const input = document.getElementById('bot-input-field');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Mostrar mensaje del usuario
    addMessage('user', message);
    input.value = '';
    
    // Simular "escribiendo..."
    showTyping();
    
    // Analizar y responder
    setTimeout(() => {
      const result = BotRecommender.analyze(message);
      hideTyping();
      
      if (result.recommendation) {
        addMessage('bot', result.message);
        showProductCard(result.recommendation);
      } else if (result.recommendations) {
        addMessage('bot', result.message);
        showDisciplineOptions(result.recommendations);
      } else {
        addMessage('bot', result.message);
      }
    }, 1500);
  }
  
  function addMessage(sender, text) {
    const messagesContainer = document.getElementById('bot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `bot-message bot-message--${sender}`;
    messageDiv.innerHTML = `
      <div class="bot-message__content">
        ${text}
      </div>
      <div class="bot-message__time">${new Date().toLocaleTimeString('es-ES', {hour: '2-digit', minute: '2-digit'})}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  function showTyping() {
    const messagesContainer = document.getElementById('bot-messages');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.className = 'bot-message bot-message--bot';
    typingDiv.innerHTML = `
      <div class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  function hideTyping() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
  }
  
  function showProductCard(disciplineId) {
    const products = PRODUCTS.filter(p => p.discipline === disciplineId);
    const featured = products.find(p => p.featured) || products[0];
    
    if (!featured) return;
    
    const messagesContainer = document.getElementById('bot-messages');
    const cardDiv = document.createElement('div');
    cardDiv.className = 'bot-message bot-message--bot';
    cardDiv.innerHTML = `
      <div class="bot-product-card">
        <img src="${featured.images[0]}" alt="${featured.name}">
        <h4>${featured.name}</h4>
        <p>${featured.description.short}</p>
        <div class="bot-product-card__footer">
          <span class="price">€${featured.price.toLocaleString()}</span>
          <a href="#product/${featured.slug}" class="btn btn--small">Ver detalles</a>
        </div>
      </div>
    `;
    
    messagesContainer.appendChild(cardDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  function showDisciplineOptions(disciplineIds) {
    const messagesContainer = document.getElementById('bot-messages');
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'bot-message bot-message--bot';
    optionsDiv.innerHTML = `
      <div class="bot-options">
        ${disciplineIds.map(id => {
          const discipline = DISCIPLINES.find(d => d.id === id);
          return `
            <button class="bot-option" onclick="BotUI.selectDiscipline('${id}')">
              ${discipline.name}
            </button>
          `;
        }).join('')}
      </div>
    `;
    
    messagesContainer.appendChild(optionsDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  function selectDiscipline(disciplineId) {
    const discipline = DISCIPLINES.find(d => d.id === disciplineId);
    addMessage('user', discipline.name);
    
    showTyping();
    setTimeout(() => {
      hideTyping();
      const message = BotRecommender.generateRecommendationMessage(disciplineId);
      addMessage('bot', message);
      showProductCard(disciplineId);
    }, 1000);
  }
  
  return {
    init,
    toggle,
    selectDiscipline
  };
})();
```

---

## 🎨 Estilos del Bot

```css
/* Botón flotante */
.bot-trigger {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--color-accent);
  color: white;
  border: none;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  cursor: pointer;
  transition: transform 0.3s ease;
  z-index: 999;
}

.bot-trigger:hover {
  transform: scale(1.1);
}

.bot-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #F44336;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Panel de chat */
.bot-panel {
  position: fixed;
  bottom: 100px;
  right: 24px;
  width: 380px;
  height: 600px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  transform: scale(0);
  transform-origin: bottom right;
  transition: transform 0.3s ease;
  z-index: 998;
}

.bot-panel.open {
  transform: scale(1);
}

/* Mensajes */
.bot-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.bot-message {
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
}

.bot-message--user {
  align-items: flex-end;
}

.bot-message--bot {
  align-items: flex-start;
}

.bot-message__content {
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 18px;
  line-height: 1.4;
}

.bot-message--user .bot-message__content {
  background: var(--color-accent);
  color: white;
}

.bot-message--bot .bot-message__content {
  background: #F5F5F5;
  color: var(--color-text);
}

/* Typing indicator */
.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 12px 16px;
  background: #F5F5F5;
  border-radius: 18px;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #BDBDBD;
  animation: typing 1.4s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
}
```

---

## 🎯 Flujo de Conversación

```
Usuario: "Busco una bici para triatlón"
  ↓
Bot analiza: keywords = ['triatlón']
  ↓
Score: tt-triathlon = 10
  ↓
Bot: "Te recomiendo nuestra categoría TT/Triatlón"
  ↓
Bot muestra: Tarjeta de producto Aero R1
  ↓
Usuario: "¿Tienen algo más económico?"
  ↓
Bot: "Tenemos la Aero R2 a €6,500"
  ↓
Usuario: "Perfecto, quiero verla"
  ↓
Bot: [Redirige a página de producto]
```

---

## 🎯 Resultado Esperado

Un bot que:

✅ Analiza lenguaje natural  
✅ Identifica disciplina correcta  
✅ Recomienda productos específicos  
✅ Tiene conversación fluida  
✅ Se siente inteligente  
✅ Ayuda a usuarios indecisos
