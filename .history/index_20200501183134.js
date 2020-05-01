
//INSERT DATA HERE
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
                if (d.energySrc == "Coal" || d.energySrc == "Petroleum" || d.energySrc == "Natural Gas" || d.energySrc == "Solar Thermal and Photovoltaic") {
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

        //Filter Data so that 
        let filteredData = [];
        let getNestedData = nestedData.forEach(function (d) { //d = year
            //if (d.key == 1990) { //IF WANT ALL DATA FOR ALL YEARS REMOVE THIS
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
           // }
        });

        let currData = d3.nest()
            .key(function (d) {
                return d.region;
            })
            .entries(filteredData);
        console.log(currData);


        var margin = { top: 20, right: 20, bottom: 30, left: 100 },
            width = 800 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;


        var x0 = d3.scaleBand().rangeRound([0, width], .5);
        var x1 = d3.scaleBand();
        var y = d3.scaleLinear().rangeRound([height, 0]);

        var xAxis = d3.axisBottom().scale(x0)
            .tickFormat(currData.key)
            .tickValues(currData.map(d => d.key));

        var yAxis = d3.axisLeft().scale(y);

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        var svg = d3.select('body').append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var categoriesNames = currData.map(function (d) { return d.key; });
        var rateNames = currData[0].values.map(function (d) { return d.energy; });

        x0.domain(categoriesNames);
        x1.domain(rateNames).rangeRound([0, x0.bandwidth()]);
        y.domain([0, d3.max(currData, function (key) { return d3.max(key.values, function (d) { return d.avg; }); })]);

        console.log(y.domain());

        console.log(currData.key);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .style('opacity', '0')
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .style('font-weight', 'bold')
            .text("Value");

        svg.select('.y').transition().duration(500).delay(1300).style('opacity', '1');


        var slice = svg.selectAll(".slice")
            .data(currData)
            .enter().append("g")
            .attr("class", "g")
            .attr("transform", function (d) { return "translate(" + x0(d.key) + ",0)"; });

        
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

        slice.selectAll("rect")
            .transition()
            .delay(function (d) { return Math.random() * 1000; })
            .duration(1000)
            .attr("y", function (d) { return y(d.avg); })
            .attr("height", function (d) { return height - y(d.avg); });


        var legend = svg.selectAll(".legend")
            .data(currData[0][region].values.map(function (d) { return d.energy; }))
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


    });