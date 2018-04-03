import { ElTableTreeColumnPropDefine } from "./props";
import * as util from './utils';
var RenderFolder = function (h, context, scope) {
    return <span nativeOnClick={function (e) {
        e.preventDefault();
        util.doExpand(context, scope);
    }}>
    <span style={{ paddingLeft: util.paddingLeft(context, scope) }}>
      <i class={util.icon(scope)}></i>
      <i class={util.folderIcon(context, scope)} style={{ "padding-right": "7px" }}></i>
    </span>
    {util.renderDetail(h, context, scope)}
  </span>;
};
var RenderLeaf = function (h, context, scope) {
    return <span style={{ paddingLeft: util.paddingLeft(context, scope) }}>
    <i class={util.icon(scope)} style={{ "padding-right": "7px", "padding-left": "18px" }}></i>
    {util.renderDetail(h, context, scope)}
  </span>;
};
var RenderContext = function (h, context, scope) {
    var hasChild = util.hasChild(context, scope);
    if (hasChild)
        return RenderFolder(h, context, scope);
    return RenderLeaf(h, context, scope);
};
var ElTableTreeColumn = {
    functional: true,
    props: ElTableTreeColumnPropDefine,
    render: function (h, context) {
        // props will be lost when `scopedSlots` is rendered
        var attr = {};
        Object.keys(context.props).map(function (k) {
            attr[k] = context.props[k];
        });
        var attrs = { attrs: attr };
        return <el-table-column {...attrs} scopedSlots={{ default: function (scope) { return RenderContext(h, context, scope); } }}>
    </el-table-column>;
    }
};
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.component('el-table-tree-column', ElTableTreeColumn);
}
export default ElTableTreeColumn;
