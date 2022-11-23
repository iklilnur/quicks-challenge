<template>
  <div ref="inboxContainer" class="inbox-container">
    <div v-if="pickedHeader == null" class="inbox-header-container">
      <div>
        <svg class="search-icon" width="12" height="12" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M21.0804 18.9783H22.4434L31.0526 27.6047L28.4819 30.1754L19.8555 21.5662V20.2032L19.3896 19.7201C17.4228 21.4109 14.8694 22.4289 12.0916 22.4289C5.89781 22.4289 0.877197 17.4082 0.877197 11.2144C0.877197 5.02061 5.89781 0 12.0916 0C18.2854 0 23.3061 5.02061 23.3061 11.2144C23.3061 13.9922 22.2881 16.5456 20.5973 18.5124L21.0804 18.9783ZM4.32774 11.2145C4.32774 15.5104 7.79558 18.9783 12.0916 18.9783C16.3876 18.9783 19.8554 15.5104 19.8554 11.2145C19.8554 6.91846 16.3876 3.45062 12.0916 3.45062C7.79558 3.45062 4.32774 6.91846 4.32774 11.2145Z" fill="#333333"/>
        </svg>
        <input 
          class="search-input"
          v-model="searchMessage"
          placeholder="Search"
          >
      </div>

      <center v-if="chatIsLoading">
        <div>
          <img class="loading-image rotating" width="85.41" height="85.41" src="../assets/img/loading-spinner.png"> 
          <p class="text-lg weight-bold color-gray-2">
            Loading Chats ...
          </p>
        </div>
      </center>

      <div v-else>
        <div v-for="(header,i) in chatHeaders" :key="i">
          <hr v-if="i != 0" class="chat-divider">
          <ChatHeader 
            :data="header" 
            @click="headerClicked(header)"/>
        </div>
      </div>
    </div>

    <div v-else class="content-container">
      <ChatContent @closeQuicks="closeQuicks" :chatHeader="pickedHeader" @back="backToHeader()" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ChatHeader from '@/components/ChatHeader.vue'
import ChatContent from '@/components/ChatContent.vue'
import axios from 'axios';

export default {
  name: 'Inbox',
  components: {
    ChatHeader,
    ChatContent
  },
  computed:{
    searchMaxWidth(){
      return this.$refs.inboxContainer.style.width;
    },
    posts(){
      return this.$store.state.posts;
    },
    chatHeaders(){
      const vm = this;
      let data = [];

      if(vm.posts.length > 0){
        vm.posts.forEach(post => {
          data.push({
            id: post.id,
            title: post.text,
            date: vm.formatDate(post.publishDate),
            lastPersonName: "Cameron Phillips",
            lastPersonMessage: "Please check this out!",
            isGroup: true,
            newMessage: true,
          });
        })
      }
      
      data.push({
        id: -1,
        title: "FastVisa Support",
        date: "01/06/2021 12:19",
        lastPersonName: null,
        lastPersonMessage: "Hey there! welcome to your inbox",
        isGroup: false,
        newMessage: false,
      })
      
      if(vm.searchMessage){
        data = data.filter(item => {
          return item.title.toLowerCase().includes(vm.searchMessage.toLowerCase())
        })
      }

      console.log(data)
      return data.sort((a,b) => new Date(b.date) - new Date(a.date));
    }
  },
  data(){
    return{
      searchMessage: "",
      chatIsLoading: true,
      pickedHeader: null,
    }
  },
  methods:{
    async getChats(){
      const vm = this;
      vm.chatIsLoading = true;
      let getConfig = {
        page: 0,
        limit: 5,
      }

      await axios.get(`https://dummyapi.io/data/v1/post?page=${getConfig.page}&limit=${getConfig.limit}`, {
        headers:{
          'app-id': '6379cbdaadd78a8eb7b0b8d2'
        }
      }).then((response) => {
        vm.$store.state.posts = response.data.data
      })
      .catch(err => {
        console.log(err)
        console.log("API get re-attempt");
        vm.getChats();
      })

      vm.chatIsLoading = false;
      //vm.$store.commit('getAllPosts', getConfig);
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

    closeQuicks(){
      this.$emit('closeQuicks');
    }
  },
  async beforeMount(){
    const vm = this;
    vm.chatIsLoading = true;

    await vm.getChats();
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

  .search-input{
    width:100%;
    height: 32px;
    border-radius: 5px;
    border: solid 1px #828282;
    color: #333333;
    font-size: 12px;
    padding-left: 58.82px;
    max-width: 608px;
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

</style>
