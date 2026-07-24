<script setup>
import ScrollReveal from "scrollreveal";

const state = useState('navbarState');
state.value = 'date';

const loading = ref(true)

const titelInput = ref('');
const linkInput = ref('');
const beschrijvingInput = ref('');
const categorieInput = ref('');
const naamLocatie = ref('');
const stad = ref('');
const regio = ref('');
const prijsIndicatie = ref('');
const prijsDetails = ref('');
const duurUren = ref(0);
const seizoen = ref([])
const binnenbuitenshuis = ref('')
const rating = ref(0);
const tags = ref([]);

function addSeizoen(season) {
  seizoen.value.push(season);
  console.log(seizoen.value);
}

function addTag(tag) {
  tags.value.push(tag);
}

function reset(a) {
  if(a === 't') {
    tags.value = [];
  } else if(a === 's') {
    seizoen.value = [];
  }

}

async function send() {
  try {
    await fetch('http://localhost:3001/dateIdeas', {
      method: 'POST',
      body: {
        titel: titelInput.value,
        slug: titelInput.value,
        foto: "https://images.unsplash.com/photo-1506617564039-2f3b650b7010?w=800",
        link: linkInput.value,
        beschrijving: beschrijvingInput.value,
        categorie: categorieInput.value,
        locatie: {
          naam: naamLocatie.value,
          stad: stad.value,
          regio: regio.value,
        },
        prijsIndicatie: prijsIndicatie.value,
        prijsDetails: prijsDetails.value,
        duurUren: duurUren.value,
        seizoen: seizoen.value,
        binnenbuitenshuis: binnenbuitenshuis.value,
        rating: rating.value,
        tags: tags.value,
      }
    })
  } catch (e) {
    console.log(e);
  }
}

