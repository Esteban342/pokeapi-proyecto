# Pokédex Pro

Aplicación web interactiva que consume la PokeAPI para buscar Pokémon y mostrar su información detallada, incluyendo estadísticas, tipos, debilidades y su versión variocolor (Shiny). Además, integra un panel de herramientas demostrando el uso de diversas APIs nativas del navegador.

## Funcionalidades

- **Buscador y Datos:** Búsqueda de Pokémon por nombre utilizando la Fetch API. Muestra imagen oficial, tipos, estadísticas base y debilidades calculadas dinámicamente.
- **Modo Shiny:** Botón dinámico que aparece solo si el Pokémon cuenta con una versión Shiny en la API, permitiendo alternar entre la imagen normal y la variocolor.
- **Drag and Drop:** Zona para arrastrar y capturar tus Pokémon favoritos en un equipo.
- **Web Storage:** Guarda y carga el último Pokémon buscado usando LocalStorage.
- **Geolocalización:** Obtención de coordenadas GPS del usuario mediante la API del navegador.
- **Web Worker y SSE:** Simulación de cálculos pesados en un hilo separado (Worker) y recepción de eventos del servidor (Server-Sent Events).

## Tecnologías utilizadas

- HTML5
- CSS3 (Diseño responsivo tipo Pokédex)
- JavaScript (Vanilla)
- PokeAPI (https://pokeapi.co/)

## Requisitos previos

No se requiere la instalación de ninguna dependencia ni servidor backend. Solo necesitas un navegador web moderno.

## Cómo ejecutar el proyecto

1. Clona este repositorio en tu máquina local:
   git clone https://github.com/TuUsuario/pokeapi-proyecto.git

2. Abre la carpeta del proyecto.

3. Ejecuta el archivo `index.html` haciendo doble clic sobre él, o si estás en Visual Studio Code, utiliza la extensión **Live Server** para una mejor experiencia.

## Notas

- La API de PokeAPI es de acceso público y gratuito.
- Algunas funciones como la geolocalización requieren que el navegador tenga permisos activados para funcionar.