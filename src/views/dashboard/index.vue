<template>
  <div class="dashboard-container">
    <component :is="currentRole"></component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin/index'
import editorDashboard from './editor/index'
import guestDashboard from './guest/index'

export default {
  name: 'dashboard',
  components: { adminDashboard, editorDashboard, guestDashboard },
  data() {
    return {
      currentRole: 'guestDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (this.roles) {
        if (this.roles.indexOf('admin') >= 0) {
            this.currentRole = 'adminDashboard'
        } else if (this.roles.indexOf('editor') >= 0) {
            this.currentRole = 'editorDashboard'
        }
    }
  }
}
</script>
