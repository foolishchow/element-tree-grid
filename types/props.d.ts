import { FunctionalComponentOptions } from "vue";
import { ElTableColumnProps, ElTableColumnPropsInner } from "./dependence";
export declare type ElTableTreeColumnProps = ElTableColumnProps & {
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
    remote: Function;
    expandAll: boolean;
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
    expandAll: {
        type: BooleanConstructor;
        default: boolean;
    };
    expandKey: {
        type: StringConstructor;
        default: string;
    };
};
export declare type ElTableTreeColumnType = FunctionalComponentOptions<ElTableTreeColumnProps>;
