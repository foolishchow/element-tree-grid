import Vue, { FunctionalComponentOptions } from "vue";
import { ElTableColumnProps, ElTableColumnPropsInner, TableColumn } from "./dependence";
export declare type ElTableTreeColumnProps = ElTableColumnProps & {
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
};
export declare type ElTableTreeColumnPropsInner = ElTableColumnPropsInner & {
    treeKey: string;
    childNumKey: string;
    parentKey: string;
    levelKey: string;
    childKey: string;
    expandKey: string;
    fileIcon: string;
    folderIcon: string;
    remote: (parentRow: any, callback: (child: any[]) => void) => void;
    allRemote: boolean;
    expandAll: boolean;
    indentSize: number;
};
export declare const ElTableTreeColumnPropDefine: {
    prop: {
        type: StringConstructor;
    };
    label: StringConstructor;
    className: StringConstructor;
    labelClassName: StringConstructor;
    property: StringConstructor;
    width: {};
    minWidth: {};
    renderHeader: FunctionConstructor;
    sortable: {
        type: (StringConstructor | BooleanConstructor)[];
        default: boolean;
    };
    sortMethod: FunctionConstructor;
    resizable: {
        type: BooleanConstructor;
        default: boolean;
    };
    context: {};
    columnKey: StringConstructor;
    align: StringConstructor;
    headerAlign: StringConstructor;
    showTooltipWhenOverflow: BooleanConstructor;
    showOverflowTooltip: BooleanConstructor;
    fixed: (StringConstructor | BooleanConstructor)[];
    formatter: FunctionConstructor;
    selectable: FunctionConstructor;
    reserveSelection: BooleanConstructor;
    filterMethod: FunctionConstructor;
    filteredValue: ArrayConstructor;
    filters: ArrayConstructor;
    filterMultiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    treeKey: {
        type: StringConstructor;
        default: string;
    };
    childNumKey: {
        type: StringConstructor;
        default: string;
    };
    parentKey: {
        type: StringConstructor;
        default: string;
    };
    levelKey: {
        type: StringConstructor;
        default: string;
    };
    childKey: {
        type: StringConstructor;
        default: string;
    };
    fileIcon: {
        type: StringConstructor;
        default: string;
    };
    folderIcon: {
        type: StringConstructor;
        default: string;
    };
    remote: {
        type: FunctionConstructor;
        default: null;
    };
    allRemote: {
        type: BooleanConstructor;
        default: boolean;
    };
    indentSize: {
        type: NumberConstructor;
        default: number;
    };
    expandAll: {
        type: BooleanConstructor;
        default: boolean;
    };
    expandKey: {
        type: StringConstructor;
        default: string;
    };
};
export declare type ElTableStoreStates<Row> = {
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
    _treeRowExpanded: Row[];
    _treeRowLoading: Row[];
    _treeCachedExpanded: Row[];
    _treeInitedExpanded: any[];
};
export declare type ElTableType<Row> = Vue & {
    tableId: string;
    store: ElTableStore<Row>;
    clearSelection(): void;
    toggleRowSelection(row: Row): void;
};
export declare type ElTableStore<Row = any> = {
    table: ElTableType<Row>;
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
    };
    commit(name: 'setData', list: Row[]): void;
    commit(name: 'changeSortCondition', options: any): void;
    commit(name: 'filterChange', options: any): void;
    commit(name: 'insertColumn', column: TableColumn, index: number, parent?: TableColumn): void;
    commit(name: 'removeColumn', column: TableColumn, parent?: TableColumn): void;
    commit(name: 'setHoverRow', list: Row[]): void;
    commit(name: 'rowSelectedChanged', list: Row[]): void;
    commit(name: 'toggleAllSelection'): void;
};
export declare type ElTableTreeColumnType = FunctionalComponentOptions<ElTableTreeColumnProps>;
