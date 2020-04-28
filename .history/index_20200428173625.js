let dataPath = "data/energy.csv";
d3.csv(dataPath)
        .then(function (data) {
                // for (let i = 0; i < data.length; i++) {
                //         //console.log(data[i].YEAR);
                // }

                //Year Boundaries (1990-2018)
                let extent = d3.extent(data, function (d) {
                        return parseFloat(d.YEAR);
                });
                console.log(extent);

                d3.select("svg")
                .selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                        .attr("width", function(d){
                                return Math.floor(d.GENERATION);
                        })
                        .attr("height",20)
                        .attr("x",50)
                        .attr("y", function(d,i){
                                return i*50 + 50;
                        })
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