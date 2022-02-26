// JavaScript file only for the home page

$(document).ready(() => {
    $.get("/api/posts", (results) => {
    // Gets the contents of "api/posts" endpoint and when it's done it will return with 
        // the contents of postData and then it will execute the code below
        
        outputPosts(results, $(".postsContainer"));
        // We're passing in the div "postsContainer" from home.pug
           

    
    })
})

function outputPosts(results, container) {
    
    container.html("");
    // Empties the current container.

    results.forEach((result) => {
    // Loop over every sinlge one of the results and output it.
        
        var html = createPostHtml(result);
        // For every result found during the forEach() iteration, it calls the function createPostHtml
        // which we wrote in common.js, which creates a set of HTML elements that consist of one tweet.

        container.append(html);
        // Adds every tweet inside the container, with the most recent tweet added last.
    });

    if(results.length == 0) {
    // Covers the case where there are no posts and displays message by appending a span to the container.
        container.append("<span class='noResults'>Nothing to show.</span>")
    }
}