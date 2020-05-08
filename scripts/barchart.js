// Dados

let barchart_data = [6,20,21,14,2,30,7,16,25,5,11,28,10,26,9];

// Canvas

let barchart_width = 800;
let barchart_height = 400;

// Criando o elemento svg na div

let barchart_svg = d3.select('#new_barchart')
    .append('svg')
    .attr('width', barchart_width)
    .attr('height', barchart_height);


// Função para renderizar o gráfico

let render_bar = (data, svg) => {
    
    svg.selectAll("rect").remove();
    svg.selectAll("text").remove();

    // Criando as escalas
    
    let scala_x = d3.scaleBand() // setando uma escala ordinal para o eixo-x
        .domain(d3.range(data.length)) // passando as posições como domínio
        .rangeRound([0, barchart_width]) // utilizando as informações de comprimento para ajuste do gráfico
        .paddingInner(0.05); // incluindo uma separação entre a escala de 5%

    let scala_y = d3.scaleLinear() // setando uma escala linear para o eixo-y
        .domain([0, d3.max(data)]) // setamdo o domínio como sendo o intervalo [0, max(dados)]
        .range([0, 0.9*barchart_height]);
    
    // Criando os retângulos
    
    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d, i) => scala_x(i)) // setando a posição x para o índice definido na escala
        .attr('y', d => barchart_height - scala_y(d)) // setando a posição y para o tamanho - a escala y
        .attr('width', scala_x.bandwidth()) // comprimento dos retângulos sendo o comprimento de banda
        .attr('height', d => scala_y(d)) // altura dos 
        .attr('fill', '#7ED26D');
    
    // Criando os rótulos de dados

    svg.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .text((d) => d)
        .attr('x', (d,i) => scala_x(i) + scala_x.bandwidth()/2)
        .attr('y', d => barchart_height - scala_y(d) + 15)
        .attr('font-size', 14)
        .attr('fill', '#FFF')
        .attr('text-anchor', 'middle');    
}

render_bar(barchart_data, barchart_svg);

// Eventos de clique


d3.select('#reverte').on('click', () => {
    barchart_data.reverse();
    render_bar(barchart_data, barchart_svg);
})

d3.select('#aleatorio').on('click', () => {
    let n = d3.randomUniform(1, 50)();
    barchart_data = []
    for(var i = 0; i < n; i++) {
        barchart_data[i] = Math.floor(Math.random(n) * 50)
    }
    render_bar(barchart_data, barchart_svg);
})