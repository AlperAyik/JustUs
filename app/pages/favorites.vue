<script setup>
const favorites = ref([]);

onMounted(() => {
  const navbarState = useState('navbarState')
  navbarState.value = "favorites"
})

onMounted(() => {
  favorites.value = JSON.parse(localStorage.getItem("favorites")) || [];
  console.log(favorites.value);
})
</script>

<template>
  <navbar></navbar>
<!--laat alle saved dates zien-->

  <div class="m-20" v-if="favorites.length > 0">
    <div class="grid grid-cols-4 lg:grid-cols-4 gap-10">
      <div v-for="favo in favorites" class="bg-amber-200 w-fit p-10 rounded-md">
        <NuxtLink :to="`/datePages/${favo.slug}`"><h1>{{favo.titel}}</h1></NuxtLink>
      </div>
    </div>
  </div>

  <div v-else>
    <h1>Geen favorieten</h1>
  </div>
</template>

<style scoped>

</style>