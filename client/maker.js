"use strict";

$(document).ready(function() {

    function handleError(message) {
        $("#errorMessage").text(message);
        $("#domoMessage").animate({width:'toggle'},350);
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
    
    $("#makeDomoSubmit").on("click", function(e) {
        e.preventDefault();
    
        $("#domoMessage").animate({width:'hide'},350);
    
        if($("#domoName").val() == '' || $("#domoAge").val() == '') {
            handleError("RAWR! All fields are required");
            return false;
        }

<<<<<<< HEAD
        sendAjax($("#addScrape").attr("action"), $("#scrapeForm").serialize());
=======
        sendAjax($("#domoForm").attr("action"), $("#domoForm").serialize());
>>>>>>> parent of 5e78c9b... playing with jade and stuff, probably broke everything
        
        return false;
    });
    
});