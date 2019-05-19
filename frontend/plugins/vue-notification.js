import Vue from 'vue';
// register the plugin on vue

if (process.browser) {
  const Toasted = require('vue-toasted');
  Vue.use(Toasted);
}
