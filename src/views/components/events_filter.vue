<template>
  <div class="filter-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="Team name"
                  v-model="listQuery.title">
        </el-input>
      </el-col>

      <el-col :span="12">
      <el-date-picker
        v-model="listQuery.daterange"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="-"
        start-placeholder="Start date"
        end-placeholder="End date"
        :picker-options="pickerOptions">
      </el-date-picker>
      </el-col>

      <el-col :span="6">
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">Update</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import waves from '@/directive/waves/index.js'

    export default {
      name: "events_filter",
      directives: {
        waves
      },
      data() {
        return {
          listQuery: {
            title: "",
            daterange: ''
          },
          pickerOptions: {
            shortcuts: [{
              text: 'Last 24 hours',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: 'Last week',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: 'Last month',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: 'Last 3 months',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }]
          }
        }
      },
      methods: {
        handleFilter() {
          console.log(this.listQuery);
          this.$emit('filter', this.listQuery)
        }
      }
    }
</script>

<style scoped>

</style>
