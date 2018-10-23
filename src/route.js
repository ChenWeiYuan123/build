import Index from './index.vue';
const cache = [];

function importAll(r) {
    r.keys().forEach((key) => cache.push(r(key).default));
}
importAll(require.context('.', true, /\.routes\.js/));
export default [
    {
        path: '/',
        component: Index,
        redirect: 'list',
        children: [
            ...cache,
        ]
    }
]