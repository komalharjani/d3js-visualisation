
let dataPath = "data/energy.csv";
d3.csv(dataPath)
    .then(function (data) {

        //Nest Data into desired Format --> YEAR --> Region --> EnergySrc, Averages for Each EnergySrc
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
                if (d.energySrc == "Coal" || d.energySrc == "Nuclear" || d.energySrc == "Natural Gas" || d.energySrc == "Solar Thermal and Photovoltaic") {
                    return d.energySrc;
                }
            })


            //Form Averages for Each Year
            .rollup(function (v) {
                return {
                    avg: d3.mean(v, function (d) {
                        return parseInt(d.amount);
                    })
                };
            })
            .entries(data);







        var slider = document.getElementById("myRange");
        var output = document.getElementById("demo");
        //output.innerHTML = slider.value;


        //FILTERED DATA BY REGION
        //collects filterted region by year data and renders graph
        slider.onchange = function () {
            var margin,svg, legend, x0, x1, y, xAxis, yAxis, regionNames, energyNames;

            var selectedYear = document.getElementById("myRange").value;
            output.innerHTML = this.value;


            //change d.key -- based on dropdown input value
            let filteredData = [];
            let getNestedData = nestedData.forEach(function (d) { //d = year
                if (d.key == selectedYear) { //IF WANT ALL DATA FOR ALL YEARS REMOVE THIS
                    console.log(selectedYear);
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


            
            let currData = d3.nest()
                .key(function (d) {
                    console.log("THIS IS: " + d.year);
                    return d.region;
                })
                .entries(filteredData);
            console.log(currData);
            console.log(selectedYear);
            d3.select("svg").remove();


    
            //append the svg object to the body of the page
            //size of svg (scale, legend, and bar graph)
                margin = { top: 20, right: 20, bottom: 30, left: 100 },
                width = 800 - margin.left - margin.right,
                height = 400 - margin.top - margin.bottom;

                regionNames = currData.map(function (d) { return d.key; }); //region names
                energyNames = currData[0].values.map(function (d) { return d.energy; }); //energy names



            //set the spacing for left scale here
            x0 = d3.scaleBand().rangeRound([0, width], 445);
            x1 = d3.scaleBand();
            y = d3.scaleLinear().rangeRound([height, 10]);

        

            xAxis = d3.axisBottom().scale(x0)
                .tickFormat(currData.key)
                .tickValues(currData.map(d => d.key));
            yAxis = d3.axisLeft().scale(y);
            const color = d3.scaleOrdinal(d3.schemeCategory10); //color of bars


            svg = d3.select('body').append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .attr("class","axis axis--x")
              
              svg.append("g")
                .attr("class","axis axis--y")
                

            svg.select('.y').transition().duration(500).delay(1300).style('opacity', '1');

            
        legend = svg.selectAll(".legend")
            .data(currData[0].values.map(function (d) { return d.energy; }))
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; })
            .style("opacity", "0");


        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", function (d) { return color(d); });

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function (d) { return d; });

        legend.transition().duration(500).delay(function (d, i) { return 1300 + 100 * i; }).style("opacity", "1");




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