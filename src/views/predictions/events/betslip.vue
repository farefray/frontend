<template>
  <div>
  <el-popover
    ref="popover"
    placement="left-end"
    width="500"
    v-model="active">
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
    <betslipParams @updateBetAmount="updateBetAmount" @updateBetResult="updateBetResult" @updateCategories="updateCategories"></betslipParams>
    <br />
    <el-row :gutter="10" v-if="this.betslipObj">
      <el-col :span="10">
        Final odds: {{this.betslipObj.final_odds}}
      </el-col>
      <el-col :span="10">
        Profit: {{this.betslipObj.profit}}
      </el-col>
    </el-row>    
    <br />
    <el-row :gutter="10">
      <el-col :offset="20">
        <el-button type="primary" @click="storeBetslip">Store</el-button>
      </el-col>
    </el-row>
  </el-popover>
    <el-button v-popover:popover :disabled="betslipData.length === 0" @click="active=true">Show betslip</el-button>
  
    <el-badge :value="betslipData.length" class="item" v-if="betslipData.length > 0">
      
    </el-badge>
  </div>
</template>

<script>  
  // const moment = require('moment')
  import BetSlip from '../helpers/betslip';
  import betslipParams from "../components/betslip_params.vue";

  export default {
    name: 'betslip',
    props: ['betslipData'],
    components: { betslipParams },
    data() {
      return {
        betslipObj: null,        
        active: false
      };
    },    
    methods: {
      handleDelete(index, row) {
        this.betslipData.splice(index, 1);

        if (!this.betslipData.length) {
          this.active = false;
        }

        this.updateBetslip();
      },
      storeBetslip() {
        this.$emit('storeBetslip', this.betslipObj.getData())
        this.active = false;
      },
      updateBetResult(val) {
        console.log('bet result:' + val)
        this.betslipObj.result = val;
        this.updateBetslip();
      },
      updateCategories(val) {
        console.log(val);
        this.betslipObj.categories = val;
        this.updateBetslip();
      },
      updateBetAmount(val) {
        console.log('bet amount:' + val)
        this.betslipObj.bet_amount = val;
        this.updateBetslip();
      },
      updateBetslip() {
        this.betslipObj.update();
      }
    },
    watch: {
      betslipData: {
        handler(val) {
          console.log('bets added')
          console.log(val)
          
          this.betslipObj = new BetSlip(val, this.$store.state.user.id);
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
