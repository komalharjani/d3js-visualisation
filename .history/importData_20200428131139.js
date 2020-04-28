function importData() {
    d3.json("data/energy-data.json",function() {
        console.log(data);
    })
}