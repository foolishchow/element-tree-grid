import { CreateElement, FunctionalComponentOptions, RenderContext, VNode } from "vue";
import { ElTableTreeColumnProps, ElTableTreeColumnPropsInner, ElTableTreeColumnType, ElTableTreeColumnPropDefine } from "./props";
import * as util from './utils';

export type ColumnRow = {
  $extra?: {
    expanded?: boolean;
    loading?: boolean;
  }
  [key: string]: any;
}
export type ColumnScope = {
  row: ColumnRow,
  column: any
}

const RenderFolder = function (h: CreateElement, context: RenderContext<ElTableTreeColumnPropsInner>, scope: ColumnScope) {
  return <span
    nativeOnClick={(e: MouseEvent) => {
      e.preventDefault();
      util.doExpand(context, scope)
    }}>
    <span style={{ paddingLeft: util.paddingLeft(context, scope) }}>
      <i class={util.icon(scope)} ></i>
      <i class={util.folderIcon(context, scope)} style={{ "padding-right": "7px" }}></i>
    </span>
    {util.renderDetail(h, context, scope)}
  </span>
}

const RenderLeaf = function (h: CreateElement, context: RenderContext<ElTableTreeColumnPropsInner>, scope: ColumnScope) {
  return <span style={{ paddingLeft: util.paddingLeft(context, scope) }}>
    <i class={util.icon(scope)} style={{ "padding-right": "7px", "padding-left": "18px" }}></i>
    {util.renderDetail(h, context, scope)}
  </span>
}

const RenderContext = function (h: CreateElement, context: RenderContext<ElTableTreeColumnPropsInner>, scope: ColumnScope): any {
  let hasChild = util.hasChild(context, scope);
  if (hasChild) return RenderFolder(h, context, scope);
  return RenderLeaf(h, context, scope);
}

const ElTableTreeColumn: ElTableTreeColumnType = {
  functional: true,
  props: ElTableTreeColumnPropDefine,
  render(this: undefined, h: CreateElement, context: RenderContext<ElTableTreeColumnPropsInner>) {
    // props will be lost when `scopedSlots` is rendered
    let attr: any = {};
    Object.keys(context.props).map(k => {
      attr[k] = (context.props as any)[k]
    })
    let attrs = { attrs: attr };
    return <el-table-column {...attrs}
      scopedSlots={{ default: (scope: any) => RenderContext(h, context, scope) }}>
    </el-table-column>
  }
} as ElTableTreeColumnType;

if (typeof window !== 'undefined' && (window as any).Vue) {
  ((window as any).Vue as any).component('el-table-tree-column', ElTableTreeColumn)
}
export default ElTableTreeColumn;