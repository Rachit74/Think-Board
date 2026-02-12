<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const title = ref('')
const content = ref('')
const error = ref(null)
const loading = ref(false)

const createNote = async () => {
  try {
    loading.value = true
    await axios.post('http://localhost:8000/api/notes', {
      title: title.value,
      content: content.value
    })
    router.push('/')  // redirect home after creating
  } catch (err) {
    error.value = 'Failed to create note'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <h1>Create Page</h1>
    <p v-if="error">{{ error }}</p>
    <form @submit.prevent="createNote">
      <input v-model="title" type="text" placeholder="Title" />
      <textarea v-model="content" placeholder="Content"></textarea>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Creating...' : 'Create Note' }}
      </button>
    </form>
  </div>
</template>