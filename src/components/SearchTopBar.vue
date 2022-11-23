<template>
  <div class="search-top-bar">
    <svg class="search-icon" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.0804 18.9783H22.4434L31.0526 27.6047L28.4819 30.1754L19.8555 21.5662V20.2032L19.3896 19.7201C17.4228 21.4109 14.8694 22.4289 12.0916 22.4289C5.89781 22.4289 0.877197 17.4082 0.877197 11.2144C0.877197 5.02061 5.89781 0 12.0916 0C18.2854 0 23.3061 5.02061 23.3061 11.2144C23.3061 13.9922 22.2881 16.5456 20.5973 18.5124L21.0804 18.9783ZM4.32774 11.2145C4.32774 15.5104 7.79558 18.9783 12.0916 18.9783C16.3876 18.9783 19.8554 15.5104 19.8554 11.2145C19.8554 6.91846 16.3876 3.45062 12.0916 3.45062C7.79558 3.45062 4.32774 6.91846 4.32774 11.2145Z" fill="white"/>
    </svg>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Sidebar',
  components: {
  }
}
</script>

<style scoped>
  .search-top-bar{
    width: 100%;
    background-color: #4F4F4F;
    height: 58px;
    text-align: left;
  }

  .search-icon {
    height: 16px;
    width: 16px;
    margin-top: 19px;
    margin-left: 24px;
    /* Other styles here */
    }
</style>
