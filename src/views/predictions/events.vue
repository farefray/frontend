<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="Title" v-model="listQuery.title">
      </el-input>

      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">Search</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">Add</el-button>
    </div>

    <el-table :data="list" @sort-change="onSortChange" @filter-change="onFilterChange" v-loading="listLoading" element-loading-text="Loading..." border fit style="width: 100%">

      <el-table-column width="150" align="center" label="DATE (UTC)" prop="date" column-key="date" sortable>
        <template scope="scope">
          <span><strong>{{(scope.row.date * 1000) | moment("DD.MM kk:mm")}}</strong></span><br/>
          <span>({{(scope.row.date * 1000) | moment("from")}})</span>
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
          <el-tag close-transition>{{scope.row.game}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column width="210px" align="center" label="Participant">
        <template scope="scope">
          <span>{{scope.row.team_A.flag}}</span>
          <span>{{scope.row.team_A.name}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" v-if='showOdds' align="center" label="Chance">
        <template scope="scope">
          <span style='color:red;'>{{scope.row.odds_1 | oddsToChance}}</span>
        </template>
      </el-table-column>

      <el-table-column width="210px" align="center" label="Participant">
        <template scope="scope">
          <span>{{scope.row.team_B.flag}}</span>
          <span>{{scope.row.team_B.name}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" v-if='showOdds' align="center" label="Chance">
        <template scope="scope">
          <span style='color:red;'>{{scope.row.odds_2}}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="State" width="100">
        <template scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Operation">
        <template scope="scope">
          <el-button v-if="scope.row.status!='planned'" size="small" type="success" @click="handleModifyStatus(scope.row,'published')">发布
          </el-button>
          <el-button v-if="scope.row.status!='draft'" size="small" @click="handleModifyStatus(scope.row,'draft')">草稿
          </el-button>
          <el-button v-if="scope.row.status!='deleted'" size="small" type="danger" @click="handleModifyStatus(scope.row,'deleted')">删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-size="50" layout="total, prev, pager, next" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="State">
          <el-select class="filter-item" v-model="temp.status" placeholder="Please select">
            <el-option v-for="item in  statusOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Date">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Select date">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="Title">
          <el-input v-model="temp.title"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Take away</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create">Determine</el-button>
        <el-button v-else type="primary" @click="update">Determine</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchEventsList } from '@/api/events'
import waves from '@/directive/waves.js'// water ripples

export default {
  name: 'events_table',
  directives: {
    waves
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 50,
        title: undefined
      },
      temp: {
        id: undefined,
        timestamp: 0,
        title: ''
      },
      statusOptions: ['published', 'draft', 'deleted'],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      showOdds: true
    }
  },
  filters: {
    oddsToChance(odds) {
      return odds;
    },
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    onSortChange(sort) {
      console.log(sort)
      // Apply that sort to query and re-ask backend
    },
    onFilterChange(filters) {
      console.log(filters)
      // Apply filter to query and re-ask backend
    },
    filterGameType(value, row) {
      return row.game === value;
    },
    getList() {
      this.listLoading = true
      fetchEventsList(this.listQuery).then(response => {
        this.list = response.items
        this.total = response.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    timeFilter(time) {
      if (!time[0]) {
        this.listQuery.start = undefined
        this.listQuery.end = undefined
        return
      }
      this.listQuery.start = parseInt(+time[0] / 1000)
      this.listQuery.end = parseInt((+time[1] + 3600 * 1000 * 24) / 1000)
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: 'Success!',
        type: 'success'
      })
      row.status = status
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    handleDelete(row) {
      this.$notify({
        title: 'Success',
        message: 'Success!',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    create() {
      this.temp.id = parseInt(Math.random() * 100) + 1024
      this.temp.timestamp = +new Date()
      this.temp.author = 'Test'
      this.list.unshift(this.temp)
      this.dialogFormVisible = false
      this.$notify({
        title: 'Success',
        message: 'Success!',
        type: 'success',
        duration: 2000
      })
    },
    update() {
      this.temp.timestamp = +this.temp.timestamp
      for (const v of this.list) {
        if (v.id === this.temp.id) {
          const index = this.list.indexOf(v)
          this.list.splice(index, 1, this.temp)
          break
        }
      }
      this.dialogFormVisible = false
      this.$notify({
        title: 'Success!',
        message: 'Success',
        type: 'success',
        duration: 2000
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        timestamp: 0,
        title: ''
      }
    }
  }
}
</script>

<style>

</style>
