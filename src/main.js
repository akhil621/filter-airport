import Vue from "vue";
import App from "./App.vue";
import "../src/assets/css/style.scss";
import "../src/assets/css/responsive.scss";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faThLarge, faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faThLarge, faArrowLeft, faArrowRight)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");