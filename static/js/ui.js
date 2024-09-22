const canvas = document.getElementById('graph-canvas');
const ctx = canvas.getContext('2d');
let graph = new Graph();
let nodePositions = new Map();

function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    drawGraph();
}

function drawGraph(highlightedNode = null, highlightedEdge = null) {
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

    // Highlight edge if specified
    if (highlightedEdge) {
        const sourcePos = nodePositions.get(highlightedEdge.from);
        const targetPos = nodePositions.get(highlightedEdge.to);
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(sourcePos.x, sourcePos.y);
        ctx.lineTo(targetPos.x, targetPos.y);
        ctx.stroke();
    }

    // Draw nodes
    for (const [nodeId, pos] of nodePositions.entries()) {
        ctx.fillStyle = nodeId === highlightedNode ? '#ff0000' : '#3498db';
        ctx.strokeStyle = '#2980b9';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 20, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#fff';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(nodeId, pos.x, pos.y);
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

function displayFinalResult(result) {
    const resultDiv = document.getElementById('algorithm-result');
    resultDiv.textContent = `Algorithm result: ${result.join(' -> ')}`;
    resultDiv.style.display = 'block';
}

function animateAlgorithm(steps, result) {
    const speed = document.getElementById('animation-speed').value;
    let i = 0;
    function animate() {
        if (i < steps.length) {
            const step = steps[i];
            if (step.type === 'visit') {
                drawGraph(step.node);
            } else if (step.type === 'edge') {
                drawGraph(null, { from: step.from, to: step.to });
            }
            i++;
            setTimeout(animate, 1000 / speed);
        } else {
            drawGraph();
            displayFinalResult(result);
        }
    }
    animate();
}

document.getElementById('run-algorithm').addEventListener('click', () => {
    const algorithm = document.getElementById('algorithm').value;
    const startNode = parseInt(prompt('Enter start node ID:'));

    if (graph.nodes.has(startNode)) {
        let algorithmResult;
        if (algorithm === 'bfs') {
            algorithmResult = bfs(graph, startNode);
        } else if (algorithm === 'dfs') {
            algorithmResult = dfs(graph, startNode);
        }

        animateAlgorithm(algorithmResult.steps, algorithmResult.result);
    } else {
        alert('Invalid start node ID');
    }
});

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
