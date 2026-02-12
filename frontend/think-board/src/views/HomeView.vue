<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

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

onMounted(getNotes);

</script>

<template>
    <div>
        <h1>Home Page</h1>
        <p v-if="loading">Loading...</p>
        <p v-else-if="error">{{ error }}</p>
        <div v-else v-for="note in notes" :key="note._id">
            <h2>{{ note.title }}</h2>
            <p>{{ note.content }}</p>
            <RouterLink :to="`/note/${note._id}`">Edit</RouterLink>
            |
            <RouterLink :to="`/delete/${note._id}`">Delete</RouterLink>
            {{ note._id }}
        </div>
    </div>
</template>