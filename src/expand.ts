import { ColumnRow, ColumnScope } from "./index";
import { RenderContext } from "vue";
import { ElTableTreeColumnPropsInner } from "./props";
import { isLoadingRow, isExpandedRow } from "./utils";

const hash = () => Math.floor(Math.random() * Math.random() * Math.random() * Math.random() * 1000);
const clone = function (data: any) {
  return JSON.parse(JSON.stringify(data))
}
const index = (hash: string, data: ColumnRow[]) => {
  var i = 0;
  while (data[i]) {
    let c = data[i];
    if (c.$extra && c.$extra.hash == hash) {
      break;
    }
    i++;
  };
  return i;
}
const indexOf = (val: any, arr: any[]) => {
  var has = -1;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == val) {
      has = i;
      break;
    }
  }
  return has;
}


const descendantsIds = (id: any, data: ColumnRow[], parentKey: string, treeKey: string) => {
  var result: any[] = [],
    compare = [id],
    length = -1;
  while (length != compare.length) {
    length = compare.length;
    data.forEach(function (item) {
      if (indexOf(item[parentKey], compare) > -1 && indexOf(item[treeKey], compare) == -1) {
        result.push(item[treeKey])
        compare.push(item[treeKey])
      }
    });
  }
  return result;
}


const has = function (context: RenderContext<ElTableTreeColumnPropsInner>, item: ColumnRow, list: ColumnRow[]) {
  let key = context.props.treeKey,
    parentKey = context.props.parentKey;
  let uniqueKey = item[key];
  let has = false;
  list.forEach(row => {
    if (row[key] == uniqueKey || row[key] == item[parentKey]) {
      has = true;
    }
  });
  return has;
}

const toggleExpanded = function (context: RenderContext<ElTableTreeColumnPropsInner>, scope: ColumnScope, isExpended: boolean) {
  let { treeKey } = context.props,
    { states } = scope.store;
  states._treeCachedExpanded = states._treeCachedExpanded.filter(r => r[treeKey] != scope.row[treeKey])
  if (isExpended) {
    states._treeRowExpanded = states._treeRowExpanded.filter(r => r[treeKey] != scope.row[treeKey]);
  } else {
    states._treeRowExpanded.push(scope.row)
  }
}
const toggleLoading = function (context: RenderContext<ElTableTreeColumnPropsInner>, scope: ColumnScope, isloading: boolean) {
  let { treeKey } = context.props;
  if (isloading) {
    scope.store.states._treeRowLoading = scope.store.states._treeRowLoading.filter(r => r[treeKey] != scope.row[treeKey]);
  } else {
    scope.store.states._treeRowLoading.push(scope.row)
  }
}

const commit = function (context: RenderContext<ElTableTreeColumnPropsInner>, scope: ColumnScope, list: ColumnRow[]) {
  let owner = scope.store.table; //methods.owner(context.parent);
  let states = scope.store.states;
  // let selection = states.selection;
  owner.store.commit('setData', list);

  /* owner.clearSelection();
  let data = owner.store.states._data;
  data.forEach(row => {
    if (has(context, row, selection)) {
      owner.toggleRowSelection(row)
    }
  }); */
}

const getIndex = function (context: RenderContext<ElTableTreeColumnPropsInner>, scope: ColumnScope, data: ColumnRow[]) {
  let index = -1,
    { treeKey } = context.props;
  data.forEach((r, i) => {
    if (r[treeKey] == scope.row[treeKey]) { index = i }
  })
  return index;
}

const Colspand = function (context: RenderContext<ElTableTreeColumnPropsInner>, scope: ColumnScope, data: ColumnRow[]) {
  let { parentKey, treeKey } = context.props,
    states = scope.store.states,
    row = scope.row,
    result: ColumnRow[] = [];
  let removeIds = descendantsIds(row[treeKey], data, parentKey, treeKey);
  data = data.filter(item => !removeIds.some(id => id == item[treeKey]))
  let NeedToCached = states._treeRowExpanded.filter(item => removeIds.some(id => id == item[treeKey]))
  let { _treeCachedExpanded } = states;
  NeedToCached.forEach(item => {
    if (!_treeCachedExpanded.some(i => i[treeKey] == item[treeKey])) {
      states._treeCachedExpanded.push(item)
    }
  })
  states._treeRowExpanded = states._treeRowExpanded.filter(item => !removeIds.some(id => id == item[treeKey]))
  commit(context, scope, data);
}

const insertRows = function (context: RenderContext<ElTableTreeColumnPropsInner>, scope: ColumnScope, children: ColumnRow[], updateChild: boolean = false) {
  let _data = clone(scope.store.states._data);
  let _index = getIndex(context, scope, _data);
  var prefix = _data.slice(0, _index + 1);
  var i = 0;
  while (i < _index + 1) {
    _data.shift();
    i++;
  }
  if (updateChild) prefix[_index][context.props.childKey] = children;
  _data = prefix.concat(children).concat(_data);
  return _data;
}
const ExpandRemote = function (context: RenderContext<ElTableTreeColumnPropsInner>, scope: ColumnScope, data: ColumnRow[]) {
  let { treeKey, remote } = context.props;
  toggleLoading(context, scope, false);
  const CallBack = function (children: ColumnRow[]) {
    let { childNumKey } = context.props;
    toggleLoading(context, scope, true);
    let _data: ColumnRow[];
    if (children && children.length > 0) {
      let updateChild = !context.props.allRemote;
      _data = insertRows(context, scope, children, updateChild);
    } else {
      _data = clone(scope.store.states._data);
      let _index = getIndex(context, scope, _data);
      _data[_index][childNumKey] = 0;
    }
    commit(context, scope, _data);
  }
  commit(context, scope, data);
  remote(scope.row, CallBack);
  // console.info(scope.store.states._treeCachedExpanded)
}

const Expand = function (context: RenderContext<ElTableTreeColumnPropsInner>, scope: ColumnScope, data: ColumnRow[]) {
  let { childKey } = context.props;
  data = insertRows(context, scope, scope.row[childKey]);
  commit(context, scope, data);
}

export function doExpand(context: RenderContext<ElTableTreeColumnPropsInner>, scope: ColumnScope) {
  let data: ColumnRow[] = clone(scope.store.states._data),
    { childKey } = context.props;

  // line is loading
  if (isLoadingRow(context, scope)) return;
  let isExpended = isExpandedRow(context, scope)
  toggleExpanded(context, scope, isExpended)
  if (isExpended) {
    return Colspand(context, scope, data);
  }
  let { remote, allRemote } = context.props;
  console.info(data)
  if (remote && allRemote) {
    return ExpandRemote(context, scope, data)
  }
  if (scope.row[childKey]) {
    return Expand(context, scope, data)
  } else if (remote) {
    return ExpandRemote(context, scope, data)
  }
  Expand(context, scope, data)
}