const canvas = document.getElementById('graph-canvas');
const ctx = canvas.getContext('2d');
let graph = new Graph();
let nodePositions = new Map();
let animationState = {
    isPlaying: false,
    currentStep: 0,
    steps: [],
    result: [],
    distances: null
};

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
        for (const [neighborId, weight] of neighbors.entries()) {
            const targetPos = nodePositions.get(neighborId);
            ctx.beginPath();
            ctx.moveTo(sourcePos.x, sourcePos.y);
            ctx.lineTo(targetPos.x, targetPos.y);
            ctx.stroke();

            // Draw weight
            const midX = (sourcePos.x + targetPos.x) / 2;
            const midY = (sourcePos.y + targetPos.y) / 2;
            ctx.fillStyle = '#666';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(weight, midX, midY);
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
    const weight = prompt('Enter edge weight:');
    if (source !== null && target !== null && weight !== null) {
        graph.addEdge(parseInt(source), parseInt(target), parseInt(weight));
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

function displayFinalResult(result, distances = null) {
    const resultDiv = document.getElementById('algorithm-result');
    let resultText = `Algorithm result: ${result.join(' -> ')}`;
    if (distances) {
        resultText += '\nShortest distances:';
        for (const [node, distance] of distances) {
            resultText += `\nNode ${node}: ${distance}`;
        }
    }
    resultDiv.textContent = resultText;
    resultDiv.classList.remove('hidden');
}

function animateStep() {
    if (animationState.currentStep < animationState.steps.length) {
        const step = animationState.steps[animationState.currentStep];
        if (step.type === 'visit') {
            drawGraph(step.node);
        } else if (step.type === 'edge') {
            drawGraph(null, { from: step.from, to: step.to });
        }
        animationState.currentStep++;
        updateAnimationControls();
    } else {
        stopAnimation();
    }
}

function startAnimation() {
    animationState.isPlaying = true;
    document.getElementById('play-pause').textContent = 'Pause';
    animateNextStep();
}

function pauseAnimation() {
    animationState.isPlaying = false;
    document.getElementById('play-pause').textContent = 'Play';
}

function stopAnimation() {
    pauseAnimation();
    animationState.currentStep = 0;
    drawGraph();
    displayFinalResult(animationState.result, animationState.distances);
    updateAnimationControls();
}

function animateNextStep() {
    if (animationState.isPlaying) {
        animateStep();
        const speed = document.getElementById('animation-speed').value;
        setTimeout(animateNextStep, 1000 / speed);
    }
}

function updateAnimationControls() {
    const playPauseBtn = document.getElementById('play-pause');
    const stepBtn = document.getElementById('step');
    const progress = document.getElementById('animation-progress');

    playPauseBtn.disabled = animationState.currentStep >= animationState.steps.length;
    stepBtn.disabled = animationState.currentStep >= animationState.steps.length;
    progress.textContent = `Step ${animationState.currentStep} / ${animationState.steps.length}`;
}

document.getElementById('play-pause').addEventListener('click', () => {
    if (animationState.isPlaying) {
        pauseAnimation();
    } else {
        startAnimation();
    }
});

document.getElementById('step').addEventListener('click', () => {
    pauseAnimation();
    animateStep();
});

document.getElementById('reset').addEventListener('click', () => {
    stopAnimation();
});

function animateAlgorithm(steps, result, distances = null) {
    animationState.steps = steps;
    animationState.result = result;
    animationState.distances = distances;
    animationState.currentStep = 0;
    updateAnimationControls();
    startAnimation();
}

function euclideanDistance(node1, node2) {
    const pos1 = nodePositions.get(node1);
    const pos2 = nodePositions.get(node2);
    return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
}

document.getElementById('run-algorithm').addEventListener('click', () => {
    const algorithm = document.getElementById('algorithm').value;
    const startNode = parseInt(prompt('Enter start node ID:'));

    if (graph.nodes.has(startNode)) {
        let algorithmResult;
        if (algorithm === 'bfs') {
            algorithmResult = bfs(graph, startNode);
            animateAlgorithm(algorithmResult.steps, algorithmResult.result);
        } else if (algorithm === 'dfs') {
            algorithmResult = dfs(graph, startNode);
            animateAlgorithm(algorithmResult.steps, algorithmResult.result);
        } else if (algorithm === 'dijkstra') {
            algorithmResult = dijkstra(graph, startNode);
            animateAlgorithm(algorithmResult.steps, algorithmResult.result, algorithmResult.distances);
        } else if (algorithm === 'astar') {
            const goalNode = parseInt(prompt('Enter goal node ID:'));
            if (graph.nodes.has(goalNode)) {
                algorithmResult = aStar(graph, startNode, goalNode, euclideanDistance);
                animateAlgorithm(algorithmResult.steps, algorithmResult.result);
            } else {
                alert('Invalid goal node ID');
            }
        }
    } else {
        alert('Invalid start node ID');
    }
});

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
