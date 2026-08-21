# Gọi API và kiểm tra dữ liệu bằng Zod

## Vì sao TypeScript chưa đủ

TypeScript chỉ kiểm tra code lúc build. JSON từ mạng vẫn là `unknown` ở runtime. Nếu backend trả `gravity: null`, đổi field hoặc trả HTML lỗi, một type assertion `as Planet` không bảo vệ ứng dụng. Zod xác minh dữ liệu thật trước khi mapper sử dụng.

## Pipeline hiện tại

```text
HomeScreen
  -> usePlanetsQuery
  -> fetchPlanetCatalog(signal)
  -> getJson(url, zodSchema)
  -> remote DTO hợp lệ
  -> mergeRemoteMetrics
  -> PlanetCatalog
  -> Query cache
  -> PlanetCard
```

`src/lib/http/http-client.ts` chịu trách nhiệm transport: header, status HTTP, parse JSON và chuẩn hóa `ApiError`. `src/features/solar-system/services/planets.api.ts` chịu trách nhiệm contract và mapping nghiệp vụ. Không đưa Zod schema của Solar System vào HTTP client chung.

## Cấu hình endpoint

Tạo `.env` từ `.env.example` và điền URL public hoặc URL của backend/proxy:

```env
EXPO_PUBLIC_SOLAR_API_URL=https://your-public-api.example.com/rest
```

Service hiện mong endpoint `GET {baseUrl}/bodies` theo contract Solar System OpenData. Khi không có biến môi trường, service trả catalog local. Khi endpoint được cấu hình nhưng lỗi, TanStack Query giữ dữ liệu đã có và cho phép retry.

Biến `EXPO_PUBLIC_*` xuất hiện trong bundle và có thể bị đọc bởi người dùng. Không đặt API secret, private key hoặc token có quyền truy cập thật tại đây. Nếu API gốc cần secret, mobile app gọi backend/BFF của dự án; backend mới gắn secret rồi gọi upstream.

## Thêm endpoint mới

1. Định nghĩa DTO schema bằng Zod ngay cạnh service.
2. Gọi `getJson` và truyền `AbortSignal` từ TanStack Query.
3. Map DTO sang domain type mà UI cần.
4. Tạo query key chứa đủ input.
5. Viết loading, error, empty và stale-data behavior.

Ví dụ tối giản:

```ts
const detailSchema = z.object({
  id: z.string(),
  gravity: z.number().nullable(),
});

export function fetchPlanet(id: string, signal?: AbortSignal) {
  return getJson(`${apiUrl}/bodies/${id}`, detailSchema, { signal });
}
```

Không parse bằng chuỗi thủ công, không `catch` rồi trả mảng rỗng cho mọi lỗi. Mảng rỗng là dữ liệu hợp lệ; lỗi mạng là trạng thái khác và View cần biết sự khác biệt.

## DTO không phải domain model

API dùng `avgTemp` theo Kelvin, trong khi View hiển thị Celsius. Mapper chuyển đổi một lần tại boundary. Domain model có tên rõ như `averageTemperatureC`, nhờ đó component không phải biết đơn vị hoặc quirks của upstream.

Catalog tĩnh trong `data/planets.ts` giữ nội dung biên tập, theme và fallback. Dữ liệu API chỉ cập nhật các metric phù hợp; API không được quyền ghi đè copy UX hoặc màu thương hiệu.
