/**
 * Menu a ser usado em todas as páginas
*/

function menuMain(){
    let objetoMenu = '<ul><li><a id="0" href="index.html">HOME</a></li><li><a id="1" href="entradamanual.html">ENTRADA MANUAL</a></li><li><a id="2" href="entradacsv.html">IMPORTAR CSV</a></li><li><a id="3" href="passadas.html">PASSADAS</a></li><li><a id="4" href="resultado.html">RESULTADOS</a></li><li><a id="5" href="licenca.html">LICENÇA</a></li><li><a id="6" href="instrucoes.html">INSTRUÇÕES DE USO</a></li></ul>';
    document.getElementById('div-main-nav').innerHTML = objetoMenu;
    iluminaMenuAtivo();
} // function

function iluminaMenuAtivo(){
    /* Deixa o item de menu ativo iluminado. Isso dá uma orientação ao user */
    let url = window.location.pathname;
    let buscarStr = url.substring(url.length-10);
    //console.log(buscarStr);
    switch(buscarStr){
        case "index.html": // Index
            document.getElementById('0').style.border = "1px solid #8db600";
            break;
        case "anual.html": // Entrada manual
            document.getElementById('1').style.border = "1px solid #8db600";
            break;
        case "dacsv.html": // Importar CSV
            document.getElementById('2').style.border = "1px solid #8db600";
            break;
        case "sadas.html": // Passadas
            document.getElementById('3').style.border = "1px solid #8db600";
            break;
        case "ltado.html": // Resultados
            document.getElementById('4').style.border = "1px solid #8db600";
            break;
        case "cenca.html": // Licença
            document.getElementById('5').style.border = "1px solid #8db600";
            break;
        case "ucoes.html": // Instruções de uso
            document.getElementById('6').style.border = "1px solid #8db600";
            break;
        default:
            window.location.href = "index.html"; // Se não houve escolha, abre o index (e ilumina)
            break;
    }
    
} // function

