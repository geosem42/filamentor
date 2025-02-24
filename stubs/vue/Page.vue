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
    <div class="container mx-auto max-w-7xl">
        <template v-for="row in layout" :key="row.id">
            <div class="grid mb-4" 
                :class="{
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
                    'grid-cols-12': row.columns.length === 12,
                    [row.customClasses]: !!row.customClasses
                }"
                :style="{
                    paddingTop: `${row.padding?.top || 0}px`,
                    paddingRight: `${row.padding?.right || 0}px`,
                    paddingBottom: `${row.padding?.bottom || 0}px`,
                    paddingLeft: `${row.padding?.left || 0}px`,
                    marginTop: `${row.margin?.top || 0}px`,
                    marginRight: `${row.margin?.right || 0}px`,
                    marginBottom: `${row.margin?.bottom || 0}px`,
                    marginLeft: `${row.margin?.left || 0}px`
                }">
                
                <template v-for="column in row.columns" :key="column.id">
                    <div :class="column.customClasses || ''"
                        :style="{
                            paddingTop: `${column.padding?.top || 0}px`,
                            paddingRight: `${column.padding?.right || 0}px`,
                            paddingBottom: `${column.padding?.bottom || 0}px`,
                            paddingLeft: `${column.padding?.left || 0}px`,
                            marginTop: `${column.margin?.top || 0}px`,
                            marginRight: `${column.margin?.right || 0}px`,
                            marginBottom: `${column.margin?.bottom || 0}px`,
                            marginLeft: `${column.margin?.left || 0}px`
                        }">
                        
                        <template v-for="(element, index) in column.elements" :key="index">
                            <component 
                                :is="getElementComponent(element.type)"
                                :content="element.content"
                            />
                        </template>
                    </div>
                </template>
            </div>
        </template>
    </div>
</template>
