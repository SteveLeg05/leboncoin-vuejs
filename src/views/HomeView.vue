<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import Card from '@/components/Card.vue'

const offersArray = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers?populate=pictures,owner.avatar`,
    )
    offersArray.value = data.data
    console.log(offersArray.value[0])
  } catch (error) {
    console.log(`catch >>>`, error)
  }
})
</script>

<template>
  <main class="container">
    <h2>Des millions de petites annonces et autant d'occasions de se faire plaisir</h2>
    <div class="bandeau">
      <img src="../assets/img/onde-corail.svg" alt="onde corail" />
      <div>
        <h3>C'est le moment de vendre</h3>
        <button class="deposit-button">
          <font-awesome-icon :icon="['fas', 'plus-square']" />Déposer une annonce
        </button>
      </div>

      <img src="../assets/img/feuille-bleue.svg" alt="feuille bleue" />
    </div>

    <section class="cards">
      <p v-if="!offersArray.length">Chargement des annonces...</p>
      <RouterLink :to="'/offer/' + offer.id" v-for="offer in offersArray" :key="offer.id">
        <Card
          :avatar="offer.attributes?.owner?.data?.attributes?.avatar?.data?.attributes?.url"
          :username="offer.attributes?.owner?.data?.attributes?.username"
          :picture="offer.attributes.pictures?.data[0]?.attributes?.url"
          :title="offer.attributes.title"
          :price="offer.attributes.price"
          :date="offer.attributes.createdAt"
      /></RouterLink>
    </section>
  </main>
</template>

<style scoped>
main.container {
  padding-top: 120px;
}

.bandeau {
  /* border: solid 2px red; */
  border-radius: 20px;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  background-color: rgb(255, 234, 226);
}

.bandeau > img {
  border-radius: 20px;
}

.bandeau > div {
  /* border: solid 2px red; */
  display: flex;
  align-items: center;
  gap: 10px;
}

h2 {
  margin-top: 500px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin: 30px 0;
}

h3 {
  font-size: 25px;
  font-weight: bold;
}

.cards {
  /* border: solid 2px blue; */
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 10px;
  margin: 30px 0;
}

.cards a {
  text-decoration: none;
  color: inherit;
  display: block;
}
</style>
