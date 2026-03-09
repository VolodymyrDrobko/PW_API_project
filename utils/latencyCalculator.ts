import { LatencyRecord, storeLatency } from './latencyStorage';

export function calculatePercentile(times: number[], percentile: number): number {
  if (times.length === 0) return 0;
  const sorted = [...times].sort((a, b) => a - b);
  const index = Math.ceil((percentile / 100) * sorted.length) - 1;
  return sorted[index];
}

export function calculateAverage(times: number[]): number {
  if (times.length === 0) return 0;
  return times.reduce((sum, time) => sum + time, 0) / times.length;
}

export function calculateMin(times: number[]): number {
  if (times.length === 0) return 0;
  return Math.min(...times);
}

export function calculateP50(times: number[]): number {
  return calculatePercentile(times, 50);
}

export function calculateP95(times: number[]): number {
  return calculatePercentile(times, 95);
}

export function calculateP99(times: number[]): number {
  return calculatePercentile(times, 99);
}

export function recordLatency(method: string, url: string, id: string, startTime: number) {
  let endpoint;

  if (id) {
    endpoint = `${method}: api/${url}/{id}`;
  } else {
    endpoint = `${method}: api/${url}`;
  }
  const duration = Date.now() - startTime;

  const latencyRecord: LatencyRecord = { endpoint, duration };
  storeLatency(latencyRecord);
}
