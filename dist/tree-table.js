(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ElTableTreeColumn = factory());
}(this, (function () { 'use strict';

var nestRE = /^(attrs|props|on|nativeOn|class|style|hook)$/;

var index = function mergeJSXProps(objs) {
  var cc = objs.reduce(function (a, b) {
    var aa, bb, key, nestedKey, temp;
    for (key in b) {
      aa = a[key];
      bb = b[key];
      if (aa && nestRE.test(key)) {
        // normalize class
        if (key === 'class') {
          if (typeof aa === 'string') {
            temp = aa;
            a[key] = aa = {};
            aa[temp] = true;
          }
          if (typeof bb === 'string') {
            temp = bb;
            b[key] = bb = {};
            bb[temp] = true;
          }
        }
        if (key === 'on' || key === 'nativeOn' || key === 'hook') {
          // merge functions
          for (nestedKey in bb) {
            aa[nestedKey] = mergeFn(aa[nestedKey], bb[nestedKey]);
          }
        } else if (Array.isArray(aa)) {
          a[key] = aa.concat(bb);
        } else if (Array.isArray(bb)) {
          a[key] = [aa].concat(bb);
        } else {
          for (nestedKey in bb) {
            aa[nestedKey] = bb[nestedKey];
          }
        }
      } else {
        a[key] = b[key];
      }
    }
    return a;
  }, {});
  return cc;
};

function mergeFn(a, b) {
  return function () {
    a.apply(this, arguments);
    b.apply(this, arguments);
  };
}

var ElTableTreeColumnPropDefine = {
    prop: {
        type: String
    },
    label: String,
    className: String,
    labelClassName: String,
    property: String,
    width: {},
    minWidth: {},
    renderHeader: Function,
    sortable: {
        type: [String, Boolean],
        default: false
    },
    sortMethod: Function,
    resizable: {
        type: Boolean,
        default: true
    },
    context: {},
    columnKey: String,
    align: String,
    headerAlign: String,
    showTooltipWhenOverflow: Boolean,
    showOverflowTooltip: Boolean,
    fixed: [Boolean, String],
    formatter: Function,
    selectable: Function,
    reserveSelection: Boolean,
    filterMethod: Function,
    filteredValue: Array,
    filters: Array,
    filterMultiple: {
        type: Boolean,
        default: true
    },
    treeKey: {
        type: String,
        default: 'id'
    },
    childNumKey: {
        type: String,
        default: 'child_num'
    },
    parentKey: {
        type: String,
        default: 'parent_id'
    },
    levelKey: {
        type: String,
        default: 'depth'
    },
    childKey: {
        type: String,
        default: 'children'
    },
    fileIcon: {
        type: String,
        default: 'el-icon-file'
    },
    folderIcon: {
        type: String,
        default: 'el-icon-folder'
    },
    remote: {
        type: Function,
        default: null
    },
    expandAll: {
        type: Boolean,
        default: false
    },
    expandKey: {
        type: String,
        default: 'expanded'
    }
};

function hasChild(context, scope) {
    var _a = context.props,
        childNumKey = _a.childNumKey,
        childKey = _a.childKey,
        row = scope.row;
    if (row[childNumKey] != undefined) {
        return row[childNumKey] > 0 ? true : false;
    }
    if (row[childKey] != undefined) {
        return row[childKey].length > 0 ? true : false;
    } else {
        return false;
    }
}
function paddingLeft(context, scope) {
    return parseInt(scope.row[context.props.levelKey]) * 14 + 'px';
}
function icon(scope) {
    var row = scope.row;
    if (row.$extra && row.$extra.loading == true) return 'el-icon-loading';
    return row.$extra && row.$extra.expanded ? 'el-icon-caret-bottom' : 'el-icon-caret-right';
}
function folderIcon(context, scope) {}
function renderDetail(h, context, scope) {
    if (context.data.scopedSlots && context.data.scopedSlots.default) {
        return context.data.scopedSlots.default(scope);
    }
    if (context.props.formatter) {
        return h(
            'span',
            null,
            [context.props.formatter(scope.row, scope.column)]
        );
    }
    return h(
        'span',
        null,
        [scope.row[context.props.prop]]
    );
}
function doExpand(context, scope) {}

var RenderFolder = function RenderFolder(h, context, scope) {
    return h(
        "span",
        {
            nativeOn: {
                "click": function click(e) {
                    e.preventDefault();
                    doExpand(context, scope);
                }
            }
        },
        [h(
            "span",
            { style: { paddingLeft: paddingLeft(context, scope) } },
            [h(
                "i",
                { "class": icon(scope) },
                []
            ), h(
                "i",
                { "class": folderIcon(context, scope), style: { "padding-right": "7px" } },
                []
            )]
        ), renderDetail(h, context, scope)]
    );
};
var RenderLeaf = function RenderLeaf(h, context, scope) {
    return h(
        "span",
        { style: { paddingLeft: paddingLeft(context, scope) } },
        [h(
            "i",
            { "class": icon(scope), style: { "padding-right": "7px", "padding-left": "18px" } },
            []
        ), renderDetail(h, context, scope)]
    );
};
var RenderContext = function RenderContext(h, context, scope) {
    var hasChild$$1 = hasChild(context, scope);
    if (hasChild$$1) return RenderFolder(h, context, scope);
    return RenderLeaf(h, context, scope);
};
var ElTableTreeColumn = {
    functional: true,
    props: ElTableTreeColumnPropDefine,
    render: function render(h, context) {
        // props will be lost when `scopedSlots` is rendered
        var attr = {};
        Object.keys(context.props).map(function (k) {
            attr[k] = context.props[k];
        });
        var attrs = { attrs: attr };
        return h(
            "el-table-column",
            index([attrs, { scopedSlots: { default: function _default(scope) {
                        return RenderContext(h, context, scope);
                    } } }]),
            []
        );
    }
};
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.component('el-table-tree-column', ElTableTreeColumn);
}

return ElTableTreeColumn;

})));
