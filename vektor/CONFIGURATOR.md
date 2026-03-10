# VËKTOR - Configurador "Arma Tu Bici"

## 🎯 Objetivo

Crear un configurador interactivo paso a paso que permita al usuario construir su bicicleta personalizada con actualización de precio en tiempo real.

---

## 🔧 Flujo del Configurador

```
PASO 1: Disciplina
  ↓
PASO 2: Cuadro
  ↓
PASO 3: Grupo de Transmisión
  ↓
PASO 4: Ruedas
  ↓
PASO 5: Componentes Adicionales (opcional)
  ↓
RESUMEN: Vista previa + Precio total
  ↓
ACCIONES: Guardar / Añadir al carrito / Compartir
```

---

## 📊 Estructura de Datos

### Componentes Disponibles

```javascript
// assets/js/data/components.js

const COMPONENTS = {
  frames: [
    {
      id: 'frame-aero-r1',
      name: 'Aero R1 Frame',
      discipline: 'tt-triathlon',
      material: 'Carbon T1000 Monocoque',
      weight: 950, // gramos
      price: 3500,
      sizes: ['48cm', '51cm', '54cm', '56cm', '58cm'],
      colors: ['matte-black', 'stealth-grey', 'carbon-raw'],
      image: '/assets/images/components/frames/aero-r1.png',
      specs: {
        headTube: '1-1/8" to 1-1/2"',
        bb: 'BB86',
        seatpost: '27.2mm',
        maxTireWidth: '28mm'
      }
    },
    // ... más cuadros
  ],
  
  groupsets: [
    {
      id: 'groupset-dura-ace-di2',
      name: 'Shimano Dura-Ace Di2 12v',
      brand: 'Shimano',
      type: 'electronic',
      speeds: 12,
      price: 2800,
      weight: 2450,
      compatibility: ['road', 'tt'],
      image: '/assets/images/components/groupsets/dura-ace-di2.png',
      includes: [
        'Shifters',
        'Front derailleur',
        'Rear derailleur',
        'Crankset 52/36',
        'Cassette 11-30',
        'Chain',
        'Brakes'
      ]
    },
    {
      id: 'groupset-ultegra-di2',
      name: 'Shimano Ultegra Di2 12v',
      brand: 'Shimano',
      type: 'electronic',
      speeds: 12,
      price: 1900,
      weight: 2580,
      compatibility: ['road', 'tt', 'gravel'],
      image: '/assets/images/components/groupsets/ultegra-di2.png'
    },
    {
      id: 'groupset-force-axs',
      name: 'SRAM Force eTap AXS',
      brand: 'SRAM',
      type: 'electronic',
      speeds: 12,
      price: 2200,
      weight: 2520,
      compatibility: ['road', 'gravel'],
      image: '/assets/images/components/groupsets/force-axs.png'
    }
  ],
  
  wheels: [
    {
      id: 'wheels-carbon-50mm',
      name: 'Carbon Aero 50mm',
      type: 'carbon-clincher',
      depth: 50,
      price: 1800,
      weight: 1450,
      compatibility: ['road', 'tt'],
      image: '/assets/images/components/wheels/carbon-50mm.png',
      specs: {
        rimWidth: '25mm internal',
        hub: 'Ceramic bearings',
        spokes: 'Bladed aero',
        maxTirePressure: '120 PSI'
      }
    },
    {
      id: 'wheels-carbon-80mm',
      name: 'Carbon Aero 80mm',
      type: 'carbon-clincher',
      depth: 80,
      price: 2200,
      weight: 1580,
      compatibility: ['tt'],
      image: '/assets/images/components/wheels/carbon-80mm.png'
    },
    {
      id: 'wheels-alloy-training',
      name: 'Alloy Training Wheels',
      type: 'alloy-clincher',
      depth: 30,
      price: 450,
      weight: 1750,
      compatibility: ['road', 'gravel'],
      image: '/assets/images/components/wheels/alloy-training.png'
    }
  ],
  
  extras: [
    {
      id: 'handlebar-integrated',
      name: 'Integrated Aero Handlebar',
      category: 'cockpit',
      price: 650,
      weight: 380,
      sizes: ['38cm', '40cm', '42cm', '44cm']
    },
    {
      id: 'saddle-performance',
      name: 'Performance Saddle',
      category: 'saddle',
      price: 180,
      weight: 145
    },
    {
      id: 'pedals-carbon',
      name: 'Carbon Pedals',
      category: 'pedals',
      price: 220,
      weight: 210
    },
    {
      id: 'bottle-cages',
      name: 'Carbon Bottle Cages (2x)',
      category: 'accessories',
      price: 80,
      weight: 40
    }
  ]
};
```

