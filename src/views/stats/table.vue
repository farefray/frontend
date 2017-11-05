<template>
  <div class="components-container" style='height:100vh'>

    <el-table :data="predictions" @filter-change="onFilterChange"
              v-loading="listLoading" element-loading-text="Loading..." border fit
              style="width: 100%">

      <el-table-column width="150" align="center" label="DATE (UTC)" prop="date" column-key="date" sortable>
        <template scope="scope">
          <span><strong>{{(scope.row.date) | moment("DD.MM kk:mm")}}</strong></span><br/>
          <span>({{(scope.row.date) | moment("from")}})</span>
        </template>
      </el-table-column>

      <el-table-column min-width="80px" max-width="150px" label="Event" prop="game" column-key="game"
                       :filters="[
                          { text: 'Dota 2', value: 'Dota 2' },
                          { text: 'LoL', value: 'LoL' },
                          { text: 'Overwatch', value: 'Overwatch' },
                          { text: 'Counter-Strike', value: 'Counter-Strike' }
                       ]"
                       :filter-method="filterGameType"
                       filter-placement="bottom-end">
        <template scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.game_league}}</span>
          <img :src="logos[scope.row.game]" width="32px" close-transition>
        </template>
      </el-table-column>

      <el-table-column width="210px" align="center" label="Participant">
        <template scope="scope">
          <span><img :src="getFlagUrl(scope.row.team_A.flag)" width="32px"></span>
          <span>{{scope.row.team_A.name}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="Chance">
        <template scope="scope">
          <el-tag :type="scope.row.odds_1 | oddsFilter">{{scope.row.percent_odds_1}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column width="210px" align="center" label="Participant">
        <template scope="scope">
          <span> <img :src="getFlagUrl(scope.row.team_B.flag)" width="32px"></span>
          <span>{{scope.row.team_B.name}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="Chance">
        <template scope="scope">
          <el-tag :type="scope.row.odds_2 | oddsFilter">{{scope.row.percent_odds_2}}</el-tag>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  import { getPredictions } from '@/api/apipredictions'

  export default {
    components: {},
    data() {
      return {
        listLoading: true,
        predictions: null
      }
    },
    mounted() {
      this.$nextTick(() => {
        getPredictions()
          .then(response => {
            this.predictions = response.data
            console.log(response.data)
            this.listLoading = false
          });
      })
    },
    methods: {
      onFilterChange(filters) {
        console.log(filters)
        // Apply filter to query and re-ask backend
      },
      filterGameType(value, row) {
        return row.game === value;
      }
    }
  }
</script>

<style scoped>

</style>

