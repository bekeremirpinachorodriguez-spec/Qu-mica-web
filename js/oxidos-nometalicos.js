// ============================================================
//  ÓXIDOS NO METÁLICOS (ANHÍDRIDOS) — VERSIÓN FINAL
// ============================================================

// ===== DATOS =====
var noMetales = [
    { simbolo: "C",  nombre: "carbono",   valencias: [2, 4],          raiz: "carbon" },
    { simbolo: "N",  nombre: "nitrogeno", valencias: [1, 2, 3, 4, 5], raiz: "nitr" },
    { simbolo: "S",  nombre: "azufre",    valencias: [2, 4, 6],       raiz: "sulf" },
    { simbolo: "P",  nombre: "fosforo",   valencias: [3, 5],          raiz: "fosfor" },
    { simbolo: "Cl", nombre: "cloro",     valencias: [1, 3, 5, 7],    raiz: "clor" },
    { simbolo: "Br", nombre: "bromo",     valencias: [1, 3, 5, 7],    raiz: "brom" },
    { simbolo: "I",  nombre: "yodo",      valencias: [1, 3, 5, 7],    raiz: "yod" },
    { simbolo: "F",  nombre: "fluor",     valencias: [1],             raiz: "fluor" },
    { simbolo: "Si", nombre: "silicio",   valencias: [2, 4],          raiz: "silic" },
    { simbolo: "Se", nombre: "selenio",   valencias: [2, 4, 6],       raiz: "selen" },
    { simbolo: "Te", nombre: "teluro",    valencias: [2, 4, 6],       raiz: "telur" },
    { simbolo: "B",  nombre: "boro",      valencias: [3],             raiz: "bor" },
    { simbolo: "Mn", nombre: "manganeso", valencias: [2, 4, 6, 7],    raiz: "mangan" }
];

var prefijosNM = { 1:"", 2:"di", 3:"tri", 4:"tetra", 5:"penta", 6:"hexa", 7:"hepta" };
var romanosNM  = { 1:"I", 2:"II", 3:"III", 4:"IV", 5:"V", 6:"VI", 7:"VII" };
var subNM      = { 1:"", 2:"₂", 3:"₃", 4:"₄", 5:"₅", 6:"₆", 7:"₇" };

var ejercicioNM   = null;
var modoNM        = "formula-a-nombre";
var correctasNM   = 0;
var incorrectasNM = 0;
var totalNM       = 0;

// ===== MCD =====
function mcdNM(a, b) {
    if (b === 0) return a;
    return mcdNM(b, a % b);
}

// ===== CALCULAR ÁTOMOS =====
function calcularAtomosNM(valencia) {
    var mcm = (valencia * 2) / mcdNM(valencia, 2);
    return {
        nMetal:   mcm / valencia,
        nOxigeno: mcm / 2
    };
}

// ===== FÓRMULA CON SUBÍNDICES =====
function hacerFormulaNM(simbolo, nMetal, nOxigeno) {
    return simbolo + subNM[nMetal] + "O" + subNM[nOxigeno];
}

// ===== FÓRMULA CON NÚMEROS NORMALES =====
function hacerFormulaNormalNM(simbolo, nMetal, nOxigeno) {
    var sM = nMetal   === 1 ? "" : String(nMetal);
    var sO = nOxigeno === 1 ? "" : String(nOxigeno);
    return simbolo + sM + "O" + sO;
}

// ===== TRADICIONAL =====
function getTradicionalNM(nm, valencia) {
    var v   = nm.valencias;
    var r   = nm.raiz;
    var idx = v.indexOf(valencia);
    if (v.length === 1) return "Anhidrido " + r + "ico";
    if (v.length === 2) return idx === 0 ? "Anhidrido " + r + "oso" : "Anhidrido " + r + "ico";
    if (v.length === 3) {
        if (idx === 0) return "Anhidrido hipo" + r + "oso";
        if (idx === 1) return "Anhidrido " + r + "oso";
        return "Anhidrido " + r + "ico";
    }
    if (v.length === 4) {
        if (idx === 0) return "Anhidrido hipo" + r + "oso";
        if (idx === 1) return "Anhidrido " + r + "oso";
        if (idx === 2) return "Anhidrido " + r + "ico";
        return "Anhidrido per" + r + "ico";
    }
    if (v.length === 5) {
        if (idx === 0) return "Anhidrido hipo" + r + "oso";
        if (idx === 1) return "Anhidrido " + r + "oso";
        if (idx === 2) return "Anhidrido " + r + "ico";
        if (idx === 3) return "Anhidrido per" + r + "ico";
        return "Anhidrido " + r + "ico";
    }
    return "---";
}

