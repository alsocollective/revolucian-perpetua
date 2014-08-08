/*var newPosition = null;

	var mvAvg = 0,
	    tc = 0.4,
	    alph = 1.0,
	    per = 1000,
	    diffArr = [0,0],
	    spd = [0,0];

	$scope.tcValue = tc;
	$scope.alphVal = alph;

	$scope.speed = 0;

	var movingAverage = false,
	    differenceValue = false;
	 
	var n = 160,
	    data = d3.range(n).map(function(){
	      for(i=0;i<40;i++){
	        return i;
	      }
	    });

	var margin = {top: 20, right: 20, bottom: 20, left: 40},
	    width = 900 - margin.left - margin.right,
	    height = 500 - margin.top - margin.bottom;
	 
	var x = d3.scale.linear()
	    .domain([0, n - 1])
	    .range([0, width]);
	 
	var y = d3.scale.linear()
	    .domain([-2, 1])
	    .range([height, 0]);
	 
	var line = d3.svg.line()
	    .x(function(d, i) { return x(i); })
	    .y(function(d, i) { return y(d); });
	 
	var svg = d3.select("#visualization").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	 
	svg.append("defs").append("clipPath")
	    .attr("id", "clip")
	    .append("rect")
	    .attr("width", width)
	    .attr("height", height);
	 
	svg.append("g")
	    .attr("class", "y axis")
	    .call(d3.svg.axis().scale(y).orient("left"));
	 
	var path = svg.append("g")
	    .attr("clip-path", "url(#clip)")
	    .append("path")
	    .datum(data)
	    .attr("class", "line")
	    .attr("d", line);
	 
	tick();
	 
	function tick() {
	  // push a new data point onto the back

	  //Maybe emply the .length technique here as well? Can't be variable though.
	  data.push(newPosition);
	 
	  // redraw the line, and slide it to the left
	  path
	  	.attr("d", line)
		.attr("transform", null)
		.transition()
		.duration(40)
		.ease("linear")
		.attr("transform", "translate(" + x(-1) + ",0)")
		.each("end", tick);
	 
	  // pop the old data point off the front
	  data.shift();
	}




	var dat = null;

	socket.on('lv', function(data) {
		newPosition = data.y;

		if(data){
			if(dat < 100){
				dat++
			}else{
				dat = 0;
				spd.shift();
				spd[spd.length] = Date.now();
				$scope.speed = 100 / (Math.abs(spd[0]-spd[1]) / per);
			}
		}else{
			$scope.speed = 0.0;
		}
	});*/

		/*

		if(movingAverage){
			// Exponentially decaying moving average
			mvAvg = (accl*tc)+(mvAvg*(alph-tc));
			newPosition = mvAvg;
		}

		if(differenceValue){
			// Exponentially decaying moving average
			mvAvg = (accl*tc)+(mvAvg*(alph-tc));

			diffArr.shift();
			diffArr[diffArr.length] = mvAvg;

			newPosition = diff(diffArr[0],diffArr[1]);
		}
	})
	
	function diff(a,b){return Math.abs(a-b);}

	//I DON'T NEED THESE WHEN USING ANGULAR
	d3.select('#movingAverage').on('click', function() {
	  movingAverage = true;
	});

	d3.select('#differenceValue').on('click', function() {
	  differenceValue = true;
	  movingAverage = false;
	});

	$scope.alphChange = function() {
		alph = $scope.alphVal;
	}

	//Keep checking the field whenever there is input
	$scope.changeLength = function() {
		tc = $scope.tcValue;
	};*/