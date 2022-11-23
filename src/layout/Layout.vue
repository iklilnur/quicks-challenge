<template>
  <div class="main-container">
    <Sidebar />
    
    <div class="main-panel">
        <SearchTopBar />
        
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from '@/components/Sidebar.vue'
import SearchTopBar from '@/components/SearchTopBar.vue'

export default {
  name: 'Layout',
  components: {
    Sidebar,
    SearchTopBar
  }
}
</script>

<style scoped>
    .main-container{
        height: 100vh;
        width: 100%;
        background-color:#333333;
        display: flex;
    }

    .main-panel{
        height: 100vh;
        flex-grow: 100;
    }
</style>
