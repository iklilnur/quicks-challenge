<template>
    <div class="container">
        <div class="chat-header">
            <div @click="backToHeader()" class="back-icon">
                <svg 
                     width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z" fill="#333333"/>
                </svg>
            </div>

            <div class="chat-header-content">
                <p class="text-lg chat-title">
                    {{ chatHeader.title }}
                </p>
                <p v-if="chatHeader.id != -1" class="text-md chat-participant">
                    3 Participants
                </p>
            </div>

            <svg @click="closeQuicks" class="close-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#333333"/>
            </svg>
        </div>
        <hr class="chat-divider">

        <div 
            v-if="chatIsLoading"
            style="flex-grow:1">
            <div>
                <img class="loading-image rotating" width="85.41" height="85.41" src="../assets/img/loading-spinner.png"> 
                <p class="text-lg weight-bold color-gray-2">
                Loading Chats ...
                </p>
            </div>
        </div>

        <div class="list-message" v-else ref="messageContainer">
            <div
                v-for="(message, i) in messages" :key="i">
                
                <div 
                    class="date-divider-container" 
                    v-if="
                        i != 0 && 
                        new Date(message.date).getDate() != new Date(messages[i-1].date).getDate()">
                    <hr class="date-divider" style="margin-right: 25px;">
                    <p class="date-divider-text weight-bold text-lg">
                        <!--{{ 
                            new Date(message.date).toLocaleDateString() == new Date().toLocaleDateString()? 
                            'Today' : ''
                        }}-->
                        {{ 
                            new Date(message.date).toLocaleDateString() == '6/9/2021' || new Date(message.date).toLocaleDateString() == new Date().toLocaleDateString()? 
                            'Today' : ''
                        }}
                        {{  formatDateDivider(message.date) }}
                    </p>
                    <hr class="date-divider" style="margin-left: 25px;">
                </div>

                <center >
                    <span
                        v-if="
                            i != 0 && 
                            message.isRead == false &&
                            messages[i-1].isRead == true && 
                            newMessageClicked == false &&
                            newMessageLinkVisible == true && 
                            newMessageAlreadyRead == false"
                        @click="newMessageClick()"
                        class="new-message-link"
                        >
                        New Message
                    </span>
                </center>

                <Waypoint @change="onChange">
                    <div 
                        class="date-divider-container"
                        v-if="
                            i != 0 && 
                            message.isRead == false &&
                            messages[i-1].isRead == true &&
                            newMessageAlreadyRead == false">
                        <hr class="date-divider" style="margin-right: 25px; border-color: #EB5757">
                        <p class="date-divider-text weight-bold text-lg" style="color: #EB5757">
                            New Message
                        </p>
                        <hr class="date-divider" style="margin-left: 25px; border-color: #EB5757">
                    </div>
                </Waypoint>

                <ChatMessage 
                    :ref="i != 0 && 
                    message.isRead == false &&
                    messages[i-1].isRead == true ? 'newChatMessage' : 'notNewChatMessage'"
                    @reply="reply"
                    :message="message" 
                    :isNewMessage="i != 0 && 
                    message.isRead == false &&
                    messages[i-1].isRead == true ? true : false" />
                <!--<p
                    :id="`message-${i}`"
                    class="weight-bold text-md"
                    style="margin: 0"
                    :style="{
                        'text-align': message.user.id == currentUser.id ? 'right' : 'left',
                        'color': chatColors[message.user.id-1].primary,
                    }"
                    >
                    {{ message.user.id == currentUser.id ? "You" : message.user.name}}
                </p>
                <div style="display:flex; margin-top: 6.89px; margin-bottom: 10.22px">
                    <p 
                        v-if="messages[i].user.id == currentUser.id" 
                        style="text-align:right; flex-grow: 1; margin-right: 7.67px; margin-top: 0; margin-bottom: 0">
                        <Popper :id="`popper-user-${i}`">
                            <button class="popper-button" @click="showPopper = true">
                                <svg width="12" height="4" viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.00008 0.666672C1.26675 0.666672 0.666748 1.26667 0.666748 2.00001C0.666748 2.73334 1.26675 3.33334 2.00008 3.33334C2.73341 3.33334 3.33341 2.73334 3.33341 2.00001C3.33341 1.26667 2.73341 0.666672 2.00008 0.666672ZM10.0001 0.666672C9.26675 0.666672 8.66675 1.26667 8.66675 2.00001C8.66675 2.73334 9.26675 3.33334 10.0001 3.33334C10.7334 3.33334 11.3334 2.73334 11.3334 2.00001C11.3334 1.26667 10.7334 0.666672 10.0001 0.666672ZM4.66675 2.00001C4.66675 1.26667 5.26675 0.666672 6.00008 0.666672C6.73341 0.666672 7.33341 1.26667 7.33341 2.00001C7.33341 2.73334 6.73341 3.33334 6.00008 3.33334C5.26675 3.33334 4.66675 2.73334 4.66675 2.00001Z" fill="#4F4F4F"/>
                                </svg>
                            </button>
                            <template #content>
                                <div class="popper-container text-lg">
                                    <p 
                                        class="popper-text"
                                        style="color: #2F80ED;">
                                        Edit
                                    </p>
                                    <hr>
                                    <p 
                                        class="popper-text"
                                        style="color: #EB5757;">
                                        Delete
                                    </p>
                                </div>
                            </template>
                        </Popper>
                    </p>
                    <p
                        :ref="i != 0 && 
                        message.isRead == false &&
                        messages[i-1].isRead == true ? 'newMessage' : 'notNew'"
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
                    <p v-if="messages[i].user.id != currentUser.id" style="margin-left: 7.67px; margin-top: 0; margin-bottom: 0">
                        <Popper :id="`popper-${i}`">
                            <button class="popper-button">
                                <svg width="12" height="4" viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.00008 0.666672C1.26675 0.666672 0.666748 1.26667 0.666748 2.00001C0.666748 2.73334 1.26675 3.33334 2.00008 3.33334C2.73341 3.33334 3.33341 2.73334 3.33341 2.00001C3.33341 1.26667 2.73341 0.666672 2.00008 0.666672ZM10.0001 0.666672C9.26675 0.666672 8.66675 1.26667 8.66675 2.00001C8.66675 2.73334 9.26675 3.33334 10.0001 3.33334C10.7334 3.33334 11.3334 2.73334 11.3334 2.00001C11.3334 1.26667 10.7334 0.666672 10.0001 0.666672ZM4.66675 2.00001C4.66675 1.26667 5.26675 0.666672 6.00008 0.666672C6.73341 0.666672 7.33341 1.26667 7.33341 2.00001C7.33341 2.73334 6.73341 3.33334 6.00008 3.33334C5.26675 3.33334 4.66675 2.73334 4.66675 2.00001Z" fill="#4F4F4F"/>
                                </svg>
                            </button>
                            <template #content>
                                <div class="popper-container text-lg">
                                    <p 
                                        class="popper-text"
                                        style="color: #2F80ED;">
                                        Share
                                    </p>
                                    <hr>
                                    <p 
                                        class="popper-text"
                                        style="color: #2F80ED;"
                                        @click="reply(message)">
                                        Reply
                                    </p>
                                </div>
                            </template>
                        </Popper>
                    </p>
                </div>-->
            </div>
        </div>
        
        <div v-if="chatHeader.id == -1 && messageIsLoading" class="message-loading-container">
            <svg class="rotating" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.17128 24.3748L27.2356 10.0322L27.277 10.0902C27.2633 10.0708 27.2496 10.0515 27.2358 10.0322C23.2752 4.49158 15.5729 3.21073 10.0322 7.17136C4.49162 11.132 3.21075 18.8342 7.17128 24.3748Z" fill="#2F80ED"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.17135 24.3749C7.17137 24.3749 7.17139 24.3749 7.17141 24.3749C11.132 29.9156 18.8344 31.1964 24.375 27.2358C29.9156 23.2752 31.1965 15.5729 27.2359 10.0322C27.2241 10.0157 27.2122 9.99924 27.2004 9.98282L27.2357 10.0322L7.17135 24.3749Z" fill="#F8F8F8"/>
                <path d="M10.4407 23.7204C10.4407 24.6705 9.67048 25.4407 8.72036 25.4407C7.77023 25.4407 7 24.6705 7 23.7204C7 22.7702 7.77023 22 8.72036 22C9.67048 22 10.4407 22.7702 10.4407 23.7204Z" fill="#2F80ED"/>
                <path d="M27.5257 10.9768C27.5257 11.9269 26.7554 12.6972 25.8053 12.6972C24.8552 12.6972 24.085 11.9269 24.085 10.9768C24.085 10.0267 24.8552 9.25644 25.8053 9.25644C26.7554 9.25644 27.5257 10.0267 27.5257 10.9768Z" fill="#2F80ED"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.74389 22.5362C12.689 26.6561 18.4163 27.6086 22.5363 24.6635C26.6563 21.7184 27.6087 15.991 24.6636 11.8711C21.7185 7.75109 15.9912 6.79866 11.8712 9.74374C7.75123 12.6888 6.7988 18.4162 9.74389 22.5362Z" fill="#E9F3FF"/>
            </svg>

            <span style="margin-left: 15.41px" class="text-md">Please wait while we connect you with one of our team ...</span>
        </div>

        <div 
            ref="replyMessageContainer" 
            v-if="replyMessage" 
            class="message-reply-container"
            :style="{
                'width': `${replyMessageContainerWidth}px`,
                'bottom': `${replyMessageContainerBottom}px`
            }">
            <div class="message-reply-header">
                <span class="weight-bold message-reply-title text-md">
                    Replying to {{ repliedMessage.user.name }}
                </span>
                <span @click="replyMessage = false; repliedMessage = null;" class="message-reply-close">
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#333333"/>
                    </svg>
                </span>
            </div>
            <p class="text-md" style="margin-right: 70px; margin-left: 15px; margin-top: 7px">
                {{ repliedMessage.message }}
            </p>
        </div>

        <div class="send-message-container">
            <textarea 
                rows="1"
                ref="sendMessageInput"
                class="send-message-input text-md"
                placeholder="Type a new message"
                v-model="inputedMessage"
                @keydown="checkKeyDownInput"
                @keyup="checkKeyUpInput"
                />
            <button
                class="send-message-button color-white text-lg "
                @click="sendMessage"
                >
                Send
            </button>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import { Waypoint } from "vue-waypoint";
