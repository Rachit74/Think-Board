<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const route = useRoute();
const id = route.params.id;

const note = ref({});
const loading = ref(true);
const error = ref(null);

const fetchNote = async () => {
    try {
        const response = await axios.get(`http://localhost:8000/api/notes/${id}`);
        note.value = response.data;
    } catch (err) {
        error.value = err;
    } finally {
        loading.value = false;
    }
}

onMounted(fetchNote);

</script>

<template>
    <div>
        <h1>Note Page</h1>
        <div>
            <p v-if="loading">Loading...</p>
            <p v-else-if="error">{{ error }}</p>
            <div v-else>
                <h2>{{ note.title }}</h2>
                <p>{{ note.content }}</p>
            </div>
        </div>
    </div>
</template>