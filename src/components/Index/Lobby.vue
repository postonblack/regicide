<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoomStore } from "../../stores";
import { RoomMessageData } from "../../constents";
import { createRoom, joinRoom, logout } from "../../web";

import Room from './Room.vue'

const roomStore = useRoomStore();

const joinRoomID = ref("");
function roomIDModify() {
    joinRoomID.value = joinRoomID.value.replace(/[^\d]/g, '');
}
const joinRoomIDInput = ref<HTMLElement | null>(null);
function tryJoinRoom() {
    if (joinRoomID.value === '') {
        joinRoomIDInput.value?.focus();
        return;
    }
    joinRoom(parseInt(joinRoomID.value));
}

const createMaxPlayer = ref("");
function tryCreateRoom() {
    if (createMaxPlayer.value !== "") {
        createRoom(parseInt(createMaxPlayer.value));
    }
}

const roomNotFound = computed(() => roomStore.roomNotFound);
watch(joinRoomID, () => roomStore.roomNotFound = false);

const roomStatus = computed(() => {
    return roomStore.roomStatus as RoomMessageData;
})
</script>

<template>
    <div id="lobby">
        <h1><span class="cool">REGICIDE</span></h1>
        <form @submit.prevent="tryJoinRoom">
            <div class="box big">
                <input type="text" id="joinRoomID" ref="joinRoomIDInput" class="textinput" v-model="joinRoomID" required
                    autocomplete="off" maxlength="6" @input="roomIDModify">
                <label for="joinRoomID" class="textlabel">房间号
                    <Transition name="warning" mode="out-in"><span v-if="roomNotFound" class="warning">房间不存在或已满</span>
                    </Transition>
                </label>
            </div>
            <div class="box small">
                <button type="submit" @click.prevent="tryJoinRoom">加入房间<img src="../../../arrow-right.svg" alt=""
                        id="arrow-right"></button>
            </div>
        </form>
        <form @submit.prevent="tryCreateRoom">
            <div class="box big">
                <div class="card">
                    <input type="radio" name="maxplayer" id="one" value="1" class="radioinput" v-model="createMaxPlayer"
                        required autocomplete="off" disabled>
                    <label for="one" class="radiolabel uncheckable">单人</label>
                </div>
                <div class="card">
                    <input type="radio" name="maxplayer" id="two" value="2" class="radioinput" v-model="createMaxPlayer"
                        required autocomplete="off">
                    <label for="two" class="radiolabel">双人</label>
                </div>
                <div class="card">
                    <input type="radio" name="maxplayer" id="three" value="3" class="radioinput"
                        v-model="createMaxPlayer" required autocomplete="off">
                    <label for="three" class="radiolabel">三人</label>
                </div>
                <div class="card">
                    <input type="radio" name="maxplayer" id="four" value="4" class="radioinput"
                        v-model="createMaxPlayer" required autocomplete="off">
                    <label for="four" class="radiolabel">四人</label>
                </div>
            </div>
            <div class="box small">
                <button type="submit" @click.prevent="tryCreateRoom">创建房间<img src="../../../arrow-right.svg" alt=""
                        id="arrow-right"></button>
            </div>
        </form>
        <div>
            <button @click.prevent="logout"><img src="../../../arrow-left.svg" alt="" id="arrow-left">退出登录</button>
        </div>
        <Transition name="roomCard" mode="out-in">
            <Room v-if="roomStatus.roomID !== -1"></Room>
        </Transition>
    </div>
</template>

<style scoped>
#lobby {
    position: fixed;
    height: 70%;
    width: 60%;
    top: 15%;
    left: 20%;
    padding: 2rem;

    border-radius: 2rem;
    box-shadow: 1rem 1rem 3rem rgba(0, 0, 0, 0.5), 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.7);

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

h1 {
    text-align: center;
    margin: 0rem 0rem 0rem;

    display: inline-block;
}

h2 {
    text-align: center;
    margin: 0rem 0rem 0rem;

    display: inline-block;
}

.cool {
    font-size: larger;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}

form {
    display: flex;
    flex-direction: row;

    width: 80%;
    padding: 2rem;

    border-radius: 2rem;
    box-shadow: 0.5rem 0.5rem 1.5rem rgba(0, 0, 0, 0.3), 0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.5);
}

.box {
    position: relative;
    width: 100%;
    padding: 1rem 0rem;
    display: flex;
}

.big {
    flex-grow: 2;
    flex-shrink: 2;
}

.small {
    flex-grow: 1;
    flex-shrink: 3;
}

.card {
    position: relative;
    width: 100%;
    padding: 0rem 0rem;
    display: flex;
}

.textinput {
    outline: none;
    border: none;
    border-bottom: 0.1rem solid black;
    background-color: transparent;
    width: 100%;
    font-size: x-large;
}

.textlabel {
    position: absolute;
    top: 0;
    left: 0;
    padding: 1.5rem 0rem;
    font-size: x-large;
    font-family: "黑体", Arial, Helvetica, sans-serif;
    color: #646bffce;
    pointer-events: none;
    transition: all 0.25s;
}

.warning {
    position: relative;
    color: red;
    font-size: medium;
    text-wrap: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.textinput:valid+.textlabel,
.textinput:focus+.textlabel {
    top: -1.7rem;
    color: #575fff;
    font-size: large;
}

.radioinput {
    appearance: none;
}

.radiolabel {
    border-radius: 1rem;
    box-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.1), 0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.5);

    padding: 1rem;
    font-size: x-large;
    font-family: "黑体", Arial, Helvetica, sans-serif;
    writing-mode: vertical-rl;

    transition: all 0.25s;
}

.radiolabel:hover {
    transform: scale(1.2);
    box-shadow: 0.6rem 0.6rem 1.2rem rgba(0, 0, 0, 0.12), 0.3rem 0.3rem 0.6rem rgba(0, 0, 0, 0.6);
}

.uncheckable {
    background-color: rgba(128, 128, 128, 0.2);
    box-shadow: 0.25rem 0.25rem 0.25rem rgba(0, 0, 0, 0.1), 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.2);
}

.uncheckable:hover {
    transform: scale(1);
    box-shadow: 0.25rem 0.25rem 0.25rem rgba(0, 0, 0, 0.1), 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.2);
}

.radioinput:checked+.radiolabel {
    transform: translateY(-1rem) scale(1.05);
}

button {
    margin: auto;
    background-color: transparent;

    display: flex;

    border: 0rem;
    border-radius: 10%;
    padding: 0.5rem 0.5rem;
    justify-content: center;
    align-items: center;
    line-height: normal;
    font-size: x-large;
    font-family: "黑体", Arial, Helvetica, sans-serif;
    cursor: pointer;

    transition: all 0.25s;
}

button:hover {
    background-color: #656dfd3f;
    transform: scale(1.1);
}

img[src$=".svg"] {
    width: 2rem;
    height: 2rem;
    transition: all 0.25s;
}

button:hover #arrow-right {
    transform: translateX(0.3rem);
}

button:hover #arrow-left {
    transform: translateX(-0.3rem);
}

.roomCard-enter-from,
.roomCard-leave-to {
    transform: translateX(150%);
}

.roomCard-enter-active,
.roomCard-leave-active {
    transition: all 0.5s ease-in-out;
}
</style>