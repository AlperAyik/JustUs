<script setup>
const dates = ref([]);
const filterData = ref([]);

const searchbar = ref('');
const priceIndication = ref('all');
const location = ref('all');
const seizoen = ref('all');
const tijd = ref('all');

const loading = ref(true);
const state = ref(
    {
      input: '',
      price: priceIndication.value,
      location: location.value,
      season: seizoen.value,
      tijdsduur: tijd.value,
    }
)

// localstorage
const favorites = ref([]);

// functions
function addToState() {
  state.value = {
    input: searchbar.value,
    price: priceIndication.value,
    location: location.value,
    season: seizoen.value,
    tijdsduur: tijd.value,
  }

  filterDates()
  loading.value = true
}

function filterDates() {
  setTimeout(() => {
    loading.value = false
  }, 500)
  if (state.value.searchbar === '' && state.value.price === 'all' && state.value.location === 'all') {
    filterData.value = dates.value
  } else {
    const filterSearchbar = dates.value.filter((date) => date.titel.toLowerCase().includes(state.value.input.toLowerCase()));
    const filterPrice = filterSearchbar.filter((date) => date.prijsIndicatie === state.value.price || state.value.price === 'all');
    const filterLocation = filterPrice.filter((date) => date.binnenbuitenshuis === state.value.location || state.value.location === 'all');
    const filterSeason = filterLocation.filter((date) => date.seizoen.includes(state.value.season) || state.value.season === 'all');
    const filterUren = filterSeason.filter((date) => date.duurUren === state.value.tijdsduur || state.value.tijdsduur === 'all');

    filterData.value = filterUren
  }
}

function randomDate() {
  const random = Math.floor(Math.random() * dates.value.length);
  const datesRando = dates.value[random];

  state.value = {
    input: datesRando.titel,
    price: datesRando.prijsIndicatie,
    location: datesRando.binnenbuitenshuis,
    season: 'all',
    tijdsduur: datesRando.duurUren,
  }

  loading.value = true
  filterDates();
}

function saveFavorites(date) {
    const exsits = favorites.value.find((item) => item.id === date.id);

    if(!exsits) {
      favorites.value.push(date)
    } else {
      favorites.value.splice(favorites.value.indexOf(date), 1)
    }
}

function reset() {
  state.value = {
    input: '',
    price: 'all',
    location: 'all',
    season: 'all',
    tijdsduur: 'all',
  }

  loading.value = true
  filterDates();
}

// onMounted, computed, watch
onMounted(async () => {
  try {
    dates.value = await $fetch('http://localhost:3001/dateIdeas');
    favorites.value = JSON.parse(localStorage.getItem('favorites')) || [];

    setTimeout(() => {
      loading.value = false;
    }, 500)
    filterData.value = dates.value
  } catch (e) {
    console.log(e)
  }

})


watch(favorites, (newValue) => {
  localStorage.setItem('favorites', JSON.stringify(newValue));
}, {deep: true})
</script>

