import '../css/filamentor.css';
import Sortable from 'sortablejs';

console.log('Filamentor loaded!');

window.addEventListener('alpine:init', () => {
    console.log('Alpine init event fired!');
    
    Alpine.data('filamentor', () => {
        console.log('Component definition called');
        return {
            init() {
                console.log('Filamentor initialized from JS!');
                
                new Sortable(document.getElementById('rows-container'), {
                    animation: 150,
                    handle: '.row-handle',
                    ghostClass: 'sortable-ghost',
                });
            }
        };
    });
});
