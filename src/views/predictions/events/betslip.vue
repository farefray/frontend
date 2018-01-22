<template>
  <div>
  <el-popover
    ref="popover1"
    placement="right"
    width="500"
    v-model="active"
    trigger="click">
    <el-table :data="betslipData">
        <el-table-column width="100" label="Date" prop="date" column-key="date">
          <template slot-scope="scope">
            {{(scope.row.date) | moment("DD.MM kk:mm")}}
        </template>
        </el-table-column>
        <el-table-column width="150" label="Participant">
          <template slot-scope="scope">
            <span v-bind:class="{ bold: scope.row.selected_event === 'odds_1' }">
              {{scope.row.team_A.name}}
            </span>
            <div v-if="scope.row.team_A.ex">
              ({{scope.row.team_A.ex}})
            </div>
            <div v-if="scope.row.live && scope.row.selected_event === 'odds_1'">
              [Live]
            </div>
          </template>
        </el-table-column>
        <el-table-column width="150" label="Participant">
          <template slot-scope="scope">
            <span v-bind:class="{ bold: scope.row.selected_event === 'odds_2' }">
              {{scope.row.team_B.name}}
            </span>
            <div v-if="scope.row.team_B.ex">
              ({{scope.row.team_B.ex}})
            </div>
            <div v-if="scope.row.live && scope.row.selected_event === 'odds_2'">
              [Live]
            </div>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">Remove</el-button>
          </template>
        </el-table-column>
    </el-table>
    <br />
    <el-row :gutter="10">
      <el-col>
        Stake:
      </el-col>
      <el-col>
          <el-input-number v-model="bet_amount" :min="0" :step="50"></el-input-number>
      </el-col>
    </el-row>
    <br />
    <el-row :gutter="10">
      <el-col :span="10">
        Final odds: {{this.odds}}
      </el-col>
      <el-col :span="10">
        Profit: {{this.profit}}
      </el-col>
    </el-row>
    <el-row :gutter="10" v-if="canStoreResult">
      <el-col :span="10">
        Bet result:
      </el-col>
      <el-col :span="10">
        <el-switch
          v-model="result"
          activeColor="#13ce66"
          inactiveColor="#ff4949"
          activeText="Won"
          activeValue="true"
          inactiveText="Lost"
          inactiveValue="false">
        </el-switch>
      </el-col>
    </el-row>
    <br />
    <el-row :gutter="10">
      <el-col :offset="20">
        <el-button type="primary" @click="store">Store</el-button>
      </el-col>
    </el-row>
  </el-popover>
    <el-badge :value="betslipData.length" class="item" v-if="betslipData.length > 0">
      <el-button v-popover:popover1 :disabled="betslipData.length === 0" @click="active=true">Show betslip</el-button>
    </el-badge>
  </div>
</template>

<script>
  import { storePrediction } from '@/api/apipredictions'
  const moment = require('moment')

  export default {
    name: 'betslip',
    props: ['betslipData'],
    data() {
      return {
        bet_amount: 0,
        active: false,
        result: undefined
      };
    },
    computed: {
      canStoreResult() {
        // Check if all bets in betslip are finished already and reporter can set a result
        let store_result = true;
        this.betslipData.forEach(function(bet) {
          console.log(bet)
          if (moment(bet.date).isAfter()) { // is bet finished. TODO check for cheats here
            store_result = false;
          }
        });

        return store_result;
      },
      odds() {
        let odds = 1;
        this.betslipData.forEach(function(bet) {
          console.log(bet)
          odds *= bet.selected_odds
        });

        return odds.toFixed(2)
      },
      profit() {
        return (this.odds * this.bet_amount - this.bet_amount).toFixed(2);
      }
    },
    methods: {
      handleDelete(index, row) {
        this.betslipData.splice(index, 1);

        if (!this.betslipData.length) {
          this.active = false;
        }
      },
      store() {
        console.log(this.$store.state.user.id);
        let data = {
          date: Math.round(new Date() / 1000),
          final_odds: this.odds,
          selected_events: this.betslipData,
          stake: this.bet_amount,
          status: this.canStoreResult ? (this.result === 'true' ? 'WON' : 'LOST') : 'PENDING',
          user_id: this.$store.state.user.id
        }

        // TODO: set date of prediction to a date of last event in betslip
        console.log('store bets')
        console.log(data)
        storePrediction(data).then(response => {
          console.log(response)
          console.log('stored')
          this.active = false;
          this.$notify({
            title: 'Success!',
            message: 'You have successfully stored your betslip',
            type: 'success',
            duration: 2000
          })
          this.$emit('stored', response);
        }).catch(error => {
          console.log('error')
          console.log(error)
        })
      }
    },
    watch: {
      betslipData: {
        handler(val) {
          console.log('bets added')
          console.log(val)
        },
        deep: true
      }
    }
  };
</script>

<style scoped>
  .bold {
    font-weight: bold;
  }
</style>
