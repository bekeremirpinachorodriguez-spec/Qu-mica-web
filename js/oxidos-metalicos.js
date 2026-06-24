<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Química Inorgánica - Óxidos No Metálicos</title>
    <link rel="stylesheet" href="css/estilos.css">
</head>
<body>

    <header>
        <h1>⚗️ Química Inorgánica</h1>
        <p>Practica nomenclatura y balanceo de ecuaciones</p>
    </header>
    
    <nav>
        <a class="nav-btn" href="index.html">Óxidos Metálicos</a>
        <a class="nav-btn activo" href="oxidos-nometalicos.html">Óxidos No Metálicos</a>
        <a class="nav-btn" href="peroxidos.html">Peróxidos</a>
        <a class="nav-btn" href="https://chem-balance-boost-home.base44.app/" target="_blank">Balanceo</a>
    </nav>

    <section id="oxidos-nometalicos" class="seccion activa">
        <h2>Óxidos No Metálicos (Anhídridos)</h2>
        <p class="descripcion">Compuestos formados por un <strong>no metal</strong> y <strong>oxígeno</strong>.</p>

        <div class="modo-selector">
            <button class="modo-btn activo" onclick="cambiarModoNM('formula-a-nombre', this)">Fórmula → Nombre</button>
            <button class="modo-btn" onclick="cambiarModoNM('nombre-a-formula', this)">Nombre → Fórmula</button>
        </div>

        <div class="ejercicio-card">
            <div class="pregunta-box">
                <p id="pregunta-label-nm" class="pregunta-label">Nombra el siguiente compuesto:</p>
                <h3 id="formula-display-nm" class="formula-grande">---</h3>
            </div>

            <div class="respuestas-grid">
                <div id="campos-nombre-nm">
                    <div class="respuesta-item">
                        <label>Nomenclatura Tradicional</label>
                        <input type="text" id="resp-tradicional-nm" placeholder="Ej: Anhidrido sulfuroso">
                    </div>
                    <div class="respuesta-item" style="margin-top:1rem;">
                        <label>Nomenclatura IUPAC</label>
                        <input type="text" id="resp-iupac-nm" placeholder="Ej: Dioxido de azufre">
                    </div>
                    <div class="respuesta-item" style="margin-top:1rem;">
                        <label>Nomenclatura Stock</label>
                        <input type="text" id="resp-stock-nm" placeholder="Ej: Oxido de azufre (IV)">
                    </div>
                </div>
                <div id="campos-formula-nm" style="display:none;">
                    <div class="respuesta-item">
                        <label>Escribe la fórmula (Ej: S2O3)</label>
                        <input type="text" id="resp-formula-nm" placeholder="Ej: S2O3">
                    </div>
                </div>
            </div>

            <div class="botones">
                <button class="btn-verificar" onclick="verificarNM()">✅ Verificar</button>
                <button class="btn-nuevo" onclick="nuevoEjercicioNM()">🔀 Nuevo ejercicio</button>
                <button class="btn-ayuda" onclick="ayudaNM()">💡 Ver respuesta</button>
            </div>

            <div id="resultado-nm" class="resultado"></div>

            <div id="respuestas-correctas-nm" class="caja-azul">
                <h4>Respuestas correctas:</h4>
                <p><strong>Tradicional:</strong> <span id="correcta-tradicional-nm"></span></p>
                <p><strong>IUPAC:</strong> <span id="correcta-iupac-nm"></span></p>
                <p><strong>Stock:</strong> <span id="correcta-stock-nm"></span></p>
                <p><strong>Fórmula:</strong> <span id="correcta-formula-nm"></span></p>
            </div>

            <div id="explicacion-box-nm" class="caja-verde">
                <h4>📚 Explicación paso a paso:</h4>
                <pre id="explicacion-texto-nm"></pre>
            </div>
        </div>

        <div class="contador">
            <span>✅ Correctas: <strong id="correctas-nm">0</strong></span>
            <span>❌ Incorrectas: <strong id="incorrectas-nm">0</strong></span>
            <span>📝 Total: <strong id="total-nm">0</strong></span>
        </div>
    </section>

    <script src="js/oxidos-nometalicos.js"></script>

</body>
</html>