<template>
  <div class="min-h-screen font-mono" style="background: #f5f0eb;">

    <div style="background: #fffdf9; border-bottom: 1px solid #ede5db;"
         class="px-8 py-6 flex items-center justify-between">
      <div>
        <h1 style="color: #3a2f25;" class="text-2xl font-medium">Date ideeën</h1>
        <p style="color: #b8a89a;" class="text-sm mt-0.5">Vind de perfecte avond samen</p>
      </div>
      <div class="grid grid-cols-2 gap-5">
        <button @click="reset"
                style="background: #c9a96e; color: #fffdf9;"
                class="gap-2 px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer">
          Reset
        </button>
        <button @click="randomDate"
                style="background: #c9a96e; color: #fffdf9;"
                class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer">
          ✦ Verras me
        </button>
      </div>

    </div>

    <div class="flex ">

      <aside style="background: #fffdf9; border-right: 1px solid #ede5db; width: 240px; min-width: 240px;"
             class="p-6 flex flex-col gap-6 min-h-screen">

        <div class="flex flex-col gap-2">
          <label style="color: #b8a89a;" class="text-xs uppercase tracking-widest font-medium">Zoeken</label>
          <input v-model="searchbar" @keyup.enter="addToState" type="text" placeholder="Zoek een date..."
                 style="background: #f5f0eb; border-color: #e8ddd3; color: #4a3f35;"
                 class="w-full px-3 py-2 border rounded-xl text-sm placeholder-[#c8b8aa]">
        </div>

        <div style="height: 1px; background: #ede5db;"></div>

        <div class="flex flex-col gap-2">
          <label style="color: #b8a89a;" class="text-xs uppercase tracking-widest font-medium">Prijs</label>
          <div class="flex flex-wrap gap-2">
            <button v-for="p in ['all', '€', '€€', '€€€']" :key="p"
                    @click="priceIndication = p; addToState()"
                    :style="priceIndication === p
                      ? 'background: #c9a96e; border-color: #c9a96e; color: #fffdf9;'
                      : 'background: #f5f0eb; border-color: #e0d5c9; color: #8a7a6e;'"
                    class="px-3 py-1 rounded-full border text-xs transition-all">
              {{ p === 'all' ? 'Alle' : p }}
            </button>
          </div>
        </div>

        <div style="height: 1px; background: #ede5db;"></div>

        <div class="flex flex-col gap-2">
          <label style="color: #b8a89a;" class="text-xs uppercase tracking-widest font-medium">Locatie</label>
          <div class="flex flex-wrap gap-2">
            <button v-for="l in ['all', 'binnen', 'buiten']" :key="l"
                    @click="location = l; addToState()"
                    :style="location === l
                      ? 'background: #c9a96e; border-color: #c9a96e; color: #fffdf9;'
                      : 'background: #f5f0eb; border-color: #e0d5c9; color: #8a7a6e;'"
                    class="px-3 py-1 rounded-full border text-xs transition-all">
              {{ l === 'all' ? 'Alle' : l.charAt(0).toUpperCase() + l.slice(1) }}
            </button>
          </div>
        </div>

        <div style="height: 1px; background: #ede5db;"></div>
        <div class="flex flex-col gap-2">
          <label style="color: #b8a89a;" class="text-xs uppercase tracking-widest font-medium">Seizoen</label>
          <div class="flex flex-wrap gap-2">
            <button v-for="s in ['all', 'lente', 'zomer', 'herfst', 'winter']" :key="s"
                    @click="seizoen = s; addToState()"
                    :style="seizoen === s
                        ? 'background: #c9a96e; border-color: #c9a96e; color: #fffdf9;'
                        : 'background: #f5f0eb; border-color: #e0d5c9; color: #8a7a6e;'"
                    class="px-3 py-1 rounded-full border text-xs transition-all">
              {{ s === 'all' ? 'Alle' : s.charAt(0).toUpperCase() + s.slice(1) }}
            </button>
          </div>
        </div>

        <div style="height: 1px; background: #ede5db;"></div>

        <div class="flex flex-col gap-2">
          <label style="color: #b8a89a;" class="text-xs uppercase tracking-widest font-medium">Tijdsduur</label>
          <div class="flex flex-wrap gap-2">
            <button v-for="s in ['all', 2, 3, 4, 5, 6, 8, 10]" :key="s"
                    @click="tijd = s; addToState()"
                    :style="tijd === s
                      ? 'background: #c9a96e; border-color: #c9a96e; color: #fffdf9;'
                      : 'background: #f5f0eb; border-color: #e0d5c9; color: #8a7a6e;'"
                    class="px-3 py-1 rounded-full border text-xs transition-all">
              {{ s === 'all' ? 'Alle' : s }}
            </button>
          </div>
        </div>
      </aside>

      <main class="flex-1 p-6">

        <div v-if="loading" class="flex justify-center items-center mt-20">
          <p style="color: #b8a89a;">Laden...</p>
        </div>

        <div v-else>
          <p style="color: #b8a89a;" class="text-sm mb-4">{{ filterData.length }} resultaten gevonden</p>

          <div v-if="filterData.length >= 1"
               class="grid grid-cols-3 lg:grid-cols-4 gap-4">
            <div v-for="idea in filterData" :key="idea.id"
                 style="background: #fffdf9; border-color: #ede5db;"
                 class="border rounded-2xl overflow-hidden hover:border-[#c9a96e] transition-colors">
              <div class="w-full h-36 overflow-hidden">
                <img :src="idea.foto" :alt="idea.titel" class="w-full h-full object-cover">
              </div>
              <div class="p-4 flex flex-col gap-2">
                <p style="color: #3a2f25;" class="font-medium text-sm">{{ idea.titel }}</p>
                <p style="color: #b8a89a;" class="text-xs leading-relaxed">{{ idea.beschrijving }}</p>
                <div class="flex items-center justify-between mt-auto pt-1">
                  <div class="flex gap-1.5">
                    <span style="background: #f5f0eb; color: #8a7a6e; border-color: #e0d5c9;"
                          class="text-xs px-2 py-0.5 rounded-md border">{{ idea.prijsIndicatie }}</span>
                    <span class="text-xs px-2 py-0.5 rounded-md border"
                          :style="idea.binnenbuitenshuis === 'binnen'
                            ? 'background: #fce8e8; color: #c47a7a; border-color: #f0cccc;'
                            : 'background: #e8f0e8; color: #7a9e7a; border-color: #ccdccc;'">
                      {{ idea.binnenbuitenshuis === 'binnen' ? 'Binnen' : 'Buiten' }}
                    </span>
                  </div>
                  <div class="grid grid-cols-2 gap-2">
                    <button @click="saveFavorites(idea)" style="color: #c9a96e; border-color: #e8ddd3;" class="text-xs border rounded-lg px-2.5 py-1 hover:bg-[#f5f0eb] transition-colors cursor-pointer">Save <!--make this computed check if saved make unsave if not saved do save--> </button>
                    <NuxtLink :to="`/datePages/${idea.slug}`"
                              style="color: #c9a96e; border-color: #e8ddd3;"
                              class="text-xs border rounded-lg px-2.5 py-1 hover:bg-[#f5f0eb] transition-colors">
                      Bekijken
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="flex flex-col items-center justify-center mt-16 gap-4">
            <img src="/empty_state_date_illustration.svg" alt="Geen resultaten" class="w-250 opacity-90">
          </div>
        </div>

      </main>
    </div>

  </div>
</template>

<style scoped>

</style>