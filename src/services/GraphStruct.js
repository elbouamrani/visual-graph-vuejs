const GraphStruct = {
	graphMap: null,
	setup(nodes, edges) {
		this.graphMap = new Map();
		nodes.forEach((item) => this.addNode(item));
		edges.forEach((item) => this.addEdge(...item));
		return this;
	},
	addNode(item) {
		this.graphMap.set(item, []);
	},
	addEdge(from, to) {
		this.graphMap.get(from).push(to);
		this.graphMap.get(to).push(from);
	},
	async bfs(start, target, callback) {
		const visited = new Set();
		const queue = [start];

		while (queue.length > 0) {
			const city = queue.shift(); //mutate queue

			const distinations = this.graphMap.get(city);

			for (const distination of distinations) {
				if (distination === target) {
					console.log("found it!");
				}

				if (!visited.has(distination)) {
					visited.add(distination);
					queue.push(distination);
					await callback(distination);
				}
			}
		}
	},
	async dfs(start, target, callback, visited = new Set()) {
		await callback(start);
		visited.add(start);

		const distinations = this.graphMap.get(start);

		for (const distination of distinations) {
			if (distination === target) {
				console.log("Found target!!!");
				return true;
			}

			if (!visited.has(distination)) {
				const result = await this.dfs(
					distination,
					target,
					callback,
					visited
				);
				if (result) return true;
			}
		}
	},
};

export default GraphStruct;