// ===== IUPAC =====
function getIUPACNM(nm, nMetal, nOxigeno) {
    var pO = prefijosNM[nOxigeno];
    var pM = prefijosNM[nMetal];
    if (nOxigeno === 1 && nMetal === 1) return "Oxido de " + nm.nombre;
    if (nOxigeno === 1) return "Oxido de " + pM + nm.nombre;
    if (nMetal   === 1) return pO + "oxido de " + nm.nombre;
    return pO + "oxido de " + pM + nm.nombre;
}

// ===== STOCK =====
function getStockNM(nm, valencia) {
    if (nm.valencias.length === 1) return "Oxido de " + nm.nombre;
    return "Oxido de " + nm.nombre + " (" + romanosNM[valencia] + ")";
}

// ===== EXPLICACIÓN FÓRMULA → NOMBRE =====
function getExplicacionFNNM(nm, valencia, nMetal, nOxigeno) {
    var txt = "";
    var v   = nm.valencias;
    var idx = v.indexOf(valencia);

    txt += "PASO 1 - Como se forma la formula\n";
    txt += "----------------------------------\n";
    txt += "No metal: " + nm.nombre + " (" + nm.simbolo + ")\n";
    txt += "Valencia del no metal: +" + valencia + "\n";
    txt += "Valencia del oxigeno: siempre -2\n";
    txt += "Para que la carga sea 0 se necesitan:\n";
    txt += "  " + nMetal + " atomo(s) de " + nm.nombre + "\n";
    txt += "  " + nOxigeno + " atomo(s) de oxigeno\n";
    txt += "Formula: " + hacerFormulaNormalNM(nm.simbolo, nMetal, nOxigeno) + "\n\n";

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
    } else if (v.length === 5) {
        var e5 = ["1ra -> hipo...oso", "2da -> ...oso", "3ra -> ...ico", "4ta -> per...ico", "5ta -> ...ico"];
        txt += "  Cinco valencias: hipo...oso / ...oso / ...ico / per...ico / ...ico\n";
        txt += "  Valencia " + valencia + " es la " + e5[idx] + "\n";
    }
    txt += "  Resultado: " + getTradicionalNM(nm, valencia) + "\n\n";

    txt += "IUPAC:\n";
    txt += "  Prefijos segun numero de atomos\n";
    txt += "  " + nOxigeno + " oxigeno(s) -> " + (prefijosNM[nOxigeno] || "") + "oxido" + (nOxigeno === 1 ? " (se omite mono)" : "") + "\n";
    txt += "  " + nMetal + " " + nm.nombre + "(s) -> " + (prefijosNM[nMetal] || "") + nm.nombre + (nMetal === 1 ? " (se omite mono)" : "") + "\n";
    txt += "  Resultado: " + getIUPACNM(nm, nMetal, nOxigeno) + "\n\n";

    txt += "Stock:\n";
    if (nm.valencias.length === 1) {
        txt += "  Una sola valencia -> no se escribe numero romano\n";
    } else {
        txt += "  Se escribe la valencia en numero romano -> (" + romanosNM[valencia] + ")\n";
    }
    txt += "  Resultado: " + getStockNM(nm, valencia);
    return txt;
}

