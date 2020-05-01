//1. What the bar chart should represent -- Data
//3. Add Filters
//1. Average Data {done}
//2. Draw Bar Chart {done}



// This controls counter displayed
var counter = 1990;
document.getElementById("counter").innerHTML = counter;


//Year starts at 1990
var objYear = 1989; 


let dataPath = "data/energy.csv";
d3.csv(dataPath)
        .then(function (data) {

                //Nested Data with all Data Required - need to figure out how to unpack and build bar chart
                var nestedData = d3.nest()
                        .key(function (d) {

                                if ( d.type == "Total Electric Power Industry") {
                                        return d.region;
                                }
                               
                        })
                        .key(function (d) {
                                objYear++; //starts in 1990 then goes to next year
                                return d.year;
                                
                                
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

                        //regions codes: [0]west, [1]undefined, [2]southeast, [3]southwest, [4]northeast, [5]midwest, [6] "", [7]combined
                        //year codes: [0]1990 to [28]2018
                        //energySrc codes: [0]undefined, [1]Coal, [2]Natural Gas, [3]Petroleum, [4]Solar Thermal and Photovoltaic

                        console.log(nestedData[0].values[0].values[1].value); // equivalent to: west, 1990, Coal, 11860158.0833
                        console.log(nestedData[0].values[1].values[1].value); //equivalent to: west, 1991, Coal, 11903090.583333334


                        //console.log(nestedData);
                        //let nestedDataJSON = JSON.stringify(nestedData, null, 2);
                        //console.log (nestedDataJSON);


                        
                /* Whats this?
                //var eachPain = d3.values(nestedData[0]).values[0];
                //console.log(eachPain);
                */
                


                
                
                


//VISUAL DATA HERE
//var r;
// var e; 
//allWestArray
//allMidwestArray

let coalAvgWest = [];


        // //Filter coal averages into new obj for all regions
        for (let i = 0; i < 29; i++) { //years: wont exit until all years are reached
                /*  //a single region array containing all avg energytypes each year
                for(r =0; r<8; r++){ //regions interation
                        (if r = 0){ // [0] region west
                             for (e=0;e<5; e++ ){ //iterate through energySrc and append to region //No bc, would need to map location of e anyways but all source averages would be in a single array. vars seem more straighforward.
                                //allAvgWest = nestedData[r].values[i].values[e].value;
                                allWestArray.push{
                                        allAvgMidWest;
                                 
                        }
                        
                             (if r = 1){ //[1] region midwest 
                                for (e= 0;e<5; e++ ){
                                //allAvgMidWest = nestedData[r].values[i].values[e].value; 
                                allMidWestArray.push
                                        allAvgMidwest //this would be a global
                                }
                        
                        }
                        (if r = 2){ // [2]region 
                                //do the same as above until r=5 and dont forget else

                }
        }
                */
                var coalData = nestedData[0].values[i].values[1].value; // testing west[0], iterate through years,coal stays at 1.

                coalAvgWest.push({
                        coalData     
                })   
        }
        console.log(coalAvgWest); //prints all averages for coal each year in west.



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
        .domain([0, d3.max(coalAvgWest, d => d.amount)])
        .range([0, height]);

let yAxisScale = d3.scaleLinear()
        .domain([0, d3.max(coalAvgWest, d => d.amount)])
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
// svg.selectAll("body") //add rectangles to all data
//         .data(randomData) //provide finals as dataset
//         .enter()
//         .append("rect")
//         .attr("y", function (d) {
//                 return height - yscale(d.amount);
//         })
//         .attr("height", function (d) {
//                 return yscale(d.amount);
//         })
//         .attr("width", barwidth)
//         .attr("transform", function (d, i) {
//                 let translate = [100 + barwidth * i, -30];
//                 return "translate(" + translate + ")";
//         })
//         .attr("fill", 'black');;

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