# UI, component và assets

## Component chung và component riêng

Đặt component theo ownership, không theo cảm giác “có thể sẽ tái dùng”.

| Vị trí | Dùng cho | Ví dụ hiện tại |
| --- | --- | --- |
| `src/components/ui` | primitive không biết domain | `IconButton` |
| `src/components/layout` | shell/layout dùng toàn app | `AppBackground` |
| `src/features/solar-system/components` | UI hiểu `Planet` và copy nghiệp vụ | `PlanetCard`, `PlanetVisual`, `StatTile` |
| `screens` | điều phối query, state, navigation và sections | `HomeScreen`, `PlanetDetailScreen` |

Không chuyển `PlanetCard` ra shared chỉ vì nó được dùng hai lần trong cùng feature. Shared module là dependency ổn định của nhiều feature, không phải kho chứa component.

## Theme

Màu nền, spacing, radius và typography chung nằm tại `src/constants/theme.ts`. Theme hành tinh nằm cùng từng `Planet` vì đó là dữ liệu trình bày thuộc domain Solar System. Component không hard-code màu thương hiệu lặp lại.

App hiện dùng dark appearance có chủ đích. Nếu sản phẩm yêu cầu light mode, thêm semantic token theo scheme; không rải ternary màu ở từng component.

## Thêm PNG hành tinh

Khi có file chính thức, đặt theo convention:

```text
assets/images/planets/
  mercury.png
  venus.png
  earth.png
  mars.png
  jupiter.png
  saturn.png
  uranus.png
  neptune.png
  pluto.png
```

Metro cần đường dẫn asset tĩnh. Tạo một mapping tập trung, không ghép chuỗi trong `require()`:

```ts
export const planetImages = {
  mercury: require("@/assets/images/planets/mercury.png"),
  // ...
} satisfies Record<PlanetId, ImageSource>;
```

Sau đó thay sphere gradient trong `PlanetVisual` bằng `Image` của `expo-image`, giữ gradient card phía sau. Dùng `contentFit="contain"`, source có kích thước ổn định và PNG nền trong suốt. Nén ảnh trước khi commit; không để ảnh 4K cho một element chỉ rộng 220 px.

## Quy tắc UX

- Touch target tối thiểu 44x44.
- Icon button có `accessibilityLabel`, state chọn dùng `accessibilityState`.
- Text dài có giới hạn dòng hoặc container đủ rộng; kiểm tra tên dài như “Sao Thiên Vương”.
- Mọi request có loading, error và empty behavior.
- Tôn trọng safe area, Android back và reduced motion khi thêm animation.
- Card dùng radius tối đa 8 px theo design language hiện tại.

## Danh sách và hiệu năng

Home có 9 item nên layout hai cột tĩnh là lựa chọn đơn giản và chính xác cho bố cục bất đối xứng. Khi feature chuyển thành feed dài hoặc dataset lớn, dùng FlashList v2 trên New Architecture, khai báo `keyExtractor`, kiểm tra recycling và không giữ local state sai trong cell tái sử dụng.
