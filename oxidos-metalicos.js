// ============================================================
//  ÓXIDOS METÁLICOS — VERSIÓN FINAL
// ============================================================

// ===== DATOS =====
// Solo metales CON raiz latina para evitar ejercicios sin solución tradicional
var metales = [
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

var prefijosOM = { 1:"", 2:"di", 3:"tri", 4:"tetra", 5:"penta", 6:"hexa", 7:"hepta" };
var romanosOM  = { 1:"I", 2:"II", 3:"III", 4:"IV", 5:"V", 6:"VI", 7:"VII" };
var subOM      = { 1:"", 2:"₂", 3:"₃", 4:"₄", 5:"₅", 6:"₆", 7:"₇" };

var ejercicioOM   = null;
var modoOM        = "formula-a-nombre";
var correctasOM   = 0;
var incorrectasOM = 0;
var totalOM       = 0;

// ===== MCD =====
function mcdOM(a, b) {
    if (b === 0) return a;
    return mcdOM(b, a % b);
}

// ===== CALCULAR ÁTOMOS =====
function calcularAtomosOM(valencia) {
    var mcm = (valencia * 2) / mcdOM(valencia, 2);
    return {
        metal:   mcm / valencia,
        oxigeno: mcm / 2
    };
}

// ===== FÓRMULA CON SUBÍNDICES =====
function hacerFormulaOM(simbolo, nMetal, nOxigeno) {
    return simbolo + subOM[nMetal] + "O" + subOM[nOxigeno];
}

// ===== FÓRMULA CON NÚMEROS NORMALES =====
function hacerFormulaNormalOM(simbolo, nMetal, nOxigeno) {
    var sM = nMetal   === 1 ? "" : String(nMetal);
    var sO = nOxigeno === 1 ? "" : String(nOxigeno);
    return simbolo + sM + "O" + sO;
}

// ===== TRADICIONAL =====
function getTradicionalOM(metal, valencia) {
    var v   = metal.valencias;
    var r   = metal.raiz;
    var idx = v.indexOf(valencia);
    if (v.length === 1) return "Oxido " + r + "ico";
    if (v.length === 2) return idx === 0 ? "Oxido " + r + "oso" : "Oxido " + r + "ico";
    if (v.length === 3) {
        if (idx === 0) return "Oxido hipo" + r + "oso";
        if (idx === 1) return "Oxido " + r + "oso";
        return "Oxido " + r + "ico";
    }
    if (v.length === 4) {
        if (idx === 0) return "Oxido hipo" + r + "oso";
        if (idx === 1) return "Oxido " + r + "oso";
        if (idx === 2) return "Oxido " + r + "ico";
        return "Oxido per" + r + "ico";
    }
    return "---";
}

// ===== IUPAC =====
function getIUPACOM(metal, nMetal, nOxigeno) {
    var pO = prefijosOM[nOxigeno];
    var pM = prefijosOM[nMetal];
    if (nOxigeno === 1 && nMetal === 1) return "Oxido de " + metal.nombre;
    if (nOxigeno === 1) return "Oxido de " + pM + metal.nombre;
    if (nMetal   === 1) return pO + "oxido de " + metal.nombre;
    return pO + "oxido de " + pM + metal.nombre;
}

// ===== STOCK =====
function getStockOM(metal, valencia) {
    if (metal.valencias.length === 1) return "Oxido de " + metal.nombre;
    return "Oxido de " + metal.nombre + " (" + romanosOM[valencia] + ")";
}

// ===== EXPLICACIÓN FÓRMULA → NOMBRE =====
function getExplicacionFNOM(metal, valencia, nMetal, nOxigeno) {
    var txt = "";
    var v   = metal.valencias;
    var idx = v.indexOf(valencia);

    txt += "PASO 1 - Como se forma la formula\n";
    txt += "----------------------------------\n";
    txt += "Metal: " + metal.nombre + " (" + metal.simbolo + ")\n";
    txt += "Valencia del metal: +" + valencia + "\n";
    txt += "Valencia del oxigeno: siempre -2\n";
    txt += "Para que la carga sea 0 se necesitan:\n";
    txt += "  " + nMetal + " atomo(s) de " + metal.nombre + "\n";
    txt += "  " + nOxigeno + " atomo(s) de oxigeno\n";
    txt += "Formula: " + hacerFormulaNormalOM(metal.simbolo, nMetal, nOxigeno) + "\n\n";

    txt += "PASO 2 - Verificacion\n";
    txt += "---------------------\n";
    txt += nMetal + " x (+" + valencia + ") = +" + (nMetal * valencia) + "\n";
    txt += nOxigeno + " x (-2) = -" + (nOxigeno * 2) + "\n";
    txt += "Suma: " + ((nMetal * valencia) - (nOxigeno * 2)) + " (debe ser 0)\n\n";

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
    txt += "  Resultado: " + getTradicionalOM(metal, valencia) + "\n\n";

    txt += "IUPAC:\n";
    txt += "  Prefijos segun numero de atomos\n";
    txt += "  " + nOxigeno + " oxigeno(s) -> " + (prefijosOM[nOxigeno] || "") + "oxido" + (nOxigeno === 1 ? " (se omite mono)" : "") + "\n";
    txt += "  " + nMetal + " " + metal.nombre + "(s) -> " + (prefijosOM[nMetal] || "") + metal.nombre + (nMetal === 1 ? " (se omite mono)" : "") + "\n";
    txt += "  Resultado: " + getIUPACOM(metal, nMetal, nOxigeno) + "\n\n";

    txt += "Stock:\n";
    if (metal.valencias.length === 1) {
        txt += "  Una sola valencia -> no se escribe numero romano\n";
    } else {
        txt += "  Se escribe la valencia en numero romano -> (" + romanosOM[valencia] + ")\n";
    }
    txt += "  Resultado: " + getStockOM(metal, valencia);
    return txt;
}

// ===== EXPLICACIÓN NOMBRE → FÓRMULA =====
function getExplicacionNFOM(metal, valencia, nMetal, nOxigeno) {
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
    txt += "  " + (prefijosOM[nOxigeno] || "sin prefijo") + "oxido -> " + nOxigeno + " atomo(s) de oxigeno\n";
    txt += "  " + (prefijosOM[nMetal] || "sin prefijo") + metal.nombre + " -> " + nMetal + " atomo(s) de " + metal.nombre + "\n";
    if (nMetal === 1 || nOxigeno === 1) {
        txt += "  Recuerda: si hay 1 atomo se omite mono\n";
    }
    txt += "\n";

    txt += "Desde el nombre Stock:\n";
    if (metal.valencias.length === 1) {
        txt += "  Sin numero romano -> una sola valencia: " + valencia + "\n";
    } else {
        txt += "  El numero romano indica la valencia del metal\n";
        txt += "  (" + romanosOM[valencia] + ") -> valencia " + valencia + "\n";
    }
    txt += "\n";

    txt += "PASO 2 - Como calcular los subindices\n";
    txt += "--------------------------------------\n";
    txt += "  " + nMetal + " x (+" + valencia + ") = +" + (nMetal * valencia) + "\n";
    txt += "  " + nOxigeno + " x (-2) = -" + (nOxigeno * 2) + "\n";
    txt += "  Suma: " + ((nMetal * valencia) - (nOxigeno * 2)) + " (debe ser 0)\n\n";

    txt += "PASO 3 - Formula final\n";
    txt += "----------------------\n";
    txt += "Formula: " + hacerFormulaNormalOM(metal.simbolo, nMetal, nOxigeno);
    return txt;
}

// ===== NUEVO EJERCICIO =====
function nuevoEjercicioOM() {
    var metal    = metales[Math.floor(Math.random() * metales.length)];
    var valencia = metal.valencias[Math.floor(Math.random() * metal.valencias.length)];
    var atomos   = calcularAtomosOM(valencia);

    ejercicioOM = {
        metal:         metal,
        valencia:      valencia,
        nMetal:        atomos.metal,
        nOxigeno:      atomos.oxigeno,
        formula:       hacerFormulaOM(metal.simbolo, atomos.metal, atomos.oxigeno),
        formulaNormal: hacerFormulaNormalOM(metal.simbolo, atomos.metal, atomos.oxigeno),
        tradicional:   getTradicionalOM(metal, valencia),
        iupac:         getIUPACOM(metal, atomos.metal, atomos.oxigeno),
        stock:         getStockOM(metal, valencia),
        explicacionFN: getExplicacionFNOM(metal, valencia, atomos.metal, atomos.oxigeno),
        explicacionNF: getExplicacionNFOM(metal, valencia, atomos.metal, atomos.oxigeno)
    };

    document.getElementById("resultado-om").className = "resultado";
    document.getElementById("resultado-om").textContent = "";
    document.getElementById("respuestas-correctas-om").style.display = "none";
    document.getElementById("explicacion-box-om").style.display = "none";

    if (modoOM === "formula-a-nombre") {
        document.getElementById("pregunta-label-om").textContent = "Nombra el siguiente compuesto:";
        document.getElementById("formula-display-om").textContent = ejercicioOM.formula;
        document.getElementById("campos-nombre-om").style.display = "block";
        document.getElementById("campos-formula-om").style.display = "none";
        document.getElementById("resp-tradicional-om").value = "";
        document.getElementById("resp-iupac-om").value = "";
        document.getElementById("resp-stock-om").value = "";
    } else {
        document.getElementById("pregunta-label-om").textContent = "Escribe la formula de:";
        document.getElementById("formula-display-om").textContent =
            "Tradicional: " + ejercicioOM.tradicional +
            " | IUPAC: "    + ejercicioOM.iupac +
            " | Stock: "    + ejercicioOM.stock;
        document.getElementById("campos-nombre-om").style.display = "none";
        document.getElementById("campos-formula-om").style.display = "block";
        document.getElementById("resp-formula-om").value = "";
    }
}

// ===== VERIFICAR =====
function verificarOM() {
    if (!ejercicioOM) return;

    var div = document.getElementById("resultado-om");
    totalOM++;
    document.getElementById("total-om").textContent = totalOM;

    if (modoOM === "formula-a-nombre") {
        var rT = document.getElementById("resp-tradicional-om").value.trim().toLowerCase();
        var rI = document.getElementById("resp-iupac-om").value.trim().toLowerCase();
        var rS = document.getElementById("resp-stock-om").value.trim().toLowerCase();

        var okT = rT === ejercicioOM.tradicional.toLowerCase();
        var okI = rI === ejercicioOM.iupac.toLowerCase();
        var okS = rS === ejercicioOM.stock.toLowerCase();

        if (okT && okI && okS) {
            correctasOM++;
            document.getElementById("correctas-om").textContent = correctasOM;
            div.className = "resultado correcto";
            div.textContent = "Excelente! Las tres nomenclaturas son correctas.";
        } else {
            incorrectasOM++;
            document.getElementById("incorrectas-om").textContent = incorrectasOM;
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
            document.getElementById("explicacion-texto-om").textContent = ejercicioOM.explicacionFN;
            document.getElementById("explicacion-box-om").style.display = "block";
        }
    } else {
        var rF = document.getElementById("resp-formula-om").value.trim().toUpperCase();
        var cF = ejercicioOM.formulaNormal.toUpperCase();

        if (rF === cF) {
            correctasOM++;
            document.getElementById("correctas-om").textContent = correctasOM;
            div.className = "resultado correcto";
            div.textContent = "Correcto! La formula es " + ejercicioOM.formula;
        } else {
            incorrectasOM++;
            document.getElementById("incorrectas-om").textContent = incorrectasOM;
            div.className = "resultado incorrecto";
            div.textContent = "Incorrecto. Revisa la explicacion abajo.";
            document.getElementById("explicacion-texto-om").textContent = ejercicioOM.explicacionNF;
            document.getElementById("explicacion-box-om").style.display = "block";
        }
    }
}

// ===== AYUDA =====
function ayudaOM() {
    if (!ejercicioOM) return;
    document.getElementById("correcta-tradicional-om").textContent = ejercicioOM.tradicional;
    document.getElementById("correcta-iupac-om").textContent       = ejercicioOM.iupac;
    document.getElementById("correcta-stock-om").textContent       = ejercicioOM.stock;
    document.getElementById("correcta-formula-om").textContent     = ejercicioOM.formulaNormal;
    document.getElementById("respuestas-correctas-om").style.display = "block";
    if (modoOM === "formula-a-nombre") {
        document.getElementById("explicacion-texto-om").textContent = ejercicioOM.explicacionFN;
    } else {
        document.getElementById("explicacion-texto-om").textContent = ejercicioOM.explicacionNF;
    }
    document.getElementById("explicacion-box-om").style.display = "block";
}

// ===== CAMBIAR MODO =====
function cambiarModoOM(modo, boton) {
    modoOM = modo;
    document.querySelectorAll(".modo-btn").forEach(function(b) {
        b.classList.remove("activo");
    });
    boton.classList.add("activo");
    nuevoEjercicioOM();
}

// ===== NAVEGACIÓN =====
function mostrarSeccion(id, boton) {
    document.querySelectorAll(".seccion").forEach(function(s) {
        s.classList.remove("activa");
    });
    document.getElementById(id).classList.add("activa");
    document.querySelectorAll(".nav-btn").forEach(function(b) {
        b.classList.remove("activo");
    });
    boton.classList.add("activo");
}

// ===== INICIAR =====
window.onload = function() {
    nuevoEjercicioOM();
};