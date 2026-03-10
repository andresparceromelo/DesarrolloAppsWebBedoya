# Generación de Imágenes del Equipo VËKTOR

## ⚠️ Servicio de Generación No Disponible

El servicio de generación de imágenes (Gemini 3 Pro Image) está temporalmente sin capacidad. 

## 🎨 Especificaciones para Generar Imágenes Posteriormente

### Dr. Marc Vilanova - Director de Ingeniería

**Prompt completo para generación:**

```
Ultra-realistic professional studio portrait of Dr. Marc Vilanova, a high-performance engineering team member from premium cycling brand VËKTOR.

Male, early 40s, Mediterranean features, athletic build, short dark hair slightly styled, light beard well groomed. Intelligent gaze. Former professional cyclist turned aerospace engineer appearance.

Upper body portrait from mid-torso up, arms crossed confidently, standing straight with strong posture. Subtle confident smile, intelligent eyes, ambitious but calm, natural and authentic expression. Subtle signs of maturity and leadership, calm but authoritative presence.

Wearing matte black fitted technical t-shirt with minimalist white "VËKTOR" logo printed on chest. No additional graphics. Clean, modern, performance-oriented look.

High-end editorial lighting, soft diffused key light, subtle rim light to separate subject from background. Clean shadows, no harsh contrast.

Minimalist light grey concrete textured background. Editorial, architectural feel. Premium brand atmosphere.

Cinematic style, sharp focus, extremely detailed skin texture, professional color grading, realistic proportions, natural skin tones. 85mm lens look, shallow depth of field, f/2.8, high resolution, commercial photography quality.

Mood: Precision, intelligence, discipline, elite performance culture. No exaggerated poses, no fashion glamour, no artificial plastic skin, no cartoon style. Photorealistic.
```

### Otros Miembros del Equipo

Puedes adaptar el mismo prompt para los demás miembros:

#### Laura Méndez - Directora de Biomecánica
```
Female, mid-30s, athletic build, professional appearance, intelligent expression.
Former professional triathlete turned biomechanics specialist.
Same technical VËKTOR t-shirt, same lighting and background style.
```

#### Ing. Tomás Ruiz - Director de Materiales
```
Male, late 30s, technical professional appearance, focused expression.
Materials engineer with aerospace background.
Same technical VËKTOR t-shirt, same lighting and background style.
```

#### Carlos Ibáñez - Ingeniero de Pruebas
```
Male, early 30s, hands-on technical professional, approachable expression.
Former professional team mechanic turned test engineer.
Same technical VËKTOR t-shirt, same lighting and background style.
```

#### Ana Torrents - Especialista en Experiencia de Cliente
```
Female, late 20s, professional cyclist appearance, warm but technical expression.
Former professional cyclist, communication specialist.
Same technical VËKTOR t-shirt, same lighting and background style.
```

## 🔧 Servicios Alternativos para Generar Imágenes

### 1. **Midjourney** (Recomendado)
- URL: https://www.midjourney.com
- Calidad: Excelente para retratos fotorrealistas
- Costo: Suscripción desde $10/mes

**Comando Midjourney:**
```
/imagine prompt: [copiar el prompt completo arriba] --ar 3:4 --style raw --v 6 --q 2
```

### 2. **DALL-E 3** (OpenAI)
- URL: https://openai.com/dall-e-3
- Calidad: Muy buena para retratos profesionales
- Costo: Por créditos

### 3. **Stable Diffusion XL**
- URL: https://stability.ai
- Calidad: Buena, requiere más ajustes
- Costo: Gratuito (local) o por API

### 4. **Leonardo.ai**
- URL: https://leonardo.ai
- Calidad: Excelente para retratos
- Costo: Plan gratuito disponible

## 📁 Estructura de Archivos Recomendada

Guarda las imágenes generadas en:
```
vektor/
├── images/
│   ├── team/
│   │   ├── marc-vilanova.jpg
│   │   ├── laura-mendez.jpg
│   │   ├── tomas-ruiz.jpg
│   │   ├── carlos-ibanez.jpg
│   │   └── ana-torrents.jpg
```

**Especificaciones técnicas:**
- Formato: JPG
- Resolución: 800x1000px (ratio 4:5)
- Calidad: 85-90%
- Peso: < 200KB por imagen

## 🎯 Implementación en HTML

Una vez tengas las imágenes, actualiza `sobre-nosotros.html`:

```html
<!-- Miembro 1 -->
<article>
    <figure>
        <img src="images/team/marc-vilanova.jpg" 
             alt="Dr. Marc Vilanova - Director de Ingeniería VËKTOR">
        <figcaption>Dr. Marc Vilanova</figcaption>
    </figure>
    
    <h3>Dr. Marc Vilanova</h3>
    <p><strong>Rol:</strong> Director de Ingeniería y Cofundador</p>
    <p><strong>Especialidad:</strong> Ingeniero Aeroespacial, PhD en Dinámica de Fluidos Computacional</p>
    <p>
        15 años de experiencia en optimización aerodinámica...
    </p>
</article>
```

## 🎨 CSS para Imágenes del Equipo

Agrega estos estilos a `styles.css`:

```css
/* Imágenes del equipo */
section[aria-labelledby="equipo-heading"] article {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: var(--space-lg);
    align-items: start;
}

section[aria-labelledby="equipo-heading"] figure {
    position: relative;
    overflow: hidden;
    border-radius: 2px;
}

section[aria-labelledby="equipo-heading"] figure img {
    width: 100%;
    height: auto;
    display: block;
    filter: grayscale(0.2);
    transition: filter 0.5s ease, transform 0.8s var(--ease-out-expo);
}

section[aria-labelledby="equipo-heading"] article:hover figure img {
    filter: grayscale(0);
    transform: scale(1.03);
}

section[aria-labelledby="equipo-heading"] figcaption {
    font-family: var(--font-display);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-top: var(--space-xs);
    color: var(--color-text-secondary);
}

@media (max-width: 768px) {
    section[aria-labelledby="equipo-heading"] article {
        grid-template-columns: 1fr;
    }
}
```

## 📝 Notas Importantes

1. **Consistencia visual:** Todas las fotos deben tener el mismo estilo de iluminación y fondo
2. **Mismo formato:** Todas las imágenes deben tener el mismo ratio (4:5 recomendado)
3. **Logo VËKTOR:** Asegúrate de que el logo sea consistente en todas las camisetas
4. **Optimización:** Comprime las imágenes antes de subirlas al sitio

## ⏭️ Próximos Pasos

1. Genera las 5 imágenes usando uno de los servicios recomendados
2. Optimiza las imágenes (compresión, tamaño)
3. Guárdalas en `vektor/images/team/`
4. Actualiza `sobre-nosotros.html` con las rutas correctas
5. Agrega los estilos CSS adicionales
6. Verifica en el navegador

---

**Alternativa temporal:** Mientras generas las imágenes profesionales, puedes usar imágenes de placeholder de Unsplash con búsquedas como:
- `https://images.unsplash.com/photo-professional-portrait-male`
- Pero recomiendo esperar a tener las imágenes generadas específicamente para VËKTOR
