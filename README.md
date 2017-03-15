# element-tree-grid

tree grid extends `element` ui  with `vue`

> start

- clone to your project
```
git clone https://github.com/foolishchow/element-tree-grid.git
cd element-tree-grid
npm install #or yarn
gulp 
```


> useage   

```javascript
<el-table :data="model.menus" border max-height="250">
    <el-table-tree-column 
        file-icon="icon icon-file" 
        folder-icon="icon icon-folder" 
        prop="label" label="菜单名" width="220"></el-table-tree-column>
    <el-table-column prop="description" label="描述"   width="180"></el-table-column>
</el-table>
```

- attributes

| name          | description              | values          |
| ------------- |:------------------------|:---------------:|
| prop          | same as `el-table-item`  |                 |
| label         | same as `el-table-item`  |                 |
| width         | same as `el-table-item`  |                 |
| treeKey       | the key for neasted parse|  type:String,<br> default:'id' |
| childNumKey   | the key of childNum      |  type:String,<br> default:'child_num' |
| parentKey     | the key parent_id        |  type:String, <br>default:'parent_id'|
| levelKey      | the key of node's depth  |  type:String,<br> default:'depth'|
| childKey      | the key of node's children been placed  |  type:String, <br>default:'children'|
| fileIcon      | file icon className  |  type:String, <br>default:'el-icon-file'|
| folderIcon      | folder icon className ,when opend use: `folderIcon-open`  |  type:String,<br> default:'el-icon-folder'|
