<template>
<div class="widget widget-simple">
  <div class="widget-header no-border">
      <h4><i class="fontello-icon-window"></i> Latest bets</h4>
      <div class="widget-tool">
          Some stats from those?
      </div>
  </div>
  <div class="widget-content">
      <div class="widget-body">
          <p>
              <el-table :data="list" :stripe="true" size="mini" style="width: 100%;padding-top: 15px;" class="table table-condensed">
                <el-table-column label="Date" width="120" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{(scope.row.date) | moment("DD.MM.YY kk:mm")}}
                  </template>
                </el-table-column>
                <el-table-column label="Bet info" align="center">
                  <template slot-scope="scope">
                      <el-table :data="scope.row.selected_events" :show-header="false" :fit="true" style="width:100%;">
                      <el-table-column>
                        <template slot-scope="row_scope">
                          <span v-bind:class="{ bold: row_scope.row.selected_event === 'odds_1' }">
                            {{row_scope.row.team_A.name}}
                          </span>
                          <div v-if="row_scope.row.team_A.ex">
                            ({{row_scope.row.team_A.ex}})
                          </div>
                          <div v-if="row_scope.row.live && row_scope.row.selected_event === 'odds_1'">
                            [Live]
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column>
                        <template slot-scope="row_scope">
                          <span v-bind:class="{ bold: row_scope.row.selected_event === 'odds_2' }">
                            {{row_scope.row.team_B.name}}
                          </span>
                          <div v-if="row_scope.row.team_B.ex">
                            ({{row_scope.row.team_B.ex}})
                          </div>
                          <div v-if="row_scope.row.live && row_scope.row.selected_event === 'odds_2'">
                            [Live]
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column>
                        <template slot-scope="row_scope">
                          <span>
                            {{row_scope.row.selected_odds}}
                          </span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </el-table-column>
                <el-table-column label="Status" width="85" align="center">
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
          console.log(response);
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

