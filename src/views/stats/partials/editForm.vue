<template>
  <el-form class="small-space" :model="temp_event" label-position="top" label-width="120px"
           size="mini">

    <el-form-item label="Event details">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-autocomplete placeholder="Event type" v-model="temp_event.game"
                    autoComplete="on"
                    :fetch-suggestions="queryEventTypes"
                    @select="handleSelect"></el-autocomplete>
        </el-col>
        <el-col :span="14">
          <el-autocomplete placeholder="Event league" v-model="temp_event.game_league" :disabled="temp_event.game == ''"
                    :fetch-suggestions="queryEventLeagues"></el-autocomplete>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item label="Date">
      <el-date-picker v-model="temp_event.date" type="datetime" placeholder="Select date">
      </el-date-picker>
    </el-form-item>

    <el-form-item label="Result">
      <el-row :gutter="20">
        <el-col :span="11">
          <el-switch
            v-model="betResult"
            activeColor="#13ce66"
            inactiveColor="#ff4949"
            activeText="Won"
            activeValue="true"
            inactiveText="Lost"
            inactiveValue="false"
            @change="updateBetResult">                          
            </el-switch>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item>
      <el-button class="btn" @click="cancel()">Cancel</el-button>
      <el-button class="btn btn-success" @click="update()">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<comments> 
todo make this share functionality with betslip.vue/betslip.js
</comments>

<script>
  export default {
    components: {},
    name: 'eventForm',
    props: ['temp_event', 'dialogStatus'],
    data() {
      return {
        betResult: false,
        event_types: [
          { "value": "Dota 2", "data": "dota_2" },
          { "value": "CS:GO", "data": "cs_go" },
          { "value": "Starcraft 2", "data": "sc2" }
        ] // TODO
      };
    },
    mounted() {
      console.log('mounted')
      console.log(this.temp_event);
      this.betResult = this.temp_event.status === 'WON'; // TODO better way
    },
    methods: {
      updateBetResult(val) {
        this.temp_event.status = (val === 'true' ? 'WON' : 'LOST');
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
          console.log(this.temp_event);
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
