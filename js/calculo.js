/**
 * @preserve
 * Created by Leonardo A. Carrilho
 * 2024, Nov
 * Version 1.0
 * Leia a licenca de uso em: https://creativecommons.org/licenses/by-nc/4.0/deed.pt-br
 * Released under CC BY-NC 4.0 License
 * @endpreserve
 */
function validaCampos(){
    /* Verifica se há valores digitados nos campos e se atendem aos tipos requeridos */
    const elementoInput = document.querySelectorAll('#form-entrada-manual input[type="text"]');
    const elementoRadio = document.querySelectorAll('#form-entrada-manual input[type="radio"]');
    // Flag indica se prossegue para cálculo ou continua a pedir valores corretos nos campos
    let flagContinua = true;
    // confere se está vazio ou se nao é um número nos inputs de texto
    for(let i = 0; i < elementoInput.length; i++){
        elementoInput[i].style.backgroundColor = '#ffffff'; // reseta cor dos campos
        if (elementoInput[i].value == "" || elementoInput[i].value.trim === "" || isNaN(Number(elementoInput[i].value))){
            //console.log('Valor incorreto: ' + elementoInput[i].id);
            elementoInput[i].style.backgroundColor = '#fed353'; // campo incorreto fica em evidencia
            flagContinua = false;
        }//if
    }
    if (Number(elementoInput[1].value) > 10){
        alert('ALERTA: Qtde de repetições execede o limite!');
        flagContinua = false;
    }

    // Confere se o input radio está checado (par ou ímpar)
    if (!elementoRadio[0].checked && !elementoRadio[1].checked){
        //console.log('Par/Ímpar não checado');
        flagContinua = false;
        alert('ALERTA: Par/ímpar não selecionado!');
    }
    if (flagContinua == false){
        alert('ALERTA: Campos vazios ou com preenchimento incorreto!');
    }
    return flagContinua;
} // function

function funcCalcularDados(){
    // Cria a tabela 
    var arrPlanilhaResultado = []; // Cria um array multidimensional
    let qtdeColetores, qtdeRepeticoes, qtdePassadas, coletorCentral;
    let bitola;
    let larguraPneu;
    let nColetorCentral;
    qtdeColetores    = Number(document.getElementById('txtQtdeColetores').value);
    qtdeRepeticoes   = Number(document.getElementById('txtQtdeRepeticoes').value);
    qtdePassadas     = Number(document.getElementById('txtQtdePassadas').value);
    //coletorCentral   = document.getElementById('radioParImpar').value;
    bitola           = Number(document.getElementById('txtBitola').value);
    larguraPneu      = Number(document.getElementById('txtLarguraPneu').value);
    nColetorCentral   = Number(document.getElementById('txtNumColetorCentral').value);
    // Inicializa o array
    for(let i=0; i<qtdeColetores; i++){
        arrPlanilhaResultado[i] = []; // Inicializa novas linhas
        for(let j=0; j<(qtdeRepeticoes+8); j++){
            arrPlanilhaResultado[i][j] = 0; // Preenche com zeros
        } // j
    } // i
    //console.table(arrPlanilhaResultado);

    // Verifica se os valores informados nos campos são válidos
    if (validaCampos()){
        // Alimenta o array multidimensional
        let total, indexJ;
        // Cria o cabeçalho da tabela
        arrPlanilhaResultado[0][0] = "Coletor";
        for (let i = 1; i <= qtdeRepeticoes; i++){
            arrPlanilhaResultado[0][i] = "Rep "+i;
        }
        arrPlanilhaResultado[0][qtdeRepeticoes+1] = "Total";
        arrPlanilhaResultado[0][qtdeRepeticoes+2] = "Média";
        //arrPlanilhaResultado[0][qtdeRepeticoes+3] = "Peso";
        arrPlanilhaResultado[0][qtdeRepeticoes+3] = "Largura aplicação";
        arrPlanilhaResultado[0][qtdeRepeticoes+4] = "Alternado direito";
        arrPlanilhaResultado[0][qtdeRepeticoes+5] = "Alternado esquerdo";
        arrPlanilhaResultado[0][qtdeRepeticoes+6] = "Contínuo";
        // Valores da tabela
        for (let i = 1; i <= qtdeColetores; i++){
            indexJ  = 0;
            total   = 0;
            // Cria uma linha para cada coletor (qtde) informado
            arrPlanilhaResultado[i] = []; // Inicializa nova linha no array
            arrPlanilhaResultado[i][0] = 'Col. '+i; // Recebe a string com o contador (i)
            // Pega os dados digitados pelo user
            for (let j=1; j<=qtdeRepeticoes; j++){
                arrPlanilhaResultado[i][j] = Number(document.getElementById('txtC'+i+'R'+j).value); // Valores digitados pelo user
                total += arrPlanilhaResultado[i][j]; // Soma das colunas repetição
                indexJ = j; // Pega a ultima posicao do J
            } // for j
            /*
                Onde se encaixa esta fórmula?
                Pas1 = ColC - Round(0.1 + ((bitola + 2 * larguraPneu ) / 2)) + 1
                Pas2 = ColC + Number((bitola + 2 * larguraPneu) / 2)            
            */
            arrPlanilhaResultado[i][indexJ+1] = Number(total).toFixed(3); // Total
            arrPlanilhaResultado[i][indexJ+2] = Number(total/qtdeRepeticoes).toFixed(3); // Média
            arrPlanilhaResultado[i][indexJ+3] = Number((bitola*i)/100).toFixed(2); // Bitola - largura da aplicação
            arrPlanilhaResultado[i][indexJ+4] = 'AD '+i; // Alternado direito
            arrPlanilhaResultado[i][indexJ+5] = 'AE '+i; // Alternado esquerdo
            arrPlanilhaResultado[i][indexJ+6] = 'Cont. '+i; // Contínuo
        }; //for i
        //console.table(arrPlanilhaResultado);
         // Armazena o array ,localmente, para ser usado por outras páginas
        localStorage.setItem('tabela', JSON.stringify(arrPlanilhaResultado));
        let arrDadosInput = [qtdeColetores, qtdeRepeticoes, qtdePassadas, coletorCentral, bitola, larguraPneu];
        localStorage.setItem('dadosInput', JSON.stringify(arrDadosInput));
        // Redireciona para a página de resultado e gráficos
        window.location.href = "resultado.html";
    } // if
} //function   

