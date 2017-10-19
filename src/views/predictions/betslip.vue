<template>
  <div>
  <el-popover
    ref="popover4"
    placement="right"
    width="400"
    trigger="click">
    <el-table :data="betslipData">
        <el-table-column width="100" label="date" prop="date" column-key="date">
          <template scope="scope">
            {{(scope.row.date) | moment("DD.MM kk:mm")}}
        </template>
        </el-table-column>
        <el-table-column width="100" label="name">
          <template scope="scope">
            {{scope.row.team_A.name}}
          </template>
        </el-table-column>
        <el-table-column width="100" label="name">
          <template scope="scope">
            {{scope.row.team_B.name}}
          </template>
        </el-table-column>
        <el-table-column width="100" label="amount">
          <template scope="scope">
            {{scope.row.bet_amount}}
          </template>
        </el-table-column>
    </el-table>
  </el-popover>
  <el-button v-popover:popover4 :disabled="betslipData.length === 0">Show betslip</el-button>
  </div>
</template>

<script>
  export default {
    name: 'betslip',
    props: ['betslipData'],
    data() {
      return {
      };
    },
    watch: {
      betslipData: {
        handler(val) {
          console.log('bets added')
          console.log(val)
        },
        deep: true
      }
    }
  };
</script>

<style scoped>
</style>
