# Undercover: luật chơi & kế hoạch

Nguồn luật: [How to play](https://www.yanstarstudio.com/undercover-how-to-play), [Special roles](https://www.yanstarstudio.com/undercover-special-roles), [FAQ](https://www.yanstarstudio.com/undercover-faq).

## 1. Luật chơi (bản chính thức)

**Người chơi:** 3–20. **Chế độ gốc:** Pass-and-Play (1 máy), Private Room (mỗi người 1 máy), Public Room.

### Vai trò

| Vai                    | Nhận được                 | Mục tiêu                                          |
| ---------------------- | ------------------------- | ------------------------------------------------- |
| Civilian (Dân thường)  | Từ A (cả nhóm giống nhau) | Tìm và loại hết Undercover + Mr. White            |
| Undercover (Gián điệp) | Từ B, **gần giống** A     | Sống sót đến cuối                                 |
| Mr. White              | **Không có từ**           | Sống sót đến cuối, hoặc đoán đúng từ của Civilian |

Mỗi ván có ít nhất 1 Undercover hoặc 1 Mr. White. Không ai biết vai của mình lúc đầu: Civilian và Undercover đều nghĩ mình cầm từ "đúng".

### Vòng chơi (lặp đến khi có người thắng)

1. **Description:** người ngẫu nhiên nói đầu; lần lượt mỗi người nói 1 từ/cụm từ mô tả từ của mình. Không được nói chính từ đó. Mô tả đủ để đồng minh nhận ra, nhưng không lộ cho Mr. White.
2. **Discussion:** tranh luận ai là kẻ xâm nhập.
3. **Elimination:** người còn sống bỏ phiếu loại 1 người; nhiều phiếu nhất bị loại (người đã bị loại không được bỏ phiếu).
   - Nếu người bị loại là **Mr. White** → có 1 lượt đoán từ Civilian; đúng thì Mr. White thắng ngay.

### Thắng

- **Civilians** thắng: loại hết Undercover và Mr. White.
- **Infiltrators** (Undercover và/hoặc Mr. White) thắng: còn sống đến khi chỉ còn **1 Civilian**. Undercover + Mr. White thắng chung được.
- **Mr. White** thắng riêng: đoán đúng từ Civilian.
- **Điểm:** Civilian 3, Mr. White 7, Undercover 9 (đã đổi khỏi 2/6/10 của app gốc).

### Hòa phiếu (FAQ đề xuất 3 cách)

1. Oẳn tù tì. 2. Người hòa phiếu mô tả thêm 1 lượt rồi bỏ phiếu lại. 3. Dùng vai Goddess of Justice.

### Vai đặc biệt (tùy chọn)

| Vai                | Hiệu ứng                                                          | Điều kiện          |
| ------------------ | ----------------------------------------------------------------- | ------------------ |
| Goddess of Justice | Quyết định khi hòa phiếu; vẫn có quyền này sau khi bị loại        | –                  |
| Lovers             | 2 người; một người bị loại thì người kia cũng bị loại (lộ khi đó) | ≥5 người           |
| Mr. Meme           | Mỗi vòng 1 người ngẫu nhiên phải mô tả bằng cử chỉ                | cần nhìn thấy nhau |
| Revenger           | Khi bị loại được loại thêm 1 người                                | ≥5 người           |
| Duelists           | 2 người đấu bí mật; bị loại trước −2 điểm, người kia +2           | ≥5 người           |
| Ghost              | Người bị loại vẫn thảo luận và bỏ phiếu                           | –                  |
| Falafel Vendor     | Đầu mỗi vòng tặng falafel cho 1 người (bảo vệ hoặc phá)           | ≥4 người           |
| Boomerang          | Lần đầu bị đa số phiếu, mọi phiếu bật ngược lại người đã bỏ       | –                  |
| Joy Fool           | Nếu là người đầu tiên bị loại: +4 điểm                            | –                  |

### Điểm chưa rõ trong nguồn (cần quyết định riêng)

- Bảng số vai theo số người: nguồn chính thức chỉ nói "app tự gợi ý". Bảng dưới lấy từ ảnh người dùng cung cấp (trả lời của một chatbot AI, **chưa xác minh với app gốc**), dùng làm **mặc định**; người chơi chỉnh tay được. Luật hợp lệ khi chỉnh tay (suy từ 13 dòng chụp từ app + thử nghiệm trực tiếp; `n` người, `u` Gián điệp, `w` Mr. White): `u ≥ 0`, `w ≥ 0`, `1 ≤ u + w ≤ floor(n/2)`, và `u ≤ floor((n-1)/2)`, `w ≤ floor((n-1)/2)` (không loại vai nào chiếm từ nửa số người trở lên). Đã thử trên app: 7 người tổng xâm nhập 4 bị chặn; 6 người `3,0`/`0,3` bị chặn, `2,0`/`0,2` được; 8 người `3,0`, `0,3`, `3,1`, `1,3` được.

  | Người | Dân | Gián điệp | Mr. White |
  | ----- | --- | --------- | --------- |
  | 3     | 2   | 1         | 0         |
  | 4     | 3   | 1         | 0         |
  | 5     | 3   | 1         | 1         |
  | 6     | 4   | 1         | 1         |
  | 7     | 5   | 1         | 1         |
  | 8     | 5   | 2         | 1         |
  | 9     | 6   | 2         | 1         |
  | 10    | 7   | 2         | 1         |
  | 11    | 8   | 2         | 1         |
  | 12    | 9   | 2         | 1         |
  | 13    | 9   | 3         | 1         |
  | 14    | 10  | 3         | 1         |
  | 15    | 10  | 3         | 2         |
  | 16    | 11  | 3         | 2         |
  | 17    | 12  | 3         | 2         |
  | 18    | 13  | 3         | 2         |
  | 19    | 13  | 4         | 2         |
  | 20    | 14  | 4         | 2         |

- Falafel "bảo vệ hay phá hoại": nguồn không nói chi tiết → vai này để sau, hoặc tự thiết kế.
- Có cho Mr. White đoán khi chỉ còn 2 người? Nguồn không nói → mặc định vẫn cho đoán.

## 2. Các phương án kỹ thuật

### A. Kiến trúc ứng dụng

|               | Vite + React SPA (**chọn**)                  | Next.js                           |
| ------------- | -------------------------------------------- | --------------------------------- |
| Phù hợp       | Game client-side, 1 trang, không cần SEO sâu | Cần SSR/SEO, API routes cùng repo |
| Deploy Vercel | Static + `vercel.json` rewrite               | Native                            |
| Chi phí       | Bundle nhỏ, build nhanh                      | Nặng hơn mức cần thiết            |

### B. Chế độ chơi (khác biệt lớn nhất về công sức)

| Phương án                                                         | Cần backend     | Độ khó     | Ghi chú                                                          |
| ----------------------------------------------------------------- | --------------- | ---------- | ---------------------------------------------------------------- |
| **1. Pass-and-Play (1 máy)**                                      | Không           | Thấp       | Chạy offline, deploy tĩnh trên Vercel. **Làm trước.**            |
| 2. Online room: Realtime SaaS (Supabase Realtime / Ably / Pusher) | Có (managed)    | Trung bình | Hợp Vercel; free tier đủ dùng                                    |
| 3. Online room: PartyKit / Cloudflare Durable Objects             | Có (host riêng) | Trung bình | Server-authoritative tự nhiên, WebSocket thật                    |
| 4. Tự host Socket.io                                              | Có              | Cao        | **Không chạy được trên Vercel** (serverless không giữ WebSocket) |

Quyết định: làm (1) hoàn chỉnh trước; viết game engine là **reducer thuần TypeScript** (không dính React) để (2)/(3) tái dùng. Khi làm online, server phải giữ vai/từ bí mật và chỉ gửi cho từng người từ của riêng họ (không broadcast state đầy đủ).

### C. Stack đã setup

- React 19 + TypeScript + Vite 8, bun.
- Tailwind CSS v4 (mobile-first).
- shadcn/ui (preset `nova`) trên **Base UI** (`components.json`, `style: base-nova`). Thêm component bằng `bunx --bun shadcn@latest add <name>`. Code component nằm trong `src/components/ui/` (của mình, sửa tự do). Giao diện luôn dark (`class="dark"` ở `index.html`); màu vai (`civilian`, `undercover`, `mrwhite`) là token riêng trong `src/index.css`.
- Zustand (state). Lưu ván đang chơi, từ đã dùng, bộ từ tùy chỉnh bằng **IndexedDB** (`idb-keyval` qua `persist` + custom async storage) để F5 không mất ván. Riêng ngôn ngữ giữ ở localStorage vì i18next cần đọc đồng bộ lúc khởi động.
- react-i18next + language detector (EN/VI, lưu `undercover:lang`).
- react-router-dom, Vitest (test engine), oxlint, Prettier (+ plugin sắp xếp class Tailwind).

### D. Dữ liệu từ khóa

- File JSON theo ngôn ngữ: `src/data/words/{en,vi}.json`, mỗi phần tử `{ id, category, a, b }` (a = Civilian, b = Undercover). Hoán đổi a/b ngẫu nhiên mỗi ván.
- Tự viết bộ từ gốc (không sao chép word list của app gốc). Ban đầu ~100 cặp/ngôn ngữ, chia chủ đề. Cho người chơi nhập bộ từ riêng (tính năng có ở app gốc).
- Chống lặp: lưu id cặp đã dùng vào IndexedDB.
- Cặp tiếng Việt cần tự biên soạn, không dịch máy từ tiếng Anh.

## 3. Kế hoạch triển khai

| Phase  | Nội dung                                                                                                                                                                                                                                                                                                                                                     | Kiểm chứng                                                                                                                                                                                                                       |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0 ✅   | Setup project, i18n EN/VI, Tailwind, router, vercel.json                                                                                                                                                                                                                                                                                                     | `bun run build`, đổi ngôn ngữ trên trình duyệt                                                                                                                                                                                   |
| 1 ✅   | **Engine** (`src/game/`): types, chia vai, chọn cặp từ, vòng chơi, bỏ phiếu + hòa phiếu, điều kiện thắng, Mr. White đoán, điểm                                                                                                                                                                                                                               | 52 test Vitest + mô phỏng 5000 ván ngẫu nhiên (3–20 người) luôn kết thúc                                                                                                                                                         |
| 2 ✅   | **UI Pass-and-Play** theo app gốc (`/`, `/setup`, `/play`): thanh trượt số người + chỉnh vai → mỗi người chọn 1 thẻ úp, nhập tên, xem từ → màn mô tả 1 trang (thứ tự đánh số) → loại người công khai (chọn + xác nhận) hoặc "Mô tả lại" → Mr. White đoán → thông báo → kết quả + điểm. Luôn hiện "kẻ xâm nhập còn lại". Ván lưu IndexedDB, có "Tiếp tục ván" | Chạy thử ván 8 người (EN) trên viewport điện thoại: chọn thẻ lộn xộn, tên trùng bị chặn, mô tả lại, Mr. White đoán sai, reload giữa ván, kết thúc. Chưa thử: Mr. White đoán đúng trên UI, giao diện tiếng Việt sau khi đổi luồng |
| 3 ✅   | Dữ liệu từ EN/VI (120 cặp, 10 chủ đề), chọn chủ đề, từ tùy chỉnh, chống lặp                                                                                                                                                                                                                                                                                  | Không lặp cặp trong N ván; từ Việt hiển thị đúng dấu                                                                                                                                                                             |
| 4 ✅   | Trang luật chơi 2 ngôn ngữ, PWA/offline, polish (âm thanh, hoạt ảnh, timer tùy chọn)                                                                                                                                                                                                                                                                         | Đã thử offline (tắt server vẫn mở được /setup); chưa chạy Lighthouse                                                                                                                                                             |
| 5      | Vai đặc biệt (Goddess, Ghost, Revenger, Lovers, Boomerang, Joy Fool, Duelists, Mr. Meme)                                                                                                                                                                                                                                                                     | Test engine từng vai + tương tác giữa các vai                                                                                                                                                                                    |
| 6      | Online room (phương án B.2 hoặc B.3), server-authoritative                                                                                                                                                                                                                                                                                                   | Thử nhiều tab/thiết bị, đảm bảo không lộ từ của người khác                                                                                                                                                                       |
| Deploy | Push GitHub → import Vercel (framework Vite, build `bun run build`, output `dist`)                                                                                                                                                                                                                                                                           | URL production chạy được, refresh route không 404                                                                                                                                                                                |

## 4. Cấu trúc thư mục

```
src/
  game/        engine thuần TS (không import React) + *.test.ts   [Phase 1]
  data/words/  en.json, vi.json                                    [Phase 3]
  store/       Zustand store bọc engine                            [Phase 2]
  pages/       HomePage, Setup, Play, Rules...
  components/  UI dùng chung; setup/, groups/, game/ (+ result/), ui/ (shadcn)
  i18n/        index.ts + locales/{en,vi}.json
agent/         PLAN.md + quy tắc cho agent (rules/*.md), nằm ngoài src
```

## 5. Lệnh

```
bun dev          # chạy local
bun run build    # tsc -b + vite build
bun run test     # vitest
bun run lint     # oxlint
bun run format   # prettier --write
```

### Quyết định trong engine (Phase 1)

- Luồng pha (theo app gốc): `reveal → describe → vote → (guess) → elimination → describe …` → `finished`. Reducer thuần `reduce(state, action, rng)`; hành động sai pha thì ném lỗi.
- Chọn thẻ: người chơi chọn bất kỳ thẻ nào chưa lật, nhập tên (không rỗng, không trùng không phân biệt hoa thường), xem từ; chỉ khi bấm OK mới ghi vào ván (`CONFIRM_CARD`), nên reload giữa chừng không làm mất từ của ai.
- Bỏ phiếu công khai: cả nhóm chỉ tay, người cầm máy chọn người bị loại (`ELIMINATE`). Hòa phiếu = `DESCRIBE_AGAIN` (quay lại mô tả cùng vòng, không loại ai), như nút "Describe again" của app gốc.
- Lưới người chơi (màn mô tả và bỏ phiếu dùng chung `PlayerCard`) xếp theo lượt nói của vòng (`seatingOrder`), cố định đến khi sang vòng mới ("Mô tả lại" giữ nguyên lượt nói); số trên thẻ là lượt nói. Người bị loại giữa vòng vẫn nằm yên ô cũ, xám, có tâm ngắm + vai theo màu; sang vòng sau họ dồn xuống cuối lưới. Kết quả loại người / Mr. White đoán là dialog đè lên màn bỏ phiếu (không đổi trang). Loại người cuối cùng cũng hiện dialog trước khi sang màn kết quả (`afterElimination` luôn vào `elimination`, `NEXT_ROUND` chuyển sang `finished` nếu đã có `winner`).
- Mr. White đoán từ: không phân biệt hoa/thường và khoảng trắng thừa, **phân biệt dấu** (dấu thanh tiếng Việt đổi nghĩa từ).
- Điểm: mọi người thuộc phe thắng được điểm theo vai (Dân 3, Mr. White 7, Gián điệp 9), dù còn sống hay đã bị loại; phe xâm nhập thắng chung nên cả Gián điệp lẫn Mr. White đều được điểm; Mr. White đoán đúng thì chỉ Mr. White được điểm. Đây là suy luận từ luật, nguồn không nói rõ.
- Người nói đầu mỗi vòng được chọn ngẫu nhiên trong số người còn sống; sau đó theo thứ tự chỗ ngồi.
- Nhóm (`src/game/groups.ts`, lưu IndexedDB cùng store, store version 5): nhóm = số thứ tự tự đặt (tên mặc định "Nhóm Mới N", đổi tên được) + màu + danh sách tên + điểm cộng dồn theo thành viên + ngày chơi cuối. Ván đầu của bàn mới (chưa chọn nhóm) kết thúc thì tự tạo nhóm và chọn luôn; mọi ván kết thúc đều cộng điểm vào nhóm (`applyGameResult`, khớp tên không phân biệt hoa/thường). Trang `/groups` (danh sách, chọn, xóa, tạo) và `/groups/:id` (đổi tên, màu, thêm/xóa/đổi thứ tự thành viên, "Lưu lại thay đổi" mới ghi). Trang thiết lập hiện thẻ nhóm đã chọn (nút X bỏ chọn) và đặt số người = số thành viên. Ván có nhóm: mỗi ván bốc ngẫu nhiên thứ tự thành viên (`pickQueue`); hộp thoại gọi tên người kế tiếp ("Hãy chọn một lá bài" + OK), họ chọn thẻ là vào thẳng màn xem từ, không nhập tên. Thiếu tên trong hàng đợi thì nhập tay và tên mới tự thêm vào nhóm.
- Màn kết thúc: hộp thoại chúc mừng (cúp + biểu tượng phe thắng + dải tiêu đề), chạm để vào bảng điểm: hàng người còn sống nền xanh, người bị loại có tâm ngắm, thanh điểm theo tổng cộng dồn, huy hiệu "+điểm ván này", nút Trang chủ / Chơi lại.
- Lịch sử từ: mỗi nhóm giữ danh sách cặp từ đã chơi (`Group.usedWords`, khóa `ngôn ngữ:id`); bàn chưa có nhóm dùng `usedWords` chung và khi tự tạo nhóm thì nhóm kế thừa danh sách đó. Thẻ nhóm hiện "đã dùng / còn lại" theo ngôn ngữ đang chọn. Chỉ khi mọi cặp đã dùng hết (lịch sử xóa và bốc lại) ván được đánh dấu `wordRepeated`, và màn chọn thẻ hiện cảnh báo cho tới khi người đầu tiên chọn xong. Nút "Đổi từ khác" (có hộp xác nhận) ở màn chọn thẻ bắt đầu ván mới với từ mới; cặp cũ vẫn tính là đã dùng.
- Bố cục: `Frame` (header ghim, vùng giữa cuộn bằng `ScrollArea`, footer ghim) dùng cho mọi màn game, thiết lập, danh sách nhóm, sửa nhóm. Nút Quay lại trên header màn game hỏi xác nhận rồi kết thúc ván (`ConfirmDialog`). Huy hiệu thứ tự nói lớn (36px) đặt đè lên viền avatar. Sửa nhóm: kéo thả bằng `@dnd-kit` (tay nắm trước avatar), `motion` cho hiệu ứng thêm/xóa dòng; thêm người chơi dùng `PlayerDialog` + `NameInput` như lúc chọn thẻ. Mọi `Input` tắt autofill/spellcheck/autocorrect mặc định.
- Giao diện "liquid glass": nền `app-bg` (2 vệt pastel: hồng `#e8a3a3` góc trên trái, xanh xám `#a9b8e0` góc dưới phải, trên nền `#17141b`) + các utility `glass`, `glass-heavy` (dialog, menu), `glass-prominent` (nút chính), `glass-inset` (ô nhập) trong `src/index.css`. `Button`/`Card`/`Dialog`/`Select`/`Input` đã dùng sẵn; nút tròn dùng `GlassButton` (motion), nhấn thì phóng to như iOS. Mọi màn dùng `AppHeader` (kể cả trang chủ), chọn ngôn ngữ bằng shadcn `Select`. Chuyển trang kiểu iOS (push trượt từ phải, pop trượt ra, trang dưới parallax -28% + phủ tối) ở `AnimatedRoutes`; hướng suy từ độ sâu route nên mọi cách quay lại đều ra hiệu ứng "back".
- Từ khóa (Phase 3): 120 cặp mỗi ngôn ngữ, 10 chủ đề × 12 (chủ đề chỉ là nhãn, không lọc). Cặp tự thêm lưu theo ngôn ngữ trong store (`customWords`), thêm/xóa ở trang `/words` (`WordsPage`), được gộp vào kho từ khi bốc. Chống lặp dùng lịch sử từ của nhóm như trên.
- Quy tắc code cho agent ở `agent/` (biến CSS thay vì giá trị cứng trong `className`; mỗi file một component). Component tách theo thư mục: `components/{setup,groups,game,game/result,ui}`.
- Phase 4: trang luật chơi `/rules` (`RulesPage`, `RuleSection`, `RuleList`; chữ ở khóa `rules.*`, link từ trang chủ). Đồng hồ mô tả tùy chọn (Tắt/30/60/90 giây, `OptionsSettings` trên trang thiết lập): `SpeakerBar` hiện người đang nói, đếm ngược, nút "Tiếp" sang người kế, 5 giây cuối đổi màu và có tiếng tick. Cài đặt (đồng hồ, âm thanh) lưu localStorage `undercover:settings` (`settingsStore`). Âm thanh tự tổng hợp bằng Web Audio (`lib/sound.ts`, không có file âm thanh): lật thẻ, loại người, thắng, tick, hết giờ; `useGameSounds` chạy ở `PlayPage`. PWA bằng `vite-plugin-pwa` (autoUpdate, precache toàn bộ bản build, `navigateFallback` về `index.html` nên mọi route chạy offline); icon sinh từ `public/icon.svg` bằng `bun run pwa:icons`. Màn hình che từ đã có sẵn nhờ thẻ úp + hộp thoại từng người nên không làm thêm.

## 6. Kế hoạch chi tiết Phase 5 và 6 (làm sau Phase 4 và deploy)

### Phase 5: vai đặc biệt

- **Cách làm:** thêm `specialRoles` vào `GameState`; mỗi vai là một module nhỏ trong `src/game/special/` với các hook thuần (`onElimination`, `onTie`, `onVoteResolved`, `scoreAdjust`), engine gọi theo thứ tự cố định. Vai đặc biệt chồng lên vai chính (Civilian / Undercover / Mr. White), không thay thế.
- **Thứ tự làm (dễ → khó):** Joy Fool (+4 điểm) → Goddess of Justice (quyết định hòa phiếu) → Ghost (người bị loại vẫn bỏ phiếu) → Lovers → Revenger → Boomerang → Duelists → Mr. Meme (cử chỉ, chỉ cần nhắc trên UI) → Falafel Vendor (luật chưa rõ, tự thiết kế hoặc bỏ).
- **Điều kiện số người:** Lovers, Revenger, Duelists cần ≥5 người; Falafel ≥4 (xem bảng ở mục 1). Trang thiết lập chỉ cho bật vai khi đủ người.
- **UI:** thẻ riêng trên trang thiết lập để bật/tắt từng vai; màn chọn thẻ hiện thêm dòng vai đặc biệt sau từ khóa; hộp thoại loại người nêu hiệu ứng kích hoạt.
- **Kiểm chứng:** test engine cho từng vai và các cặp tương tác (Lovers + Revenger, Boomerang + Goddess…), mô phỏng 5000 ván ngẫu nhiên có vai đặc biệt luôn kết thúc, điểm không âm bất thường.
- **Rủi ro:** tương tác giữa các vai (ai ưu tiên khi cùng kích hoạt) phải chốt bằng bảng ưu tiên trước khi code.

### Phase 6: chơi online

- **Chọn phương án:** server-authoritative. Ứng viên chính là Cloudflare Durable Objects hoặc một dịch vụ realtime (Supabase Realtime / PartyKit) vì Vercel không giữ WebSocket lâu dài. Chốt phương án sau khi so chi phí và độ phức tạp.
- **Mô hình:** phòng có mã 4–6 ký tự; chủ phòng chỉnh thiết lập; mỗi người vào bằng tên. Server giữ `GameState` đầy đủ, chạy cùng engine `src/game/` (đã thuần TS nên dùng lại được), gửi cho từng client **bản đã lọc** (chỉ từ của chính người đó, vai của người đã bị loại khi lộ).
- **Giao thức:** client gửi `Action` (như reducer hiện tại), server kiểm quyền (đúng người, đúng pha) rồi áp dụng và phát lại trạng thái đã lọc.
- **Mất kết nối:** giữ chỗ vài phút, vào lại bằng token lưu trong thiết bị; chủ phòng có thể loại người treo.
- **Việc cần làm trước:** tách `createGame` để server tự chia vai và từ; thêm `projectState(state, playerId)` thuần và có test không lộ từ.
- **Kiểm chứng:** nhiều tab và thiết bị; test `projectState` không chứa từ hay vai của người khác ở mọi pha; thử mất mạng giữa ván.

## 7. Cập nhật sau Phase 4

- **Tên app:** bỏ phụ đề "Word Party Game" (trùng app gốc); tên hiển thị là "Undercover" (`index.html`, manifest, README, PLAN). Bản tiếng Việt gọi Mr. White là "Mũ trắng".
- **Trang chủ:** bỏ dòng mô tả và 3 badge vai; thay bằng logo mới (`AppLogo`, nguồn `public/icon.svg`: mũ cạp rộng trên mặt nạ) + tiêu đề + nút Ván mới / Tiếp tục / Luật chơi.
- **Id vai trò có tiền tố ưu tiên:** `ROLE` trong `src/game/types.ts` (khóa TITLE_CASE: `ROLE.CIVILIAN`, `ROLE.UNDERCOVER`, `ROLE.MR_WHITE`) = `000_CIVILIAN`, `100_UNDERCOVER`, `200_MR_WHITE` (số nhỏ = ưu tiên trước, chừa khoảng trống để chèn vai mới). Giá trị này được lưu trong ván và là hậu tố khóa dịch (`roles.000_CIVILIAN`, `rules.roles.100_UNDERCOVER`).. Team thắng (`civilians`/`infiltrators`/`mrWhite`) và `RoleConfig` giữ nguyên.
- **Tránh vi phạm bản quyền / thương hiệu:** README ghi rõ đây là bản làm lại độc lập, miễn phí, công khai, phi thương mại, tham khảo luật từ app của Yanstar Studio, không liên kết với họ. Việc còn lại trước khi phát hành rộng: đặt tên và biểu tượng riêng cho vai đặc biệt ở Phase 5, thay bảng số vai lấy từ nguồn không chính thức bằng bảng tự tính.

## 8. Quy ước code mới

- Quy tắc nằm ở `agent/rules/`: `code-style.md` (component `const` + `React.FC`, 3 khối import, early return, `useEffect` luôn có cleanup, tách class bằng `cn`, không magic value), `structure.md` (thư mục `const/`, `hooks/`, `helpers/`).
- Cấu trúc: `src/const/{roles,routes,game,storage,audio,motion,ui,gameUi,pages}.ts`, `src/hooks/*` (mọi hook), `src/helpers/*` (`utils` chứa `cn`, `groupLabel`, `sound`). Alias shadcn `utils` trỏ `@/helpers/utils`.
- Tối ưu render: `React.memo` cho `Avatar`, `PlayerCard`, `FaceDownCard`, `ScoreRow`, `TurnBadge`, `SortableMemberRow`; đồng hồ nằm trong `SpeakerBar` để lưới không render lại mỗi giây; form thêm cặp từ tách thành `components/words/AddWordForm`.

## 9. Cài đặt, theme sáng, xóa dữ liệu

- Trang `/settings` (`SettingsPage`, `components/settings/*`): ngôn ngữ, giao diện (Tối mặc định / Sáng), đồng hồ mô tả, âm thanh, và mục "Dữ liệu ứng dụng" có nút xóa (có xác nhận) gọi `helpers/clearAppData` (xóa IndexedDB + localStorage rồi về trang chủ). Mở từ biểu tượng bánh răng ở trang chủ và trang thiết lập ván (`SettingsButton`); `OptionsSettings` đã bỏ.
- Theme: `settingsStore.theme`, hook `useTheme` bật/tắt class `dark` trên `<html>` và cập nhật `theme-color`; script nhỏ trong `index.html` áp theme trước khi vẽ để không nháy. Mọi giá trị theo theme là biến CSS ở `:root` (sáng) và `.dark` (tối): `--app-bg`, `--civilian`…, `--subtle*`, `--sunken`, bộ `--glass-*`, `--prom-*`, `--inset-*`. Kính sáng dùng lớp trắng đục + viền đen nhạt; nút chính ở theme sáng là mực đen.
- Lỗi "play.elimination.000_CIVILIAN" hiện nguyên khóa: do khi đổi id vai trò (v8) tôi quên đổi các khóa dịch `play.elimination.*` (khóa ghép động theo role). Không liên quan migrate dữ liệu; đã đổi khóa ở en/vi.

## 10. Bỏ migrate, const thay string

- App chưa từng deploy nên toàn bộ code migrate đã xóa (`migrateOld`, `withPrefixedRoles`, `LEGACY_ROLE`, `GAME_VERSION` cũ); store ván bắt đầu ở `STORAGE.GAME_VERSION = 1`. Dữ liệu IndexedDB cũ của máy dev sẽ bị bỏ qua, dùng "Xóa dữ liệu ứng dụng" nếu cần.
- Kiểu trong `src/game/types.ts` suy từ const: `PHASE`, `TEAM`, `ACTION`, `GROUP_COLOR` (`src/const/phases.ts`), `ROLE`, `SOUND`; code dùng const, không dùng chuỗi literal.
- Lint (oxlint): `curly`, `func-style: expression` (mọi hàm là `const` arrow), `no-magic-numbers`, `react/rules-of-hooks`; xem `agent/rules/code-style.md`.

## 11. Bộ từ 1000 cặp/ngôn ngữ

- Mỗi ngôn ngữ 1000 cặp, 20 chủ đề × 50: food, drink, animal, object, place, vehicle, job, nature, sport, entertainment, clothing, technology, home, school, music, festival, health, hobby, travel, shopping. Chủ đề chỉ là nhãn (không lọc).
- Cách sinh: nghiên cứu tiêu chí cặp tốt (đủ quen thuộc, nhiều điểm chung nhưng có một khác biệt rõ, không đồng nghĩa, không quá xa, không thương hiệu/nhạy cảm) → 40 subagent viết 50 cặp/chủ đề/ngôn ngữ (tiếng Việt viết gốc, không dịch) → script gộp, loại cặp trùng và từ dùng quá 2 lần → 33 subagent bổ sung phần thiếu → 8 subagent rà soát, đề xuất thay ~15% cặp yếu → script áp dụng thay thế có kiểm tra lại. Kiểm tự động bằng `src/data/words/words.test.ts` (id duy nhất, cặp không lặp, từ dùng ≤ 2 lần, độ dài ≤ 20).
- Chưa có người duyệt từng cặp; nên chơi thử và loại cặp chưa ổn.

## 12. Lint mới, a11y, bộ từ theo thư mục

- Lint: thêm `typescript/no-non-null-assertion` (cấm `!`), bộ rule `jsx-a11y/*` (gồm `no-autofocus`). Ô nhập trong dialog focus bằng `initialFocus` của Base UI thay vì `autoFocus`.
- `React.memo`: viết component thường `NameView`, cuối file `export const Name = React.memo(NameView)` (áp dụng cho `Avatar`, `PlayerCard`, `FaceDownCard`, `TurnBadge`, `ScoreRow`, `SortableMemberRow`).
- Hằng số: mọi hằng module-level nằm trong `src/const/` (đã chuyển `ROLE_COLOR`, `GROUP_COLOR*`, `SUPPORTED_LANGUAGES`, `LANGUAGE_LABELS`, `SPLASH_BG`; bỏ các bản re-export `MIN/MAX_PLAYERS`, `TIMER_OPTIONS`, `CUSTOM_CATEGORY`).
- A11y theo Vercel Web Interface Guidelines (`agent/rules/a11y.md`): skip link, `<main id>`, `color-scheme`, `touch-action`, reduced motion cho CSS, `aria-label`/`aria-hidden`, văn bản ẩn cho số lượt và vai người bị loại, bàn phím cho kéo thả (dnd-kit), `overscroll-contain` cho popup.
- Bộ từ: `src/data/words/<ngôn ngữ>/<chủ đề>/<độ khó>.json` (120 file, mỗi file `{id,a,b}`; chủ đề và độ khó lấy từ đường dẫn qua `import.meta.glob`). Độ khó easy/medium/hard (≈ 35/45/20%) do 8 subagent gán. Hướng dẫn thêm từ ở `agent/rules/words.md`; `WordEntry` có thêm `difficulty` (từ tự thêm mặc định medium). Chưa có chế độ chọn độ khó trong UI.
