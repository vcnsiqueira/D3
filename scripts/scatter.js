// Criando um scatterplot

let scatter_data = [
    [400,200],
    [210,140],
    [722,300],
    [70,160],
    [250,50],
    [110,280],
    [699,225],
    [90,220],
]

/*let scatter_data = [
    {date: '07/01/2017', num: 20},
    {date: '07/02/2017', num: 37},
    {date: '07/03/2017', num: 25},
    {date: '07/04/2017', num: 45},
    {date: '07/05/2017', num: 23},
    {date: '07/06/2017', num: 33},
    {date: '07/07/2017', num: 49},
    {date: '07/08/2017', num: 40},
    {date: '07/09/2017', num: 36},
    {date: '07/10/2017', num: 27},
]*/

let time_parse = d3.timeParse('%m/%d/%Y'); // parseando as datas para o formato JS
let time_format = d3.timeFormat('%e %b') // formato para mostrar na saída

// Loopin para cada data

/* // parseando as datas
scatter_data.forEach((d, i) => {
    scatter_data[i].date = time_parse(d.date);
})*/

let scatter_width = 800;
let scatter_height = 400;
let scatter_padding = 50

// Criando o elemento svg

let scatter_svg = d3.select('#scatterplot')
    .append('svg')
    .attr('width', scatter_width)
    .attr('height', scatter_height);

// Criando as escalas

let x_scale = d3.scaleLinear() // d3.scaleTime() se dados temporais
    .domain([0, d3.max(scatter_data, d => d[0])]) // .domain([d3.min(scatter_data, d => d.date), d3.max(scatter_data, d => d.date)])
    .range([scatter_padding, scatter_width - scatter_padding * 2]);

let y_scale = d3.scaleLinear()
    .domain([0, d3.max(scatter_data, d => d[1])]) // .domain([0, d3.max(scatter_data, d => d.num)]) se data 
    .range([scatter_height - scatter_padding, scatter_padding])

let r_scale = d3.scaleLinear()
    .domain([0, d3.max(scatter_data, d => d[1])])
    .range([5, 30])

let a_scale = d3.scaleSqrt()
    .domain([0, d3.max(scatter_data, d => d[1])])
    .range([0, 25])

// Criando os eixos

let x_axis = d3.axisBottom(x_scale)
    //.ticks(6);
    //.tickValues([0, 150, 250, 600, 700])
scatter_svg.append('g')
    .attr('class', 'x-axis_scatterplot')
    .attr('transform', 'translate(0,' + (scatter_height-scatter_padding) + ')')
    .call(x_axis);

let y_axis = d3.axisLeft(y_scale)
    .ticks(5)
    .tickFormat(d => d + '%') // exemplo de inclusão de % no eixo y
scatter_svg.append('g')
    .attr('class', 'y-axis_scatterplot')
    .attr('transform', 'translate(' + scatter_padding + ',0)')
    .call(y_axis);

// Criando os círculos

scatter_svg.selectAll('circle')
    .data(scatter_data)
    .enter()
    .append('circle')
    .attr('cx', d => x_scale(d[0]))
    .attr('cy', d => y_scale(d[1]))
    .attr('r', d => a_scale(d[1]))
    .attr('fill', '#D1AB0E');

// Criando os rótulos

scatter_svg.append('g').selectAll('text')
    .data(scatter_data)
    .enter()
    .append('text')
    .text(d => d.join(','))
    .attr('x', d => x_scale(d[0]))
    .attr('y', d => y_scale(d[1]));
