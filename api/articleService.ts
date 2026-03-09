import { APIRequestContext, expect } from "@playwright/test";
import { ApiService } from "./apiService";

export class ArticleService extends ApiService {
  readonly ARTICLES: string = "articles";

  constructor(request: APIRequestContext) {
    super(request);
  }

  async createArticle(payload: any): Promise<any> {
    const response = await this.post(this.ARTICLES, payload);
    expect(response.status()).toEqual(201);
    const responseBody = await response.json();
    expect(responseBody.article).toBeDefined();

    const id = responseBody.article.slug;
    console.log(`ARTICLE with ID: ${id} CREATED:`);
    console.log(responseBody);

    return responseBody;
  }

  async deleteArticle(id: string): Promise<any> {
    const response = await this.delete(this.ARTICLES, id);
    expect(response.status()).toEqual(204);
    console.log(`Article with ID: ${id} - DELETED`);
  }
}
