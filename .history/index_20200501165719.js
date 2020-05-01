//1. What the bar chart should represent -- Data
//2. Add CSS - colours
//3. Add Filters
//4. Add Transitions

//1. Average Data
//2. Draw Bar Chart

//Load Data
let dataPath = "data/energy.csv";
d3.csv(dataPath)
        .then(function (data) {
                
                //Nest Data into Format
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
                
                let filteredData = [];
                let getNestedData = nestedData.forEach(function(d){ //d = year
                        if(d.key == 1990) {
                        (d.values).forEach(function(e){ //e = region
                                (e.values).forEach(function(f){ //f = energySrc
                                        if(e.key !== "undefined" && f.key !== "undefined") {
                                        filteredData.push({
                                                region: e.key,
                                                // values: {
                                                        energy: f.key,
                                                        avg: f.value.avg,
                                        })
                                }
                                })
                        }) 
                }
                });
                console.log(filteredData);

                
                let finalFinalData = [];

                //https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects
                // const groupBy = (array, key) => {
                //         // Return the end result
                //         return array.reduce((result, currentValue) => {
                //           // If an array already present for key, push it to the array. Else create an array and push the object
                //           (result[currentValue[key]] = result[currentValue[key]] || []).push(
                //             currentValue
                //           );
                //           // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
                //           return result;
                //         }, {}); // empty object is the initial value for result object
                //       };
                      
                //       // Group by color as key to the person array
                // const finalData = groupBy(filteredData, 'region');
                // console.log("finalData", finalData);


                function groupBy(list, keyGetter) {
                        const map = new Map();
                        list.forEach((item) => {
                             const key = keyGetter(item);
                             const collection = map.get(key);
                             if (!collection) {
                                 map.set(key, [item]);
                             } else {
                                 collection.push(item);
                             }
                        });
                        return map;
                    }

                const grouped = groupBy(filteredData, i => i.region);
                console.log(grouped);

                let keys = Array.from( grouped.keys() );
                let mapToArray = Array.from(grouped.values());
                console.log(keys);
                console.log(mapToArray);
                console.log(mapToArray[0][0].region);

                let newArray = [];
                for(let i=0; i < mapToArray.length; i++) {
                if(mapToArray[i][0].region == "west") {
                        newArray[0].push({
                                region: "west",
                                values: mapToArray[0]
                                })
                        }
                }
                console.log(newArray);
                


                    

                //1. Group
                //2. Try out barchart



        //         for(let i=0; i < filteredData.length; i++) {
        //                 console.log(filteredData[i]);
        //                 if(filteredData[i].region == "west") {
        //                         finalData[0].push({
        //                                 region: "west",
        //                                 values: filteredData[i].values
        //                         })
        //         }
        // }
        // console.log(finalData);


                //OR nest by year after this
                //Scale Bands for bar chart --> categorical (x), amount (y)
                //First scale for region and second for energy - create nested scale
                //Loop through each nest
                //

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
        .call(y_axis);

//X Axis - Ordinal
// let x_axis = d3.axisBottom().scale(xscale);
// var ordinalScale = d3.scale.ordinal()
//         .domain(['Alice', 'Bob'])
//         .range([0, 100]);


//Barchart
//NEED TICKS
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

svg.selectAll("body") //add rectangles to all data
        .data(nestedData) //provide finals as dataset
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
                return d.key;
        })
        .attr("y", function (d) {
                return d.values.map(function (d) {
                        return d.values[0].amount;
                }).values[0];
        })
        .attr("height", function (d) {
                return d.values.map(function (d) {
                        return yscale(d.values[0].amount);
                }).values[0];
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
