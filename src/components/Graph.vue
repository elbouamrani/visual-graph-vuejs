<template>
    <div class="container" ref="container"></div>
</template>

<script>
import { Network } from "vis-network";

export default {
    name: "Graph",
    props: ["dataSet"],
    data() {
        return {
            graph: null,
        };
    },
    mounted() {
        const container = this.$refs.container;

        const options = {
            layout: {
                hierarchical: {
                    direction: "UD",
                    sortMethod: "directed",
                },
            },
            edges: {
                arrows: "to",
            },
        };

        this.graph = new Network(container, this.dataSet, options);
    },
};
</script>

<style scoped>
.container {
    height: 300pt;
    width: 400pt;
    background: white;
    border: 1pt solid black;
}
</style>