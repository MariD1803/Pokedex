# Pokedex

Una aplicación de búsqueda de pokemones, donde puedes ingresar el nombre del Pokémon que estás buscando y obtener información detallada sobre él, proporcionada por la API de Pokémon.

```
https://pokeapi.co/ solo
```

## Tecnologías Utilizadas

Este proyecto está basado en tres tecnologías principales:

### 1. Vue.js
Vue.js es el framework que utilicé para el renderizado de datos y la creación de componentes interactivos de la interfaz gráfica.

- **Data**: Manejo de variables dinámicas para almacenar tanto la información obtenida de la API como el estado de los componentes. Por ejemplo, uso directivas como `v-if` para mostrar u ocultar información dependiendo de los resultados almacenados en `data`.
  
- **Methods**: Toda la lógica funcional de la aplicación, como la interacción con los botones, el buscador y las llamadas a la API, está contenida en los métodos del componente.

- **Mounted**: En el ciclo de vida `mounted`, realizo la llamada inicial a la API con `getPokemons` para obtener la información de los Pokémon al cargar la aplicación.

- **Components**: Dividí el código en componentes reutilizables, como:
  - **Botones**: Componente donde el contenido y la funcionalidad se pasan como `props` y eventos `emit`.
  - **Card**: Muestra la información del Pokémon, con métodos para formatear datos como el tamaño y peso. También incluye la funcionalidad para copiar la información del Pokémon al portapapeles.

- **Store**: Implementé un sistema para marcar un Pokémons como favoritos, almacenando esta lista en `LocalStorage` para que la información persista incluso al recargar la página.

### 2. HTML5
Utilicé HTML5 para estructurar tanto el template base como los componentes hijos. Definí clases para aplicar estilos y asociar eventos que activan acciones específicas en la interfaz.

### 3. CSS
El diseño visual de la aplicación se realizó con CSS, incluyendo:
- **Estilos del template**: Creación del layout y personalización visual.
- **Animaciones**: Implementación de transiciones y efectos visuales en la interfaz.
- **Responsividad**: Utilicé media queries para asegurar que la aplicación sea completamente responsive, adaptándose a dispositivos como laptops, tablets y móviles con medidas estándar.

---

¡Gracias por revisar este proyecto!

### Autor

Mariangel Diaz 😊