<template>
    <div>
        {{result}}
        <button @click="start">start</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            result: 'undefined',
            data: {
                medicine: {
                    A: 10,
                    B: 6,
                    C: 3,
                    D: 1,
                },
                food: {
                    A: 10,
                    B: 6,
                    C: 3,
                    D: 1,
                },
                energe: {
                    A: 10,
                    B: 4,
                    C: 3,
                    D: 2,
                    E: 1
                },
                develop: {
                    A: 10,
                    B: 6,
                    C: 3,
                    D: 1,
                },
            }
        }
    },
    methods: {
        start() {
            const list = [];
            for( let type in this.data ) {
                const item = this.data[type];
                for(let level in item) {
                    const value = item[level];
                    this.push(list, value, type+'-'+level);
                }
            }
            this.shuffle(list);
            const index = Math.floor(Math.random()*list.length);
            this.result = list[index];
            console.log(list,this.result);
        },
        push(list, len, item) {
            while(len > 0) {
                list.push(item);
                len--;
            }
        },
        shuffle(arr) {
            let i = arr.length;
            while (i) {
                let j = Math.floor(Math.random() * i--);
                [arr[j], arr[i]] = [arr[i], arr[j]];
            }
        }
    }
}
</script>
<style>

</style>