# State và Zustand

## State thực chất là gì

State là dữ liệu có thể thay đổi theo thời gian và ảnh hưởng tới kết quả render hoặc hành vi ứng dụng. Không phải mọi biến đều nên là state, và không phải mọi state đều nên đưa vào global store.

Phân loại trước khi code:

| Loại state | Ví dụ | Nơi đặt |
| --- | --- | --- |
| UI cục bộ | tab `Tất cả/Đã lưu`, modal đang mở | `useState` trong screen/component |
| Form state | input, validation, dirty state | local state hoặc form library khi form phức tạp |
| URL/navigation state | `planetId`, route hiện tại | Expo Router params |
| Server state | danh sách hành tinh từ API | TanStack Query |
| Client state dùng chung | danh sách ID yêu thích | Zustand |

Nếu xóa component mà state không cần tồn tại nữa, ưu tiên state cục bộ. Nếu dữ liệu do server sở hữu, không đặt vào Zustand.

## Store hiện tại

Store nằm tại `src/features/solar-system/store/use-solar-system-store.ts` vì nó chỉ phục vụ feature Solar System.

```ts
const favoriteIds = useSolarSystemStore((state) => state.favoriteIds);
const toggleFavorite = useSolarSystemStore((state) => state.toggleFavorite);
```

Selector làm component chỉ subscribe đúng lát state cần dùng. Không viết `useSolarSystemStore()` không selector vì component sẽ render lại với mọi thay đổi của store.

Action `toggleFavorite` nằm trong store để invariant “một ID chỉ xuất hiện một lần” được quản lý tại một nơi. Component không tự đọc mảng, sửa mảng rồi ghi ngược lại.

## Persist bằng AsyncStorage

Middleware `persist` chỉ lưu `favoriteIds` thông qua `partialize`. `hasHydrated` và state UI không cần sống qua lần mở app tiếp theo nên không được ghi xuống storage.

AsyncStorage là bất đồng bộ. Lần render đầu có thể dùng giá trị mặc định trước khi rehydrate hoàn tất. Với nội dung ảnh hưởng mạnh tới layout hoặc auth, phải đọc `hasHydrated` và render trạng thái khởi tạo phù hợp. Không dùng AsyncStorage để lưu access token nhạy cảm; dùng SecureStore cho thông tin bí mật trên thiết bị.

Khi đổi shape dữ liệu đã persist, tăng version storage và thêm migration. Không âm thầm đổi ý nghĩa key `solar-system-preferences-v1` vì người dùng cũ vẫn mang dữ liệu cũ.

## Khi nào tạo store mới

Tạo store theo domain có vòng đời độc lập, không tạo một `useAppStore` khổng lồ. Ví dụ auth có thể có `useSessionStore`, còn composer phức tạp có thể có store riêng. Nếu hai store liên tục gọi action của nhau, ranh giới domain đang có vấn đề và cần xem lại trước khi thêm coupling.

## Anti-pattern cần tránh

- Copy response API vào Zustand sau mỗi request.
- Lưu component, Promise hoặc navigation object trong store.
- Persist mọi field theo mặc định.
- Tạo getter/action chỉ để bọc một dòng nhưng không bảo vệ invariant nào.
- Dùng global state để né việc thiết kế props hợp lý.
