// import ElTableTreeItem from './index.vue'
import ElTableTreeItem from './table-column.js'

if (typeof window !== 'undefined' && window.Vue) {
    // Vue.component(ElTableTreeItem.name, ElTableTreeItem)
    Vue.component(ElTableTreeItem.name, ElTableTreeItem)
}
export default ElTableTreeItem;