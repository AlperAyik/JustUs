<script setup>
const route = useRoute();
const date = ref({});

const {data} = await useFetch('http://localhost:3001/dateIdeas')

// localStorage.removeItem('favorites')

const findItem = ref('')
const local = ref([]);
const savedText = ref('')
const loading = ref(true);
const toast = useToast();

const slug = data.value.filter((item) => item.slug === route.params.slug);
date.value = slug;
const dates = date.value?.[0]

onMounted(() => {
  local.value = JSON.parse(localStorage.getItem('favorites')) || [];
  findItem.value = local.value.filter((item) => item.titel === dates.titel);

  const navbarState = useState('navbarState')
  navbarState.value = ""
})

setTimeout(() => {
  loading.value = false;
}, 1000)

function removeSavedDate(date){
  const exsits = local.value.findIndex((item => item.id === date.id));
  if (exsits >= 0) {
    local.value.splice(exsits, 1)
    toast.add({
      title: 'Removing date',
      description: 'Date Removed Successfully',
      color: 'black',
      duration: 2000
    })
  } else {
    local.value.push(date)
    toast.add({
      title: "Added date",
      description: "Date Added Successfully",
      color: 'black',
      duration: 2000
    })
  }
  savedText.value = savedText.value === "opslaan" ? "verwijderen" : "opslaan";
}

const saved = computed(() => {
  if(savedText.value === "opslaan") {
    return "verwijderen"
  } else {
    return "opslaan"
  }
})

watch(findItem, (newVal, oldVal) => {
  if(findItem.value.length >= 1) {
    savedText.value = "Niet opgeslagen"
  } else {
    savedText.value = "Opgeslagen"
  }
})

watch(local, (newValue) => {
  localStorage.setItem('favorites', JSON.stringify(newValue));
}, {deep: true})
</script>

<template>
  <navbar></navbar>
  <div v-if="!loading" class="min-h-screen font-mono" style="background: #f5f0eb;">
    <div class="flex m-10 justify-center items-center text-4xl">
      <h1>{{ dates.titel }}</h1>
    </div>

    <div class="flex items-center justify-center gap-20 bg-stone-400 p-10">
      <div>
        <img :src="dates.foto" alt=""
             class="w-full h-full object-cover rounded-4xl shadow-2xl shadow-gray-500 hover:shadow-gray-700 ease-in-out duration-900">
      </div>
      <div>
        <div class="grid grid-cols-2 gap-10 bg-olive-200 p-10 rounded-4xl">
          <div class="">
            <h1 class="bg-stone-400 text-white p-2 rounded-md m-1 cursor-pointer" title="link naar website"><a :href="dates.link" class="text-blue-900 border-b-2">Naam:
              {{ dates.locatie.naam }}</a></h1>
            <h1 class="bg-stone-400 text-white p-2 rounded-md m-1">Regio: {{ dates.locatie.regio }}</h1>
            <h1 class="bg-stone-400 text-white p-2 rounded-md m-1">Stad: {{ dates.locatie.regio }}</h1>
          </div>
          <div>
            <h1 class="bg-stone-400 text-white p-2 rounded-md m-1">Binnen/Buiten:
              {{ dates.binnenbuitenshuis.charAt(0).toUpperCase() + dates.binnenbuitenshuis.slice(1) }}</h1>
            <h1 class="bg-stone-400 text-white p-2 rounded-md m-1">Date: {{savedText}}</h1>
            <div class="flex justify-center">
              <button @click="removeSavedDate(dates)" class="cursor-pointer bg-stone-400 rounded-md m-1 p-2 text-white flex hover:bg-stone-900 duration-500">{{ saved }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex justify-center items-center mt-20">
    <h1>Laden...</h1>
  </div>
</template>

<style scoped>

</style>