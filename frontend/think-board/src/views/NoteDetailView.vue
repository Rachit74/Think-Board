<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const router = useRouter()
const route = useRoute()
const id = route.params.id

const note = ref({})
const loading = ref(true)
const error = ref(null)

const title = ref('')
const content = ref('')

const fetchNote = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/notes/${id}`)
    note.value = response.data

    // preload form values
    title.value = note.value.title
    content.value = note.value.content
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

const updateNote = async () => {
  try {
    await axios.put(`http://localhost:8000/api/notes/${id}`, {
      title: title.value,
      content: content.value
    })

    await fetchNote()
    router.push(`/note/${id}`)
  } catch (err) {
    error.value = err
  }
}

onMounted(fetchNote)
</script>

<template>
  <div class="container mt-4">
    <h1 class="mb-4">Note Details</h1>

    <p v-if="loading" class="text-muted">Loading...</p>

    <div v-else-if="error" class="alert alert-danger">
      {{ error.message }}
    </div>

    <div v-else class="row">
      <!-- Note display -->
      <div class="col-md-6 mb-4">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">{{ note.title }}</h4>
            <p class="card-text">{{ note.content }}</p>
          </div>
        </div>
      </div>

      <!-- Edit form -->
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mb-3">Edit Note</h5>

            <form @submit.prevent="updateNote">
              <div class="mb-3">
                <label class="form-label">Title</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="title"
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Content</label>
                <textarea
                  class="form-control"
                  rows="5"
                  v-model="content"
                ></textarea>
              </div>

              <button type="submit" class="btn btn-primary">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
