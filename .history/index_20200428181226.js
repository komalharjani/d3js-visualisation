
let dataPath = "data/energy.csv";
d3.csv(dataPath)
        .then(function (data) {

                //Year Boundaries (1990-2018)
                let dateBoundaries = d3.extent(data, function (d) {
                        return parseFloat(d.year);
                });
                console.log(dateBoundaries);

                //Energy Boundaries
                let energyBoundaries = d3.extent(data, function(d){
                        return parseFloat(d.amount);
                });
                console.log(energyBoundaries);

                d3.select("svg")
                .selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                        .attr("width", function(d){
                                return d.amount;
                        })
                        .attr("height",20)
                        .attr("x",50)
                        .attr("y", function(d,i){
                                return i*50 + 50;
                        })
// let svgWidth = 500; 
// let svgHeight = 300;
// let barPadding = 5;
// let barWidth = (svgWidth / data.length);

// let svg = d3.select('svg')
//     .attr("width", svgWidth)
//     .attr("height", svgHeight);

// let barChart = svg.selectAll("rect")
//     .data(data)
//     .enter()
//     .append("rect")
//     .attr("y", function(d){
//         return svgHeight - d;
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
//     .data(data)
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

});