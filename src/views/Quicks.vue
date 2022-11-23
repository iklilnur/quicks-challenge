<template>
  <div>
    <div
      v-if="pickedIcon !== null"
      class="pop-up"
    >
      <Inbox @closeQuicks="closeQuicks" v-if="pickedIcon == 0" />
      <Task v-else-if="pickedIcon == 1" />
    </div>
    
    <img 
      v-if="pickedIcon == null"
      class="open-icon" 
      src="../assets/img/open-quicks.png" 
      @click="openQuicksIcon()"/>

    <img 
      v-if="pickedIcon !== null"
      class="close-icon" 
      src="../assets/img/close-quicks.png" 
      @click="openQuicksIcon()"/>

    <div 
      class="quicks-icon"
      :class="{
        'message-slide-left': openIconClicked && pickedIcon == null,
        'icon-active': pickedIcon == 0,
        'message-icon': pickedIcon !== 0
      }"
      :style="{
        'right': `${iconConfigs[0].right}px`,
      }">
      <p v-if="openIconClicked == true && pickedIcon == null" class="icon-text">Inbox</p>
      <MessageIcon 
        :width="iconConfigs[0].width" 
        :height="iconConfigs[0].height" 
        :backgroundColor="iconConfigs[0].backgroundColor" 
        :iconColor="iconConfigs[0].iconColor"
        @click="pickQuicks(0)"
      />
    </div>

    <div 
      class="quicks-icon"
      :class="{
        'task-slide-left': openIconClicked && pickedIcon == null,
        'icon-active': pickedIcon == 1,
        'task-icon': pickedIcon !== 1
      }"
      :style="{
        'right': `${iconConfigs[1].right}px`,
      }">
      <p v-if="openIconClicked == true && pickedIcon == null" class="icon-text">Task</p>
      <TaskIcon 
        :width="iconConfigs[1].width" 
        :height="iconConfigs[1].height" 
        :backgroundColor="iconConfigs[1].backgroundColor" 
        :iconColor="iconConfigs[1].iconColor"
        @click="pickQuicks(1)"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MessageIcon from '@/icons/MessageIcon.vue'
import TaskIcon from '@/icons/TaskIcon.vue'
import Inbox from '@/components/Inbox.vue'
import Task from '@/components/Task.vue'

export default {
  name: 'Quicks',
  components: {
    MessageIcon,
    TaskIcon,
    Inbox,
    Task
  },
  data(){
    return{
      iconConfigs:[
        {
          width: '60',
          height: '60',
          backgroundColor: '#F2F2F2',
          iconColor: '#8885FF',
          right: 38,
          iconNumber: 0,
        },
        {
          width: '60',
          height: '60',
          backgroundColor: '#F2F2F2',
          iconColor: '#F8B76B',
          right: 38,
          iconNumber: 1,
        },
      ],

      iconColors:[
        {
          primaryColor: '#8885FF',
          secondaryColor: '#F2F2F2',
        },
        {
          primaryColor: '#F8B76B',
          secondaryColor: '#F2F2F2',
        },
      ],
      
      openIconClicked: false,
      pickedIcon: null,
    }
  },
  methods:{
    openQuicksIcon(){
      const vm = this;
      
      vm.openIconClicked = !vm.openIconClicked;
      vm.pickedIcon = null;

      if(vm.openIconClicked == true){
        vm.iconConfigs.forEach(config => {
          config.right = 68+(26*(config.iconNumber+1))+34+(config.iconNumber*60);
        })
      }
      else{
        vm.iconConfigs.forEach((config,index) => {
          config.right = 38;
          config.width = '60';
          config.height = '60';
          config.backgroundColor = vm.iconColors[index].secondaryColor;
          config.iconColor = vm.iconColors[index].primaryColor;
        })
      }
    },

    pickQuicks(quicks){
      const vm = this;

      vm.pickedIcon = quicks;

      vm.iconConfigs.forEach((config, index) => {
        if(index == quicks){
          config.width = '68';
          config.height = '68';
          config.backgroundColor = vm.iconColors[index].primaryColor;
          config.iconColor = vm.iconColors[index].secondaryColor;
        }
        /*
        else if(config.iconNumber == (quicks+1)){
          config.right = `${config.right-26-60}px`;
          config.width = '60';
          config.height = '60';
          config.backgroundColor = vm.iconColors[index].secondaryColor;
          config.iconColor = vm.iconColors[index].primaryColor;
        }*/
        else{
          config.right = 68+(26*(config.iconNumber+1))+34+(config.iconNumber*60)-(26*config.iconNumber)-(60*config.iconNumber);
          config.width = '60';
          config.height = '60';
          config.backgroundColor = vm.iconColors[index].secondaryColor;
          config.iconColor = vm.iconColors[index].primaryColor;
        }
      })
    },

    closeQuicks(){
      const vm = this;

      vm.pickedIcon = null;
      vm.iconConfigs.forEach((config, index) => {
        config.right = 68+(26*(config.iconNumber+1))+34+(config.iconNumber*60);
        config.width = '60';
        config.height = '60';
        config.backgroundColor = vm.iconColors[index].secondaryColor;
        config.iconColor = vm.iconColors[index].primaryColor;
      })
    }
  },
}
</script>

<style scoped>
  .pop-up{
    position: absolute;
    bottom: 110px;
    right: 34px;
    width: 734px;
    height: 737px;
    border-radius: 5px;
    background-color: white;
  }

  .close-icon{
    position: absolute;
    bottom: 34px;
    right: 52px;
    width: 60px;
    height: 60px;
    z-index: 1;
  }

  .open-icon{
    position: absolute;
    bottom: 27px;
    right: 34px;
    width: 68px;
    height: 68px;
    z-index: 3;
  }

  .icon-active{
    position: absolute;
    bottom: 24px !important;
    right: 34px !important;
    text-align: center;
  }

  .quicks-icon{
    transition: 0.5s !important;
    z-index: 2
  }

  .message-icon{
    position: absolute;
    bottom: 31px;
    right: 38px;
    transition: 0.5s;
    text-align:center;
    opacity: 1;
  }

  .message-slide-left{
    right: 128px;
    transition: 0.5s;
    opacity: 1;
  }

  .task-icon{
    position: absolute;
    bottom: 29px;
    right: 38px;
    transition: 0.5s;
    text-align:center;
    opacity: 1;
  }

  .task-slide-left{
    right: 214px;
    transition: 0.7s;
    opacity: 1;
  }

  .icon-text{
    font-size: 14px;
    font-weight: 700;
    color: white;
    display:block;
    margin-bottom: 12px;
  }
</style>
