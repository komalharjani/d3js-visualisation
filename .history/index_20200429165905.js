
let dataPath = "data/energy.csv";
d3.csv(dataPath)
        .then(function (data) {

                let finals = [];

                //Filter Data into new object
                for (let i = 0; i < data.length; i++) {
                        if (data[i].region == "Combined" && data[i].year == 1990) {
                                finals.push({
                                        amount: parseInt(data[i].amount),
                                        type: data[i].type
                                })
                        }
                }
                console.log(finals);

                let width = 500;
                let height = 400;
                let margin = 3;
                let barwidth = (width / finals.length);

                let svg = d3.select("barChart")
                .append("svg")
                .attr("height", height)
                .attr("width", width);

                let xscale = d3.scaleLinear()
                        .domain([0, d3.max(finals, d => d.amount)])
                        .range([0, width]);

                let yscale = d3.scaleBand()
                .domain(data.map(d => d.type))
                .range(0, height);

                let barChart = svg.selectAll("rect") //add rectangles to all data
                        .data(finals) //provide finals as dataset
                        .enter()
                        .append("rect")
                        .attr("y", function(d){
                                return height - xscale(d.amount);
                        })
                        .attr("height", function (d) {
                                return  xscale(d.amount);
                        })
                        .attr("width", barwidth - margin)
                        .attr("transform", function (d, i) {
                                let translate = [barwidth * i, 0];
                                return "translate(" + translate + ")";
                        })
                        .attr("fill", '#A64C38');

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