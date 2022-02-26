// JavaScript file only for the home page

$(document).ready(() => {
    $.get("/api/posts", (results) => {
    // Gets the contents of "api/posts" endpoint and when it's done it will return with 
        // the contents of postData and then it will execute the code below
        
        console.log(results)
           

    
    })
})