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

$("#submitPostButton").click(() => {
// Handles the button-press. When the submit button is clicked, it will execute the code below.
    var button = $(event.target);
    
    var textbox = $("#postTextarea");

    var data = {
    // data is going to be an object that contains the information we send to the server via the textform
        content: textbox.val()
    }

    $.post("/api/posts", data, (postData) => {
    // Makes an AJAX request which sends the data to server without us needing to reload the page.
    // $.post() means I am submitting AJAX request.
    // We're sending the contents of var "data" to the url "/api/post" and when it's done it will return with 
        // the contents of postData and then it will execute the code below

        var html = createPostHtml(postData);
        // Invokes the function we created below
        
        $(".postsContainer").prepend(html);
        // we use prepend because it adds it to the beginning - the top, unlike append which adds it to the end.
        
        textbox.val("");
        // Clears the textbox after the user has submitted a post
        
        button.prop("disabled", true);
        // Manually make the submnit button 'disabled'

    })

})



function createPostHtml(postData) {
    
    var postedBy = postData.postedBy;
    var displayName = postedBy.firstName + " " + postedBy.lastName; 
    var timestamp = postData.createdAt;

    return `<div class="post">
                <div class="mainContentContainer">
                    <div class="userImageContainer">
                        <a href="/profile/${postedBy.username}"><img src="${postedBy.profilePic}"></a>
                    </div>
                    <div class="postContentContainer">
                        <div class="header">
                            <a href="/profile/${postedBy.username}">@${postedBy.username}</a>
                            </br>
                            <!-- <span class="username">@${postedBy.username}</span> -->
                            </br>
                            <span class="date">${timestamp}</span>
                        </div>
                        <div class="body">
                            <span>${postData.content}</span>
                        </div>
                        <div class="postFooter">
                        
                        </div>
                    </div>
                </div>
            </div>`
}