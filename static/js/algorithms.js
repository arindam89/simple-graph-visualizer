function bfs(graph, startNode) {
    const visited = new Set();
    const queue = [startNode];
    const result = [];

    visited.add(startNode);

    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node);

        for (const neighbor of graph.getNeighbors(node)) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }

    return result;
}

function dfs(graph, startNode) {
    const visited = new Set();
    const result = [];

    function dfsRecursive(node) {
        visited.add(node);
        result.push(node);

        for (const neighbor of graph.getNeighbors(node)) {
            if (!visited.has(neighbor)) {
                dfsRecursive(neighbor);
            }
        }
    }

    dfsRecursive(startNode);
    return result;
}
