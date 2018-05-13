<template>
<div class="widget widget-simple">
  <div class="widget-header no-border">
      <h4><i class="fontello-icon-window"></i> Latest bets</h4>
      <div class="widget-tool">
          <div class="btn-toolbar">
              <div class="btn-group">
                  <button class="btn btn-primary btn-small">day</button>
                  <button class="btn btn-primary btn-small">month</button>
                  <button class="btn btn-primary btn-small">year</button>
              </div>
          </div>
      </div>
  </div>
  <div class="widget-content">
      <div class="widget-body">
          <p>
              <el-table :data="list" style="width: 100%;padding-top: 15px;" class="table table-condensed">
                <el-table-column label="Date" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{(scope.row.date) | moment("DD.MM.YY kk:mm")}}
                  </template>
                </el-table-column>
                <el-table-column label="Bet info" width="195" align="center">
                  <template slot-scope="scope">
                      {{scope.row.team_A.name}}
                  </template>
                </el-table-column>
                <el-table-column label="Status" width="100" align="center">
                  <template slot-scope="scope">
                    <el-tag :type="scope.row.status[0]"> {{scope.row.status[0]}}</el-tag>
                  </template>
                </el-table-column>
              </el-table>
          </p>
      </div>
  </div>
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

