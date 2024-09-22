# Graph Algorithm Visualization Tool

## Introduction

This web-based Graph Algorithm Visualization tool is designed to help users understand and visualize various graph algorithms. Built with Flask and JavaScript, it provides an interactive platform for generating random graphs, manipulating them, and running different graph algorithms with step-by-step visualization.

## Features

- Interactive graph creation and manipulation
- Random graph generation
- Support for multiple graph algorithms:
  - Breadth-First Search (BFS)
  - Depth-First Search (DFS)
  - Dijkstra's Algorithm
  - A* Search
- Step-by-step algorithm visualization
- Algorithm tutorials and explanations
- Save and load custom graphs
- Responsive design using Tailwind CSS

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/graph-algorithm-visualization.git
   cd graph-algorithm-visualization
   ```

2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Run the Flask application:
   ```
   python main.py
   ```

4. Open your web browser and navigate to `http://localhost:5000` to access the application.

## Usage

1. **Generate a Random Graph**: Click the "Generate Random Graph" button to create a new random graph.

2. **Manipulate the Graph**:
   - Add Node: Click "Add Node" to add a new node to the graph.
   - Remove Node: Click "Remove Node" and enter the node ID to remove it.
   - Add Edge: Click "Add Edge" and enter the source node, target node, and edge weight.
   - Remove Edge: Click "Remove Edge" and enter the source and target nodes of the edge to remove.

3. **Run an Algorithm**:
   - Select an algorithm from the dropdown menu.
   - Click "Run Algorithm" and enter the required information (e.g., start node, goal node for A*).
   - Use the animation controls to visualize the algorithm's execution:
     - Play/Pause: Start or pause the animation.
     - Step: Move through the algorithm one step at a time.
     - Reset: Reset the animation to the beginning.
     - Speed: Adjust the animation speed using the slider.

4. **Save and Load Graphs**:
   - Click "Save Graph" to save the current graph configuration.
   - Click "Load Graph" to load a previously saved graph.

5. **Learn About Algorithms**:
   - The tutorial section on the right provides information about each algorithm.
   - As you select different algorithms, the tutorial content will update accordingly.

## Implemented Algorithms

### Breadth-First Search (BFS)
BFS explores all vertices of a graph at the present depth before moving on to vertices at the next depth level. It's useful for finding the shortest path in unweighted graphs.

### Depth-First Search (DFS)
DFS explores as far as possible along each branch before backtracking. It's commonly used for topological sorting and finding connected components in a graph.

### Dijkstra's Algorithm
Dijkstra's algorithm finds the shortest path between nodes in a graph with non-negative edge weights. It's widely used in routing and as a subroutine in other graph algorithms.

### A* Search
A* is a best-first search algorithm that finds the least-cost path from a start node to a goal node. It uses a heuristic function to estimate the cost from any node to the goal, making it more efficient than Dijkstra's algorithm in many cases.

## Contributing

Contributions to improve the Graph Algorithm Visualization tool are welcome. Please feel free to submit pull requests or open issues to discuss potential enhancements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
