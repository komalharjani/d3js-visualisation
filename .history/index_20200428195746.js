
let dataPath = "data/energy.csv";
d3.csv(dataPath)
        .then(function (data) {

                //Year Boundaries (1990-2018)
                let dateBoundaries = d3.extent(data, function (d) {
                        return parseFloat(d.year);
                });
                console.log(dateBoundaries);

                //Energy Boundaries
                let energyBoundaries = d3.extent(data, function (d) {
                        return parseFloat(d.amount);
                });
                console.log(energyBoundaries);

                //Group by Type
                let groupType = d3.nest()
                        .key(function (d) {
                                return d.type;
                        })
                        .entries(data);
                console.log(groupType);

                //Averages
                var typeAvg = d3.nest()
                        .key(function (d) { return d.type; })
                        .rollup(function (v) { return d3.mean(v, function (d) { return d.amount; }); })
                        .entries(data);
                console.log(JSON.stringify(typeAvg));
                for (let i = 0; i < typeAvg.length; i++) {
                        console.log(Math.floor(typeAvg[i].value));
                }

                //Group by region
                let groupRegion = d3.nest()
                        .key(function (d) {
                                return d.region;
                        })
                        .entries(data);
                console.log(groupRegion);

                var svg = d3.select("svg"),
                        margin = 200,
                        width = svg.attr("width") - margin,
                        height = svg.attr("height") - margin;


                

        });