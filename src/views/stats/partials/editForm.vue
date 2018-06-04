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

</style>
