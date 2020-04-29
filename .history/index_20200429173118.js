
let dataPath = "data/energy.csv";
d3.csv(dataPath)
        .then(function (data) {

                let finals = [];

                //Filter Data into new object
                for (let i = 0; i < data.length; i++) {
                        if (data[i].region == "Combined" && data[i].year == 1990) {
                                finals.push({
                                        amount: parseInt(data[i].amount),
                                        type: data[i].type,
                                })
                        }
                }
                console.log(finals);

                let width = 1000;
                let height = 500;
                let margin = 3;
                let barwidth = (width / finals.length);

                //Append to HTML Document
                let svg = d3.select("svg")
                .attr("height", height)
                .attr("width", width);

                //Scales
                let xscale = d3.scaleLinear()
                        .domain([0, d3.max(finals, d => d.amount)])
                        .range([0, width]);

                let yscale = d3.scaleBand()
                .domain(data.map(d => d.type))
                .range(0, height);

                //X Axis
                let x_axis = d3.axisLeft()
                        .scale(xscale);

                let xAxisTranslate = height - 20;

                svg.append("g")
                .attr("transform","translate(50, "+ xAxisTranslate + ")")
                .call(x_axis);


                //Barchart
                // let barChart = svg.selectAll("rect") //add rectangles to all data
                //         .data(finals) //provide finals as dataset
                //         .enter()
                //         .append("rect")
                //         .attr("y", function(d){
                //                 return height - xscale(d.amount);
                //         })
                //         .attr("height", function (d) {
                //                 return  xscale(d.amount);
                //         })
                //         .attr("width", barwidth)
                //         .attr("transform", function (d, i) {
                //                 let translate = [barwidth * i, 0];
                //                 return "translate(" + translate + ")";
                //         })
                //         .attr("fill", 'black');

                //Barchart Text
                // let text = svg.selectAll("text")
                // .data(finals)
                // .enter()
                // .append("text")
                // .text(function(d){
                //         return d.amount;
                // })
                // .attr("y", function(d,i){
                //         return height - xscale(d.amount) - 2;
                // })
                // .attr("x", function(d,i){
                //         return barwidth * i;
                // })

        });
