import { ReportManager } from './app/ReportManager';

const targetPath = process.argv[2] || '.';
const format = process.argv[3] || 'json';

const manager = new ReportManager();
manager.generateAndSaveReport(targetPath, format);

