
# **PokéDex**

Pokedex es una aplicación web que permite explorar y visualizar Pokémon de manera interactiva. Los usuarios pueden buscar Pokémon, ver detalles individuales, y navegar entre ellos mediante paginación.

## **Características principales**
- 📖 Listado de Pokémon con información básica (nombre e Id).
- 🔍 Funcionalidad de búsqueda por nombre.
- 🖼️ Vista detallada de cada Pokémon, incluyendo una imagen y sus habilidades.
- ⏭️ Navegación paginada y carga de más Pokémon dinámicamente.
- 🎨 Interfaz amigable y responsiva con efectos visuales atractivos.

---

## **Instalación**

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local:

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/marceldgr4/Pokedex.git
   cd Pokedex
   ```

2. **Instalar dependencias**:
   Asegúrate de tener instalado [Node.js](https://nodejs.org/) en tu máquina. Luego, ejecuta:
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev 
   ```

4. **Abrir la aplicación**:  
   La aplicación estará disponible en [http://localhost:5173](http://localhost:5173).

---

## **Tecnologías utilizadas**
- **Frontend**:  
  - [React](https://reactjs.org/) - Biblioteca principal para la interfaz de usuario.
  - [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS) - Diseño y estilización.
- **Backend**:  
  - API pública de Pokémon (consumo de datos dinámicos).
- **Gestión de estado**:  
  - Hooks de React (`useState`, `useEffect`).

---

## **Estructura del proyecto**

```
pokemon-explorer/
├── src/
│   ├── Components/
│   │   ├── Pokemons/       # Listado de Pokémon y su lógica
│   │   ├── Search/         # Componente de búsqueda
│   │   ├── Pagination/     # Navegación entre páginas
│   │   └── DetailsPokemon/ # Vista detallada de un Pokémon
│   ├── Hooks/              # Hooks personalizados
│   ├             
│   ├── App.js              # Punto de entrada principal
│   └── index.js            # Renderizado inicial
├── public/                 # Archivos estáticos
└── package.json            # Configuración del proyecto
```

---





## **Licencia**

Este proyecto está bajo la licencia [MIT](https://opensource.org/licenses/MIT). Siéntete libre de usarlo, modificarlo y distribuirlo.

---

---

## **Autor**

Desarrollado por [Marcel](https://github.com/marceldgr4).  
Para cualquier consulta, puedes contactarme en [correo](marceldgr@gmail.com).
