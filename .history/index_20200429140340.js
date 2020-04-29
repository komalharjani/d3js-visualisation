
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

                let usTotals = d3.select("body")
                        .data(data.filter(function (d) {
                                if (d.region = "Combined") {
                                        return d.year
                                }
                        }))
                        .enter()
                        .append("rect")
                        .attr("width", 20)
                        .attr("height", 20)
                        .attr("x", 50)
                        .attr("y", function (d, i) {
                                return i * 50 + 50;
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
                console.log(usTotal[0]);

                // var body = d3.select("body")
                //         .selectAll("span")
                //         .data(usTotal)
                //         .enter()
                //         .append("span")
                //         .text(function (d, i) {
                //                 return d.key + "\n"
                //         });

                // //INSERT BAR CHART HERE
                // let svg = d3.select("svg");
                // let rects = svg.selectAll("rect")
                //         .data(usTotal)

                // rects.enter().append("rect").classed("year", true)

                // rects.attr({
                //         x: 100,
                //         y: function (d, i) { return 100 + i * 25 },
                //         width: 20,
                //         height: 20
                // })
        });