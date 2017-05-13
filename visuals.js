

//generates line graph

var drawLines = function(data, time){

	
	var t = parseInt(time).toFixed();
    var margin = {
    top:    50,
    right:  35, 
    bottom: 100, 
    left:   150
  	};
  	var width = 860 - margin.left - margin.right,
    	height = 500 - margin.top - margin.bottom;

	var x = d3.scaleLinear()
    	.range([0, width])
    	x.domain([5,t]);
    var y = d3.scaleLinear()
    	.range([height, 0])
    	y.domain([-5,100]);

   

var line = d3.line()
    .x(function(d) {  return x(d.time); })
    .y(function(d) {  return y(d.amount); });

 var line2 = d3.line()
    .x(function(d) {   return x(d.time); })
    .y(function(d) {  return y(d.amount); });

  var line3 = d3.line()
    .x(function(d) {   return x(d.time); })
    .y(function(d) {  return y(d.amount); });

 var line4 = d3.line()
    .x(function(d) {  return x(d.time); })
    .y(function(d) {  return y(d.amount); });

 var line5 = d3.line()
    .x(function(d) {  return x(d.time); })
    .y(function(d) {  return y(d.amount); });

 var line6 = d3.line()
    .x(function(d) {  return x(d.time); })
    .y(function(d) {  return y(d.amount); });


 var line7 = d3.line()
    .x(function(d) {  return x(d.time); })
    .y(function(d) {  return y(d.amount); });



  

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class", "lines")
  .append("g")
    .attr("class", "paths")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.append("path")
		.attr("class", "line")
		.attr("d", line(data[0].values));
	svg.append("path")
		.attr("class", "line2")
		.attr("d", line2(data[1].values));
	svg.append("path")
		.attr("class", "Sadness")
		.attr("d", line3(data[2].values));
	svg.append("path")
		.attr("class", "line4")
		.attr("d", line4(data[3].values));
	svg.append("path")
		.attr("class", "line5")
		.attr("d", line5(data[4].values));
	svg.append("path")
		.attr("class", "line6")
		.attr("d", line6(data[5].values));
	svg.append("path")
		.attr("class", "line7")
		.attr("d", line7(data[6].values));


    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
    .attr("y", 0)
    .attr("x", 2)
    .attr("dy", "0.3em")
    .attr("dx", "-1.8em")
    .attr("transform", "rotate(-90)")

    //axis labels
    svg.append("text")
        .attr("transform", "translate("+ margin.left+","+ height/2+") rotate(-90)")
        .attr("class", "axistext")
        .attr("dy", "-11.6em")
        .attr("dx", "-0.3em")
        .style("text-anchor", "middle")
        .text("Emotion Amount");

    svg.append("text")
        .attr("transform", "translate("+width/2+",0)")
        .attr("class", "texts")
        .attr("dy", "25.0em")
        .attr("dx", "1.0em")
        .style("text-anchor", "middle")
        .text("Seconds");

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));


      //legend
   var colors2 = d3.scaleOrdinal()
    .domain(["Joy","Anger","Sadness","Disgust","Fear","Surprise","Content"])
    .range(["#F99C23", "#CE4141","#505DD5", "#38B649", "#C132C6", "#E6D80C","#6F5741"]);
var legendDist = svg
          .append("g")
          .selectAll("g")

          .data(colors2.domain())
          .enter()
          .append('g')
            .attr('class', 'legendDist')
            .attr('transform', function(d, i) {
              
              var height = 25;
              var x = -150;
              var y = i * height;
              y=y-50;
              return 'translate(' + x + ',' + y + ')';
          });

legendDist.append('rect')
            .attr('width', 18)
            .attr('height', 18)
            .style('fill', colors2)

legendDist.append('text')
            .attr('x', 18 + 4)
            .attr('y', 18 - 4)
            .text(function(d) { return d; });



}

//generates bubble chart

var drawBubbles = function(dataset){


    var diameter = 350;
     var color = d3.scaleOrdinal()
     .domain(["Joy","Anger","Sadness","Disgust","Fear","Surprise","Content"])
    .range(["#F99C23", "#CE4141","#505DD5", "#38B649", "#C132C6", "#E6D80C","#6F5741"]);

    var bubble = d3.pack(dataset)
            .size([diameter, diameter])
            .padding(1.5);

    var svg = d3.select("body")
            .append("svg")
            .attr("width", diameter)
            .attr("height", diameter)
            .attr("class", "bubble");

    var nodes = d3.hierarchy(dataset)
            .sum(function(d) { return d.average; });


    var node = svg.selectAll(".node")

            .data(bubble(nodes).descendants())
            .enter()
            .filter(function(d){
                return  !d.children
            })
            .filter(function(d){
                return  d.data.average>0
            })
            .append("g")
            .attr("class", "node")
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

    node.append("title")
            .text(function(d) {
                return d.emotion + ": " + d.average;
            });

    node.append("circle")
            .attr("r", function(d) {
                return d.r;
            })
            .style("fill", function(d) {
                 return color(d.data.emotion);
            });

    node.append("text")
            .attr("dy", ".3em")
            .style("text-anchor", "middle")
            .text(function(d) { 

                if(d.data.average==0){
                    return ""
                }
                else{
                    if(d.data.average>=5){
                return d.data.emotion.substring(0, d.r / 3) + ": " + d.data.average+"%";
                }
                else{
                    return d.data.average+"%";
                }
            }
            
            });



    d3.select(self.frameElement)
            .style("height", diameter + "px");

           



}

var svgReset = function(){


    d3.selectAll("svg").remove();
}
