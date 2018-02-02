<template>
  <div class="components-container" style='height:100vh'>
    <el-row>
      <el-col>
       
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    components: {},
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

