
let dataPath = "data/energy.csv";
d3.csv(dataPath)
        .then(function (data) {

                /**
                 * Boundaries
                 */
                let dateBoundaries = d3.extent(data, function (d) {
                        return parseFloat(d.year);
                });

                let energyBoundaries = d3.extent(data, function (d) {
                        return parseFloat(d.amount);
                });

                //Averages (rollup example)
                var energyAvgType = d3.nest()
                        .key(function (d) {
                                return d.type;
                        })
                        .rollup(function (v) {
                                return d3.mean(v, function (d) {
                                        return d.amount;
                                });
                        })
                        .entries(data);
                console.log(JSON.stringify(energyAvgType));
                for (let i = 0; i < energyAvgType.length; i++) {
                        console.log(Math.floor(energyAvgType[i].value));
                }

                /**
                 * Combined USTOTAL Energy Use split by year, type and energy source
                 */
                let usTotal = d3.nest()
                        .key(function (d) {
                                if (d.region == "Combined") { return d.year }
                        })
                        .key(function (d) {
                                return d.type;
                        })
                        .key(function (d) {
                                return d.energySrc;
                        })
                        .entries(data);
                usTotal.shift();
                console.log(usTotal);

                //INSERT BAR CHART HERE

                //INSERT FILTERS
                var svg = d3.select("svg"),
                        margin = 200,
                        width = svg.attr("width") - margin,
                        height = svg.attr("height") - margin;

        });