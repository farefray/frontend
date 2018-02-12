<template>
  <div class="betslip widget widget-box widget-collapsible">
    <div class="widget-header clickable" data-toggle="collapse">
        <h4><small>Betslip</small> <el-badge :value="betslipData.length" class="item"/> </h4>
        
    </div>
    <div class="widget-content in collapse" style="height: auto;" v-if="betslipData.length > 0">
        <div class="widget-body">
          <el-table :data="betslipData">
              <el-table-column width="100" label="Date" prop="date" column-key="date">
                <template slot-scope="scope">
                  <div>
                  {{(scope.row.date) | moment("DD.MM kk:mm")}}
                  </div>
                  <div>
                    <el-autocomplete placeholder="Subbet" v-model="scope.row.ex"
                           autoComplete="on"
                           :fetch-suggestions="queryEventEx"
                           @select="scope.row.selected_odds = 1;"></el-autocomplete>
                  </div>
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

                  <div v-if="scope.row.selected_event === 'odds_1'">
                    <el-input-number size="mini" controls-position="right"
                      v-model="scope.row.selected_odds" :min="1.05" :max="10" :step="0.05"></el-input-number>
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

                  <div v-if="scope.row.selected_event === 'odds_2'">
                    <el-input-number size="mini" controls-position="right"
                      v-model="scope.row.selected_odds" :min="1.05" :max="10" :step="0.05"></el-input-number>
                  </div>

                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <div @click="handleDelete(scope.$index, scope.row)">
                  <svg-icon icon-class="cross" style='cursor:pointer;' w="12px" close-transition/>
                  </div>
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
        </div>
        <div class="widget-footer box-shadow-in">
          <a class="btn btn-envato" href="javascript:void(0);" @click="storeBetslip">Store»</a> 
        </div>
    </div>
  </div>
</template>

<comment>
 Todo betting details right inside betslip, betting .ex
</comment>
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
        betslipObj: null 
      };
    },    
    methods: {
      queryEventEx(queryString, cb) { // TODO
        console.log(queryString)
        cb([
          { "value": "Wins at least 1 map", "data": "plus1" },
          { "value": "Wins map 1", "data": "map1" },
          { "value": "Wins map 2", "data": "map2" }
        ]);
      },
      handleDelete(index, row) {
        console.log('delete');
        this.betslipData.splice(index, 1);

        if(this.betslipData.length) {
          this.updateBetslip();
        }
      },
      storeBetslip() {
        this.$emit('storeBetslip', this.betslipObj.getData())
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
  .betslip {
    margin: 0px 15px;
  }
</style>
