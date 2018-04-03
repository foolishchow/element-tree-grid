import { CreateElement, FunctionalComponentOptions, RenderContext, VNode } from "vue";
import { ElTableTreeColumnPropsInner, ElTableTreeColumnType, ElTableTreeColumnPropDefine } from "./props";
import { ColumnScope } from './index'
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


export function paddingLeft(context: RenderContext<ElTableTreeColumnPropsInner>, scope: ColumnScope) {
  return (parseInt(scope.row[context.props.levelKey]) * 14) + 'px';
}

export function icon(scope: ColumnScope) {
  let row = scope.row;
  if (row.$extra && row.$extra.loading == true) return 'el-icon-loading';
  return row.$extra && row.$extra.expanded ? 'el-icon-caret-bottom' : 'el-icon-caret-right';
}

export function folderIcon(context: RenderContext<ElTableTreeColumnPropsInner>, scope: ColumnScope) {

}

export function renderDetail(h: CreateElement, context: RenderContext<ElTableTreeColumnPropsInner>, scope: ColumnScope): any {
  if (context.data.scopedSlots && context.data.scopedSlots.default) {
    return context.data.scopedSlots.default(scope);
  }
  if (context.props.formatter) {
    return <span>{context.props.formatter(scope.row, scope.column)}</span>
  }
  return <span>{scope.row[context.props.prop]}</span>
}

export function doExpand(context: RenderContext<ElTableTreeColumnPropsInner>, scope: ColumnScope) {

}
