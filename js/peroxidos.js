// ============================================================
//  PERÓXIDOS — METAL + GRUPO PERÓXIDO (O2 con valencia -1)
// ============================================================

// ===== DATOS =====
// Mismos metales que óxidos metálicos (con raíz latina)
var metalesPX = [
    { simbolo: "Fe", nombre: "hierro",    valencias: [2, 3],       raiz: "ferr" },
    { simbolo: "Cu", nombre: "cobre",     valencias: [1, 2],       raiz: "cupr" },
    { simbolo: "Pb", nombre: "plomo",     valencias: [2, 4],       raiz: "plumb" },
    { simbolo: "Sn", nombre: "estaño",    valencias: [2, 4],       raiz: "estann" },
    { simbolo: "Au", nombre: "oro",       valencias: [1, 3],       raiz: "aur" },
    { simbolo: "Hg", nombre: "mercurio",  valencias: [1, 2],       raiz: "mercur" },
    { simbolo: "Cr", nombre: "cromo",     valencias: [2, 3, 6],    raiz: "crom" },
    { simbolo: "Mn", nombre: "manganeso", valencias: [2, 4, 6, 7], raiz: "mangan" },
    { simbolo: "Co", nombre: "cobalto",   valencias: [2, 3],       raiz: "cobalt" },
    { simbolo: "Ni", nombre: "niquel",    valencias: [2, 3],       raiz: "niquel" }
];

var prefijosPX = { 1:"", 2:"di", 3:"tri", 4:"tetra", 5:"penta", 6:"hexa", 7:"hepta" };
var romanosPX  = { 1:"I", 2:"II", 3:"III", 4:"IV", 5:"V", 6:"VI", 7:"VII" };
var subPX      = { 1:"", 2:"₂", 3:"₃", 4:"₄", 5:"₅", 6:"₆", 7:"₇" };

var ejercicioPX   = null;
var modoPX        = "formula-a-nombre";
var correctasPX   = 0;
var incorrectasPX = 0;
var totalPX       = 0;

// ===== MCD =====
function mcdPX(a, b) {
    if (b === 0) return a;
    return mcdPX(b, a % b);
}

// ===== CALCULAR ÁTOMOS =====
// El grupo peroxido (O2) tiene valencia -2 como grupo (cada O es -1, son 2 O = -2 total)
// Por eso el calculo de subindices es igual que en oxidos normales,
// pero el numero de oxigenos siempre se multiplica x2 porque cada "grupo O2" tiene 2 atomos
function calcularAtomosPX(valencia) {
    var mcm = (valencia * 2) / mcdPX(valencia, 2);
    var nMetal = mcm / valencia;
    var nGruposO2 = mcm / 2; // numero de grupos peroxido (O2)
    return {
        metal: nMetal,
        gruposO2: nGruposO2,
        atomosOxigenoTotal: nGruposO2 * 2 // atomos reales de oxigeno
    };
}

// ===== FÓRMULA CON SUBÍNDICES =====
// Se escribe como Metal(O2)n para que se entienda que es un grupo peroxido
function hacerFormulaPX(simbolo, nMetal, nGruposO2) {
    var sM = subPX[nMetal] || nMetal;
    var sG = subPX[nGruposO2] || nGruposO2;
    if (nGruposO2 === 1) {
        return simbolo + sM + "O₂";
    }
    return simbolo + sM + "(O₂)" + sG;
}

// ===== FÓRMULA CON NÚMEROS NORMALES =====
function hacerFormulaNormalPX(simbolo, nMetal, nGruposO2) {
    var sM = nMetal === 1 ? "" : String(nMetal);
    if (nGruposO2 === 1) {
        return simbolo + sM + "O2";
    }
    return simbolo + sM + "(O2)" + nGruposO2;
}

// ===== TRADICIONAL =====
function getTradicionalPX(metal, valencia) {
    var v   = metal.valencias;
    var r   = metal.raiz;
    var idx = v.indexOf(valencia);
    if (v.length === 1) return "Peroxido " + r + "ico";
    if (v.length === 2) return idx === 0 ? "Peroxido " + r + "oso" : "Peroxido " + r + "ico";
    if (v.length === 3) {
        if (idx === 0) return "Peroxido hipo" + r + "oso";
        if (idx === 1) return "Peroxido " + r + "oso";
        return "Peroxido " + r + "ico";
    }
    if (v.length === 4) {
        if (idx === 0) return "Peroxido hipo" + r + "oso";
        if (idx === 1) return "Peroxido " + r + "oso";
        if (idx === 2) return "Peroxido " + r + "ico";
        return "Peroxido per" + r + "ico";
    }
    return "---";
}

