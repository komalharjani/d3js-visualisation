//1. What the bar chart should represent -- Data
//2. Add CSS - colours
//3. Add Filters
//4. Add Transitions

let dataPath = "data/energy.csv";
d3.csv(dataPath)
        .then(function (data) {

                let randomData = [];

                // //Filter Data into new object
                for (let i = 0; i < data.length; i++) {
                        if (data[i].year == 1990 && data[i].type == "Total Electric Power Industry") {
                                randomData.push({
                                        region: data[i].region,
                                        amount: parseInt(data[i].amount),
                                        type: data[i].energySrc,
                                })
                        }
                }
                console.log(randomData);

                let sortedData1990 = [];
                for (let j = 0; j < 6; j++) { //For each Region
                        sortedData1990[j] = []; //Have an Array For each region
                        for (let i = 0; i < 5; i++) { //for each energySrc
                                if (data[i].year == 1990) {
                                        if (data[i].energySrc == "Coal" || data[i].energySrc == "Petroleum" || data[i].energySrc == "Natural Gas" || data[i].energySrc == "Solar Thermal and Photovoltaic") {
                                                if (data[i].region == "west") {
                                                        sortedData1990[0].push({ //Push averages for each energySrc x4
                                                                year: 1990,
                                                                energySrc: data[i].energySrc,
                                                                region: data[i].region,
                                                                amount: data[i].amount
                                                        })
                                                        break;
                                                }
                                                else if (randomData[j].region == "midwest") {
                                                        sortedData1990[1].push({ //Push averages for each energySrc x4
                                                                year: 1990,
                                                                energySrc: data[i].energySrc,
                                                                region: data[i].region,
                                                                amount: data[i].amount
                                                        })
                                                }
                                                else if (randomData[j].region == "southeast") {
                                                        sortedData1990[2].push({ //Push averages for each energySrc x4
                                                                year: 1990,
                                                                energySrc: data[i].energySrc,
                                                                region: data[i].region,
                                                                amount: data[i].amount
                                                        })
                                                }
                                                else if (randomData[j].region == "west") {
                                                        sortedData1990[3].push({ //Push averages for each energySrc x4
                                                                year: 1990,
                                                                energySrc: data[i].energySrc,
                                                                region: data[i].region,
                                                                amount: data[i].amount
                                                        })
                                                }
                                                else if (randomData[j].region == "southwest") {
                                                        sortedData1990[4].push({ //Push averages for each energySrc x4
                                                                year: 1990,
                                                                energySrc: data[i].energySrc,
                                                                region: data[i].region,
                                                                amount: data[i].amount
                                                        })
                                                }
                                        }
                                }
                        }
                }
                        // }

                        // else if(randomData[j].region == "midwest") {

                        // }
                        // else if(randomData[j].region == "southeast") {

                        // }
                        // else if(randomData[j].region == "west") {

                        // }
                        // else if(randomData[j].region == "southwest") {

                        // }

                        console.log(sortedData1990);






                        let width = 1000;
                        let height = 500;
                        let margin = 3;
                        let barwidth = (width / randomData.length);

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


                });
