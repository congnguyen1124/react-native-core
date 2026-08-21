# Tài liệu phát triển Solar System

Bộ tài liệu này là onboarding kỹ thuật cho developer mới. Nên đọc theo thứ tự dưới đây trước khi mở rộng app:

1. [Kiến trúc tổng quan](01-kien-truc-tong-quan.md)
2. [State và Zustand](02-state-va-zustand.md)
3. [Server state với TanStack Query](03-tanstack-query.md)
4. [Gọi API và kiểm tra dữ liệu bằng Zod](04-api-va-zod.md)
5. [Navigation với Expo Router](05-navigation-expo-router.md)
6. [UI, component và assets](06-ui-component-va-assets.md)
7. [Quy trình thêm feature](07-them-feature-moi.md)
8. [Chất lượng, hiệu năng và vận hành](08-chat-luong-va-hieu-nang.md)

## Stack được chọn

| Trách nhiệm | Công cụ | Lý do |
| --- | --- | --- |
| Runtime native/web | Expo SDK 57 | Đồng bộ React Native 0.86, React 19.2 và New Architecture |
| Navigation | Expo Router | File-based routing, deep link và typed routes trong cùng một hệ thống |
| Server state | TanStack Query v5 | Cache, retry, stale state, request lifecycle và refetch theo kết nối |
| Client state dùng chung | Zustand v5 | Store nhỏ, selector rõ ràng, không ép component qua Provider riêng |
| Persist client state | AsyncStorage | Storage key-value tương thích Expo/React Native |
| Runtime validation | Zod v4 | Không tin dữ liệu mạng chỉ vì đã khai báo TypeScript type |
| Network lifecycle | expo-network | Kết nối trạng thái mạng native với `onlineManager` của TanStack Query |
| Gradient | expo-linear-gradient | API ổn định, chạy native và web, tương thích SDK 57 |

Không cài thư viện chỉ vì phổ biến. Ví dụ, Home chỉ có 9 thiên thể nên layout hai cột chủ động phù hợp hơn FlashList. Khi dữ liệu tăng lên hàng trăm phần tử, đánh giá FlashList v2 theo hướng dẫn hiệu năng.
