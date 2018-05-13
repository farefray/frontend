<template>
  <div class="widget well well-black">
    <div class="widget-header">
      <h3 class="heading-icon" aria-hidden="true">Latest bets</h3>
    </div>
    <el-table :data="list" style="width: 100%;padding-top: 15px;" class="table table-condensed">
      <el-table-column label="Date" show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.date}}
        </template>
      </el-table-column>
      <el-table-column label="Bet info" width="195" align="center">
        <template slot-scope="scope">
          {{scope.row.odds}}
        </template>
      </el-table-column>
      <el-table-column label="Status" width="100" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status[0]"> {{scope.row.status[0]}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import { fetchPredictions } from '@/api/predictions';

export default {
  data() {
    return {
      list: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      fetchPredictions({
          limit: 10
        })
        .then(response => {
          this.list = response
        });
    })
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.list = []
    }
  }
}
</script>

