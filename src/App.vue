<template>
    <div id="app" class="app">
        <div class="graph-container" v-if="dataSet">
            <Graph :dataSet="dataSet" />
        </div>
        <div>
            <div class="actions-container">
                <div v-if="dataSet">
                    <label>from : </label>
                    <select @change="handleFromSelect">
                        <option
                            v-for="(item, key) in dataSet.nodes.get()"
                            :key="key"
                            :selected="item.label == from"
                        >
                            {{ item.label }}
                        </option>
                    </select>
                    &nbsp;|&nbsp;
                    <label>to : </label>
                    <select @change="handleToSelect">
                        <option
                            v-for="(item, key) in dataSet.nodes.get()"
                            :key="key"
                            :selected="item.label == to"
                        >
                            {{ item.label }}
                        </option>
                    </select>
                </div>
                <hr />
                <div>
                    <button @click="graphResetColor">reset</button> |
                    <button @click="graphBFS(from, to)">bfs</button>
                    |
                    <button @click="graphDFS(from, to)">dfs</button>
                </div>
                <hr />
            </div>
            <div style="display: flex" v-if="dataSet">
                <div>
                    <h3>nodes</h3>
                    <ul>
                        <li
                            v-for="(node, key) in dataSet.nodes.get()"
                            :key="key"
                        >
                            {{ node.label }}
                        </li>
                    </ul>
                </div>
                <div>
                    <h3>edges</h3>
                    <ul>
                        <li
                            v-for="(edge, key) in dataSet.edges.get()"
                            :key="key"
                        >
                            {{ edge.from }} - {{ edge.to }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { DataSet } from "vis-data";

import Graph from "./components/Graph";
import GraphStruct from "./services/GraphStruct";

import { cities, routes } from "./data/data.js";

import { sleep } from "./Utilities/Utils";

// eslint-disable-next-line no-unused-vars
const PaintNodeCallback = async (nodes, node) => {
    console.log(node);
    nodes.update({ id: node, color: { background: "#fe8181" } });
    await sleep(500);
    nodes.update([{ id: node, color: { background: "#6a8ebf" } }]);
    await sleep(500);
};

export default {
    name: "App",
    components: {
        Graph,
    },
    data() {
        return {
            from: "RAK",
            to: "ZGR",
            dataSet: null,
            network: null,
        };
    },
    methods: {
        async graphBFS(from, to) {
            await this.network.bfs(from, to, async (node) => {
                await PaintNodeCallback(this.dataSet.nodes, node);
            });
        },
        async graphDFS(from, to) {
            await this.network.dfs(from, to, async (node) => {
                await PaintNodeCallback(this.dataSet.nodes, node);
            });
        },
        graphResetColor() {
            this.dataSet.nodes.update(
                cities.map((city) => {
                    return { label: city, id: city, color: "#cccccc" };
                })
            );
        },
        handleFromSelect(e) {
            this.from = e.target.value;
        },
        handleToSelect(e) {
            this.to = e.target.value;
        },
    },
    mounted() {
        const nodesArray = cities.map((city) => {
            return { label: city, id: city, color: "#cccccc" };
        });
        const edgesArray = routes.map((route) => {
            return { from: route[0], to: route[1] };
        });

        this.dataSet = {
            nodes: new DataSet(nodesArray),
            edges: new DataSet(edgesArray),
        };

        this.network = GraphStruct.setup(cities, routes);

        // console.log(this.network);
    },
};
</script>

<style>
.app {
    display: flex;
    padding: 6pt;
}
.graph-container {
    margin-right: 10pt;
}
</style>