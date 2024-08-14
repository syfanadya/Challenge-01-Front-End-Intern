<template>
  <div>
    <h1 class="text-center display-4 text-primary">Pokemon Gallery</h1>
    <div class="d-flex justify-content-center">
      <router-link to="/favorites" class="btn btn-info mt-3 mb-4">
        <font-awesome-icon :icon="['fas', 'bookmark']" /> View Favorites
      </router-link>
    </div>
    <pokemon-list
      :pokemons="pokemons"
      :favorites="favorites"
      @add-favorite="addFavorite"
      @remove-favorite="removeFavorite"
    ></pokemon-list>
  </div>
</template>

<script>
import PokemonList from "./PokemonList.vue";

export default {
  name: "PokemonsGallery",
  components: {
    PokemonList,
  },
  props: ["pokemons", "favorites"],
  methods: {
    addFavorite(pokemon) {
      this.$emit("add-favorite", pokemon);
    },
    removeFavorite(pokemonId) {
      this.$emit("remove-favorite", pokemonId);
    },
  },
};
</script>
