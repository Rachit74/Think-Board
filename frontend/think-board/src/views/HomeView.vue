<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Note from '@/componenets/Note.vue';

const notes = ref([]);
const loading = ref(true);
const error = ref(null);

const getNotes = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/notes');
        notes.value = response.data;
    } catch (err) {
        error.value = err;
    } finally {
        loading.value = false;
    }
}

const deleteNote = async (id) => {
    try {
        await axios.delete(`http://localhost:8000/api/notes/${id}`);
        notes.value = notes.value.filter(note => note._id !== id);
    } catch (err) {
        error.value = err
    }
}

onMounted(getNotes);

</script>

<template>
 <div class="container mt-4">
    <h1 class="mb-4">Home Page</h1>

    <p v-if="loading" class="text-muted">Loading...</p>
    <p v-else-if="error" class="text-danger">
      {{ error.message }}
    </p>

    <div v-else class="row">
      <div
        v-for="note in notes"
        :key="note._id"
        class="col-12 col-md-4"
      >
        <Note
          :note="note"
          @delete="deleteNote"
        />
      </div>
    </div>
  </div>
</template>