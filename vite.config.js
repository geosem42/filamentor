import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: {
                'filamentor': 'resources/js/filamentor.js',
            },
            name: 'filamentor',
            fileName: 'filamentor'
        },
        outDir: 'dist',
        cssCodeSplit: true
    },
    css: {
        extract: true
    }
});
