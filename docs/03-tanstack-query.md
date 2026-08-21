# Server state với TanStack Query

## Server state khác client state

Server state thuộc quyền sở hữu của hệ thống bên ngoài. Nó có thể cũ, đang tải, lỗi, được nhiều màn hình cùng đọc và cần đồng bộ lại khi app có mạng hoặc quay lại foreground. Những vấn đề này là lý do dùng TanStack Query thay vì tự viết `useEffect + useState` cho từng request.

Query hiện tại ở `src/features/solar-system/hooks/use-planets-query.ts`:

```ts
export const planetKeys = {
  all: ["solar-system"] as const,
  catalog: () => [...planetKeys.all, "catalog"] as const,
};

export function usePlanetsQuery() {
  return useQuery(planetCatalogQueryOptions);
}
```

Query key là địa chỉ của cache. Key phải mô tả toàn bộ input ảnh hưởng tới response. Ví dụ query chi tiết theo ID cần key `['solar-system', 'planet', planetId]`, không dùng một key cố định rồi đổi `queryFn`.

## Cấu hình mobile lifecycle

`src/providers/AppProviders.tsx` tạo một `QueryClient` ổn định bên ngoài component. Provider còn nối:

- `expo-network` với `onlineManager` để query biết lúc mất/kết nối lại mạng.
- `AppState` với `focusManager` để refetch theo foreground trên native.
- `staleTime` để tránh gọi mạng lại khi dữ liệu vẫn đủ mới.
- `gcTime` để giữ cache không còn observer trong một khoảng hợp lý.

Không tạo `new QueryClient()` trong render; mỗi render sẽ làm mất cache.

## Đổ dữ liệu ra View

Screen gọi hook, không gọi `fetch` trực tiếp:

```tsx
const catalogQuery = usePlanetsQuery();
const planets = catalogQuery.data.items;

return planets.map((planet) => (
  <PlanetCard key={planet.id} planet={planet} />
));
```

App dùng `initialData` là catalog đã kiểm chứng, nên nội dung xuất hiện ngay và API đồng bộ ở nền. Nếu API lỗi, Query vẫn giữ dữ liệu cũ và Screen hiển thị notice. Đây là chiến lược local-first phù hợp với dữ liệu thiên văn ít biến động; không mặc định áp dụng cho số dư tài khoản hoặc dữ liệu giao dịch.

## Mutation

Khi thêm API thay đổi dữ liệu, dùng `useMutation`. Sau mutation thành công, ưu tiên cập nhật cache có chủ đích bằng `setQueryData` hoặc invalidate query liên quan. Không gọi `invalidateQueries()` không key vì nó làm toàn app refetch.

```ts
const mutation = useMutation({
  mutationFn: updatePlanetNote,
  onSuccess: (_, input) => {
    queryClient.invalidateQueries({
      queryKey: ["solar-system", "planet", input.planetId],
    });
  },
});
```

## Trạng thái UI phải xử lý

- `isPending`: lần đầu chưa có dữ liệu.
- `isFetching`: đang fetch, có thể vẫn có data cũ.
- `error`: request hoặc contract thất bại.
- empty state: request thành công nhưng danh sách rỗng.
- pull-to-refresh: gọi `refetch`, không gọi service trực tiếp.

Đừng dùng `isFetching` để thay toàn bộ màn hình bằng spinner khi cache vẫn có data; điều đó làm UI nhấp nháy không cần thiết.
