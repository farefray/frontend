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
    <br />
    <el-row :gutter="10">
      <el-col :span="10">
        Final odds: {{this.odds}}
      </el-col>
      <el-col :span="10">
        Profit: {{this.profit}}
      </el-col>
    </el-row>
    <br />
    <el-row :gutter="10">
      <el-col>
        <el-button type="primary" @click="store">Store</el-button>
      </el-col>
    </el-row>
  </el-popover>
  <el-button v-popover:popover1 :disabled="betslipData.length === 0">Show betslip</el-button>
  </div>
</template>

<script>
  import { storePrediction } from '@/api/apipredictions'

  export default {
    name: 'betslip',
    props: ['betslipData'],
    data() {
      return {
        bet_amount: 0,
        active: false
      };
    },
    computed: {
      odds() {
        let odds = 1;
        this.betslipData.forEach(function(bet) {
          console.log(bet)
          odds *= bet.selected_odds
        });

        return odds
      },
      profit() {
        return (this.odds * this.bet_amount - this.bet_amount).toFixed(2);
      }
    },
    methods: {
      store() {
        let data = {
          date: Date.now(),
          final_odds: this.odds,
          selected_events: this.betslipData,
          stake: this.bet_amount,
          status: 'PENDING', // TODO
          user_id: 0 // TODO
        }
        console.log('store bets')
        console.log(data)
        storePrediction(data).then(response => {
          console.log(response)
          console.log('stored')
          this.active = false
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
          if(val.length > 0) {
            this.active = true
          }
          
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
