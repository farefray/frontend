<template>
  <el-form class="small-space" :model="temp_event" label-position="top" label-width="120px"
           size="mini">

    <el-form-item label="Event details">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="Event type" v-model="temp_event.game"></el-input>
        </el-col>
        <el-col :span="14">
          <el-input placeholder="Event league" v-model="temp_event.game_league"></el-input>
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
            <el-input-number v-bind:class="{ selected: selected=='odds_1' }" v-model="temp_event.odds_1" :min="1" :max="10" :step="0.05" @focus="selected='odds_1'"></el-input-number>
          </el-tooltip>
        </el-col>
        <el-col :span="8">
          <el-tooltip placement="top">
            <div slot="content">Click to select</div>
            <el-input-number v-bind:class="{ selected: selected=='odds_draw' }" v-model="temp_event.odds_draw" :min="1" :max="10" :step="0.05" @focus="selected='odds_draw'"></el-input-number>
          </el-tooltip>
        </el-col>
        <el-col :span="8">
          <el-tooltip placement="top">
            <div slot="content">Click to select</div>
            <el-input-number v-bind:class="{ selected: selected=='odds_2' }" v-model="temp_event.odds_2" :min="1" :max="10" :step="0.05" @focus="selected='odds_2'"></el-input-number>
          </el-tooltip>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item label="Participants">
      <el-row :gutter="20">
        <el-col :span="11">
          <el-input v-bind:class="{ selected: selected=='odds_1' }" placeholder="Participant A" v-model="temp_event.team_A.name" @focus="selected='odds_1'" v-if="temp_event.team_A"></el-input>
        </el-col>
        <el-col :span="11">
          <el-input v-bind:class="{ selected: selected=='odds_2' }" placeholder="Participant B" v-model="temp_event.team_B.name" @focus="selected='odds_2'" v-if="temp_event.team_B"></el-input>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item label="Verified" v-if="dialogStatus ==C.DIALOG_PREDICT">
      <el-switch v-model="temp_event.verified" disabled>
      </el-switch>
    </el-form-item>

    <el-form-item>
      <el-button @click="cancel()">Cancel</el-button>
      <el-button v-if="dialogStatus==C.DIALOG_CREATE" type="primary" @click="create">Create</el-button>
      <el-button v-if="dialogStatus==C.DIALOG_UPDATE" @click="update">Update</el-button>
      <el-button v-else type="primary" @click="submitForm">Add to bet slip</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { createCustomEvent } from '@/api/events'
  import Event from '../model/event.js'
  import C from '../constants.js'
  const moment = require('moment')

  export default {
    name: 'betslip',
    props: ['temp_event', 'dialogStatus'],
    data() {
      return {
        C: C,
        selected: undefined,
        selected_event: undefined
      };
    },
    mounted() {
      console.log('mounted')
      console.log(this.temp_event);
    },
    computed: {
    },
    methods: {
      cancel() {
        this.selected_event = undefined
        this.selected = undefined
        this.$emit('cancel');
      },
      create() { // TODO
        let event = this.temp_event
        event._id = parseInt(Math.random() * 1000) + parseInt(Math.random() * 1000) // TODO
        event.author = 0 // TODO
        event.date = moment(this.temp_event.date).unix()

        const self = this;
        createCustomEvent(event).then(response => {
          self.dialogFormVisible = false

          console.log(response);
          self.$notify({
            title: 'Success',
            message: 'Success!',
            type: 'success',
            duration: 2000
          })
        })
      },
      submitForm() {
        // Store prediction
        // Todo check if time is still okay for prediction!
        let event = new Event(this.temp_event)
        event.selected_odds = this.temp_event[this.selected_event]
        event.selected_event = this.selected_event
        this.selected_event = undefined
        this.selected = undefined
        this.$emit('submitted', event);
      }
    },
    watch: {
      selected(value) {
        console.log(value);
        this.selected_event = value;
      }
    }
  };
</script>

<style scoped>
</style>
