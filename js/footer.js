/**
 * Footer a ser usado em todas as páginas
*/

function menuFooter(){
    // Força o footer a ficar no fim da pagina
    const objetoFooterDiv = document.getElementById('div-main-footer');
    let objetoPaginaAltura = document.body.offsetHeight; // latura do documento visível
    let objetoJanelaAltura = window.innerHeight; // altura da janela
    //console.log('altura documento: '+objetoPaginaAltura+' | altura janela: '+objetoJanelaAltura);
 
    // If the content is smaller than the window, push the footer down
 if (objetoPaginaAltura < objetoJanelaAltura) {
    objetoFooterDiv.style.position = 'fixed';
    objetoFooterDiv.style.bottom = '0';
    objetoFooterDiv.style.left = '0';
    objetoFooterDiv.style.width = '100%';
} else {
    objetoFooterDiv.style.position = 'relative';
}


    //objetoFooterDiv.style.top = objetoPaginaAltura+'px';
    // Exibe os elementos
    let objetoFooter = '<div id="div-footer-espacador"><p>Adulanço web</p><p>Versão BETA</p><p>L.A.C</p></div>';
    objetoFooter += '<div id="div-footer-espacador"><img src="assets/logofatec.png" width="80px" title="Feito na Fatec Pompeia" alt="Fatec Pompeia"></div>';
    objetoFooter += '<div id="div-footer-espacador"><img src="assets/cc by-nd.png" width="100px" title="Uso sob licença Creative Common CC BY-ND 4.0" alt="creative commons cc by nd"></div>';
    objetoFooterDiv.innerHTML = objetoFooter;
}