<template>
  <div class="app-container calendar-list-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="filter-container">
          <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="Title"
                    v-model="listQuery.title">
          </el-input>

          <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">Search</el-button>
          <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">
            Add
          </el-button>
        </div>
      </el-col>
      <el-col :span="4" :offset="8"><betslip :betslipData="betslip_data" @stored="betslipStored()"></betslip>
      </el-col>
    </el-row>

    <el-table :data="list" @filter-change="onFilterChange"
              v-loading="listLoading" element-loading-text="Loading..." border fit
              style="width: 100%">

      <el-table-column width="150" align="center" label="DATE (UTC)" prop="date" column-key="date">
        <template slot-scope="scope">
          <span><strong>{{(scope.row.date) | moment("DD.MM kk:mm")}}</strong></span><br/>
          <span>({{(scope.row.date) | moment("from")}})</span>
        </template>
      </el-table-column>

      <el-table-column min-width="80px" max-width="150px" label="Event" prop="game" column-key="game"
                       :filters="[
                          { text: 'Dota 2', value: 'Dota 2' },
                          { text: 'LoL', value: 'LoL' },
                          { text: 'Overwatch', value: 'Overwatch' },
                          { text: 'Counter-Strike', value: 'Counter-Strike' }
                       ]"
                       :filter-method="filterGameType"
                       filter-placement="bottom-end">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.game_league}}</span>
          <img :src="logos[scope.row.game]" width="32px" close-transition>
        </template>
      </el-table-column>

      <el-table-column width="210px" align="center" label="Participant">
        <template slot-scope="scope">
          <span><img :src="getFlagUrl(scope.row.team_A.flag)" width="32px"></span>
          <span>{{scope.row.team_A.name}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" v-if='showOdds' align="center" label="Chance">
        <template slot-scope="scope">
          <el-tag :type="scope.row.odds_1 | oddsFilter">{{scope.row.percent_odds_1}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column width="210px" align="center" label="Participant">
        <template slot-scope="scope">
          <span> <img :src="getFlagUrl(scope.row.team_B.flag)" width="32px"></span>
          <span>{{scope.row.team_B.name}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" v-if='showOdds' align="center" label="Chance">
        <template slot-scope="scope">
          <el-tag :type="scope.row.odds_2 | oddsFilter">{{scope.row.percent_odds_2}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Operation">
        <template slot-scope="scope">
          <el-button v-if="isAfter(scope.row.date)" type="success"
                     @click="openPredictionDialog(scope.row, 'predict')">Predict

          </el-button>
          <el-button v-if="isBefore(scope.row.date)"
                     @click="openPredictionDialog(scope.row, 'store')">Store Bet

          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                     :page-size="listQuery.per_page" layout="total, prev, pager, next" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form class="small-space" :model="temp" label-position="top" label-width="120px"
               style='width: 95%; margin: 0 40px;'>

        <el-form-item label="Event details">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input placeholder="Event type" v-model="temp.game"></el-input>
            </el-col>
            <el-col :span="14">
              <el-input placeholder="Event league" v-model="temp.game_league"></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="Date">
          <el-date-picker v-model="temp.date" type="datetime" placeholder="Select date">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="Odds">
          <el-row justify="center">
            <el-col :span="8">
              <el-tooltip placement="top">
                <div slot="content">Click to select</div>
                <el-input-number v-bind:class="{ selected: selected=='odds_1' }" v-model="temp.odds_1" :min="1" :max="10" :step="0.05" @focus="selected='odds_1'"></el-input-number>
              </el-tooltip>
            </el-col>
            <el-col :span="8">
              <el-tooltip placement="top">
                <div slot="content">Click to select</div>
                <el-input-number v-bind:class="{ selected: selected=='odds_draw' }" v-model="temp.odds_draw" :min="1" :max="10" :step="0.05" @focus="selected='odds_draw'"></el-input-number>
              </el-tooltip>
            </el-col>
            <el-col :span="8">
              <el-tooltip placement="top">
                <div slot="content">Click to select</div>
                <el-input-number v-bind:class="{ selected: selected=='odds_2' }" v-model="temp.odds_2" :min="1" :max="10" :step="0.05" @focus="selected='odds_2'"></el-input-number>
              </el-tooltip>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="Participants">
          <el-row :gutter="20">
            <el-col :span="11">
              <el-input v-bind:class="{ selected: selected=='odds_1' }" placeholder="Participant A" v-model="temp.team_A.name" @focus="selected='odds_1'"></el-input>
            </el-col>
            <el-col :span="11">
              <el-input v-bind:class="{ selected: selected=='odds_2' }" placeholder="Participant B" v-model="temp.team_B.name" @focus="selected='odds_2'"></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="Verified">
          <el-switch v-model="temp.verified" disabled>
          </el-switch>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create">Create</el-button>
        <el-button v-if="dialogStatus=='update'" @click="update">Update</el-button>
        <el-button v-else type="primary" @click="predict">Add to bet slip</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { fetchEventsList } from '@/api/events'
  import waves from '@/directive/waves.js'// water ripples
  import betslip from './betslip.vue'
  import Event from './model/event.js'
  const moment = require('moment')

  import dota2_logo from '@/assets/icons/dota2.svg'
  import lol_logo from '@/assets/icons/lol.svg'
  import cs_go from '@/assets/icons/csgo.svg'

  export default {
    name: 'events_table',
    components: { betslip },
    directives: {
      waves
    },
    data() {
      return {
        betslip_data: [],
        logos: {
          'LoL': lol_logo,
          'Dota 2': dota2_logo,
          'Counter-Strike': cs_go
        },
        list: [],
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          per_page: 25,
          title: undefined,
          discipline: undefined,
          until: moment().add(3, 'day').unix(),
          since: moment().subtract(1, 'day').unix()
        },
        selected: undefined,
        selected_odds: 0,
        selected_event: undefined,
        temp: new Event(),
        statusOptions: ['published', 'draft', 'deleted'],
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          predict: 'Do a prediction',
          update: 'Edit',
          create: 'Create',
          store: 'Store bet'
        },
        showOdds: true
      }
    },
    watch: {
      selected(value) {
        this.selected_odds = this.temp[value]
        this.selected_event = value;
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
      openPredictionDialog(row, status) {
        this.resetTemp(row)
        this.dialogStatus = status
        this.dialogFormVisible = true
      },
      onFilterChange(filters) {
        console.log(filters)
        // Apply filter to query and re-ask backend
      },
      filterGameType(value, row) {
        return row.game === value;
      },
      getList() {
        this.listLoading = true
        let self = this
        fetchEventsList(this.listQuery).then(response => {
          if (response && response.items) {
            response.items.forEach(function(item) {
              self.list.push(new Event(item))
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
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
      },
      handleDelete(row) {
        this.$notify({
          title: 'Success',
          message: 'Success!',
          type: 'success',
          duration: 2000
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      },
      create() {
        this.temp.id = parseInt(Math.random() * 100) + 1024
        this.temp.timestamp = +new Date()
        this.temp.author = 'Test'
        this.list.unshift(this.temp)
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: 'Success!',
          type: 'success',
          duration: 2000
        })
      },
      predict() {
        // Store prediction
        // Todo check if time is still okay for prediction!
        console.log(this.temp)
        this.temp.selected_odds = this.selected_odds
        this.temp.selected_event = this.selected_event
        this.betslip_data.push(this.temp)
        this.dialogFormVisible = false
        this.resetTemp()
        this.$message({
          title: 'Bet was successfully added to bet slip!',
          message: 'Bet added',
          type: 'success',
          duration: 2000
        })
      },
      update() {
        this.temp.timestamp = +this.temp.timestamp
        for (const v of this.list) {
          if (v.id === this.temp.id) {
            const index = this.list.indexOf(v)
            this.list.splice(index, 1, this.temp)
            break
          }
        }
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success!',
          message: 'Success',
          type: 'success',
          duration: 2000
        })
      },
      resetTemp(bet) {
        this.selected_event = undefined
        this.selected = undefined
        this.selected_odds = 0
        this.temp = new Event(bet);
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

  el-dialog {
    .el-input {
      width: auto;
    }
  }
</style>
