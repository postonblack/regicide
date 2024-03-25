<script lang="ts">
export default {
    props: {
        isUsernameExisted: {
            type: Number,
            required: true,
        }
    },
    data() {
        return {
            username: "",
            password: "",

            isUnvalidN: false,
            isUnvalidP: false,

            existedUsername: 0,
        }
    },
    methods: {
        submit() {
            let flag = 0;
            if (!this.username) {
                (this.$refs.username as HTMLInputElement).focus();
                return;
            }
            if (!this.password) {
                (this.$refs.password as HTMLInputElement).focus();
                return;
            }
            if ((!/^[a-zA-Z0-9_]{6,16}$/.test(this.username))) {
                this.isUnvalidN = true;
                (this.$refs.username as HTMLInputElement).focus();
                flag = 1;
            }
            if ((!/^[a-zA-Z0-9_]{6,16}$/.test(this.password))) {
                this.isUnvalidP = true;
                if (flag === 0) {
                    (this.$refs.password as HTMLInputElement).focus();
                    flag = 1;
                }
            }
            if (flag === 1) {
                return;
            }
            this.register();
        },
        register() {
            this.$emit("register", this.username, this.password);
        },
        gotoLogin() {
            this.$emit("gotoLogin");
        },
    },
    watch: {
        username() {
            this.isUnvalidN = false;
            this.existedUsername = 0;
        },
        password() {
            this.isUnvalidP = false;
        },
        isUsernameExisted(t) {
            this.existedUsername = t;
        },
    },
    emits: {
        register(username: string, password: string) {
            return username && password;
        },
        gotoLogin() {
            return true;
        }
    }
}
</script>

<template>
    <div id="register">
        <h1><span class="cool">REGICIDE</span></h1>
        <h2>注册新账号</h2>
        <form @submit.prevent="register">
            <div class="loginbox">
                <input type="text" id="username" ref="username" v-model="username" required autocomplete="off">
                <label for="username">账号
                    <Transition name="warning" mode="out-in"><span v-if="isUnvalidN" class="warning"> 6-16个字符
                            只能包含字母、数字和_</span></Transition>
                    <Transition name="warning" mode="out-in"><span v-if="existedUsername" class="warning">
                            用户名已存在！</span></Transition>
                </label>
            </div>
            <div class="loginbox">
                <input type="password" id="password" ref="password" v-model="password" required autocomplete="off">
                <label for="password">密码
                    <Transition name="warning" mode="out-in"><span v-if="isUnvalidP" class="warning"> 6-16个字符
                            只能包含字母、数字和_</span></Transition>
                </label>
            </div>
            <div class="loginbox">
                <button type="submit" @click.prevent="submit">注册</button>
                <button @click.prevent="gotoLogin"><img src="../../../arrow-left.svg" alt="" id="arrow-left">登录</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
#register {
    position: fixed;
    height: 50%;
    width: 30%;
    top: 25%;
    right: 35%;
    bottom: 25%;
    left: 35%;
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
    margin: 1rem 0rem 0rem;

    display: inline-block;
}

h2 {
    text-align: center;
    margin: 1rem 0rem 1rem;

    display: inline-block;
}

.cool {
    font-size: larger;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}

form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.loginbox {
    position: relative;
    width: 100%;
    padding: 1rem 0rem;
    display: flex;
}

input {
    outline: none;
    border: none;
    border-bottom: 0.1rem solid black;
    width: 100%;
    font-size: x-large;
}

label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0.7rem 0rem;
    font-size: x-large;
    font-family: "黑体", Arial, Helvetica, sans-serif;
    color: #646bffce;
    pointer-events: none;
    transition: all 0.25s;
    text-wrap: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.warning {
    position: relative;
    color: red;
    font-size: medium;
    text-wrap: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

input:valid+label,
input:focus+label {
    top: -1.2rem;
    color: #575fff;
    font-size: large;
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

button:hover #arrow-left {
    transform: translateX(-0.3rem);
}

.warning-enter-from,
.warning-leave-to {
    opacity: 0;
    transform: scale(1.2);
}

.warning-enter-active,
.warning-leave-active {
    transition: all 0.5s ease-in-out;
}
</style>