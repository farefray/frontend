<template>
  <sticky v-if="betslipData.length">
    <el-card class="box-card betslip">
      <div slot="header" class="clearfix">
          <h3>Betslip <el-badge :value="betslipData.length" class="item"/> </h3>
      </div>
      <div class="widget-content in collapse" style="height: auto;">
          <div class="widget-body">
            <template v-for="(prediction, index) in betslipData">
              <div class="statistic-group" v-bind:key="index">
                <el-tag type="game-tag">{{prediction.game}}</el-tag>
                <h3 class="statistic-values">
                  <span v-bind:class="{ winner: prediction.selected_event === 'odds_1' }">
                  {{prediction.team_A.name}}
                  </span>
                  vs
                  <span v-bind:class="{ winner: prediction.selected_event === 'odds_2' }">
                    {{prediction.team_B.name}}
                  </span>
                  <br/>
                  <el-switch v-model="prediction.live" active-text="[Live bet]" inactive-text="[Default bet]" active-color="#476b3b" inactive-color="#909092"></el-switch>
                </h3>
                <a @click="handleDelete(index, prediction)" class='icon-remove'>
                  <svg-icon icon-class="cross" style='cursor:pointer;' w="12px" close-transition/>
                </a>
                <hr class="margin-mm">
                  <el-row style="padding: 5px 0;">
                    <el-col :span="10" :offset="1">
                    <div v-if="prediction.selected_event === 'odds_1'">
                      <el-input-number size="mini" controls-position="right"
                        v-model="prediction.selected_odds" :min="1" :max="10" :step="0.05" @change="updateBetSlip"></el-input-number>
                    </div>
                    <div v-if="prediction.selected_event === 'odds_2'">
                      Odds:
                      <el-input-number size="mini" controls-position="right"
                        v-model="prediction.selected_odds" :min="1" :max="10" :step="0.05" @change="updateBetSlip"></el-input-number>
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

                </div>
              </div>
            </template>
            <br />
            <div class="well well-nice well-small">
              <div class="well well-nice well-impressed margin-0m">
                  <el-row>
                    <el-col :span="12">
                      <h5 class="simple-header">Bet info:</h5>
                    </el-col>
                    <el-col :span="12">
                      <el-switch
                          v-model="betslipResult"
                          activeColor="#13ce66"
                          inactiveColor="#ff4949"
                          activeText="Won"
                          activeValue="true"
                          inactiveText="Lost"
                          inactiveValue="false"
                          @change="updateBetResult"
                          v-if="betslipObj.isValid()"
                          style="float:right;">
                      </el-switch>
                      <el-tag style="float:right;" v-else>Pending</el-tag>
                    </el-col>
                  </el-row>
                  <div>
                    <el-row :gutter="0">
                        <el-col :span="10">
                            Stake:
                        </el-col>
                        <el-col :span="10">
                            <el-input-number v-model="bet_amount" :min="0" :step="1" @change="updateBetAmount"></el-input-number>
                        </el-col>
                    </el-row>
                    <br/>
                    <el-row>
                      <el-col>
                        <el-col :span="12">
                            <el-select
                                v-model="categories"
                                multiple
                                filterable
                                allow-create
                                placeholder="Choose tags for your bet"
                                @change="updateCategories">
                                <el-option
                                    v-for="item in default_tags"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                      </el-col>
                    </el-row>
                  </div>
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
              <el-button type="primary" size="medium" @click="storeBetslip">Store»</el-button>
            </el-col>
          </el-row>
          <br/>
          </div>
          <div class="widget-footer box-shadow-in">
          </div>
      </div>
    </el-card>
  </sticky>
</template>

<comment>

</comment>
<script>
import Sticky from '@/components/Sticky'
import BetSlip from "../helpers/betslip";

export default {
  name: "betslip",
  props: ["betslipData"],
  components: {
    Sticky
  },
  data() {
    return {
      betslipObj: new BetSlip(),
      betslipResult: false,
      bet_amount: 0, // actually not used, but v-model is required somehow :)
      categories: [], // actually not used, but v-model is required somehow :)
      default_tags: [{
        value: 'Parimatch',
        label: 'Parimatch'
      }, {
        value: 'Pinnacle',
        label: 'Pinnacle'
      }] // ToDo
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
        this.betslipObj.update();
      }
    },
    storeBetslip() {
      this.betslipObj.storeInDB().then(result => {
        console.log('storeBetSlip inside promise');
        console.log(result);
        this.$emit("stored");
      })
    },
    updateBetResult(val) {
      console.log("bet result:" + val);
      this.betslipResult = val;
      this.betslipObj.result = val;
      this.betslipObj.update();
    },
    updateCategories(val) {
      console.log(val);
      console.log(this.categories);
      this.betslipObj.categories = val;
      this.betslipObj.update();
    },
    updateBetAmount(val) {
      console.log("updateBetAmount:" + val);
      this.betslipObj.bet_amount = val;
      this.betslipObj.update();
    },
    updateBetSlip() {
      this.betslipObj.update();
    }
  },
  watch: {
    betslipData: {
      handler(val) {
        console.log("bets added");
        this.betslipResult = (this.betslipObj.result === true ? 'true' : 'false'); // TODO URGENTLY remove those hacks with switches for bet results
        this.betslipObj.bet_amount = this.bet_amount;
        this.betslipObj.user_id = this.$store.state.user.id;
        this.betslipObj.selectEvents(val);
        console.log('watcher for data has finished');
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
  position: relative;
}
.statistic-values {
  text-align: center;
  color: #909092;
}
.btn-toolbar {
  .txt-r {
    position: absolute;
    top: 7px;
    right: 15px;
  }
}

.icon-remove {
  position: absolute;
  right: 10px;
  top: 6px;
}

.el-tag--game-tag {
  color: #f5f6f9;
  background-color: #c5c6ca;
  text-shadow: none;
  position: absolute;
  left: 10px;
  top: 6px;
  font-weight: bold;
}

.help-block {
  font-weight: bold;
}

.el-select {
  .el-input {
    input {
      background-color: #ffffff;
    }
  }

  input[type="text"] {
    border: none;
    box-shadow: none;
  }
}
</style>
