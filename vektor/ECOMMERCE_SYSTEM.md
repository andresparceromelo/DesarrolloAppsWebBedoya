# VËKTOR - Sistema E-Commerce Completo (Sin Backend)

## 🎯 Objetivo

Crear un sistema de e-commerce completamente funcional usando solo HTML, CSS y JavaScript, con persistencia en LocalStorage.

---

## 📊 Flujo de Datos

```
┌─────────────┐
│  PRODUCTOS  │ (products.js - Array de objetos)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  CATÁLOGO   │ (catalog.js - Filtrado, búsqueda, ordenamiento)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  PRODUCTO   │ (product.js - Detalle, selección, añadir)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   CARRITO   │ (cart.js - CRUD items, cálculos)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  CHECKOUT   │ (checkout.js - Validación, confirmación)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   PEDIDO    │ (orders.js - Guardar, tracking)
└─────────────┘
```

---

## 🗄️ Estructura de Datos

### 1. Base de Datos de Productos

```javascript
// assets/js/data/products.js

const PRODUCTS = [
  {
    id: 'aero-r1',
    name: 'VËKTOR Aero R1',
    slug: 'aero-r1',
    discipline: 'tt-triathlon',
    category: 'complete-bike',
    price: 8900,
    priceOriginal: 9500, // Para mostrar descuento
    inStock: true,
    stockCount: 5,
    featured: true,
    
    // Imágenes
    images: [
      '/assets/images/products/aero-r1/main.jpg',
      '/assets/images/products/aero-r1/side.jpg',
      '/assets/images/products/aero-r1/detail-1.jpg',
      '/assets/images/products/aero-r1/detail-2.jpg'
    ],
    
    // Descripción
    description: {
      short: 'Bicicleta de contrarreloj con aerodinámica optimizada en túnel de viento',
      long: 'La Aero R1 representa...',
      features: [
        'Cuadro monocasco T1000',
        'Geometría UCI legal',
        'CdA 0.185 @ 45 km/h',
        'Peso 7.2kg (talla 54cm)'
      ]
    },
    
    // Especificaciones técnicas
    specs: {
      frame: 'Carbono T1000 monocasco',
      fork: 'Carbono integrado',
      groupset: 'Shimano Dura-Ace Di2 12v',
      wheels: 'Carbono 80mm front / 90mm rear',
      weight: '7.2kg',
      sizes: ['48cm', '51cm', '54cm', '56cm', '58cm']
    },
    
    // Opciones de personalización
    options: {
      sizes: [
        { value: '48cm', label: '48cm (XS)', inStock: true },
        { value: '51cm', label: '51cm (S)', inStock: true },
        { value: '54cm', label: '54cm (M)', inStock: true },
        { value: '56cm', label: '56cm (L)', inStock: false },
        { value: '58cm', label: '58cm (XL)', inStock: true }
      ],
      colors: [
        { value: 'matte-black', label: 'Matte Black', hex: '#1a1a1a', inStock: true },
        { value: 'stealth-grey', label: 'Stealth Grey', hex: '#4a4a4a', inStock: true },
        { value: 'carbon-raw', label: 'Carbon Raw', hex: '#2d2d2d', inStock: false }
      ]
    },
    
    // Metadata
    tags: ['aerodynamic', 'triathlon', 'time-trial', 'carbon'],
    createdAt: '2026-01-15',
    updatedAt: '2026-02-10'
  },
  
  // ... más productos
];
```

### 2. Categorías/Disciplinas

