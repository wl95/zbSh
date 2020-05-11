
<template>
  <div>
    <a @click="powerStation()">前台电站列表</a>
    <img src="@/assets/首页.jpg" />
  </div>
</template>

<script>
export default {
  methods: {
    powerStation() {
      this.$router.push({ path: '/powerStation/powerStationIndex' })
    }
  }
}
</script>