<script setup>
import { computed } from 'vue'

const props = defineProps({
  avatar: String,
  username: String,
  picture: String,
  title: String,
  price: Number,
  date: String,
})

const newDate = computed(() => {
  if (!props.date) {
    return ''
  }
  return new Date(props.date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })
})
</script>
<template>
  <main>
    <section class="offerCard">
      <div>
        <img :src="avatar" alt="avatar du propriétaire" />
        <p>{{ username }}</p>
      </div>

      <img :src="picture" alt="image de l'article" />
      <h3>{{ title }}</h3>
      <p>{{ price }} €</p>
      <span>{{ newDate }}</span>
    </section>
  </main>
</template>
<style script>
.offerCard {
  /* border: solid 2px green; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 250px;
  height: 500px;
  margin: 10px 0;
  font-weight: bold;
  font-size: 18px;
}

.offerCard > div {
  display: flex;
  align-items: flex-end;
  gap: 10px;
}

.offerCard > div img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.offerCard div > p {
  font-size: 16px;
}

.offerCard > span {
  font-size: 14px;
  font-weight: normal;
  color: gray;
}

.offerCard > img {
  width: 100%;
  height: 60%;
  object-fit: cover;
  border-radius: 20px;
}
</style>
