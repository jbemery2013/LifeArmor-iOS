// accessibility page reading automatically provided by accessibility.js

var results = null;

$('.assessment').bind('pageshow.assessment', function(event, ui) {
	/* Load results data */
	$.getJSON('assessment.json', function (data) {
		results = data;
	});
});

$("#anxiety_assessment-submit").bind("tap", function (e) {
	e.preventDefault();
	var total = 0;
	var numChecked = 0;
	$("input[type='radio']:checked").each(function (index) {
		// add up each checked radio button.
		total = total + Number($(this).val());
		numChecked = numChecked + 1;
	});

	var errorArray = new Array();
	var choice_selected = null;
	var name = null;
	var id = null;
	
	$("input[type='radio']").each(function () {
		name = $(this).attr("name");
		id = $(this).attr("id");
		
		// add up each checked radio button.
		if ($(this).attr("checked"))
		{
			choice_selected = checked(name, id, errorArray);
		}
		else
		{
			// Unchecked
			unchecked(name, id, errorArray, choice_selected);
		}
	});
	
	if (numChecked < 16) {
		console.log('not done');
		$(window).scrollTop($('[name=' +  errorArray[0] +']').offset().top - 100);
		return false;
	}
	
	var last = localStorage.getItem("anxietyAssessLastScore");
	var key = score(last) + "-" + score(total);
	localStorage.setItem("anxietyAssessLastScore", total);

	// display the scored results.
	alertDialog(results[key], 'Results', 2);
	//history.back();
}); 

/* apply scoring algorithm */
function score(total) {
	if (total == null) {
		return null;
	}
	else if (total <= 39) {
		return "low";
	}
	else if (total <= 59) {
		return "med";
	}
	else {
		return "high";
	}
}

/* reset all radio buttons */
function reset() {
	$('input[type="radio"]:checked').prop('checked', false).checkboxradio("refresh");
}
