<script lang="ts">
class Player {
    public playerName: string;
    public cards: number;

    constructor(playerName: string, cards: number) {
        this.playerName = playerName;
        this.cards = cards;
    }
}

export default {
    props: {
        players: {
            type: Array<Player>,
            required: true,
        },
        maxCards: {
            type: Number,
            required: true,
        },
        turnPlayer: {
            type: String,
            required: true,
        }
    },
    data() {
        return {

        }
    },
    methods: {
        color(cards: number) {
            let color = "";
            if (cards >= 2.0/3 * this.maxCards) {
                color = "rgba(0, 225, 0, 1)";//green
            } else if (cards >= 1.0/3 * this.maxCards) {
                color = "rgba(255, 165, 0, 1)";//orange
            } else {
                color = "rgba(225, 0, 0, 1)";//red
            }
            return { backgroundColor: color };
        },
        turn(playerName: string) {
            if (playerName == this.turnPlayer) {
                return "turn";
            } else {
                return "";
            }
        }
    }
}
</script>

<template>
    <div id="userList">
        <div v-for="player in players" :key="player.playerName" class="player" :class="turn(player.playerName)">
            <div class="playerName">{{ player.playerName }}</div>
            <Transition mode="out-in">
                <div class="cardNumber" :key="player.cards" :style="color(player.cards)">{{ player.cards }}</div>
            </Transition>
        </div>
    </div>
</template>

<style scoped>
    #userList {
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: rgba(255, 217, 0, 0.3);
        padding: 0.5rem;
        top: 0;
        left: 0;

        display: flex;
        flex-direction: column;
        border: 0.2rem solid black;
        border-radius: 1rem;
    }

    .player {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0rem;
        margin: auto;
        align-content: center;

        border: 0.2rem solid black;
        border-radius: 0.5rem;

        background-color: burlywood;
        width: 90%;

        transition: all 0.5s;
        z-index: 10;

        box-shadow: 0.7rem 0.7rem 1.5rem rgba(0, 0, 0, 0.3), 0.3rem 0.3rem 0.5rem rgba(0, 0, 0, 0.5);
    }

    .turn {
        scale: 1.1;
        translate: 2rem;

        transition: all 0.5s;
        z-index: 10;

        box-shadow: 1rem 1rem 3rem rgba(0, 0, 0, 0.3), 0.4rem 0.4rem 0.8rem rgba(0, 0, 0, 0.5);
    }

    .playerName {
        display: inline;
        background-color: blanchedalmond;
        border: 0.2rem solid rgba(0, 0, 0, 0);
        border-radius: 1rem;
        padding: 0rem 0.5rem;
        margin: 0rem 0.5rem;
        min-width: 5rem;
        align-content: center;
        text-align: center;
    }

    .cardNumber {
        display: inline;
        background-color: antiquewhite;
        border: 0.2rem solid rgba(255, 255, 255, 0);
        border-radius: 0.2rem;
        padding: 0rem 0.3rem;
        margin: 0rem 0.5rem;
        align-content: center;
        box-shadow: 0.2rem 0.2rem 1rem rgba(0, 0, 0, 0.3), 0.1rem 0.1rem 0.5rem rgba(0, 0, 0, 0.5);
    }

    .v-enter-active {
        transition: all 0.5s;
    }

    .v-enter-from {
        transform: scale(1.2);
        box-shadow: 0.5rem 0.5rem 2rem rgba(0, 0, 0, 0.3), 0.5rem 0.5rem 0.8rem rgba(0, 0, 0, 0.5);
    }
</style>./Players.vue