// ===== IUPAC =====
function getIUPACPX(metal, nMetal, nGruposO2) {
    var pG = prefijosPX[nGruposO2];
    var pM = prefijosPX[nMetal];
    if (nGruposO2 === 1 && nMetal === 1) return "Peroxido de " + metal.nombre;
    if (nGruposO2 === 1) return "Peroxido de " + pM + metal.nombre;
    if (nMetal === 1) return pG + "peroxido de " + metal.nombre;
    return pG + "peroxido de " + pM + metal.nombre;
}

// ===== STOCK =====
function getStockPX(metal, valencia) {
    if (metal.valencias.length === 1) return "Peroxido de " + metal.nombre;
    return "Peroxido de " + metal.nombre + " (" + romanosPX[valencia] + ")";
}

// ===== EXPLICACIÓN FÓRMULA → NOMBRE =====
function getExplicacionFNPX(metal, valencia, nMetal, nGruposO2) {
    var txt = "";
    var v   = metal.valencias;
    var idx = v.indexOf(valencia);

    txt += "PASO 1 - Como se forma la formula\n";
    txt += "----------------------------------\n";
    txt += "Metal: " + metal.nombre + " (" + metal.simbolo + ")\n";
    txt += "Valencia del metal: +" + valencia + "\n";
    txt += "El grupo peroxido (O2) actua como una unidad con valencia -2\n";
    txt += "Para que la carga sea 0 se necesitan:\n";
    txt += "  " + nMetal + " atomo(s) de " + metal.nombre + "\n";
    txt += "  " + nGruposO2 + " grupo(s) de peroxido (O2)\n";
    txt += "Formula: " + hacerFormulaNormalPX(metal.simbolo, nMetal, nGruposO2) + "\n\n";

    txt += "PASO 2 - Verificacion\n";
    txt += "---------------------\n";
    txt += nMetal + " x (+" + valencia + ") = +" + (nMetal * valencia) + "\n";
    txt += nGruposO2 + " grupo(s) x (-2) = -" + (nGruposO2 * 2) + "\n";
    txt += "Suma: " + ((nMetal * valencia) - (nGruposO2 * 2)) + " (debe ser 0)\n\n";

    txt += "PASO 3 - Como se nombra\n";
    txt += "-----------------------\n";
    txt += "Tradicional:\n";
    if (v.length === 1) {
        txt += "  Una sola valencia -> sufijo ico\n";
    } else if (v.length === 2) {
        txt += "  Dos valencias: menor=oso, mayor=ico\n";
        txt += "  Valencia " + valencia + " es la " + (idx === 0 ? "menor -> oso" : "mayor -> ico") + "\n";
    } else if (v.length === 3) {
        var e3 = ["menor -> hipo...oso", "media -> ...oso", "mayor -> ...ico"];
        txt += "  Tres valencias: hipo...oso / ...oso / ...ico\n";
        txt += "  Valencia " + valencia + " es la " + e3[idx] + "\n";
    } else if (v.length === 4) {
        var e4 = ["1ra -> hipo...oso", "2da -> ...oso", "3ra -> ...ico", "4ta -> per...ico"];
        txt += "  Cuatro valencias: hipo...oso / ...oso / ...ico / per...ico\n";
        txt += "  Valencia " + valencia + " es la " + e4[idx] + "\n";
    }
    txt += "  Resultado: " + getTradicionalPX(metal, valencia) + "\n\n";

    txt += "IUPAC:\n";
    txt += "  Prefijos segun numero de grupos peroxido\n";
    txt += "  " + nGruposO2 + " grupo(s) de O2 -> " + (prefijosPX[nGruposO2] || "") + "peroxido" + (nGruposO2 === 1 ? " (se omite mono)" : "") + "\n";
    txt += "  " + nMetal + " " + metal.nombre + "(s) -> " + (prefijosPX[nMetal] || "") + metal.nombre + (nMetal === 1 ? " (se omite mono)" : "") + "\n";
    txt += "  Resultado: " + getIUPACPX(metal, nMetal, nGruposO2) + "\n\n";

    txt += "Stock:\n";
    if (metal.valencias.length === 1) {
        txt += "  Una sola valencia -> no se escribe numero romano\n";
    } else {
        txt += "  Se escribe la valencia en numero romano -> (" + romanosPX[valencia] + ")\n";
    }
    txt += "  Resultado: " + getStockPX(metal, valencia);
    return txt;
}

