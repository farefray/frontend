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

    <el-form-item label="Odds">
      <el-row justify="center">
        <el-col :span="8">
          <el-tooltip placement="top">
            <div slot="content">Click to select</div>
            <el-input-number v-bind:class="{ selected: selected=='odds_1' }" v-model="temp_event.odds_1" :min="1" :max="10" :step="0.05" @focus="onOddsFocused('odds_1')"></el-input-number>
          </el-tooltip>
        </el-col>
        <el-col :span="8">
          <el-tooltip placement="top">
            <div slot="content">Click to select</div>
            <el-input-number v-bind:class="{ selected: selected=='odds_draw' }" v-model="temp_event.odds_draw" :min="1" :max="10" :step="0.05" @focus="onOddsFocused('odds_draw')"></el-input-number>
          </el-tooltip>
        </el-col>
        <el-col :span="8">
          <el-tooltip placement="top">
            <div slot="content">Click to select</div>
            <el-input-number v-bind:class="{ selected: selected=='odds_2' }" v-model="temp_event.odds_2" :min="1" :max="10" :step="0.05" @focus="onOddsFocused('odds_2')"></el-input-number>
          </el-tooltip>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item label="Participants">
      <el-row :gutter="20">
        <el-col :span="11">
          <el-input v-bind:class="{ selected: selected=='odds_1' }"
                    placeholder="Participant A" v-model="temp_event.team_A.name"
                    @focus="onOddsFocused('odds_1')" v-if="temp_event.team_A"></el-input>
        </el-col>
        <el-col :span="11">
          <el-input v-bind:class="{ selected: selected=='odds_2' }"
                    placeholder="Participant B" v-model="temp_event.team_B.name"
                    @focus="onOddsFocused('odds_2')" v-if="temp_event.team_B"></el-input> <!-- TODO change another odds when first changed -->
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item label="Bet details" v-if="dialogStatus !== C.DIALOG_CREATE">
      <el-row :gutter="20">
        <el-col>
          <el-autocomplete placeholder="Bet details" v-model="ex"
                           autoComplete="on"
                           :fetch-suggestions="queryEventEx"
                           @select="handleExSelect"></el-autocomplete>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item label="Verified" v-if="dialogStatus == C.DIALOG_PREDICT">
      <el-switch v-model="temp_event.verified" disabled>
      </el-switch>
    </el-form-item>

    <el-form-item label="Live event" v-if="dialogStatus !== C.DIALOG_PREDICT">
      <el-switch v-model="temp_event.live">
      </el-switch>
    </el-form-item>

    <el-form-item>
      <el-button @click="cancel()">Cancel</el-button>
      <el-button v-if="dialogStatus==C.DIALOG_CREATE" type="primary" @click="submitForm(false)">List event</el-button>
      <el-button v-if="dialogStatus==C.DIALOG_UPDATE" @click="update">Update</el-button>
      <div v-else>
        <el-button type="default" @click="submitForm(true)" :disabled="temp_event[selected_event] == '1'">Add this event to bet slip</el-button>
        <el-button v-if="dialogStatus==C.DIALOG_STORE" type="primary"
           @click="submitForm(true, true)" :disabled="temp_event[selected_event] == '1' || selected === undefined">Store bet</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
  import { createCustomEvent } from '@/api/events'
  import Event from '../model/event.js'
  import C from '../constants.js'
  import ElInput from "../../../../node_modules/element-ui/packages/input/src/input.vue"; // ??
  const moment = require('moment') // Move global if used a lot?
  const _ = require('lodash'); // Move global if used a lot?

  export default {
    components: { ElInput },
    name: 'eventForm',
    props: ['temp_event', 'dialogStatus'],
    data() {
      return {
        event_types: [
          { "value": "Dota 2", "data": "dota_2" },
          { "value": "CS:GO", "data": "cs_go" },
          { "value": "Starcraft 2", "data": "sc2" }
        ], // TODO
        C: C,
        selected: undefined,
        selected_event: undefined,
        ex: undefined
      };
    },
    mounted() {
      console.log('mounted')
      console.log(this.dialogStatus);
    },
    computed: {
    },
    methods: {
      onOddsFocused(side) {
        console.log(side)
        if (this.dialogStatus !== C.DIALOG_CREATE) {
          // when creating new event, bet is in own dialog
          this.selected = side;
          this.selected_event = side; // ??
        }
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
      queryEventEx(queryString, cb) { // TODO
        console.log(queryString)
        cb([
          { "value": "Wins at least 1 map", "data": "plus1" },
          { "value": "Wins map 1", "data": "map1" },
          { "value": "Wins map 2", "data": "map2" }
        ]);
      },
      handleExSelect(item) {
        this.temp_event.odds_1 = 1;
        this.temp_event.odds_2 = 1;
      },
      handleSelect(item) {
        // TODO when even type selected, fill events to autocomplete
        console.log(item);
      },
      cancel() {
        this.selected_event = undefined
        this.selected = undefined
        this.$emit('close');
      },
      createEvent(cb) { // TODO
        let event = _.cloneDeep(this.temp_event)
        event._id = parseInt(Math.random() * 1000) + parseInt(Math.random() * 1000) // TODO
        event.author = 0 // TODO
        event.date = moment(this.temp_event.date).valueOf()

        console.log('create event')
        createCustomEvent(event).then(response => {
          console.log('create event - then')
          cb(response);
        })
      },
      submitForm(openBetslip, instantBet = false) {
        // 4 cases: 
        // create new event(1), 
        // add to bet slip event from list(2) or 
        // add to bet slip event which supposed to be created(3) or 
        // store bet instantly(4)
        const self = this;
        if (openBetslip) {
          if (self.dialogStatus === C.DIALOG_CREATE) {
            // Store prediction and add to bet slip (3)

            self.createEvent(function(event) {
              console.log('create event callback')
              self.$emit('close', false, event);
            });

            return true
          }

          // (2)
          // Todo check if time is still okay for prediction or we should store event?
          let event = new Event(self.temp_event)
          event.selected_odds = self.temp_event[self.selected_event]
          event.selected_event = self.selected_event

          // process .ex, as its set in one field, so we need to pass it to one team
          if (this.ex !== undefined) {
            // TODO refactoring
            switch (self.selected_event) {
              case 'odds_1': {
                event.team_A.ex = this.ex;
                break;
              }

              case 'odds_2': {
                event.team_B.ex = this.ex;
                break;
              }
            }
          }

          self.selected_event = undefined
          self.selected = undefined
          self.$emit('toBetSlip', event, instantBet);
          return true
        }

        // (1)
        this.createEvent(function() {
          self.$notify({
            title: 'Success',
            message: 'Success!',
            type: 'success',
            duration: 2000
          })

          self.$emit('close', true);
        });
      }
    },
    watch: {
    }
  };
</script>

<style scoped>
</style>
