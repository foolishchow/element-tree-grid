import Vue, { VNode, ComponentOptions } from "vue"
import { ElTableColumnProps } from './src/dependence'
import { ScopedSlot } from "vue/types/vnode";
declare global {
  namespace JSX {
    interface Element extends VNode { }
    interface ElementClass extends Vue { }
    interface ElementAttributesProperty { }
    interface IntrinsicElements {
      'transition': {
        name: string
      },
      'el-table-column': ElTableColumnProps & {
        scopedSlots: { [key: string]: ScopedSlot };
      };
      ElTableColumn: ElTableColumnProps & {
        scopedSlots: { [key: string]: ScopedSlot };
      };
      [elem: string]: any
    }
  }
}