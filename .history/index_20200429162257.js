import scaleBand from 'd3';
let dataPath = "data/energy.csv";
d3.csv(dataPath)
        .then(function (data) {

                let finals = [];

                //Filter Data into new object
                for (let i = 0; i < data.length; i++) {
                        if (data[i].region == "Combined" && data[i].year == 1990) {
                                finals.push({
                                        amount:parseInt(data[i].amount),
                                        type: data[i].type
                                })
                        }
                }
                console.log(finals);

                let width = 500;
                let height = 400;
                let margin = 3;
                let barwidth = (width / finals.length);

                let svg = d3.select("body")
                .append("svg")
                .attr("height", height)
                .attr("width", width);

                let xscale = d3.scaleLinear()
                        .domain([0, d3.max(finals, d => d.amount)])
                        .range([0, width]);

                let yscale = scaleBand()
                .domain(finals.map(d => d.type));
                //.range();

                console.log(yscale.domain);
            

                let barChart = svg.selectAll("rect") //add rectangles to all data
                        .data(finals) //provide finals as dataset
                        .enter()
                        .append("rect")
                        .attr("height", 300)
                        .attr("width", d => xscale(d.amount))
                        .attr("transform", function (d, i) {
                                let translate = [barwidth * i, 0];
                                return "translate(" + translate + ")";
                        })
                        .attr("fill", '#A64C38');

                let text = svg.selectAll("text")
                        .data(finals)
                        .enter()
                        .append("text")
                        .text(function (d) {
                                return d.amount;
                        })
                        .attr("y", function (d, i) {
                                return height - d.amount - 2;
                        })
                        .attr("x", function (d, i) {
                                return barwidth * i;
                        })
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