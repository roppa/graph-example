class Graph {
 
  constructor () {
    this.nodes = {};
  }

  getNode (value) {
    return this.nodes[value];
  }

  addNode (node) {
    this.nodes[node] = this.nodes[node] || {
      edges: {}
    };
  }

  removeNode (node) {
    delete this.nodes[node];
  }

  contains (node) {
    return this.nodes.hasOwnProperty(node);
  }

  addEdge (node1, node2) {
    this.nodes[node1].edges[node2] = this.nodes[node2];
    this.checkCyclic(node1, node2);
  }

  removeEdge (node1, node2) {
    delete this.nodes[node1].edges[node2];
  }

  hasEdge (node1, node2) {
    return this.nodes[node1].edges.hasOwnProperty(node2);
  }

  checkCyclic (parent, target) {
    const cyclic = (node) => {
      Object.keys(node.edges).forEach(edge => {
        if (edge === parent) {
          this.removeEdge(parent, target);
          throw new Error('Graph is cyclic');
        }   
        cyclic(this.getNode(edge));
      });
    }
    cyclic(this.getNode(parent));
  }

}

module.exports = Graph;