function exibePlanilhaResultado(){
    // Exibe a planilha de resultado em HTML
    // recupera os dados do array
    const arrPlanilhaResultado = JSON.parse(localStorage.getItem('tabela'));
    console.table(arrPlanilhaResultado);
    const arrDadosInput = JSON.parse(localStorage.getItem('dadosInput'));
    /*  Valores do array:
        arrDadosInput[0] => Quantidade de coletores;
        arrDadosInput[1] => Quantidade de repetições;
        arrDadosInput[2] => Quantidade de passadas;
        arrDadosInput[3] => Bitola;
        arrDadosInput[4] => Largura do pneu;    
        arrDadosInput[5] => Número do coletor central;
    */
    if (arrPlanilhaResultado != undefined){
        // TABELA
        outptHTML = '<table id="tb-resultado" class="tb-resultado">';
        outptHTML += '<tr>';
        outptHTML += '    <th>Coletor</th>';
        // CABEÇALHO
        for (let i = 1; i <= arrDadosInput[1]; i++){ //'qtdeRepeticoes'
            outptHTML += '    <th>Rep. '+i+'</th>';}
        outptHTML += '    <th>Total</th>';
        outptHTML += '    <th>Média/Peso</th>';
        outptHTML += '    <th>Largura aplicação</th>';
        outptHTML += '    <th>Alternado direito</th>';
        outptHTML += '    <th>Alternado esquerdo</th>';
        outptHTML += '    <th>Contínuo</th>';
        outptHTML += '</tr>';
        // LINHAS
        for (let i = 1; i <= arrDadosInput[0]; i++){ //'qtdeColetores'
            // cria as linhas da tabela
            outptHTML += '<tr>';
            outptHTML += '  <td>col. '+i+'</td>';
            for(j = 1; j <= arrDadosInput[1]; j++){ //'qtdeRepeticoes'
                // Cria as colunas "Repetições"
                outptHTML += '  <td>'+arrPlanilhaResultado[i][j]+'</td>';
            } // for j
            outptHTML += '  <td>'+arrPlanilhaResultado[i][arrDadosInput[1]+1]+'</td>'; // Total
            outptHTML += '  <td>'+arrPlanilhaResultado[i][arrDadosInput[1]+2]+' g</td>'; // Média/peso
            outptHTML += '  <td>'+arrPlanilhaResultado[i][arrDadosInput[1]+3]+' m</td>'; // Largura aplicação
            outptHTML += '  <td>'+arrPlanilhaResultado[i][arrDadosInput[1]+4]+'</td>'; // Alternado direito
            outptHTML += '  <td>'+arrPlanilhaResultado[i][arrDadosInput[1]+5]+'</td>'; // Alternado esquerdo
            outptHTML += '  <td>'+arrPlanilhaResultado[i][arrDadosInput[1]+6]+'</td>'; // Contínuo
        }; //for i
        outptHTML += '  </tr>';
        outptHTML += '</table>';
        //let paginaResultado = window. open('resultado.html');
        //paginaResultado.document.write(outptHTML);
        // Exibe a tabela na DIV
        document.getElementById('div-resultado-tabela').innerHTML = outptHTML;
        //document.write(outptHTML);
    } // if
}

