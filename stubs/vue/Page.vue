<script setup>
import { Head } from '@inertiajs/vue3'
import TextElement from '@/Components/Elements/TextElement.vue'
import ImageElement from '@/Components/Elements/ImageElement.vue'
import VideoElement from '@/Components/Elements/VideoElement.vue'

const props = defineProps({
    layout: {
        type: Array,
        required: true
    },
    title: {
        type: String,
        required: true
    }
})

const getElementComponent = (type) => {
    const elementMap = {
        'Geosem42\\Filamentor\\Elements\\Text': TextElement,
        'Geosem42\\Filamentor\\Elements\\Image': ImageElement,
        'Geosem42\\Filamentor\\Elements\\Video': VideoElement
    }
    return elementMap[type]
}
</script>

<template>
    <Head :title="title" />
    <div class="container mx-auto px-4 max-w-7xl">
        <template v-for="row in layout" :key="row.id">
            <div class="grid gap-4 mb-4" :class="{
                'grid-cols-1': row.columns.length === 1,
                'grid-cols-2': row.columns.length === 2,
                'grid-cols-3': row.columns.length === 3,
                'grid-cols-4': row.columns.length === 4,
                'grid-cols-5': row.columns.length === 5,
                'grid-cols-6': row.columns.length === 6,
                'grid-cols-7': row.columns.length === 7,
                'grid-cols-8': row.columns.length === 8,
                'grid-cols-9': row.columns.length === 9,
                'grid-cols-10': row.columns.length === 10,
                'grid-cols-11': row.columns.length === 11,
                'grid-cols-12': row.columns.length === 12
            }">
                <template v-for="column in row.columns" :key="column.id">
                    <div class="p-4">
                        <component 
                            v-if="column.elements.length"
                            :is="getElementComponent(column.elements[0].type)"
                            :content="column.elements[0].content"
                        />
                    </div>
                </template>
            </div>
        </template>
    </div>
</template>
