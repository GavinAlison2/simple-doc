// src/store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
import { moduleA, moduleB } from './module'

Vue.use(Vuex)

const store = new Vuex.Store({
    // name: 'store',
    state: {
        count: 0,
        user: {
            name: '',
            email: ''
        }
    },
    mutations: {
        increment(state) {
            // 增加状态中的 count 值
            state.count++;
        },
        SET_USER(state, user) {
            state.user = user;
        }
    },
    actions: {
        updateUser(context, user) {
            context.commit('SET_USER', user);
        }
    },
    getters: {
        getUserName(state) {
            return state.user.name;
        },
        getUserEmail(state) {
            return state.user.email;
        },
        rootDoubleCount(state) {
            return state.count * 2;
        }
    },
    modules: {
        // ...
        moduleA,
        moduleB,
    },
    plugins: [
        // ...
    ],
    // strict: process.env.NODE_ENV !== 'production',
    // ...
});

export default store;