export function initRegister() {
  document.getElementById('regist').addEventListener('click', registCheck);

  function registCheck() {

    const authError = document.getElementById('auth-error');

    authError.textContent = "";

    const ID = document.getElementById('user-id').value;
    const password = document.getElementById('user-pw').value;
    const passwordCheck = document.getElementById('pw-check').value;

    const storedUsers = localStorage.getItem("users");
    const userMap = storedUsers ? JSON.parse(storedUsers) : {};

    if (ID.includes(" ") || ID.trim() === "") {
      authError.textContent = "아이디를 입력해주세요.";
      return;
    } else if (userMap[ID]) {
      authError.textContent = "이미 사용 중인 아이디입니다.";
      return;
    }

    // const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/; // 영문, 숫자, 특수문자 최소 1개 포함, 8자 이상
    const pwRegex = /^.{4,}$/;
    if (password.includes(" ")) {
      authError.textContent = "비밀번호에는 공백이 허용되지 않습니다.";
      return;
    }
    if (!pwRegex.test(password)) {
      authError.textContent = "비밀번호는 4자리 이상이어야 합니다.";
      return;
    }
    if (password !== passwordCheck || passwordCheck === "") {
      authError.textContent = "비밀번호가 일치하지 않습니다.";
      return;
    }

    const newUser = {
      admin: false,
      id: crypto.randomUUID(),
      username: ID,
      password: password,
      onBoard: false,
      nickname: "",
      gender: "",
      birthday: "",
      height: "",
      weight: "",
      plans: {},
    };

    userMap[ID] = newUser;
    localStorage.setItem("users", JSON.stringify(userMap));
    localStorage.setItem("currentUser", newUser.username);

    alert("회원가입이 완료되었습니다!");
    window.location.href = "/onboard/onboard.html";
  }
}