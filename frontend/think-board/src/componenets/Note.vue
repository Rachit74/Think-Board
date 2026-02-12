<script setup>
defineProps({
  note: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete'])
</script>

<template>
  <div class="card mb-3">
    <div class="card-body">
      <h5 class="card-title">{{ note.title }}</h5>
      <p class="card-text">{{ note.content }}</p>

      <RouterLink
        :to="`/note/${note._id}`"
        class="btn btn-sm btn-outline-primary me-2"
      >
        Edit
      </RouterLink>

      <button
        class="btn btn-sm btn-outline-danger"
        @click="emit('delete', note._id)"
      >
        Delete
      </button>
    </div>
  </div>
</template>
