const tutorials = {
    bfs: {
        title: "Breadth-First Search (BFS)",
        content: `
            <p>Breadth-First Search (BFS) is a graph traversal algorithm that explores all the vertices of a graph or tree at the present depth before moving on to the vertices at the next depth level.</p>
            <h3 class="font-bold mt-2">How it works:</h3>
            <ol class="list-decimal list-inside">
                <li>Start at a chosen node (root).</li>
                <li>Explore all neighboring nodes at the present depth.</li>
                <li>Move to the next level of nodes.</li>
                <li>Repeat steps 2 and 3 until all nodes are explored.</li>
            </ol>
            <h3 class="font-bold mt-2">Use cases:</h3>
            <ul class="list-disc list-inside">
                <li>Finding the shortest path in an unweighted graph.</li>
                <li>Web crawling.</li>
                <li>Social networking features (e.g., finding friends within a certain degree of separation).</li>
            </ul>
        `
    },
    dfs: {
        title: "Depth-First Search (DFS)",
        content: `
            <p>Depth-First Search (DFS) is a graph traversal algorithm that explores as far as possible along each branch before backtracking.</p>
            <h3 class="font-bold mt-2">How it works:</h3>
            <ol class="list-decimal list-inside">
                <li>Start at a chosen node (root).</li>
                <li>Explore as far as possible along each branch before backtracking.</li>
                <li>Mark visited nodes to avoid cycles.</li>
                <li>Backtrack when there are no more unvisited adjacent nodes.</li>
            </ol>
            <h3 class="font-bold mt-2">Use cases:</h3>
            <ul class="list-disc list-inside">
                <li>Topological sorting.</li>
                <li>Finding connected components in a graph.</li>
                <li>Solving puzzles with only one solution (e.g., maze problems).</li>
            </ul>
        `
    },
    dijkstra: {
        title: "Dijkstra's Algorithm",
        content: `
            <p>Dijkstra's Algorithm is used to find the shortest path between nodes in a graph with non-negative edge weights.</p>
            <h3 class="font-bold mt-2">How it works:</h3>
            <ol class="list-decimal list-inside">
                <li>Initialize distances to all nodes as infinite, except the starting node (distance = 0).</li>
                <li>Create a set of unvisited nodes.</li>
                <li>For the current node, consider all unvisited neighbors and calculate their tentative distances.</li>
                <li>Compare the newly calculated tentative distance to the current assigned value and assign the smaller one.</li>
                <li>Mark the current node as visited and remove it from the unvisited set.</li>
                <li>If the destination node has been marked visited, the algorithm has finished.</li>
                <li>Repeat from step 3 for the node with the smallest tentative distance.</li>
            </ol>
            <h3 class="font-bold mt-2">Use cases:</h3>
            <ul class="list-disc list-inside">
                <li>Finding the shortest path in weighted graphs (e.g., road networks, computer networks).</li>
                <li>Routing protocols in computer networks.</li>
                <li>Geographical mapping and navigation systems.</li>
            </ul>
        `
    },
    astar: {
        title: "A* Search Algorithm",
        content: `
            <p>A* (A-star) is a best-first search algorithm that finds the least-cost path from a given initial node to a goal node.</p>
            <h3 class="font-bold mt-2">How it works:</h3>
            <ol class="list-decimal list-inside">
                <li>Start with the initial node and calculate its f(n) = g(n) + h(n), where:
                    <ul class="list-disc list-inside ml-4">
                        <li>g(n) is the cost from the start node to the current node</li>
                        <li>h(n) is the estimated cost from the current node to the goal (heuristic)</li>
                    </ul>
                </li>
                <li>Add the initial node to the open list.</li>
                <li>While the open list is not empty:
                    <ul class="list-disc list-inside ml-4">
                        <li>Choose the node with the lowest f(n) from the open list.</li>
                        <li>If this node is the goal, the algorithm is complete.</li>
                        <li>Otherwise, generate successor nodes and calculate their f(n) values.</li>
                        <li>Add successors to the open list if they're not already there or have a better path.</li>
                        <li>Move the current node to the closed list.</li>
                    </ul>
                </li>
            </ol>
            <h3 class="font-bold mt-2">Use cases:</h3>
            <ul class="list-disc list-inside">
                <li>Pathfinding in video games and robotics.</li>
                <li>Solving puzzles (e.g., sliding puzzle, Rubik's cube).</li>
                <li>Route planning in navigation systems.</li>
            </ul>
        `
    }
};

function updateTutorial(algorithm) {
    const tutorialContent = document.getElementById('tutorial-content');
    const tutorial = tutorials[algorithm];
    
    if (tutorial) {
        tutorialContent.innerHTML = `
            <h3 class="text-lg font-bold mb-2">${tutorial.title}</h3>
            ${tutorial.content}
        `;
    } else {
        tutorialContent.innerHTML = '<p>No tutorial available for this algorithm.</p>';
    }
}

// Initialize the tutorial content when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const algorithmSelect = document.getElementById('algorithm');
    updateTutorial(algorithmSelect.value);

    // Update the tutorial content when the algorithm selection changes
    algorithmSelect.addEventListener('change', (event) => {
        updateTutorial(event.target.value);
    });
});
