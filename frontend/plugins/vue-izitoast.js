import Vue from 'vue'
// import 'izitoast/dist/css/iziToast.min.css'

if (process.browser) {
const VueNotifications = require('vue-notifications')
  const iziToast = require('izitoast');
  Vue.config.productionTip = false;

  function toast({title, message, type, timeout, cb}) {
    if (type === VueNotifications.types.warn) type = 'warning'
    return iziToast[type]({
      title, message,
      timeout: timeout,
      progressBar: false
    });
  }

  const options = {
    success: toast,
    error: toast,
    info: toast,
    warn: toast
  };
  Vue.use(VueNotifications, options);
}
