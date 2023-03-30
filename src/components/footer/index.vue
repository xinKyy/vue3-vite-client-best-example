<template>
  <div class="footer">
    <div class="container shallow bsbb df">
      <div class="df fdc mr-5">
        <p class="mb20 fz18 fw7" style="color: #44b6ae">ABOUT</p>
        <p style="color: #a2abb7" class="fz16 mb10">
          This is an open source Blockchain Explorer.
        </p>
        <img
          src="../../assets/images/powered-by-etcexplorer-w.png"
          style="width: 157px; height: 51px"
        />
      </div>
      <div class="df fdc">
        <p class="mb20 fz18 fw7" style="color: #44b6ae">FOLLOW US ON</p>
      </div>
    </div>
    <div class="deep mt40 df aic">
      <div class="container" style="color: #a2abb7">
        2019 © Ethereum Classic.
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.footer {
  height: 240px;
  width: 100%;
  background: #48525e;
  .shallow {
    height: 160px;
    padding: 40px 0 30px 0;
  }
  .deep {
    background: #3b434c;
    width: 100%;
    height: 80px;
  }
}
</style>