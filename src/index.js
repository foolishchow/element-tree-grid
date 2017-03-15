import ElTableTreeItem from './index.vue'

if( typeof window !== 'undefined' && window.Vue ){
    Vue.component(ElTableTreeItem.name,ElTableTreeItem)
}
export default ElTableTreeItem;