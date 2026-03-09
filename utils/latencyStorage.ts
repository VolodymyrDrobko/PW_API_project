import fs from "fs";
import path from "path";

const LATENCY_FILE = path.resolve("latency-data.jsonl");

export type LatencyRecord = {
  endpoint: string;
  duration: number;
};

export function storeLatency(entry: LatencyRecord) {
  const record = JSON.stringify(entry) + "\n";
  fs.appendFileSync(LATENCY_FILE, record);
}

export function readLatencyData(): LatencyRecord[] {
  if (!fs.existsSync(LATENCY_FILE)) return [];

  const records = fs.readFileSync(LATENCY_FILE, "utf-8").trim().split("\n");
  return records.map((record) => JSON.parse(record));
}

export function getGroupedLatency() {
  const records = readLatencyData();

  const grouped: Record<string, number[]> = {};

  for (const entry of records) {
    if (!grouped[entry.endpoint]) {
      grouped[entry.endpoint] = [];
    }
    grouped[entry.endpoint].push(entry.duration);
  }

  return grouped;
}

export function clearLatencyData() {
  if (fs.existsSync(LATENCY_FILE)) {
    fs.unlinkSync(LATENCY_FILE);
  }
}
