<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="10">
                Bet result:
            </el-col>
            <el-col :span="10">
                <el-switch
                    v-model="result"
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
        <el-row :gutter="10">
            <el-col>
                Stake:
            </el-col>
            <el-col>
                <el-input-number v-model="bet_amount" :min="0" :step="50" @change="updateBetAmount"></el-input-number>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
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
        </el-row>
    </div>
</template>

<script>  
  export default {
    name: 'betslipParams',
    props: [],
    data() {
      return {
        result: false,
        bet_amount: 0,
        categories: [],
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
      updateBetAmount(val) {
        this.$emit('updateBetAmount', val)
      },
      updateBetResult(val) {
        this.$emit('updateBetResult', val);
      },
      updateCategories(val) {
        this.$emit('updateCategories', val);
      }
    }
  };
</script>