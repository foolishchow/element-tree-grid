import { ElTableStore, ElTableTreeColumnProps } from "./props";
import { TableColumn } from "./dependence";
export declare type ColumnRow = {
    $extra?: {
        expanded?: boolean;
        loading?: boolean;
        hash?: string;
    };
    [key: string]: any;
};
export declare type ColumnScope = {
    row: ColumnRow;
    column: TableColumn;
    $index: number;
    store: ElTableStore<ColumnRow>;
};
export declare type ElTableTreeColumnProps = ElTableTreeColumnProps;
declare const ElTableTreeColumn: any;
export default ElTableTreeColumn;
