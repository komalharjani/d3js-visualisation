//1. What the bar chart should represent -- Data
//2. Add CSS - colours
//3. Add Filters
//4. Add Transitions

//1. Average Data
//2. Draw Bar Chart

let dataPath = "data/energy.csv";
d3.csv(dataPath)
        .then(function (data) {

                let finals = [];

                //Array of regions
                var westArray = [];
                var midWestArray = [];
                var southWestArray = [];
                var southEastArray = [];
                var northEastArray = [];
                //console.log(data);

                //Filter Data into new object
                //Data length is 51,630 rows
                for (let i = 0; i < data.length; i++) {
                        if (data[i].year == 1990 && data[i].region == "west" && data[i].type == "Total Electric Power Industry") {
                                randomData.push({
                                        region: data[i].region,
                                        amount: parseInt(data[i].amount),
                                        type: data[i].energySrc,
                                })
                        }
                }
                //console.log(finals);




                //Grouping by region
                // from line 1 to line 51,630 "j's"
                for(let j=0; j < data.length; j++) { 

                                if (data[j].type == "Total Electric Power Industry") {

                                        if(data[j].region == "West" || data[j].region == "west"){
                                                westArray.push({
                                                        year: data[j].year,
                                                        region: data[j].region,
                                                        type: data[j].energySrc,
                                                        amount: parseInt(data[j].amount)
                                                })
                                                console.log("End of WEST");
                                               
                                               
                                             
                                        } 

                                        else if (data[j].region == "MidWest" || data[j].region == "Midwest"){
                                                midWestArray.push({
                                                        year: data[j].year,
                                                        region: data[j].region,
                                                        type: data[j].energySrc,
                                                        amount: parseInt(data[j].amount)
                                                })
                                                console.log("End of MIDWEST");
                                        }       
                                               
                                        else if (data[j].region == "SouthWest" || data[j].region == "Southwest"){
                                                southWestArray.push({
                                                        year: data[j].year,
                                                        region: data[j].region,
                                                        type: data[j].energySrc,
                                                        amount: parseInt(data[j].amount)
                                                })
                                                console.log("End of SOUTHWEST");
                                        }       
                                        else if (data[j].region == "SouthEast" || data[j].region == "Southeast"){
                                                southEastArray.push({
                                                        year: data[j].year,
                                                        region: data[j].region,
                                                        type: data[j].energySrc,
                                                        amount: parseInt(data[j].amount)
                                                })
                                                console.log("End of SOUTHEAST");
                                        }
                                        else if (data[j].region == "NorthEast" || data[j].region == "Northeast"){
                                                northEastArray.push({
                                                        year: data[j].year,
                                                        region: data[j].region,
                                                        type: data[j].energySrc,
                                                        amount: parseInt(data[j].amount)
                                                         })
                                                console.log("END OF NORTHEAST");
                                        }
                                        else{
                                                console.log("MISSING DATA MISSING DATA") //region names are misspelled
                                                
                                        }
                                        
                        

                                }
                }
                console.log(westArray);
                

                


                let width = 1000;
                let height = 500;
                let margin = 3;
                let barwidth = (width / nestedData.length);

                //Append to HTML Document
                let svg = d3.select("body")
                        .append("svg")
                        .attr("height", height)
                        .attr("width", width);

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


                        //    /**
        //          * Boundaries
        //          */
        //         let dateBoundaries = d3.extent(data, function (d) {
        //                 return parseFloat(d.year);
        //         });

        //         let energyBoundaries = d3.extent(data, function (d) {
        //                 return parseFloat(d.amount);
        //         });



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
                                return d.year;
                        })
                        .entries(data);
                usTotal.shift();
                //console.log(usTotal);


        });
