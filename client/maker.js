"use strict";

$(document).ready(function() {

    function handleError(message) {
        $("#errorMessage").text(message);
        $("#domoMessage").animate({width:'toggle'},350);
    }
    
    function sendAjax(action, data) {
        console.log("ajax starting");
        $.ajax({
            cache: false,
            type: "POST",
            url: action,
            data: data,
            dataType: "json",
            success: function(result, status, xhr) {
                console.log("success starting");
                $("#domoMessage").animate({width:'hide'},350);

                window.location = result.redirect;
            },
            error: function(xhr, status, error) {
                console.log("error starting");
                var messageObj = JSON.parse(xhr.responseText);
            
                handleError(messageObj.error);
            }
        });        
    }
    
    $("#makeScrapeSubmit").on("click", function(e) {
        e.preventDefault();
    
        $("#domoMessage").animate({width:'hide'},350);
    
        if($("#scrapeURL").val() == '' || $("#scrapeQuery").val() == '') {
            handleError("All fields are required");
            return false;
        }

        sendAjax($("#scrapeForm").attr("action"), $("#scrapeForm").serialize());
        return false;
    });

    $(".scrape").on("click", function(e){
        var results = $(".result");

        for (var i = results.length; i<0; i++) {
            var scrapeClass=this.attr('class').split(/\s+/);
            var resultClass=result[i].attr('class').split(/\s+/);
            console.log(scrapeClass);
            console.log(resultClass);
        };
    });

    console.log($(".scrape"));
    
});