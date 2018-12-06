<template>
    <div class="war-wrapper">
        left:
        x:<input v-model="left.x" type="text"/>y:<input v-model="left.y" type="text"/>

        right:
        x:<input v-model="right.x" type="text"/>y:<input v-model="right.y" type="text"/>
        <button @click="save">save</button>
        <button @click="start">start</button>
        <div class="toolWrapper">
            <div class="tool" v-for="(value, index) in tools" draggable="true" @dragstart="dragstart(value, $event)">
                <div>{{value.name}}</div>
                <div>damage: {{value.damage}}</div>
                <div>range: {{value.range}}</div>
                <div>hp: {{value.hp}}</div>
            </div>
        </div>
        <div>
            <div class="left">
                <div class="flexWrapper">
                    <div v-for="(row, index1) in left.data" class="row">
                        <div class="item" v-if="Array.isArray(row)" v-for="(item, index2) in row">
                            <input v-if="isEdit('left', index1, index2)" v-model="value" @blur="blur" type="text"/>
                            <div v-else class="content" @click="edit('left', index1, index2)" @dragover.prevent @drop="drop('left', index1, index2, $event)">
                                <div v-if="!item">null</div>
                                <div v-else>
                                    <div>{{item.name}}</div>
                                    <div>damage: {{item.damage}}</div>
                                    <div>range: {{item.range}}</div>
                                    <div>hp: {{item.hp}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="flexWrapper" style="flex-direction: row;">
                    <div v-for="(row, index1) in right.data" class="row">
                        <div class="item" v-if="Array.isArray(row)" v-for="(item, index2) in row">
                            <input v-if="isEdit('right', index1, index2)" v-model="value" @blur="blur" type="text"/>
                            <div v-else class="content" @click="edit('right', index1, index2)" @dragover.prevent @drop="drop('right', index1, index2, $event)">{{item ? item.name : 'null'}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tools: [
                {
                    name: 'plane',
                    damage: 100,
                    range: 3,
                    hp: 500,
                },
                {
                    name: 'tank',
                    damage: 100,
                    range: 2,
                    hp: 1000,
                },
                {
                    name: 'soldier',
                    damage: 50,
                    range: 1,
                    hp: 100,
                }
            ],
            editData: {
                type: '',
                x: undefined,
                y: undefined,
            },
            left: {
                x: 5,
                y: 5,
                data: [],
            },
            right: {
                x: 5,
                y: 5,
                data: [],
            },
            value: '',
        }
    },
    created() {
        this.init();
        this.$watch(() => this.left.x+this.left.y, () => {
            this.createItems(this.left)
        });
        this.$watch(() => this.right.x+this.right.y, () => {
            this.createItems(this.right)
        });
    },
    methods: {
        start() {
            const tempLeft = {
                x: 0,
                y: 0,
                done: false,
            };
            const tempRight = {
                x: 0,
                y: 0,
                done: false,
            };

        },
        fire(coords, self, enemy){
            const selfItem = this.getItem(self.data, coords.x, coords.y);
            const random = getRamdom(enemy.x, enemy.y);
            const enemyItem = this.getItem(enemy.data, random.x, random.y);
        },
        getItem(data, x, y) {
            return data[x][y];
        },
        getRangeItems(item, data, x, y, range) {
            const offset = range - 1;
            const result = [];
            for(let i = 0; i < item.x; i++){
                for(let j = 0; j < item.y; j++){
                    if(i >= x - offset && i <= x + offset) {
                        if(j >= y - offset && j <= y + offset)
                            result.push(data[i][j]);
                    }
                }
            }
        },
        getRamdom(x, y) {
            const _x = Math.floor(Math.random()*x);
            const _y = Math.floor(Math.random()*y);
            return [_x, _y];
        },
        drop(type, x, y, ev){
            ev.preventDefault();
            const value = JSON.parse(ev.dataTransfer.getData("tool"));
            this.setData(type, x, y, value);
        },
        dragstart(tool, ev) {
            ev.dataTransfer.setData("tool", JSON.stringify(tool));
        },
        edit(type, x, y) {
            this.editData.type = type;
            this.editData.x = x;
            this.editData.y = y;
        },
        blur(e) {
            this[this.editData.type].data[this.editData.x][this.editData.y] = this.value;
            this.resetEdit();
        },
        setData(type, x, y, value) {
            this[type].data[x][y] = value;
            this.$forceUpdate();
        },
        resetEdit() {
            this.value = '';
            this.editData = {
                type: '',
                x: undefined,
                y: undefined,
            };
        },
        isEdit(type, x, y){
            return type === this.editData.type && x === this.editData.x && y === this.editData.y;
        },
        init() {
            this.createItems(this.left);
            this.createItems(this.right);
        },
        createItems(block) {
            block.data = Array.from({length: block.y}, (v, i) => i);
            block.data.forEach((item, index) => {
                block.data[index] = Array.from({length: block.x}, (v, i) => 0);
            });
        },
        save() {
            const data = { left: this.left, right: this.right};
            localStorage.setItem('war', JSON.stringify(data));
        }
    }
}
</script>
<style>
.war-wrapper {
    width: 100%;
}
.left {
    float: left;
    width: 50%;
    box-sizing: border-box;
    padding: 20px;
    border: 1px solid red;
    /* background: #f66; */
}
.right {
    float: right;
    width: 50%;
    box-sizing: border-box;
    padding: 20px;
    border: 1px solid blue;
    /* background: #66f; */
}
.flexWrapper{
    display: flex;
    justify-content: space-around;
    flex-direction: row-reverse;
}
.row {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
}
.item {
    float: left;
    margin: 5px;
    box-sizing: content-box;
    cursor: pointer;
}
.content{
    padding: 30px;
    background: #faa;
}
.tool{
    display: inline-block;
    background: #aff;
    width: 80px;
    padding: 10px;
    margin: 10px;
}
.toolWrapper{
    margin: 10px;
    padding: 10px;
    border: 1px solid #333;
}
</style>
