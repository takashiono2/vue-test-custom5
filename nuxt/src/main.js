import router from './router' //追加

new Vue({
  router, //追加
  store,
  render: h => h(App)
}).$mount('#app')
