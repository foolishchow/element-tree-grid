import Vue, { CreateElement, FunctionalComponentOptions, RenderContext, VNode } from "vue";
import { ElTableColumnProps, ElTableColumnPropsInner } from "./dependence";
export type ElTableTreeColumnProps = ElTableColumnProps & {
  treeKey?: string;
  childNumKey?: string;
  parentKey?: string;
  levelKey?: string;
  childKey?: string;
  expandKey?: string;
  fileIcon?: string;
  folderIcon?: string;
  remote?: Function;
  expandAll: boolean;
}

export type ElTableTreeColumnPropsInner = ElTableColumnPropsInner & {
  treeKey: string;
  childNumKey: string;
  parentKey: string;
  levelKey: string;
  childKey: string;
  expandKey: string;
  fileIcon: string;
  folderIcon: string;
  remote: Function;
  expandAll: boolean;
}
export const ElTableTreeColumnPropDefine = {
  prop: {
    type: String
  },
  label: String,
  className: String,
  labelClassName: String,
  property: String,
  width: {},
  minWidth: {},
  renderHeader: Function,
  sortable: {
    type: [String, Boolean],
    default: false
  },
  sortMethod: Function,
  resizable: {
    type: Boolean,
    default: true
  },
  context: {},
  columnKey: String,
  align: String,
  headerAlign: String,
  showTooltipWhenOverflow: Boolean,
  showOverflowTooltip: Boolean,
  fixed: [Boolean, String],
  formatter: Function,
  selectable: Function,
  reserveSelection: Boolean,
  filterMethod: Function,
  filteredValue: Array,
  filters: Array,
  filterMultiple: {
    type: Boolean,
    default: true
  },
  treeKey: {
    type: String,
    default: 'id'
  },
  childNumKey: {
    type: String,
    default: 'child_num'
  },
  parentKey: {
    type: String,
    default: 'parent_id'
  },
  levelKey: {
    type: String,
    default: 'depth'
  },
  childKey: {
    type: String,
    default: 'children'
  },
  fileIcon: {
    type: String,
    default: 'el-icon-file'
  },
  folderIcon: {
    type: String,
    default: 'el-icon-folder'
  },
  remote: {
    type: Function,
    default: null
  },
  expandAll: {
    type: Boolean,
    default: false
  },
  expandKey: {
    type: String,
    default: 'expanded'
  }
};
export type ElTableTreeColumnType = FunctionalComponentOptions<ElTableTreeColumnProps>