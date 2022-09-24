import { createApp } from 'vue'
import './style.css'
import { createRouter, createWebHistory} from 'vue-router'
import CreateNFTCollection from './views/CreateNFT.vue'
import Home from './views/Home.vue'
import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/create-nft-collection', component: () => CreateNFTCollection },
  ]
})

createApp(App).use(router).mount('#app')
