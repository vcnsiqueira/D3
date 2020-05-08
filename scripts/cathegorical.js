let fruit = ['Apples', 'Oranges', 'Grapes', 'Strawberries', 'Kiwis'];
var scale = d3.scaleBand()
    .domain(d3.range(fruit.length))
    .range([0, 500]);