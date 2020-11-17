
// // check off specific todos by clicking

// $("li").click(function(){
// 	$(this).toggleClass("completed");
// });

// Click listeners don't work on new list items. thats why 
// you use the .on("click", ...) method
$("ul").on("click", "li", function(){
//click listeners are only applied to existing elements
//Apply on("click") to the "UL" then any "LI"s in that "UL"
	$(this).toggleClass("completed");
});

//click on X to delete TODO

$("ul").on("click", "span", function(event){
	//click listener automatically activates on every object
	//that "span" is in. We confine that by running 'event' 
	//in the function. 'event' then runs 'stopPropagation'.
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	//'this' gives us the element above. 'parent()' gives
	// us the element that contains "span". 'remove()' deletes
	// the parent element.
	event.stopPropagation();
});

//add new todo from input text

$("input[type='text']").keypress(function(event){
//13 = 'Enter'
	if(event.which === 13){
	//if user hits 'Enter' than load input text into
	//the variable 'todoText' 'this' refers to "input[text]"
		var todoText = $(this).val();
	//Clear input 
	$(this).val("");
	//Create a new 'li' from input[text]
	$("ul").append("<li><span><i class='fas fa-dumpster-fire'></i></span> " + todoText + "</li>")
		}
});

//toggle hiding todo list using .fadeToggle on the id #toggle-form.
$("#toggle-form").click(function(){
	$("input[type='text']").fadeToggle();
});

