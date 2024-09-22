import os
import json
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

GRAPHS_DIR = 'saved_graphs'
os.makedirs(GRAPHS_DIR, exist_ok=True)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/save_graph", methods=['POST'])
def save_graph():
    data = request.json
    graph_name = data['name']
    graph_data = data['data']
    
    file_path = os.path.join(GRAPHS_DIR, f"{graph_name}.json")
    
    try:
        with open(file_path, 'w') as f:
            f.write(graph_data)
        return jsonify({"success": True})
    except Exception as e:
        print(f"Error saving graph: {e}")
        return jsonify({"success": False})

@app.route("/get_saved_graphs")
def get_saved_graphs():
    try:
        graphs = [f.split('.')[0] for f in os.listdir(GRAPHS_DIR) if f.endswith('.json')]
        return jsonify({"graphs": graphs})
    except Exception as e:
        print(f"Error getting saved graphs: {e}")
        return jsonify({"graphs": []})

@app.route("/load_graph/<graph_name>")
def load_graph(graph_name):
    file_path = os.path.join(GRAPHS_DIR, f"{graph_name}.json")
    
    try:
        with open(file_path, 'r') as f:
            graph_data = f.read()
        return jsonify({"success": True, "graph_data": graph_data})
    except Exception as e:
        print(f"Error loading graph: {e}")
        return jsonify({"success": False})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
