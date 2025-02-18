<script setup>
defineProps({
    content: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <img :src="content.url" :alt="content.alt" class="w-full h-auto">
</template>
