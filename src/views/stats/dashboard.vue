<template>
  <div class="components-container" style='height:100vh'>
    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <latest-bets></latest-bets>
      </el-col>
      <el-col :xs="{span: 12}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 5}">

      </el-col>
      <el-col :xs="{span: 12}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 5}">

      </el-col>
    </el-row>
  </div>
</template>

<script>
  import LatestBets from './components/LatestBets'

  export default {
    components: {
      LatestBets
    },
    data() {
      return {
      }
    },
    mounted() {
      console.log('stats dashboard  mounted')
      this.$nextTick(() => {
        this.fillData();
      })
    },
    methods: {
      fillData(query) {
        
      }
    }
  }
</script>

<style scoped>

</style>

