import { defineStore } from 'pinia';
import { CURRENT_PAGE, LOADING_STATUS } from "../constents";

export const useUserStore = defineStore('user', {
    state: () => ({
        wrongPassword: false,
        existedUsername: false,

        loadingStatus: LOADING_STATUS.NONE,
        currentPage: CURRENT_PAGE.Login,

        username: "",
    }),
    getters: {

    },
    actions: {

    },
})