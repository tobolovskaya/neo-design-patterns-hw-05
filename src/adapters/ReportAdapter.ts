import { DirectoryReport } from '../core/DirectoryReport';

export interface ReportAdapter {
    export(report: DirectoryReport): string;
} 