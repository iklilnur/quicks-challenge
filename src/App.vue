<template>
  <router-view/>
</template>

<style>
  body, html{
    height: 100%;
    margin: 0 !important;
    scroll-behavior: smooth;
    font-family: 'Lato', sans-serif !important;
  }

  button, p, h1,h2,h3,h4,h5, span, div, input, textarea{
    font-family: 'Lato', sans-serif !important;
  }

  @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');

  #app {
    font-family: 'Lato', sans-serif !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

  /* width */
  ::-webkit-scrollbar {
    width: 8px;
    border: none !important;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #ffffff;
    border: none;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #BDBDBD;
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  .weight-normal{
    font-weight: 400;
  }

  .weight-bold{
    font-weight: 700 !important;
  }

  .color-white{
    color: #F2F2F2;
  }

  .color-gray-1{
    color: #333333;
  }

  .color-gray-2{
    color: #4F4F4F;
  }

  .color-gray-3{
    color: #828282;
  }

  .text-sm{
    font-size: 12px;
  }

  .text-md{
    font-size: 14px;
  }

  .text-lg{
    font-size: 16px;
  }

  .d-block{
    display: block;
  }
</style>