```javascript
// assets/js/data/disciplines.js

const DISCIPLINES = [
  {
    id: 'tt-triathlon',
    name: 'TT / Triatlón',
    slug: 'tt-triathlon',
    description: 'Máxima aerodinámica para contrarreloj y triatlón',
    image: '/assets/images/disciplines/tt.jpg',
    icon: '/assets/images/icons/tt.svg',
    color: '#D32F2F',
    features: ['Aerodinámica extrema', 'Geometría agresiva', 'Integración total']
  },
  {
    id: 'road-aero',
    name: 'Ruta Aero',
    slug: 'road-aero',
    description: 'Velocidad y eficiencia para ciclismo de ruta',
    image: '/assets/images/disciplines/road.jpg',
    icon: '/assets/images/icons/road.svg',
    color: '#1976D2',
    features: ['Balance aero/peso', 'Versatilidad', 'Confort en largas distancias']
  },
  {
    id: 'track',
    name: 'Pista',
    slug: 'track',
    description: 'Rigidez y respuesta para velódromo',
    image: '/assets/images/disciplines/track.jpg',
    icon: '/assets/images/icons/track.svg',
    color: '#388E3C',
    features: ['Rigidez máxima', 'Aceleración explosiva', 'Geometría específica']
  },
  {
    id: 'gravel-racing',
    name: 'Gravel Racing',
    slug: 'gravel-racing',
    description: 'Rendimiento en terrenos mixtos',
    image: '/assets/images/disciplines/gravel.jpg',
    icon: '/assets/images/icons/gravel.svg',
    color: '#F57C00',
    features: ['Versatilidad extrema', 'Clearance amplio', 'Geometría estable']
  }
];
```

### 3. Estado del Carrito

```javascript
// Estructura en LocalStorage: 'vektor_cart'
{
  items: [
    {
      productId: 'aero-r1',
      name: 'VËKTOR Aero R1',
      size: '54cm',
      color: 'matte-black',
      quantity: 1,
      price: 8900,
      image: '/assets/images/products/aero-r1/main.jpg',
      addedAt: '2026-02-13T10:30:00'
    }
  ],
  subtotal: 8900,
  tax: 1513, // 17% (ejemplo)
  shipping: 0, // Gratis
  total: 10413,
  itemCount: 1,
  lastUpdated: '2026-02-13T10:30:00'
}
```

---

## 🔧 Módulos JavaScript

### 1. Catálogo (catalog.js)

