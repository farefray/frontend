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
          <el-input-number v-model="betslipObj.bet_amount" :min="0" :step="50" @change="update"></el-input-number>
      </el-col>
    </el-row>
    <br />
    <el-row :gutter="10">
      <el-col :span="10">
        Final odds: {{this.betslipObj.odds}}
      </el-col>
      <el-col :span="10">
        Profit: {{this.betslipObj.profit}}
      </el-col>
    </el-row>
    <el-row :gutter="10" v-if="betslipObj.valid">
      <el-col :span="10">
        Bet result:
      </el-col>
      <el-col :span="10">
        <el-switch
          v-model="betslipObj.result"
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
        <el-button type="primary" @click="storeBetslip">Store</el-button>
      </el-col>
    </el-row>
  </el-popover>
    <el-badge :value="betslipData.length" class="item" v-if="betslipData.length > 0">
      <el-button v-popover:popover1 :disabled="betslipData.length === 0" @click="active=true">Show betslip</el-button>
    </el-badge>
  </div>
</template>

<script>  
  // const moment = require('moment')
  import BetSlip from '../helpers/betslip';

  export default {
    name: 'betslip',
    props: ['betslipData'],
    data() {
      return {
        betslipObj: new BetSlip(),
        active: false
      };
    },    
    methods: {
      handleDelete(index, row) {
        this.betslipData.splice(index, 1);

        if (!this.betslipData.length) {
          this.active = false;
        }

        this.update(this.betslipData);
      },
      storeBetslip() {
        this.$emit('storeBetslip', this.betslipObj.data)
        this.active = false;
      },
      update(data = this.betslipData) {
        this.betslipObj = new BetSlip(data, this.$store.state.user.id);
      }
    },
    watch: {
      betslipData: {
        handler(val) {
          console.log('bets added')
          console.log(val)
          this.update(val);
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
