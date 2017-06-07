(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ELEMENT_TREE_COLUMN = factory());
}(this, (function () { 'use strict';

var indexOf = function indexOf(val, arr) {
    var has = -1;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            has = i;
            break;
        }
    }
    return has;
};

var descendantsIds = function descendantsIds(id, data, parentKey, treeKey) {
    var result = [],
        compare = [id],
        length = -1;
    while (length != compare.length) {
        length = compare.length;
        data.forEach(function (item) {
            if (indexOf(item[parentKey], compare) > -1 && indexOf(item[treeKey], compare) == -1) {
                result.push(item[treeKey]);
                compare.push(item[treeKey]);
            }
        });
    }
    return result;
};
var hash = function hash() {
    return Math.floor(Math.random() * Math.random() * Math.random() * Math.random() * 1000);
};
var index = function index(hash, data) {
    var i = 0;
    while (data[i]) {
        if (data[i].$extra && data[i].$extra.hash == hash) {
            break;
        }
        i++;
    }
    return i;
};

var util = {
    indexOf: indexOf,
    descendantsIds: descendantsIds,
    hash: hash,
    index: index
};

var _props;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var methods = {
    floderIcon: function floderIcon(context, row) {
        var expanded = false;
        if (row.$extra) {
            expanded = row.$extra.expanded;
        }
        var floder = context.props.folderIcon,
            floder_open = context.props.folderIcon + '-open';
        return expanded ? floder_open : floder;
    },
    hasChild: function hasChild(context, row) {
        if (row[context.props.childNumKey] != undefined) {
            return row[context.props.childNumKey] > 0 ? true : false;
        } else if (row[context.props.childKey] != undefined) {
            return row[context.props.childKey].length > 0 ? true : false;
        } else {
            return false;
        }
    },
    paddingLeft: function paddingLeft(context, row) {
        return parseInt(row[context.props.levelKey]) * 14 + 'px';
    },
    icon: function icon(row) {
        if (row.$extra && row.$extra.loading == true) return 'el-icon-loading';
        return row.$extra && row.$extra.expanded ? 'el-icon-caret-bottom' : 'el-icon-caret-right';
    },
    has: function has(context, item, list) {
        var key = context.props.treeKey,
            parentKey = context.props.parentKey;
        var uniqueKey = item[key];
        var has = false;
        list.forEach(function (row) {
            if (row[key] == uniqueKey || row[key] == item[parentKey]) {
                has = true;
            }
        });
        return has;
    },
    commit: function commit(context, instance, list) {
        var owner = instance.store.table; //methods.owner(context.parent);
        var states = instance.store.states;

        var selection = states.selection;
        owner.store.commit('setData', list);

        owner.clearSelection();
        var data = owner.store.states._data;
        data.forEach(function (row) {
            if (methods.has(context, row, selection)) {
                owner.toggleRowSelection(row);
            }
        });
        // states.selection = currentSelecttion;
        // if(selection != undefined){
        //     states.selection = selection;
        // }
    },
    setSystemExpanded: function setSystemExpanded(list, isRender) {
        list.forEach(function (item) {
            item.$extra = { isRender: isRender };
        });
    },
    doexpanded: function doexpanded(instance, context, index, row) {
        var isRender = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

        var owner = instance.store.table; //methods.owner(context.parent);
        var states = instance.store.states;
        var vm = context.props;
        var data = JSON.parse(JSON.stringify(owner.store.states._data));
        if (data[index].$extra != undefined && data[index].$extra.loading) return;
        if (data[index].$extra == undefined) {
            data[index].$extra = { expanded: true };
        } else {
            data[index].$extra.expanded = !data[index].$extra.expanded;
        }
        if (data[index].$extra.expanded) {
            if (vm.remote != null) {
                var hash = util.hash();
                data[index].$extra.expanded = false;
                data[index].$extra.hash = hash;
                data[index].$extra.loading = true;
                methods.commit(context, instance, data);
                vm.remote(row, function (result) {
                    var list = owner.store.states._data;
                    var _index = util.index(hash, list);
                    list[_index].$extra = {
                        loading: false,
                        expanded: result && result.length > 0 ? true : false
                    };
                    if (result && result.length > 0) {
                        var prefix = list.slice(0, _index + 1);
                        var i = 0;
                        while (i < _index + 1) {
                            list.shift();
                            i++;
                        }
                        methods.setSystemExpanded(result, isRender);
                        list = prefix.concat(result).concat(list);
                    } else {
                        list[_index][vm.childNumKey] = 0;
                    }
                    methods.commit(context, instance, list);
                });
            } else {
                var prefix = data.slice(0, index + 1);
                var i = 0;
                while (i < index + 1) {
                    data.shift();
                    i++;
                }
                var result = row[vm.childKey];
                methods.setSystemExpanded(row[vm.childKey], isRender);
                data = prefix.concat(result).concat(data);
                // owner.store.commit('setData', data);
                methods.commit(context, instance, data);
            }
        } else {
            var id = row[vm.treeKey],
                result = [];
            var removeIds = util.descendantsIds(id, data, vm.parentKey, vm.treeKey);
            data.forEach(function (item) {
                if (util.indexOf(item[vm.treeKey], removeIds) == -1) {
                    result.push(item);
                }
            });
            data = result;
            methods.commit(context, instance, data);
            // owner.store.commit('setData', data);
        }
    },
    evalDetails: function evalDetails(context, scope, h) {
        var detail = void 0;
        if (context.data.scopedSlots) {
            detail = context.data.scopedSlots.default(scope);
        } else {
            var text = context.props.formatter ? context.props.formatter(scope.row, scope.column) : scope.row[context.props.prop];
            detail = h('span', {}, text);
        }
        return detail;
    }
};
var ElTableTreeItem$1 = {
    functional: true,
    name: 'el-table-tree-column',
    props: (_props = {
        prop: {
            type: String
        },
        label: String,
        className: String,
        labelClassName: String,
        property: String
    }, _defineProperty(_props, 'prop', String), _defineProperty(_props, 'width', {}), _defineProperty(_props, 'minWidth', {}), _defineProperty(_props, 'renderHeader', Function), _defineProperty(_props, 'sortable', {
        type: [String, Boolean],
        default: false
    }), _defineProperty(_props, 'sortMethod', Function), _defineProperty(_props, 'resizable', {
        type: Boolean,
        default: true
    }), _defineProperty(_props, 'context', {}), _defineProperty(_props, 'columnKey', String), _defineProperty(_props, 'align', String), _defineProperty(_props, 'headerAlign', String), _defineProperty(_props, 'showTooltipWhenOverflow', Boolean), _defineProperty(_props, 'showOverflowTooltip', Boolean), _defineProperty(_props, 'fixed', [Boolean, String]), _defineProperty(_props, 'formatter', Function), _defineProperty(_props, 'selectable', Function), _defineProperty(_props, 'reserveSelection', Boolean), _defineProperty(_props, 'filterMethod', Function), _defineProperty(_props, 'filteredValue', Array), _defineProperty(_props, 'filters', Array), _defineProperty(_props, 'filterMultiple', {
        type: Boolean,
        default: true
    }), _defineProperty(_props, 'treeKey', {
        type: String,
        default: 'id'
    }), _defineProperty(_props, 'childNumKey', {
        type: String,
        default: 'child_num'
    }), _defineProperty(_props, 'parentKey', {
        type: String,
        default: 'parent_id'
    }), _defineProperty(_props, 'levelKey', {
        type: String,
        default: 'depth'
    }), _defineProperty(_props, 'childKey', {
        type: String,
        default: 'children'
    }), _defineProperty(_props, 'fileIcon', {
        type: String,
        default: 'el-icon-file'
    }), _defineProperty(_props, 'folderIcon', {
        type: String,
        default: 'el-icon-folder'
    }), _defineProperty(_props, 'remote', {
        type: Function,
        default: null
    }), _defineProperty(_props, 'expandAll', {
        type: Boolean,
        default: false
    }), _defineProperty(_props, 'expandKey', {
        type: String,
        default: 'expanded'
    }), _props),
    render: function render(createElement, context) {
        var h = createElement;
        var floder = function floder(scope) {
            var row = scope.store.table.store.states._data[scope.$index];
            if (row && row[context.props.expandKey] && (row.$extra == undefined || row.$extra.expanded == undefined)) {
                methods.doexpanded(scope, context, scope.$index, scope.row, false);
            } else if (row && (row.$extra == undefined || row.$extra.isRender)) {
                if (context.props.expandAll) {
                    methods.doexpanded(scope, context, scope.$index, scope.row, true);
                }
            }

            return h('span', {
                on: {
                    click: function click($event) {
                        $event.preventDefault();
                        methods.doexpanded(scope, context, scope.$index, scope.row);
                    }
                }
            }, [h('span', { style: { paddingLeft: methods.paddingLeft(context, scope.row) } }, [h('i', { class: methods.icon(scope.row) }), scope._self._v(" "), h('i', {
                class: methods.floderIcon(context, scope.row),
                staticStyle: { "padding-right": "7px" }
            })]), methods.evalDetails(context, scope, h)]);
        };
        var leaf = function leaf(scope) {
            return h('span', [h('span', {
                style: { paddingLeft: methods.paddingLeft(context, scope.row) }
            }, [h('i', {
                class: context.props.fileIcon,
                staticStyle: { "padding-right": "7px", "padding-left": "18px" }
            })]), methods.evalDetails(context, scope, h)]);
        };
        return h('el-table-column', {
            attrs: {
                'prop': context.props.prop,
                'label': context.props.label,
                'width': context.props.width,
                'class-name': context.props.className,
                'label-class-name': context.props.labelClassName,
                'property': context.props.property,
                'min-width': context.props.minWidth,
                'render-header': context.props.renderHeader,
                'sortable': context.props.sortable,
                'sort-method': context.props.sortMethod,
                'resizable': context.props.resizable,
                'context': context.props.context,
                'column-key': context.props.columnKey,
                'align': context.props.align,
                'header-align': context.props.headerAlign,
                'show-tooltip-when-overflow': context.props.showTooltipWhenOverflow,
                'show-overflow-tooltip': context.props.showOverflowTooltip,
                'fixed': context.props.fixed,
                'formatter': context.props.formatter,
                'selectable': context.props.selectable,
                'reserve-selection': context.props.reserveSelection,
                'filter-method': context.props.filterMethod,
                'filtered-value': context.props.filteredValue,
                'filters': context.props.filters,
                'filter-multiple': context.props.filterMultiple
            },
            scopedSlots: {
                default: function _default(scope) {
                    return methods.hasChild(context, scope.row) ? [floder(scope)] : [leaf(scope)];
                }
            }
        });
    }
};

// import ElTableTreeItem from './index.vue'
if (typeof window !== 'undefined' && window.Vue) {
    // Vue.component(ElTableTreeItem.name, ElTableTreeItem)
    Vue.component(ElTableTreeItem$1.name, ElTableTreeItem$1);
}

return ElTableTreeItem$1;

})));
