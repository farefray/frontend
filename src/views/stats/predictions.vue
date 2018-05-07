<template>
  <div class="components-container" style='height:100vh'>
    <el-row :gutter="8">
      <el-col>
        <events_filter @filter="filterData"></events_filter>
      </el-col>
      <el-col>
        <el-button
            size="mini"
            type="success"
            @click="showChart = !showChart">Toggle chart
          </el-button>
      </el-col>
    </el-row>
    <br/>
    <div class='chart-container' v-if="showChart" style="height:450px;">
      <stats-chart :stats="predictions_table"></stats-chart>
    </div>

    <el-table :fit="true" :data="predictions_table"
              v-loading="listLoading" element-loading-text="Loading..." border
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
          <el-button
            size="mini"
            type="warning"
            @click="editPrediction(scope.$index, scope.row)" disabled="disabled">Edit
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination @current-change="paginateData" current-page.sync="currentPage" :page-size="listQuery.per_page" layout="total, prev, pager, next" :total="total">
      </el-pagination>
    </div>
    
    <el-dialog
      title="Report bet status"
      :visible.sync="dialogVisible"
      width="30%">
      <span>Is your prediction was correct?</span>
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button type="warning" @click="reportStatus(false)">Not</el-button>
      <el-button type="success" @click="reportStatus(true)">Yes</el-button>
    </el-dialog>
    <el-dialog title="Edit prediction" :visible.sync="editFormVisible" width="40%" top="9vh">
      <event_form :temp_event="editForm.temp_event" :dialogStatus="editForm.dialogStatus" @close="editFormClose"></event_form>
    </el-dialog>
  </div>
</template>

<script>
  import { fetchPredictions, removePrediction, updatePrediction } from '@/api/predictions'
  import Event from "../predictions/model/event.js";
  import events_filter from '@/views/components/events_filter'
  import event_form from "../predictions/events/event_form.vue"; // Todo multiple bet edit somehow?
  import statsChart from './charts/statsChart'
  // TODO make prediction status string instead of array
  export default {
    components: {
      events_filter, event_form, statsChart
    },
    data() {
      return {
        listLoading: true,
        predictions: null,
        predictions_table: [],
        dialogVisible: false,
        current_prediction: null, // handling record which is being edited
        current_row: null, // row position for current_prediction
        editFormVisible: false,
        showChart: false,
        editForm: {
          temp_event: new Event(),
          dialogStatus: ""
        },
        listQuery: {
          page: 1,
          per_page: 25,
          title: undefined
        },
        currentPage: 1,
        total: 0
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.loadPredictions()
      })
    },
    methods: {
      filterData(filters) {
        // this comes with default predictions filters, so need to fill up with events data
        Object.assign(this.listQuery, filters);
        this.loadPredictions();
      },
      removeCategory(row, tag) {
        console.log(row)
        console.log(tag);
        return true;
      },
      loadPredictions() {
        this.listLoading = true;
        this.predictions_table = [];
        fetchPredictions(this.listQuery)
          .then(response => {
            this.predictions = response
            console.log(response)
            this.listLoading = false
            this.paginateData(1);
            this.total = response.length;
            this.listLoading = false;
          });
      },
      reportStatus(result) {
        // updating status inside actual table, cached rows and current_prediction
        this.predictions[this.current_row].status[0] = this.current_prediction.status[0] = result ? 'WON' : 'LOST';        
        updatePrediction(this.current_prediction)
          .then(response => {
            this.$message({
                message: result ? 'Congratulations!' : 'Good luck next time.',
                type: result ? 'success' : 'error',
                duration: 5 * 1000
              });
          });

        this.paginateData(this.currentPage);
        this.dialogVisible = false;
      },
      handleReportStatus(index, row) {
        this.dialogVisible = true;
        this.current_prediction = row;
        this.current_row = index;
        console.log(index);
      },
      editFormClose() {
        this.editFormVisible = false;
      },
      editPrediction(index, row) {
        this.editFormVisible = true;
      },
      handleDelete(index, row) {
        const self = this;
        this.$confirm('Are you sure to remove this prediction?')
          .then(_ => {
            removePrediction(row)
              .then(response => {
                console.log(response);
                if (response && response.status === 200) {
                  this.$message({
                    message: 'Success! ',
                    type: 'success',
                    duration: 5 * 1000
                  });

                  this.predictions.splice(index, 1);
                  this.paginateData(this.currentPage);
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
      },
      paginateData(val) {
        console.log('paginateData ' + val)
        this.predictions_table = [];
        this.listQuery.page = val;
        this.currentPage = val;
        let pagedData = this.predictions.filter((item, index) => 
              index < this.listQuery.per_page * this.listQuery.page && index >= this.listQuery.per_page * (this.listQuery.page - 1))

        pagedData.forEach(item => {
          this.predictions_table.push(item); // TODO shall we create events for every row? also DRY
        });
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

