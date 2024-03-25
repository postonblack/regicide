<script lang="ts">
export default {
    data() {
        return {
            animation: "2",
        }
    },
}
</script>

<template>
    <div>
        <div v-if="animation==='1'">
            <div class="animation1">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <div v-if="animation==='2'">
            <div class="animation2">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
</template>

<style>
.animation1 {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    background-color: rgba(0, 0, 0, 0.2);
    z-index: 100;
}

.animation1>div {
    position: fixed;
    height: 14rem;
    width: 10rem;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    background-color: rgb(255, 255, 255);
    border-radius: 1rem;
    box-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.5), 0.3rem 0.3rem 0.6rem rgba(0, 0, 0, 0.6);
    opacity: 0;

    animation: animation1 2s infinite;
}

.animation1>div:nth-child(1) {
    animation-delay: 0.5s;
}

.animation1>div:nth-child(2) {
    animation-delay: 1s;
}

.animation1>div:nth-child(3) {
    animation-delay: 1.5s;
}

@keyframes animation1 {
    0% {
        top: 50%;
        left: 90%;
        opacity: 0;
    }

    20% {
        top: 50%;
        left: 75%;
        opacity: 1;
    }

    25% {
        top: 50%;
        left: 75%;
        opacity: 1;
    }

    45% {
        top: 50%;
        left: 50%;
        opacity: 1;
    }

    50% {
        top: 50%;
        left: 50%;
        opacity: 1;
    }

    70% {
        top: 50%;
        left: 25%;
        opacity: 1;
    }

    75% {
        top: 50%;
        left: 25%;
        opacity: 1;
    }

    95% {
        top: 50%;
        left: 10%;
        opacity: 0;
    }

    100% {
        top: 50%;
        left: 10%;
        opacity: 0;
    }
}



.animation2 {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    background-color: rgba(0, 0, 0, 0.2);
    z-index: 100;
}

.animation2>div {
    position: fixed;
    height: 14rem;
    width: 10rem;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    background-color: rgb(255, 255, 255);
    border-radius: 1rem;
    box-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.5), 0.3rem 0.3rem 0.6rem rgba(0, 0, 0, 0.6);
    opacity: 0;
}

.animation2>div:nth-child(1) {
    animation: animation2-1 1s infinite;
}

.animation2>div:nth-child(2) {
    animation: animation2-2 1s infinite;
}

.animation2>div:nth-child(3) {
    animation: animation2-3 1s infinite;
}

@keyframes animation2-1 {
    0% {
        top: 50%;
        left: 90%;
        opacity: 0;
    }

    45% {
        top: 50%;
        left: 25%;
        opacity: 1;
    }

    55% {
        top: 50%;
        left: 25%;
        opacity: 1;
    }

    100% {
        top: 50%;
        left: 10%;
        opacity: 0;
    }
}

@keyframes animation2-2 {
    0% {
        top: 50%;
        left: 90%;
        opacity: 0;
    }

    45% {
        top: 50%;
        left: 50%;
        opacity: 1;
    }

    55% {
        top: 50%;
        left: 50%;
        opacity: 1;
    }

    100% {
        top: 50%;
        left: 10%;
        opacity: 0;
    }
}

@keyframes animation2-3 {
    0% {
        top: 50%;
        left: 90%;
        opacity: 0;
    }

    45% {
        top: 50%;
        left: 75%;
        opacity: 1;
    }

    55% {
        top: 50%;
        left: 75%;
        opacity: 1;
    }

    100% {
        top: 50%;
        left: 10%;
        opacity: 0;
    }
}
</style>