// ===== EXPLICACIÓN NOMBRE → FÓRMULA =====
function getExplicacionNFNM(nm, valencia, nMetal, nOxigeno) {
    var txt = "";
    var v   = nm.valencias;
    var idx = v.indexOf(valencia);

    txt += "PASO 1 - Como identificar el no metal y su valencia\n";
    txt += "---------------------------------------------------\n";
    txt += "Desde el nombre Tradicional:\n";
    txt += "  Busca el prefijo y sufijo del nombre:\n";
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
    } else if (v.length === 5) {
        txt += "  hipo...oso = 1ra valencia (" + v[0] + ")\n";
        txt += "  ...oso     = 2da valencia (" + v[1] + ")\n";
        txt += "  ...ico     = 3ra valencia (" + v[2] + ")\n";
        txt += "  per...ico  = 4ta valencia (" + v[3] + ")\n";
        txt += "  ...ico     = 5ta valencia (" + v[4] + ")\n";
        txt += "  Este compuesto usa valencia: " + valencia + "\n";
    }
    txt += "\n";

    txt += "Desde el nombre IUPAC:\n";
    txt += "  mono(1) di(2) tri(3) tetra(4) penta(5) hexa(6) hepta(7)\n";
    txt += "  " + (prefijosNM[nOxigeno] || "sin prefijo") + "oxido -> " + nOxigeno + " atomo(s) de oxigeno\n";
    txt += "  " + (prefijosNM[nMetal] || "sin prefijo") + nm.nombre + " -> " + nMetal + " atomo(s) de " + nm.nombre + "\n";
    if (nMetal === 1 || nOxigeno === 1) {
        txt += "  Recuerda: si hay 1 atomo se omite mono\n";
    }
    txt += "\n";

    txt += "Desde el nombre Stock:\n";
    if (nm.valencias.length === 1) {
        txt += "  Sin numero romano -> una sola valencia: " + valencia + "\n";
    } else {
        txt += "  El numero romano indica la valencia del no metal\n";
        txt += "  (" + romanosNM[valencia] + ") -> valencia " + valencia + "\n";
    }
    txt += "\n";

    txt += "PASO 2 - Como calcular los subindices\n";
    txt += "--------------------------------------\n";
    txt += "  " + nMetal + " x (+" + valencia + ") = +" + (nMetal * valencia) + "\n";
    txt += "  " + nOxigeno + " x (-2) = -" + (nOxigeno * 2) + "\n";
    txt += "  Suma: " + ((nMetal * valencia) - (nOxigeno * 2)) + " (debe ser 0)\n\n";

    txt += "PASO 3 - Formula final\n";
    txt += "----------------------\n";
    txt += "Formula: " + hacerFormulaNormalNM(nm.simbolo, nMetal, nOxigeno);
    return txt;
}

// ===== NUEVO EJERCICIO =====
function nuevoEjercicioNM() {
    var nm       = noMetales[Math.floor(Math.random() * noMetales.length)];
    var valencia = nm.valencias[Math.floor(Math.random() * nm.valencias.length)];
    var atomos   = calcularAtomosNM(valencia);

    ejercicioNM = {
        nm:            nm,
        valencia:      valencia,
        nMetal:        atomos.nMetal,
        nOxigeno:      atomos.nOxigeno,
        formula:       hacerFormulaNM(nm.simbolo, atomos.nMetal, atomos.nOxigeno),
        formulaNormal: hacerFormulaNormalNM(nm.simbolo, atomos.nMetal, atomos.nOxigeno),
        tradicional:   getTradicionalNM(nm, valencia),
        iupac:         getIUPACNM(nm, atomos.nMetal, atomos.nOxigeno),
        stock:         getStockNM(nm, valencia),
        explicacionFN: getExplicacionFNNM(nm, valencia, atomos.nMetal, atomos.nOxigeno),
        explicacionNF: getExplicacionNFNM(nm, valencia, atomos.nMetal, atomos.nOxigeno)
    };

    document.getElementById("resultado-nm").className = "resultado";
    document.getElementById("resultado-nm").textContent = "";
    document.getElementById("respuestas-correctas-nm").style.display = "none";
    document.getElementById("explicacion-box-nm").style.display = "none";

    if (modoNM === "formula-a-nombre") {
        document.getElementById("pregunta-label-nm").textContent = "Nombra el siguiente compuesto:";
        document.getElementById("formula-display-nm").textContent = ejercicioNM.formula;
        document.getElementById("campos-nombre-nm").style.display = "block";
        document.getElementById("campos-formula-nm").style.display = "none";
        document.getElementById("resp-tradicional-nm").value = "";
        document.getElementById("resp-iupac-nm").value = "";
        document.getElementById("resp-stock-nm").value = "";
    } else {
        document.getElementById("pregunta-label-nm").textContent = "Escribe la formula de:";
        document.getElementById("formula-display-nm").textContent =
            "Tradicional: " + ejercicioNM.tradicional +
            " | IUPAC: "    + ejercicioNM.iupac +
            " | Stock: "    + ejercicioNM.stock;
        document.getElementById("campos-nombre-nm").style.display = "none";
        document.getElementById("campos-formula-nm").style.display = "block";
        document.getElementById("resp-formula-nm").value = "";
    }
}

