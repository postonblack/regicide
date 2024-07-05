<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount } from "vue";
import { useUserStore } from "./stores";
import { CURRENT_PAGE, LOADING_STATUS } from "./constents";
import { setupWebSocket, closeWebSocket } from "./web";

import Login from './components/Index/Login.vue'
import Register from './components/Index/Register.vue'
import Lobby from './components/Index/Lobby.vue'
import Loading from './components/Index/Loading.vue'
import Regicide from './components/Regicide/Main.vue'

const userStore = useUserStore();

const currentPage = computed(() => userStore.currentPage);
const loadingStatus = computed(() => userStore.loadingStatus);

onMounted(() => {
    setupWebSocket();
})

onBeforeUnmount(() => {
    closeWebSocket();
})
</script>

<template>
    <Transition name="loading" mode="out-in">
        <Loading v-if="loadingStatus!==LOADING_STATUS.NONE"></Loading>
    </Transition>
    <Transition name="loginPage" mode="out-in">
        <Login v-if="currentPage===CURRENT_PAGE.Login"></Login>
    </Transition>
    <Transition name="registerPage" mode="out-in">
        <Register v-if="currentPage===CURRENT_PAGE.Register"></Register>
    </Transition>
    <Transition name="lobbyPage" mode="out-in">
        <Lobby v-if="currentPage===CURRENT_PAGE.Lobby"></Lobby>
    </Transition>
    <Regicide v-if="currentPage===CURRENT_PAGE.Regicide"></Regicide>
</template>

<style scoped>
* {
    box-sizing: border-box;
}

.loginPage-enter-from,
.loginPage-leave-to {
    transform: translateX(-220%);
}

.loginPage-enter-active,
.loginPage-leave-active {
    transition: all 0.5s ease-in-out;
}

.registerPage-enter-from,
.registerPage-leave-to {
    transform: translateX(220%);
}

.registerPage-enter-active,
.registerPage-leave-active {
    transition: all 0.5s ease-in-out;
}

.lobbyPage-enter-from,
.lobbyPage-leave-to {
    transform: translateY(-200%);
}

.lobbyPage-enter-active,
.lobbyPage-leave-active {
    transition: all 0.5s ease-in-out;
}

.loading-enter-from,
.loading-leave-to {
    opacity: 0;
}

.loading-enter-active,
.loading-leave-active {
    transition: all 0.2s ease-in-out;
}
</style>