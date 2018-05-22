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

    <el-table stripe :fit="true" :data="predictions_table"
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

      <el-table-column max-width="380" label="Event" prop="game" column-key="game">
        <template slot-scope="scope">
          <div v-for="(event, index) in scope.row.selected_events" class="sub-event" v-bind:class="{ won: scope.row.status[0] === 'WON' }">
              <span class="small">
              {{(event.game)}} {{event.game_league}} 
              </span>
              <el-tag v-if="event.live" class="right">
               Live
              </el-tag>
              <br/>
              <span class="bold" v-bind:class="{ selected: event.selected_event === 'odds_1' }">
                {{event.team_A.name}}
              </span>
              -
              <span class="bold" v-bind:class="{ selected: event.selected_event === 'odds_2' }">
                {{event.team_B.name}}
              </span>
              <span size="mini">
              [{{event.selected_odds}}]
              </span>
              <br/>
              <span v-if="event.team_A.ex">
                ({{event.team_A.ex}})
              </span>
              <span v-if="event.team_B.ex">
                ({{event.team_B.ex}})
              </span>
          </div>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="Stake">
        <template slot-scope="scope">
          {{scope.row.stake}}
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="Final odds">
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
            @click="handleEdit(scope.$index, scope.row)">Edit
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
      <editForm :temp_event="current_prediction" @close="editFormClose" @update="editFormSubmit"></editForm>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchPredictions,
  removePrediction,
  updatePrediction
} from "@/api/predictions";
import events_filter from "@/views/components/events_filter";
import editForm from "./partials/editForm.vue";
import statsChart from "./charts/statsChart";
import BetSlip from '../predictions/helpers/betslip';
// TODO make prediction status string instead of array
export default {
  components: {
    events_filter,
    editForm,
    statsChart
  },
  data() {
    return {
      listLoading: true,
      predictions: null,
      predictions_table: [],
      dialogVisible: false,
      current_prediction: new BetSlip(), // handling record which is being edited
      current_row: null, // row position for current_prediction
      editFormVisible: false,
      showChart: false,
      listQuery: {
        page: 1,
        per_page: 25,
        title: undefined
      },
      currentPage: 1,
      total: 0
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.loadPredictions();
    });
  },
  methods: {
    filterData(filters) {
      // this comes with default predictions filters, so need to fill up with events data
      Object.assign(this.listQuery, filters);
      this.loadPredictions();
    },
    removeCategory(row, tag) {
      console.log(row);
      console.log(tag);
      return true;
    },
    loadPredictions() {
      this.listLoading = true;
      this.predictions_table = [];
      fetchPredictions(this.listQuery).then(response => {
        this.predictions = response;
        console.log(response);
        this.listLoading = false;
        this.paginateData(1);
        this.total = response.length;
        this.listLoading = false;
      });
    },
    reportStatus(result) {
      // updating status inside actual table, cached rows and current_prediction
      this.predictions[
        this.current_row
      ].status[0] = this.current_prediction.status[0] = result ? "WON" : "LOST";
      updatePrediction(this.current_prediction).then(response => {
        this.$message({
          message: result ? "Congratulations!" : "Good luck next time.",
          type: result ? "success" : "error",
          duration: 5 * 1000
        });
      });

      this.paginateData(this.currentPage);
      this.dialogVisible = false;
    },
    editFormSubmit(result) {
      this.predictions[this.current_row] = result; // todo better way and validation?
      this.current_prediction = result; // todo better way and validation?
      console.log("edit form retunr");
      console.log(result);
      updatePrediction(this.current_prediction).then(response => {
        this.$message({
          message: "Done.",
          type: "success",
          duration: 2 * 1000
        });
      });
      this.paginateData(this.currentPage);
      this.editFormVisible = false;
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
    handleEdit(index, predictionRow) {
      this.current_prediction = new BetSlip(predictionRow);
      console.log(this.current_prediction);
      this.current_row = index;
      this.editFormVisible = true;
    },
    handleDelete(index, row) {
      const self = this;
      this.$confirm("Are you sure to remove this prediction?")
        .then(_ => {
          removePrediction(row)
            .then(response => {
              console.log(response);
              if (response && response.status === 200) {
                this.$message({
                  message: "Success! ",
                  type: "success",
                  duration: 5 * 1000
                });

                this.predictions.splice(index, 1);
                this.paginateData(this.currentPage);
                return true;
              }

              console.log(response.data);
              return false;
            })
            .catch(error => {
              self.$message({
                message: "Error! " + error.data.message,
                type: "error",
                duration: 5 * 1000
              });
            });
        })
        .catch(_ => {});
    },
    paginateData(val) {
      console.log("paginateData " + val);
      this.predictions_table = [];
      this.listQuery.page = val;
      this.currentPage = val;
      let pagedData = this.predictions.filter(
        (item, index) =>
          index < this.listQuery.per_page * this.listQuery.page &&
          index >= this.listQuery.per_page * (this.listQuery.page - 1)
      );

      pagedData.forEach(item => {
        this.predictions_table.push(item); // TODO shall we create events for every row? also DRY
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.right {
  float: right;
}
.bold {
  font-weight: bold;
}
.sub-event {
  text-align: left;
}
.selected {
  color: red;
}
.won {
  .selected {
    color: green;
  }
}
</style>

