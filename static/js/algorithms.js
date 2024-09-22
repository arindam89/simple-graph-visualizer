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

function aStar(graph, startNode, goalNode, heuristic) {
    console.log(`A* Search: Start node: ${startNode}, Goal node: ${goalNode}`);
    const openSet = new Set([startNode]);
    const closedSet = new Set();
    const gScore = new Map();
    const fScore = new Map();
    const cameFrom = new Map();
    const steps = [];
    const result = [];

    gScore.set(startNode, 0);
    fScore.set(startNode, heuristic(startNode, goalNode));

    while (openSet.size > 0) {
        console.log(`Open set: ${Array.from(openSet)}`);
        const currentNode = Array.from(openSet).reduce((a, b) => fScore.get(a) < fScore.get(b) ? a : b);
        console.log(`Current node: ${currentNode}`);

        if (currentNode === goalNode) {
            console.log('Goal reached, reconstructing path...');
            // Reconstruct path
            let current = currentNode;
            while (current !== null) {
                result.unshift(current);
                current = cameFrom.get(current);
            }
            console.log(`Path found: ${result.join(' -> ')}`);
            return { steps, result };
        }

        openSet.delete(currentNode);
        closedSet.add(currentNode);
        steps.push({ node: currentNode, type: 'visit' });

        for (const { id: neighbor, weight } of graph.getNeighbors(currentNode)) {
            console.log(`Checking neighbor: ${neighbor}`);
            if (closedSet.has(neighbor)) {
                console.log(`Neighbor ${neighbor} already in closed set, skipping`);
                continue;
            }

            const tentativeGScore = gScore.get(currentNode) + weight;
            console.log(`Tentative g-score for ${neighbor}: ${tentativeGScore}`);

            if (!openSet.has(neighbor)) {
                openSet.add(neighbor);
                console.log(`Added ${neighbor} to open set`);
            } else if (tentativeGScore >= gScore.get(neighbor)) {
                console.log(`Path to ${neighbor} not better, skipping`);
                continue;
            }

            cameFrom.set(neighbor, currentNode);
            gScore.set(neighbor, tentativeGScore);
            fScore.set(neighbor, gScore.get(neighbor) + heuristic(neighbor, goalNode));
            console.log(`Updated scores for ${neighbor}: g=${gScore.get(neighbor)}, f=${fScore.get(neighbor)}`);
            steps.push({ from: currentNode, to: neighbor, type: 'edge' });
        }
    }

    console.log('No path found');
    // No path found
    return { steps, result: [] };
}