'use strict';

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

var extend = function extend(target, source) {
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            target[key] = source[key];
        }
    }
};
var util = {
    indexOf: indexOf,
    descendantsIds: descendantsIds,
    hash: hash,
    index: index,
    extend: extend
};

var methods = {
    floderIcon: function floderIcon(context, row) {
        var expanded = false;
        if (row.$extra) {
            expanded = row.$extra.expanded;
        } else {
            expanded = context.props.expandAll;
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
    doexpanded: function doexpanded(instance, context, index, row) {
        var owner = instance.store.table; //methods.owner(context.parent);
        var vm = context.props;
        var data = JSON.parse(JSON.stringify(owner.store.states._data));
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
                owner.store.commit('setData', data);
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
                        list = prefix.concat(result).concat(list);
                    } else {
                        list[_index][vm.childNumKey] = 0;
                    }
                    owner.store.commit('setData', list);
                });
            } else {
                var prefix = data.slice(0, index + 1);
                var i = 0;
                while (i < index + 1) {
                    data.shift();
                    i++;
                }
                data = prefix.concat(row[vm.childKey]).concat(data);
                owner.store.commit('setData', data);
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
            owner.store.commit('setData', data);
        }
    }
};
var ElTableTreeItem$1 = {
    functional: true,
    name: 'el-table-tree-column',
    props: {
        prop: {
            type: String
        },
        label: {
            type: String
        },
        width: {
            type: String
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
        }
    },
    render: function render(createElement, context) {
        var h = createElement;
        var floder = function floder(scope) {
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
            })]), h('span', {}, scope.row[context.props.prop])]);
        };
        var leaf = function leaf(scope) {
            return h('span', [h('span', {
                style: { paddingLeft: methods.paddingLeft(context, scope.row) }
            }, [h('i', {
                class: context.props.fileIcon,
                staticStyle: { "padding-right": "7px", "padding-left": "18px" }
            })]), h('span', {}, scope.row[context.props.prop])]);
        };
        return h('el-table-column', {
            attrs: {
                'prop': context.props.prop,
                'label': context.props.label,
                'width': context.props.width
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

module.exports = ElTableTreeItem$1;
