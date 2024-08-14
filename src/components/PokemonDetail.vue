<template>
  <div>
    <button class="btn btn-secondary mb-2" @click="goBack">
      <font-awesome-icon :icon="['fas', 'arrow-left-long']" />
      Back
    </button>

    <div
      v-if="pokemon.sprites"
      class="pokemon-detail container mt-5 p-4 bg-light rounded shadow"
    >
      <div class="row">
        <div class="col-md-4 text-center">
          <img
            :src="pokemon.sprites.front_default"
            :alt="pokemon.name"
            class="img-fluid w-100 mb-4 border"
          />
        </div>
        <div class="col-md-8">
          <h2 class="text-center text-uppercase font-weight-bold text-primary">
            {{ pokemon.name }}
          </h2>
          <hr />
          <div class="details">
            <p><strong>Height:</strong> {{ pokemon.height }} m</p>
            <p><strong>Weight:</strong> {{ pokemon.weight }} kg</p>

            <!-- Menampilkan Tipe Pokemon -->
            <p><strong>Types:</strong></p>
            <ul class="list-group mb-3">
              <li
                class="list-group-item d-flex justify-content-between align-items-center"
                v-for="type in pokemon.types"
                :key="type.type.name"
              >
                {{ type.type.name }}
                <span class="badge badge-primary badge-pill">Type</span>
              </li>
            </ul>

            <!-- Menampilkan Abilities -->
            <p><strong>Abilities:</strong></p>
            <ul class="list-group mb-3">
              <li
                class="list-group-item d-flex justify-content-between align-items-center"
                v-for="ability in pokemon.abilities"
                :key="ability.ability.name"
              >
                {{ ability.ability.name }}
                <span class="badge badge-success badge-pill">Ability</span>
              </li>
            </ul>

            <!-- Menampilkan Statistik -->
            <p><strong>Stats:</strong></p>
            <ul class="list-group mb-3">
              <li
                class="list-group-item d-flex justify-content-between align-items-center"
                v-for="stat in pokemon.stats"
                :key="stat.stat.name"
              >
                {{ stat.stat.name }}
                <span class="badge badge-info badge-pill">{{
                  stat.base_stat
                }}</span>
              </li>
            </ul>

            <!-- Menampilkan Gender -->
            <div v-if="genderRatio">
              <p><strong>Gender Ratio:</strong></p>
              <div class="progress">
                <div
                  class="progress-bar bg-info"
                  role="progressbar"
                  :style="{ width: genderRatio.male + '%' }"
                  :aria-valuenow="genderRatio.male"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  Male: {{ genderRatio.male }}%
                </div>
                <div
                  class="progress-bar bg-warning"
                  role="progressbar"
                  :style="{ width: genderRatio.female + '%' }"
                  :aria-valuenow="genderRatio.female"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  Female: {{ genderRatio.female }}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PokemonDetail",
  data() {
    return {
      pokemon: {
        sprites: {
          front_default: "",
        },
        name: "",
        height: "",
        weight: "",
        types: [],
        abilities: [],
        stats: [],
      },
      genderRatio: null,
    };
  },
  created() {
    const id = this.$route.params.id;
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((data) => {
        this.pokemon = data;

        fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
          .then((response) => response.json())
          .then((speciesData) => {
            const genderRate = speciesData.gender_rate;
            this.genderRatio = {
              male: 100 - genderRate * 12.5,
              female: genderRate * 12.5,
            };
          });
      });
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
/* Custom styles to complement Bootstrap */
.pokemon-detail {
  padding: 20px;
}

.details p {
  margin-bottom: 10px;
}
</style>
