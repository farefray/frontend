<template>
  <div class="betslip widget widget-box widget-collapsible">
    <div class="widget-header clickable" data-toggle="collapse">
        <h4><small>Betslip</small> <el-badge :value="betslipData.length" class="item"/> </h4>
        
    </div>
    <div class="widget-content in collapse" style="height: auto;" v-if="betslipData.length > 0">
        <div class="widget-body">
          <template v-for="(prediction, index) in betslipData">
            <div class="statistic-group" v-bind:key="index">
              <h3 class="statistic-values">
                <span v-bind:class="{ winner: prediction.selected_event === 'odds_1' }">
                {{prediction.team_A.name}}
                </span>
                vs
                <span v-bind:class="{ winner: prediction.selected_event === 'odds_2' }">
                  {{prediction.team_B.name}}
                </span>
                <el-switch v-model="prediction.live"></el-switch>
              </h3>
              <div v-if="prediction.live">
                [Live bet]
              </div>
              <hr class="margin-mm">
                <el-row>
                  <el-col :span="10" :offset="1">
                  <div v-if="prediction.selected_event === 'odds_1'">
                    <el-input-number size="mini" controls-position="right"
                      v-model="prediction.selected_odds" :min="1" :max="10" :step="0.05"></el-input-number>
                  </div>
                  <div v-if="prediction.selected_event === 'odds_2'">
                    <el-input-number size="mini" controls-position="right"
                      v-model="prediction.selected_odds" :min="1" :max="10" :step="0.05"></el-input-number>
                  </div>
                  </el-col>
                  <el-col :span="10">
                     <el-autocomplete size="medium"
                        placeholder="Subbet" v-model="prediction.ex"
                        autoComplete="on"
                        :fetch-suggestions="queryEventEx"
                        @select="prediction.selected_odds = 1;"></el-autocomplete>  
                  </el-col>
                </el-row>
              <div class="info-block">
                <el-row :gutter="10">
                  <el-col>
                    <div v-if="prediction.team_A.ex">
                      ({{prediction.team_A.ex}})
                    </div>
                    <div v-if="prediction.team_B.ex">
                      ({{prediction.team_B.ex}})
                  </div>
                  </el-col>
                </el-row>
                <ul class="btn-toolbar toolbar-inline margin-00">
                  <li><a class="btn btn-small btn-yellow txt-r" @click="handleDelete(index, prediction)"><svg-icon icon-class="cross" style='cursor:pointer;' w="12px" close-transition/></a></li>
                </ul>
              </div>              
            </div>
          </template>
          <br />
          <div class="well well-nice well-small">
            <div class="well well-nice well-impressed margin-0m">
                <h5 class="simple-header">Bet info</h5>
                <betslipParams @updateBetAmount="updateBetAmount" @updateBetResult="updateBetResult" @updateCategories="updateCategories"></betslipParams>
            </div>
            <p class="help-block">
              <br />
              <el-row :gutter="10" v-if="this.betslipObj">
                <el-col :span="10">
                  Final odds: {{this.betslipObj.final_odds}}
                </el-col>
                <el-col :span="10">
                  Profit: {{this.betslipObj.profit}}
                </el-col>
              </el-row> 
            </p>
        </div>
        <el-row :gutter="12">
          <el-col :offset="18">
            <a class="btn btn-envato btn-large" href="javascript:void(0);" @click="storeBetslip">Store»</a>
          </el-col>
        </el-row>
        <br/>
        </div>
        <div class="widget-footer box-shadow-in">
        </div>
    </div>
  </div>
</template>

<comment>
 Todo betting details right inside betslip, betting .ex
</comment>
<script>
// const moment = require('moment')
import BetSlip from "../helpers/betslip";
import betslipParams from "../components/betslip_params.vue";

export default {
  name: "betslip",
  props: ["betslipData"],
  components: { betslipParams },
  data() {
    return {
      betslipObj: null
    };
  },
  methods: {
    queryEventEx(queryString, cb) {
      // TODO
      console.log(queryString);
      cb([
        { value: "Wins at least 1 map", data: "plus1" },
        { value: "Wins map 1", data: "map1" },
        { value: "Wins map 2", data: "map2" }
      ]);
    },
    handleDelete(index, row) {
      console.log("delete");
      this.betslipData.splice(index, 1);

      if (this.betslipData.length) {
        this.updateBetslip();
      }
    },
    storeBetslip() {
      this.$emit("storeBetslip", this.betslipObj.getData());
    },
    updateBetResult(val) {
      console.log("bet result:" + val);
      this.betslipObj.result = val;
      this.updateBetslip();
    },
    updateCategories(val) {
      console.log(val);
      this.betslipObj.categories = val;
      this.updateBetslip();
    },
    updateBetAmount(val) {
      console.log("updateBetAmount:" + val);
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
        console.log("bets added");
        console.log(val);

        this.betslipObj = new BetSlip(val, this.$store.state.user.id);
      },
      deep: true
    }
  }
};
</script>

<style lang="scss">
.winner {
  color: #f99008;
}
.betslip {
  margin: 0px 15px;
}
.statistic-group {
  border: 1px solid #c4c5c9;
}
.statistic-values {
  text-align: center;
  color: #909092;
}
.btn-toolbar {
  .btn {
    position: absolute;
    top: 3px;
    right: 15px;
  }
}
</style>
