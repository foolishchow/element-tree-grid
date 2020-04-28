import { TableColumn } from "./dependence";
import { ElTableStore, ElTableTreeColumnProps as ElTableTreeColumnPropsOrigin, ElTableTreeColumnType } from "./props";
export declare type ColumnRow = {
    [key: string]: any;
};
export declare type ColumnScope = {
    row: ColumnRow;
    column: TableColumn;
    $index: number;
    store: ElTableStore<ColumnRow>;
};
export declare type ElTableTreeColumnProps = ElTableTreeColumnPropsOrigin;
declare const ElTableTreeColumn: ElTableTreeColumnType;
export default ElTableTreeColumn;
