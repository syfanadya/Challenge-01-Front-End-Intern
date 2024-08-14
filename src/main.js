import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "animate.css/animate.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowRightLong,
  faArrowLeftLong,
  faBookmark,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import PokemonDetail from "./components/PokemonDetail.vue";
import PokemonsGallery from "./components/PokemonsGallery.vue";
import FavoritesList from "./components/FavoritesList.vue";

export const EventBus = new Vue();

library.add(faArrowRightLong, faArrowLeftLong, faBookmark, faTrash);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(VueRouter);
Vue.config.productionTip = false;

const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: PokemonsGallery,
      name: "home",
    },
    {
      path: "/detail/:id",
      component: PokemonDetail,
    },
    {
      path: "/favorites",
      component: FavoritesList,
      name: "favorites",
    },
  ],
});

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
