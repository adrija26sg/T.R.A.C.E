from flask import Flask, request, jsonify

app = Flask(__name__)  # Corrected __name__ instead of _name_

# Global variable to store the latest sensor data
latest_data = {}

@app.route('/data', methods=['POST'])
def receive_data():
    global latest_data
    data = request.get_json()  # Receive JSON data
    if data:
        latest_data = data
        print("Data received:", data)
        return jsonify({"message": "Data received successfully"}), 200
    else:
        return jsonify({"message": "No data received"}), 400

@app.route('/fetch', methods=['GET'])
def fetch_data():
    return jsonify(latest_data)  # Return the latest data as JSON

if __name__ == '__main__':  # Corrected __name__ instead of _name_
    app.run(host='0.0.0.0', port=3002, debug=True)  # Recheck for non-breaking spaces here
