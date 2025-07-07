import { ReportAdapter } from "../adapters/ReportAdapter";
import { JsonReportAdapter } from "../adapters/JsonReportAdapter";
import { CsvReportAdapter } from "../adapters/CsvReportAdapter";
import { XmlReportAdapter } from "../adapters/XmlReportAdapter";
import { AnalyzerFacade } from "../core/AnalyzerFacade";
import * as fs from "fs";
import * as path from "path";

export class ReportManager {
  generateAndSaveReport(dirPath: string, format: string): void {
    let adapter: ReportAdapter;
    const fmt = format.toLowerCase();
    switch (fmt) {
      case "json":
        adapter = new JsonReportAdapter();
        break;
      case "csv":
        adapter = new CsvReportAdapter();
        break;
      case "xml":
        adapter = new XmlReportAdapter();
        break;
      default:
        console.error(`Невідомий формат: ${format}`);
        return;
    }

    const analyzer = new AnalyzerFacade(adapter);
    try {
      const reportStr = analyzer.generateReport(dirPath);

      // Створити директорію reports, якщо не існує
      const reportsDir = path.resolve(process.cwd(), "reports");
      if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir, { recursive: true });
      }

      // Ім'я файлу з часовою міткою
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const fileName = `report_${timestamp}.${fmt}`;
      const filePath = path.join(reportsDir, fileName);

      // Зберегти файл
      fs.writeFileSync(filePath, reportStr, "utf-8");

      console.log(`Звіт успішно збережено у ${filePath}`);
    } catch (error: any) {
      console.error("Помилка під час генерації чи збереження звіту:", error.message);
    }
  }

  // TODO: Implement the ReportManager class
}
