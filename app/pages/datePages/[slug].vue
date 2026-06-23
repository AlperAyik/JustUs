<script setup>
const route = useRoute();
const date = ref({});

const {data} = await useFetch('http://localhost:3001/dateIdeas')

const findItem = ref('')

const slug = data.value.filter((item) => item.slug === route.params.slug);
date.value = slug;
const dates = date.value?.[0]

onMounted(() => {
  const local = JSON.parse(localStorage.getItem('favorites')) || [];
  findItem.value = local.filter((item) => item.titel === dates.titel);
  console.log(findItem.value);
})

const loading = ref(true);
setTimeout(() => {
  loading.value = false;
}, 1000)

const saved = computed(() => {
  if (findItem.value >= 1) {
    return "border: 1px solid black;\n" +
        "  width: 50px;\n" +
        "  height: 50px;\n" +
        "  border-top-left-radius: 50%;\n" +
        "  border-top-right-radius: 50%;\n" +
        "  border-bottom-left-radius: 100%;\n" +
        "  border-bottom-right-radius: 100%;\n" +
        "  background-color: red;"
  } else {
    return "border: 1px solid black;\n" +
        "  width: 50px;\n" +
        "  height: 50px;\n" +
        "  border-top-left-radius: 50%;\n" +
        "  border-top-right-radius: 50%;\n" +
        "  border-bottom-left-radius: 100%;\n" +
        "  border-bottom-right-radius: 100%;\n" +
        "  background-color: white;"
  }
})
//voeg loading animation toe en check als deze date ook in favorites staat zo ja zet ergens deze date heb je al opgeslagen
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
             class="rounded-4xl shadow-2xl shadow-gray-500 hover:shadow-gray-700 ease-in-out duration-900">
      </div>
      <div>
        <div class="grid grid-cols-2 gap-10 bg-olive-200 p-10 rounded-4xl">
          <div class="">
            <h1 class="bg-stone-400 text-white p-2 rounded-md m-1" title="link naar website"><a :href="dates.link">Naam:
              {{ dates.locatie.naam }}</a></h1>
            <h1 class="bg-stone-400 text-white p-2 rounded-md m-1">Regio: {{ dates.locatie.regio }}</h1>
            <h1 class="bg-stone-400 text-white p-2 rounded-md m-1">Stad: {{ dates.locatie.regio }}</h1>
          </div>
          <div>
            <h1 class="bg-stone-400 text-white p-2 rounded-md m-1">Binnen/Buiten:
              {{ dates.binnenbuitenshuis.charAt(0).toUpperCase() + dates.binnenbuitenshuis.slice(1) }}</h1>
            <h1 class="bg-stone-400 text-white p-2 rounded-md m-1"><p id="saved" :style="saved"></p></h1>
          </div>
        </div>
      </div>

    </div>
  </div>
  <div v-else >
    <h1>Loading...</h1>
  </div>
</template>
<!--Date: {{findItem.length >= 1 ? "Saved" : "Not saved"}}, styling = test i will change it-->
<style scoped>

</style>