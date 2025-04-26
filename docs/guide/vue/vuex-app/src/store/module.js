// src/store/module.js
const moduleA = {
    namespaced: true, // 启用命名空间
    state: {
        name: "moduleA",
        count: 0 // 添加 count 初始值
    },
    mutations: {
        increment(state) {
            state.count++;
        },
    },
    actions: {
        incrementAsync({ commit }) {
            setTimeout(() => {
                commit("increment");
            }, 1000);
        },
    },
    getters: {
        doubleCountA(state) {
            return state.count * 2;
        },
    },
};

const moduleB = {
    namespaced: true, // 启用命名空间
    state: {
        name: "moduleB",
        count: 0 // 添加 count 初始值
    },
    mutations: {
        increment(state) {
            state.count++;
        },
    },
    actions: {
        incrementAsync({ commit }) {
            setTimeout(() => {
                commit("increment");
            }, 1000);
        },
    },
    getters: {
        doubleCountB(state) {
            return state.count * 2;
        },
    },
};

export {
    moduleA,
    moduleB,
};