<template>
  <div>
  <el-row>
    <el-col :span="12">
      <div class="filter-container">
        <events_filter @filter="filterData"></events_filter>          
      </div>
    </el-col>
    <el-col :span="4">
      <el-button class="btn filter-item" style="margin-left: 10px;" @click="openDialog(C.DIALOG_CREATE)" type="success" icon="edit">
        Add my own event
      </el-button>
    </el-col>   
  </el-row>
  <el-row>
    <el-col :span="16" class="widget widget-simple widget-table">
      <el-table :data="events_table" @filter-change="onFilterChange"
        v-loading="listLoading" element-loading-text="Loading..." border fit
        class="table boo-table table-striped table-content table-hover dataTable">

        <el-table-column align="center" label="DATE (UTC)" prop="date" column-key="date">
          <template slot-scope="scope">
            <span v-if="scope.row.source[0] == 'manual'"><el-tag type="primary">private</el-tag></span>
            <span><strong>{{(parseInt(+scope.row.date / 1000)) | moment("DD.MM kk:mm")}}</strong></span><br/>
            <span>({{(parseInt(+scope.row.date / 1000)) | moment("from")}})</span>
          </template>
        </el-table-column>

        <el-table-column label="Event" prop="game" column-key="game"
                        :filters="[
                            { text: 'Dota 2', value: 'Dota 2' },
                            { text: 'LoL', value: 'LoL' },
                            { text: 'Overwatch', value: 'Overwatch' },
                            { text: 'Counter-Strike', value: 'Counter-Strike' },
                            { text: 'PUBG', value: 'PUBG' }
                        ]"
                        :filter-method="filterGameType"
                        filter-placement="bottom-end">
          <template slot-scope="scope">
            <svg-icon :icon-class="scope.row.game" w="36px" h="36px"/>
            <br/>
            <span @click="handleUpdate(scope.row)">{{scope.row.game_league}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="Side A" class-name="event">
          <template slot-scope="scope">
            <div @click="placeBetToBetslip(scope.row, 'odds_1')">
            <span><img :src="getFlagUrl(scope.row.team_A.flag)" width="22px"></span>
            <span>{{scope.row.team_A.name}}</span> <br/>
            <el-tag :type="scope.row.odds_1 | oddsFilter" v-if="scope.row.odds_1">{{scope.row.percent_odds_1}}%</el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column align="center" label="Side B" class-name="event">
          <template slot-scope="scope">
            <div @click="placeBetToBetslip(scope.row, 'odds_2')">
            <span> <img :src="getFlagUrl(scope.row.team_B.flag)" width="22px"></span>
            <span>{{scope.row.team_B.name}}</span> <br/>
            <el-tag :type="scope.row.odds_2 | oddsFilter" v-if="scope.row.odds_2">{{scope.row.percent_odds_2}}%</el-tag>
            </div>
          </template>
        </el-table-column>

      </el-table>
    </el-col>
    <el-col :span="8" v-if="token && betslip_data.length">
      <betslip class='betslip-container' :betslipData="betslip_data" @storeBetslip="storeBetslip"></betslip>
    </el-col>
    <el-col :span="8" v-if="!token">
      <el-row>
        <el-col>
          <div class="betslip widget widget-box widget-collapsible">
          <div class="widget-header clickable" data-toggle="collapse">
              <h4><small>Betslip</small></h4>
              <router-link to="login">
              <el-button class="btn btn-yellow btn-block">
              Login
              </el-button>
              </router-link>
          </div>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>

  <div class="pagination-container">
    <el-pagination @current-change="paginateData" :page-size="listQuery.per_page" layout="total, prev, pager, next" :total="total">
    </el-pagination>
  </div>

  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="40%" top="9vh" class="modal hide fade in">
    <event_form :temp_event="temp_event" :dialogStatus="dialogStatus" @close="formClose" @toBetSlip="placeBetToBetslip"></event_form>
  </el-dialog>
  </div>
</template>

<comment>
  Todo:
    for already finished events, display winner in table and count this in betslip
    double select(add to betslip click) should remove event from betslip
    single select should highlight event
    lost/won status mush highlight whole betslip
    some kind of limit and csrf when adding custom events to avoid overspam
    autofill for event league based on previous custom events
    reset stake after betslip store
    better message about storing betslip
    after adding custom event, display it in event table with [new] tag
    Team flags from somewhere
    betslip: display total win and profit or loss/possible profit 
    provide way to edit bet date in betslip
    dont drop odds when picking ex
    if placing multibet when one+ event is not yet finished, dont show lost/won, it must be a prediction
    maybe split odds select into two selects, with X and .XX part
    some custom field like 'ex' but stored inside bet [to store bet id, in order to realize which bets we have already stored]
    betslip position fixed
</comment>

<script>
import { mapGetters } from 'vuex'
import { fetchEventsList } from "@/api/events";
import { storePrediction } from '@/api/predictions'
import Event from "./model/event.js";
import C from "./constants.js";
import events_filter from "@/views/components/events_filter";
import betslip from "./events/betslip.vue";
import event_form from "./events/event_form.vue";
// import BetSlipHelper from './helpers/betslip.js';
// const moment = require("moment");

export default {
  name: "events_table",
  components: { betslip, event_form, events_filter },
  data() {
    return {
      C: C,
      betslip_data: [],
      events_data: null,
      events_table: [],
      temp_event: new Event(),
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
        [C.DIALOG_EDIT]: "Edit",
        [C.DIALOG_CREATE]: "Store custom event",
        [C.DIALOG_STORE]: "Store bet"
      }
    };
  },
  computed: {
    ...mapGetters([
      'token' // maybe we need some better way to check if user is logged in?
    ])
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
    placeBetToBetslip(row, side) {
      // Todo reject bets which are already in betslip
      console.log(row);
      console.log(side);
      let event = new Event(row);
      event.selected_odds = event[side]
      event.selected_event = side
            
      this.dialogFormVisible = false;
      this.betslip_data.push(event);
    },
    filterData(filters) {
      // this comes with default predictions filters, so need to fill up with events data
      console.log(filters);
      console.log(this.listQuery)
      Object.assign(this.listQuery, filters);
      console.log(this.listQuery);
      this.loadEvents();
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
      // todo better way
      return "/static/flags/" + link + ".svg";
    },
    openDialog(status, row) {
      this.temp_event = new Event(row);
      this.dialogStatus = status;
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
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
    },
    formClose(event) {
      console.log("closing form after dialog was opened");
      this.loadEvents();

      this.dialogFormVisible = false;
      this.temp_event = new Event();
    },
    paginateData(val) {
      console.log('paginateData ' + val)
      this.events_table = [];
      this.listQuery.page = val;
      let pagedData = this.events_data.filter((item, index) => 
            index < this.listQuery.per_page * this.listQuery.page && index >= this.listQuery.per_page * (this.listQuery.page - 1))

      pagedData.forEach(item => {
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
.betslip-container {
  position: fixed;
  top: 172px;
  // Make me sticky
}

.selected input {
  border: 1px solid green !important;
  color: darkgreen !important;
  background: rgba(26, 99, 17, 0.5) !important;
}

.el-table__column-filter-trigger {
  line-height: 18px; // fixing centering for table header
}

.el-table th,
.el-table td {
  padding: 5px 0;
  font-size: 13px; 
}

.event:hover {
  cursor: pointer;
  background:#dbba13 !important;
  color: #ffffff;
  text-shadow: none;
  font-weight: bold;
  
  .el-tag {
    background: #c6c7cb;
    color: #3e5f33;
  }
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

.el-tag--primary {
  color: #f5f6f9;
  background-color: #f99008;
  text-shadow: none;
  position: absolute;
  right: 10px;
  top: 6px;
  font-weight: bold;
}

.el-pager li.active {
  color: #dbba13;
}
</style>
