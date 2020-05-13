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

    //svg.selectAll("rect").remove();
    //svg.selectAll("text").remove();

    // Criando as escalas
    
    let scala_x = d3.scaleBand() // setando uma escala ordinal para o eixo-x
        .domain(d3.range(data.length)) // passando as posições como domínio
        .rangeRound([0, barchart_width]) // utilizando as informações de comprimento para ajuste do gráfico
        .paddingInner(0.05); // incluindo uma separação entre a escala de 5%

    let scala_y = d3.scaleLinear() // setando uma escala linear para o eixo-y
        .domain([0, d3.max(data)]) // setando o domínio como sendo o intervalo [0, max(dados)]
        
    if(Math.max(...barchart_data) != 0) {
        scala_y.range([0,0.9*barchart_height]); // setando a saída pra utilizar apenas até 90% da altura da div
    } else {
        scala_y.range([0,0.01]);  
    }
    
    // Criando os retângulos
    
    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d, i) => scala_x(i)) // setando a posição x para o índice definido na escala
        .attr('y', d => barchart_height - scala_y(d)) // setando a posição y para o tamanho - a escala y
        .attr('width', scala_x.bandwidth()) // comprimento dos retângulos sendo o comprimento de banda
        .attr('height', d => scala_y(d)) // altura dos retângulos
        .attr('fill', '#7ED26D'); 
    
    // Criando os rótulos de dados

    svg.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .text((d) => d)
        .attr('x', (d,i) => scala_x(i) + scala_x.bandwidth()/2) // Posição x do texto no meio do retângulo
        .attr('y', d => barchart_height - scala_y(d) + 15) // Posição y do texto pouco abaixo do fim da barra (dentro)
        .attr('font-size', 14)
        .attr('fill', '#FFF')
        .attr('text-anchor', 'middle');

    return({
        scala_x: scala_x, 
        scala_y: scala_y, 
        svg: svg
    });

}

let bar = render_bar(barchart_data, barchart_svg);

// Eventos de clique


d3.select('#reverte').on('click', () => {
    barchart_data.reverse();
    
    bar.svg.selectAll('rect')
        .data(barchart_data)
        .transition()
        .delay(100)
        .duration(1000)
        .ease(d3.easeElasticOut)
        .attr('y', d => chart_height - bar.scala_y(d))
        .attr('height', d => bar.scala_y(d))

    bar.svg.selectAll('text')
        .data(barchart_data)
        .transition()
        .delay(100)
        .duration(1000)
        .ease(d3.easeElasticOut)
        .text(d => d)
        .attr('x', (d, i) => bar.scala_x(i) + bar.scala_x.bandwidth()/2)
        .attr('y', d => chart_height - bar.scala_y(d) + 15);
})

d3.select('#aleatorio').on('click', () => {
    let n = d3.randomUniform(2, 50)();
    barchart_data = []
    for(var i = 0; i < n; i++) {
        barchart_data[i] = Math.floor(Math.random(n) * 50)
    }
    console.log(barchart_data)
    console.log(barchart_data.length)
    barchart_svg.selectAll("rect").remove(); // remove os retângulos existentes antes de criar um novo gráfico
    barchart_svg.selectAll("text").remove(); // remove os textos existentes antes de criar um novo gráfico
    bar = render_bar(barchart_data, barchart_svg);
    
    bar.svg.selectAll('rect') // atribuindo alturas e posições nulas para os retângulos antes de fazer a animação
        .attr('y', d => barchart_height)
        .attr('height', d => 0);

    bar.svg.selectAll('text') // atribuindo alturas e posições nulas para os textos antes de fazer a animação
        .attr('y', d => barchart_height)
        .attr('height', d=> 0);
    
    bar.svg.selectAll('rect')
        .data(barchart_data)
        .transition()
        .delay(100)
        .duration(1000)
        .ease(d3.easeElasticOut)
        .attr('y', d => chart_height - bar.scala_y(d))
        .attr('height', d => bar.scala_y(d))

    bar.svg.selectAll('text')
        .data(barchart_data)
        .transition()
        .delay(100)
        .duration(1000)
        .ease(d3.easeElasticOut)
        .text(d => d)
        .attr('x', (d, i) => bar.scala_x(i) + bar.scala_x.bandwidth()/2)
        .attr('y', d => chart_height - bar.scala_y(d) + 15);
    
})