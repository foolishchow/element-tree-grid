import util from './util'
const methods = {
    floderIcon(context, row) {
        var expanded = false;
        if (row.$extra) {
            expanded = row.$extra.expanded;
        }
        var floder = context.props.folderIcon,
            floder_open = context.props.folderIcon + '-open';
        return expanded ? floder_open : floder;
    },
    hasChild(context, row) {
        if (row[context.props.childNumKey] != undefined) {
            return row[context.props.childNumKey] > 0 ? true : false;
        } else if (row[context.props.childKey] != undefined) {
            return row[context.props.childKey].length > 0 ? true : false;
        } else {
            return false;
        }
    },
    paddingLeft(context, row) {
        return (parseInt(row[context.props.levelKey]) * 14) + 'px';
    },
    icon(row) {
        if (row.$extra && row.$extra.loading == true) return 'el-icon-loading';
        return row.$extra && row.$extra.expanded ? 'el-icon-caret-bottom' : 'el-icon-caret-right';
    },
    has(context, item, list) {
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
    },
    commit(context, instance, list) {
        let owner = instance.store.table; //methods.owner(context.parent);
        let states = instance.store.states;

        let selection = states.selection;
        owner.store.commit('setData', list);

        owner.clearSelection();
        let data = owner.store.states._data;
        data.forEach(row => {
            if (methods.has(context, row, selection)) {
                owner.toggleRowSelection(row)
            }
        });
        // states.selection = currentSelecttion;
        // if(selection != undefined){
        //     states.selection = selection;
        // }
    },
    setSystemExpanded(list,isRender){
        list.forEach(item=>{
            item.$extra = { isRender:isRender }
        })
    },
    doexpanded(instance, context, index, row,isRender=false) {
        let owner = instance.store.table; //methods.owner(context.parent);
        let states = instance.store.states;
        var vm = context.props;
        var data = JSON.parse(JSON.stringify(owner.store.states._data))
        if(data[index].$extra != undefined && data[index].$extra.loading) return;
        if (data[index].$extra == undefined) {
            data[index].$extra = { expanded: true }
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
                vm.remote(row, function(result) {
                    let list = owner.store.states._data;
                    let _index = util.index(hash, list);
                    list[_index].$extra = {
                        loading: false,
                        expanded: result && result.length > 0 ? true : false
                    }
                    if (result && result.length > 0) {
                        var prefix = list.slice(0, _index + 1);
                        var i = 0;
                        while (i < _index + 1) {
                            list.shift();
                            i++;
                        }
                        methods.setSystemExpanded(result,isRender)
                        list = prefix.concat(result).concat(list);
                    } else {
                        list[_index][vm.childNumKey] = 0;
                    }
                    methods.commit(context, instance, list);
                })
            } else {
                var prefix = data.slice(0, index + 1);
                var i = 0;
                while (i < index + 1) {
                    data.shift();
                    i++;
                }
                var result = row[vm.childKey];
                methods.setSystemExpanded(row[vm.childKey],isRender)
                data = prefix.concat(result).concat(data);
                // owner.store.commit('setData', data);
                methods.commit(context, instance, data);
            }
        } else {
            var id = row[vm.treeKey],
                result = [];
            var removeIds = util.descendantsIds(id, data, vm.parentKey, vm.treeKey);
            data.forEach(function(item) {
                if (util.indexOf(item[vm.treeKey], removeIds) == -1) {
                    result.push(item)
                }
            });
            data = result;
            methods.commit(context, instance, data);
            // owner.store.commit('setData', data);
        }
    },
    evalDetails(context,scope,h){
        let detail ;
        if( context.data.scopedSlots ){
            detail = context.data.scopedSlots.default(scope)
        }else{
            let text = context.props.formatter ? context.props.formatter(scope.row,scope.column): scope.row[context.props.prop];
            detail = h('span', {}, text);
        }
        return detail;
    }
}
export default {
    functional: true,
    name: 'el-table-tree-column',
    props: {
        prop: {
            type: String
        },
        label: String,
        className: String,
        labelClassName: String,
        property: String,
        prop: String,
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
        expandKey:{
            type:String,
            default:'expanded'
        }
    },
    render(createElement, context) {
        let h = createElement;
        let floder = (scope) => {
            var row = scope.store.table.store.states._data[scope.$index];
            if(row && row[context.props.expandKey] && (row.$extra == undefined || row.$extra.expanded == undefined ) ){
                methods.doexpanded(scope, context, scope.$index, scope.row,false);
            }else if(row && (row.$extra == undefined || row.$extra.isRender) ){
                if( context.props.expandAll){
                    methods.doexpanded(scope, context, scope.$index, scope.row,true);
                } 
            }

            return h('span', {
                on: {
                    click: function($event) {
                        $event.preventDefault();
                        methods.doexpanded(scope, context, scope.$index, scope.row);
                    }
                }
            }, [
                h('span', { style: { paddingLeft: methods.paddingLeft(context, scope.row) } }, [
                    h('i', { class: methods.icon(scope.row) }),
                    scope._self._v(" "),
                    h('i', {
                        class: methods.floderIcon(context, scope.row),
                        staticStyle: { "padding-right": "7px" }
                    })
                ]),
                methods.evalDetails(context,scope,h)
            ]);
        };
        let leaf = (scope) => {
            return h('span', [
                h('span', {
                    style: { paddingLeft: methods.paddingLeft(context, scope.row) }
                }, [
                    h('i', {
                        class: context.props.fileIcon,
                        staticStyle: { "padding-right": "7px", "padding-left": "18px" }
                    })
                ]),
                methods.evalDetails(context,scope,h)
            ])
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
                default: function(scope) {
                    return methods.hasChild(context, scope.row) ? [floder(scope)] : [leaf(scope)]
                }
            }
        })
    }
}
