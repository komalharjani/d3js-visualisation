
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


                var xScale = d3.scaleBand().range([0, width]).padding(0.4),
                        yScale = d3.scaleLinear().range([height, 0]);

                var g = svg.append("g")
                        .attr("transform", "translate(" + 100 + "," + 100 + ")");

                xScale.domain(data.map(function (typeAvg) { return typeAvg.value; }));
                console.log(typeAvg.key);
                yScale.domain([0, d3.max(data, function (typeAvg) { return typeAvg.key; })]);

                g.append("g")
                        .attr("transform", "translate(0," + height + ")")
                        .call(d3.axisBottom(xScale));

                g.append("g")
                        .call(d3.axisLeft(yScale).tickFormat(function (d) {
                                return "$" + d;
                        }).ticks(10))
                        .append("text")
                        .attr("y", 6)
                        .attr("dy", "0.71em")
                        .attr("text-anchor", "end")
                        .text("value");

                // //Draw a Rectangle for each group
                // d3.select("svg")
                //         .selectAll("rect")
                //         .data(data)
                //         .enter()
                //         .append("rect")
                //         .attr("width", function (d) {
                //                 return d.amount;
                //         })
                //         .attr("height", 20)
                //         .attr("x", 50)
                //         .attr("y", function (d, i) {
                //                 return i * 50 + 50;
                //         })


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