# Chạy app trên Android device

App đã được kiểm tra trên Android emulator với Expo SDK 57. Nếu mở trên máy Android thật bằng Expo Go mà chỉ thấy màn hình loading xoay mãi, nguyên nhân thường không nằm ở React Native screen hoặc TanStack Query, mà nằm ở việc Expo Go không truy cập được Metro URL mặc định qua LAN.

## Chọn đúng chế độ chạy

### Android emulator

Emulator chạy trên cùng máy dev nên dùng lệnh mặc định:

```bash
npm run android
```

Lệnh này mở Expo Go trên emulator và trỏ tới Metro ở `8081`.

### Android device thật cùng mạng ổn định

Nếu điện thoại và máy dev cùng Wi-Fi, không bị firewall/router chặn, có thể chạy:

```bash
npm start
```

Sau đó scan QR code trong terminal bằng Expo Go.

### Android device thật bị kẹt loading

Khi device chỉ xoay loading sau khi scan QR, chuyển sang tunnel:

```bash
npm run start:tunnel
```

Hoặc nếu device đang kết nối qua ADB và muốn CLI tự mở app:

```bash
npm run android:device
```

Tunnel chậm hơn LAN nhưng ổn định hơn trong các mạng có router cô lập client, Wi-Fi công cộng, VPN, firewall hoặc máy dev nằm trong môi trường sandbox/container. Expo CLI có thể yêu cầu cài `@expo/ngrok` lần đầu; chấp nhận cài đặt hoặc cài trước theo hướng dẫn của Expo.

## Checklist khi vẫn không vào được app

1. Đóng hẳn Expo Go trên điện thoại rồi mở lại QR mới.
2. Chạy lại Metro với cache sạch:

```bash
npx expo start --tunnel --clear
```

3. Kiểm tra điện thoại có internet và không bật VPN chặn domain tunnel.
4. Kiểm tra máy dev không có process khác giữ port `8081`.
5. Cập nhật Expo Go trên Android lên bản mới nhất tương thích SDK 57.

## Khi nào cần development build

Expo Go phù hợp cho app hiện tại vì các package đang dùng đều nằm trong Expo SDK. Nếu sau này thêm native module không có trong Expo Go, hãy chuyển sang development build bằng `expo-dev-client` và dùng `npx expo run:android`. Không commit thư mục `android/` sinh ra bởi prebuild nếu task không yêu cầu native project.
