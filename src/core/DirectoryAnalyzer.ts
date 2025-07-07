import * as fs from 'fs';
import * as path from 'path';
import { DirectoryReport } from './DirectoryReport';

export class DirectoryAnalyzer {
  analyze(dirPath: string): DirectoryReport {
    const report: DirectoryReport = {
      files: 0,
      directories: 0,
      totalSize: 0,
      extensions: {}
    };

    const traverse = (currentPath: string) => {
      const entries = fs.readdirSync(currentPath);
      for (const entry of entries) {
        const fullPath = path.join(currentPath, entry);
        const stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
          report.directories++;
          traverse(fullPath);
        } else if (stats.isFile()) {
          report.files++;
          report.totalSize += stats.size;
          const ext = path.extname(entry) || '<no_ext>';
          report.extensions[ext] = (report.extensions[ext] || 0) + 1;
        }
      }
    };

    traverse(dirPath);
    return report;
  }
}

