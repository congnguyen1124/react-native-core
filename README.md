# Solar System

Ứng dụng khám phá Hệ Mặt Trời xây dựng bằng Expo SDK 57, React Native 0.86 và Expo Router. App gồm Home dạng lưới bất đối xứng, màn chi tiết thiên thể, đồng bộ dữ liệu qua TanStack Query và danh sách yêu thích được lưu bằng Zustand.

## Chạy dự án

Yêu cầu Node.js `22.13.x` trở lên.

```bash
npm install
npx expo start
```

Nếu mở trên Android device thật bằng Expo Go mà chỉ thấy loading xoay, chạy Metro qua tunnel:

```bash
npm run start:tunnel
```

Khi device đang kết nối ADB và muốn CLI tự mở app:

```bash
npm run android:device
```

Chi tiết tại [docs/09-chay-android-device.md](docs/09-chay-android-device.md).

Các lệnh kiểm tra chính:

```bash
npm run lint
npx tsc --noEmit
npx expo-doctor
```

## Tài liệu kỹ thuật

Bắt đầu từ [docs/README.md](docs/README.md). Bộ tài liệu giải thích bằng tiếng Việt cách tổ chức feature, phân biệt client state và server state, gọi API, validate bằng Zod, điều hướng với Expo Router và đặt component đúng phạm vi.

## Dữ liệu và ảnh

App luôn có catalog thiên văn cục bộ để hoạt động ổn định. Có thể kết nối một API/proxy tương thích bằng `EXPO_PUBLIC_SOLAR_API_URL`; xem [.env.example](.env.example) và [docs/04-api-va-zod.md](docs/04-api-va-zod.md).

Ảnh PNG hành tinh sẽ được thêm sau theo hướng dẫn tại [docs/06-ui-component-va-assets.md](docs/06-ui-component-va-assets.md). Không đặt secret trong biến `EXPO_PUBLIC_*` vì các giá trị này được đóng gói vào ứng dụng.
