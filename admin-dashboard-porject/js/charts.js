const ctx = document.getElementById("salesChart");

new Chart(ctx,{
type:"line",

data:{
labels:["Jan","Feb","Mar","Apr","May","Jun"],

datasets:[{
label:"Sales",
data:[12,19,10,25,22,30],
borderColor:"blue",
fill:false
}]

}

});