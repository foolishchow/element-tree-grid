# element-tree-grid
<p>
    <a href="https://www.npmjs.com/package/element-tree-grid">
        <img src="https://img.shields.io/npm/v/element-tree-grid.svg" alt="Version">
    </a> 
    <a href="https://www.npmjs.com/package/element-tree-grid">
        <img src="https://img.shields.io/npm/dm/element-tree-grid.svg" alt="Downloads">
    </a>
</p>

tree grid extends `element` ui  with `vue`

> start

- clone to your project
    ```shell
    git clone https://github.com/foolishchow/element-tree-grid.git
    cd element-tree-grid
    npm install #or yarn
    gulp 
    ```

- use with node
    - install
    ```shell
    npm install element-tree-grid --save
    ```
    - in you project 

    ```javascript
    //common 
    var ElTreeGrid = require('element-tree-grid');
    Vue.component(ElTreeGrid.name,ElTreeGrid);
    //import from source code . so you can build them with your webpack or rollup ..
    import ElTableTreeColumn from  'element-tree-grid/src/index.js';
    Vue.component(ElTreeGrid.name,ElTreeGrid)
    ```


> useage   

- common useage
    ```html
    <el-table :data="model.menus" border max-height="250">
        <el-table-tree-column 
            file-icon="icon icon-file" 
            folder-icon="icon icon-folder" 
            prop="label" label="labelname" width="220"></el-table-tree-column>
        <el-table-column prop="description" label="description"   width="180"></el-table-column>
    </el-table>
    ```
- get children from remote
    - html
    ```html
    <div id="app" style="padding: 30px;">
        <el-table :data="model.menus" border max-height="400">
            <el-table-tree-column 
                :remote="remote"
                file-icon="icon icon-file" 
                folder-icon="icon icon-folder" 
                prop="label" label="MenuName" width="320"></el-table-tree-column>
            <el-table-column prop="id" label="id" width="180"></el-table-column>
            <el-table-column prop="description" label="Description" :show-overflow-tooltip="true" width="180"></el-table-column>
        </el-table>
    </div>
    ```
    - javascript   
    ```javascript
    new Vue({
        el: "#app",
        data: {
            model: {
                menus: trees
            }
        },
        methods:{
            remote(row,callback){
                setTimeout(function() {
                    callback(row.children)
                },500)
            }
        }
    })
    ```
- attributes

    | name          | description              | values          |
    | ------------- |:------------------------|:---------------:|
    | prop          | same as `el-table-item`  |                 |
    | label         | same as `el-table-item`  |                 |
    | width         | same as `el-table-item`  |                 |
    | fixed         | same as `el-table-item`  |                 |
    | resizable     | same as `el-table-item`  |                 |
    | formatter     | same as `el-table-item`  |                 |
    | className     | same as `el-table-item`  |                 |
    | treeKey       | the key for neasted parse|  type:`String`,<br> default:`'id'` |
    | childNumKey   | the key of childNum      |  type:`String`,<br> default:`'child_num'` |
    | parentKey     | the key of parent_id        |  type:`String`, <br>default:`'parent_id'`|
    | levelKey      | the key of node's depth  |  type:`String`,<br> default:`'depth'`|
    | childKey      | the key of node's children been placed  |  type:`String`, <br>default:`'children'`|
    | fileIcon      | file icon className  |  type:`String`, <br>default:`'el-icon-file'`|
    | folderIcon      | folder icon className ,when opend use: `folderIcon-open`  |  type:`String`,<br> default:`'el-icon-folder'`|
    | remote       | remote method to get children | type:`Function`,<br/>default:`null`|
    | expandAll    | expand all nodes when loaded | type:`Boolean`,<br/>default:`false`|
    | expandKey    | key tells if the line is opened | type:`String`,<br/>default:`expanded`|

> examples 

- common 
```html
<el-table-tree-column 
            file-icon="icon icon-file" 
            folder-icon="icon icon-folder" 
            prop="label" 
            label="labelname" 
            width="220"></el-table-tree-column>
```

- with formatter
```html
<el-table-tree-column 
            file-icon="icon icon-file" 
            folder-icon="icon icon-folder" 
            prop="label" 
            label="labelname" 
            :formatter="formatter"
            width="220"></el-table-tree-column>
```

- with scopedSolts
```html
<el-table-tree-column 
            file-icon="icon icon-file" 
            folder-icon="icon icon-folder" 
            prop="label" 
            label="labelname" 
            width="220">
    <template scope="scope">
        <span>prefix =></span>
        <span>{{scope.row.label}} -- {{scope.row.id}}</span> 
        <span><= suffix</span>   
    </template>
</el-table-tree-column>
```

