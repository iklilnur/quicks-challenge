<template>
    <div>
        <p
            :id="`message-${message.id}`"
            class="weight-bold text-md"
            style="margin: 0"
            :style="{
                'text-align': message.user.id == currentUser.id ? 'right' : 'left',
                'color': chatColors[message.user.id-1].primary,
            }"
            >
            {{ message.user.id == currentUser.id ? "You" : message.user.name}}
        </p>
        <p
            v-if="message.repliedMessage"
            class="message text-md color-gray-2"
            style="margin-top: 6.9px; margin-bottom: 0"
            :style="{
                'word-wrap': 'wrap',
                'background-color': '#E0E0E0',
                'width': 'max-content',
                'max-width': '70%',
                'margin-left':  message.user.id == currentUser.id ? 'auto' : '0px',
            }">

            <span>
            {{ message.repliedMessage.message }}
            </span>
        </p>
        <div 
            :id="`message-${message.id}`"
            style="display:flex; margin-top: 6.89px; margin-bottom: 10.22px">
            <p 
                v-if="message.user.id == currentUser.id" 
                style="text-align:right; flex-grow: 1; margin-right: 7.67px; margin-top: 0; margin-bottom: 0">
                <Popper :id="`popper-user-${message.id}`" :show="showPopper" @focusout="showPopper = false">
                    <button class="popper-button" @click="showPopper = true">
                        <svg width="12" height="4" viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.00008 0.666672C1.26675 0.666672 0.666748 1.26667 0.666748 2.00001C0.666748 2.73334 1.26675 3.33334 2.00008 3.33334C2.73341 3.33334 3.33341 2.73334 3.33341 2.00001C3.33341 1.26667 2.73341 0.666672 2.00008 0.666672ZM10.0001 0.666672C9.26675 0.666672 8.66675 1.26667 8.66675 2.00001C8.66675 2.73334 9.26675 3.33334 10.0001 3.33334C10.7334 3.33334 11.3334 2.73334 11.3334 2.00001C11.3334 1.26667 10.7334 0.666672 10.0001 0.666672ZM4.66675 2.00001C4.66675 1.26667 5.26675 0.666672 6.00008 0.666672C6.73341 0.666672 7.33341 1.26667 7.33341 2.00001C7.33341 2.73334 6.73341 3.33334 6.00008 3.33334C5.26675 3.33334 4.66675 2.73334 4.66675 2.00001Z" fill="#4F4F4F"/>
                        </svg>
                    </button>
                    <template #content>
                        <div class="popper-container text-lg">
                            <p 
                                class="popper-text"
                                style="color: #2F80ED;"
                                @click="showPopper = false;">
                                Edit
                            </p>
                            <hr>
                            <p 
                                class="popper-text"
                                style="color: #EB5757;"
                                @click="showPopper = false;">
                                Delete
                            </p>
                        </div>
                    </template>
                </Popper>
            </p>
            
            <p
                :id="isNewMessage == true ? `newMessage` : `notNew-${message.id}`"
                :ref="isNewMessage == true ? 'newMessage' : 'notNew'"
                class="message text-md color-gray-2"
                style="margin-top: 0; margin-bottom: 0"
                :style="{
                    'word-wrap': 'wrap',
                    'background-color': chatColors[message.user.id-1].secondary,
                    'width': 'max-content',
                    'max-width': message.user.id == currentUser.id ? '58%' : '70%',
                    'margin-left':  message.user.id == currentUser.id ? 'auto' : '0px',
                }">

                <span>
                {{ message.message }}
                </span>
                <span 
                    style="margin-top:12px; display: block"
                    :style="{
                        'text-align': 'left',
                    }">
                    {{ formatTime(message.date) }}
                </span>
            </p>
            <p v-if="message.user.id != currentUser.id" style="margin-left: 7.67px; margin-top: 0; margin-bottom: 0">
                <Popper :id="`popper-${message.id}`" :show="showPopper" @focusout="showPopper = false">
                    <button class="popper-button" @click="showPopper = true">
                        <svg width="12" height="4" viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.00008 0.666672C1.26675 0.666672 0.666748 1.26667 0.666748 2.00001C0.666748 2.73334 1.26675 3.33334 2.00008 3.33334C2.73341 3.33334 3.33341 2.73334 3.33341 2.00001C3.33341 1.26667 2.73341 0.666672 2.00008 0.666672ZM10.0001 0.666672C9.26675 0.666672 8.66675 1.26667 8.66675 2.00001C8.66675 2.73334 9.26675 3.33334 10.0001 3.33334C10.7334 3.33334 11.3334 2.73334 11.3334 2.00001C11.3334 1.26667 10.7334 0.666672 10.0001 0.666672ZM4.66675 2.00001C4.66675 1.26667 5.26675 0.666672 6.00008 0.666672C6.73341 0.666672 7.33341 1.26667 7.33341 2.00001C7.33341 2.73334 6.73341 3.33334 6.00008 3.33334C5.26675 3.33334 4.66675 2.73334 4.66675 2.00001Z" fill="#4F4F4F"/>
                        </svg>
                    </button>
                    <template #content>
                        <div class="popper-container text-lg">
                            <p 
                                class="popper-text"
                                style="color: #2F80ED;"
                                @click="showPopper = false;">
                                Share
                            </p>
                            <hr>
                            <p 
                                class="popper-text"
                                style="color: #2F80ED;"
                                @click="showPopper = false;reply(message)">
                                Reply
                            </p>
                        </div>
                    </template>
                </Popper>
            </p>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Popper from "vue3-popper";

