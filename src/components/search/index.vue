<template>
  <div class="search df aic jcsb bsbb container">
    <div class="logo df aic jcc">
      <img src="../../assets/images/explorer-logo.png" style="width: 35px;height: 35px;" /><span
        style="font-size: 16px;color: #2065F8;font-weight: bold;margin-left: 10px;">MAYA explorer</span>
    </div>
    <div class="for">
      <el-input v-model="input" class="w-50 m-2" size="large" placeholder="Search by Address/Txhash/BlockNum/BlockHash" />
      <el-icon size="26" color="#02204e" @click="searchFor(input)">
        <Search />
      </el-icon>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const $router = useRouter();

const input = ref("");
const isAddress = (address) => {
  if (/^(0x)?[0-9a-fA-F]{40}$/i.test(address)) {
    return true;
  } else {
    return false;
  }
}
const isTransaction = (tx) => {
  if (!/^(0x)?[0-9a-f]{64}$/i.test(tx)) {
    return false;
  } else if (/^(0x)?[0-9a-f]{64}$/.test(tx) || /^(0x)?[0-9A-F]{64}$/.test(tx)) {
    return true;
  } else {
    return false;
  }
}
const searchFor = (search) => {
  if (isAddress(search)) {
    $router.push({
      path: "/from",
      query: {
        from: search,
      },
    });
  } else if (isTransaction(search)) {
    $router.push({
      path: "/transactions",
      query: {
        hash: search,
      },
    });
  } else if (!isNaN(search)) {
    $router.push({
      path: "/block",
      query: {
        n: search,
      },
    });
    setTimeout(() => {
      $router.go(0)
    }, 100)
  }
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
    height: 60px;
    background: #fff;
    border-radius: 29px;

    img {
      width: 164px;
      height: 60px;
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