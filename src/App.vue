<template>
  <div id="app" class="container mt-5">
    <router-view
      :pokemons="pokemons"
      :favorites="favorites"
      @add-favorite="addFavorite"
      @remove-favorite="removeFavorite"
    ></router-view>
  </div>
</template>

<script>
import { EventBus } from "./main";

export default {
  name: "App",
  data() {
    return {
      pokemons: [],
      favorites: [],
    };
  },
  mounted() {
    this.loadPokemons();
    this.loadFavorites();
    EventBus.$on("favorites-updated", this.loadFavorites);
  },
  beforeDestroy() {
    EventBus.$off("favorites-updated", this.loadFavorites);
  },
  methods: {
    loadPokemons() {
      fetch("https://pokeapi.co/api/v2/pokemon?limit=15")
        .then((response) => response.json())
        .then((data) => {
          const pokemonDetailsPromises = data.results.map((pokemon) =>
            fetch(pokemon.url).then((response) => response.json())
          );
          Promise.all(pokemonDetailsPromises).then((pokemons) => {
            this.pokemons = pokemons;
          });
        });
    },
    loadFavorites() {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      this.favorites = favorites;
    },
    saveFavorites() {
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
    addFavorite(pokemon) {
      if (!this.favorites.some((fav) => fav.id === pokemon.id)) {
        this.favorites.push(pokemon);
        this.saveFavorites();
      }
    },
    removeFavorite(pokemonId) {
      this.favorites = this.favorites.filter(
        (pokemon) => pokemon.id !== pokemonId
      );
      this.saveFavorites();
    },
  },
};
</script>
