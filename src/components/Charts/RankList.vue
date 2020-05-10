<template>
  <div class="rank">
    <h4 class="title">{{ title }}</h4>
    <ul class="list">
      <li :key="index" v-for="(item, index) in list">
        <span class="active">{{ index+1 }}</span>
        <span>{{ item.name }}</span>
        <span>{{ item.total }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RankList',
  // ['title', 'list']
  props: {
    title: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="less" scoped>

  .rank {
    // padding: 0 32px 32px 72px;
    .list {
      width: 100%;
      margin: 35px 0 0;
      padding: 0px 33px;
      list-style: none;
      li {
        margin-top: 16px;
        span {
          color:   #333333;;
          font-size: 20px;
          line-height: 22px;
          &:first-child{
            margin-right: 23px;
          }
          &:last-child {
            float: right;
          }
        }
      }
    }
  }

  // .mobile .rank {
  //   padding: 0 32px 32px 32px;
  // }

</style>
