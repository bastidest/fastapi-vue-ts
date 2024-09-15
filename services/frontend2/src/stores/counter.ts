import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import OpenAPIClientAxios from 'openapi-client-axios';

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  const api = new OpenAPIClientAxios({ definition: 'http://localhost:5000/openapi.json', withServer: {url: 'http://localhost:5000/'}});
  api.init();

  const helloWorldString = ref('');

  async function loadHelloWorld() {
    const client = await api.getClient();
    try {
      const res = await client.getHelloWorld();
      helloWorldString.value = res.data;
    } catch(e) {
      console.error(e);
    }
  }

  return { count, doubleCount, increment, loadHelloWorld, helloWorldString }
})
