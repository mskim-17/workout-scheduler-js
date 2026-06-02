// admin 초기화 (즉시실행 함수)
(function () {
  const STORAGE_KEY = 'users';
  const currentData = localStorage.getItem(STORAGE_KEY);

  if (!currentData) {
    const userMap = {};
    const adminId = 'admin'; // 최고관리자 로그인 ID

    // 기존 newUser 객체 틀과 필드를 정확히 일치시켜 생성
    userMap[adminId] = {
      admin: true, // 운영자이므로 true 설정
      id: '0',
      username: adminId,
      password: '1234', // 사용할 관리자 비밀번호
      onBoard: true, // 관리자는 온보딩 단계를 건너뛰도록 true 설정
      nickname: "운영자",
      gender: "other",
      birthday: "",
      height: "",
      weight: "",
      plans: {}
    };

    const testUsers = [
      { id: '1', username: 'user1', nickname: '테스터1', gender: 'male' },
      { id: '2', username: 'user2', nickname: '테스터2', gender: 'female' },
      { id: '3', username: 'user3', nickname: '테스터3', gender: 'male' },
      { id: '4', username: 'user4', nickname: '테스터4', gender: 'female' }
    ];

    testUsers.forEach(user => {
      userMap[user.username] = {
        admin: false,
        id: user.id,
        username: user.username,
        password: '1234',
        onBoard: true,
        nickname: user.nickname,
        gender: user.gender,
        birthday: "1995-01-01",
        height: "170",
        weight: "60",
        plans: {}
      };
    });

    userMap['user1'].plans = {
      "2026-05-01":{"memo":"","status":"finished","program":{"가슴":[{"workout":"인클라인 덤벨 플라이","set":[{"isCompleted":true,"kgs":30,"rep":12},{"isCompleted":true,"kgs":30,"rep":12},{"isCompleted":true,"kgs":30,"rep":12},{"isCompleted":false,"kgs":30,"rep":12}]}],"유산소":[{"workout":"실내 자전거","set":[{"isCompleted":true,"kgs":0,"rep":10},{"isCompleted":false,"kgs":0,"rep":10},{"isCompleted":false,"kgs":0,"rep":10}]}],"맨몸 운동":[{"workout":"플랭크","set":[{"isCompleted":true,"kgs":0,"rep":60},{"isCompleted":true,"kgs":0,"rep":60},{"isCompleted":true,"kgs":0,"rep":60}]}]}},
      "2026-05-02":{"memo":"","status":"finished","program":{"맨몸 운동":[{"workout":"푸쉬업","set":[{"isCompleted":true,"kgs":0,"rep":25},{"isCompleted":true,"kgs":0,"rep":25},{"isCompleted":true,"kgs":0,"rep":25},{"isCompleted":true,"kgs":0,"rep":25}]},{"workout":"맨몸 스쿼트","set":[{"isCompleted":true,"kgs":0,"rep":25},{"isCompleted":true,"kgs":0,"rep":25},{"isCompleted":true,"kgs":0,"rep":25},{"isCompleted":true,"kgs":0,"rep":25}]}]}},
      "2026-05-03":{"memo":"","status":"finished","program":{"맨몸 운동":[{"workout":"푸쉬업","set":[{"isCompleted":true,"kgs":0,"rep":25},{"isCompleted":false,"kgs":0,"rep":25},{"isCompleted":false,"kgs":0,"rep":25},{"isCompleted":false,"kgs":0,"rep":25}]},{"workout":"맨몸 스쿼트","set":[{"isCompleted":false,"kgs":0,"rep":25},{"isCompleted":false,"kgs":0,"rep":25},{"isCompleted":false,"kgs":0,"rep":25},{"isCompleted":false,"kgs":0,"rep":25}]}]}},
      "2026-05-04":{"memo":"","status":"finished","program":{"가슴":[{"workout":"인클라인 덤벨 플라이","set":[{"isCompleted":true,"kgs":30,"rep":12},{"isCompleted":true,"kgs":30,"rep":12},{"isCompleted":false,"kgs":30,"rep":12},{"isCompleted":false,"kgs":30,"rep":12}]}],"유산소":[{"workout":"실내 자전거","set":[{"isCompleted":true,"kgs":0,"rep":10},{"isCompleted":false,"kgs":0,"rep":10},{"isCompleted":false,"kgs":0,"rep":10}]}],"맨몸 운동":[{"workout":"플랭크","set":[{"isCompleted":true,"kgs":0,"rep":60},{"isCompleted":true,"kgs":0,"rep":60},{"isCompleted":false,"kgs":0,"rep":60}]}]}}
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userMap));
  }
})();

