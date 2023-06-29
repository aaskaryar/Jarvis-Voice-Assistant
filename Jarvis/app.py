import requests
from flask import Flask, jsonify, request

app = Flask(__name__)

# Your ChatGPT API endpoint
API_ENDPOINT = "https://api.chatgptapi.dev/v1/chat/completion"

@app.route("/")
def index():
    return app.send_static_file("main.html")

@app.route("/api/chat", methods=["POST"])
def chat():
    message = request.json.get("message")
    if not message:
        return jsonify({"error": "Invalid request"}), 400

    # Prepare the data for the ChatGPT API request
    data = {
        "messages": [{"role": "system", "content": "You"}],
        "max_tokens": 50,
        "temperature": 0.8,
        "model": "gpt-3.5-turbo"  # Specify the ChatGPT model
    }
    # Add user message to the data
    data["messages"].append({"role": "user", "content": message})

    try:
        # Send the request to the ChatGPT API
        response = requests.post(API_ENDPOINT, json=data)
        response.raise_for_status()
        result = response.json()

        # Extract and return the bot's reply
        bot_reply = result["choices"][0]["message"]["content"]
        return jsonify({"message": bot_reply})
    except requests.exceptions.RequestException as e:
        # Handle API request errors
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run()
