
let dataPath = "data/energy.csv";
d3.csv(dataPath)
        .then(function (data) {

                /**
                 * Year Boundaries
                 */
                let dateBoundaries = d3.extent(data, function (d) {
                        return parseFloat(d.year);
                });
                console.log(dateBoundaries);

                /**
                 * Energy Boundaries for Scaling
                 */
                let energyBoundaries = d3.extent(data, function (d) {
                        return parseFloat(d.amount);
                });
                console.log(energyBoundaries);

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
                 * Combined USTOTAL Energy Use
                 * Delete "undefined"
                 */
                let groupRegion = d3.nest()
                        .key(function (d) {
                                if(d.region === "Combined") {
                                return d.region;
                                }
                        })
                        .entries(data);
                //let usTotal = groupRegion[1]; //without undefined
                //console.log(usTotal); //split by type

                let groupByYear = d3.nest()
                .key(function(d){
                        if(d.region == "Combined") 
                        { return d.year}
                })
                .entries(data);
                console.log(groupByYear);
                delete groupByYear[0];
                console.log(groupByYear);
                groupByYear.shift();

                //Average Amount by Region
                var energyAvgRegion = d3.nest()
                        .key(function (d) { return d.region; })
                        .rollup(function (v) { return d3.mean(v, function (d) { return d.amount; }); })
                        .entries(data);
                let toJSON = JSON.stringify(energyAvgRegion);
                console.log(toJSON);

                //INSERT BAR CHART HERE

                //INSERT FILTERS
                var svg = d3.select("svg"),
                        margin = 200,
                        width = svg.attr("width") - margin,
                        height = svg.attr("height") - margin;

        });