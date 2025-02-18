<script setup>
import { computed } from 'vue'

const props = defineProps({
    content: {
        type: Object,
        required: true
    }
})

const videoUrl = computed(() => {
    return props.content.url.replace('watch?v=', 'embed/')
})
</script>

<template>
    <div class="aspect-video">
        <iframe 
            :src="videoUrl"
            class="w-full h-full"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
        </iframe>
    </div>
</template>