onMounted(() => {
  setTimeout( () => {
    loading.value = false
  }, 1000)

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

  <div class="flex justify-center items-center mt-10 mb-10 font-mono" v-if="!loading">
    <form @submit.prevent="send" class="bg-[#fffdf9] p-10 border rounded-md border-[#ede5db]">
      <div>
        <div class="grid grid-cols-4">
          <label for="">Titel:</label>
          <input type="text" placeholder="Bioscoop..." class="pl-2">
          <label for="">Link:</label>
          <input type="text" placeholder="https://..." class="pl-2">
        </div>
        <div class="grid grid-cols-2 gap-2 mt-10">
          <div class="grid grid-cols-">
            <label for="">Beschrijving:</label>
            <textarea placeholder="Beschrijving..." class="border border-black rounded-md h-full"></textarea>
          </div>
          <div>
            <label for="">Categorie:</label>
            <span v-for="cat in ['natuur', 'eten', 'spelletjes', 'film', 'autokino', 'creatief']"
                  class="m-2 cursor-pointer border border-black p-2 rounded-md grid grid-cols-1"
                  @click="categorieInput = cat"
                  :style="categorieInput === cat ? 'background: #c9a96e; border-color: #c9a96e; color: #fffdf9;'
                  : 'background: #f5f0eb; border-color: #e0d5c9; color: #8a7a6e;'"
            >{{ cat }}</span>
          </div>
        </div>
        <div>
        </div>
      </div>
      <div class="w-full border-0 border-b border-black mt-10"></div>
      <div>
        <div class="mt-5">
          <label for="" class="text-xl">Locatie:</label>
          <div class="grid grid-cols-3 gap-3 mt-2">
            <input type="text" class="border border-black p-2 rounded-md grid grid-cols-1" placeholder="locatie naam">
            <input type="text" class="border border-black p-2 rounded-md grid grid-cols-1" placeholder="stad">
            <input type="text" class="border border-black p-2 rounded-md grid grid-cols-1" placeholder="regio">
          </div>
        </div>
        <div class="mt-5">
          <label for="" class="text-xl">Date info:</label>
          <div class="mt-2">
            <label for="">Prijs indicatie:</label>
            <div class="grid grid-cols-3 gap-3 mt-2">
            <span v-for="price in ['€', '€€', '€€€']"
                  class="m-2 cursor-pointer border border-black p-2 rounded-md grid grid-cols-1"
                  @click="prijsIndicatie = price"
                  :style="prijsIndicatie === price ? 'background: #c9a96e; border-color: #c9a96e; color: #fffdf9;'
                  : 'background: #f5f0eb; border-color: #e0d5c9; color: #8a7a6e;'">{{price}}</span>
            </div>
          </div>
          <div class="mt-5 grid grid-cols-2">
            <label>prijsDetails:</label>
            <div>
              <input type="text" placeholder="kosten 50eu voor 2 per">
            </div>
          </div>
          <div class="mt-5">
            <div class="grid grid-cols-2 gap-2 mt-2">
              <div class="grid grid-cols-2">
                <label for="">Seizoen:</label>
                <button class="bg-[#c9a96e] border-[#c9a96e] text-[#fffdf9] rounded-md cursor-pointer hover:bg-olive-500 duration-500" @click="reset('s')">reset seizoenen</button>
              </div>
              <div class="grid grid-cols-2">
                <label for="">Tags:</label>
                <button class="bg-[#c9a96e] border-[#c9a96e] text-[#fffdf9] rounded-md cursor-pointer hover:bg-olive-500 duration-500" @click="reset('t')">reset tags</button>
              </div>
            </div>
            <div class="grid grid-cols-2">
              <div>
                <span v-for="s in ['zomer', 'lente', 'winter', 'herfst']"
                      class="m-2 cursor-pointer border border-black p-2 rounded-md grid grid-cols-1"
                      @click="addSeizoen(s)"
                      :style="seizoen.includes(s) ? 'background: #c9a96e; border-color: #c9a96e; color: #fffdf9;'
                  : 'background: #f5f0eb; border-color: #e0d5c9; color: #8a7a6e;'"
                >{{s}}</span>
              </div>
              <div>
                <span v-for="t in ['romantisch', 'gratis', 'ontspannend', 'actief', 'culinair', 'gezellig', 'retro', 'film', 'avontuurlijk']"
                      class="m-2 cursor-pointer border border-black p-2 rounded-md grid grid-cols-1"
                      @click="addTag(t)"
                      :style="tags.includes(t) ? 'background: #c9a96e; border-color: #c9a96e; color: #fffdf9;'
                  : 'background: #f5f0eb; border-color: #e0d5c9; color: #8a7a6e;'"
                >{{t}}</span>
              </div>
            </div>
            <div class="mt-5">
              <div class="grid grid-cols-3">
                <label for="">Binnenbuitenshuis:</label>
                <label for="">Rating:</label>
                <label for="">Duur Uren:</label>
              </div>
              <div class="grid grid-cols-3">
                <div>
                  <span v-for="b in ['binnen', 'buiten']"
                        class="m-2 cursor-pointer border border-black p-2 rounded-md grid grid-cols-1"
                        @click="binnenbuitenshuis = b"
                        :style="binnenbuitenshuis === b ? 'background: #c9a96e; border-color: #c9a96e; color: #fffdf9;'
                  : 'background: #f5f0eb; border-color: #e0d5c9; color: #8a7a6e;'"
                  >{{b}}</span>
                </div>
                <div>
                  <span v-for="r in [1,2,3,4,5,6,7,8,9,10]"
                        class="m-2 cursor-pointer border border-black p-2 rounded-md grid grid-cols-1"
                        @click="rating = r"
                        :style="rating === r ? 'background: #c9a96e; border-color: #c9a96e; color: #fffdf9;'
                  : 'background: #f5f0eb; border-color: #e0d5c9; color: #8a7a6e;'"
                  >{{r}}</span>
                </div>
                <div>
                  <span v-for="t in [2,3,4,5,6,8,10]"
                        class="m-2 cursor-pointer border border-black p-2 rounded-md grid grid-cols-1"
                        @click="duurUren = t"
                        :style="duurUren === t ? 'background: #c9a96e; border-color: #c9a96e; color: #fffdf9;'
                  : 'background: #f5f0eb; border-color: #e0d5c9; color: #8a7a6e;'"
                  >{{t}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-10">
        <button class=" bg-[#c9a96e] border-[#c9a96e] text-[#fffdf9] rounded-md cursor-pointer p-2 w-100 hover:bg-olive-500 duration-500">Submit</button>
      </div>
    </form>
  </div>
  <div v-else>
    <h1 class="flex justify-center items-center mt-10 mb-10 font-mono">Laden...</h1>
  </div>
</template>

<style scoped>

</style>