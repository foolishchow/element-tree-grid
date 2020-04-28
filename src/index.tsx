import { CreateElement, RenderContext } from "vue";
import { TableColumn } from "./dependence";
import * as Expand from './expand';
import ElTableInjecter from './inject';
import { ElTableStore, ElTableTreeColumnPropDefine, ElTableTreeColumnProps as ElTableTreeColumnPropsOrigin, ElTableTreeColumnPropsInner, ElTableTreeColumnType } from "./props";
import * as util from './utils';

export type ColumnRow = {
  [key: string]: any;
}
export type ColumnScope = {
  row: ColumnRow,
  column: TableColumn;
  $index: number;
  store: ElTableStore<ColumnRow>;
}
export type ElTableTreeColumnProps = ElTableTreeColumnPropsOrigin;

const RenderFolder = function (h: CreateElement, context: RenderContext<ElTableTreeColumnPropsInner>, scope: ColumnScope) {
  if (util.isNeedExpanedRow(context, scope)) {
    setTimeout(() => {
      Expand.doExpand(context, scope)
    }, 15);
  }
  return <span
    onClick={(e: any) => {
      e.preventDefault();
      Expand.doExpand(context, scope)
    }}>
    <span style={{ paddingLeft: util.paddingLeft(context, scope) }}>
      <i class={util.icon(scope, context)} ></i>{" "}
      <i class={util.folderIcon(context, scope)}></i>
    </span>
    {util.renderDetail(h, context, scope)}
  </span>
}

const RenderLeaf = function (h: CreateElement, context: RenderContext<ElTableTreeColumnPropsInner>, scope: ColumnScope) {
  return <span style={{ paddingLeft: util.paddingLeft(context, scope) }}>
    <i class={context.props.fileIcon} ></i>
    {util.renderDetail(h, context, scope)}
  </span>
}

const RenderContext = function (h: CreateElement, context: RenderContext<ElTableTreeColumnPropsInner>, scope: ColumnScope): any {
  ElTableInjecter.Inject(context, scope);
  let hasChild = util.hasChild(context, scope);
  if (hasChild) return RenderFolder(h, context, scope);
  return RenderLeaf(h, context, scope);
}

const ElTableTreeColumn: ElTableTreeColumnType = {
  name: 'el-table-tree-column',
  functional: true,
  props: ElTableTreeColumnPropDefine,
  render(this: undefined, h: CreateElement, context: RenderContext<ElTableTreeColumnPropsInner>) {
    // props will be lost when `scopedSlots` is rendering
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