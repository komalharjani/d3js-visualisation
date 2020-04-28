function importData() {
    d3.json("data/energy-data.json", function(data){
        console.log(data);
    })
}