# VËKTOR - Guía de Imágenes Template

Este documento lista todas las imágenes profesionales de Unsplash utilizadas en el sitio VËKTOR.

## 🏠 Página Principal (index.html)

### Hero Section
- **URL**: `https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=1600&q=90`
- **Descripción**: Bicicleta de competición profesional en estudio
- **Uso**: Imagen principal hero

### Componentes
1. **Cuadro de Carbono**
   - **URL**: `https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800&q=90&fit=crop`
   - **Descripción**: Detalle de cuadro monocasco

2. **Ruedas**
   - **URL**: `https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=800&q=90&fit=crop`
   - **Descripción**: Rueda de carbono con radios aerodinámicos

3. **Cockpit**
   - **URL**: `https://images.unsplash.com/photo-1559564484-e48bb9c1aa2f?w=800&q=90&fit=crop`
   - **Descripción**: Manillar integrado con cableado interno

---

## 🚴 Página de Productos (productos.html)

### Bicicletas Completas

1. **VËKTOR Aero R1** (TT/Triatlón)
   - **URL**: `https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800&q=90&fit=crop`
   - **Badge**: "Destacado"

2. **VËKTOR Climb C1** (Escalada)
   - **URL**: `https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=800&q=90&fit=crop`
   - **Badge**: "Nuevo"

3. **VËKTOR Endurance E1** (Gravel/Endurance)
   - **URL**: `https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&q=90&fit=crop`

### Componentes

1. **Ruedas de Carbono**
   - **URL**: `https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=800&q=90&fit=crop`

2. **Manillar Integrado**
   - **URL**: `https://images.unsplash.com/photo-1559564484-e48bb9c1aa2f?w=800&q=90&fit=crop`

3. **Tija de Sillín**
   - **URL**: `https://images.unsplash.com/photo-1475666675596-cca2035b3d79?w=800&q=90&fit=crop`

---

## 👥 Página Sobre Nosotros (sobre-nosotros.html)

### Equipo

1. **Dr. Marc Vilanova**
   - **URL**: `https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=90&fit=crop`
   - **Descripción**: Retrato profesional

---

## 📝 Notas de Uso

- **Formato**: Todas las URLs usan parámetros de optimización de Unsplash (`w=`, `q=`, `fit=crop`)
- **Calidad**: `q=90` para balance entre calidad y rendimiento
- **Responsive**: Las imágenes se adaptan automáticamente con CSS
- **Filtros CSS**: Se aplica `grayscale(0.1)` y `contrast(1.05)` para estética premium

## 🔄 Reemplazo Futuro

Cuando tengas imágenes reales de productos VËKTOR:

1. Coloca las imágenes en la carpeta `images/`
2. Reemplaza las URLs de Unsplash con las rutas locales
3. Mantén los mismos nombres de archivo para facilitar el cambio
4. Asegúrate de que las imágenes tengan aspect ratio 4:3 para productos

**Ejemplo de reemplazo:**
```html
<!-- Antes (Unsplash) -->
<img src="https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800&q=90&fit=crop">

<!-- Después (Local) -->
<img src="images/vektor-aero-r1.jpg">
```
