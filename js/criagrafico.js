function graficoBarra(){
    // recupera os dados do array
    const arrPlanilhaResultado = JSON.parse(localStorage.getItem('tabela'));
    const arrDadosInput = JSON.parse(localStorage.getItem('dadosInput'));
    // Verifica se há dados para exibir o gráfico
    if (arrPlanilhaResultado != undefined){
        let colunaLargura = [];
        let colunaPeso = [];
        let corBarra = [];
        // ********** Eixo X - Largura de aplicação
        for(let i=1; i<=arrDadosInput[0]; i++){
            colunaLargura[i] = arrPlanilhaResultado[i][arrDadosInput[1]+3];
        }
        // ********** Eixo Y - Média/peso
        for(let i=1; i<=arrDadosInput[0]; i++){
            colunaPeso[i] = arrPlanilhaResultado[i][arrDadosInput[1]+2];
        }
        // ********* Cor das barras
        for(let i=1; i<=arrDadosInput[0]; i++){
            // zebra as barras
            if (i%2==0){
                corBarra[i] = "#255000";
            }else{
                corBarra[i] = "#f6a700";
            } // if
        } // for cor

        //////////// Começa aqui \\\\\\\\\\\\\\
        const xValues = colunaLargura;
        const yValues = colunaPeso;
        const barColors = corBarra;

        new Chart("canvasBarra", {
            type: "bar",
            data: {
                labels: xValues, // Labels for the x-axis
                datasets: [{
                    backgroundColor: barColors, // Array of colors for each bar
                    data: yValues // Array of values for the y-axis
                }]
            },
            options: {
                legend: {
                    display: false // Hides the legend
                },
                title: {
                    display: true, // Displays the chart title
                    text: "PERFIL" // Title text
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true, // Displays the x-axis label
                            labelString: 'Largura de aplicação' // Text for x-axis label
                        },
                        ticks: {
                            beginAtZero: true // Optional: starts the x-axis at zero
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true, // Displays the y-axis label
                            labelString: 'Peso' // Text for y-axis label
                        },
                        ticks: {
                            beginAtZero: true // Optional: starts the y-axis at zero
                        }
                    }]
                }
            }
        });
    }else{
        // Não há dados para exibição
        let objetoCanvasBarra = document.getElementById('div-canvas-grafico-barra');
        objetoCanvasBarra.innerHTML = '<h4>Não há dados para exibir o gráfico "PERFIL"</h4><a href="entradamanual.html">Comece clicando aqui.</a>';
    }
    
} // function

function graficoMultiplasLinhas(){
    // recupera os dados do array
    const arrPlanilhaResultado = JSON.parse(localStorage.getItem('tabela'));
    const arrDadosInput = JSON.parse(localStorage.getItem('dadosInput'));
    // Verifica se há dados para exibir o gráfico
    if (arrPlanilhaResultado != undefined){
        const xValues = [100,200,300,400,500,600,700,800,900,1000];

        new Chart("canvasLinhas", {
            type: "line",
            data: {
                labels: xValues,
                datasets: [{ 
                data: [860,1140,1060,1060,1070,1110,1330,2210,7830,2478],
                borderColor: "blue",
                fill: false
                }, { 
                data: [1600,1700,1700,1900,2000,2700,4000,5000,6000,7000],
                borderColor: "red",
                fill: false
                }, { 
                data: [300,700,2000,5000,6000,4000,2000,1000,200,100],
                borderColor: "green",
                fill: false
                }]
            },
            options: {
                legend: {display: true},
                title: {
                    display: true,
                    text: "COEFICIENTE DE VARIAÇÃO"
                }
            }
        });
    }else{
        // Não há dados para exibição
        let objetoCanvasBarra = document.getElementById('div-canvas-grafico-linhas');
        objetoCanvasBarra.innerHTML = '<h4>Não há dados para exibir o gráfico "CV"</h4><a href="entradamanual.html">Comece clicando aqui.</a>';
    }
    
}// function

