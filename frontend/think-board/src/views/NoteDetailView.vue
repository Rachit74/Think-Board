<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;

</script>

<template>
    <div>
        <h1>Note Page {{ id }}</h1>
    </div>
</template>