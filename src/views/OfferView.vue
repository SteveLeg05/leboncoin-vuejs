<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const offer = ref(null)

const props = defineProps({
  id: { required: true },
})

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/${props.id}?populate=pictures,owner.avatar`,
    )
    offer.value = data.data
  } catch (error) {
    console.log(`catch >>>`, error)
  }
})
</script>
<template>
  <main>
    <section class="container offerInfo">
      <section class="offerDetails">
        <div v-if="offer && offer.attributes">
          <img :src="offer.attributes.pictures.data[0].attributes.url" alt="photo de l'offre" />
          <div class="details">
            <h3>{{ offer.attributes.title }}</h3>
            <p>{{ offer.attributes.price }} €</p>
            <p>{{ offer.attributes.createdAt }}</p>
            <p>{{ offer.attributes.description }}</p>
            <p>Localisation</p>
          </div>
        </div>
        <div v-else>Chargement de l'offre...</div>
      </section>
      <section class="userInfo"></section>
    </section>
  </main>
</template>
<style scoped>
.offerInfo {
  border: solid 2px blue;
  display: flex;
  padding: 30px;
  gap: 50px;
}

.offerDetails {
  border: solid 2px green;
  width: 80%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.offerDetails img {
  width: 600px;
  height: 450px;
  object-fit: cover;
  margin: 0 100px;
}
.details {
  border: solid 2px red;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  min-height: 400px;
  padding: 30px 0;
}
.userInfo {
  border: solid 2px orange;
  width: 50%;
  height: 100vh;
}
</style>
