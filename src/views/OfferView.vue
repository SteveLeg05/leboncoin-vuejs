<script setup>
import { onMounted, ref, computed } from 'vue'
import axios from 'axios'

const offer = ref(null)

const props = defineProps({
  id: { required: true },
  date: String,
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

const newDate = computed(() => {
  if (!offer.value || !offer.value.attributes?.createdAt) return ''

  return new Date(offer.value.attributes.createdAt).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })
})
</script>
<template>
  <main>
    <section class="container offerInfo">
      <section class="offerDetails">
        <div v-if="offer && offer.attributes">
          <img :src="offer.attributes.pictures.data[0].attributes.url" alt="photo de l'offre" />
          <div class="details">
            <p class="title">{{ offer.attributes.title }}</p>
            <p class="price">{{ offer.attributes.price }} €</p>
            <p class="createdAt">{{ newDate }}</p>
            <div class="description">
              <p>Description :</p>
              <p>{{ offer.attributes.description }}</p>
            </div>

            <p class="localisation">
              <font-awesome-icon :icon="['fas', 'map-marker-alt']" /> Agon-Coutainville (50230)
            </p>
          </div>
        </div>
        <div v-else>Chargement de l'offre...</div>
      </section>
      <section class="userInfo">
        <section class="userDetails">
          <div v-if="offer && offer.attributes">
            <div class="user">
              <img
                :src="offer.attributes.owner?.data?.attributes?.avatar?.data?.attributes?.url"
                alt="avatar de l'utilisateur"
              />
              <p>{{ offer.attributes.owner.data.attributes.username }}</p>
            </div>
            <p>Pièce d'identité vérifiée</p>
            <p>Répond généralement en 1 heure</p>
          </div>
          <div v-else>Chargement des informations utilisateur...</div>
        </section>
      </section>
    </section>
  </main>
</template>
<style scoped>
.offerInfo {
  /* border: solid 2px blue; */
  display: flex;
  gap: 50px;
  margin-top: 30px;
}

.offerDetails {
  /* border: solid 2px green; */
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
  /* border: solid 2px red; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  min-height: 400px;
  padding: 30px 0;
}

.title {
  font-size: 28px;
  font-weight: bold;
}
.price {
  font-size: 22px;
  font-weight: bold;
}
.createdAt {
  font-size: 16px;
  color: gray;
}
.description {
  border-top: solid 1px rgb(212, 211, 211);
  border-bottom: solid 1px rgb(212, 211, 211);
  min-height: 120px;
  padding: 15px 0;
  width: 100%;
}
.description p:first-child {
  font-size: 18px;
  font-weight: bold;
}
.description p:last-child {
  font-size: 16px;
  margin-top: 10px;
}
.localisation {
  font-size: 18px;
  font-weight: bold;
}
.localisation svg {
  /* border: solid 2px purple; */
  font-size: 18px;
}
.userInfo {
  border: solid 2px orange;
  width: 60%;
  height: 100vh;
}
.userDetails {
  border: solid 2px green;
  height: 500px;
  padding: 15px;
}
.user {
  display: flex;
  gap: 20px;
}
.user img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.user p {
  font-size: 24px;
  font-weight: bold;
}
</style>
