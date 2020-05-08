 // Gráfico de barras

let data = [];
let length_data = 30
for(var i = 0; i < length_data; i++) {
    data[i] = Math.floor(d3.randomUniform(1, 50)()); // método do D3 que gera valores uniformes entre 1 e 50)
};

// Criando o elemento svg

let chart_width = 800;
let chart_height = 400;
let bar_padding = 5;
let bar_color = '#7ED36D';

let svg = d3.select('#barchart')
    .append('svg')
    .attr('width', chart_width)
    .attr('height', chart_height);

// Binding data e criando as barras

svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d, i) => i * (chart_width / data.length)) // associando a cada elemento de dados a posição x para o comprimento da div dividido pelo número de elementos multiplicado pelo índice
    .attr('y', d => chart_height - d * 5) // invertendo a posição das barras
    .attr('width', (chart_width / data.length) - bar_padding) // o comprimento de cada barra vai ser do tamanho da div dividida pelo comprimento do conjunto de dados subtraido do padding (para ter espaço entre as barras)
    .attr('height', d => d * 5) // a altura de cada barra vai ser o dado multiplicado por 5
    .attr('fill', bar_color);

// Criando os rótulos

svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(d => d)
    .attr('x', (d, i) => i * (chart_width / data.length) + (chart_width / data.length - bar_padding) / 2) // posicionando o rótulo na posição x correspondente (metade do comprimento da barra)
    .attr('y', d => chart_height - d * 5 - 2) // invertendo a posicionando o rótulo na posição y correspondente
    .attr('font-size', 14) 
    .attr('fill', '#000') // cor preta do texto
    .attr('text-anchor', 'middle'); // o texto ficando centralizado em relação a posição x setada
    

