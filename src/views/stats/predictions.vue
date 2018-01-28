<template>
  <div class="components-container" style='height:100vh'>
    <events_filter @filter="fillData"></events_filter>
    <br/>
    <el-table :fit="true" :data="predictions"
              v-loading="listLoading" element-loading-text="Loading..." border fit
              style="width: 100%">

      <el-table-column width="150" align="center" label="DATE (UTC)" prop="date" column-key="date" sortable>
        <template slot-scope="scope">
          <span><strong>{{(scope.row.date) | moment("DD.MM kk:mm")}}</strong></span><br/>
          <span>({{(scope.row.date) | moment("from")}})</span> <br/>
          <el-tag
            size="mini"
            :key="tag"
            v-for="tag in scope.row.categories"
            closable
            :disable-transitions="false"
            @close="removeCategory(scope.row, tag)">
            {{tag}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="Event" prop="game" column-key="game">
        <template slot-scope="scope">
          <el-table :data="scope.row.selected_events" :fit="true" style="width:100%;">
            <el-table-column width="120" label="Date">
              <template slot-scope="row_scope">
                {{(row_scope.row.date) | moment("DD.MM kk:mm")}}              
              </template>
            </el-table-column>
            <el-table-column width="120" label="Game">
              <template slot-scope="row_scope">
                {{(row_scope.row.game)}} <br/>
                {{row_scope.row.game_league}}
              </template>
            </el-table-column>
            <el-table-column label="Participant">
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
            <el-table-column label="Participant">
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
            <el-table-column label="Odds">
              <template slot-scope="row_scope">
                <span>
                  {{row_scope.row.selected_odds}}
                </span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>

      <el-table-column width="80" align="center" label="Stake">
        <template slot-scope="scope">
          {{scope.row.stake}}
        </template>
      </el-table-column>

      <el-table-column width="80" align="center" label="Odds">
        <template slot-scope="scope">
          {{scope.row.final_odds}}
        </template>
      </el-table-column>

      <el-table-column width="140" align="center" label="Status">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status[0]">{{scope.row.status[0]}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column>
        <template slot-scope="scope">          
          <el-button size="mini" tyle="success" @click="handleReportStatus(scope.$index, scope.row)" v-if="scope.row.status[0] ==='PENDING'">
            Report status
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Remove
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="Report bet status"
      :visible.sync="dialogVisible"
      width="30%">
      <span>Is your prediction was correct?</span>
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button type="warning" @click="reportStatus(false)">Not</el-button>
      <el-button type="success" @click="reportStatus(true)">Yes</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import { getPredictions, removePrediction, updatePrediction } from '@/api/apipredictions'
  import events_filter from '@/views/components/events_filter'

  // TODO make prediction status string instead of array
  export default {
    components: {
      events_filter
    },
    data() {
      return {
        listLoading: true,
        predictions: null,
        dialogVisible: false,
        current_prediction: null
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.fillData()
      })
    },
    methods: {
      removeCategory(row, tag) {
        console.log(row)
        console.log(tag);
        return true;
      },
      fillData(query) {
        getPredictions(query)
          .then(response => {
            this.predictions = response.data
            console.log(response.data)
            this.listLoading = false
          });
      },
      reportStatus(result) {
        const self = this;
        self.current_prediction.status[0] = result === true ? 'WON' : 'LOST';
        updatePrediction(self.current_prediction)
          .then(response => {
            console.log(response);
            if (response && response.status === 200) {
              self.$message({
                message: 'Success! ',
                type: 'success',
                duration: 5 * 1000
              });

              return true
            }

            console.log(response.data);
            return false
          })
          .catch(error => {
            self.$message({
              message: 'Error! ' + error.data.message,
              type: 'error',
              duration: 5 * 1000
            })
          })
        self.dialogVisible = false;
      },
      handleReportStatus(index, row) {
        const self = this;
        self.dialogVisible = true;
        self.current_prediction = row;
      },
      handleDelete(index, row) {
        const self = this;
        self.$confirm('Are you sure to remove this prediction?')
          .then(_ => {
            removePrediction(row)
              .then(response => {
                console.log(response);
                if (response && response.status === 200) {
                  self.$message({
                    message: 'Success! ',
                    type: 'success',
                    duration: 5 * 1000
                  });

                  self.predictions.splice(index, 1);
                  return true
                }

                console.log(response.data);
                return false
              })
              .catch(error => {
                self.$message({
                  message: 'Error! ' + error.data.message,
                  type: 'error',
                  duration: 5 * 1000
                })
              })
          })
          .catch(_ => {});
      }
    }
  }
</script>

<style scoped>
  .el-tag--LOST {
    background-color: rgba(240, 91, 61, 0.08);
    color: #f81329;
  }

  .el-tag--WON {
    background-color: rgba(84, 126, 69, 0.08);
    color: #3ea74c;
  }

  .el-tag--PENDING {
    background-color: rgba(188, 177, 180, 0.08);
    color: #bcb1b4;
  }

  .bold {
    font-weight: bold;
  }
</style>