//import Popper from "vue3-popper";
import { nextTick } from "vue";
import ChatMessage from '@/components/ChatMessage.vue'

export default {
  name: 'ChatContent',
  components: {
    Waypoint,
    //Popper,
    ChatMessage
  },
  props:{
    chatHeader: Object
  },
  data(){
    return{
        newMessageAlreadyRead: false,
        newMessageClicked: false,
        chatIsLoading: false,
        messageIsLoading: false,
        replyMessage: false,
        repliedMessage: null,
        months:[
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ],

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
        shiftPressed: false,
        enterPressed: false,
        inputRows: 1,
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
    },
    inputRows(){
        this.$refs.sendMessageInput.rows = this.inputRows;
        if(this.inputRows > 1){
            this.$refs.sendMessageInput.style.overflowY = "auto"
        }
        else if(this.inputRows == 1){
            this.$refs.sendMessageInput.style.overflowY = "hidden"
        }
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
    async reply(message){
        const vm = this;
        vm.replyMessage = true;
        vm.repliedMessage = message;
        await nextTick();
        vm.replyMessageContainerWidth = vm.$refs.sendMessageInput.clientWidth;
        vm.replyMessageContainerBottom = vm.$refs.sendMessageInput.style.top + 55;
        //vm.$refs.sendMessageInput
    },

    formatTime(date){
        let d = new Date(date)
        return `${d.getHours()}:${d.getMinutes()}`;
    },

    backToHeader(){
        this.$emit("back");
    },

    formatDateDivider(date){
        let d = new Date(date)
        return `${this.months[d.getMonth()]} ${("0" + d.getDate()).slice(-2)}, ${d.getFullYear()}`;
    },

    async newMessageClick(){
        console.log(this.$refs)
        await nextTick();
        document.getElementById("newMessage").scrollIntoView();
        this.newMessageClicked = true;
        //this.$refs.messageContainer.scrollTop = this.$refs.newMessage[0].offsetTop;
    },

    onChange(waypointState){
        if(waypointState.going == "OUT"){
            this.newMessageLinkVisible = false;
        }
        else{
            this.newMessageLinkVisible = true;
        }
    },

    getMessages(){
      const vm = this;

      vm.$store.commit('getCommentByPost', vm.chatHeader.id);
    },

    async sendMessage(){
        const vm = this;
        
        if(vm.inputedMessage){
            vm.data.push({
                id: vm.data[vm.data.length-1].id+1,
                message: vm.inputedMessage,
                user: vm.currentUser,
                date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
                isRead: true,
                repliedMessage: vm.repliedMessage
            })
            
            vm.replyMessage = false;
            vm.repliedMessage = null;
            vm.inputedMessage = "";
            vm.newMessageAlreadyRead = true;

            await nextTick();

            document.getElementById(`message-${vm.data[vm.data.length-1].id}`).scrollIntoView();
            console.log(vm.newMessageAlreadyRead)
        }
    },

    async checkKeyDownInput(event){

        if(event.key == "Enter"){
            this.enterPressed = true;
        }
        else if(event.key == "Shift"){
            this.shiftPressed = true;
        }

        if(this.enterPressed == true && this.shiftPressed == true){
            this.inputRows++;
        }
        else if(this.enterPressed == true){
            this.sendMessage();
            event.preventDefault();
            await nextTick();
            this.inputedMessage = "";
            this.inputRows = 1;
        }
    },
    checkKeyUpInput(event){
        if(event.key == "Enter"){
            this.enterPressed = false;
        }
        else if(event.key == "Shift"){
            this.shiftPressed = false;
        }
        
        if(event.key == "Backspace"){
            this.inputRows = this.$refs.sendMessageInput.rows;
            this.$refs.sendMessageInput.style.overflowY = "hidden";
        }
    },

    closeQuicks(){
        this.$emit('closeQuicks');
    }
  },
  async beforeMount(){
    const vm = this;

    if(vm.chatHeader.id != -1){
        await vm.getMessages();
    }

    if(vm.chatHeader.id != -1){
        vm.data = [
            {
                id: 0,
                message: "No worries. It will be completed ASAP. I've asked him yesterday.",
                user:{
                    id: 1,
                    name: "Claren"
                },
                date: "2021-06-08T12:32:00Z",
                isRead: true,
                repliedMessage: null
            },
            {
                id: 1,
                message: "Hello Obaidullah, I will be your case advisor for case #029290. I have assigned some homework for you to fill. Please keep up with the due dates. Should you have any questions, you can message me anytime. Thanks.",
                user:{
                    id: 2,
                    name: "Mary Hilda"
                },
                date: "2021-06-09T12:32:01Z",
                isRead: true,
                repliedMessage: null
            },
            {
                id: 2,
                message: "Please contact Mary for questions regarding the case bcs she will be managing your forms from now on! Thanks Mary.",
                user:{
                    id: 1,
                    name: "Claren"
                },
                date: "2021-06-09T12:32:02Z",
                isRead: true,
                repliedMessage: null
            },
            {
                id: 3,
                message: "Sure thing, Claren",
                user:{
                    id: 2,
                    name: "Mary Hilda"
                },
                date: "2021-06-09T12:32:03Z",
                isRead: true,
                repliedMessage: null
            },
            {
                id: 4,
                message: "Morning. I’ll try to do them. Thanks.",
                user:{
                    id: 3,
                    name: "Obaidullah Amarkhil"
                },
                date: "2021-06-09T12:32:04Z",
                isRead: false,
                repliedMessage: null
            },
        ]
    }
    else{
        vm.data = [
            {
                id: 5,
                message: "Hey there. Welcome to your inbox! Contact us for more information and help about anything! We’ll send you a response as soon as possible.",
                user:{
                    id: 4,
                    name: "FastVisa Support"
                },
                date: "2021-06-08T12:32:01Z",
                isRead: true,
                repliedMessage: null
            },
            {
                id: 6,
                message: "Hi, I need help with something can you help me",
                user:{
                    id: 1,
                    name: "Claren"
                },
                date: "2021-06-08T12:32:02Z",
                isRead: true,
                repliedMessage: null
            },
        ]

        vm.messageIsLoading = true;
        setTimeout(() => {
            vm.messageIsLoading = false;
        }, 3000)
    }
    
  },
  mounted() {
    console.log(this.$refs)
  },
}
</script>

<style scoped>
    .content-container{
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }

    .chat-divider{
        border-top: 1px solid #BDBDBD;
        width: 99%;
    }

    .chat-header{
        display: flex;
        position: relative;
        align-items: center;
        padding-bottom: 18.44px;
        padding-top:19.62px;
    }

    .back-icon{
        padding-left: 29px;
        padding-right: 18.43px;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .back-icon :hover{
        cursor: pointer;
    }

    .close-icon{
        margin-right: 21px;
    }

    .chat-title{
        color: #2F80ED;
        font-weight: 700;
        margin:0px !important;
    }   

    .chat-header-content{
        flex-grow: 1;
    }

    .chat-participant{
        margin-top: 9.36px;
        margin-bottom: 0px;
    }

    .list-message{
        margin-top: 13.5px;
        margin-left: 20px;
        margin-right: 10px;
        padding-right: 10px;
        overflow-y: scroll;
        flex-grow: 1;
        height: 537px;
    }

    .message-container{
    }

    .message{
        padding: 10px;
        padding-bottom: 10px;
        border-radius: 5px;
    }
    
    .container{
        display: flex;
        flex-direction: column;
    }

    .send-message-container{
        position: absolute;
        display: flex;
        left: 20px; 
        right: 20px;
        bottom: 20px;
    }

    .send-message-input{
        flex-grow: 1;
        border: solid 1px #828282;
        height: 14px !important;
        max-height: 36px !important;
        border-radius: 5px;
        color: #333333;
        padding-left: 16px;
        padding-top: 12px;
        padding-bottom: 12px;
        resize: none;
        overflow-y: hidden;
    }

    .send-message-button{
        width: 76px;
        height: 40px;
        background-color: #2F80ED;
        border-radius: 5px;
        margin-left: 13px;
        border: none;
    }

    
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
</style>