// ===== VERIFICAR =====
function verificarNM() {
    if (!ejercicioNM) return;

    var div = document.getElementById("resultado-nm");
    totalNM++;
    document.getElementById("total-nm").textContent = totalNM;

    if (modoNM === "formula-a-nombre") {
        var rT = document.getElementById("resp-tradicional-nm").value.trim().toLowerCase();
        var rI = document.getElementById("resp-iupac-nm").value.trim().toLowerCase();
        var rS = document.getElementById("resp-stock-nm").value.trim().toLowerCase();

        var okT = rT === ejercicioNM.tradicional.toLowerCase();
        var okI = rI === ejercicioNM.iupac.toLowerCase();
        var okS = rS === ejercicioNM.stock.toLowerCase();

        if (okT && okI && okS) {
            correctasNM++;
            document.getElementById("correctas-nm").textContent = correctasNM;
            div.className = "resultado correcto";
            div.textContent = "Excelente! Las tres nomenclaturas son correctas.";
        } else {
            incorrectasNM++;
            document.getElementById("incorrectas-nm").textContent = incorrectasNM;
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
            document.getElementById("explicacion-texto-nm").textContent = ejercicioNM.explicacionFN;
            document.getElementById("explicacion-box-nm").style.display = "block";
        }
    } else {
        var rF = document.getElementById("resp-formula-nm").value.trim().toUpperCase();
        var cF = ejercicioNM.formulaNormal.toUpperCase();

        if (rF === cF) {
            correctasNM++;
            document.getElementById("correctas-nm").textContent = correctasNM;
            div.className = "resultado correcto";
            div.textContent = "Correcto! La formula es " + ejercicioNM.formula;
        } else {
            incorrectasNM++;
            document.getElementById("incorrectas-nm").textContent = incorrectasNM;
            div.className = "resultado incorrecto";
            div.textContent = "Incorrecto. Revisa la explicacion abajo.";
            document.getElementById("explicacion-texto-nm").textContent = ejercicioNM.explicacionNF;
            document.getElementById("explicacion-box-nm").style.display = "block";
        }
    }
}

// ===== AYUDA =====
function ayudaNM() {
    if (!ejercicioNM) return;
    document.getElementById("correcta-tradicional-nm").textContent = ejercicioNM.tradicional;
    document.getElementById("correcta-iupac-nm").textContent       = ejercicioNM.iupac;
    document.getElementById("correcta-stock-nm").textContent       = ejercicioNM.stock;
    document.getElementById("correcta-formula-nm").textContent     = ejercicioNM.formulaNormal;
    document.getElementById("respuestas-correctas-nm").style.display = "block";
    if (modoNM === "formula-a-nombre") {
        document.getElementById("explicacion-texto-nm").textContent = ejercicioNM.explicacionFN;
    } else {
        document.getElementById("explicacion-texto-nm").textContent = ejercicioNM.explicacionNF;
    }
    document.getElementById("explicacion-box-nm").style.display = "block";
}

// ===== CAMBIAR MODO =====
function cambiarModoNM(modo, boton) {
    modoNM = modo;
    document.querySelectorAll(".modo-btn").forEach(function(b) {
        b.classList.remove("activo");
    });
    boton.classList.add("activo");
    nuevoEjercicioNM();
}

// ===== INICIAR =====
window.onload = function() {
    nuevoEjercicioNM();
};
