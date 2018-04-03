import { ElTableTreeColumnType } from "./props";
export declare type ColumnRow = {
    $extra?: {
        expanded?: boolean;
        loading?: boolean;
    };
    [key: string]: any;
};
export declare type ColumnScope = {
    row: ColumnRow;
    column: any;
};
declare const ElTableTreeColumn: ElTableTreeColumnType;
export default ElTableTreeColumn;
