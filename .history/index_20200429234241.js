//1. What the bar chart should represent -- Data
//2. Add CSS - colours
//3. Add Filters
//4. Add Transitions

let dataPath = "data/energy.csv";
d3.csv(dataPath)
        .then(function (data) {

                let finals = [];

                // //Filter Data into new object
                for (let i = 0; i < data.length; i++) {
                        if (data[i].region == "Combined" && data[i].year == 1990) {
                                finals.push({
                                        amount: parseInt(data[i].amount),
                                        type: data[i].energySrc,
                                })
                        }
                }

                let width = 1000;
                let height = 500;
                let margin = 3;
                let barwidth = (width / finals.length);

                //Append to HTML Document
                let svg = d3.select("body")
                        .append("svg")
                        .attr("height", height)
                        .attr("width", width);

                /**
                 * Scales and Axis
                 */
                //Ordinal
                let xscale = d3.scale.ordinal()
                        .rangeBankds([0, width],margin);

                //Height
                let yscale = d3.scaleLinear()
                        .domain([0, d3.max(finals, d => d.amount)])
                        .range([0, height]);

                let yAxisScale = d3.scaleLinear()
                        .domain([0, d3.max(finals, d => d.amount)])
                        .range([height, 0]);

                // Y Axis - Number
                let y_axis = d3.axisLeft().scale(yAxisScale);

                svg.append("g")
                        .attr("transform", "translate(100,-30)")
                        .call(y_axis)

                let x_axis = d3.svg.axis().scale(xscale).orient("bottom")
                .outerTicksSize(0);

                //Barchart
                svg.selectAll("body") //add rectangles to all data
                        .data(finals) //provide finals as dataset
                        .enter()
                        .append("rect")
                        .attr("y", function (d) {
                                return height - yscale(d.amount);
                        })
                        .attr("height", function (d) {
                                return yscale(d.amount);
                        })
                        .attr("width", barwidth - margin)
                        .attr("transform", function (d, i) {
                                let translate = [100 + barwidth * i,-30];
                                return "translate(" + translate + ")";
                        }) 
                        .attr("fill", 'black');

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
