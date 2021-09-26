<template>
  <div id="header">
    <h1>Todoリスト</h1>
    <div id="contents">
      <Nuxt />
    </div>
  </div>
</template>

<style>
#header{
  width: auto;
  height: 46px;
  background-color:#1e93c1;
  text-align: center;
}

#contents{
  font-size: 1.4em;
  width:80%;
  text-align: center;
  min-height: 300px;
  color: #000000;
  margin: 0 auto;
  background-color :#ffffff;
  line-height: 1.5em;
  border-radius: 15px;
}

</style>