export default {
  name: 'ChatMessage',
  components: {
    Popper
  },
  props:{
    message: Object,
    isNewMessage: Boolean,
  },
  data(){
    return{
        chatColors:[
            {
                primary: "#9B51E0",
                secondary: "#EEDCFF"
            },
            {
                primary: "#E5A443",
                secondary: "#FCEED3"
            },
            {
                primary: "#43B78D",
                secondary: "#D2F2EA"
            },
            {
                primary: "#2F80ED",
                secondary: "#F8F8F8"
            },
        ],

        timerCount: 6000,
        newMessageLinkVisible: true,
        data: [],

        replyMessageContainerWidth: 0,
        replyMessageContainerBottom: 0,
        showPopper: false,
    }
  },
  watch:{
    showPopper(){
        console.log("show popper =", this.showPopper)
    },
    timerCount: {
        handler(value) {
            
            if (value > 0) {
                setTimeout(() => {
                    this.timerCount--;
                }, 1000);
            }

        },
        immediate: true // This ensures the watcher is triggered upon creation
    }
  },
  computed:{
    currentUser(){
        return this.$store.state.currentUser;
    },
    comments(){
        console.log(this.$store.state.comments);
        return this.$store.state.comments;
    },
    messages(){
        const vm = this;

        return vm.data;
    },

  },
  methods:{
    formatTime(date){
        let d = new Date(date)
        return `${d.getHours()}:${d.getMinutes()}`;
    },
    reply(message){
        this.$emit("reply", message);
    }
  },
  async beforeMount(){
    
  },
  mounted() {
    console.log(this.$refs)
  },
}
</script>

<style>
    .date-divider{
        border: none;
        border-top: solid 1px #4F4F4F;
        flex-grow: 1;
        height: 1px;
    }

    .date-divider.text{
        display: inline;
    }

    .date-divider-container{
        display:flex;
        align-items: center;
    }

    .new-message-link{
        background-color: #E9F3FF;
        padding-top: 12px;
        padding-left: 8px;
        padding-right: 8px;
        padding-bottom: 12px;
        text-decoration: none;
        color: #2F80ED;
        border-radius: 5px;
    }
    
    .popper-button{
        background: none;
        border: none;
    }

    .popper-container{
        background-color: #FFFFFF;
        border: solid 1px #BDBDBD;
        border-radius: 5px;
        width: 126px;
    }

    .popper-text{
        margin-left: 18.5px; 
        margin-top: 13px; 
        margin-bottom: 11px; 
        text-align: left;
    }

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

  .message-loading-container{
    position: absolute;
    bottom: 70px;
    left: 20px;
    right: 20px;
    padding: 14.41px;
    background-color: #E9F3FF;
    border-radius: 5px;
    display: flex;
    align-items: center;
  }

  .message-reply-container{
    position: absolute;
    bottom: 100px;
    width: 300px;
    left: 20px;
    right: 20px;
    background-color: #F2F2F2;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    border: solid 1px #828282;
    border-radius: 5px 5px 0px 0px
  }

  .message-reply-header{
    margin-top: 15px;
    margin-left: 15px;
    margin-right: 15px;
  }

  .message-reply-title{
    flex-grow: 1;
  }

  .message-reply-close{
    float: right;
  }

  .message{
        padding: 10px;
        padding-bottom: 10px;
        border-radius: 5px;
    }
</style>