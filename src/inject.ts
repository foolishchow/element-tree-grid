import { RenderContext } from "vue";
import { ColumnRow, ColumnScope } from ".";
import { ElTableTreeColumnPropsInner, ElTableType } from "./props";

export class ElTableInject {
  private Injected: { [key: string]: boolean } = {};
  private InjectedTable: { [key: string]: ElTableType<any> } = {}

  isInjected(scope: ColumnScope) {
    return this.Injected[scope.store.table.tableId];
  }
  Inject(context: RenderContext<ElTableTreeColumnPropsInner>, scope: ColumnScope) {
    if (this.isInjected(scope)) return;
    this.InjectedTable[scope.store.table.tableId] = scope.store.table;
    this.Injected[scope.store.table.tableId] = true;
    let key = context.props.treeKey,
      parentKey = context.props.parentKey;
    const table = scope.store.table
    scope.store.table.$on("current-change", () => {
      validateAllExpanded(table, key)
    })
    scope.store.states._treeRowExpanded = [];
    scope.store.states._treeRowLoading = [];
    scope.store.states._treeCachedExpanded = [];
    scope.store.states._treeInitedExpanded = [];
    // scope.store.mutations
  }
}

const validateAllExpanded = (
  table: ElTableType<ColumnRow>, key: string, ) => {
  let data = table.store.states._data,
    _treeRowExpanded = table.store.states._treeRowExpanded;
  const IsDataListChanged = _treeRowExpanded.every(expanded => data.every(row => row[key] != expanded[key]))
  if (IsDataListChanged) {
    table.store.states._treeRowExpanded = [];
  }
}
export default new ElTableInject();