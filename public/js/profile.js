// JavaScript file only for the profile page

$(document).ready(() => {
    loadPosts();
})

function loadPosts(){
    $.get("/api/posts", (results) => {
    // Gets the contents of "api/posts" endpoint and when it's done it will return with 
        // the contents of postData and then it will execute the code below
        // console.log(profileUserId)
        outputPosts(results, $(".postsContainer"));
        // We're passing in the div "postsContainer" from home.pug  
    })
}

function outputPosts(results, container) {
    
    container.html("");
    // Empties the current container.

    results.forEach((result) => {
    // Loops over every sinlge one of the results and output it.
    console.log(result)
    if(profileUserId === result.postedBy._id){
    // Checks if the id of the user whose page we are at right now is the same as the id of the creator of a post.
    // If it is, it executes the code below, creates the html elements with createPostHtml(), 
    // and appends it to div with id ".postsContainer", which contains all posts.

        var html = createPostHtml(result);
        // For every result found during the forEach() iteration, it calls the function createPostHtml
        // which we wrote in common.js, which creates a set of HTML elements that consist of one tweet.
        
        container.append(html);
        // Adds every tweet inside the container, with the most recent tweet added last.
    }
    console.log(result.postedBy.password)
    // console.log(`profileUserId: ${profileUserId}`)    
    // console.log(`result._id: ${result._id}`)
    });

    if(results.length == 0) {
    // Covers the case where there are no posts and displays message by appending a span to the container.
        container.append("<span class='noResults'>Nothing to show.</span>")
    }
}