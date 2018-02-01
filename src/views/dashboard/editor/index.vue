<template>
  <div class="dashboard-editor-container">
    <div class=" clearfix">
      <pan-thumb style="float: left" :image="avatar"> 你的权限:
        <span class="pan-info-roles" :key='item' v-for="item in roles">{{item}}</span>
      </pan-thumb>
      <github></github>
      <div class="info-container">
        <span class="display_name">{{name}}</span>
        <span style='font-size:20px;padding-top:20px;display:inline-block;'>dashboard</span>
      </div>
    </div>
    <div>
      <img class='emptyGif' :src="emptyGif">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
import Github from '@/components/Github'

export default {
  name: 'dashboard-editor',
  components: { PanThumb, Github },
  data() {
    return {
      emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
