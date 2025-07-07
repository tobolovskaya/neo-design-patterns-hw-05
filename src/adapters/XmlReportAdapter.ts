import { ReportAdapter } from "../adapters/ReportAdapter";
import { DirectoryReport } from "../core/DirectoryReport";

export class XmlReportAdapter implements ReportAdapter {
  export(report: DirectoryReport): string {
    // TODO
    const escape = (str: string) => str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');

        let xml = `<report>`;
        xml += `<files>${report.files}</files>`;
        xml += `<directories>${report.directories}</directories>`;
        xml += `<totalSize>${report.totalSize}</totalSize>`;
        xml += `<extensions>`;
        for (const [ext, count] of Object.entries(report.extensions)) {
            xml += `<extension name="${escape(ext)}">${count}</extension>`;
        }
        xml += `</extensions>`;
        xml += `</report>`;
        return xml;
  }
}
