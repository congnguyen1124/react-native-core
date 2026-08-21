# Quy trình thêm feature mới

## Trước khi tạo file

Xác định feature scope theo khả năng sản phẩm, ví dụ `missions`, `quiz` hoặc `profile`. Viết ra nguồn dữ liệu, state owner và route trước. Nếu chưa phân biệt được server state với client state thì chưa nên chọn library.

## Cấu trúc gợi ý

```text
src/features/missions/
  components/
  hooks/
  screens/
  services/
  store/
  types.ts
  index.ts
```

Chỉ tạo folder có file thật. Feature chỉ export surface mà route hoặc module ngoài cần dùng qua `index.ts`.

## Trình tự triển khai

1. Định nghĩa domain type và invariant.
2. Nếu có API, định nghĩa Zod DTO schema và mapper.
3. Tạo query key factory cùng query/mutation hook.
4. Chọn đúng state owner: local, URL, Query hoặc Zustand.
5. Xây component presentational bằng props.
6. Screen kết nối data/state/navigation.
7. Route mỏng render screen.
8. Thêm error, empty, accessibility và responsive states.
9. Chạy lint, typecheck, Expo Doctor và target app.

## Ví dụ quyết định state

Feature `missions` có danh sách nhiệm vụ từ server: TanStack Query. Bộ lọc đang chọn chỉ dùng trên một màn: `useState`. Mission ID đang xem: route param. Danh sách mission offline do sản phẩm cho phép người dùng ghim qua nhiều màn: cân nhắc Zustand persist chỉ cho ID, không copy toàn bộ response.

## Khi nào đưa component ra shared

Chỉ di chuyển component sau khi ít nhất hai feature dùng cùng semantics và API props. Nếu hai component chỉ giống hình thức nhưng có hành vi nghiệp vụ khác nhau, chia sẻ token/primitive thấp hơn thay vì ép chúng thành một component có nhiều cờ boolean.

## Checklist review

- Dependency có đi một chiều `app -> feature -> shared` không?
- Query key có chứa toàn bộ input không?
- Response đã validate ở boundary chưa?
- Store có chứa server state không?
- Route có đang làm việc của screen/service không?
- Màn hình có chạy với text dài, màn hẹp và dữ liệu rỗng không?
- Có dependency mới nào được thêm nhưng chưa dùng không?
