export function hasChild(context, scope) {
    var _a = context.props, childNumKey = _a.childNumKey, childKey = _a.childKey, row = scope.row;
    if (row[childNumKey] != undefined) {
        return row[childNumKey] > 0 ? true : false;
    }
    if (row[childKey] != undefined) {
        return row[childKey].length > 0 ? true : false;
    }
    else {
        return false;
    }
}
export function paddingLeft(context, scope) {
    return (parseInt(scope.row[context.props.levelKey]) * 14) + 'px';
}
export function icon(scope) {
    var row = scope.row;
    if (row.$extra && row.$extra.loading == true)
        return 'el-icon-loading';
    return row.$extra && row.$extra.expanded ? 'el-icon-caret-bottom' : 'el-icon-caret-right';
}
export function folderIcon(context, scope) {
}
export function renderDetail(h, context, scope) {
    if (context.data.scopedSlots && context.data.scopedSlots.default) {
        return context.data.scopedSlots.default(scope);
    }
    if (context.props.formatter) {
        return <span>{context.props.formatter(scope.row, scope.column)}</span>;
    }
    return <span>{scope.row[context.props.prop]}</span>;
}
export function doExpand(context, scope) {
}
