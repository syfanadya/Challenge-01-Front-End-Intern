<template>
  <div class="container">
    <div class="row">
      <transition-group
        name="fade"
        tag="div"
        class="row"
        @beforeEnter="before"
        @enter="enter"
        @leave="leave"
      >
        <div
          class="col-md-4 mb-4"
          v-for="(pokemon, index) in filteredPokemons"
          :key="pokemon.id"
          :data-index="index"
        >
          <div
            class="card h-100 text-center border border-3 border-info position-relative"
          >
            <button
              class="btn position-absolute top-0 start-0 mt-2 ms-2"
              :class="
                isFavorite(pokemon)
                  ? 'btn-outline-danger'
                  : 'btn-outline-warning'
              "
              @click="toggleFavorite(pokemon)"
              :aria-label="
                isFavorite(pokemon)
                  ? 'Remove from Favorites'
                  : 'Add to Favorites'
              "
            >
              <font-awesome-icon
                :icon="
                  isFavoritePage
                    ? ['fas', 'trash']
                    : isFavorite(pokemon)
                    ? ['fas', 'trash']
                    : ['fas', 'bookmark']
                "
              />
            </button>
            <div class="d-flex justify-content-center">
              <img
                :src="pokemon.sprites.front_default"
                :alt="pokemon.name"
                class="card-img-top img-fluid w-50"
                style="border-radius: 0.75rem"
              />
            </div>
            <div class="card-body">
              <h5 class="card-title" style="font-size: 1.5rem">
                {{ pokemon.name }}
              </h5>
              <button
                class="btn btn-info w-100 mt-3"
                @click="viewDetail(pokemon.id)"
              >
                View Detail
                <font-awesome-icon :icon="['fas', 'arrow-right-long']" />
              </button>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "PokemonList",
  props: {
    pokemons: {
      type: Array,
      required: true,
    },
    favorites: {
      type: Array,
      required: true,
    },
    isFavoritePage: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    filteredPokemons() {
      return this.pokemons.filter(
        (pokemon) => pokemon.sprites && pokemon.sprites.front_default
      );
    },
  },
  methods: {
    isFavorite(pokemon) {
      return this.favorites.some((fav) => fav.id === pokemon.id);
    },
    toggleFavorite(pokemon) {
      if (this.isFavorite(pokemon)) {
        this.$emit("remove-favorite", pokemon.id);
      } else {
        this.$emit("add-favorite", pokemon);
      }
    },
    viewDetail(id) {
      console.log(`Navigating to detail of Pokemon with ID: ${id}`);
      if (this.$route.path !== `/detail/${id}`) {
        this.$router.push(`/detail/${id}`);
      }
    },
    before(el) {
      el.className = "d-none";
    },
    enter(el) {
      const delay = el.dataset.index * 100;
      setTimeout(() => {
        el.className = "col-md-4 mb-4 animate__animated animate__fadeInRight";
      }, delay);
    },
    leave(el) {
      const delay = el.dataset.index * 100;
      setTimeout(() => {
        el.className = "col-md-4 mb-4 animate__animated animate__fadeOutRight";
      }, delay);
    },
  },
};
</script>

<style scoped>
.card {
  position: relative;
}
</style>
