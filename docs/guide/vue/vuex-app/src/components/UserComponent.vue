<!-- src/components/UserComponent.vue -->
<template>
  <div>
    <p>用户名: {{ userName }}</p>
    <p>邮箱: {{ userEmail }}</p>
    <input v-model="newName" placeholder="请输入用户名" />
    <input v-model="newEmail" placeholder="请输入邮箱" />
    <button @click="updateUserInfo">更新用户信息</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newName: "",
      newEmail: "",
    };
  },
  computed: {
    userName() {
      //   console.log(this.$store);
      return this.$store.getters.getUserName;
      //   return "test";
    },
    userEmail() {
      return this.$store.getters.getUserEmail;
      //   return "test@qq.com";
    },
  },
  methods: {
    updateUserInfo() {
      const updatedUser = {
        name: this.newName,
        email: this.newEmail,
      };
      //   console.log(updatedUser);
      this.$store.dispatch("updateUser", updatedUser);
    },
  },
};
</script>
