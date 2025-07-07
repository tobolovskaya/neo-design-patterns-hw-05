import { ReportAdapter } from "./ReportAdapter";
import { DirectoryReport } from "../core/DirectoryReport";

export class CsvReportAdapter implements ReportAdapter {
  export(report: DirectoryReport): string {
    // TODO
    const lines: string[] = [];
    lines.push(["Metric", "Value"].join(","));
    lines.push(["files", report.files.toString()].join(","));
    lines.push(["directories", report.directories.toString()].join(","));
    lines.push(["totalSize", report.totalSize.toString()].join(","));
    lines.push(["extension", "count"].join(","));
    for (const ext in report.extensions) {
      lines.push([ext, report.extensions[ext].toString()].join(","));
    }
    return lines.join("\n");
  }
}
