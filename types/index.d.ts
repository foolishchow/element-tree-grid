import { ElTableStore, ElTableTreeColumnProps, ElTableTreeColumnType } from "./props";
import { TableColumn } from "./dependence";
export declare type ColumnRow = {
    [key: string]: any;
};
export declare type ColumnScope = {
    row: ColumnRow;
    column: TableColumn;
    $index: number;
    store: ElTableStore<ColumnRow>;
};
export declare type ElTableTreeColumnProps = ElTableTreeColumnProps;
declare const ElTableTreeColumn: ElTableTreeColumnType;
export default ElTableTreeColumn;
