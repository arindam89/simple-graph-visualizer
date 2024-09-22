class Graph {
    constructor() {
        this.nodes = new Map();
    }

    addNode(id) {
        if (!this.nodes.has(id)) {
            this.nodes.set(id, new Set());
        }
    }

    removeNode(id) {
        if (this.nodes.has(id)) {
            this.nodes.delete(id);
            for (let edges of this.nodes.values()) {
                edges.delete(id);
            }
        }
    }

    addEdge(source, target) {
        this.addNode(source);
        this.addNode(target);
        this.nodes.get(source).add(target);
        this.nodes.get(target).add(source);
    }

    removeEdge(source, target) {
        if (this.nodes.has(source) && this.nodes.has(target)) {
            this.nodes.get(source).delete(target);
            this.nodes.get(target).delete(source);
        }
    }

    getNeighbors(id) {
        return Array.from(this.nodes.get(id) || []);
    }

    getAllNodes() {
        return Array.from(this.nodes.keys());
    }
}

function generateRandomGraph(numNodes, numEdges) {
    const graph = new Graph();
    
    // Add nodes
    for (let i = 0; i < numNodes; i++) {
        graph.addNode(i);
    }

    // Add random edges
    for (let i = 0; i < numEdges; i++) {
        const source = Math.floor(Math.random() * numNodes);
        let target = Math.floor(Math.random() * numNodes);
        
        // Avoid self-loops
        while (target === source) {
            target = Math.floor(Math.random() * numNodes);
        }

        graph.addEdge(source, target);
    }

    return graph;
}
