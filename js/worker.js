// Script que se ejecuta en un hilo separado para no congelar la interfaz.
self.onmessage = function(e) {
    if (e.data === 'calcular') {
        // Simulamos un cálculo pesado con un bucle
        let resultado = 0;
        for (let i = 0; i < 500000000; i++) {
            resultado += i;
        }
        // Enviamos el resultado de vuelta al hilo principal
        self.postMessage(resultado);
    }
};