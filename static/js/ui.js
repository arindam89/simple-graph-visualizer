const canvas = document.getElementById('graph-canvas');
const ctx = canvas.getContext('2d');
let graph = new Graph();
let nodePositions = new Map();

function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    drawGraph();
}

function drawGraph() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    ctx.strokeStyle = '#999';
    ctx.lineWidth = 2;
    for (const [nodeId, neighbors] of graph.nodes.entries()) {
        const sourcePos = nodePositions.get(nodeId);
        for (const neighborId of neighbors) {
            const targetPos = nodePositions.get(neighborId);
            ctx.beginPath();
            ctx.moveTo(sourcePos.x, sourcePos.y);
            ctx.lineTo(targetPos.x, targetPos.y);
            ctx.stroke();
        }
    }

    // Draw nodes
    ctx.fillStyle = '#3498db';
    ctx.strokeStyle = '#2980b9';
    ctx.lineWidth = 2;
    for (const [nodeId, pos] of nodePositions.entries()) {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 20, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#fff';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(nodeId, pos.x, pos.y);
        ctx.fillStyle = '#3498db';
    }
}

function generateRandomPositions() {
    nodePositions.clear();
    const padding = 50;
    for (const nodeId of graph.getAllNodes()) {
        nodePositions.set(nodeId, {
            x: Math.random() * (canvas.width - 2 * padding) + padding,
            y: Math.random() * (canvas.height - 2 * padding) + padding
        });
    }
}

document.getElementById('generate-graph').addEventListener('click', () => {
    const numNodes = 10;
    const numEdges = 15;
    graph = generateRandomGraph(numNodes, numEdges);
    generateRandomPositions();
    drawGraph();
});

document.getElementById('add-node').addEventListener('click', () => {
    const newNodeId = graph.getAllNodes().length;
    graph.addNode(newNodeId);
    nodePositions.set(newNodeId, {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height
    });
    drawGraph();
});

document.getElementById('remove-node').addEventListener('click', () => {
    const nodeId = prompt('Enter node ID to remove:');
    if (nodeId !== null && graph.nodes.has(parseInt(nodeId))) {
        graph.removeNode(parseInt(nodeId));
        nodePositions.delete(parseInt(nodeId));
        drawGraph();
    }
});

document.getElementById('add-edge').addEventListener('click', () => {
    const source = prompt('Enter source node ID:');
    const target = prompt('Enter target node ID:');
    if (source !== null && target !== null) {
        graph.addEdge(parseInt(source), parseInt(target));
        drawGraph();
    }
});

document.getElementById('remove-edge').addEventListener('click', () => {
    const source = prompt('Enter source node ID:');
    const target = prompt('Enter target node ID:');
    if (source !== null && target !== null) {
        graph.removeEdge(parseInt(source), parseInt(target));
        drawGraph();
    }
});

document.getElementById('run-algorithm').addEventListener('click', () => {
    const algorithm = document.getElementById('algorithm').value;
    const startNode = parseInt(prompt('Enter start node ID:'));

    if (graph.nodes.has(startNode)) {
        let result;
        if (algorithm === 'bfs') {
            result = bfs(graph, startNode);
        } else if (algorithm === 'dfs') {
            result = dfs(graph, startNode);
        }

        alert(`${algorithm.toUpperCase()} result: ${result.join(' -> ')}`);
    } else {
        alert('Invalid start node ID');
    }
});

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