function initHeader(container, options) {

  const header = container.querySelector(".site-header");
  const logoLink = header.querySelector("a.logo");

  const submenu = header.querySelector('.submenu');
  const submenuInner = header.querySelector('.submenu-inner');
  const mypage = header.querySelector('.nav-item[data-category="mypage"]');
  const community = header.querySelector('.nav-item[data-category="community"]');
  const mypageSubmenu = header.querySelector('.submenu-item[data-category="mypage"]');
  const communitySubmenu = header.querySelector('.submenu-item[data-category="community"]');

  const registerBtn = header.querySelector('.register-btn');
  const loginBtn = header.querySelector('.login-btn');
  const profileBtn = header.querySelector('.profile-btn');
  const profileDropdown = header.querySelector('.profile-dropdown');
  const profileNickname = header.querySelector('.profile-nickname');
  const profileUsername = header.querySelector('.profile-username');

  function alignSubmenu() {

    const submenuInnerX = submenuInner.getBoundingClientRect().left;
    const mypageX = mypage.getBoundingClientRect().left;
    const communityX = community.getBoundingClientRect().left;

    mypageSubmenu.style.left = `${mypageX - submenuInnerX}px`;
    communitySubmenu.style.left = `${communityX - submenuInnerX}px`;
  }

  function alignDropdown() {

    const profileBtnRect = profileBtn.getBoundingClientRect();
    profileDropdown.style.top = `${profileBtnRect.bottom + 15}px`
    profileDropdown.style.right = `${window.innerWidth - profileBtnRect.right}px`;

  }

  function updateUserNickname() {

    let currentUserUsername = localStorage.getItem("currentUser");
    if (!currentUserUsername) {
      console.log("로그아웃 상태입니다.");
      return;
    }

    const storedUsers = localStorage.getItem("users");
    const userMap = storedUsers ? JSON.parse(storedUsers) : {};

    let currentUser = userMap[currentUserUsername];
    if (!currentUser) {
      console.log(`"${currentUserUsername}" 사용자 정보를 찾을 수 없습니다.`);
      return;
    }

    profileNickname.textContent = currentUser.nickname;
    profileUsername.textContent = currentUser.username;

  }

  let submenuTimer;

  const openSubmenu = () => {
    clearTimeout(submenuTimer);
    submenu.classList.add('open');
  };

  const requestCloseSubmenu = () => {
    submenuTimer = setTimeout(() => {
      submenu.classList.remove('open');
    }, 80)
  };

  const toggleProfileDropdown = () => {
    profileDropdown.classList.toggle('open');
  }

  const closeProfileDropdown = () => {
    profileDropdown.classList.remove('open');
  }

  const submenuEventBindings = {
    mouseenter: openSubmenu,
    mouseleave: requestCloseSubmenu,
  };

  [submenu, mypage, community].forEach(elem => {
    Object.entries(submenuEventBindings).forEach(([eventName, handler]) => {
      elem.addEventListener(eventName, handler);
    });
  });

  header.addEventListener('click', event => {
    const target = event.target;
    if (target.closest('.profile-btn')) toggleProfileDropdown();
    else if (!target.closest('.profile-dropdown')) closeProfileDropdown();
    // 로그아웃 버튼
    else if (target.closest('#logout')) {
      event.preventDefault(); // a 태그 기본 이동 기능 방지
      localStorage.removeItem('currentUser');
      window.location.href = "/index.html";
    }
  })

  configureHeader(options);
  updateUserNickname();

  alignSubmenu();
  alignDropdown();

  window.addEventListener('resize', () => {
    alignSubmenu();
    alignDropdown();
  })

  function configureHeader(options) {

    const rules = [
      { elem: submenu, cls: 'onboard', cond: options.isOnboard },
      { elem: logoLink, cls: 'onboard', cond: options.isOnboard },
      { elem: mypage, cls: 'hide', cond: (options.isOnboard || !options.hasUser) },
      { elem: mypageSubmenu, cls: 'hide', cond: (options.isOnboard || !options.hasUser) },
      { elem: community, cls: 'hide', cond: options.isOnboard },
      { elem: communitySubmenu, cls: 'hide', cond: options.isOnboard },
      { elem: profileBtn, cls: 'hide', cond: (options.isOnboard || !options.hasUser) },
      { elem: loginBtn, cls: 'hide', cond: (options.isOnboard || options.hasUser) },
      { elem: registerBtn, cls: 'hide', cond: (options.isOnboard || options.hasUser) }
    ];

    rules.forEach(({ elem, cls, cond }) => {
      if (elem) elem.classList.toggle(cls, cond);
    });
  }

}

export async function mountHeader(container, options = {}) {
  const template = await fetch("/components/header.html")
    .then(res => res.text());
  container.innerHTML = template;

  // localStorage에 있는 currentUser의 true/false를 hasUser에 저장
  const hasUser = localStorage.getItem('currentUser') !== null;

  // hasUser의 boolean을 기반으로 마이페이지와 프로필 버튼 활성화/비활성화
  initHeader(container, {
    isOnboard: options.isOnboard ?? false,
    // hasUser: true,
    hasUser: hasUser
  });
}