// ===== EXPLICACIÓN NOMBRE → FÓRMULA =====
function getExplicacionNFPX(metal, valencia, nMetal, nGruposO2) {
    var txt = "";
    var v   = metal.valencias;
    var idx = v.indexOf(valencia);

    txt += "PASO 1 - Como identificar el metal y su valencia\n";
    txt += "------------------------------------------------\n";
    txt += "Desde el nombre Tradicional:\n";
    txt += "  Busca el sufijo al final del nombre:\n";
    if (v.length === 1) {
        txt += "  Termina en ico -> unica valencia: " + valencia + "\n";
    } else if (v.length === 2) {
        txt += "  oso = valencia menor (" + v[0] + ")\n";
        txt += "  ico = valencia mayor (" + v[1] + ")\n";
        txt += "  Este compuesto usa valencia: " + valencia + "\n";
    } else if (v.length === 3) {
        txt += "  hipo...oso = valencia mas baja (" + v[0] + ")\n";
        txt += "  ...oso     = valencia media (" + v[1] + ")\n";
        txt += "  ...ico     = valencia mas alta (" + v[2] + ")\n";
        txt += "  Este compuesto usa valencia: " + valencia + "\n";
    } else if (v.length === 4) {
        txt += "  hipo...oso = 1ra valencia (" + v[0] + ")\n";
        txt += "  ...oso     = 2da valencia (" + v[1] + ")\n";
        txt += "  ...ico     = 3ra valencia (" + v[2] + ")\n";
        txt += "  per...ico  = 4ta valencia (" + v[3] + ")\n";
        txt += "  Este compuesto usa valencia: " + valencia + "\n";
    }
    txt += "\n";

    txt += "Desde el nombre IUPAC:\n";
    txt += "  mono(1) di(2) tri(3) tetra(4) penta(5) hexa(6) hepta(7)\n";
    txt += "  " + (prefijosPX[nGruposO2] || "sin prefijo") + "peroxido -> " + nGruposO2 + " grupo(s) de O2\n";
    txt += "  " + (prefijosPX[nMetal] || "sin prefijo") + metal.nombre + " -> " + nMetal + " atomo(s) de " + metal.nombre + "\n";
    txt += "\n";

    txt += "Desde el nombre Stock:\n";
    if (metal.valencias.length === 1) {
        txt += "  Sin numero romano -> una sola valencia: " + valencia + "\n";
    } else {
        txt += "  El numero romano indica la valencia del metal\n";
        txt += "  (" + romanosPX[valencia] + ") -> valencia " + valencia + "\n";
    }
    txt += "\n";

    txt += "PASO 2 - Como calcular los subindices\n";
    txt += "--------------------------------------\n";
    txt += "  El grupo peroxido (O2) tiene valencia -2 como grupo\n";
    txt += "  " + nMetal + " x (+" + valencia + ") = +" + (nMetal * valencia) + "\n";
    txt += "  " + nGruposO2 + " x (-2) = -" + (nGruposO2 * 2) + "\n";
    txt += "  Suma: " + ((nMetal * valencia) - (nGruposO2 * 2)) + " (debe ser 0)\n\n";

    txt += "PASO 3 - Formula final\n";
    txt += "----------------------\n";
    txt += "Formula: " + hacerFormulaNormalPX(metal.simbolo, nMetal, nGruposO2);
    return txt;
}

// ===== NUEVO EJERCICIO =====
function nuevoEjercicioPX() {
    var metal    = metalesPX[Math.floor(Math.random() * metalesPX.length)];
    var valencia = metal.valencias[Math.floor(Math.random() * metal.valencias.length)];
    var atomos   = calcularAtomosPX(valencia);

    ejercicioPX = {
        metal:         metal,
        valencia:      valencia,
        nMetal:        atomos.metal,
        nGruposO2:     atomos.gruposO2,
        formula:       hacerFormulaPX(metal.simbolo, atomos.metal, atomos.gruposO2),
        formulaNormal: hacerFormulaNormalPX(metal.simbolo, atomos.metal, atomos.gruposO2),
        tradicional:   getTradicionalPX(metal, valencia),
        iupac:         getIUPACPX(metal, atomos.metal, atomos.gruposO2),
        stock:         getStockPX(metal, valencia),
        explicacionFN: getExplicacionFNPX(metal, valencia, atomos.metal, atomos.gruposO2),
        explicacionNF: getExplicacionNFPX(metal, valencia, atomos.metal, atomos.gruposO2)
    };

    document.getElementById("resultado-px").className = "resultado";
    document.getElementById("resultado-px").textContent = "";
    document.getElementById("respuestas-correctas-px").style.display = "none";
    document.getElementById("explicacion-box-px").style.display = "none";

    if (modoPX === "formula-a-nombre") {
        document.getElementById("pregunta-label-px").textContent = "Nombra el siguiente compuesto:";
        document.getElementById("formula-display-px").textContent = ejercicioPX.formula;
        document.getElementById("campos-nombre-px").style.display = "block";
        document.getElementById("campos-formula-px").style.display = "none";
        document.getElementById("resp-tradicional-px").value = "";
        document.getElementById("resp-iupac-px").value = "";
        document.getElementById("resp-stock-px").value = "";
    } else {
        document.getElementById("pregunta-label-px").textContent = "Escribe la formula de:";
        document.getElementById("formula-display-px").textContent =
            "Tradicional: " + ejercicioPX.tradicional +
            " | IUPAC: "    + ejercicioPX.iupac +
            " | Stock: "    + ejercicioPX.stock;
        document.getElementById("campos-nombre-px").style.display = "none";
        document.getElementById("campos-formula-px").style.display = "block";
        document.getElementById("resp-formula-px").value = "";
    }
}

