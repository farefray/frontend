<template>
  <div>
  <el-row :gutter="20">
    <el-col :span="12">
      <div class="filter-container">
        <events_filter @filter="filterData"></events_filter>          
      </div>
    </el-col>
    <el-col :span="4">
      <el-button class="filter-item" style="margin-left: 10px;" @click="openDialog(C.DIALOG_CREATE)" type="primary" icon="edit" disabled="disabled">
        Add my own event
      </el-button>
    </el-col>
    <el-col :span="4" :offset="4">
      <betslip :betslipData="betslip_data" @storeBetslip="storeBetslip"></betslip>
    </el-col>
  </el-row>
  <br/>
  <el-row>
    <el-table :data="events_table" @filter-change="onFilterChange"
      v-loading="listLoading" element-loading-text="Loading..." border fit
      style="width: 100%">

      <el-table-column width="150" align="center" label="DATE (UTC)" prop="date" column-key="date">
        <template slot-scope="scope">
          <span><strong>{{(parseInt(+scope.row.date / 1000)) | moment("DD.MM kk:mm")}}</strong></span><br/>
          <span>({{(parseInt(+scope.row.date / 1000)) | moment("from")}})</span>
        </template>
      </el-table-column>

      <el-table-column width="175px" label="Event" prop="game" column-key="game"
                      :filters="[
                          { text: 'Dota 2', value: 'Dota 2' },
                          { text: 'LoL', value: 'LoL' },
                          { text: 'Overwatch', value: 'Overwatch' },
                          { text: 'Counter-Strike', value: 'Counter-Strike' }
                      ]"
                      :filter-method="filterGameType"
                      filter-placement="bottom-end">
        <template slot-scope="scope">
          <img :src="logos[scope.row.game]" width="24px" close-transition v-if="logos[scope.row.game]">
          <span v-else>[{{scope.row.game}}] </span>
          <br/>
          <span @click="handleUpdate(scope.row)">{{scope.row.game_league}}</span>
        </template>
      </el-table-column>

      <el-table-column width="240px" align="center" label="Participant">
        <template slot-scope="scope">
          <span><img :src="getFlagUrl(scope.row.team_A.flag)" width="22px"></span>
          <span>{{scope.row.team_A.name}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" v-if='showOdds' align="center" label="Chance">
        <template slot-scope="scope">
          <el-tag :type="scope.row.odds_1 | oddsFilter" v-if="scope.row.odds_1">{{scope.row.percent_odds_1}}%</el-tag>
          <el-tag v-else>?</el-tag>
        </template>
      </el-table-column>

      <el-table-column width="240px" align="center" label="Participant">
        <template slot-scope="scope">
          <span> <img :src="getFlagUrl(scope.row.team_B.flag)" width="22px"></span>
          <span>{{scope.row.team_B.name}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" v-if='showOdds' align="center" label="Chance">
        <template slot-scope="scope">
          <el-tag :type="scope.row.odds_2 | oddsFilter" v-if="scope.row.odds_2">{{scope.row.percent_odds_2}}%</el-tag>
          <el-tag v-else>?</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Operation">
        <template slot-scope="scope">
          <el-button v-if="isAfter(scope.row.date)" type="success"
                    @click="openDialog(C.DIALOG_PREDICT, scope.row)" disabled>Predict

          </el-button>
          <el-button v-if="isBefore(scope.row.date)"
                    @click="openDialog(C.DIALOG_STORE, scope.row)">Store Bet

          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-row>

  <el-dialog title="Bet details" :visible.sync="instabetFormVisible">
   <betslipParams @updateBetAmount="updateBetAmount" @updateBetResult="updateBetResult"></betslipParams>
    <span slot="footer" class="dialog-footer">
      <el-button @click="instabetFormVisible = false">Cancel</el-button>
      <el-button type="primary" @click="storeInstaBet">Confirm</el-button>
    </span>
  </el-dialog>

  <div class="pagination-container">
    <el-pagination @current-change="paginateData" :page-size="listQuery.per_page" layout="total, prev, pager, next" :total="total">
    </el-pagination>
  </div>

  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="40%" top="9vh">
    <event_form :temp_event="temp_event" :dialogStatus="dialogStatus" @close="formClose" @toBetSlip="toBetSlip"></event_form>
  </el-dialog>
  </div>
</template>

<script>
import { fetchEventsList } from "@/api/events";
import { storePrediction } from '@/api/apipredictions'
import waves from "@/directive/waves.js"; // water ripples
import events_filter from "@/views/components/events_filter";
import betslip from "./events/betslip.vue";
import event_form from "./events/event_form.vue";
import Event from "./model/event.js";
import C from "./constants.js";
import BetSlipHelper from './helpers/betslip.js';
import betslipParams from "./components/betslip_params.vue";

const moment = require("moment");

import dota2_logo from "@/assets/icons/dota2.svg";
import lol_logo from "@/assets/icons/lol.svg";
import cs_go from "@/assets/icons/csgo.svg";

export default {
  name: "events_table",
  components: { betslip, event_form, events_filter, betslipParams },
  directives: {
    waves
  },
  data() {
    return {
      C: C,
      betslip_data: [],
      events_data: null,
      events_table: [],
      temp_event: new Event(),
      logos: {
        LoL: lol_logo,
        "Dota 2": dota2_logo,
        "Counter-Strike": cs_go
      },
      total: undefined,
      listLoading: true,
      listQuery: {
        page: 1,
        per_page: 25,
        title: undefined,
        discipline: undefined,
        game: []
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        [C.DIALOG_PREDICT]: "Do a prediction",
        [C.DIALOG_EDIT]: "Edit",
        [C.DIALOG_CREATE]: "Store custom event",
        [C.DIALOG_STORE]: "Store bet"
      },
      showOdds: true,
      instabetFormVisible: false,
      instabetResult: false, // this shouldnt be here, should be somehow requested from betslipparams
      instabetStake: 0, // this shouldnt be here, should be somehow requested from betslipparams
      instabetCategories: []
    };
  },
  filters: {
    oddsFilter(odds) {
      if (odds < 1.5) {
        return "success";
      } else if (odds > 2.2) {
        return "red";
      }

      return "gray";
    }
  },
  mounted() {
    console.log('events mounted');
    this.loadEvents();
  },
  methods: {
    filterData(filters) {
      // this comes with default predictions filters, so need to fill up with events data
      console.log(filters);
      console.log(this.listQuery)
      Object.assign(this.listQuery, filters);
      console.log(this.listQuery);
      this.loadEvents();
    },
    setDialog(status) {
      this.dialogStatus = status;
    },
    storeInstaBet() {
      this.instabetFormVisible = false;
      this.dialogFormVisible = false;
      console.log(this.temp_event);
      let betslipObj = new BetSlipHelper([this.temp_event], this.$store.state.user.id);
      betslipObj.result = this.instabetResult;
      betslipObj.bet_amount = this.instabetStake;
      betslipObj.categories = this.instabetCategories;
      betslipObj.update();
      console.log(betslipObj);
      this.storeBetslip(betslipObj.getData());
      // this.storeBetslip(data);
    },
    storeBetslip(data) {
      console.log("prediction store");
      console.log('store bets')
      console.log(data)
      storePrediction(data).then(response => {
        console.log(response)
        console.log('stored')
        
        // ToDo response processed
        this.$notify({
          title: 'Success!',
          message: 'You have successfully stored your betslip',
          type: 'success',
          duration: 2000
        })
      }).catch(error => {
        console.log('error')
        console.log(error)
      })

      this.betslip_data = [];
    },
    getFlagUrl(link) {
      return "/static/flags/" + link + ".svg";
    },
    isAfter(str) {
      return moment(str).isAfter();
    },
    isBefore(str) {
      return moment(str).isBefore();
    },
    openDialog(status, row) {
      this.temp_event = new Event(row);
      this.setDialog(status);
      this.dialogFormVisible = true;
    },
    onFilterChange(filters) {
      console.log(filters);
      console.log('on filter change');
      // Apply filter to query and re-ask backend
      this.loading = true;
      this.events_table = [];
      this.listQuery.game = filters.game;
      this.loadEvents();
      return false;
    },
    filterGameType(value, row) {
      return row.game === value;
    },
    loadEvents() {
      console.log('loadEvents')
      this.listLoading = true;
      fetchEventsList(this.listQuery).then(response => {
        this.events_table = [];
        if (response && response.length) {
          this.events_data = response;
          this.paginateData(1); // first page by default
        } 

        this.total = response.length;
        this.listLoading = false;
        return;
      });
    },
    handleUpdate(row) {
      // Todo only update current events or what?
      this.temp_event = Object.assign({}, row);
      this.setDialog("update");
      this.dialogFormVisible = true;
    },
    updateBetResult(val) {
      this.instabetResult = val;
    },
    updateBetAmount(val) {
      this.instabetStake = val;
    },
    toBetSlip(event, instantBet = false) {
      console.log("event submitted");
            
      console.log(this.betslip_data);

      if (instantBet === true) {
        console.log(this.temp_event);
        console.log(event);
        this.temp_event = event; // probably already === event
        this.instabetFormVisible = true;        
        return;
      }

      this.dialogFormVisible = false;
      this.betslip_data.push(event);
      this.$message({
          title: "Bet was successfully added to bet slip!",
          message: "Bet added",
          type: "success",
          duration: 2000
        });
    },
    formClose(reload, event) {
      console.log("closing form after dialog was opened");
      if (reload === true) {
        console.log('reload after formClose');
        this.loadEvents();
      }

      if (event !== undefined) {
        // its newly created event, re-open prediction dialog
        this.dialogFormVisible = false;

        let self = this;
        setTimeout(() => {
          // TODO decide its predict or store
          self.openDialog(C.DIALOG_STORE, event);
        }, 150);

        return true;
      }

      this.dialogFormVisible = false;
      this.temp_event = new Event();
    },
    paginateData(val) {
      console.log('paginateData ' + val)
      this.events_table = [];
      this.listQuery.page = val;
      let pagedData = this.events_data.filter((item, index) => 
            index < this.listQuery.per_page * this.listQuery.page && index >= this.listQuery.per_page * (this.listQuery.page - 1))

      console.log(pagedData);
      pagedData.forEach(item => {
        console.log(item);
        this.events_table.push(new Event(item)); // TODO shall we create events for every row? also DRY
      });
    }
  },
  watch: {
    dialogFormVisible(value) {
      if (value === false) {
        this.temp_event = new Event();
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.selected input {
  border: 1px solid green !important;
  color: darkgreen !important;
  background: rgba(26, 99, 17, 0.5) !important;
}

.el-table th,
.el-table td {
  padding: 5px 0;
  font-size: 13px;
}

.el-table .cell {
  text-align: center;
  line-height: 20px;
}

el-dialog {
  .el-input {
    width: auto;
  }
}

.el-tag--red {
  background-color: rgba(240, 91, 61, 0.08);
  color: #f89616;
}

.el-tag--green {
  background-color: rgba(84, 126, 69, 0.08);
  color: #3ea74c;
}

.el-tag--gray {
  background-color: rgba(188, 177, 180, 0.08);
  color: #bcb1b4;
}

.el-pager li.active {
  color: #f99008;
}
</style>
