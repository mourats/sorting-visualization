const quantValues = 50;

var count = 1 + quantValues,
    durationTime = 3000/count,
    array = d3.shuffle(d3.range(1,count)),
    unsortedArray = [...array],
    sortedArray = [],
    steps = 0;

var margin = {top: 20, right: 10, bottom: 180, left: 10},
    width = 1100 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var barWidth = width/count;

var x = d3.scaleLinear()
        .domain([0,count])
        .range([0, width]);

var svg = d3.select("#visualization").append("svg")
       .attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom)
       .append("g")
       .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

var rects = svg.append("g")
       .attr("transform", "translate(" + barWidth + ",2)")
       .selectAll("rect")
       .data(unsortedArray)
       .enter().append("rect");

var labels = svg.selectAll("text")
       .data(unsortedArray)
       .enter().append("text");

   labels.attr("id", function(d) {return "text" + d})
       .attr("transform", function(d, i) {return "translate(" + x(i) + ",0)"})
       .attr("class", "text-center")
       .html(function(d) {return d;});

   rects.attr("id", function(d) {return "rect" + d}).attr("class", "bg-primary")
       .attr("transform", function(d, i) {return "translate(" + (x(i) - barWidth) + ",0)"})
       .attr("width", barWidth *.9)
       .attr("height", function(d) {return d*barWidth/3});

function reset() {
   unsortedArray = [...array];
   sortedArray = [];
   stop();

   d3.select("#counter").html(steps = 0)

   labels.attr("class", "")
       .transition().duration(2000)
       .attr("transform", function(d, i) {return "translate(" + (x(i)) + ", 0)"})

   rects.attr("class", "")
       .transition().duration(2000)
       .attr("transform", function(d, i) {return "translate(" + (x(i-1)) + ", 0)"})
 }

function stop() {
   clearInterval(repetition);

   d3.timeout(function() {
     unsortedArray.map(x => d3.select("#rect" + x).attr("class", ""));
   }, durationTime);
 }


function slide(d, i) {
   d3.select("#text" + d)
       .transition().duration(durationTime)
       .attr("transform", function(d) {return "translate(" + (x(i)) + ", 0)"})

   d3.select("#rect" + d)
       .transition().duration(durationTime)
       .attr("transform", function(d) {return "translate(" + (x(i-1)) + ", 0)"})
}

function shuffle() {
    array = d3.shuffle(d3.range(1,count));
    reset();
}

function testingColor(x, y) {

   d3.select("#rect" + unsortedArray[y]).attr("class", "testing-red");
   d3.select("#rect" + unsortedArray[x]).attr("class", "testing-red");

   d3.timeout(function() {
   d3.select("#rect" + unsortedArray[x]).attr("class", "testing-black")
   d3.select("#rect" + unsortedArray[y]).attr("class", "testing-black")
 }, durationTime);
}

function changeArray (x, y) {

 slide(unsortedArray[x], x + sortedArray);
 slide(unsortedArray[y], y + sortedArray);

 d3.select("#counter").html(++steps);
}

function disableSortingButtons(){
  d3.select("#bubbleSort").disabled = true;
}
