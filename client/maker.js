"use strict";

$(document).ready(function() {

    function handleError(message) {
        $("#errorMessage").text(message);
    }
    
    function sendAjax(action, data) {
        $.ajax({
            cache: false,
            type: "POST",
            url: action,
            data: data,
            dataType: "json",
            success: function(result, status, xhr) {
                window.location = result.redirect;
            },
            error: function(xhr, status, error) {
                var messageObj = JSON.parse(xhr.responseText);
            
                handleError(messageObj.error);
            }
        });        
    }
    
    $("#addScrapeSubmit").on("click", function(e) {
        e.preventDefault();
    
        if($("#scrapeURL").val() == '' || $("#scrapeQuery").val() == '') {
            handleError("All fields are required");
            return false;
        }

        sendAjax($("#addScrape").attr("action"), $("#addScrape").serialize());
        
        return false;
    });
    
});