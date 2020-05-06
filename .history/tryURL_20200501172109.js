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
                console.log(nestedData);

                //Filter Data so that 
                let filteredData = [];
                let getNestedData = nestedData.forEach(function (d) { //d = year
                        if (d.key == 1990) { //IF WANT ALL DATA FOR ALL YEARS REMOVE THIS
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
                console.log(filteredData);
        
                
                //Group Items into a Map
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

                //Convert Map to Array
                const groupedByRegion = groupBy(filteredData, i => i.region);
                let mapToArray = Array.from(groupedByRegion.values());
                console.log(mapToArray);

                //Nest array by Region
                let finalData = [];
                for (let i = 0; i < mapToArray.length; i++) {
                        if (mapToArray[i][0].region == "west") {
                                finalData.push({
                                        region: mapToArray[i][0].region,
                                        values: mapToArray[i]
                                })
                        }
                        else if (mapToArray[i][0].region == "southeast") {
                                finalData.push({
                                        region: mapToArray[i][0].region,
                                        values: mapToArray[i]
                                })
                        }
                        else if (mapToArray[i][0].region == "southwest") {
                                finalData.push({
                                        region: mapToArray[i][0].region,
                                        values: mapToArray[i]
                                })
                        }
                        else if (mapToArray[i][0].region == "northeast") {
                                finalData.push({
                                        region: mapToArray[i][0].region,
                                        values: mapToArray[i]
                                })
                        }
                        else if (mapToArray[i][0].region == "midwest") {
                                finalData.push({
                                        region: mapToArray[i][0].region,
                                        values: mapToArray[i]
                                })
                        }
                }
                console.log(finalData);

                //FIGURE OUT HOW TO NEST BY YEAR
                let nestByYear = d3.nest()
                .key(function(d){
                        return d.region;
                })
                .entries(finalData);
                console.log(nestByYear);

            });