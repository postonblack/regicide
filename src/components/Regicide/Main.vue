<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from "vue";
import Players from './Players.vue';
import Talk from './Talk.vue';

const login = ref(true);//登录做好之后这里需要改成false

</script>

<template>
    <div id="fullpage">
        <div class="block" id="left">
            <Players v-if="login"></Players>
        </div>
        <div class="block" id="talk">
            <Talk></Talk>
        </div>
        <div class="block" id="main">
            <p>main</p>
        </div>
        <div class="block" id="hand">
            <p>hand</p>
        </div>
        <div class="block" id="right">
            <p>right</p>
        </div>
    </div>
</template>

<style scoped>
* {
    box-sizing: border-box;
}

#fullpage {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0.5rem;

    display: grid;
    grid-template: 3fr 3fr 3fr / 1.5fr 7fr 0.5fr;
    gap: 0.5rem;
    grid-template-areas:
        "left main right"
        "talk main right"
        "talk hand right";
}

.block {
    background-color: rgb(255, 255, 255);

    position: relative;

    border: 0.2rem solid rgb(225, 255, 0);
    border-radius: 1rem;
    padding: 0.5rem;
    color: black;

    display: grid;
    justify-content: center;
    align-items: center;
}

#left {
    grid-area: left;
}

#talk {
    grid-area: talk;
}

#main {
    grid-area: main;
}

#hand {
    grid-area: hand;
}

#right {
    grid-area: right;
}
</style>
