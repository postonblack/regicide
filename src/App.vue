<script lang="ts">
import Regicide from './components/Regicide.vue'
import Login from './components/Index/Login.vue'
import Register from './components/Index/Register.vue'
import Lobby from './components/Index/Lobby.vue'

export default {
    components: {
        Regicide,
        Login,
        Register,
        Lobby,
    },
    data() {
        return {
            websocket: {} as Partial<WebSocket>,
            reconnectInterval: 3000,

            currentPage: "Lobby",//Login/Register/Lobby

            isPasswordWrong: 0,//表示错误次数
            isUsernameExisted: 0,
            roomNotFound: 0,

            roomStatus: {},
        }
    },
    methods: {
        setupWebSocket() {
            this.websocket = new WebSocket("ws://darkpaper.eastasia.cloudapp.azure.com:1145");
            this.websocket.onopen = this.onWebSocketOpen;
            this.websocket.onmessage = this.onWebSocketMessage;
            this.websocket.onerror = this.onWebSocketError;
            this.websocket.onclose = this.onWebSocketClose;
        },
        closeWebSocket() {
            if (this.websocket) {
                this.websocket.close!();
            }
        },
        onWebSocketOpen() {
            console.log("链接成功");

            const initMessage = {
                dataType: "ASK_CONNECTION",
                data: {
                    gameName: "regicide",
                    version: 0.1,
                }
            };
            this.sendMessage(initMessage);
        },
        onWebSocketMessage(event: MessageEvent<string>) {
            const message = JSON.parse(event.data);
            console.log(message);

            switch (message.dataType) {
                case "ANSWER_CONNECTION":
                    console.log("接受连接");
                    break;

                case "ANSWER_LOGIN":
                    this.answerLogin(message.data);
                    break;

                case "ANSWER_REGISTER":
                    this.answerRegister(message.data);
                    break;

                case "ANSWER_JOIN_ROOM":
                    this.answerJoinRoom(message.data);
                    break;

                case "UPDATE_ROOM_STATUS":
                    this.updateRoomStaus(message.data);
                    break;

                default:
                    console.log(`错误！服务器消息格式错误：${message}`);
                    break;
            }
        },
        onWebSocketError() {
            console.log("链接错误！");
        },
        onWebSocketClose() {
            console.log("链接被关闭。");
        },
        sendMessage(message: object) {
            //console.log(message);
            if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
                this.websocket.send!(JSON.stringify(message));
            } else {
                console.log("发送消息时链接错误！");
            }
        },

        login(username: string, password: string) {
            const loginMessage = {
                dataType: "ASK_LOGIN",
                data: {
                    username: username,
                    password: password,
                }
            };
            this.sendMessage(loginMessage);
        },
        answerLogin(data: any) {
            switch (data.success) {
                case true:
                    this.currentPage = "Room";
                    break;

                case false:
                    this.isPasswordWrong++;
                    break;

                default:
                    console.log(`错误！ANSWER_LOGIN格式错误：${data}`);
                    break;
            }

        },

        register(username: string, password: string) {
            const registerMessage = {
                dataType: "ASK_REGISTER",
                data: {
                    username: username,
                    password: password,
                }
            };
            this.sendMessage(registerMessage);
        },
        answerRegister(data: any) {
            switch (data.success) {
                case true:
                    this.gotoLogin();
                    break;

                case false:
                    this.isUsernameExisted++;
                    break;

                default:
                    console.log(`错误！ANSWER_REGISTER格式错误：${data}`);
                    break;
            }
        },

        joinRoom(joinRoomID: number) {
            const joinRoomMessage = {
                dataType: "ASK_JOIN_ROOM",
                data: {
                    joinRoomID: joinRoomID,
                },
            };
            this.sendMessage(joinRoomMessage);
        },
        answerJoinRoom(data: any) {
            switch (data.success) {
                case true:
                    break;

                case false:
                    this.roomNotFound++;
                    break;

                default:
                    console.log(`错误！ANSWER_JOIN_ROOM格式错误：${data}`);
                    break;
            }
        },

        createRoom(createMaxPlayer: number) {
            const createRoomMessage = {
                dataType: "ACTION_CREATE_ROOM",
                data: {
                    maxPlayer: createMaxPlayer,
                },
            };
            this.sendMessage(createRoomMessage);
        },

        changePrepare() {
            const changePrepareMessage = {
                dataType: "ACTION_CHANGE_PREPARE",
                data: {},
            };
            this.sendMessage(changePrepareMessage);
        },

        leaveRoom() {
            const leaveRoomMessage = {
                dataType: "ACTION_LEAVE_ROOM",
                data: {},
            };
            this.sendMessage(leaveRoomMessage);
        },

        logout() {
            const logoutMessage = {
                dataTpye: "ACTION_LOGOUT",
                data: {},
            };
            this.sendMessage(logoutMessage);
            this.gotoLogin();
        },

        updateRoomStaus(data: any) {
            this.roomStatus = data;
        },

        gotoRegister() {
            this.currentPage = "Register";
        },
        gotoLogin() {
            this.currentPage = "Login";
        },
    },
    mounted() {
        this.setupWebSocket();
    },
    beforeUnmount() {
        this.closeWebSocket();
    },
}
</script>

<template>
    <Transition name="loginPage" mode="out-in">
        <Login v-if="currentPage==='Login'" :isPasswordWrong="isPasswordWrong" @login="login"
            @gotoRegister="gotoRegister">
        </Login>
    </Transition>
    <Transition name="registerPage" mode="out-in">
        <Register v-if="currentPage==='Register'" :isUsernameExisted="isUsernameExisted" @register="register"
            @gotoLogin="gotoLogin">
        </Register>
    </Transition>
    <Transition name="lobbyPage" mode="out-in">
        <Lobby v-if="currentPage==='Lobby'" :room-status="roomStatus" :room-not-found="roomNotFound"
            @join-room="joinRoom" @create-room="createRoom" @leave-room="leaveRoom" @logout="logout" @change-prepare="changePrepare">
        </Lobby>
    </Transition>
    <Regicide v-if="currentPage==='Regicide'"></Regicide>
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
</style>