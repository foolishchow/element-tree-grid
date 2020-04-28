import { RenderContext } from "vue";
import { ColumnScope } from ".";
import { ElTableTreeColumnPropsInner } from "./props";
export declare class ElTableInject {
    private Injected;
    private InjectedTable;
    isInjected(scope: ColumnScope): boolean;
    Inject(context: RenderContext<ElTableTreeColumnPropsInner>, scope: ColumnScope): void;
}
declare const _default: ElTableInject;
export default _default;
