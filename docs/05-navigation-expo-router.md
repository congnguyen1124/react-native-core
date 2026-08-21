# Navigation với Expo Router

## Cấu trúc route

Expo Router ánh xạ filesystem thành URL:

```text
src/app/index.tsx          -> /
src/app/planet/[id].tsx    -> /planet/:id
src/app/_layout.tsx        -> root Stack và providers
```

`index.tsx` chỉ render `HomeScreen`. Route động đọc `id`, kiểm tra bằng `isPlanetId` rồi truyền domain ID vào `PlanetDetailScreen`. Screen không tự đọc một object hành tinh từ params vì URL chỉ nên mang định danh nhỏ, serializable và có thể deep link.

## Điều hướng có type

```ts
router.push({
  pathname: "/planet/[id]",
  params: { id: planet.id },
});
```

`experiments.typedRoutes` đã bật trong `app.json`. Expo CLI sinh type route vào `.expo/types`, thư mục này không commit. CI cần chạy bước sinh type của Expo trước `tsc` nếu checkout sạch chưa có type route.

## Quay lại an toàn

Màn chi tiết kiểm tra `router.canGoBack()`. Nếu được mở từ deep link và không có history, app dùng `router.replace('/')` thay vì để nút Back không làm gì.

## Quy tắc route

- Route mỏng; không gọi service hoặc store action trong file route.
- Params phải được validate trước khi vào screen.
- Dùng URL cho state cần chia sẻ/deep link; không đưa filter tạm thời vào URL nếu sản phẩm không cần.
- Dùng layout group khi nhiều route chia sẻ navigator, auth guard hoặc tab shell.
- Không import trực tiếp từ `@react-navigation/*` trong app code với Expo Router SDK 57; dùng API được export bởi `expo-router`.

## Khi thêm route mới

Tạo file route, thêm feature screen, khai báo screen trong layout nếu cần options riêng, chạy Expo CLI để cập nhật typed routes, sau đó kiểm tra deep link và Android back. Với modal, định nghĩa `presentation` trong Stack screen options thay vì tự mô phỏng modal toàn màn hình.
