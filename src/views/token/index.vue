<template>
  <div class="token">
    <search-for></search-for>
    <div class="btns df aic container">
      <div class="btn df aic jcc mr20" id="one" @click="$router.push('/Home')">
        <span class="iconfont icon-home fz28 mr10"></span>
        <span class="fz18 fw7">HOME</span>
      </div>
      <div class="btn df aic jcc mr20 active" @click="$router.push('/token')">
        <span class="iconfont icon-token fz28 mr10"></span>
        <span class="fz18 fw7">TOKENS</span>
      </div>
      <div class="btn df aic jcc mr20" @click="$router.push('/nft')">
        <span class="iconfont icon-Wallet fz28 mr10"></span>
        <span class="fz18 fw7">NFT</span>
      </div>
    </div>
    <div class="contents container mt60 mb60">
      <div class="item"></div>
      <div class="item on second">
        <p class="fz30 mt20 fw7" style="margin-left: 50px; color: #02204e">
          Tokens
        </p>
        <div class="content bsbb mt40 df fdc">
          <div class="list df fdc">
            <div class="item bsbb df aic fz24 fw7">
              <span style="margin-right: 100px; color: #02204e">ETH</span>
              <span
                class="hover"
                style="color: #02204e"
                @click="goTokenDetail"
                >{{ tokens }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="item"></div>
    </div>
    <footer-bar class="mt40"></footer-bar>
  </div>
</template>

<script setup>
import Token from "@/common/token.json";
import { onMounted } from "vue";
import footerBar from "../../components/footer/index.vue";
import searchFor from "../../components/search/index.vue";
import { useRouter } from "vue-router";
const $router = useRouter();

const tokens = Token[0].address;

const goTokenDetail = () => {
  $router.push({
    path: "/tokenDetail",
    query: {
      tokens: tokens,
    },
  });
};
onMounted(() => {
  const btns = document.querySelectorAll(".btns >.btn");
  const contents = document.querySelectorAll(".contents >.item");
  btns.forEach((btn, ind) => {
    btn.addEventListener("click", () => {
      btns.forEach((value, index) => {
        value.classList.remove("active");
        contents[index].classList.remove("on");
      });
      btn.classList.add("active");
      contents[ind].classList.add("on");
    });
  });
});
</script>

<style lang="scss" scoped>
::v-deep .el-input__inner {
  width: 300px;
  height: 30px;
}
::v-deep .el-button {
  width: 60px;
  height: 30px;
  background: #efefef;
}
::v-deep .el-tabs__nav-scroll {
  margin-top: 30px;
  margin-right: 20%;
  float: right;
  font-size: 24px !important;
}
::v-deep .el-tabs__item {
  font-size: 20px;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.token {
  font-family: "pingfang";
  height: 100%;
  .btns {
    > div {
      width: 180px;
      height: 57px;
      border-radius: 29px;
      background: #fff;
      color: #02204e;
      &.active {
        background: #02204e;
        color: #fff;
      }
    }
  }
  .contents {
    .second {
      .content {
        .list {
          .item {
            margin: 0 auto;
            color: #02204e;
            width: 1300px;
            height: 118px;
            background: #ffffff;
            border-radius: 4px;
            padding-left: 80px;
            .hover:hover {
              color: #666 !important;
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
}
</style>