---

## 🎨 Módulo del Configurador

```javascript
// assets/js/modules/configurator.js

const Configurator = (() => {
  let currentStep = 1;
  const totalSteps = 5;
  
  let configuration = {
    discipline: null,
    frame: null,
    groupset: null,
    wheels: null,
    extras: [],
    totalPrice: 0,
    totalWeight: 0,
    name: '',
    createdAt: null
  };
  
  // Inicialización
  function init() {
    loadStep(1);
    setupNavigation();
    updateProgress();
  }
  
  // Cargar paso
  function loadStep(step) {
    currentStep = step;
    
    switch(step) {
      case 1:
        renderDisciplineSelection();
        break;
      case 2:
        renderFrameSelection();
        break;
      case 3:
        renderGroupsetSelection();
        break;
      case 4:
        renderWheelsSelection();
        break;
      case 5:
        renderExtrasSelection();
        break;
      case 6:
        renderSummary();
        break;
    }
    
    updateProgress();
    updatePriceBar();
  }
  
  // PASO 1: Selección de disciplina
  function renderDisciplineSelection() {
    const container = document.getElementById('configurator-content');
    container.innerHTML = `
      <div class="configurator-step">
        <h2>Paso 1: Elige tu disciplina</h2>
        <p class="step-description">Selecciona el tipo de ciclismo que practicas</p>
        
        <div class="discipline-grid">
          ${DISCIPLINES.map(discipline => `
            <div class="discipline-card" data-discipline="${discipline.id}">
              <img src="${discipline.image}" alt="${discipline.name}">
              <h3>${discipline.name}</h3>
              <p>${discipline.description}</p>
              <ul class="discipline-features">
                ${discipline.features.map(f => `<li>${f}</li>`).join('')}
              </ul>
              <button class="btn btn--secondary" onclick="Configurator.selectDiscipline('${discipline.id}')">
                Seleccionar
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  // PASO 2: Selección de cuadro
  function renderFrameSelection() {
    const availableFrames = COMPONENTS.frames.filter(f => 
      f.discipline === configuration.discipline
    );
    
    const container = document.getElementById('configurator-content');
    container.innerHTML = `
      <div class="configurator-step">
        <h2>Paso 2: Elige tu cuadro</h2>
        <p class="step-description">Selecciona el cuadro base de tu bicicleta</p>
        
        <div class="component-grid">
          ${availableFrames.map(frame => `
            <div class="component-card ${configuration.frame?.id === frame.id ? 'selected' : ''}" 
                 data-component="${frame.id}">
              <img src="${frame.image}" alt="${frame.name}">
              <h3>${frame.name}</h3>
              <div class="component-specs">
                <span class="spec">
                  <strong>Material:</strong> ${frame.material}
                </span>
                <span class="spec">
                  <strong>Peso:</strong> ${frame.weight}g
                </span>
              </div>
              
              <!-- Selector de talla -->
              <div class="size-selector">
                <label>Talla:</label>
                <select id="frame-size-${frame.id}">
                  ${frame.sizes.map(size => `
                    <option value="${size}">${size}</option>
                  `).join('')}
                </select>
              </div>
              
              <!-- Selector de color -->
              <div class="color-selector">
                <label>Color:</label>
                <div class="color-options">
                  ${frame.colors.map(color => `
                    <button class="color-option" 
                            data-color="${color}"
                            style="background-color: var(--color-${color})"
                            title="${color}">
                    </button>
                  `).join('')}
                </div>
              </div>
              
              <div class="component-footer">
                <span class="price">€${frame.price.toLocaleString()}</span>
                <button class="btn btn--primary" 
                        onclick="Configurator.selectFrame('${frame.id}')">
                  ${configuration.frame?.id === frame.id ? 'Seleccionado' : 'Seleccionar'}
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  // PASO 3: Selección de grupo
  function renderGroupsetSelection() {
    const availableGroupsets = COMPONENTS.groupsets.filter(g => 
      g.compatibility.includes(configuration.discipline)
    );
    
    const container = document.getElementById('configurator-content');
    container.innerHTML = `
      <div class="configurator-step">
        <h2>Paso 3: Elige tu grupo de transmisión</h2>
        
        <div class="component-grid">
          ${availableGroupsets.map(groupset => `
            <div class="component-card ${configuration.groupset?.id === groupset.id ? 'selected' : ''}">
              <img src="${groupset.image}" alt="${groupset.name}">
              <h3>${groupset.name}</h3>
              <div class="component-specs">
                <span class="spec"><strong>Marca:</strong> ${groupset.brand}</span>
                <span class="spec"><strong>Tipo:</strong> ${groupset.type}</span>
                <span class="spec"><strong>Velocidades:</strong> ${groupset.speeds}v</span>
                <span class="spec"><strong>Peso:</strong> ${groupset.weight}g</span>
              </div>
              
              <div class="component-includes">
                <strong>Incluye:</strong>
                <ul>
                  ${groupset.includes.map(item => `<li>${item}</li>`).join('')}
                </ul>
              </div>
              
              <div class="component-footer">
                <span class="price">€${groupset.price.toLocaleString()}</span>
                <button class="btn btn--primary" 
                        onclick="Configurator.selectGroupset('${groupset.id}')">
                  Seleccionar
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  // PASO 4: Selección de ruedas
  function renderWheelsSelection() {
    const availableWheels = COMPONENTS.wheels.filter(w => 
      w.compatibility.includes(configuration.discipline)
    );
    
    // Similar a renderGroupsetSelection
  }
  
  // PASO 5: Componentes adicionales
  function renderExtrasSelection() {
    const container = document.getElementById('configurator-content');
    container.innerHTML = `
      <div class="configurator-step">
        <h2>Paso 5: Componentes adicionales (opcional)</h2>
        <p class="step-description">Personaliza tu bicicleta con componentes premium</p>
        
        <div class="extras-grid">
          ${COMPONENTS.extras.map(extra => `
            <div class="extra-card">
              <input type="checkbox" 
                     id="extra-${extra.id}" 
                     value="${extra.id}"
                     ${configuration.extras.includes(extra.id) ? 'checked' : ''}
                     onchange="Configurator.toggleExtra('${extra.id}')">
              <label for="extra-${extra.id}">
                <h4>${extra.name}</h4>
                <span class="extra-price">+€${extra.price}</span>
                <span class="extra-weight">${extra.weight}g</span>
              </label>
            </div>
          `).join('')}
        </div>
        
        <button class="btn btn--primary btn--large" onclick="Configurator.nextStep()">
          Ver resumen
        </button>
      </div>
    `;
  }
  
  // PASO 6: Resumen
  function renderSummary() {
    calculateTotals();
    
    const container = document.getElementById('configurator-content');
    container.innerHTML = `
      <div class="configurator-summary">
        <h2>Resumen de tu configuración</h2>
        
        <!-- Vista previa visual -->
        <div class="bike-preview">
          <img src="${generateBikePreview()}" alt="Tu bicicleta">
        </div>
        
        <!-- Lista de componentes -->
        <div class="summary-components">
          <h3>Componentes seleccionados</h3>
          
          <div class="summary-item">
            <span class="summary-label">Cuadro</span>
            <span class="summary-value">${configuration.frame.name}</span>
            <span class="summary-price">€${configuration.frame.price.toLocaleString()}</span>
          </div>
          
          <div class="summary-item">
            <span class="summary-label">Grupo</span>
            <span class="summary-value">${configuration.groupset.name}</span>
            <span class="summary-price">€${configuration.groupset.price.toLocaleString()}</span>
          </div>
          
          <div class="summary-item">
            <span class="summary-label">Ruedas</span>
            <span class="summary-value">${configuration.wheels.name}</span>
            <span class="summary-price">€${configuration.wheels.price.toLocaleString()}</span>
          </div>
          
          ${configuration.extras.map(extraId => {
            const extra = COMPONENTS.extras.find(e => e.id === extraId);
            return `
              <div class="summary-item">
                <span class="summary-label">${extra.category}</span>
                <span class="summary-value">${extra.name}</span>
                <span class="summary-price">€${extra.price.toLocaleString()}</span>
              </div>
            `;
          }).join('')}
          
          <div class="summary-total">
            <span class="summary-label">Peso total</span>
            <span class="summary-value">${(configuration.totalWeight / 1000).toFixed(2)} kg</span>
          </div>
          
          <div class="summary-total">
            <span class="summary-label">Precio total</span>
            <span class="summary-price">€${configuration.totalPrice.toLocaleString()}</span>
          </div>
        </div>
        
        <!-- Acciones -->
        <div class="summary-actions">
          <input type="text" 
                 id="config-name" 
                 placeholder="Nombre de tu configuración (opcional)"
                 value="${configuration.name}">
          
          <div class="action-buttons">
            <button class="btn btn--secondary" onclick="Configurator.saveConfiguration()">
              Guardar configuración
            </button>
            <button class="btn btn--primary" onclick="Configurator.addToCart()">
              Añadir al carrito
            </button>
            <button class="btn btn--outline" onclick="Configurator.share()">
              Compartir
            </button>
          </div>
        </div>
      </div>
    `;
  }
  
  // Calcular totales
  function calculateTotals() {
    configuration.totalPrice = 0;
    configuration.totalWeight = 0;
    
    if (configuration.frame) {
      configuration.totalPrice += configuration.frame.price;
      configuration.totalWeight += configuration.frame.weight;
    }
    
    if (configuration.groupset) {
      configuration.totalPrice += configuration.groupset.price;
      configuration.totalWeight += configuration.groupset.weight;
    }
    
    if (configuration.wheels) {
      configuration.totalPrice += configuration.wheels.price;
      configuration.totalWeight += configuration.wheels.weight;
    }
    
    configuration.extras.forEach(extraId => {
      const extra = COMPONENTS.extras.find(e => e.id === extraId);
      configuration.totalPrice += extra.price;
      configuration.totalWeight += extra.weight;
    });
  }
  
  // Guardar configuración
  function saveConfiguration() {
    configuration.name = document.getElementById('config-name').value || 
                         `Mi ${DISCIPLINES.find(d => d.id === configuration.discipline).name}`;
    configuration.createdAt = new Date().toISOString();
    
    const saved = Storage.get('vektor_saved_configs') || [];
    saved.push({...configuration, id: generateId()});
    Storage.set('vektor_saved_configs', saved);
    
    Toast.show('Configuración guardada', 'success');
  }
  
  // Añadir al carrito
  function addToCart() {
    const item = {
      productId: 'custom-build',
      name: configuration.name || 'Bicicleta personalizada',
      type: 'custom',
      configuration: {...configuration},
      price: configuration.totalPrice,
      quantity: 1,
      image: generateBikePreview(),
      addedAt: new Date().toISOString()
    };
    
    Cart.addItem(item);
    Toast.show('Configuración añadida al carrito', 'success');
    
    // Redirigir al carrito
    setTimeout(() => {
      window.location.hash = '#cart';
    }, 1500);
  }
  
  // Compartir configuración
  function share() {
    const url = `${window.location.origin}#configurator?config=${encodeConfiguration()}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Mi configuración VËKTOR',
        text: `Mira mi bicicleta personalizada: ${configuration.name}`,
        url: url
      });
    } else {
      navigator.clipboard.writeText(url);
      Toast.show('Link copiado al portapapeles', 'success');
    }
  }
  
  // Navegación
  function nextStep() {
    if (currentStep < totalSteps) {
      loadStep(currentStep + 1);
    }
  }
  
  function prevStep() {
    if (currentStep > 1) {
      loadStep(currentStep - 1);
    }
  }
  
  // Actualizar barra de progreso
  function updateProgress() {
    const progress = (currentStep / totalSteps) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
    document.getElementById('step-indicator').textContent = `Paso ${currentStep} de ${totalSteps}`;
  }
  
  // Actualizar barra de precio
  function updatePriceBar() {
    calculateTotals();
    document.getElementById('current-price').textContent = `€${configuration.totalPrice.toLocaleString()}`;
    document.getElementById('current-weight').textContent = `${(configuration.totalWeight / 1000).toFixed(2)} kg`;
  }
  
  // API pública
  return {
    init,
    selectDiscipline: (id) => {
      configuration.discipline = id;
      nextStep();
    },
    selectFrame: (id) => {
      const frame = COMPONENTS.frames.find(f => f.id === id);
      const size = document.getElementById(`frame-size-${id}`).value;
      const color = document.querySelector(`[data-component="${id}"] .color-option.selected`)?.dataset.color;
      
      configuration.frame = {...frame, selectedSize: size, selectedColor: color};
      updatePriceBar();
    },
    selectGroupset: (id) => {
      configuration.groupset = COMPONENTS.groupsets.find(g => g.id === id);
      updatePriceBar();
      nextStep();
    },
    selectWheels: (id) => {
      configuration.wheels = COMPONENTS.wheels.find(w => w.id === id);
      updatePriceBar();
      nextStep();
    },
    toggleExtra: (id) => {
      const index = configuration.extras.indexOf(id);
      if (index > -1) {
        configuration.extras.splice(index, 1);
      } else {
        configuration.extras.push(id);
      }
      updatePriceBar();
    },
    nextStep,
    prevStep,
    saveConfiguration,
    addToCart,
    share
  };
})();
```

---

## 🎨 Interfaz del Configurador

### HTML Structure

```html
<div id="configurator-container">
  <!-- Header del configurador -->
  <div class="configurator-header">
    <h1>Configurador VËKTOR</h1>
    <div class="progress-bar">
      <div id="progress-bar" class="progress-fill"></div>
    </div>
    <p id="step-indicator">Paso 1 de 5</p>
  </div>
  
  <!-- Contenido dinámico -->
  <div id="configurator-content">
    <!-- Pasos se renderizan aquí -->
  </div>
  
  <!-- Barra lateral de precio -->
  <div class="price-sidebar">
    <h3>Tu configuración</h3>
    <div class="price-info">
      <div class="price-line">
        <span>Precio actual</span>
        <span id="current-price">€0</span>
      </div>
      <div class="price-line">
        <span>Peso estimado</span>
        <span id="current-weight">0 kg</span>
      </div>
    </div>
    
    <div class="configurator-nav">
      <button class="btn btn--secondary" onclick="Configurator.prevStep()">
        ← Anterior
      </button>
      <button class="btn btn--primary" onclick="Configurator.nextStep()">
        Siguiente →
      </button>
    </div>
  </div>
</div>
```

---

## 🎯 Resultado Esperado

Un configurador que:

✅ Guía paso a paso  
✅ Actualiza precio en tiempo real  
✅ Muestra vista previa visual  
✅ Permite guardar configuraciones  
✅ Añade al carrito  
✅ Comparte configuración  
✅ Se siente profesional y fluido
