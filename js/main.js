// Lógica principal: Fetch, Tipos, Debilidades, Drag&Drop, Storage, Geo y Worker.
document.addEventListener("DOMContentLoaded", () => {
    const btnBuscar = document.getElementById("btn-buscar");
    const inputNombre = document.getElementById("nombre");
    const resultadoDiv = document.getElementById("resultado");
    const btnShiny = document.getElementById("btn-shiny");
    const pokemonImg = document.getElementById("pokemon-img");
    
    // Variables para guardar las rutas de las imágenes
    let urlNormal = "";
    let urlShiny = "";
    let isShiny = false;

    async function obtenerDebilidades(tipos) {
        let debilidades = new Set();
        for (let tipo of tipos) {
            let res = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
            let data = await res.json();
            data.damage_relations.double_damage_from.forEach(t => debilidades.add(t.name));
        }
        return Array.from(debilidades);
    }

    btnBuscar.addEventListener("click", async () => {
        let n = inputNombre.value.toLowerCase().trim();
        if(!n) return;
        
        resultadoDiv.classList.remove("hidden");
        document.getElementById("p-nombre").innerText = "Buscando...";
        btnShiny.classList.add("hidden"); // Ocultamos el botón al buscar
        isShiny = false; // Reiniciamos el estado

        try {
            let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${n}`);
            let data = await res.json();

            // 1. Datos Básicos
            document.getElementById("p-nombre").innerText = data.name;
            document.getElementById("p-id").innerText = "#" + data.id.toString().padStart(3, '0');
            
            // Guardamos ambas imágenes (Normal y Shiny)
            urlNormal = data.sprites.other['official-artwork'].front_default || data.sprites.front_default;
            urlShiny = data.sprites.other['official-artwork'].front_shiny || data.sprites.front_shiny;
            
            pokemonImg.src = urlNormal;
            // Guardamos ambas imágenes (Normal y Shiny)
            urlNormal = data.sprites.other['official-artwork'].front_default || data.sprites.front_default;
            urlShiny = data.sprites.other['official-artwork'].front_shiny || data.sprites.front_shiny;

            pokemonImg.src = urlNormal;
            isShiny = false; // Reiniciamos el estado
            btnShiny.innerText = "Ver Shiny"; // Regresamos el texto a la normalidad

// Solo mostramos el botón si la URL de la imagen shiny realmente existe
if (urlShiny && urlShiny !== "null" && urlShiny !== "") {
    btnShiny.classList.remove("hidden"); 
} else {
    btnShiny.classList.add("hidden");
}

            // 2. Tipos
            let tiposHTML = "";
            let listaTipos = [];
            data.types.forEach(t => {
                listaTipos.push(t.type.name);
                tiposHTML += `<span class="type-badge" style="background-color: var(--${t.type.name})">${t.type.name}</span>`;
            });
            document.getElementById("p-tipos").innerHTML = tiposHTML;

            // 3. Estadísticas
            let statsHTML = "";
            data.stats.forEach(s => {
                let valor = s.base_stat;
                let porcentaje = (valor / 150) * 100;
                statsHTML += `
                    <div class="stat-bar">
                        <span>${s.stat.name}</span>
                        <div class="stat-progress"><div class="stat-fill" style="width: ${porcentaje}%"></div></div>
                        <span>${valor}</span>
                    </div>
                `;
            });
            document.getElementById("p-stats").innerHTML = statsHTML;

            // 4. Debilidades
            let debilidades = await obtenerDebilidades(listaTipos);
            let debHTML = "";
            debilidades.forEach(d => {
                debHTML += `<span class="type-badge" style="background-color: #555; font-size: 10px;">${d}</span>`;
            });
            document.getElementById("p-debilidades").innerHTML = debHTML;

        } catch (error) {
            alert("Pokémon no encontrado o error de conexión.");
            resultadoDiv.classList.add("hidden");
        }
    });

    // --- EVENTO DEL BOTÓN SHINY ---
    btnShiny.addEventListener("click", () => {
        isShiny = !isShiny; // Cambia entre true y false
        if (isShiny) {
            pokemonImg.src = urlShiny;
            btnShiny.innerText = "Ver Normal";
        } else {
            pokemonImg.src = urlNormal;
            btnShiny.innerText = "Ver Shiny";
        }
    });

    // --- FUNCIONES ANTERIORES (Drag, Storage, Geo, Worker) ---
    const zonaDrop = document.getElementById("zona-drop");

    pokemonImg.addEventListener("dragstart", (e) => e.dataTransfer.setData("text", e.target.id));
    zonaDrop.addEventListener("dragover", (e) => e.preventDefault());
    zonaDrop.addEventListener("drop", (e) => {
        e.preventDefault();
        let data = e.dataTransfer.getData("text");
        let img = document.getElementById(data);
        if(img && img.src !== "") {
            let clon = img.cloneNode(true);
            clon.style.width = "80px"; clon.style.height = "80px";
            zonaDrop.appendChild(clon);
        }
    });

    document.getElementById("btn-guardar").addEventListener("click", () => {
        let nombre = document.getElementById("p-nombre").innerText;
        localStorage.setItem("ultimo_pk", nombre);
        document.getElementById("storage-msg").innerText = "Guardado: " + nombre;
    });

    document.getElementById("btn-cargar").addEventListener("click", () => {
        let guardado = localStorage.getItem("ultimo_pk");
        document.getElementById("storage-msg").innerText = guardado ? "Último: " + guardado : "No hay datos.";
    });

    document.getElementById("btn-localizar").addEventListener("click", () => {
        navigator.geolocation.getCurrentPosition(p => {
            document.getElementById("geo-msg").innerText = `GPS: ${p.coords.latitude.toFixed(2)}, ${p.coords.longitude.toFixed(2)}`;
        });
    });

    document.getElementById("btn-worker").addEventListener("click", () => {
        document.getElementById("worker-msg").innerText = "Calculando...";
        const miWorker = new Worker('js/worker.js');
        miWorker.postMessage('calcular');
        miWorker.onmessage = (e) => {
            document.getElementById("worker-msg").innerText = "Poder: " + e.data;
            miWorker.terminate();
        };
    });
});