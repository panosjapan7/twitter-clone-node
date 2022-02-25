// common.js will include all the shared js code between our site will be

$("#postTextarea").keyup((event) => {
// this function will fire off when the user selects the textarea and presses a key on the keyboard.
    var textbox = $(event.target);
    // Creates a javascript object by using the event.target. The target event property returns the element that triggered the event. 
    
    var value = textbox.val().trim();
    // .val() is a built-in function that gives you the value of this element (in our case is the text inside the textbox)
    // I used trim() so that users can't create empty posts.
    console.log(value);
})

