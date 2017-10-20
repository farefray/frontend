<template>
  <div>
  <el-popover
    ref="popover4"
    placement="right"
    width="500"
    trigger="click">
    <el-table :data="betslipData">
        <el-table-column width="100" label="Date" prop="date" column-key="date">
          <template scope="scope">
            {{(scope.row.date) | moment("DD.MM kk:mm")}}
        </template>
        </el-table-column>
        <el-table-column width="150" label="Participant">
          <template scope="scope">
            {{scope.row.team_A.name}}
          </template>
        </el-table-column>
        <el-table-column width="150" label="Participant">
          <template scope="scope">
            {{scope.row.team_B.name}}
          </template>
        </el-table-column>
    </el-table>
    <br />
    <el-row :gutter="10">
      <el-col>
          <el-input-number v-model="bet_amount" :min="0" :step="50"></el-input-number>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="4">
        Final odds: {{this.odds}}
      </el-col>
      <el-col :span="4">
        Profit: {{this.profit}}
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col>
        <el-button type="primary" @click="store">Store</el-button>
      </el-col>
    </el-row>
  </el-popover>
  <el-button v-popover:popover4 :disabled="betslipData.length === 0">Show betslip</el-button>
  </div>
</template>

<script>
  export default {
    name: 'betslip',
    props: ['betslipData'],
    data() {
      return {
        bet_amount: 0
      };
    },
    computed: {
      odds() {
        let odds = 1;
        this.betslipData.forEach(function(bet) {
          odds *= bet.selected_odds
        });

        return odds
      },
      profit() {
        return this.odds * this.bet_amount - this.bet_amount;
      }
    },
    methods: {
      store() {
        console.log(this.betslipData)
        console.log('store bets')
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
</style>
