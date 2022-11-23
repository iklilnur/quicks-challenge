<template>
    <form ref="formNewTask" @submit.prevent="insertTask">
        <div 
            tabindex="0"
            @keydown.enter="submitForm()"
            style="display: flex; flex-direction: column">
            <div 
                class="task-item-container">
                
                <div class="checkbox">
                    <svg v-if="!newTask.completed" @click="newTask.completed = true" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 0H16C17.1 0 18 0.9 18 2V16C18 17.1 17.1 18 16 18H2C0.9 18 0 17.1 0 16V2C0 0.9 0.9 0 2 0ZM16 16V2H2V16H16Z" fill="#828282"/>
                    </svg>

                    <svg v-else @click="newTask.completed = true" width="18" height="18" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M24.5089 0.526306H3.38607C1.72642 0.526306 0.36853 1.8842 0.36853 3.54385V24.6667C0.36853 26.3263 1.72642 27.6842 3.38607 27.6842H24.5089C26.1685 27.6842 27.5264 26.3263 27.5264 24.6667V3.54385C27.5264 1.8842 26.1685 0.526306 24.5089 0.526306ZM24.5089 24.6667H3.38607V3.54385H24.5089V24.6667ZM20.8576 7.43649L22.985 9.57895L10.9148 21.6491L4.87975 15.6291L7.02221 13.5018L10.9148 17.3793L20.8576 7.43649Z" fill="#BDBDBD"/>
                    </svg>
                </div>

                <div class="task-item-content">
                    <div class="task-item-header">
                        <input 
                            class="new-task-title text-md color-gray-2 text-lg" 
                            v-model="newTask.title" 
                            placeholder="Type Task Title" required/>
                        <!--<span 
                            class="task-title weight-bold text-md"
                            :class="{
                                'color-gray-2': !newTask.completed,
                                'color-gray-3': newTask.completed
                            }">
                            {{ newTask.title }}
                        </span>-->
                    </div>

                    <div class="category" v-if="!itemCollapsed">
                        <div class="task-item-date">
                        <ScheduleIcon :width="scheduleIcon.width" :height="scheduleIcon.height" :iconColor="scheduleIcon.iconColor" />
                        <!--<input class="task-date" type="date"/>-->
                        <div class="date-container">
                            <input required class="datepicker-input-text text-lg" @change="checkDateFormatted" v-model="newTask.dueDateFormatted" type="text" placeholder="Set Date"/>
                            <span class="datepicker-toggle">
                            <span class="datepicker-toggle-button"></span>
                                <input v-model="newTask.dueDate" @change="datePicked" type="date" class="datepicker-input">
                            </span>
                        </div>
                        </div>
                        <div class="task-item-description">
                            <EditIcon :style="{ 'flex': descriptionIsEdit == true ? '' : '25px' }" :width="editIcon.width" :height="editIcon.height" :iconColor="editIcon.iconColor"/>
                            <span @click="editDescription()" v-if="!descriptionIsEdit && newTask.description" class="task-description color-gray-2 text-md">
                                {{ newTask.description }}
                            </span>
                            <span @click="editDescription()" v-else-if="!descriptionIsEdit" class="task-description color-gray-2 text-md">
                                No Description
                            </span>
                            <textarea 
                                v-show="descriptionIsEdit" 
                                id="task-description-new-task"
                                @focusout="updateDescription"  
                                class="description-text-area text-md"
                                v-model="newTask.description">
                            </textarea>
                        </div>
                    </div>
                </div>

                <div class="task-item-action">
                    <svg 
                        @click="showItem(true)"
                        v-if="itemCollapsed" style="margin-top:3px; margin-right: 20px; margin-left: 15.32px" width="10" height="10" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.59795 0.912477L5.77295 4.72914L1.94795 0.912476L0.772949 2.08748L5.77295 7.08748L10.7729 2.08748L9.59795 0.912477Z" fill="#4F4F4F"/>
                    </svg>

                    <svg 
                        @click="showItem(false)"
                        v-else style="margin-top:3px; margin-right: 20px; margin-left: 15.32px" width="10" height="10" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.175 7.08765L5 3.27098L8.825 7.08765L10 5.91265L5 0.912648L-1.02722e-07 5.91265L1.175 7.08765Z" fill="#4F4F4F"/>
                    </svg>
                    
                    <Popper :show="showDeletePopper" style="">
                        <div @focusout="showDeletePopper = false" class="popper-button" @click="showDeletePopper = true">
                            <svg style="margin-top:2px;" width="14" height="14" viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.00008 0.666672C1.26675 0.666672 0.666748 1.26667 0.666748 2.00001C0.666748 2.73334 1.26675 3.33334 2.00008 3.33334C2.73341 3.33334 3.33341 2.73334 3.33341 2.00001C3.33341 1.26667 2.73341 0.666672 2.00008 0.666672ZM10.0001 0.666672C9.26675 0.666672 8.66675 1.26667 8.66675 2.00001C8.66675 2.73334 9.26675 3.33334 10.0001 3.33334C10.7334 3.33334 11.3334 2.73334 11.3334 2.00001C11.3334 1.26667 10.7334 0.666672 10.0001 0.666672ZM4.66675 2.00001C4.66675 1.26667 5.26675 0.666672 6.00008 0.666672C6.73341 0.666672 7.33341 1.26667 7.33341 2.00001C7.33341 2.73334 6.73341 3.33334 6.00008 3.33334C5.26675 3.33334 4.66675 2.73334 4.66675 2.00001Z" fill="#4F4F4F"/>
                            </svg>
                        </div>
                        <template #content>
                            <div @click="deleteTask()" class="popper-container text-lg">
                                <span style="color: #EB5757;">Delete</span>
                            </div>
                        </template>
                    </Popper>
                </div>
            </div>

            <div>
                <Transition name="expand">
                    <div class="category" v-if="!itemCollapsed">
                        <div class="task-item-tag">
                            <Popper :show="showTagPopper" offsetDistance="-12">
                                <div style="margin-left:5px" @focusout="showTagPopper = false" class="popper-button" @click="showTagPopper = true">
                                    <BookmarkIcon 
                                        style="margin-top: 14px; margin-bottom: 14px;" 
                                        :width="bookmarkIcon.width" 
                                        :height="bookmarkIcon.height" 
                                        :iconColor="newTask.tags.length <= 0 ? 'rgb(130,130,130)' : '#2F80ED'"/>
                                </div>
                                <template #content>
                                    <div
                                        class="text-lg tag-popper-container">
                                        <p
                                            v-for="(tag, i) in tags"
                                            :key="i"
                                            class="color-gray-2 weight-bold tag-popper-text"
                                            style=" ;border-radius: 5px;"
                                            :style="{
                                                'background-color':tag.color,
                                                'margin-bottom': i == (tags.length-1) ? '0px' :'11px'    
                                            }"
                                            @click="newTask.tags.push(tag)"
                                            >
                                            {{ tag.name }}
                                        </p>
                                    </div>
                                </template>
                            </Popper>
                            <div style="margin-left: 16px; height: 100%; margin-bottom: 13.5px; margin-top: 7px;">
                                <div
                                    v-for="(tag, i) in newTask.tags" :key="i" style="display: inline;">
                                    <br v-if="i%4 == 0 && i != 0">
                                    <br v-if="i%4 == 0 && i != 0">
                                    <span 
                                        class="text-sm weight-bold"
                                        style="padding:6px 10px 6px 10px; border-radius: 5px; white-space: nowrap"
                                        :style="
                                        {
                                            'margin-left': i == 0 || i%4 == 0 ? '0px' : '10px',
                                            'background-color':tag.color,
                                        }">
                                        {{ tag.name }} 
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
        
        <input type="submit" hidden />
    </form>