```javascript
const Catalog = (() => {
  let currentFilters = {
    discipline: 'all',
    priceRange: [0, 20000],
    inStock: false,
    sortBy: 'featured' // featured, price-asc, price-desc, name
  };
  
  let filteredProducts = [];
  
  // Inicialización
  function init() {
    loadProducts();
    setupFilters();
    setupSearch();
    render();
  }
  
  // Cargar productos
  function loadProducts() {
    filteredProducts = [...PRODUCTS];
    applyFilters();
  }
  
  // Aplicar filtros
  function applyFilters() {
    filteredProducts = PRODUCTS.filter(product => {
      // Filtro por disciplina
      if (currentFilters.discipline !== 'all' && 
          product.discipline !== currentFilters.discipline) {
        return false;
      }
      
      // Filtro por precio
      if (product.price < currentFilters.priceRange[0] || 
          product.price > currentFilters.priceRange[1]) {
        return false;
      }
      
      // Filtro por stock
      if (currentFilters.inStock && !product.inStock) {
        return false;
      }
      
      return true;
    });
    
    // Aplicar ordenamiento
    sortProducts();
  }
  
  // Ordenar productos
  function sortProducts() {
    switch(currentFilters.sortBy) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        filteredProducts.sort((a, b) => b.featured - a.featured);
    }
  }
  
  // Búsqueda
  function search(query) {
    if (!query) {
      loadProducts();
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    filteredProducts = PRODUCTS.filter(product => {
      return product.name.toLowerCase().includes(lowerQuery) ||
             product.description.short.toLowerCase().includes(lowerQuery) ||
             product.tags.some(tag => tag.includes(lowerQuery));
    });
    
    render();
  }
  
  // Renderizar grid
  function render() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
      grid.innerHTML = '<p class="no-results">No se encontraron productos</p>';
      return;
    }
    
    filteredProducts.forEach(product => {
      const card = createProductCard(product);
      grid.appendChild(card);
    });
    
    updateResultCount();
  }
  
  // Crear tarjeta de producto
  function createProductCard(product) {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <a href="#product/${product.slug}" class="product-card__link">
        <div class="product-card__image">
          <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
          ${!product.inStock ? '<span class="badge badge--out-of-stock">Agotado</span>' : ''}
          ${product.featured ? '<span class="badge badge--featured">Destacado</span>' : ''}
        </div>
        <div class="product-card__content">
          <h3 class="product-card__title">${product.name}</h3>
          <p class="product-card__description">${product.description.short}</p>
          <div class="product-card__footer">
            <div class="product-card__price">
              ${product.priceOriginal ? 
                `<span class="price--original">€${product.priceOriginal.toLocaleString()}</span>` : ''}
              <span class="price--current">€${product.price.toLocaleString()}</span>
            </div>
            <span class="product-card__cta">Ver detalles →</span>
          </div>
        </div>
      </a>
    `;
    
    return card;
  }
  
  // API pública
  return {
    init,
    setFilter: (key, value) => {
      currentFilters[key] = value;
      applyFilters();
      render();
    },
    search,
    getProducts: () => filteredProducts
  };
})();
```

### 2. Página de Producto (product.js)

```javascript
const ProductPage = (() => {
  let currentProduct = null;
  let selectedOptions = {
    size: null,
    color: null,
    quantity: 1
  };
  
  function init(productSlug) {
    currentProduct = PRODUCTS.find(p => p.slug === productSlug);
    
    if (!currentProduct) {
      show404();
      return;
    }
    
    render();
    setupGallery();
    setupOptions();
    setupAddToCart();
  }
  
  function render() {
    const container = document.getElementById('product-detail');
    container.innerHTML = `
      <div class="product-detail">
        <div class="product-detail__gallery">
          <!-- Galería de imágenes -->
        </div>
        
        <div class="product-detail__info">
          <h1>${currentProduct.name}</h1>
          <p class="product-detail__price">€${currentProduct.price.toLocaleString()}</p>
          <p class="product-detail__description">${currentProduct.description.long}</p>
          
          <!-- Selector de talla -->
          <div class="product-options">
            <label>Talla</label>
            <div class="size-selector">
              ${currentProduct.options.sizes.map(size => `
                <button class="size-option ${!size.inStock ? 'disabled' : ''}" 
                        data-size="${size.value}"
                        ${!size.inStock ? 'disabled' : ''}>
                  ${size.label}
                </button>
              `).join('')}
            </div>
          </div>
          
          <!-- Selector de color -->
          <div class="product-options">
            <label>Color</label>
            <div class="color-selector">
              ${currentProduct.options.colors.map(color => `
                <button class="color-option ${!color.inStock ? 'disabled' : ''}" 
                        data-color="${color.value}"
                        style="background-color: ${color.hex}"
                        title="${color.label}"
                        ${!color.inStock ? 'disabled' : ''}>
                </button>
              `).join('')}
            </div>
          </div>
          
          <!-- Cantidad -->
          <div class="product-options">
            <label>Cantidad</label>
            <div class="quantity-selector">
              <button class="qty-btn" data-action="decrease">-</button>
              <input type="number" value="1" min="1" max="10" id="quantity">
              <button class="qty-btn" data-action="increase">+</button>
            </div>
          </div>
          
          <!-- Botón añadir al carrito -->
          <button class="btn btn--primary btn--large" id="add-to-cart" disabled>
            Añadir al carrito
          </button>
          
          <!-- Especificaciones técnicas -->
          <div class="product-specs">
            <h3>Especificaciones</h3>
            <dl>
              ${Object.entries(currentProduct.specs).map(([key, value]) => `
                <dt>${key}</dt>
                <dd>${value}</dd>
              `).join('')}
            </dl>
          </div>
        </div>
      </div>
    `;
  }
  
  function setupOptions() {
    // Selección de talla
    document.querySelectorAll('.size-option').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.size-option').forEach(b => b.classList.remove('selected'));
        e.target.classList.add('selected');
        selectedOptions.size = e.target.dataset.size;
        validateSelection();
      });
    });
    
    // Selección de color
    document.querySelectorAll('.color-option').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.color-option').forEach(b => b.classList.remove('selected'));
        e.target.classList.add('selected');
        selectedOptions.color = e.target.dataset.color;
        validateSelection();
      });
    });
    
    // Cantidad
    document.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        const input = document.getElementById('quantity');
        let value = parseInt(input.value);
        
        if (action === 'increase' && value < 10) {
          value++;
        } else if (action === 'decrease' && value > 1) {
          value--;
        }
        
        input.value = value;
        selectedOptions.quantity = value;
      });
    });
  }
  
  function validateSelection() {
    const addBtn = document.getElementById('add-to-cart');
    
    if (selectedOptions.size && selectedOptions.color) {
      addBtn.disabled = false;
    } else {
      addBtn.disabled = true;
    }
  }
  
  function setupAddToCart() {
    document.getElementById('add-to-cart').addEventListener('click', () => {
      const item = {
        productId: currentProduct.id,
        name: currentProduct.name,
        size: selectedOptions.size,
        color: selectedOptions.color,
        quantity: selectedOptions.quantity,
        price: currentProduct.price,
        image: currentProduct.images[0],
        addedAt: new Date().toISOString()
      };
      
      Cart.addItem(item);
      Toast.show('Producto añadido al carrito', 'success');
    });
  }
  
  return { init };
})();
```

### 3. Carrito (cart.js)

```javascript
const Cart = (() => {
  let cart = {
    items: [],
    subtotal: 0,
    tax: 0,
    shipping: 0,
    total: 0,
    itemCount: 0
  };
  
  const TAX_RATE = 0.17; // 17%
  const FREE_SHIPPING_THRESHOLD = 5000;
  const SHIPPING_COST = 50;
  
  function init() {
    loadFromStorage();
    render();
    setupEventListeners();
  }
  
  function loadFromStorage() {
    const saved = Storage.get('vektor_cart');
    if (saved) {
      cart = saved;
    }
  }
  
  function saveToStorage() {
    Storage.set('vektor_cart', cart);
    EventBus.emit('cartUpdated', cart);
  }
  
  function addItem(item) {
    // Verificar si ya existe
    const existing = cart.items.find(i => 
      i.productId === item.productId && 
      i.size === item.size && 
      i.color === item.color
    );
    
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      cart.items.push(item);
    }
    
    calculateTotals();
    saveToStorage();
    render();
  }
  
  function removeItem(index) {
    cart.items.splice(index, 1);
    calculateTotals();
    saveToStorage();
    render();
  }
  
  function updateQuantity(index, newQuantity) {
    if (newQuantity < 1) {
      removeItem(index);
      return;
    }
    
    cart.items[index].quantity = newQuantity;
    calculateTotals();
    saveToStorage();
    render();
  }
  
  function calculateTotals() {
    cart.subtotal = cart.items.reduce((sum, item) => 
      sum + (item.price * item.quantity), 0
    );
    
    cart.tax = Math.round(cart.subtotal * TAX_RATE);
    
    cart.shipping = cart.subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    
    cart.total = cart.subtotal + cart.tax + cart.shipping;
    
    cart.itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }
  
  function clear() {
    cart = {
      items: [],
      subtotal: 0,
      tax: 0,
      shipping: 0,
      total: 0,
      itemCount: 0
    };
    saveToStorage();
    render();
  }
  
  function render() {
    updateBadge();
    renderCartPanel();
  }
  
  function updateBadge() {
    const badge = document.getElementById('cart-badge');
    if (badge) {
      badge.textContent = cart.itemCount;
      badge.style.display = cart.itemCount > 0 ? 'block' : 'none';
    }
  }
  
  function renderCartPanel() {
    const panel = document.getElementById('cart-panel');
    if (!panel) return;
    
    if (cart.items.length === 0) {
      panel.innerHTML = '<p class="cart-empty">Tu carrito está vacío</p>';
      return;
    }
    
    panel.innerHTML = `
      <div class="cart-items">
        ${cart.items.map((item, index) => `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item__info">
              <h4>${item.name}</h4>
              <p>Talla: ${item.size} | Color: ${item.color}</p>
              <div class="cart-item__quantity">
                <button onclick="Cart.updateQuantity(${index}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button onclick="Cart.updateQuantity(${index}, ${item.quantity + 1})">+</button>
              </div>
            </div>
            <div class="cart-item__price">
              <p>€${(item.price * item.quantity).toLocaleString()}</p>
              <button onclick="Cart.removeItem(${index})" class="btn-remove">×</button>
            </div>
          </div>
        `).join('')}
      </div>
      
      <div class="cart-summary">
        <div class="cart-summary__line">
          <span>Subtotal</span>
          <span>€${cart.subtotal.toLocaleString()}</span>
        </div>
        <div class="cart-summary__line">
          <span>IVA (17%)</span>
          <span>€${cart.tax.toLocaleString()}</span>
        </div>
        <div class="cart-summary__line">
          <span>Envío</span>
          <span>${cart.shipping === 0 ? 'Gratis' : '€' + cart.shipping}</span>
        </div>
        <div class="cart-summary__total">
          <span>Total</span>
          <span>€${cart.total.toLocaleString()}</span>
        </div>
      </div>
      
      <div class="cart-actions">
        <button class="btn btn--secondary" onclick="Cart.toggle()">Seguir comprando</button>
        <a href="#checkout" class="btn btn--primary">Finalizar compra</a>
      </div>
    `;
  }
  
  function toggle() {
    const panel = document.getElementById('cart-panel');
    panel.classList.toggle('open');
  }
  
  // API pública
  return {
    init,
    addItem,
    removeItem,
    updateQuantity,
    clear,
    toggle,
    getCart: () => cart
  };
})();
```

---

## 🎨 Componentes UI

### Tarjeta de Producto

```css
.product-card {
  background: white;
  border: 1px solid var(--color-border);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

.product-card__image {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4/3;
}

.product-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-card__image img {
  transform: scale(1.05);
}
```

### Panel de Carrito

```css
#cart-panel {
  position: fixed;
  top: 0;
  right: -400px;
  width: 400px;
  height: 100vh;
  background: white;
  box-shadow: -4px 0 24px rgba(0,0,0,0.1);
  transition: right 0.3s ease;
  z-index: 1000;
}

#cart-panel.open {
  right: 0;
}
```

---

## ✅ Estados a Guardar en LocalStorage

1. **vektor_cart** - Carrito actual
2. **vektor_user** - Usuario logueado
3. **vektor_orders** - Historial de pedidos
4. **vektor_wishlist** - Lista de deseos (opcional)
5. **vektor_recently_viewed** - Productos vistos recientemente

---

## 🔄 Persistencia y Sincronización

```javascript
// storage.js
const Storage = {
  get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Error reading from storage:', e);
      return null;
    }
  },
  
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Error writing to storage:', e);
      return false;
    }
  },
  
  remove(key) {
    localStorage.removeItem(key);
  },
  
  clear() {
    localStorage.clear();
  }
};
```

---

## 🎯 Resultado Esperado

Un sistema e-commerce que:

✅ Permite navegar catálogo con filtros  
✅ Muestra detalles de producto  
✅ Permite seleccionar opciones (talla, color)  
✅ Añade productos al carrito  
✅ Persiste carrito en LocalStorage  
✅ Calcula totales dinámicamente  
✅ Simula proceso de checkout  
✅ Se siente como tienda real
