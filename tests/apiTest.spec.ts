import { test, expect } from "@playwright/test";
import articlePayload from "../test-data/article.json";
import article_2Payload from "../test-data/article_2.json";
import { ArticleService } from "../api/articleService";
import { publishLatencyReport } from "../utils/latencyReport";

test("Create article @runThis", async ({ request }) => {
  const articleService = new ArticleService(request);

  // Create article
  const articleResponseBody =
    await articleService.createArticle(articlePayload);

  // Delete article
  await articleService.deleteArticle(articleResponseBody.article.slug);

  publishLatencyReport();
});

test("Create article duplicate @runThis", async ({ request }) => {
  const articleService = new ArticleService(request);

  // Create article
  const articleResponseBody =
    await articleService.createArticle(article_2Payload);

  // Delete article
  await articleService.deleteArticle(articleResponseBody.article.slug);

  publishLatencyReport();
});