// ===== VERIFICAR =====
function verificarPX() {
    if (!ejercicioPX) return;

    var div = document.getElementById("resultado-px");
    totalPX++;
    document.getElementById("total-px").textContent = totalPX;

    if (modoPX === "formula-a-nombre") {
        var rT = document.getElementById("resp-tradicional-px").value.trim().toLowerCase();
        var rI = document.getElementById("resp-iupac-px").value.trim().toLowerCase();
        var rS = document.getElementById("resp-stock-px").value.trim().toLowerCase();

        var okT = rT === ejercicioPX.tradicional.toLowerCase();
        var okI = rI === ejercicioPX.iupac.toLowerCase();
        var okS = rS === ejercicioPX.stock.toLowerCase();

        if (okT && okI && okS) {
            correctasPX++;
            document.getElementById("correctas-px").textContent = correctasPX;
            div.className = "resultado correcto";
            div.textContent = "Excelente! Las tres nomenclaturas son correctas.";
        } else {
            incorrectasPX++;
            document.getElementById("incorrectas-px").textContent = incorrectasPX;
            var msg = "";
            if (!okT && !okI && !okS) {
                msg = "Ninguna es correcta. Revisa la explicacion abajo.";
            } else {
                msg += okT ? "Tradicional correcta.\n" : "Tradicional incorrecta.\n";
                msg += okI ? "IUPAC correcta.\n"       : "IUPAC incorrecta.\n";
                msg += okS ? "Stock correcta."          : "Stock incorrecta.";
            }
            div.className = "resultado incorrecto";
            div.textContent = msg;
            document.getElementById("explicacion-texto-px").textContent = ejercicioPX.explicacionFN;
            document.getElementById("explicacion-box-px").style.display = "block";
        }
    } else {
        var rF = document.getElementById("resp-formula-px").value.trim().toUpperCase().replace(/\s/g, "");
        var cF = ejercicioPX.formulaNormal.toUpperCase().replace(/\s/g, "");

        if (rF === cF) {
            correctasPX++;
            document.getElementById("correctas-px").textContent = correctasPX;
            div.className = "resultado correcto";
            div.textContent = "Correcto! La formula es " + ejercicioPX.formula;
        } else {
            incorrectasPX++;
            document.getElementById("incorrectas-px").textContent = incorrectasPX;
            div.className = "resultado incorrecto";
            div.textContent = "Incorrecto. Revisa la explicacion abajo.";
            document.getElementById("explicacion-texto-px").textContent = ejercicioPX.explicacionNF;
            document.getElementById("explicacion-box-px").style.display = "block";
        }
    }
}

// ===== AYUDA =====
function ayudaPX() {
    if (!ejercicioPX) return;
    document.getElementById("correcta-tradicional-px").textContent = ejercicioPX.tradicional;
    document.getElementById("correcta-iupac-px").textContent       = ejercicioPX.iupac;
    document.getElementById("correcta-stock-px").textContent       = ejercicioPX.stock;
    document.getElementById("correcta-formula-px").textContent     = ejercicioPX.formulaNormal;
    document.getElementById("respuestas-correctas-px").style.display = "block";
    if (modoPX === "formula-a-nombre") {
        document.getElementById("explicacion-texto-px").textContent = ejercicioPX.explicacionFN;
    } else {
        document.getElementById("explicacion-texto-px").textContent = ejercicioPX.explicacionNF;
    }
    document.getElementById("explicacion-box-px").style.display = "block";
}

// ===== CAMBIAR MODO =====
function cambiarModoPX(modo, boton) {
    modoPX = modo;
    document.querySelectorAll(".modo-btn").forEach(function(b) {
        b.classList.remove("activo");
    });
    boton.classList.add("activo");
    nuevoEjercicioPX();
}

// ===== INICIAR =====
window.onload = function() {
    nuevoEjercicioPX();
};
