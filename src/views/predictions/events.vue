<template>
  <div class="app-container calendar-list-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="filter-container">
          <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="Title"
                    v-model="listQuery.title">
          </el-input>

          <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">Search</el-button>
          <el-button class="filter-item" style="margin-left: 10px;" @click="openDialog(C.DIALOG_CREATE)" type="primary" icon="edit">
            Add my own event
          </el-button>
        </div>
      </el-col>
      <el-col :span="4" :offset="8">
        <betslip :betslipData="betslip_data" @stored="betslipStored()"></betslip>
      </el-col>
    </el-row>

    <el-table :data="events_table" @filter-change="onFilterChange"
              v-loading="listLoading" element-loading-text="Loading..." border fit
              style="width: 100%">

      <el-table-column width="150" align="center" label="DATE (UTC)" prop="date" column-key="date">
        <template slot-scope="scope">
          <span><strong>{{(scope.row.date) | moment("DD.MM kk:mm")}}</strong></span><br/>
          <span>({{(scope.row.date) | moment("from")}})</span>
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
                     @click="openDialog(C.DIALOG_PREDICT, scope.row)">Predict

          </el-button>
          <el-button v-if="isBefore(scope.row.date)"
                     @click="openDialog(C.DIALOG_STORE, scope.row)">Store Bet

          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                     :page-size="listQuery.per_page" layout="total, prev, pager, next" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="40%" top="9vh">
      <event_form :temp_event="temp_event" :dialogStatus="dialogStatus" @cancel="formCancel" @submitted="eventSubmitted"></event_form>
    </el-dialog>
  </div>
</template>

<script>
  import { fetchEventsList } from '@/api/events'
  import waves from '@/directive/waves.js'// water ripples
  import betslip from './events/betslip.vue'
  import event_form from './events/event_form.vue'
  import Event from './model/event.js'
  import C from './constants.js'

  const moment = require('moment')

  import dota2_logo from '@/assets/icons/dota2.svg'
  import lol_logo from '@/assets/icons/lol.svg'
  import cs_go from '@/assets/icons/csgo.svg'

  export default {
    name: 'events_table',
    components: { betslip, event_form },
    directives: {
      waves
    },
    data() {
      return {
        C: C,
        betslip_data: [],
        events_table: [],
        temp_event: new Event(),
        logos: {
          'LoL': lol_logo,
          'Dota 2': dota2_logo,
          'Counter-Strike': cs_go
        },
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          per_page: 25,
          title: undefined,
          discipline: undefined,
          until: moment().add(3, 'day').unix(),
          since: moment().subtract(2, 'day').unix(),
          game: []
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          [C.DIALOG_PREDICT]: 'Do a prediction',
          [C.DIALOG_EDIT]: 'Edit',
          [C.DIALOG_CREATE]: 'Store custom event',
          [C.DIALOG_STORE]: 'Store bet'
        },
        showOdds: true
      }
    },
    filters: {
      oddsFilter(odds) {
        if (odds < 1.5) {
          return 'success'
        } else if (odds > 2.2) {
          return 'red'
        }

        return 'gray'
      }
    },
    created() {
      this.getList()
    },
    methods: {
      setDialog(status) {
        this.dialogStatus = status;
      },
      betslipStored(prediction) {
        console.log('prediction stored')
        console.log(prediction)
        this.betslip_data = []
      },
      getFlagUrl(link) {
        return '/static/flags/' + link + '.svg';
      },
      isAfter(str) {
        return moment(str).isAfter()
      },
      isBefore(str) {
        return moment(str).isBefore()
      },
      openDialog(status, row) {
        this.temp_event = new Event(row);
        this.setDialog(status)
        this.dialogFormVisible = true
      },
      onFilterChange(filters) {
        console.log(filters)
        // Apply filter to query and re-ask backend
        this.loading = true;
        this.events_table = [];
        this.listQuery.game = filters.game;
        this.getList()
        return false
      },
      filterGameType(value, row) {
        return row.game === value;
      },
      getList() {
        this.listLoading = true
        let self = this
        fetchEventsList(this.listQuery).then(response => {
          self.events_table = []
          if (response && response.items) {
            response.items.forEach(function(item) {
              self.events_table.push(new Event(item))
            });

            this.total = response.total
          }

          this.listLoading = false
        })
      },
      handleFilter() {
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      timeFilter(time) {
        if (!time[0]) {
          this.listQuery.start = undefined
          this.listQuery.end = undefined
          return
        }
        this.listQuery.start = parseInt(+time[0] / 1000)
        this.listQuery.end = parseInt((+time[1] + 3600 * 1000 * 24) / 1000)
      },
      handleUpdate(row) {
        // Todo only update current events or what?
        this.temp_event = Object.assign({}, row)
        this.setDialog('update')
        this.dialogFormVisible = true
      },
      eventSubmitted(event) {
        console.log('event submitted')
        this.dialogFormVisible = false
        this.betslip_data.push(event)
        console.log(this.betslip_data);
        this.$message({
          title: 'Bet was successfully added to bet slip!',
          message: 'Bet added',
          type: 'success',
          duration: 2000
        })
      },
      formCancel() {
        this.dialogFormVisible = false;
        this.temp_event = new Event();
      }
    },
    watch: {
      dialogFormVisible(value) {
        if (value === false) {
          this.temp_event = new Event();
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .selected input {
    border: 1px solid green !important;
    color: darkgreen !important;;
    background: rgba(26, 99, 17, 0.5) !important;;
  }

  .el-table th, .el-table td {
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
