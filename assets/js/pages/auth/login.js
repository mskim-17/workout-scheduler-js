export function initLogin() {
  
  document.getElementById('login').addEventListener('click', check);

  function check() {

    const loginError = document.getElementById('login-error');
    loginError.textContent = "";
    loginError.textContent = "";

    const inputId = document.getElementById("user-id").value;
    const inputPw = document.getElementById("user-pw").value;

    const storedUsers = localStorage.getItem("users");
    const userMap = storedUsers ? JSON.parse(storedUsers) : {};

    const user = userMap[inputId];

    if (!user) {
      loginError.textContent = "⚠️ 계정이 존재하지 않습니다.";
      return;
    }

    if (user.password !== inputPw) {
      loginError.textContent = "⚠️ 비밀번호가 틀렸습니다.";
      return;
    }

    localStorage.setItem("currentUser", user.username);
    if (user.onBoard === true) {
      window.location.href = "/mypage/home.html";
    } else {
      window.location.href = "/onboard/onboard.html";
    }
  }
}