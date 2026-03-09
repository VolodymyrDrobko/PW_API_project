import {
  calculateMin,
  calculateP50,
  calculateP95,
  calculateP99,
  calculateAverage,
} from "./latencyCalculator";
import { writeFileSync } from "fs";
import { getGroupedLatency } from "./latencyStorage";

export const LATENCY_REPORT_PATH = "test-results/latency-report.html";

export function generateLatencyReport(): string {
  const rows = Object.entries(getGroupedLatency()).map(([url, times]) => {
    const count = times.length;
    const min = calculateMin(times);
    const p50 = calculateP50(times);
    const p95 = calculateP95(times);
    const p99 = calculateP99(times);
    const avg = calculateAverage(times);
    return {
      url,
      count,
      min,
      p50: p50.toFixed(2),
      p95: p95.toFixed(2),
      p99: p99.toFixed(2),
      avg: avg.toFixed(2),
    };
  });

  // HTML table format
  let html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Latency Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #333; }
        table { border-collapse: collapse; width: 100%; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; font-weight: bold; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        tr:hover { background-color: #f5f5f5; }
    </style>
</head>
<body>
    <h1>API Latency Report</h1>
    <table>
        <thead>
            <tr>
                <th>Endpoint</th>
                <th>Count</th>
                <th>MIN (ms)</th>
                <th>P50 (ms)</th>
                <th>P95 (ms)</th>
                <th>P99 (ms)</th>
                <th>Average (ms)</th>
            </tr>
        </thead>
        <tbody>`;

  rows.forEach((row) => {
    html += `
            <tr>
                <td>${row.url}</td>
                <td>${row.count}</td>
                <td>${row.min}</td>
                <td>${row.p50}</td>
                <td>${row.p95}</td>
                <td>${row.p99}</td>
                <td>${row.avg}</td>
            </tr>`;
  });

  html += `
        </tbody>
    </table>
</body>
</html>`;

  return html;
}

export function publishLatencyReport() {
  const report = generateLatencyReport();

  // publish
  writeFileSync(LATENCY_REPORT_PATH, report);
  console.log(`Latency report saved to ${LATENCY_REPORT_PATH}`);
  // clearLatencyData()
}
