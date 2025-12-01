<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps(['sort', 'pricemin', 'pricemax', 'title', 'page'])
console.log('props>>>', props)

const priceMin = ref(props.pricemin)
const priceMax = ref(props.pricemax)
const sort = ref(props.sort)

const router = useRouter()

const handleSubmit = () => {
  const queries = { ...props }

  if (priceMin.value) {
    queries.pricemin = priceMin.value
  } else {
    delete queries.pricemin
  }

  if (priceMax.value) {
    queries.pricemax = priceMax.value
  } else {
    delete queries.pricemax
  }
  if (sort.value) {
    queries.sort = sort.value
  } else {
    delete queries.sort
  }

  queries.page = 1

  router.push({
    name: 'home',
    query: queries,
  })
}
</script>
<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <p>Prix</p>

      <div class="priceBloc">
        <div>
          <input
            type="number"
            name="priceMin"
            id="priceMin"
            placeholder="Minimum"
            min="0"
            v-model="priceMin"
          />
          <label for="priceMin">€</label>
        </div>

        <div>
          <input
            type="number"
            name="priceMax"
            id="priceMax"
            :min="priceMin"
            placeholder="Maximum"
            v-model="priceMax"
          />
          <label for="priceMax">€</label>
        </div>
      </div>
    </div>

    <div class="sortBloc">
      <p>Tri</p>

      <div>
        <label
          >Prix croissant<input type="radio" value="price:asc" id="priceAsc" v-model="sort"
        /></label>

        <label
          >Prix décroissant<input type="radio" value="price:desc" id="pricedesc" v-model="sort"
        /></label>

        <label>Pas de tri<input type="radio" value="" id="noSort" v-model="sort" /></label>
      </div>
    </div>

    <button>Rechercher</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
}

p {
  font-weight: bold;
  margin-bottom: 20px;
}
/*-------- priceBloc ----------*/

.priceBloc {
  display: flex;
  /* border: solid 2px green; */
  gap: 10px;
}

.priceBloc > div {
  height: 45px;
  display: flex;
}

.priceBloc input {
  height: 100%;
  width: 150px;
  border: none;
  border: solid 1px lightgrey;
  border-radius: 15px 0 0 15px;
  padding-left: 10px;
}
.priceBloc input::placeholder {
  font-size: 16px;
}
.priceBloc label {
  height: 100%;
  width: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px lightgrey;
  border-left: none;
  border-radius: 0 15px 15px 0;
}

/*-------- sortBloc ----------*/
.sortBloc > div {
  display: flex;
  gap: 15px;
}

/* --------- button ------------------ */
button {
  background-color: orangered;
  color: white;
  font-weight: bold;
  border: none;
  padding: 7px;
  border-radius: 10px;
}
</style>
15px
