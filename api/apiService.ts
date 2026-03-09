import { APIRequestContext } from '@playwright/test';
import { refreshToken } from '../utils/refreshToken';
import { recordLatency } from '../utils/latencyCalculator';
import * as dotenv from 'dotenv';

export class ApiService {
  readonly headers: any;

  constructor(private request: APIRequestContext) {
    dotenv.config();
    this.headers = { Authorization: `Token ${process.env.ACCESS_TOKEN}` };
  }

  async get(url: string, id: string = ''): Promise<any> {
    let endpoint;
    if (id) {
      endpoint = `${process.env.BASE_URL}/${url}/${id}`;
    } else {
      endpoint = `${process.env.BASE_URL}/${url}`;
    }
    const startTime = Date.now();
    let response = await this.request.get(endpoint, {
      headers: this.headers,
    });
    recordLatency('GET', url, id, startTime);

    if (response.status() === 401) {
      await refreshToken(this.request);
      const startTime = Date.now();
      response = await this.request.get(endpoint, {
        headers: this.headers,
      });
      recordLatency('GET', url, id, startTime);
    }

    if (response.ok()) {
      return response;
    } else {
      throw new Error(`GET Request: ${endpoint} - FAILED: ${response.status()} ${response.statusText()}`);
    }
  }

  async post(url: string, payload?: any, id: string = ''): Promise<any> {
    let endpoint;
    if (id) {
      endpoint = `${process.env.BASE_URL}/${url}/${id}`;
    } else {
      endpoint = `${process.env.BASE_URL}/${url}`;
    }

    const startTime = Date.now();
    let response = await this.request.post(endpoint, {
      headers: this.headers,
      data: payload,
    });
    recordLatency('POST', url, id, startTime);

    if (response.status() === 401) {
      await refreshToken(this.request);
      const startTime = Date.now();
      response = await this.request.post(endpoint, {
        headers: this.headers,
        data: payload,
      });
      recordLatency('POST', url, id, startTime);
    }

    if (response.ok()) {
      return response;
    } else {
      throw new Error(`POST Request: ${endpoint} - FAILED: ${response.status()} ${response.statusText()}`);
    }
  }

  async put(url: string, payload?: any, id: string = ''): Promise<any> {
    let endpoint;
    if (id) {
      endpoint = `${process.env.BASE_URL}/${url}/${id}`;
    } else {
      endpoint = `${process.env.BASE_URL}/${url}`;
    }

    const startTime = Date.now();
    let response = await this.request.put(endpoint, {
      headers: this.headers,
      data: payload,
    });
    recordLatency('PUT', url, id, startTime);

    if (response.status() === 401) {
      await refreshToken(this.request);
      const startTime = Date.now();
      response = await this.request.put(endpoint, {
        headers: this.headers,
        data: payload,
      });
      recordLatency('PUT', url, id, startTime);
    }

    if (response.ok()) {
      return response;
    } else {
      throw new Error(`PUT Request: ${endpoint} - FAILED: ${response.status()} ${response.statusText()}`);
    }
  }

  async delete(url: string, id: string = ''): Promise<any> {
    let endpoint;
    if (id) {
      endpoint = `${process.env.BASE_URL}/${url}/${id}`;
    } else {
      endpoint = `${process.env.BASE_URL}/${url}`;
    }

    const startTime = Date.now();
    let response = await this.request.delete(endpoint, {
      headers: this.headers,
    });
    recordLatency('DELETE', url, id, startTime);

    if (response.status() === 401) {
      await refreshToken(this.request);
      const startTime = Date.now();
      response = await this.request.delete(endpoint, {
        headers: this.headers,
      });
      recordLatency('DELETE', url, id, startTime);
    }

    if (response.status() === 204) {
      return response;
    } else {
      throw new Error(`DELETE Request: ${endpoint} - FAILED: ${response.status()} ${response.statusText()}`);
    }
  }
}
