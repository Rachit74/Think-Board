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
    router.push('/')
  } catch (err) {
    error.value = 'Failed to create note'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container mt-4">
    <h1 class="mb-4">Create Note</h1>

    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div class="card">
      <div class="card-body">
        <form @submit.prevent="createNote">
          <div class="mb-3">
            <label class="form-label">Title</label>
            <input
              v-model="title"
              type="text"
              class="form-control"
              placeholder="Enter title"
              required
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Content</label>
            <textarea
              v-model="content"
              class="form-control"
              rows="5"
              placeholder="Enter content"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            class="btn btn-primary"
            :disabled="loading"
          >
            {{ loading ? 'Creating...' : 'Create Note' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
