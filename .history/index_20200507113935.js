
//Import CSV File
let dataPath = "data/energy.csv";
d3.csv(dataPath)
    .then(function (data) {

        /**
         * Nest Data into desired format
         * Year --> Region --> Averages for each energy source
         */
        var nestedData = d3.nest()
            .key(function (d) {
                return d.year;
            })
            .key(function (d) {
                //Take Combined and Split by Regions later
                if (d.region != "combined" && d.type == "Total Electric Power Industry") {
                    return d.region;
                }
            })
            //Nest by energy sources in focus
            .key(function (d) {
                if (d.energySrc == "Coal" || d.energySrc == "Nuclear" || d.energySrc == "Natural Gas" || d.energySrc == "Solar Thermal and Photovoltaic") {
                    return d.energySrc;
                }
            })

            //form Averages for Each Year
            .rollup(function (v) {
                return {
                    avg: d3.mean(v, function (d) {
                        return parseInt(d.amount);
                    })
                };
            })
            .entries(data);

        //Slider Data from Ranges
        let sliderMin = document.getElementById("minYear");
        let sliderMax = document.getElementById("maxYear");
        let minOutput = document.getElementById("minValue");
        let maxOutput = document.getElementById("maxValue");

        //On Slide -- Display Value Start Range
        sliderMin.oninput = function () {
            minOutput.innerHTML = this.value;
        }

        //On Slide -- Display Value End Range
        sliderMax.oninput = function () {
            maxOutput.innerHTML = this.value;
        }

        //Show Legend 
        function showLegend() {
            var x = document.getElementById("legend");
            if (x.style.display === "none") {
                x.transition().duration(5000).ease(d3.easeLinear).style("opacity", 1)
                x.style.display = "block";
            } else {
                x.style.display = "block";
            }
        }


        /**
         * When user submits their desired ranges - the svg is removed and entered again based on updated info 
         */
        let submit = document.getElementById("yearSubmit");
        submit.onclick = function () {
            showLegend();
            d3.select("svg").remove();

            var margin, svg, x0, x1, y, xAxis, yAxis, regionNames, energyNames;

            //Submitted range Values
            let min = document.getElementById("minYear").value;
            let max = parseInt(document.getElementById("maxYear").value);
            //Throw error if end range is before start range
            if (max < min) {
                alert("Please make sure the starting year is before the end year.")
                d3.select("svg").remove();
            }

            //Loop to populate selected years based on user input
            let selectedYear = [];
            for (let j = min; j < max + 1; j++) {
                selectedYear.push(j);
            }

            //This fishes out the values in the nest so that it can be pushed into the array in the correct format
            let filteredData = []; //array to hold final values
            for (let i = 0; i < selectedYear.length; i++) { //for each year selected in range
                nestedData.forEach(function (d) { //d = year 
                    if (d.key == selectedYear[i]) {
                        (d.values).forEach(function (e) { //e = region
                            (e.values).forEach(function (f) { //f = energySrc
                                if (e.key !== "undefined" && f.key !== "undefined") {
                                    filteredData.push({
                                        region: e.key,
                                        year: d.key,
                                        energy: f.key,
                                        avg: f.value.avg,
                                    })
                                }
                            })
                        })
                    }
                });
            }

            //Nest this data by years
            let currData = d3.nest()
                .key(function (d) {
                    console.log("THIS IS: " + d.year);
                    return d.region;
                })
                .entries(filteredData);
            console.log(currData);
            console.log(selectedYear);


            var legendkeys = {
                key0: "Coal",
                key1: "Natural Gas",
                key2: "Nuclear",
                key3: "Solar Thermal and Photovoltaic"
            };

            //size of svg (scale, legend, and bar graph)
            margin = { top: 20, right: 20, bottom: 30, left: 100 },
                width = 1000 - margin.left - margin.right,
                height = 400 - margin.top - margin.bottom;

            regionNames = currData.map(function (d) { return d.key; }); //region names
            energyNames = currData[0].values.map(function (d) { return d.energy; }); //energy names

            //Scales for the axis
            x0 = d3.scaleBand().rangeRound([0, width], 445);
            x1 = d3.scaleBand();
            y = d3.scaleLinear().rangeRound([height, 10]);

            //X-Axis values mapped
            xAxis = d3.axisBottom().scale(x0)
                .tickFormat(currData.key)
                .tickValues(currData.map(d => d.key));
            yAxis = d3.axisLeft().scale(y);
            //const color = d3.scaleOrdinal(d3.schemeCategory10); //color of bars
            const color = d3.scaleOrdinal().range(["#ca0020", "#f4a582", "#d5d5d5", "#92c5de", "#0571b0"]);

            //bar graph
            svg = d3.select('body').append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // Add X axis label:
            svg.append("text")
                .attr("text-anchor", "end")
                .attr("x", width)
                .attr("y", height + 20)
                .text("X axis title");

            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .attr("class", "axis axis--x")

            svg.append("g")
                .attr("class", "axis axis--y")



            svg.select('.y').transition().duration(500).delay(1300).style('opacity', '1');




            var durations = 1000
            var afterLoad = () => durations = 750;

            updateGraph();

            //UPDATES THE GRAPH
            //update graph per selectedYear
            function updateGraph() {

                var data = currData;

                /*
                //put data chosen here
                data = d3.select('#selection')
                .property('value') == "First" ? data_set : data_set2
                */

                var slice = svg.selectAll(".slice")
                    .data(currData);


                //region name spacing control
                x0.domain(regionNames);
                x1.domain(energyNames).rangeRound([0, x0.bandwidth(), 10]);//location of energy name
                y.domain([0, d3.max(currData, function (key) { return d3.max(key.values, function (d) { return d.avg; }); })]);

                //REMOVE If not figured
                // Call the X axis to transition
                svg.selectAll(".axis.axis--x").transition()
                    .duration(durations)
                    .call(xAxis);

                //REMOVE if not figured
                // Call the Y axis to transition
                svg.selectAll(".axis.axis--y").transition()
                    .duration(durations)
                    .call(yAxis);

                //gathers data of all 5 regions and displays by selectedYear
                slice = slice
                    .enter()
                    .append("g")
                    .attr("class", "slice") //change slice back to "g"
                    .attr("transform", function (d) { return "translate(" + x0(d.key) + ",0)"; }) //gather next 4 regions
                    .merge(slice);


                //REMOVE if not figured out
                //Attempt to make smooth transition from graph to new graph
                slice.transition()
                    .duration(durations)
                    .attr("bX1", function (d) { return x0(d.key) }) //d.currData displays next height x
                    .attr("bX2", function (d) { return x1(d.key) })//d.currData displays next height x2
                    .attr("bY", function (d) { return y(d.key) }) //d.currData displays next height y



                //set rectangle spacing here
                slice.selectAll("rect")
                    .data(function (d) { return d.values; })
                    .enter().append("rect")
                    .attr("width", x1.bandwidth())
                    .attr("x", function (d) { return x1(d.energy); })
                    .style("fill", function (d) { return color(d.energy) })
                    .attr("y", function (d) { return y(0); })
                    .attr("height", function (d) { return height - y(0); })
                    .on("mouseover", function (d) {
                        d3.select(this).style("fill", d3.rgb(color(d.energy)).darker(2));
                    })
                    .on("mouseout", function (d) {
                        d3.select(this).style("fill", color(d.energy));
                    });


                //render new graph on after removal of previous
                slice.selectAll("rect")
                    .transition()
                    .delay(function (d) { return Math.random() * 1000; })
                    .duration(durations)
                    .attr("y", function (d) { return y(d.avg); })
                    .attr("height", function (d) { return height - y(d.avg); });


            }
            afterLoad();
        }

    });