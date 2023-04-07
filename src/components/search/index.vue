<template>
  <div class="search df aic jcsb bsbb container">
    <div class="logo df aic jcc">
      <img src="../../assets/images/logo1.png" />
    </div>
    <div class="for">
      <el-input
        v-model="input"
        class="w-50 m-2"
        size="large"
        placeholder="Search by Address/Txhash/BlockNum/BlockHash"
      />
      <el-icon size="26" color="#02204e"><Search /></el-icon>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
    };
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-input__wrapper {
  height: 55px !important;
}
.search {
  text-align: right !important;
  padding: 45px 0;
  .logo {
    width: 248px;
    height: 57px;
    background: #fff;
    border-radius: 29px;
    img {
      width: 164px;
      height: 38px;
    }
  }
  .el-input {
    width: 479px;
    height: 53px;
    background: #fff;
    border: 2px solid #b0bfd4;
    border-radius: 8px;
    overflow: hidden;
  }
  .for {
    position: relative;
    .el-icon {
      position: absolute;
      right: 40px;
      top: 35px;
    }
  }
}
</style>