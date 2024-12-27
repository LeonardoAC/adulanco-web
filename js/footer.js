/**
 * @preserve
 * Created by Leonardo A. Carrilho
 * 2024, Nov
 * Version 1.0
 * Leia a licenca de uso em: https://creativecommons.org/licenses/by-nc/4.0/deed.pt-br
 * Released under CC BY-NC 4.0 License
 * @endpreserve
 */
/**
 * Footer a ser usado em todas as páginas
*/

function menuFooter(){
    // Força o footer a ficar no fim da pagina
    const objetoFooterDiv = document.getElementById('div-main-footer');
    //let objetoPaginaAltura = document.body.offsetHeight; // latura do documento visível
    //let objetoJanelaAltura = window.innerHeight; // altura da janela
    //console.log('altura documento: '+objetoPaginaAltura+' | altura janela: '+objetoJanelaAltura);
 
    //objetoFooterDiv.style.top = objetoPaginaAltura+'px';
    // Exibe os elementos
    let objetoFooter = '<div id="div-footer-espacador"><img src="assets/cc_by-nd.webp" width="100px" title="Uso sob licença Creative Common CC BY-ND 4.0" alt="creative commons cc by nd"></div>';
    objetoFooter += '<div id="div-footer-espacador"><p>Adulanço web</p><p>Versão BETA</p><p>L.A.C</p></div>';
    
    objetoFooterDiv.innerHTML = objetoFooter;
}