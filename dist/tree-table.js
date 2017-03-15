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
var util = {
    indexOf: indexOf,
    descendantsIds: descendantsIds
};

var ElTableTreeItem$1 = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('el-table-column', { attrs: { "prop": _vm.prop, "label": _vm.label, "width": _vm.width }, scopedSlots: _vm._u([["default", function (scope) {
                return [_vm.hasChild(scope.row) ? _c('span', { on: { "click": function click($event) {
                            $event.preventDefault();_vm.doexpanded(scope.$index, scope.row);
                        } } }, [_c('span', { style: { paddingLeft: _vm.paddingLeft(scope.row) } }, [_c('i', { class: 'el-icon-caret-' + _vm.icon(scope.row) }), _vm._v(" "), _c('i', { class: 'el-tree-tabel-column-type-icon ' + _vm.floderIcon(scope.row) })]), _c('span', [_vm._v(_vm._s(scope.row[_vm.prop]))])]) : _vm._e(), !_vm.hasChild(scope.row) ? _c('span', [_c('span', { style: { paddingLeft: _vm.paddingLeft(scope.row) } }, [_c('i', { class: 'el-tree-tabel-column-type-icon is-file ' + _vm.fileIcon })]), _c('span', [_vm._v(_vm._s(scope.row[_vm.prop]))])]) : _vm._e()];
            }]]) });
    }, staticRenderFns: [],
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
        }
    },
    computed: {
        owner: function owner() {
            var parent = this.$parent;
            while (parent && !parent.tableId) {
                parent = parent.$parent;
            }
            return parent;
        }
    },
    methods: {
        floderIcon: function floderIcon(row) {
            var hasChild = this.hasChild(row);
            var expanded = row.$extra && row.$extra.expanded;
            var floder = this.folderIcon,
                floder_open = this.folderIcon + '-open';
            return expanded ? floder_open : floder;
            // return {
            //     this.folderIcon: !expanded,
            //     : expanded,
            // }
        },
        hasChild: function hasChild(row) {
            if (row[this.childNumKey] != undefined) {
                return row[this.childNumKey] > 0 ? true : false;
            } else if (row[this.childKey] != undefined) {
                return row[this.childKey].length > 0 ? true : false;
            } else {
                return false;
            }
        },
        paddingLeft: function paddingLeft(row) {
            return parseInt(row[this.levelKey]) * 14 + 'px';
        },
        icon: function icon(row) {
            return row.$extra && row.$extra.expanded ? 'bottom' : 'right';
        },
        doexpanded: function doexpanded(index, row) {
            var vm = this;
            var data = JSON.parse(JSON.stringify(this.owner.store.states._data));
            if (data[index].$extra == undefined) {
                data[index].$extra = { expanded: true };
            } else {
                data[index].$extra.expanded = !data[index].$extra.expanded;
            }
            if (data[index].$extra.expanded) {
                var prefix = data.slice(0, index + 1);
                var i = 0;
                while (i < index + 1) {
                    data.shift();
                    i++;
                }
                data = prefix.concat(row[vm.childKey]).concat(data);
            } else {
                var id = row[vm.treeKey],
                    result = [];
                var removeIds = util.descendantsIds(id, data, this.parentKey, this.treeKey);
                data.forEach(function (item) {
                    if (util.indexOf(item[vm.treeKey], removeIds) == -1) {
                        result.push(item);
                    }
                });
                data = result;
            }
            this.owner.store.commit('setData', data);
        }
    }
};

if (window.Vue) {
    Vue.component(ElTableTreeItem$1.name, ElTableTreeItem$1);
}

return ElTableTreeItem$1;

})));
