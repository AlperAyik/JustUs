<script setup>
const favorites = ref([]);
const loading = ref(true);

onMounted(() => {
  const navbarState = useState('navbarState')
  navbarState.value = "favorites"
})


onMounted(() => {
  favorites.value = JSON.parse(localStorage.getItem("favorites")) || [];
  console.log(favorites.value);

  setTimeout(() => {
    loading.value = false;
  }, 1000);
})
</script>

<template>
  <navbar></navbar>
<!--laat alle saved dates zien-->

  <div v-if="loading">
      <h1>Laden...</h1>
  </div>

  <div v-else>
    <div v-if="favorites.length > 0">
      <h1>Er zijn favorieten</h1>
    </div>
    <div v-else>
      <h1>Geen favorieten</h1>
    </div>
  </div>

</template>

<style scoped>

</style>