<template>
  <div>
    <h2>Module A</h2>
    <p>mapState: {{ moduleA.name }} -{{ moduleA.count }}</p>
    <p>mapGetters: {{ doubleCountA }}</p>
    <p>Name: {{ moduleNameA }}</p>
    <p>Count: {{ countA }}</p>
    <p>Double Count: {{ doubleCountA }}</p>
    <button @click="incrementA">Increment</button>
    <button @click="incrementAsyncA">Increment Async</button>

    <h2>Module B</h2>
    <p>mapState: {{ moduleB.name }} -{{ moduleB.count }}</p>
    <p>mapGetters: {{ doubleCountB }}</p>
    <p>Name: {{ moduleNameB }}</p>
    <p>Count: {{ countB }}</p>
    <p>Double Count: {{ doubleCountB }}</p>
    <button @click="incrementB">Increment</button>
    <button @click="incrementAsyncB">Increment Async</button>

    <h2>Root State</h2>
    <p>Count: {{ rootCount }}</p>
    <p>User Name: {{ userName }}</p>
    <p>User Email: {{ userEmail }}</p>
    <input v-model="newName" placeholder="请输入用户名" />
    <input v-model="newEmail" placeholder="请输入邮箱" />
    <button @click="updateUserInfo">更新用户信息</button>
  </div>
</template>

<script>
// import { mapState, mapGetters } from "vuex";
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "MultiVuexModuleView",
  data() {
    return {
      newName: "",
      newEmail: "",
    };
  },
  computed: {
    ...mapState({
      moduleA: (state) => state.moduleA,
      moduleB: (state) => state.moduleB,
    }),
    ...mapGetters({
      doubleCountA: "moduleA/doubleCount",
      doubleCountB: "moduleB/doubleCount",
    }),

    moduleNameA() {
      return this.$store.state.moduleA.name;
    },
    countA() {
      return this.$store.state.moduleA.count;
    },
    doubleCountA() {
      return this.$store.getters["moduleA/doubleCountA"];
      // return this.$store.getters["doubleCountA"];
    },
    moduleNameB() {
      return this.$store.state.moduleB.name;
    },
    countB() {
      return this.$store.state.moduleB.count;
    },
    doubleCountB() {
      return this.$store.getters["moduleB/doubleCountB"]; // 启动namespaced的话，需要加上命名空间
      // return this.$store.getters["doubleCountB"]; //不启动namespaced的话，可以直接用doubleCountB
    },
    rootCount() {
      return this.$store.state.count;
    },
    rootDoubleCount() {
      return this.$store.getters.rootDoubleCount;
    },
    userName() {
      return this.$store.getters.getUserName;
    },
    userEmail() {
      return this.$store.getters.getUserEmail;
    },
  },
  methods: {
    incrementA() {
      // console.log(this.$store.commit);
      // console.log(this.$store);
      this.$store.commit("moduleA/increment");
    },
    incrementAsyncA() {
      this.$store.dispatch("moduleA/incrementAsync");
    },
    incrementB() {
      this.$store.commit("moduleB/increment");
    },
    incrementAsyncB() {
      this.$store.dispatch("moduleB/incrementAsync");
    },
    updateUserInfo() {
      const updatedUser = {
        name: this.newName,
        email: this.newEmail,
      };
      this.$store.dispatch("updateUser", updatedUser);
    },
    // incrementModuleA() {
    //   this.$store.commit("moduleA/increment");
    // },
    // incrementModuleB() {
    //   this.$store.commit("moduleB/increment");
    // },
  },
};
</script>
