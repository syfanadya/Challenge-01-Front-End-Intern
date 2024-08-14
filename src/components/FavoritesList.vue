<template>
  <div class="container">
    <h1 class="text-center display-4 text-primary">My Favorite Pokemon</h1>
    <button class="btn btn-secondary mb-2 mb-4" @click="goBack">
      <font-awesome-icon :icon="['fas', 'arrow-left-long']" />
      Back
    </button>
    <pokemon-list
      :pokemons="favoritePokemons"
      :favorites="favoritePokemons"
      :isFavoritePage="true"
      @remove-favorite="removeFavorite"
    ></pokemon-list>
  </div>
</template>

<script>
import PokemonList from "./PokemonList.vue";
import { EventBus } from "../main";

export default {
  name: "FavoritesList",
  components: {
    PokemonList,
  },
  data() {
    return {
      favoritePokemons: [],
    };
  },
  created() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    this.favoritePokemons = favorites;
  },
  methods: {
    removeFavorite(pokemonId) {
      this.favoritePokemons = this.favoritePokemons.filter(
        (fav) => fav.id !== pokemonId
      );
      localStorage.setItem("favorites", JSON.stringify(this.favoritePokemons));
      // Emit event to notify other components about the update
      EventBus.$emit("favorites-updated");
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
