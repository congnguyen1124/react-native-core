# Chất lượng, hiệu năng và vận hành

## Quality gates tối thiểu

```bash
npm run lint
npx tsc --noEmit
npx expo-doctor
```

Thay đổi UI phải chạy ít nhất một native target và web khi có hỗ trợ web. Kiểm tra màn hẹp, màn rộng, safe area, keyboard nếu có input và Android back. Không coi typecheck là bằng chứng UI đúng.

## Test theo rủi ro

- Mapper DTO sang domain: unit test với field null, thiếu và sai đơn vị.
- Zustand action/migration: unit test invariant và persisted shape.
- Query hook: integration test loading/error/cache khi feature có mutation quan trọng.
- Navigation flow cốt lõi: end-to-end test khi pipeline CI được thiết lập.
- Component thuần trình bày: chỉ snapshot khi snapshot thực sự bảo vệ contract; ưu tiên test hành vi.

Không thêm test framework chỉ để có một test tượng trưng. Khi thiết lập test, dùng phiên bản tương thích Expo SDK 57 và ghi command vào `package.json`.

## Hiệu năng

- Đo trước khi tối ưu. React Compiler đã bật; không rải `useMemo`/`useCallback` theo thói quen.
- Query selector và Zustand selector phải đủ hẹp để giảm render không liên quan.
- Dùng `expo-image` cho ảnh hành tinh, kích thước asset phù hợp và cache policy rõ.
- Với list dài, đánh giá FlashList v2 và recycling behavior.
- Animation liên tục phải chạy trên UI thread bằng Reanimated và tôn trọng reduced motion.
- Không parse/transform response lớn trong render; map tại service hoặc query `select` ổn định.

## Network và offline

TanStack Query đã nhận trạng thái mạng từ `expo-network`. Query read có retry giới hạn; mutation không retry mặc định để tránh gửi hành động hai lần. Với mutation tài chính hoặc tạo đơn hàng, cần idempotency key ở backend, không giải quyết chỉ bằng client.

Catalog local giúp Solar System vẫn đọc được khi offline. Đây là quyết định nghiệp vụ, không phải lý do để nuốt mọi lỗi. UI vẫn báo lần đồng bộ thất bại.

## Dependency hygiene

Trước khi thêm package, kiểm tra maintenance, New Architecture, Expo SDK và footprint. Expo package cài bằng `npx expo install`; package JavaScript thuần có thể dùng `npm install`. Không chạy `npm audit fix --force` một cách máy móc vì có thể nâng major và phá compatibility; đọc dependency chain và xử lý có chủ đích.

## Nguồn kỹ thuật và dữ liệu

- Expo SDK 57: https://docs.expo.dev/versions/v57.0.0/
- Expo Router SDK 57: https://docs.expo.dev/versions/v57.0.0/sdk/router/
- TanStack Query React Native: https://tanstack.com/query/latest/docs/framework/react/react-native
- Zustand persist: https://zustand.docs.pmnd.rs/reference/integrations/persisting-store-data
- Zod: https://zod.dev/
- NASA planet facts: https://science.nasa.gov/solar-system/planets/
- NASA Pluto facts: https://science.nasa.gov/dwarf-planets/pluto/facts/
- Solar System OpenData contract: https://api.le-systeme-solaire.net/swagger/
