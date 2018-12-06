<template>
    <div class="war-wrapper">
        left:
        x:<input v-model="left.x" type="text"/>y:<input v-model="left.y" type="text"/>
        
        right:
        x:<input v-model="right.x" type="text"/>y:<input v-model="right.y" type="text"/>
        <button @click="save">save</button>
        <div class="toolWrapper">
            <div class="tool" draggable="true" @dragstart="dragstart('plane', $event)">
                plane
            </div>
        </div>
        <div>
            <div class="left">
                <div class="flexWrapper">
                    <div v-for="(row, index1) in left.data" class="row">
                        <div class="item" v-if="Array.isArray(row)" v-for="(item, index2) in row">
                            <input v-if="isEdit('left', index1, index2)" v-model="value" @blur="blur" type="text"/>
                            <div v-else class="content" @click="edit('left', index1, index2)" @dragover.prevent @drop="drop('left', index1, index2, $event)">{{item}}</div>
                        </div>
                    </div>
                </div>     
            </div>
            <div class="right">
                <div class="flexWrapper" style="flex-direction: row;">
                    <div v-for="(row, index1) in right.data" class="row">
                        <div class="item" v-if="Array.isArray(row)" v-for="(item, index2) in row">
                            <input v-if="isEdit('right', index1, index2)" v-model="value" @blur="blur" type="text"/>
                            <div v-else class="content" @click="edit('right', index1, index2)" @dragover.prevent @drop="drop('right', index1, index2, $event)">{{item}}</div>
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
        drop(type, x, y, ev){
            ev.preventDefault();
            const value = ev.dataTransfer.getData("tool");
            this.setData(type, x, y, value);
        },
        dragstart(tool, ev) {
            ev.dataTransfer.setData("tool", tool);
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
    background: #aff;
    width: 50px;
    padding: 10px;
}
.toolWrapper{ 
    margin: 10px;
    padding: 10px;
    border: 1px solid #333;
}
</style>