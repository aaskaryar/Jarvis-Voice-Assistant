$(document).ready(function () {
    // Event listener for send button click
    $("#send-btn").on("click", function () {
        sendMessage();
    });

    // Event listener for enter key press
    $("#user-input").on("keypress", function (e) {
        if (e.which === 13) {
            sendMessage();
        }
    });

    // Function to send user message to the back-end
    function sendMessage() {
        var userInput = $("#user-input").val();
        if (userInput.trim() !== "") {
            displayUserMessage(userInput);
            sendToBackend(userInput);
        }
        $("#user-input").val("");
    }

    // Function to display user message in the chat interface
    function displayUserMessage(message) {
        var chatMessages = $("#chat-messages");
        var userMessage = $('<div class="chat-bubble user-bubble"></div>').text(message);
        chatMessages.append(userMessage);
        chatMessages.scrollTop(chatMessages.prop("scrollHeight"));
    }

    // Function to send user message to the back-end
    function sendToBackend(message) {
        // Send an AJAX request to the back-end API
        $.ajax({
            url: "/api/chat",
            type: "POST",
            data: JSON.stringify({ message: message }),
            contentType: "application/json",
            success: function (response) {
                displayBotMessage(response);
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });
    }

    // Function to display bot response in the chat interface
    function displayBotMessage(message) {
        var chatMessages = $("#chat-messages");
        var botMessage = $('<div class="chat-bubble bot-bubble"></div>').text(message);
        chatMessages.append(botMessage);
        chatMessages.scrollTop(chatMessages.prop("scrollHeight"));
    }
});
