$(document).ready(function(){
	//$("#simple-carousel").find(".item").emulateTransitionEnd(150);

	//read data from json file asyncronously
	var data = [];
	$.getJSON( "data/data.json", function(response) {
		data = response;
		console.log(response);
		console.log( "success");
		//after data is read successfully, initialize the tree and 
		//bind handles
		init();
	});	

	function createItem(obj)
	{
		var $obj = null;
		if (obj.name) {
			// it's an object, so create the <li> and <a>
			$objTitle = $('<div>').attr("class","title").text(obj.name);
			$objId = $('<div>').attr("class","id").text(obj.id);
			$objAnimal = $('<div>').attr("class","animal " + obj.genNumber);
			$objAnimal.append($objTitle).append($objId);
			
			$objSex = $('<span>').attr("class","sex fa fa-"+obj.sex);
			$objPM = $('<span>').attr("class","plusminus fa fa-minus-square-o");
			$objLink = $('<a>').attr("class","toggler").attr("href","#");
			$objLink.append($objPM).append($objSex).append($objAnimal);
			
			$obj = $('<li>').attr("role", "presentation").attr("class", obj.genClass).append($objLink);
			// if there are any children, append them recursively
			if (obj.parents) {
				$obj.append(createItem(obj.parents));
			}
		}
		else if (obj.length) {
			// it's an array with some elements, so create the <ul>
			$obj = $('<ul>').attr('class', "nav tree nav-pills nav-stacked");
			for (var i = 0, l = obj.length; i < l; i++) {
				$obj.append( createItem( obj[i] ) );
			}
		}
		// if it was an empty array or an object that doesn't have a title
		// property, then it'll just return null;
		return $obj;
	}

	
	var init = function() {
		// fill the tree from read data

		var start  = new Date(2012, 4, 1);
		var end    = new Date(2012, 4, 23);
		var lol    = new Date(2012, 4, 15);
		var wat    = new Date(2012, 4, 27);
		var range  = moment.range(start, end);
		var range2 = moment.range(lol, wat);
		 
		console.log(range.contains(lol)); // true 
		console.log(range.contains(wat)); // false 
		console.log(moment("12:35:34", "HH:mm:ss").isValid());

		isDateTimeOK("2015-10-30", "2015-11-19", "11:36:24", "16:34:23");

		$('.carousel-inner').append(createItem(data));

		// // register click handle on .toggler elements 
		// $(".toggler").on("click", function(event) {
		// 	event.preventDefault();
		// 	var plusminus = $(this).children(".plusminus");
		// 	if(plusminus.hasClass("fa-plus-square-o")) {
		// 		plusminus.removeClass("fa-plus-square-o").addClass("fa-minus-square-o");
		// 	} else {
		// 		plusminus.removeClass("fa-minus-square-o").addClass("fa-plus-square-o");
		// 	}
		// 	$(this).siblings("ul.tree").toggle(300);
		// });
	}
	var parseDate = function(tdate) {
		if(moment(tdate, "YY-mm-dd").isValid()) {
			return ( moment(tdate, 'YY-mm-dd'));
		}
		else {
			return null;
		}
	}
	var parseTime = function(time) {
		if(moment(time, "HH:mm:ss").isValid()) {
			return ( moment(time, 'HH:mm:ss'));
		} else {
			return null;	
		} 
	}
	var isDateTimeOK = function(startDate, endDate, startTime, endTime) {
		var now = moment();
		var dayIsOK = false;
		var timeIsOK = false;

		console.log(now);

		var sDate = parseDate(startDate);
		var eDate = parseDate(endDate);
		var sTime = parseTime(startTime);
		var eTime = parseTime(endTime);
		console.log(sDate);
		console.log(eDate);
		console.log(sTime);
		console.log(eTime);

		// if start date or end date are incorrect, 
		// then should chek for time and work
		if (sDate == null || eDate == null) {
			dayIsOK = true;
		} else {
			var rangeDate = moment.range(sDate, eDate);
			if(rangeDate.contains(now)) {
				dayIsOK = true;
				console.log("contains date");
			}
		}

		// if start time or end time are incorrect, 
		// then should work anyway
		if (sTime == null || eTime == null) {
			timeIsOK = true;
		} else {
			var rangeTime =  moment.range(sTime, eTime);
			if(rangeTime.contains(now)) {
				timeIsOK = true;
				console.log("contains time");
			}
		}

		console.log(rangeDate);
		console.log(rangeTime);
		
		console.log(dayIsOK  + " -- " + timeIsOK);
		return (dayIsOK && timeIsOK);
	}

});
