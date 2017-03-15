<template>
    <el-table-column :prop="prop" :label="label" :width="width">
        <template scope="scope">
            <span @click.prevent="doexpanded(scope.$index,scope.row)" v-if="hasChild(scope.row)">
                <span :style="{paddingLeft : paddingLeft(scope.row)}">
                    <i :class="'el-icon-caret-'+icon(scope.row)"></i>
                    <i :class="floderIcon(scope.row)" style="padding-right: 7px;"></i>
                </span>
                <span>{{scope.row[prop]}}</span>
            </span>
            <span v-if="!hasChild(scope.row)">
                <span :style="{paddingLeft : paddingLeft(scope.row)}">
                    <i :class="fileIcon" style="padding-right: 7px;padding-left:18px"></i>
                </span>
                <span>{{scope.row[prop]}}</span>
            </span>
        </template>
    </el-table-column>
</template>
<script>
import util from  './util'
export default {
    name :'el-table-tree-column',
    props:{
        prop:{
            type:String
        },
        label:{
            type:String
        },
        width:{
            type:String
        },
        treeKey:{
            type:String,
            default:'id'
        },
        childNumKey:{
            type:String,
            default:'child_num'
        },
        parentKey:{
            type:String,
            default:'parent_id'
        },
        levelKey:{
            type:String,
            default:'depth'
        },
        childKey:{
            type:String,
            default:'children'
        },
        fileIcon:{
            type:String,
            default:'el-icon-file'
        },
        folderIcon:{
            type:String,
            default:'el-icon-folder'
        }
    },
    computed: {
        owner() {
            let parent = this.$parent;
            while (parent && !parent.tableId) {
                parent = parent.$parent;
            }
            return parent;
        }
    },
    methods:{
        floderIcon(row){
            var hasChild = this.hasChild(row);
            var expanded = row.$extra && row.$extra.expanded;
            var  floder = this.folderIcon,
            floder_open = this.folderIcon+'-open';
            return expanded ? floder_open : floder;
        },
        hasChild(row){
            if(row[this.childNumKey] != undefined){
                return row[this.childNumKey] > 0 ? true : false;
            }else if(row[this.childKey] != undefined){
                return row[this.childKey].length > 0 ? true:false;
            }else{
                return false;
            }
        },
        paddingLeft(row){
            return  (parseInt(row[this.levelKey]) * 14)+'px';
        },
        icon(row){
            return row.$extra && row.$extra.expanded ?'bottom':'right';
        },
        doexpanded(index,row){
            var vm = this;
            var data = JSON.parse(JSON.stringify(this.owner.store.states._data))
            if(data[index].$extra == undefined){
                data[index].$extra = {expanded:true}
            }else{
                data[index].$extra.expanded = !data[index].$extra.expanded;
            }
            if(data[index].$extra.expanded){
                var prefix = data.slice(0,index+1);
                var i = 0;
                while (i<index+1){
                    data.shift();
                    i++;
                }
                data = prefix.concat(row[vm.childKey]).concat(data);
            }else{
                var id = row[vm.treeKey],result = [];
                var removeIds = util.descendantsIds(id,data,this.parentKey,this.treeKey);
                data.forEach(function(item){
                    if(util.indexOf(item[vm.treeKey],removeIds) == -1){
                        result.push(item)
                    }
                });
                data = result;
            }
            this.owner.store.commit('setData',data);
        }
    }
}
</script>
<style>
</style>