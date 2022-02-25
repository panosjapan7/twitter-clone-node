// common.js will include all the shared js code between our site will be

$("#postTextarea").keyup((event) => {
// this function will fire off when the user selects the textarea and presses a key on the keyboard.
    var textbox = $(event.target);
    // Creates a javascript object by using the event.target. The target event property returns the element that triggered the event. 
    
    var value = textbox.val().trim();
    // .val() is a built-in function that gives you the value of this element (in our case is the text inside the textbox)
    // I used trim() so that users can't create empty posts.
    
    var submitButton = $("#submitPostButton");
    // Stores the button element as a variable called "submitButton"

    if(submitButton.length == 0) return alert("No submit button found.");
    // this checks if an html element with the id "submitPostButton" exists. 
    // If there isn't (if length == 0) it ends the execution of the function here (because I return the alert).

    if(value == "") {
        submitButton.prop("disabled", true);
        return;
        // Checks if the value in the textbox is empty, and sets the submit button to disabled if it is.
    }

    submitButton.prop("disabled", false);
    return;
    // Checks if the value in the textbox is empty, and sets the submit button to enabled if it's not empty.
})

