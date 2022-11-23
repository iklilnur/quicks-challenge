<template>
  <div class="parent">
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M34 17C34 26.3888 26.3888 34 17 34C7.61116 34 0 26.3888 0 17C0 7.61116 7.61116 0 17 0C26.3888 0 34 7.61116 34 17Z" fill="#2F80ED"/>
    </svg>
    <span class="on-top initial color-white weight-bold">
        {{ initial }}
    </span>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'ChatGroupIcon',
  components: {
  },
  props:{
    initial: String,
  },
}
</script>

<style scoped>
  .on-top{
    position:absolute;
    left: 0px;
    right: 0px;
    top: 7px;
  }

  .parent {
    position:relative;
    text-align:center;
    width: 51px;
  }
</style>
