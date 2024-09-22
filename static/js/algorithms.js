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

        for (const neighbor of graph.getNeighbors(node)) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
                steps.push({ from: node, to: neighbor, type: 'edge' });
            }
        }
    }

    return steps;
}

function dfs(graph, startNode) {
    const visited = new Set();
    const result = [];
    const steps = [];

    function dfsRecursive(node) {
        visited.add(node);
        result.push(node);
        steps.push({ node, type: 'visit' });

        for (const neighbor of graph.getNeighbors(node)) {
            if (!visited.has(neighbor)) {
                steps.push({ from: node, to: neighbor, type: 'edge' });
                dfsRecursive(neighbor);
            }
        }
    }

    dfsRecursive(startNode);
    return steps;
}
