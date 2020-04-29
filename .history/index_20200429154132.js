
let dataPath = "data/energy.csv";
d3.csv(dataPath)
        .then(function (data) {

                let finals = [100,10000,100];

                //Filter Data into new object
                // for (let i = 0; i < data.length; i++) {
                //         if (data[i].region == "Combined" && data[i].year == 1990) {
                //                 finals.push({
                //                         type: data[i].type,
                //                         amount: data[i].amount
                //                 })
                //         }
                // }
                console.log(finals);

                let height = 500;
                let barWidth = 100;
                margin = 4;

                let scale = d3.scaleLinear()
                        .domain([d3.min(finals), d3.max(finals)])
                        .range([50, 500]);

                let svg = d3.select("body")
                        .append("svg")
                        .attr("height", height)
                        .attr("width", barWidth * finals.length);

                let g = svg.selectAll("g")
                        .data(finals)
                        .enter()
                        .append("g")
                        .attr("transform", function (d, i) {
                                return "translate(0," + i * barWidth + ")";
                        });

                g.append("rect")
                        .attr("width", function (d) {
                                return scale(d);
                        })
                        .attr("height", barWidth - margin)
                        .attr("fill", '#A64C38');

                g.append("text")
                        .attr("x", function (d) { 
                                return scale(d); 
                        })
                        .attr("y", barWidth / 2)
                        .attr("dy", ".35em")
                        .text(function (d) { 
                                return d; 
                        });


                //let svgWidth = 500;
                let svgHeight = 400;
                let barPadding = 3;
                //let barwidth = (svgWidth / finals.length);




                // let barChart = svg.selectAll("rect") //add rectangles to all data
                //         .data(finals) //provide finals as dataset
                //         .enter()
                //         .append("rect")
                //         .attr("y", function (d) {
                //                 return svgWidth - d.amount;
                //         })
                //         .attr("height", function (d) {
                //                 return d.amount;
                //         })
                //         .attr("width", barwidth - barPadding)
                //         .attr("transform", function (d, i) {
                //                 let translate = [barwidth * i, 0];
                //                 return "translate(" + translate + ")";
                //         })
                //         .attr("fill", '#A64C38');

                // let text = svg.selectAll("text")
                //         .data(finals)
                //         .enter()
                //         .append("text")
                //         .text(function (d) {
                //                 return d;
                //         })
                //         .attr("y", function (d, i) {
                //                 return svgHeight - d.amount - 2;
                //         })
                //         .attr("x", function (d, i) {
                //                 return barwidth * i;
                //         })
        });




        //    /**
        //          * Boundaries
        //          */
        //         let dateBoundaries = d3.extent(data, function (d) {
        //                 return parseFloat(d.year);
        //         });

        //         let energyBoundaries = d3.extent(data, function (d) {
        //                 return parseFloat(d.amount);
        //         });



        //         //Averages (rollup example)
        //         var energyAvgType = d3.nest()
        //                 .key(function (d) {
        //                         return d.type;
        //                 })
        //                 .rollup(function (v) {
        //                         return d3.mean(v, function (d) {
        //                                 return d.amount;
        //                         });
        //                 })
        //                 .entries(data);

        //         /**
        //          * Combined USTOTAL Energy Use split by year, type and energy source
        //          */
        //         let usTotal = d3.nest()
        //                 .key(function (d) {
        //                         return d.type;
        //                 })
        //                 .entries(finals);
        //         usTotal.shift();
        //         console.log(usTotal[0]);