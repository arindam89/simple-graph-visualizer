function bfs(graph, startNode) {
    const visited = new Set();
    const queue = [startNode];
    const result = [];
    const steps = [];

    visited.add(startNode);

    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node);
        steps.push({ node, type: 'visit' });

        for (const { id: neighbor } of graph.getNeighbors(node)) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
                steps.push({ from: node, to: neighbor, type: 'edge' });
            }
        }
    }

    return { steps, result };
}

function dfs(graph, startNode) {
    const visited = new Set();
    const result = [];
    const steps = [];

    function dfsRecursive(node) {
        visited.add(node);
        result.push(node);
        steps.push({ node, type: 'visit' });

        for (const { id: neighbor } of graph.getNeighbors(node)) {
            if (!visited.has(neighbor)) {
                steps.push({ from: node, to: neighbor, type: 'edge' });
                dfsRecursive(neighbor);
            }
        }
    }

    dfsRecursive(startNode);
    return { steps, result };
}

function dijkstra(graph, startNode) {
    const distances = new Map();
    const previous = new Map();
    const unvisited = new Set(graph.getAllNodes());
    const steps = [];
    const result = [];

    // Initialize distances
    for (const node of graph.getAllNodes()) {
        distances.set(node, node === startNode ? 0 : Infinity);
        previous.set(node, null);
    }

    while (unvisited.size > 0) {
        // Find the unvisited node with the smallest distance
        let currentNode = Array.from(unvisited).reduce((minNode, node) => 
            distances.get(node) < distances.get(minNode) ? node : minNode
        );

        unvisited.delete(currentNode);
        result.push(currentNode);
        steps.push({ node: currentNode, type: 'visit' });

        if (distances.get(currentNode) === Infinity) {
            break; // All remaining nodes are inaccessible
        }

        for (const { id: neighbor, weight } of graph.getNeighbors(currentNode)) {
            if (unvisited.has(neighbor)) {
                const tentativeDistance = distances.get(currentNode) + weight;
                if (tentativeDistance < distances.get(neighbor)) {
                    distances.set(neighbor, tentativeDistance);
                    previous.set(neighbor, currentNode);
                    steps.push({ from: currentNode, to: neighbor, type: 'edge' });
                }
            }
        }
    }

    return { steps, result, distances, previous };
}
