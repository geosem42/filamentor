<script setup>
defineProps({
    content: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div v-html="content.text"></div>
</template>
