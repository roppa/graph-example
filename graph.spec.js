const test = require('tape');
const Graph = require('./graph');

test('Graph', (assert) => {
  const g = new Graph();
  assert.ok(g instanceof Graph, 'should create a new graph data structure');
  assert.end();
});

test('Graph addNode', (assert) => {
  const g = new Graph();
  assert.doesNotThrow(() => g.addNode('A'), 'should not throw');
  assert.end();
});

test('Graph contains', (assert) => {
  const g = new Graph();
  g.addNode('A');
  assert.ok(g.contains('A'), 'should return true');
  assert.notOk(g.contains('B'), 'should return false');
  assert.end();
});

test('Graph removeNode', (assert) => {
  const g = new Graph();
  g.addNode('A');
  assert.ok(g.contains('A'), 'should return true');
  g.removeNode('A');
  assert.notOk(g.contains('A'), 'should return false');
  assert.end();
});

test('Graph getNode', (assert) => {
  const g = new Graph();
  g.addNode('A');
  const a = g.getNode('A');
  assert.ok(Object.keys(a.edges).length === 0, 'should have edges');
  assert.end();
});

test('Graph addEdge', (assert) => {
  const g = new Graph();
  g.addNode('A');
  g.addNode('B');
  assert.doesNotThrow(() => g.addEdge('A', 'B'), 'should not throw');
  assert.end();
});

test('Graph hasEdge', (assert) => {
  const g = new Graph();
  g.addNode('A');
  g.addNode('B');
  g.addNode('C');
  g.addEdge('A', 'B');
  assert.ok(g.hasEdge('A', 'B'), 'should return true');
  assert.notOk(g.hasEdge('A', 'C'), 'should return false');
  assert.end();
});

test('Graph removeEdge', (assert) => {
  const g = new Graph();
  g.addNode('A');
  g.addNode('B');
  g.addEdge('A', 'B');
  assert.ok(g.hasEdge('A', 'B'), 'should return true');
  g.removeEdge('A', 'B');
  assert.notOk(g.hasEdge('A', 'B'), 'should return false');
  assert.end();
});

test('Graph node add edge to itself', (assert) => {
  const g = new Graph();
  g.addNode('A');
  assert.throws(() => g.addEdge('A', 'A'), 'should throw');
  assert.end();
});

test('Graph node add cyclic edge from distance of one', (assert) => {
  const g = new Graph();
  g.addNode('A');
  g.addNode('B');
  g.addEdge('A', 'B');
  assert.throws(() => g.addEdge('B', 'A'), 'should throw');
  assert.end();
});

test('Graph node add cyclic edge from distance of two', (assert) => {
  const g = new Graph();
  g.addNode('A');
  g.addNode('B');
  g.addNode('C');
  g.addEdge('A', 'B');
  g.addEdge('B', 'C');
  assert.throws(() => g.addEdge('C', 'A'), 'should throw');
  assert.notOk(g.hasEdge('C', 'A'), 'should remove the edge');
  assert.end();
});