</template>

<script>
// @ is an alias to /src
import ScheduleIcon from '@/icons/ScheduleIcon.vue'
import EditIcon from '@/icons/EditIcon.vue'
import { nextTick } from 'vue'
import Popper from 'vue3-popper'
import BookmarkIcon from '@/icons/BookmarkIcon.vue'

export default {
  name: 'NewTask',
  components: {
    ScheduleIcon,
    EditIcon,
    BookmarkIcon,
    Popper
  },
  props:{
  },
  data(){
    return{
        newTask: {
            id: null,
            userId: null,
            completed: false,
            title: null,
            description: "",
            dueDate: "",
            dueDateFormatted: "",
            tags: [],
        },

        isMarked: false,
        itemCollapsed: false,
        collapseItemShowed: true,
        toggleCat: false,
        descriptionIsEdit: false,

        editIcon:{
            width: '18',
            height: '18',
            iconColor: 'rgb(130, 130, 130)',//'#2F80ED',
        },
        scheduleIcon:{
            width: '18',
            height: '18',
            iconColor: 'rgb(130, 130, 130)',//'#2F80ED',
        },
        bookmarkIcon:{
            width: '18',
            height: '18',
            iconColor: 'rgb(130, 130, 130)',//'#2F80ED',
        },
        showDeletePopper: false,
        showTagPopper: false,

        tags:[
            {
                'name': 'Important ASAP',
                'color': '#E5F1FF',
            },
            {
                'name': 'Offline Meeting',
                'color': '#FDCFA4',
            },
            {
                'name': 'Virtual Meeting',
                'color': '#F9E9C3',
            },
            {
                'name': 'ASAP',
                'color': '#AFEBDB',
            },
            {
                'name': 'Client Related',
                'color': '#CBF1C2',
            },
            {
                'name': 'Self Task',
                'color': '#CFCEF9',
            },
            {
                'name': 'Appointments',
                'color': '#F9E0FD',
            },
            {
                'name': 'Court Related',
                'color': '#9DD0ED',
            },
        ],
    }
  },
  computed:{
  },
  watch:{
  },
  methods:{
    deleteTask(){
        const vm = this;
        vm.showDeletePopper = false;
        //vm.$emit("deleteTask", vm.newTask);
    },
    markTask(){
        const vm = this;
        vm.newTask.completed = !vm.newTask.completed;
    },
    insertTask(event){
        console.log('ndak lewat')
        event.preventDefault();
        console.log('lewat')
        if(this.newTask.title && this.newTask.dueDateFormatted && this.newTask.dueDateFormatted != "Invalid Date"){
            this.$emit('insertTask', this.newTask);
        }
    },
    submitForm(){
        this.showDeletePopper = false;
        this.$refs.formNewTask.submit();
    },
    showItem(condition){
        const vm = this;
        vm.descriptionIsEdit = false;

        if(condition == true){
            vm.itemCollapsed = false;
            vm.collapseItemShowed = true;
        }
        else{
            vm.collapseItemShowed = false;
            vm.itemCollapsed = true;
        }
        
    },
    toggleCategory: function(){
      this.toggleCat = !this.toggleCat;
    },
    datePicked(){
        const vm = this;
        if(vm.newTask.dueDate){
            let splitted = vm.newTask.dueDate.split('-');
            vm.newTask.dueDateFormatted = `${splitted[2]}/${splitted[1]}/${splitted[0]}`;
            vm.scheduleIcon.iconColor = "#2F80ED"
        }
        else{
            vm.newTask.dueDateFormatted = "";
            vm.scheduleIcon.iconColor = "rgb(130, 130, 130)"
        }
    },
    checkDateFormatted(){
        const vm = this;
        let date = new Date(vm.newTask.dueDateFormatted)

        if(date == "Invalid Date"){
            vm.newTask.dueDateFormatted = "Invalid Date";
            vm.scheduleIcon.iconColor = "rgb(130, 130, 130)";

            setTimeout(() => {
                vm.newTask.dueDateFormatted = "";
            }, 500)
        }
        else{
            vm.scheduleIcon.iconColor = "#2F80ED"
        }
    },
    updateDescription(){
        const vm = this;

        if(!vm.newTask.description){
            vm.editIcon.iconColor = 'rgb(130,130,130)';
        }
        else{
            vm.editIcon.iconColor = '#2F80ED';
        }

        vm.descriptionIsEdit = false;
    },
    async editDescription(){
        const vm = this;
        vm.descriptionIsEdit = true;
        await nextTick();
        document.getElementById("task-description-new-task").focus();
    }
  },
  beforeMount(){
    console.log("tes")
  },
}
</script>

