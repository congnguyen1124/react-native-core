# Kiến trúc tổng quan

## Mục tiêu

Kiến trúc phải giúp developer trả lời nhanh ba câu hỏi: logic này thuộc feature nào, dữ liệu đến từ đâu và module nào được phép phụ thuộc module nào. Dự án dùng feature-first architecture, còn các lớp kỹ thuật dùng chung chỉ tồn tại khi có trách nhiệm thực sự.

```text
src/app                 route và composition root
  -> src/features       nghiệp vụ theo feature
       -> src/components, src/lib, src/constants
  -> src/providers      provider cấp ứng dụng

shared modules không import ngược từ app hoặc feature
feature A không import trực tiếp feature B
```

## Cấu trúc hiện tại

```text
src/
  app/
    _layout.tsx
    index.tsx
    planet/[id].tsx
  components/
    layout/
    ui/
  constants/
    theme.ts
  features/
    solar-system/
      components/
      data/
      hooks/
      screens/
      services/
      store/
      utils/
      types.ts
      index.ts
  lib/
    http/
  providers/
```

`src/app` chỉ ánh xạ route sang screen. Route không gọi API, không sở hữu Zustand store và không dựng UI lớn. `src/features/solar-system` sở hữu toàn bộ nghiệp vụ thiên thể. `src/lib/http` không biết Solar System là gì; nó chỉ biết thực hiện HTTP và báo lỗi có cấu trúc.

## Luồng dữ liệu

```text
API hoặc catalog local
  -> planets.api.ts
  -> Zod kiểm tra DTO
  -> mapper tạo Planet domain model
  -> TanStack Query cache PlanetCatalog
  -> screen chọn dữ liệu cần dùng
  -> component nhận props và render
```

Zustand chạy song song với luồng này nhưng chỉ giữ preference của người dùng, hiện là `favoriteIds`. Không copy danh sách hành tinh từ Query cache sang Zustand. Hai nguồn sự thật cho cùng một dữ liệu sẽ dẫn tới lệch trạng thái và code đồng bộ thủ công.

## Quy tắc phụ thuộc

- Route được import feature qua public export `src/features/solar-system/index.ts`.
- Screen điều phối query, state và navigation; component con ưu tiên nhận props.
- Service trả domain model, không trả response thô ra View.
- Shared component không chứa tên feature, text nghiệp vụ hoặc import feature store.
- Một abstraction chỉ được tạo khi có ít nhất một trách nhiệm ổn định, không tạo `utils` hoặc `helpers` chung chung.

## Vì sao không dùng Redux Toolkit

Redux Toolkit vẫn tốt cho domain event phức tạp, audit action hoặc state machine lớn. App này chưa có nhu cầu đó. TanStack Query giải quyết server state, Zustand giải quyết preference dùng chung, còn `useState` giải quyết interaction cục bộ. Thêm Redux ở giai đoạn này sẽ tạo hai tầng ceremony mà không tăng tính đúng đắn.
