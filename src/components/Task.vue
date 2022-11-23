<template>
  <div ref="inboxContainer" class="inbox-container">
    <div class="inbox-header-container">
      <div style="width: 100%">
        <Popper :show="showTaskFilter" offsetSkid="25" locked>
            <button 
                  @click="showTaskFilter = true"
                  @focusout="showTaskFilter = false"
                  class="filter-task-button" >
                <span 
                    style="margin-top: 10px; margin-left: 14px; color: #4F4F4F; font-weight: 600"
                    class="text-lg"
                    >
                    My Tasks
                </span>
                <svg style="margin-top: 17px; margin-left: 12px; margin-right: 19px; margin-bottom: 17px;" width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.59795 0.912477L5.77295 4.72914L1.94795 0.912476L0.772949 2.08748L5.77295 7.08748L10.7729 2.08748L9.59795 0.912477Z" fill="#4F4F4F"/>
                </svg>
            </button>
            <template #content>
                <div class="popper-container text-lg">
                    <p 
                        @click="taskFilter = 'personal errands'; showTaskFilter = false; refreshTaskData()"
                        class="text-lg weight-bold popper-text">
                        Personal Errands
                    </p>
                    <hr>
                    <p 
                        @click="taskFilter = 'urgent to-do'; showTaskFilter = false; refreshTaskData()"
                        class="text-lg weight-bold popper-text">
                        Urgent To-Do
                    </p>
                </div>
            </template>
        </Popper>

        <button
            class="new-task-button color-white text-lg "
            @click="addTask()"
            >
            New Task
        </button>
      </div>

      <div v-if="taskIsLoading" style="display: flex; align-items: center; justify-content: center">
        <div style="text-align: center  ">
          <img class="loading-image rotating" width="85.41" height="85.41" src="../assets/img/loading-spinner.png"> 
          <p class="text-lg weight-bold color-gray-2">
            Loading Task List ...
          </p>
        </div>
      </div>

      <div v-else style="max-height: 606px; overflow-y:auto; margin-top: 24px; overflow-x: hidden">
        <div v-for="(task,i) in taskData" :key="i">
            <TaskItem 
              v-if="task.title"
              @deleteTask="deleteTask"
              :task="task" 
              :style="{
                'margin-top': i == 0 ? '0px' : '24px',
                'margin-bottom': i == (taskData.length-1) ? '0px' : '24px'
              }"/>
            <hr v-if="i != (taskData.length-1)">
        </div>

        <div class="new-task" v-if="newTask">
          <hr  ref="newTask" style="margin-top: 24px; margin-bottom: 14px;">

          <NewTask @insertTask="insertTask"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Popper from "vue3-popper";
import TaskItem from '@/components/TaskItem.vue'
import NewTask from '@/components/NewTask.vue'
import axios from 'axios'
import { nextTick } from "vue"

