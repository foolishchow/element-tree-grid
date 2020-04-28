import { CreateElement, RenderContext } from "vue";
import { ColumnScope } from './index';
import { ElTableTreeColumnPropsInner } from "./props";
export function hasChild(context: RenderContext<ElTableTreeColumnPropsInner>, scope: ColumnScope) {
  let { childNumKey, childKey } = context.props,
    { row } = scope;
  if (row[childNumKey] != undefined) {
    return row[childNumKey] > 0 ? true : false;
  }
  if (row[childKey] != undefined) {
    return row[childKey].length > 0 ? true : false;
  } else {
    return false;
  }
}

function hasChildInData(context: RenderContext<ElTableTreeColumnPropsInner>, scope: ColumnScope) {
  let { childNumKey, childKey, treeKey, parentKey } = context.props,
    data = scope.store.states._data,
    { row } = scope;
  return data.filter(d => d[parentKey] == row[treeKey]).length > 0
}


export function paddingLeft(context: RenderContext<ElTableTreeColumnPropsInner>, scope: ColumnScope) {
  return (parseInt(scope.row[context.props.levelKey]) * parseInt(context.props.indentSize.toString())) + 'px';
}
function removeCachedExpanedRow(context: RenderContext<ElTableTreeColumnPropsInner>, scope: ColumnScope) {
  let { _treeCachedExpanded } = scope.store.states,
    { treeKey } = context.props,
    row = scope.row;
  scope.store.states._treeCachedExpanded = _treeCachedExpanded.filter(crow => crow[treeKey] != row[treeKey]);
}
function isCachedExpanedRow(context: RenderContext<ElTableTreeColumnPropsInner>, scope: ColumnScope) {
  let { _treeCachedExpanded } = scope.store.states,
    { treeKey } = context.props,
    row = scope.row;
  return _treeCachedExpanded.map(row => row[treeKey]).filter(_treeKey => _treeKey == row[treeKey]).length > 0;
}

const isUnExpanded = (context: RenderContext<ElTableTreeColumnPropsInner>, scope: ColumnScope) => {
  let row = scope.row,
    data = scope.store.states._data,
    _treeRowExpanded = scope.store.states._treeRowExpanded,
    key = context.props.treeKey,
    parentKey = context.props.parentKey;
  let _hasChild = hasChild(context, scope);
  if (!_hasChild) return false;
  let IsRowShowed = data.some(item => item[key] == row[key]);
  if (!IsRowShowed) return false;
  let isInexpanded = scope.store.states._treeRowExpanded.some(treeKey => treeKey[context.props.treeKey] == scope.row[context.props.treeKey])
  if (!isInexpanded) return false;
  return !hasChildInData(context, scope)
}
export function isNeedExpanedRow(context: RenderContext<ElTableTreeColumnPropsInner>, scope: ColumnScope) {
  if (
    context.props.expandAll &&
    !scope.store.states._treeInitedExpanded.some(treeKey => treeKey == scope.row[context.props.treeKey])
  ) {
    scope.store.states._treeInitedExpanded.push(scope.row[context.props.treeKey]);
    return true;
  }
  if (isLoadingRow(context, scope)) return false;
  if (isUnExpanded(context, scope)) {
    scope.store.states._treeRowExpanded = scope.store.states._treeRowExpanded
      .filter(ex => ex[context.props.treeKey] != scope.row[context.props.treeKey]);
    return true;
  }
  let { expandKey } = context.props,
    row = scope.row;

  if (expandKey && row[expandKey]
    &&
    !scope.store.states._treeInitedExpanded.some(treeKey => treeKey == row[context.props.treeKey])
  ) {
    scope.store.states._treeInitedExpanded.push(scope.row[context.props.treeKey]);
    return true;
  }
  let result = isCachedExpanedRow(context, scope);
  if (result) removeCachedExpanedRow(context, scope);
  return result;
}

export function isLoadingRow(context: RenderContext<ElTableTreeColumnPropsInner>, scope: ColumnScope) {
  let { _treeRowLoading } = scope.store.states,
    { treeKey } = context.props,
    row = scope.row;
  return _treeRowLoading.map(row => row[treeKey]).filter(_treeKey => _treeKey == row[treeKey]).length > 0;
}
export function isExpandedRow(context: RenderContext<ElTableTreeColumnPropsInner>, scope: ColumnScope) {
  let { _treeRowExpanded } = scope.store.states,
    { treeKey } = context.props,
    row = scope.row;
  return _treeRowExpanded.map(row => row[treeKey]).filter(_treeKey => _treeKey == row[treeKey]).length > 0;
}

export function icon(scope: ColumnScope, context: RenderContext<ElTableTreeColumnPropsInner>) {
  if (isLoadingRow(context, scope)) return 'el-icon-loading';
  if (isExpandedRow(context, scope)) return 'el-icon-caret-bottom';
  return 'el-icon-caret-right';
}

export function folderIcon(context: RenderContext<ElTableTreeColumnPropsInner>, scope: ColumnScope) {
  let floder = context.props.folderIcon,
    floder_open = context.props.folderIcon + '-open';
  return isExpandedRow(context, scope) ? floder_open : floder;
}

export function renderDetail(h: CreateElement, context: RenderContext<ElTableTreeColumnPropsInner>, scope: ColumnScope): any {
  if (context.data.scopedSlots && context.data.scopedSlots.default) {
    return context.data.scopedSlots.default(scope);
  }
  if (context.props.formatter) {
    return <span>{context.props.formatter(scope.row, scope.column)}</span>
  }
  return <span>{"  "}{scope.row[context.props.prop]}</span>
}

