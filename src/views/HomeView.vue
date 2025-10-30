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
        <button>Déposer vos annonces</button>
      </div>

      <img src="../assets/img/feuille-bleue.svg" alt="feuille bleue" />
    </div>

    <Card
      v-for="offer in offersArray"
      :key="offer.id"
      :avatar="offer.attributes.owner?.data?.attributes?.avatar?.data?.attributes?.url"
      :username="offer.attributes.owner.data.attributes.username"
      :picture="offer.attributes.pictures?.data[0]?.attributes?.url"
      :title="offer.attributes.title"
      :price="offer.attributes.price"
      :date="offer.attributes.createdAt"
    />
  </main>
</template>

<style scoped>
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
  font-size: 30px;
  text-align: center;
  margin: 30px 0;
}

h3 {
  font-size: 25px;
}
</style>
