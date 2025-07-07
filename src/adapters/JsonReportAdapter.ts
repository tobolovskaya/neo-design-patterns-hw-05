import { ReportAdapter } from "./ReportAdapter";
import { DirectoryReport } from "../core/DirectoryReport";

export class JsonReportAdapter implements ReportAdapter {
  export(report: DirectoryReport): string {
    // TODO
    return JSON.stringify(report, null, 2);
  }
}
