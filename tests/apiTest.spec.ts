import { test } from "@playwright/test";
import articlePayload from "../test-data/article.json";
import { ArticleService } from "../api/articleService";
import { publishLatencyReport } from "../utils/latencyReport";
import {faker} from "@faker-js/faker"

test("Create article @runThis", async ({ request }) => {
  const articleService = new ArticleService(request);
  const title = faker.string.alpha(5);
  const description = faker.string.alpha(10);
  const body = faker.string.alpha(20);
  const tagList = [faker.string.alpha(3), faker.string.alpha(3)];

  articlePayload.article.title = title;
  articlePayload.article.description = description;
  articlePayload.article.body = body;
  articlePayload.article.tagList = tagList;

  // Create article
  const articleResponseBody =
    await articleService.createArticle(articlePayload);

  // Delete article
  await articleService.deleteArticle(articleResponseBody.article.slug);

  publishLatencyReport();
});

test("Create article duplicate @runThis", async ({ request }) => {
  const articleService = new ArticleService(request);
  const title = faker.string.alpha(5);
  const description = faker.string.alpha(10);
  const body = faker.string.alpha(20);
  const tagList = [faker.string.alpha(3), faker.string.alpha(3)];

  articlePayload.article.title = title;
  articlePayload.article.description = description;
  articlePayload.article.body = body;
  articlePayload.article.tagList = tagList;

  // Create article
  const articleResponseBody =
    await articleService.createArticle(articlePayload);

  // Delete article
  await articleService.deleteArticle(articleResponseBody.article.slug);

  publishLatencyReport();
});
