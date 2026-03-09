import { APIRequestContext } from "@playwright/test";
import user_login from "../test-data/user_login.json";

export async function refreshToken(request: APIRequestContext) {
  const loginPayload = user_login;

  const response = await request.post(
    "https://conduit-api.bondaracademy.com/api/users/login",
    {
      data: loginPayload,
    },
  );
  const responseBody = await response.json();
  process.env["ACCESS_TOKEN"] = responseBody.user.token;
}
