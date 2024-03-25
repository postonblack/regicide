<script lang="ts">
export default {
    props: {
        roomStatus: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            localRoomStatus: this.roomStatus,
            playerPlace: [] as any,
            prepared: false,
        }
    },
    computed: {
        prepareButton() {
            return this.prepared ? "取消" : "准备";
        }
    },
    methods: {
        leaveRoom() {
            this.$emit("leaveRoom");
        },
        changePrepare() {
            this.$emit("changePrepare");
            this.prepared = !this.prepared;
        }
    },
    watch: {
        roomStatus(t) {
            this.localRoomStatus = t;
        }
    },
    emits: {
        leaveRoom() {
            return true;
        },
        changePrepare() {
            return true;
        },
    },
    mounted() {
        this.playerPlace = Array.from({ length: this.localRoomStatus.maxPlayer }, (_, index) => index);
    },
}
</script>

<template>
    <div id="room">
        <h2>当前房间：{{ localRoomStatus.roomID }}</h2>
        <div class="box">
            <div v-for="place in playerPlace" :key="place" class="cardplace">
                <Transition name="card" mode="out-in">
                    <div v-if="localRoomStatus.playerList[place] !== undefined" class="card"
                        :class="{ prepared: localRoomStatus.playerList[place].playerPrepared }"><p>{{
                        localRoomStatus.playerList[place].playerName }}</p></div>
                </Transition>
            </div>
        </div>
        <div class="box">
            <button @click="leaveRoom"><img src="../../../arrow-left.svg" alt="" id="arrow-left">离开</button>
            <button @click="changePrepare">{{ prepareButton }}</button>
        </div>
    </div>
</template>

<style scoped>
* {
    box-sizing: border-box;
}

#room {
    position: absolute;
    height: 75%;
    width: 90%;
    top: 20%;
    left: 5%;
    padding: 2rem;

    border-radius: 2rem;
    background-color: white;
    box-shadow: 0.5rem 0.5rem 2rem rgba(0, 0, 0, 0.3), 0.25rem 0.25rem 0.8rem rgba(0, 0, 0, 0.5);

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

h2 {
    text-align: center;
    margin: 0rem 0rem 0rem;

    display: inline-block;
}

.box {
    position: relative;
    width: 100%;
    padding: 0rem 0rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.cardplace {
    position: relative;

    height: 14rem;
    width: 10rem;

    border-radius: 1rem;
    border: 0.2rem dashed black;
}

.card {
    position: absolute;

    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    padding: 0.5rem;

    background-color: white;
    border-radius: 1rem;
    box-shadow: 0.5rem 0.5rem 1.5rem rgba(0, 0, 0, 0.1), 0.25rem 0.25rem 1rem rgba(0, 0, 0, 0.5);

    font-size: x-large;
    font-family: "黑体", Arial, Helvetica, sans-serif;
    word-break: break-all;

    transition: all 0.25s;
}

.card:hover {
    transform: scale(1.1);
    box-shadow: 1rem 1rem 2rem rgba(0, 0, 0, 0.12), 0.5rem 0.5rem 1.2rem rgba(0, 0, 0, 0.6);
}

.prepared {
    transform: translateY(-10%);
}

.prepared:hover {
    transform: translateY(-10%) scale(1.2);
    box-shadow: 1rem 1rem 1.5rem rgba(0, 0, 0, 0.5), 0.5rem 0.5rem 0.8rem rgba(0, 0, 0, 0.7);
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

.card-enter-from,
.card-leave-to {
    transform: translateY(-50%);
    opacity: 0;
}

.card-enter-active,
.card-leave-active {
    transition: all 0.5s ease-in-out;
}
</style>