function criaTemplateCSVParaDownload(){
    /**
     * Cria o arquivo CSV de acordo com os parâmetros passados
     */
    var arrTemplate = []; // Cria um array multidimensional
    let qtdeColetores, qtdeRepeticoes, qtdePassadas, coletorCentral;
    let bitola;
    let larguraPneu;
    let nColetorCentral;
    var dados; // dados do template
    qtdeColetores    = Number(document.getElementById('txtQtdeColetores').value);
    qtdeRepeticoes   = Number(document.getElementById('txtQtdeRepeticoes').value);
    qtdePassadas     = Number(document.getElementById('txtQtdePassadas').value);
    //coletorCentral   = document.getElementById('radioParImpar').value;
    bitola           = Number(document.getElementById('txtBitola').value);
    larguraPneu      = Number(document.getElementById('txtLarguraPneu').value);
    nColetorCentral   = Number(document.getElementById('txtNumColetorCentral').value);
    // Inicializa o array
    for(let i=0; i<qtdeColetores; i++){
        arrTemplate[i] = []; // Inicializa novas linhas
        for(let j=0; j<(qtdeRepeticoes+8); j++){
            arrTemplate[i][j] = 0; // Preenche com zeros
        } // j
    } // i
    dados = 'Coletor;';
    // cria o cabeçalho
    for(let i=0; i<qtdeRepeticoes; i++){
        dados += 'Rep. '+(i+1)+';';
    }
    dados += 'Qtde passadas;Bitola;Largura pneu;Num do coletor central;Coletor central'; // cabeçalho do arquivo
    // Preenche linha-a-linha
    for(let i=1; i<=qtdeColetores; i++){
        dados += '\r\n'; // Pula linha
        dados += 'Col. '+i+';'; // Coluna A
        for(let j=0; j<qtdeRepeticoes; j++){
            // Colunas "repetições"  dentro da linha i
            dados += ";"; // Valor deve ser vazio, para o user preencher
        } // for j
        dados += qtdePassadas+';';
        dados += bitola+';';
        dados += larguraPneu+';';
        dados += nColetorCentral+';';
        dados += 'P';
    } // for i
    let ancora = document.createElement('a');
    ancora.href = 'data:text/csv;charset=utf-8,' + encodeURI(dados); // link do download com o arquivo
    ancora.target = '_blank'; // abre em nova página
    ancora.download = 'AdulancoWebTemplate'+Date.now(); // nome do arquivo CSV
    ancora.click(); // dispara o download
    /**
     * Abrirá uma caixa de diálogo "Salvar em" (no Windows), contendo o nome e extensão do arquivo.
     * O user deevrá preencher somente as colunas das repetições, salvar com a mesma extensão e fazer upload.
     * Obs: Na verdade, não há o upload de arquivo. O app lê o CSV e alimenta os campos automaticamente.
     * Nenhum arquivo é enviado para o servidor remoto.
     */
    window.location.href = 'entradacsv.html'; // abre a página de upload
}

function leiaCSV(){
    // Le o arquivo CSV
    const input = document.getElementById('input-arquivo-csv');
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            mostraCSV(content);
        };
        reader.readAsText(file);
    } else {
        alert('Selecione o arquivo CSV');
    }
} // leiaCSV

