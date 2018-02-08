<template>
  <div class="widget well well-black">
    <div class="widget-header header-small">
      <h4><i class="fontello-icon-popup-2"></i>Latest bets</h4>
    </div>
    <el-table :data="list" style="width: 100%;padding-top: 15px;">
      <el-table-column label="Order_No" show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.order_no}}
        </template>
      </el-table-column>
      <el-table-column label="Price" width="195" align="center">
        <template slot-scope="scope">
          ¥{{scope.row.price | toThousandslsFilter}}
        </template>
      </el-table-column>
      <el-table-column label="Status" width="100" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter"> {{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      list: null
    }
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
