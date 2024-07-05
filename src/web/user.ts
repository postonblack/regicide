import { Message, AnswerLoginData, AnswerRegisterData, CURRENT_PAGE, LOADING_STATUS, DATA_TYPE, DATA_NAME } from "../constents";
import { userStore, sendMessage } from "./websocket";

export function login(username: string, password: string) {
    userStore.loadingStatus = LOADING_STATUS.LOGIN;
    const loginMessage: Message = {
        dataType: DATA_TYPE.ASK,
        dataName: DATA_NAME.LOGIN,
        data: {
            username: username,
            password: password,
        }
    };
    sendMessage(loginMessage);
}
export function answerLogin(data: AnswerLoginData) {
    switch (data.success) {
        case true:
            userStore.currentPage = CURRENT_PAGE.Lobby;
            break;

        case false:
            userStore.wrongPassword = true;
            break;

        default:
            console.log(`错误！ANSWER_LOGIN格式错误：`);
            console.log(data);
            break;
    }
}

export function register(username: string, password: string) {
    userStore.loadingStatus = LOADING_STATUS.REGISTER;
    const registerMessage: Message = {
        dataType: DATA_TYPE.ASK,
        dataName: DATA_NAME.REGISTER,
        data: {
            username: username,
            password: password,
        }
    };
    sendMessage(registerMessage);
}
export function answerRegister(data: AnswerRegisterData) {
    switch (data.success) {
        case true:
            userStore.currentPage = CURRENT_PAGE.Login;
            break;

        case false:
            userStore.existedUsername = true;
            break;

        default:
            console.log(`错误！ANSWER_REGISTER格式错误：`);
            console.log(data);
            break;
    }
}

export function logout() {
    const logoutMessage: Message = {
        dataType: "ACTION",
        dataName: "LOGOUT",
        data: {},
    };
    sendMessage(logoutMessage);
    userStore.currentPage = CURRENT_PAGE.Login;
    userStore.username = "";
}