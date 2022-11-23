<template>
    <div class="header-container">
        <ChatGroupIcon v-if="data.isGroup" />
        <PersonalChatIcon 
            v-else
            :initial="data.title[0]"/>
        <div class="header-content">
            <span class="text-lg chat-title">
                {{ data.title }}
            </span>
            <span class="color-gray-2 text-md chat-date">
                {{ data.date }}
            </span>

            <p v-if="data.isGroup" class="color-gray-2 weight-bold text-md last-person-name">
                {{ data.lastPersonName }} :
            </p>

            <p 
                class=" text-md color-gray-2 last-person-message"
                :style="{
                    'margin-top': data.isGroup ? '0px' : '8px'
                }"
                >
                {{ data.lastPersonMessage }}

                <span v-if="data.newMessage" class="new-message-dot" />
            </p>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import ChatGroupIcon from '@/icons/ChatGroupIcon.vue'
import PersonalChatIcon from '@/icons/PersonalChatIcon.vue'

export default {
  name: 'ChatHeader',
  components: {
    ChatGroupIcon,
    PersonalChatIcon
  },
  props:{
    data: Object
  }
}
</script>

<style scoped>
    .header-container{
        margin-left: 0px;
        margin-right: 0px;
        margin-top: 22px;
        margin-bottom: 22px;
        display: flex;
    }

    .header-content{
        margin-left: 17px;
        width: 100%;
    }

    .chat-title{
        color: #2F80ED;
        font-weight: 700;
    }
    
    .chat-date{
        margin-left: 16px;
    }

    .last-person-name{
        margin-top: 9px;
        margin-bottom: 4px;
    }

    .last-person-message{
        margin-bottom: 0px;
        width: 100%;
    }   

    .new-message-dot{
        background-color:#EB5757;
        float: right;
        width: 10px;
        height: 10px;
        border-radius: 50%;
    }
</style>
