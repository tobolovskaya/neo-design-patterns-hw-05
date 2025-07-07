import { DirectoryAnalyzer } from "./DirectoryAnalyzer";
import { ReportAdapter } from "../adapters/ReportAdapter";
import { DirectoryReport } from './DirectoryReport';

// Патерн Фасад: спрощує роботу з аналізатором та адаптером
export class AnalyzerFacade {
  private analyzer: DirectoryAnalyzer;
  private adapter: ReportAdapter;

  constructor(adapter: ReportAdapter) {
    this.analyzer = new DirectoryAnalyzer();
    this.adapter = adapter;
  }

  generateReport(path: string): string {
    const report: DirectoryReport = this.analyzer.analyze(path);
    const output: string = this.adapter.export(report);
    return output;
  }
}
