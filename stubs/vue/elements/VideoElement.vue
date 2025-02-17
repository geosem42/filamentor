<script>
export default {
    props: {
        content: {
            type: Object,
            required: true
        }
    },
    computed: {
        videoUrl() {
            return this.content.url.replace('watch?v=', 'embed/');
        }
    }
}
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
