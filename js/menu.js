/**
 * @preserve
 * Leonardo A. Carrilho
 * Novembro de 2024
 * Versão 1.0
 * Leia a licença de uso em: https://creativecommons.org/licenses/by-nc/4.0/deed.pt-br
 * Released under CC BY-NC 4.0 License
 * @endpreserve
 */
/**
 * Menu a ser usado em todas as páginas
 */

function menuMain(){
    //let objetoMenu = '<ul><a id="0" href="index.html"><li>HOME</li></a><a id="1" href="entradamanual.html"><li>ENTRADA MANUAL</li></a><a id="2" href="entradacsv.html"><li>IMPORTAR CSV</li></a><a id="3" href="passadas.html"><li>PASSADAS</li></a><a id="4" href="resultado.html"><li>RESULTADOS</li></a><a id="5" href="licenca.html"><li>LICENÇA</li></a><a id="6" href="instrucoes.html"><li>INSTRUÇÕES DE USO</li></a></ul>';
    //document.getElementById('div-main-nav').innerHTML = objetoMenu;
    iluminaMenuAtivo();
} // function

function iluminaMenuAtivo(){
    /* Deixa o item do menu ativo iluminado. Isso entrega uma orientação ao user, de qual página está navegando */
    let url = window.location.pathname;
    let buscarStr = url.substring(url.length-10);
    //console.log(buscarStr);
    switch(buscarStr){
        case "index.html": // Index
            document.getElementById('0').style.borderTop = "3px solid var(--laranja)";
            break;
        case "anual.html": // Entrada manual
            document.getElementById('1').style.borderTop = "3px solid var(--laranja)";
            break;
        case "dacsv.html": // Importar CSV
            document.getElementById('2').style.borderTop = "3px solid var(--laranja)";
            break;
        case "sadas.html": // Passadas
            document.getElementById('3').style.borderTop = "3px solid var(--laranja)";
            break;
        case "ltado.html": // Resultados
            document.getElementById('4').style.borderTop = "3px solid var(--laranja)";
            break;
        case "cenca.html": // Licença
            document.getElementById('5').style.borderTop = "3px solid var(--laranja)";
            break;
        case "ucoes.html": // Instruções de uso
            document.getElementById('6').style.borderTop = "3px solid var(--laranja)";
            break;
        //default:
            //window.location.href = "index.html"; // Se não houve escolha, abre o index (e ilumina)
            //break;
    }
    
} // function

