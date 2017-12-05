<template>
  <div class="filter-container">
    <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="Title"
              v-model="listQuery.title">
    </el-input>

    <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">Search</el-button>
  </div>
</template>

<script>
    import waves from '@/directive/waves.js'

    export default {
      name: "predictions_filter",
      directives: {
        waves
      },
      data() {
        return {
          listQuery: {
            title: ""
          }
        }
      },
      methods: {
        handleFilter() {
          this.$emit('filter', this.listQuery)
        }
      }
    }
</script>

<style scoped>

</style>
