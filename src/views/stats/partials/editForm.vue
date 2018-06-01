<template>
  <el-form class="small-space" :model="temp_event" label-position="top" label-width="120px"
           size="mini">

    <el-form-item label="Date">
      <el-date-picker v-model="betDateTime" type="datetime" placeholder="Select date">
      </el-date-picker>
    </el-form-item>

    <el-form-item label="Odds">
      <el-row justify="center">
        <el-input-number v-model="temp_event.final_odds" :min="1" :max="10" :step="0.05"></el-input-number>
      </el-row>
    </el-form-item>

    <el-form-item label="Stake">
      <el-row justify="center">
        <el-input-number v-model="temp_event.stake"></el-input-number>
      </el-row>
    </el-form-item>

    <el-form-item label="Result">
      <el-row :gutter="20">
        <el-col :span="11">
          <el-switch
            v-model="predictionResult"
            activeColor="#13ce66"
            inactiveColor="#ff4949"
            activeText="Won"
            inactiveText="Lost"
            @change="betResultChange">                          
            </el-switch>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item>
      <el-button type="warning" @click="cancel()">Cancel</el-button>
      <el-button type="success" @click="update()">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<comments> 
todo switches with 3 states(won/lost/pending)
</comments>

<script>
  const moment = require('moment');
  export default {
    components: {},
    name: 'editForm',
    props: ['temp_event', 'dialogStatus'],
    data() {
      return {
        predictionResult: false,
        betDateTime: new Date().getTime(),
        event_types: [
          { "value": "Dota 2", "data": "dota_2" },
          { "value": "CS:GO", "data": "cs_go" },
          { "value": "Starcraft 2", "data": "sc2" }
        ] // TODO
      };
    },
    watch: {
      temp_event: {
        handler(event) {
          // should be actually made by computed value
          console.log(event.date)
          console.log('watch');
          // TODO .date
          console.log(moment(event.date).valueOf());
          this.predictionResult = event.result;
          this.betDateTime = moment(event.date * 1000).valueOf() // todo get rid of * 1000
        },
        deep: true
      }
    },
    methods: {
      betResultChange(newValue) {
        this.predictionResult = newValue;
        this.temp_event.result = newValue;
      },
      queryEventLeagues(queryString, cb) {
        console.log(queryString)
        cb(['test event league']) // TODO
      },
      queryEventTypes(queryString, cb) {
        console.log(queryString) // autohelp?
        // call callback function to return suggestions
        cb(this.event_types);
      },
      handleSelect(item) {
        // TODO when even type selected, fill events to autocomplete
        console.log(item);
      },
      update() {
          console.log('update');
          console.log(this.temp_event);
          this.temp_event.date = parseInt(this.betDateTime / 1000);
          this.$emit('update', this.temp_event);
      },
      cancel() {
        this.$emit('close');
      }
    }
  };
</script>

<style>
.el-dialog {
  border-radius: 4px;
}

.el-dialog__header {
  color: #f1f1f1;
  padding: 5px 15px;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.8);
  background-color: #3b3e4a;
  background-image: -moz-linear-gradient(top, #464a56, #2b2d38);
  background-image: -webkit-gradient(
    linear,
    0 0,
    0 100%,
    from(#464a56),
    to(#2b2d38)
  );
  background-image: -webkit-linear-gradient(top, #464a56, #2b2d38);
  background-image: -o-linear-gradient(top, #464a56, #2b2d38);
  background-image: linear-gradient(to bottom, #464a56, #2b2d38);
  background-repeat: repeat-x;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff464a56', endColorstr='#ff2b2d38', GradientType=0);
  -webkit-border-radius: 4px 4px 0 0;
  -moz-border-radius: 4px 4px 0 0;
  border-radius: 4px 4px 0 0;
  border-bottom: 1px solid #eee;
}

.el-dialog__title {
  font-weight: bold;
  color: #f5f6f9;
  padding: 5px 15px;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.8);
  background-color: #3b3e4a;
  background-image: -moz-linear-gradient(top, #464a56, #2b2d38);
  background-image: -webkit-gradient(
    linear,
    0 0,
    0 100%,
    from(#464a56),
    to(#2b2d38)
  );
  background-image: -webkit-linear-gradient(top, #464a56, #2b2d38);
  background-image: -o-linear-gradient(top, #464a56, #2b2d38);
  background-image: linear-gradient(to bottom, #464a56, #2b2d38);
  background-repeat: repeat-x;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff464a56', endColorstr='#ff2b2d38', GradientType=0);
  -webkit-border-radius: 4px 4px 0 0;
  -moz-border-radius: 4px 4px 0 0;
  border-radius: 4px 4px 0 0;
}

.el-dialog__headerbtn {
  color: #ffffff;
  opacity: 0.6;
  filter: alpha(opacity=60);
  text-shadow: 0 -1px 0 #000000;
  margin-top: -7px;
  padding: 0;
  cursor: pointer;
  background: transparent;
  border: 0;
  -webkit-appearance: none;
  float: right;
  font-size: 20px;
  font-weight: bold;
  line-height: 20px;
}

.el-dialog__body {
  padding: 5px 15px;
}

.el-form-item--medium .el-form-item__content,
.el-form-item--medium .el-form-item__label {
  line-height: 16px;
}
</style>
