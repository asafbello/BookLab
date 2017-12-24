<template>
    <div>

        <div class="line"></div>
            <el-menu  class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="3">Home</el-menu-item>
            <el-menu-item index="2">Log In</el-menu-item>

            
            </el-menu>
    </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {}
  }
};
</script>

<style>
.el-menu-demo {
  background-color: red;
}
</style>

