<template>
  <el-form class="small-space" :model="temp_event" label-position="top" label-width="120px"
           size="mini" :loading="loading">

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

    <el-form-item>
      <el-button @click="cancel()">Cancel</el-button>
      <el-button type="primary" v-if="dialogStatus==C.DIALOG_CREATE" @click="submitForm(false)">List event</el-button>
      <el-button type="success" v-else @click="update">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { createCustomEvent } from '@/api/events'
  // import Event from '../model/event.js'
  import C from '../helpers/constants'
  import ElInput from "../../../../node_modules/element-ui/packages/input/src/input.vue"; // ??
  const moment = require('moment') // Move global if used a lot?
  const _ = require('lodash'); // Move global if used a lot?

  export default {
    components: { ElInput },
    name: 'eventForm',
    props: ['temp_event', 'dialogStatus'],
    data() {
      return {
        loading: false, // TODO
        event_types: [
          { "value": "Dota 2", "data": "dota_2" },
          { "value": "CS:GO", "data": "cs_go" },
          { "value": "Starcraft 2", "data": "sc2" }
        ], // TODO
        C: C,
        selected: undefined,
        selected_event: undefined
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
      handleSelect(item) {
        // TODO when even type selected, fill events to autocomplete
        console.log(item);
      },
      cancel() {
        this.selected_event = undefined
        this.selected = undefined
        this.$emit('close');
      },
      submitForm() {
        // creating new event which is custom for this person
        this.loading = true;

        let event = _.cloneDeep(this.temp_event)
        event._id = parseInt(Math.random() * 1000) + parseInt(Math.random() * 1000) // TODO
        event.author = 0 // TODO
        event.date = moment(this.temp_event.date).valueOf()

        createCustomEvent(event).then(response => {
          this.loading = false;
          
          if (response.message) {
            // Error message. Todo promist reject
            this.$message({
                message: response.message,
                type: 'error',
                duration: 5 * 1000
            })

            return;
          }

          console.log(response);
          console.log('create event - then')
          this.$emit('close', event);
        });

        return true
      }
    },
    watch: {
    }
  };
</script>

<style>
  
</style>
