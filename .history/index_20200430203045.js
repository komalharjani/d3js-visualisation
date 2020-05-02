//1. What the bar chart should represent -- Data
//2. Add CSS - colours
//3. Add Filters
//4. Add Transitions

//1. Average Data
//2. Draw Bar Chart

let dataPath = "data/energy.csv";
d3.csv(dataPath)
        .then(function (data) {

                //Nested Data with all Data Required - need to figure out how to unpack and build bar chart
                var nestedData = d3.nest()
                        .key(function (d) {
                                return d.year;
                        })
                        .key(function (d) {
                                if (d.region != "combined" && d.type == "Total Electric Power Industry") {
                                        return d.region;
                                }
                        })
                        .key(function (d) {
                                if (d.energySrc == "Coal" || d.energySrc == "Petroleum" || d.energySrc == "Natural Gas" || d.energySrc == "Solar Thermal and Photovoltaic") {
                                        return d.energySrc;
                                }
                        })
                        .rollup(function (v) {
                                return {
                                        avg: d3.mean(v, function (d) {
                                                return parseInt(d.amount);
                                        })
                                };
                        })
                        .entries(data);
                console.log(nestedData);
                let nestedDataJSON = JSON.stringify(nestedData);

                var eachPain = d3.values(nestedData)
                .map(function(d){ 
                        return d.values[0].type 
                });
                console.log(eachPain);

                var someInsect = nestedData[0].values[1].values[1].amount;
                console.log(someInsect);
               
                let randomData = [];

                // //Filter Data into new object
                for (let i = 0; i < data.length; i++) {
                        if (data[i].year == 1990 && data[i].region == "west" && data[i].type == "Total Electric Power Industry") {
                                randomData.push({
                                        region: data[i].region,
                                        amount: parseInt(data[i].amount),
                                        type: data[i].energySrc,
                                })
                        }
                }
                console.log(randomData);

                let width = 1000;
                let height = 500;
                let margin = 3;
                let barwidth = (width / nestedData.length);

                //Append to HTML Document
                let svg = d3.select("body")
                        .append("svg")
                        .attr("height", height)
                        .attr("width", width);



                svg.selectAll("body") //add rectangles to all data
                        .data(nestedData) //provide finals as dataset
                        .enter()
                        .append("rect")
                        .attr("class", "bar")
                        .attr("x", function(d){
                                return x(d.key);
                        })
                        .attr("y", function (d) {
                                return height - yscale(d.amount);
                        })
                        .attr("height", function (d) {
                                return yscale(d.amount);
                        })
                        .attr("width", barwidth)
                        .attr("transform", function (d, i) {
                                let translate = [100 + barwidth * i, -30];
                                return "translate(" + translate + ")";
                        })
                        .attr("fill", 'black');;


                /**
                 * Scales and Axis
                 */
                

                let yscale = d3.scaleLinear()
                        .domain([0, d3.max(randomData, d => d.amount)])
                        .range([0, height]);

                let yAxisScale = d3.scaleLinear()
                        .domain([0, d3.max(randomData, d => d.amount)])
                        .range([height, 0]);

                // Y Axis - Number
                let y_axis = d3.axisLeft().scale(yAxisScale);
                svg.append("g")
                        .attr("transform", "translate(100,-30)")
                        .call(y_axis)

                //X Axis - Ordinal
                // let x_axis = d3.axisBottom().scale(xscale);
                // var ordinalScale = d3.scale.ordinal()
                //         .domain(['Alice', 'Bob'])
                //         .range([0, 100]);


                //Barchart
                svg.selectAll("body") //add rectangles to all data
                        .data(randomData) //provide finals as dataset
                        .enter()
                        .append("rect")
                        .attr("y", function (d) {
                                return height - yscale(d.amount);
                        })
                        .attr("height", function (d) {
                                return yscale(d.amount);
                        })
                        .attr("width", barwidth)
                        .attr("transform", function (d, i) {
                                let translate = [100 + barwidth * i, -30];
                                return "translate(" + translate + ")";
                        })
                        .attr("fill", 'black');;

                // Barchart Text
                // let text = svg.selectAll("text")
                //         .data(finals)
                //         .enter()
                //         .append("text")
                //         .text(function (d) {
                //                 return d.amount;
                //         })
                //         .attr("y", function (d, i) {
                //                 return height - xscale(d.amount) - 2;
                //         })
                //         .attr("x", function (d, i) {
                //                 return barwidth * i;
                //         })


        });
