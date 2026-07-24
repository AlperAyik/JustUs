<script setup>
import ScrollReveal from "scrollreveal";

const favorites = ref([]);
const loading = ref(true);

onMounted(() => {
  const navbarState = useState('navbarState');
  favorites.value = JSON.parse(localStorage.getItem("favorites")) || [];
  navbarState.value = "favorites"

  setTimeout(async () => {
    loading.value = false;

    await nextTick();
    ScrollReveal().reveal('.card', {
      delay: 250,
      distance: '50px',
      origin: 'bottom',
      duration: 500,
      reset: false
    });
  }, 1000);

  ScrollReveal().reveal('.justUs', {
    delay: 250,
    distance: '50px',
    origin: 'top',
    duration: 500,
    reset: false
  })
})
</script>

<template>
  <navbar></navbar>
  <div>
    <h1 class="justUs text-black text-5xl flex justify-center items-center mt-10 mb-10 font-mono">JustUs</h1>
  </div>
  <div v-if="loading" class="flex justify-center items-center mt-10 mb-10 font-mono">
    <h1>Laden...</h1>
  </div>

  <div v-else class="flex justify-center items-center mt-10 mb-10 font-mono">
    <div v-if="favorites.length > 0" class="grid grid-cols-3 gap-10 m-10">
      <div v-for="fav in favorites" :key="fav.id"
           style="background: #fffdf9; border-color: #ede5db;"
           class="card border rounded-2xl overflow-hidden hover:border-[#c9a96e] transition-colors">
        <div class="w-full h-36 overflow-hidden">
          <img :src="fav.foto" :alt="fav.titel" class="w-full h-full object-cover">
        </div>
        <div class="p-4 flex flex-col gap-2">
          <p style="color: #3a2f25;" class="font-medium text-sm">{{ fav.titel }}</p>
          <p style="color: #b8a89a;" class="text-xs leading-relaxed">{{ fav.beschrijving }}</p>
          <div class="flex items-center justify-between mt-auto pt-1">
            <div class="flex gap-1.5">
                    <span style="background: #f5f0eb; color: #8a7a6e; border-color: #e0d5c9;"
                          class="text-xs px-2 py-0.5 rounded-md border">{{ fav.prijsIndicatie }}</span>
              <span class="text-xs px-2 py-0.5 rounded-md border"
                    :style="fav.binnenbuitenshuis === 'binnen'
                            ? 'background: #fce8e8; color: #c47a7a; border-color: #f0cccc;'
                            : 'background: #e8f0e8; color: #7a9e7a; border-color: #ccdccc;'">
                      {{ fav.binnenbuitenshuis === 'binnen' ? 'Binnen' : 'Buiten' }}
                    </span>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <NuxtLink :to="`/datePages/${fav.slug}`"
                        style="color: #c9a96e; border-color: #e8ddd3;"
                        class="text-xs border rounded-lg px-2.5 py-1 hover:bg-[#f5f0eb] transition-colors">
                Bekijken
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h1>Geen favorieten</h1>
    </div>
  </div>

</template>

<style scoped>

</style>