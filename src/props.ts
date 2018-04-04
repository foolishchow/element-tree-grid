import Vue, { CreateElement, FunctionalComponentOptions, RenderContext, VNode } from "vue";
import { ElTableColumnProps, ElTableColumnPropsInner, TableColumn } from "./dependence";
export type ElTableTreeColumnProps = ElTableColumnProps & {
  treeKey: string;
  childNumKey?: string;
  parentKey?: string;
  levelKey?: string;
  childKey?: string;
  expandKey?: string;
  fileIcon?: string;
  folderIcon?: string;
  remote?: Function;
  allRemote?: boolean;
  expandAll?: boolean;
  indentSize?: number;
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
  allRemote: boolean;
  expandAll: boolean;
  indentSize: number;
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
  allRemote: {
    type: Boolean,
    default: false
  },
  indentSize: {
    type: Number,
    default: 14
  },
  expandAll: {
    type: Boolean,
    default: false
  },
  expandKey: {
    type: String,
    default: 'expanded'
  },

};

export type ElTableStoreStates<Row> = {
  columns: TableColumn[];
  currentRow: Row;
  data: Row[];
  defaultExpandAll: boolean;
  expandRows: Row[];
  filteredData: Row[];
  filters: Row;
  fixedColumns: TableColumn[];
  fixedLeafColumns: TableColumn[];
  fixedLeafColumnsLength: number;
  hoverRow: null | Row;
  isAllSelected: boolean;
  isComplex: boolean;
  leafColumns: TableColumn[];
  leafColumnsLength: number;
  originColumns: TableColumn[];
  reserveSelection: boolean;
  rightFixedColumns: TableColumn[];
  rightFixedLeafColumns: TableColumn[];
  rightFixedLeafColumnsLength: number;
  rowKey?: string;
  selectOnIndeterminate: boolean;
  selectable?: boolean;
  selection: Row[];
  sortOrder?: any;
  sortProp?: any;
  sortingColumn?: TableColumn;
  _columns: TableColumn[];
  _data: Row[];

  // injected
  _treeRowExpanded: Row[];
  _treeRowLoading: Row[];
  _treeCachedExpanded: Row[];
  _treeInitedExpanded: any[];
}
export type ElTableStore<Row=any> = {
  table: Vue & {
    tableId: string;
    store: ElTableStore<Row>;
    clearSelection(): void;
    toggleRowSelection(row: Row): void;
  };
  states: ElTableStoreStates<Row>;
  mutations: {
    setData(states: ElTableStoreStates<Row>, data: Row[]): void;
    changeSortCondition(states: ElTableStoreStates<Row>, options: any): void;
    filterChange(states: ElTableStoreStates<Row>, options: any): void;
    insertColumn(states: ElTableStoreStates<Row>, column: TableColumn, index: number, parent?: TableColumn): void;
    removeColumn(states: ElTableStoreStates<Row>, column: TableColumn, parent?: TableColumn): void;
    setHoverRow(states: ElTableStoreStates<Row>, row: Row): void;
    setCurrentRow(states: ElTableStoreStates<Row>, row: Row): void;
    rowSelectedChanged(states: ElTableStoreStates<Row>, row: Row): void;
    toggleAllSelection(states: ElTableStoreStates<Row>): void;

  }

  commit(name: 'setData', list: Row[]): void;
  commit(name: 'changeSortCondition', options: any): void;
  commit(name: 'filterChange', options: any): void;
  commit(name: 'insertColumn', column: TableColumn, index: number, parent?: TableColumn): void;
  commit(name: 'removeColumn', column: TableColumn, parent?: TableColumn): void;
  commit(name: 'setHoverRow', list: Row[]): void;
  commit(name: 'rowSelectedChanged', list: Row[]): void;
  commit(name: 'toggleAllSelection'): void;
}
export type ElTableTreeColumnType = FunctionalComponentOptions<ElTableTreeColumnProps>