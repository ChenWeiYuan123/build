<template>
    <div class="war-wrapper">
        left:
        x:<input v-model="left.x" type="text"/>y:<input v-model="left.y" type="text"/>

        right:
        x:<input v-model="right.x" type="text"/>y:<input v-model="right.y" type="text"/>
        <button @click="save">save</button>
        <div>
            time: <input v-model="time" type="text"/>
            auto: 
            <input type="radio" :value="true" v-model="auto"/>
            <input type="radio" :value="false" v-model="auto"/>
            {{auto}}
            <button @click="start">start</button>
            <button @click="next">next</button>
        </div>
        <p>{{message}}</p>
        <p>finish: {{finish}}</p>
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
                            <!-- <input v-if="isEdit('left', index1, index2)" v-model="value" @blur="blur" type="text"/> -->
                            <!-- <div v-else class="content" @click="edit('left', index1, index2)" @dragover.prevent @drop="drop('left', index1, index2, $event)"> -->
                            <div class="content" :class="{ self: isSelfItem('left', index1, index2), enemy: isEnemyItem('left', index1, index2) }" @dragover.prevent @drop="drop('left', index1, index2, $event)">
                                <div v-if="!item">null</div>
                                <div v-else>
                                    <div>{{item.name}}</div>
                                    <div style="color:#fff;" :style="{background: getBackground(item)}">
                                        damage: {{item.damage}}
                                        <div v-if="isEnemyItem('left', index1, index2)">
                                            -{{selfItem.damage}}
                                        </div>
                                    </div>
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
                            <!-- <input v-if="isEdit('right', index1, index2)" v-model="value" @blur="blur" type="text"/>
                            <div v-else class="content" @click="edit('right', index1, index2)" @dragover.prevent @drop="drop('right', index1, index2, $event)"> -->
                            <div class="content" :class="{ self: isSelfItem('right', index1, index2), enemy: isEnemyItem('right', index1, index2) }" @dragover.prevent @drop="drop('right', index1, index2, $event)">
                                <div v-if="!item">null</div>
                                <div v-else>
                                    <div>{{item.name}}</div>
                                    <div style="color:#fff;" :style="{background: getBackground(item)}">
                                        damage: {{item.damage}}
                                        <div v-if="isEnemyItem('right', index1, index2)">
                                            -{{selfItem.damage}}
                                        </div>
                                    </div>
                                    <div>range: {{item.range}}</div>
                                    <div>hp: {{item.hp}}</div>
                                </div>
                            </div>
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
                    damage: 50,
                    range: 3,
                    hp: 500,
                    full: 500,
                },
                {
                    name: 'tank',
                    damage: 50,
                    range: 2,
                    hp: 1000,
                    full: 1000,
                },
                {
                    name: 'soldier',
                    damage: 50,
                    range: 1,
                    hp: 100,
                    full: 100,
                }
            ],
            editData: {
                type: '',
                x: undefined,
                y: undefined,
            },
            left: {
                x: 3,
                y: 3,
                data: [],
            },
            right: {
                x: 3,
                y: 3,
                data: [],
            },
            selfItem: {},
            selfCoords: {
                x: 0,
                y: 0,
            },
            enemyItem: {},
            enemyCoords: {
                x: 0,
                y: 0,
                range: 0,
            },
            value: '',
            startType: '',
            enemyType: '',
            time: 500,
            message: '',
            finish: false,
            temp: {},
            auto: true,
        }
    },
    computed: {},
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
        getBackground(item) {
            const red = item.hp / item.full * 256;
            return 'rgb('+red+',0,0)'
        },
        isSelfItem(type, y, x) {
            return type === this.startType && x === this.selfCoords.x && y === this.selfCoords.y;
        },
        isEnemyItem(type, y, x) {
            return type === this.enemyType && this.isInRange(x, y, this.enemyCoords.x, this.enemyCoords.y, this.enemyCoords.range - 1);
        },
        start() {
            this.finish = false;
            const temp = {
                left: {
                    x: 0,
                    y: 0,
                    done: false,
                },
                right: {
                    x: 0,
                    y: 0,
                    done: false,
                },
            };
            this.temp = temp;
            this.startType = Math.random() > 0.5 ? 'left' : 'right';
            this.enemyType = this.getEnemyType(this.startType);
            this.recursion(temp);
        },
        recursion(temp) {
            // console.log(this.startType, this.enemyType);
            // console.log(temp[this.startType].x, temp[this.startType].y);
            if(!this.isValidCoords(temp, this.startType) && !this.isValidCoords(temp, this.enemyType)) {
                this.finish = true;
                return;
            }
            if(this.isValidCoords(temp, this.startType)) {
                this.fire(temp[this.startType], this[this.startType], this[this.enemyType]);
                if(temp[this.startType].x === this[this.startType].x - 1) {
                    temp[this.startType].y += 1;
                    temp[this.startType].x = 0;
                } else {
                    temp[this.startType].x += 1;
                }
            }
            if(this.auto) {
                setTimeout(() => {
                    this.next();
                }, this.time)
            }
        },
        next() {
            this.startType = this.getEnemyType(this.startType);
            this.enemyType = this.getEnemyType(this.startType);
            this.recursion(this.temp);
        },
        isValidCoords(temp, type) {
            const notDone = temp[type].x < this[type].x && temp[type].y < this[type].y;
            temp.done = !notDone;
            return notDone;
        },
        getEnemyType(type) {
            return type === 'left' ? 'right' : 'left';
        },
        fire(coords, self, enemy){
            this.selfCoords = {
                x: coords.x,
                y: coords.y,
            };
            this.selfItem = this.getItem(self.data, coords.x, coords.y);
            const random = this.getRamdom(enemy.x, enemy.y);
            this.enemyCoords = {
                x: random.x,
                y: random.y,
                range: this.selfItem.range,
            };
            console.log(random);
            this.enemyItem = this.selfItem.range > 1 ? this.getRangeItems(enemy, enemy.data, random.x, random.y, this.selfItem.range) : this.getItem(enemy.data, random.x, random.y);
            this.message = `
                            ${this.startType} VS ${this.enemyType}
                            name: ${this.selfItem.name || 'null'}
                            start: ${coords.x}  ${coords.y}
                            target: ${random.x}  ${random.y} 
                            range: ${this.selfItem.range || 0}
                            ` 
            if(Array.isArray(this.enemyItem)) {
                this.enemyItem.forEach(item => {
                    this.damage(this.selfItem, item)
                })
            } else {
                this.damage(this.selfItem, this.enemyItem)
            }
            this.$forceUpdate();
        },
        damage(self, enemy) {
            if(!enemy || !self || enemy.hp <= 0|| self.hp <= 0)
                return;
            enemy.hp -= self.damage;
        },
        getItem(data, x, y) {
            return data[y][x];
        },
        getRangeItems(item, data, x, y, range) {
            const offset = range - 1;
            const result = [];
            for(let i = 0; i < item.x; i++){
                for(let j = 0; j < item.y; j++){
                    // if(i >= x - offset && i <= x + offset) {
                    //     if(j >= y - offset && j <= y + offset)
                    //         result.push(data[i][j]);
                    // }
                    if(this.isInRange(i, j, x, y, offset))
                        result.push(data[j][i]);
                }
            }
            return result;
        },
        isInRange(i, j, x, y, offset) {
            if(i >= x - offset && i <= x + offset) {
                if(j >= y - offset && j <= y + offset)
                    return true;
            }
            return false;
        },
        getRamdom(x, y) {
            const _x = Math.floor(Math.random()*x);
            const _y = Math.floor(Math.random()*y);
            return {x: _x, y: _y};
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
    padding: 10px;
    border: 1px solid red;
    /* background: #f66; */
}
.right {
    float: right;
    width: 50%;
    box-sizing: border-box;
    padding: 10px;
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
    padding: 20px;
    background: #faa;
}
.self{
    background: #aaa;
}
.enemy{
    background: #c95;
}
.tool{
    display: inline-block;
    background: #aff;
    width: 80px;
    padding: 5px;
    margin: 5px;
}
.toolWrapper{
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #333;
}
</style>