function mostraCSV(content){
    const rows = content.split('\n');
    let table = '<table id=""><tr>';

    // Build table headers from the first row
    const headers = rows[0].split(',');
    headers.forEach(header => table += `<th>${header.trim()}</th>`);
    table += '</tr><tbody>';

    // Build table rows from the remaining rows
    rows.slice(1).forEach(row => {
        const cells = row.split(',');
        table += '<tr>';
        cells.forEach(cell => table += `<td>${cell.trim()}</td>`);
        table += '</tr>';
    });

    table += '</tbody></table>';
    document.getElementById('div-output-csv').innerHTML = table;
} // mostraCSV

function criaCamposDinamicosParaUserDigitarDados(){
    /* na página entradamanual, cria a qtde de linhas e colunas necessárias para o user entrar com os dados */
    if (validaCampos()){
        let qtdeColetores;
        let qtdeRepeticoes;
        qtdeColetores    = Number(document.getElementById('txtQtdeColetores').value);
        qtdeRepeticoes   = Number(document.getElementById('txtQtdeRepeticoes').value);
        let objetoTabela = '';
        objetoTabela = '<table id="tb-digitar-dados" class="tb-resultado"><tr><th>Coletores</th>';
        for(let i=1; i<=qtdeRepeticoes; i++){
            // Forma o cabeçalho da tabela: Coletor, Rep.1, Rep.2...
            objetoTabela += '<th>Repet. '+i+'</th>';
        } // i
        objetoTabela += '</tr><tr>';
        // Cria as linhas para a digitação do user
        // i Começa do 1 pq o zero é o cabeçalho
        // j começa do 1 pq o zero é a coluna "coletor"
        for(let i=1; i<=qtdeColetores; i++){
            objetoTabela += '<td>Col. '+i+'</td>';
            for(let j=1; j<=qtdeRepeticoes; j++){
                // Campos das colunas repetições (C = coletor R = repetição)
                objetoTabela += '<td><input type="text" id="txtC'+i+'R'+j+'" value=""></td>';
            } // j
            objetoTabela += '</tr><tr>';
        } // i
        objetoTabela += '</tr></table>'; // fecha a tabela
        document.getElementById('div-fieldset-entrada-digitacao').innerHTML = objetoTabela; // "escreve" a tabela
        document.getElementById('fieldset-entrada-digitacao').style.display = 'block'; // exibe o fieldset com a tabela
    } // if
} // function

function habilitaDesabilitaBotaoDeletarTabela(){
    // Habilita ou desabilita o botão de deletar tabela, conforme o estado da trava de segurança (checkbox)
    let objetoBtn = document.getElementById('btnDeletarTabela');
    let objetoCheckBox = document.getElementById('cbHabilitaDelete');
    if (objetoCheckBox.checked)
        objetoBtn.removeAttribute("disabled"); // habilita o botao delete
    else
        objetoBtn.setAttribute('disabled', true); // desabilita o botao delete
}   // function

function removeElementoFilhoHTML(idElementoPai, idElementoFilho){
    //console.log(document.getElementById(idElementoPai)); 
    //console.log(document.getElementById(idElementoFilho)); 
    //document.getElementById(idElementoPai).remove(idElementoFilho);
    document.getElementById(idElementoPai).innerHTML = "";
    habilitaDesabilitaBotaoDeletarTabela();
    document.getElementById('fieldset-entrada-digitacao').style.display = 'none';
    // Limpa os campos
    document.getElementById('txtQtdeColetores').value = "";
    document.getElementById('txtQtdeRepeticoes').value = "";
    document.getElementById('txtQtdePassadas').value = "";
    document.getElementById('txtBitola').value = "";
    document.getElementById('txtLarguraPneu').value = "";
    document.getElementById('txtNumColetorCentral').value = "";
} // function

function calculaCV(){
    /** 
     * Calcula o Coeficiente de Variação (CV) entre o "peso (grama)" e "larg. aplicação (metros)"
     * Fórmula: CV = (s/x)*100
     * Onde: 
     * s = Desvio padrão
     * x = Média dos dados 
    */

}

function calculaDesvioPadrao(){
    /**
     * Calcula o Desvio Padrão
     * Fórmula: Sqrt(variância)
     * Onde: 
     * Sqrt é a raiz quadrada
     *  Variância retornará de outra função
     */

}

function calculaVariancia(){
    /**
     * Calcula a Variância
     * Fórmula: (Sigma i=1 até n (elemento(i) - média)^2 ) / n
     * Onde:
     * Sigma é a somatória de i até n
     * n = número total de coletores
     * média = 
     */

}
