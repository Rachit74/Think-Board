<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const router = useRouter();
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

const title = ref('');
const content = ref('');

const updateNote = async () => {
    try {
        await axios.put(`http://localhost:8000/api/notes/${id}`, {
            title: title.value,
            content: content.value,
        });
        await fetchNote();
        router.push(`/note/${id}`);
    } catch (err) {
        error.value = err;
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
        <!--  -->
        <!-- edit note form -->
         <div>
            <form @submit.prevent="updateNote">
                <input type="text" placeholder="Title" v-model="title">
                <textarea v-model="content" placeholder="Content"></textarea>
                <button type="submit">Save</button>
            </form>
         </div>
    </div>
</template>