
let dataPath = "data/energy.csv";
d3.csv(dataPath)
        .then(function (data) {

                let finals = [];

                //Filter Data into new object
                for (let i = 0; i < data.length; i++) {
                        if (data[i].region == "Combined" && data[i].year == 1990) {
                                finals.push({
                                        type: data[i].type,
                                        amount: data[i].amount
                                })
                        }
                }
                console.log(finals);

                d3.select("body")
                        .selectAll("p")
                        .data(finals)
                        .enter()
                        .append("p")
                        .text(function (d) {
                                return d.amount;
                        });

                let svgWidth = 500;
                let svgHeight = 300;
                let barPadding = 5;
                let barwidth = (svgWidth / finals.length);

                let svg = d3.select('svg')
                        .attr("width", svgWidth)
                        .attr("height", svgHeight);

                let barChart = svg.selectAll("rect")
                .data(finals)
                .enter()
                .append("rect")
                .attr("y",function(d){
                        return svgHeight - d;
                })
                .attr("height", function(d){
                        return d;
                })
                .attr("width", barwidth - barPadding)
                .attr("transform",function(d,i){
                        let translate = [barwidth*i, 0];
                        return "translate("+translate+")";
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