export default {
  name: 'Task',
  components: {
    Popper,
    TaskItem,
    NewTask
  },
  computed:{
    currentUser(){
        return this.$store.state.currentUser;
    },
    searchMaxWidth(){
      return this.$refs.inboxContainer.style.width;
    },
    posts(){
      return this.$store.state.posts;
    },
    todos(){
      return this.$store.state.todos;
    }
  },
  data(){
    return{
      showTaskFilter: false,
      taskFilter: "personal errands",
      searchMessage: "",
      taskIsLoading: true,
      pickedHeader: null,
      taskSelect: "all",
      taskData:[],
      
      newTask: false,
    }
  },
  watch:{
  },
  methods:{
    refreshTaskData(){
      const vm = this;
      vm.taskIsLoading = true;
      let pureData = vm.todos;

      pureData.forEach(data => {
        data.tags = [];
        switch(data.id%3){
          case 0:
              data.dueDateFormatted = "12/12/2022";
              data.dueDate = "2022-12-12";
              break;
          case 1:
              data.dueDateFormatted = "14/12/2022";
              data.dueDate = "2022-12-14";
              break;
          case 2:
              data.dueDateFormatted = "22/12/2022";
              data.dueDate = "2022-12-22";
              data.description = "";
              break;
          case 3:
              data.dueDateFormatted = "09/12/2022";
              data.dueDate = "2022-12-09";
              break;
          default:    
              data.dueDateFormatted = "22/12/2022";
              data.dueDate = "2022-12-22";
              break;
        }
      })

      if(vm.taskFilter == "urgent to-do"){
        pureData = pureData.sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate));
      }
      else{
        pureData = pureData.sort((a,b) => a.id - b.id);
      }

      vm.taskData = pureData;
      
      setTimeout(() => {
        vm.taskIsLoading = false;
      }, 500)
    },

    async getTodos(){
      const vm = this;
      //await vm.$store.commit('getTodosByUserId', vm.currentUser.id);

      await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${vm.currentUser.id}`)
      .then((response) => {
        vm.$store.state.todos = response.data
      })
      .catch(err => {
        console.log(err)
        console.log("API get re-attempt");
        vm.getTodos();
      })

      console.log("done, state todos =", vm.todos)
      vm.refreshTaskData();
    },

    formatDate(dateString){
      let d = new Date(dateString);
      let dateFormatted = ("0" + d.getDate()).slice(-2) + "/" + ("0"+(d.getMonth()+1)).slice(-2) + "/" +
      d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);

      return dateFormatted;
    },

    headerClicked(header){
      this.pickedHeader = header;
    },

    backToHeader(){
      this.pickedHeader = null;
    },

    deleteTask(task){
      const vm = this;
      vm.taskIsLoading = true;
      let index = null;
      vm.taskData.forEach((data,i) => {
        if(data.id == task.id){
          index = i;
        }
      })
      vm.taskData.splice(index.toString(), 1);
      setTimeout(() => {
        vm.taskIsLoading = false;
      }, 300)
    },

    insertTask(task){
      const vm = this;
      console.log("inserttask, task=",task)
      task.id = vm.taskData.length+99;
      vm.taskData.push(JSON.parse(JSON.stringify(task)));
    },

    async addTask(){
      const vm = this;
      vm.newTask = true;

      await nextTick();

      this.$refs.newTask.scrollIntoView();
    }
  },
  beforeMount(){
    const vm = this;
    vm.getTodos();
  }
}
</script>

<style scoped>
  @keyframes rotating {
    from {
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  .rotating {
    -webkit-animation: rotating 1s linear infinite;
    -moz-animation: rotating 1s linear infinite;
    -ms-animation: rotating 1s linear infinite;
    -o-animation: rotating 1s linear infinite;
    animation: rotating 1s linear infinite;
  }

  .loading-image{
    margin-top: 255px;
  }

  .inbox-container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .task-select{
    height: 40px;
    border-radius: 5px;
    border: solid 1px #828282;
    color: #4F4F4F;
    font-size: 14px;
    padding-left: 14px;
    max-width: 608px;
    font-weight: 600;
    margin-left: 84.23px;
    appearance: none;
    cursor:pointer;
  }

    .search-icon{
      position: absolute;
      top: 36px;
      right: 92.82px;
    }

    .inbox-header-container{
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      margin-top: 24px;
      margin-bottom: 24px;
      margin-left: 32px;
      margin-right: 32px;
    }
    
    .filter-task-button{
        background: #FFFFFF;
        border: solid 1px #828282;
        margin-left: 82.23px;
        height: 40px;
        border-radius: 5px;
        display: flex;
        padding: 0px;
        cursor: pointer;
    }

    .popper-container{
        background-color: #FFFFFF;
        border: solid 1px #828282;;
        border-radius: 5px;
        width: 288px;
        margin-left: 35px;
        cursor: pointer;
    }

    .popper-text{
        margin-left: 18.5px; 
        margin-top: 14.5px; 
        margin-bottom: 11px; 
        text-align: left;
        font-weight: 700;
        color: #4F4F4F;
    }

    .new-task-button{
        padding-left: 16px;
        padding-top: 14px;
        padding-right: 16px;
        padding-bottom: 14px;
        background-color: #2F80ED;
        border-radius: 5px;
        margin-left: 13px;
        border: none;
        float: right;
        font-weight: 600;
        cursor: pointer;
    }

    .datepicker-toggle {
        display: inline-block;
        position: relative;
        width: 18px;
        height: 19px;
        margin-right: 14.5px;
    }
    .datepicker-toggle-button {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-image: url('../assets/icon/action/calendar_today_24px.svg');
        background-repeat: no-repeat;
    }

    .datepicker-input {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
        box-sizing: border-box;
    }
    .datepicker-input::-webkit-calendar-picker-indicator {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        cursor: pointer;
    }

    .datepicker-input-text{
        border:none !important;
        width: 100px;
        margin-left: 14.5px;
        flex-grow: 1;
    }

    .datepicker-input-text :focus :checked{
        border:solid 1px red !important;
    }

    .date-container{
        height: 40px;
        border-radius: 5px;
        margin-left: 20px;
        border: solid 1px #828282;
        display: flex;
        align-items: center;
        width: 193px;
    }

    .task-item-container{
        margin-left: 0px;
        margin-right: 0px;
        display: flex;
    }

    .task-item-content{
        display: flex;
        flex-direction: column;
        margin-left: 22.5px;
        margin-right: 15.32px;
        flex-grow: 1;
    }

    .task-item-header{
        display:flex;
    }

    .task-title{
        flex-grow: 1;
    }

    .task-warning{
        float:right;
        color: #EB5757;
        white-space: nowrap;
        margin-left: 54px;
        margin-right: 19.75px;
    }
    
    .task-due-date{
        float:right;
        white-space: nowrap;
    }

    .task-item-action{
        display: flex;
    }

    .collapsed{
        height:0;
        transition: 0.5s;
    }

    .expanded{
        height: fit-content;
        transition: 0.5s;
    }

    .category {
        margin-top:12px;
        animation: expand 0.5s;
    }

    .content{
        padding-top:20px;
        padding-bottom: 20px;
    }

    @keyframes expand {
        from {
            opacity: 0;
        }
        to {
            height: fit-content;
            opacity: 1;
        }
    }

    /* TRANSITION */
    /* always present */
    .expand-transition {
        transition: all 0s ease;
    }
    /* .expand-enter defines the starting state for entering */
    /* .expand-leave defines the ending state for leaving */
    .expand-leave-active {
        animation: expand 0s reverse;
    }

    .expand-enter-active{
        animation: expand 0.5s;
    }

    .task-item-date{
        display: flex;
        align-items: center;
        margin-bottom: 16px; 
    }

    .task-item-description{
        display: flex;
    }

    .task-description{
        margin-left: 23px;
        margin-top: 0;
        margin-bottom: 0;
        width: 100%;
    }

    .description-text-area{
        width:100%;
        margin-left: 23px;
        margin-top: 0;
        margin-bottom: 0;
        border: solid 1px #E0E0E0;
        border-radius: 5px;
        font-family: 'Lato', sans-serif;
        padding: 5px;
        flex-grow: 1;
    }

    .task-date{
        height: 40px;
        border-radius: 5px;
        padding-left: 14.5px;
        padding-right: 14.5px;
        margin-left: 20px;
        border: solid 1px #828282;
    }
</style>
