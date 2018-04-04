import { ColumnScope } from ".";

export class ElTableInject {
  private Injected: { [key: string]: boolean } = {};

  isInjected(scope: ColumnScope) {
    return this.Injected[scope.store.table.tableId];
  }
  Inject(scope: ColumnScope) {
    if (this.isInjected(scope)) return;
    this.Injected[scope.store.table.tableId] = true;

    scope.store.states._treeRowExpanded = [];
    scope.store.states._treeRowLoading = [];
    scope.store.states._treeCachedExpanded = [];
    scope.store.states._treeInitedExpanded = [];
    // scope.store.mutations
  }
}

export default new ElTableInject();