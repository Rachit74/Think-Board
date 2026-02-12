import { createRouter, createWebHistory } from 'vue-router'
import CreateView from '@/views/CreateView.vue'
import HomeView from '@/views/HomeView.vue'
import NoteDetailView from '@/views/NoteDetailView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/create', component: CreateView },
  { path: '/note/:id', component: NoteDetailView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router