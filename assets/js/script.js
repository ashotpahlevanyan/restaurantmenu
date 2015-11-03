$(document).ready(function(){

	//read data from json file asyncronously
	var data = [];
	$.getJSON( "data/data.json", function(response) {
		data = response;
		console.log(response);
		console.log( "success");
		//after data is read successfully, initialize the carousel and 
		//bind handles if there are some
		init();
	});	

	var firstTime = true;
	function createItem(obj)
	{	
		var $obj = null;
		if (obj.startDate != null) {
			// it's a menu item, so create a div with class item

			// Check if date and time are ok, otherwise it wouldn't be added to list
			if(isDateTimeOK(obj.startDate, obj.endDate, obj.startTime, obj.endTime)) {
				$obj = $('<div>').attr("class", "item");
				if(firstTime) {
					$obj.attr("class", $obj.attr("class") + " active");
					firstTime = false;
				}
				if(obj.background != "") {
					$obj.attr("class", $obj.attr("class") + " withBG");
				}
				//clear later
				console.log($obj);
			
				// If there is a background, make image container div and add image
				if(obj.background != "") {
					$imageContainer = $('<div>').attr("class", "imageContainer");
					$img = $('<img>')
					.attr("alt", "bg")
					.attr("src", "assets/images/" + obj.background)
					.attr("class", "bgImage");

					$obj.append($imageContainer.append($img));
				}

				if(obj.menuList.length) {
					$menus = $('<ul>').attr("class", "menus");
					for(var i = 0, l = obj.menuList.length; i < l; i++) {
						$menuItem = $('<li>');
						if(obj.menuList[i].type == "title") {
							$menuItem.attr("class", "title");
						}
						//fill menu Item information (<li>)
						$name = $('<span>').attr("class", "name").append(obj.menuList[i].name);						
						$desc = $('<span>').attr("class", "description").append(obj.menuList[i].description);						
						$priceLarge = $('<span>').attr("class", "price large").append(obj.menuList[i].priceLarge);						
						$priceSmall = $('<span>').attr("class", "price small").append(obj.menuList[i].priceSmall);
						$menuItem.append($name).append($desc).append($priceLarge).append($priceSmall);						
						//Add menu item to menus list (<ul>)
						$menus.append($menuItem);
					}
					//Add menus to Item (slide)
					$obj.append($menus);
				}
			}
		}
		else if (obj.playLength) {
			// it's an array with some elements, so create the <ul>
			$obj = $('<div>').attr('data-example-id', "simple-carousel").attr("class", "bs-example");
			$carousel = $('<div>').attr("data-ride","carousel")
			.attr("class", "carousel slide")
			.attr("data-interval", obj.playLength)
			.attr("id","carousel-example-generic")
			.attr("data-pause", "false");

			$carouselInner = $('<div>')
			.attr("class", "carousel-inner")
			.attr("role", "listbox");

			for (var i = 0, l = obj.menus.length; i < l; i++) {

				$carouselInner.append( createItem( obj.menus[i] ) );
			}
			$obj.append($carousel.append($carouselInner));
		}
		// if it was an empty array or an object that doesn't have a playLength
		// property, then it'll just return null;
		return $obj;
	}

	
	var init = function() {
		// fill the carousel from read data

		//isDateTimeOK("2015-10-30", "2015-11-19", "09:36:24", "16:34:23");

		$('.myCarousel').append(createItem(data));
    	$('.carousel').carousel('cycle');

	}
	var parseDate = function(date) {
		tmp = new moment(date, "YYYY-MM-DD");
		if(tmp.isValid()) {
			// close later
			console.log("isvalid date");
			return tmp;
		}
		else {
			return null;
		}
	}
	var parseTime = function(time) {
		tmp = new moment(time, "HH:mm:ss");
		if(tmp.isValid()) {
			// close later
			console.log("isvalid time");
			return tmp;
		} else {
			return null;	
		} 
	}
	var isDateTimeOK = function(startDate, endDate, startTime, endTime) {
		var now = moment();
		var dayIsOK = false;
		var timeIsOK = false;

		// close later
		console.log(now);

		var sDate = parseDate(startDate);
		var eDate = parseDate(endDate);
		var sTime = parseTime(startTime);
		var eTime = parseTime(endTime);
		// close later
		console.log(sDate);
		console.log(eDate);
		console.log(sTime);
		console.log(eTime);

		// if start date or end date are incorrect, 
		// then should check for time and work
		
		if (sDate == null || eDate == null) {
			dayIsOK = true;
		} else {
			var rangeDate = moment.range(sDate, eDate);
			if(rangeDate.contains(now)) {
				dayIsOK = true;
				
				// close later
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
				
				// close later
				console.log("contains time");
			}
		}

		// close later
		console.log(rangeDate);
		console.log(rangeTime);
		
		// close later
		console.log(dayIsOK  + " -- " + timeIsOK);
		return (dayIsOK && timeIsOK);
	}

});
