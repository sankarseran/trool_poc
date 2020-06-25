import { IFactsHolder, IImportsHolder } from './shared';
declare class Trool {
    private readonly NO_TABLES_WARN;
    private readonly IMPORT_START_ERR;
    private readonly IMPORT_PROP_ERR;
    private readonly UPDATE_START_MSG;
    private readonly IMPORT_NAME_WARN;
    private readonly logger;
    constructor(showLogs?: boolean);
    applyRules(filePath: string, facts: IFactsHolder, imports?: IImportsHolder): Promise<IFactsHolder>;
    getImports(filePath: string): Promise<any>;
    private setupImports;
    private getImportName;
    private getTables;
    private getFacts;
    private updateFacts;
    private isLastRow;
}
export default Trool;
