// Project 1. The Letters — behaviour

(function () {
  "use strict";

  // 구글 폼 응답 주소와 각 질문의 entry 번호예요.
  // 폼 질문을 바꾸면 이 값들도 다시 확인해야 해요.
  var GOOGLE_FORM_ACTION =
    "https://docs.google.com/forms/d/e/1FAIpQLSfpYSVhYKbg8JmfFlj5al4iv2U6i9ANZe9R31G7aYcGUfCfxg/formResponse";
  var ENTRY_NAME = "entry.1520570575"; // 이름
  var ENTRY_ADDRESS = "entry.135508556"; // 우편 주소
  var ENTRY_WISH = "entry.234729471"; // 특별히 원하는 게 있다면? (선택)

  // ---------- 사진: assets/photo.jpg 가 없으면 placeholder를 보여줘요 ----------
  var photoSlot = document.getElementById("photo-slot");
  var photoImg = document.getElementById("photo-img");

  if (photoSlot && photoImg) {
    photoImg.addEventListener("error", function () {
      photoImg.style.display = "none";
      photoSlot.classList.add("is-placeholder");
    });
  }

  // ---------- 신청 폼 ----------
  var form = document.getElementById("signup-form");
  var nameInput = document.getElementById("name");
  var addressInput = document.getElementById("address");
  var wishInput = document.getElementById("wish");
  var errorText = document.getElementById("form-error");
  var confirmMsg = document.getElementById("confirm-msg");
  var submitBtn = document.getElementById("submit-btn");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var name = nameInput.value.trim();
      var address = addressInput.value.trim();
      var wish = wishInput ? wishInput.value.trim() : "";

      if (!name || !address) {
        errorText.textContent = "이름과 주소를 모두 입력해주세요.";
        confirmMsg.classList.remove("show");
        return;
      }
      errorText.textContent = "";
      confirmMsg.classList.remove("show");

      var data = new FormData();
      data.append(ENTRY_NAME, name);
      data.append(ENTRY_ADDRESS, address);
      if (wish) {
        data.append(ENTRY_WISH, wish);
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "보내는 중...";

      // 구글 폼은 CORS 응답을 안 줘서(no-cors) 성공 여부를 직접 읽을 순 없지만,
      // 네트워크 요청 자체가 문제없이 나가면 응답 시트엔 정상적으로 쌓여요.
      fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body: data,
      })
        .then(function () {
          confirmMsg.classList.add("show");
          form.reset();
        })
        .catch(function () {
          errorText.textContent = "제출 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.";
        })
        .then(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = "신청 보내기";
        });
    });
  }
})();