<style scoped>
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
        align-items:
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
        margin-top: 13px;
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

    .popper-button{
        background: none;
        border: none;
        width: fit-content;
    }

    .popper-container{
        background: #FFFFFF;
        border: solid 1px #828282;
        border-radius: 5px;
        padding-top: 15px;
        padding-bottom: 15px;
        padding-left: 18px;
        padding-right: 62px;
    }

    .new-task-title{
        border: solid 1px #828282;
        border-radius: 5px;
        font-size: 14px;
        padding-left: 14px;
        padding-top: 11px;
        padding-bottom: 10px;
        min-width: 380px;
    }

    .checkbox{
        margin-top: 13px;
    }

    .tag-popper-container{
        width: 277px;
        padding-left: 15px;
        padding-top: 14px;
        padding-right: 16px;
        padding-bottom: 17px;
        background: #FFFFFF;
        border: solid 1px #828282;
        border-radius: 5px;
        margin-left: 300px;
    }

    .tag-popper-text{
        padding-left: 14px;
        padding-top: 9px;
        padding-bottom: 8px;
        margin-bottom: 11px;
        margin-top: 0px;
        margin-left: 0px;
        margin-right: 0px;
        white-space: nowrap;
        cursor: pointer;
    }

    .task-item-tag{
        display: flex;
        align-items: center;
        margin-top: 16px; 
        margin-left: 30px;
        margin-right: 30px;
        padding-left: 4px;
        padding-right: 12px;
        background-color: #F9F9F9;
        border-radius: 5px;
    }
</style>