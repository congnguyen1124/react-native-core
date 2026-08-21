import { z } from "zod";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly url?: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "ApiError";
  }
}

type GetJsonOptions = Omit<RequestInit, "body" | "method">;

export async function getJson<T>(
  url: string,
  schema: z.ZodType<T>,
  options: GetJsonOptions = {},
): Promise<T> {
  let response: Response;

  try {
    response = await fetch(url, {
      ...options,
      method: "GET",
      headers: {
        Accept: "application/json",
        ...options.headers,
      },
    });
  } catch (error) {
    throw new ApiError("Không thể kết nối đến máy chủ.", undefined, url, {
      cause: error,
    });
  }

  if (!response.ok) {
    throw new ApiError(
      `Máy chủ phản hồi với mã ${response.status}.`,
      response.status,
      url,
    );
  }

  const payload: unknown = await response.json();
  const parsed = schema.safeParse(payload);

  if (!parsed.success) {
    throw new ApiError("Dữ liệu API không đúng contract.", response.status, url, {
      cause: parsed.error,
    });
  }

  return parsed.data;
}
