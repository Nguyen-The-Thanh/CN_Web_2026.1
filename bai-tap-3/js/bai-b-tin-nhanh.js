/* BÀI B — VIẾT CODE: Lọc tin và đăng tin nhanh (news.html)
   Viết code theo đặc tả.
   Không sửa news.html, không sửa css; chỉ viết JavaScript trong file này. */

// ---------- ĐÃ CHO SẴN (không sửa) ----------
// Chặn việc gửi form tìm kiếm khi nhấn Enter, để trang không bị tải lại.
document.querySelector("#searchbar form").addEventListener("submit", (e) => e.preventDefault());

// ---------- PHẦN BẠN VIẾT ----------
const danhSachTin = document.getElementById("list");
const oTim = document.getElementById("o-tim-kiem");
const boDem = document.getElementById("bo-dem");
const khongThay = document.getElementById("khong-thay");
const oTieuDe = document.getElementById("tin-tieu-de");
const oNoiDung = document.getElementById("tin-noi-dung");
const baoLoi = document.getElementById("bao-loi");

// F1, F2, F3: cập nhật tất cả dòng và bộ đếm theo từ khóa hiện tại.
function locTin() {
    const tuKhoa = oTim.value.toLowerCase();
    const cacTin = danhSachTin.querySelectorAll("li");
    let soHien = 0;

    for (const tin of cacTin) {
        const tieuDe = tin.querySelector("h3").textContent;
        const noiDung = tin.querySelector("p").textContent;
        const khop = (tieuDe + " " + noiDung).toLowerCase().includes(tuKhoa);
        tin.classList.toggle("an", !khop);
        if (khop) soHien++;
    }

    boDem.textContent = `Đang hiển thị ${soHien}/${cacTin.length} tin`;
    khongThay.classList.toggle("an", soHien !== 0);
    if (soHien === 0) {
        khongThay.textContent = `Không tìm thấy tin nào cho "${oTim.value}"`;
    } else {
        khongThay.textContent = "";
    }
}

oTim.addEventListener("keyup", locTin);

// F4: event delegation, duy nhất một trình lắng nghe click trên #list.
danhSachTin.addEventListener("click", (e) => {
    const nut = e.target.closest("button.more");
    if (!nut || !danhSachTin.contains(nut)) return;

    const noiDung = nut.closest("li").querySelector("p");
    const daMo = noiDung.classList.toggle("day-du");
    nut.textContent = daMo ? "Thu gọn <<" : "Read more >>";
});

// F5: chỉ dùng textContent để không diễn giải HTML người dùng nhập.
document.getElementById("nut-dang").addEventListener("click", () => {
    const tieuDe = oTieuDe.value;
    const noiDung = oNoiDung.value;
    if (tieuDe.trim() === "" || noiDung.trim() === "") {
        baoLoi.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
        return;
    }

    const tin = document.createElement("li");
    const ngay = document.createElement("span");
    const tenTin = document.createElement("h3");
    const moTa = document.createElement("p");
    const nut = document.createElement("button");

    ngay.className = "time";
    ngay.textContent = homNay();
    tenTin.textContent = tieuDe;
    moTa.textContent = noiDung;
    nut.type = "button";
    nut.className = "more";
    nut.textContent = "Read more >>";

    tin.append(ngay, tenTin, moTa, nut);
    danhSachTin.prepend(tin);
    oTieuDe.value = "";
    oNoiDung.value = "";
    baoLoi.textContent = "";
    locTin();
});

locTin();
