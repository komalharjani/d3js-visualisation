
let dataPath = "data/energy.csv";
d3.csv(dataPath)
        .then(function (data) {

                /**
                 * Year Boundaries
                 * This returns 1990-2018
                 */
                let dateBoundaries = d3.extent(data, function (d) {
                        return parseFloat(d.year);
                });

                /**
                 * Energy Boundaries
                 */
                let energyBoundaries = d3.extent(data, function (d) {
                        return parseFloat(d.amount);
                });

                /**
                 * Grouped By Type
                 */
                let groupType = d3.nest()
                        .key(function (d) {
                                return d.type;
                        })
                        .entries(data);
                console.log(groupType);

                //Average Amount by Type
                var energyAvgType = d3.nest()
                        .key(function (d) { return d.type; })
                        .rollup(function (v) { return d3.mean(v, function (d) { return d.amount; }); })
                        .entries(data);
                console.log(JSON.stringify(energyAvgType));
                for (let i = 0; i < energyAvgType.length; i++) {
                        console.log(Math.floor(energyAvgType[i].value));
                }

                /**
                 * Combined USTOTAL Energy Use split by year
                 */
                let usTotal = d3.nest()
                .key(function(d){
                        if(d.region == "Combined") 
                        { return d.year}
                })
                .entries(data);
                usTotal.shift();
                console.log(usTotal);

                //Group USTotal By Type within each year
                let byYear = d3.nest()
                .key(function(d){
                        if(d.region = "Combined") {
                                return d.year, d.type;
                        }
                })
                .entries(usTotal);
                byYear.shift();
                console.log(byYear);


                //Average Totals by Year -- Final for Bar Chart
                var energyAvgRegion = d3.nest()
                        .key(function (d) { 
                                if(d.region == "Combined") {
                                return d.year; 
                                }
                        })
                        .rollup(function (v) { 
                                return d3.mean(v, function (d) { 
                                        return d.amount; 
                                }); 
                        })
                        .entries(data);
                energyAvgRegion.shift();
                let toJSON = JSON.stringify(energyAvgRegion);
                console.log(toJSON);


                //INSERT BAR CHART HERE

                //INSERT FILTERS
                var svg = d3.select("svg"),
                        margin = 200,
                        width = svg.attr("width") - margin,
                        height = svg.attr("height") - margin;

        });