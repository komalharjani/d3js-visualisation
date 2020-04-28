d3.csv("/data/energy.csv", function(data) {
        console.log(data.year);
});

// function importData() {
//     d3.json("data/energy-data.json",function() {
//         console.log(data);
//     })
// }

// let dataset = d3.json("data/energy-data.json");

// let svgWidth = 500; 
// let svgHeight = 300;
// let barPadding = 5;
// let barWidth = (svgWidth / dataset.length);

// let svg = d3.select('svg')
//     .attr("width", svgWidth)
//     .attr("height", svgHeight);

// let barChart = svg.selectAll("rect")
//     .data(dataset)
//     .enter()
//     .append("rect")
//     .attr("y", function(d){
//         return svgHeight - d
//     })
//     .attr("height", function(d){
//         return d;
//     })
//     .attr("width",barWidth - barPadding)
//     .attr("transform", function(d, i){
//         let translate = [barWidth*i, 0];
//         return "translate("+ translate +")";
//     });

// let text = svg.selectAll("text")
//     .data(dataset)
//     .enter()
//     .append("text")
//     .text(function(d){
//         return d;
//     })
//     .attr("y", function(d,i){
//         return svgHeight - d - 2;
//     })
//     .attr("x", function(d,i){
//         return barWidth * i; 
//     })
//     .attr("fill", "#A64C38");


// d3.select('body')
//     .selectAll('p')
//     .data(dataset)
//     .enter()
//     .append('p')
//     .text('D3 is awesome');