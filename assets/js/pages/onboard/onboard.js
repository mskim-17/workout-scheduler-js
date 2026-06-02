export function initOnboard() {

  const pages = document.querySelectorAll('.page');

  function pageControl(showPageIdx, hidePageIdx) {
    if (hidePageIdx != -1) {
      const pageToHide = document.querySelector(`.page[data-page-idx="${hidePageIdx}"]`);
      if (pageToHide) {
        pageToHide.classList.remove('active');
        pageToHide.addEventListener('transitionend', () => {
          if (!pageToHide.classList.contains('active')) {
            pageToHide.style.visibility = 'hidden';
          }
          if (showPageIdx != -1) {
            const pageToShow = document.querySelector(`.page[data-page-idx="${showPageIdx}"]`);
            if (pageToShow) {
              pageToShow.style.visibility = 'visible';
              pageToShow.classList.add('active');
            }
          }
        }, { once: true });
      }
    } else if (showPageIdx != -1) {
      const pageToShow = document.querySelector(`.page[data-page-idx="${showPageIdx}"]`);
      if (pageToShow) {
        pageToShow.style.visibility = 'visible';
        pageToShow.classList.add('active');
      }
    }
  }

  document.addEventListener('click', event => {
    const target = event.target;
    if (target.tagName == 'BUTTON') {
      const button = target.closest('button');
      if (!button.dataset.nxtpageIdx) return;
      const pageIdx = target.closest('.page').dataset.pageIdx;
      pageControl(button.dataset.nxtpageIdx, pageIdx);
    }
  });


  function setupNickname() {

    const decideNicknameButton = pages[0].querySelector('button[data-role="decide-nickname"]');

    pages[0].querySelector('input').addEventListener('input', event => {
      const value = event.target.value;
      decideNicknameButton.disabled = !(value.trim() !== '');
    })

    decideNicknameButton.addEventListener('click', () => {
      if (decideNicknameButton.disabled) return;
      const nickname = pages[0].querySelector('input').value;
      targetUser.nickname = nickname;
      document.querySelectorAll('.title-nickname').forEach(element => element.innerText = nickname);
    });

  }

  function setupGender() {

    pages[2].querySelector('button[data-key="gender"]').addEventListener('click', (event) => {
      const gender = event.target.dataset.value;
      targetUser.gender = gender;
    });

  }

  function setupBirthday() {

    const decideBirthdayButton = pages[3].querySelector('button[data-role="decide-birthday"]');

    const birthYearDropdown = pages[3].querySelector('#birth-year');
    const birthMonthDropdown = pages[3].querySelector('#birth-month');
    const birthDateDropdown = pages[3].querySelector('#birth-date');
    const birthYearButton = birthYearDropdown.querySelector('.dropdown-button');
    const birthMonthButton = birthMonthDropdown.querySelector('.dropdown-button');
    const birthDateButton = birthDateDropdown.querySelector('.dropdown-button');
    const birthYearList = birthYearDropdown.querySelector('.dropdown-list');
    const birthMonthList = birthMonthDropdown.querySelector('.dropdown-list');;
    const birthDateList = birthDateDropdown.querySelector('.dropdown-list');

    // 예: 1900년부터 올해까지 옵션 추가
    const thisYear = new Date().getFullYear();
    const thisMonth = new Date().getMonth() + 1;
    const thisDate = new Date().getDate();


    for (let year = thisYear; year >= 1900; year--) {
      const div = document.createElement('div');
      div.dataset.value = year;
      div.innerText = year;
      birthYearList.appendChild(div);
    }

    const isDateValid = (year, month, date) => {
      let rawDate = new Date(year, month - 1, date);
      return !(rawDate.getFullYear() != year || rawDate.getMonth() != month - 1 || rawDate.getDate() != date);
    }

    const setMonthRange = year => {
      birthMonthList.innerHTML = '';
      for (let month = 1; month <= (year == thisYear ? thisMonth : 12); month++) {
        const div = document.createElement('div');
        div.dataset.value = month;
        div.innerText = month;
        birthMonthList.appendChild(div);
      }
    }

    const setDateRange = (year, month) => {
      birthDateList.innerHTML = '';
      for (let date = 1; date <= ((year == thisYear && month == thisMonth) ? thisDate : 31); date++) {
        if (!isDateValid(year, month, date)) return;
        const div = document.createElement('div');
        div.dataset.value = date;
        div.innerText = date;
        birthDateList.appendChild(div);
      }
    }

    function updateBirthdaySelect() {

      let year = birthYearButton.dataset.value;
      let month = birthMonthButton.dataset.value;
      let date = birthDateButton.dataset.value;

      birthMonthButton.disabled = !(year);
      birthDateButton.disabled = !(month);

      setMonthRange(year);
      if (month) setDateRange(year, month);

      if (year == thisYear && month) {
        if (month > thisMonth) {
          month = thisMonth;
          if (date) date = thisDate;
        } else if (month == thisMonth) {
          if (date && date > thisDate) date = thisDate;
          else {
            if (date) date = isDateValid(year, month, date) ? date : 1;
          }
        } else {
          if (date) date = isDateValid(year, month, date) ? date : 1;
        }
      } else if (date) {
        date = isDateValid(year, month, date) ? date : 1;
      }
      if (month) {
        birthMonthButton.dataset.value = month;
        birthMonthButton.querySelector('span').textContent = `${month}`;
      }
      if (date) {
        birthDateButton.dataset.value = date;
        birthDateButton.querySelector('span').textContent = `${date}`;
      }
    }

    birthYearList.addEventListener('click', event => {
      let year = event.target.dataset.value;
      if (year) {
        birthYearButton.dataset.value = year;
        birthYearButton.querySelector('span').textContent = `${year}`;
        updateBirthdaySelect();

        birthMonthDropdown.classList.remove('inactive');
        birthYearDropdown.classList.remove('open');
      }
    });

    birthMonthList.addEventListener('click', event => {
      let month = event.target.dataset.value;
      if (month) {
        birthMonthButton.dataset.value = month;
        birthMonthButton.querySelector('span').textContent = `${month}`;
        updateBirthdaySelect();
        birthDateDropdown.classList.remove('inactive');
        birthMonthDropdown.classList.remove('open');
      }
    });

    birthDateList.addEventListener('click', event => {
      let date = event.target.dataset.value;
      if (date) {
        birthDateButton.dataset.value = date;
        decideBirthdayButton.disabled = false;  // 일까지 선택했으면 다음으로 넘어갈 수 있음
        birthDateButton.querySelector('span').textContent = `${date}`;
        updateBirthdaySelect();
        birthDateDropdown.classList.remove('open');
      }
    });


    pages[3].addEventListener('click', e => {
      [birthYearDropdown, birthMonthDropdown, birthDateDropdown].forEach(dropdown => {
        if (!dropdown.contains(e.target)) {
          dropdown.classList.remove('open');
        }
      })
    });

    birthMonthButton.disabled = true;
    birthDateButton.disabled = true;

    // dropdown 애니메이션을 위한 부분

    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
      const button = dropdown.querySelector('.dropdown-button');
      const list = dropdown.querySelector('.dropdown-list');
      list.style.overflowY = 'hidden';

      button.addEventListener('click', () => {
        const isOpen = dropdown.classList.toggle('open');
        if (isOpen) {
          list.style.overflowY = 'scroll';
        }
      });

      list.addEventListener('transitionend', e => {
        if (e.propertyName === 'max-height' && !dropdown.classList.contains('open')) {
          list.style.overflowY = 'hidden';
        }
      });
    });

    decideBirthdayButton.addEventListener('click', (event) => {
      const date = pages[3].querySelectorAll('.dropdown-button');
      targetUser.birthday = `${date[0].dataset.value}-${String(date[1].dataset.value).padStart(2, '0')}-${String(date[2].dataset.value).padStart(2, '0')}`;
    });

  }

  function setupBodyInfo() {

    function bodyInfoFix() {

      const heightInput = document.getElementById('height');
      const weightInput = document.getElementById('weight');

      function clampValue() {
        let height = Number(heightInput.value);
        let weight = Number(weightInput.value);
        if (isNaN(height)) height = 0;
        if (isNaN(weight)) weight = 0;
        height = height < 0 ? 0 : height > 270 ? 270 : height;
        weight = weight < 0 ? 0 : weight > 600 ? 600 : weight;

        heightInput.value = height.toFixed(1);
        weightInput.value = weight.toFixed(1);
      }

      [heightInput, weightInput].forEach(input => {
        input.addEventListener('blur', clampValue);
      });

    }

    bodyInfoFix();

    pages[4].querySelector('button[data-role="decide-bodyinfo"]').addEventListener('click', (event) => {
      const height = Number(pages[4].querySelector('input[data-key="height"]').value);
      const weight = Number(pages[4].querySelector('input[data-key="weight"]').value);
      targetUser.height = height;
      targetUser.weight = weight;
      
    });

  }

  function setupAssessment() {

    const assessmentData = {
      squat: -1,
      benchpress: -1,
      deadlift: -1
    };

    const assessmentLevelInfo = {
      0: {
        name: "기초 자세",
        descriptionHTML: "부상 위험 없이 운동할 수 있도록<br />정확한 자세를 먼저 안내드립니다."
      },
      1: {
        name: "자극 위주",
        descriptionHTML: "중급자에게 적합한 강도를 추천드립니다."
      },
      2: {
        name: "고강도 루틴",
        descriptionHTML: "고급자에게 적합한 강도를 추천드립니다"
      },
    }
    
    pages[6].addEventListener('click', event => {
      const target = event.target;
      if ('key' in target.dataset) assessmentData.squat = Number(target.dataset.value);
    });

    pages[7].addEventListener('click', event => {
      const target = event.target;
      if ('key' in target.dataset) assessmentData.benchpress = Number(target.dataset.value);
    });


    pages[8].addEventListener('click', event => {
      const target = event.target;
      if ('key' in target.dataset) {
        assessmentData.deadlift = Number(target.dataset.value);
        let level = Math.min(assessmentData.squat, assessmentData.benchpress, assessmentData.deadlift);
        pages[9].querySelector('.assessment-class').innerHTML = `[${assessmentLevelInfo[level].name}]`;
        pages[9].querySelector('.description').innerHTML = assessmentLevelInfo[level].descriptionHTML;
        pages[9].querySelector('img').src = `/assets/images/onboard/result-${level}.png`;
        pages[9].querySelector('.assessment-class').style.color = 
          level == 0 ? '#53d066' :
          level == 1 ? '#ebad25' :
                       '#ff5858';
      }
    });

  }

  function setOnboardComplete() {

    pages[10].querySelector('button').addEventListener('click', () => {
      targetUser.onBoard = true;
      userMap[currentUserId] = targetUser;
      localStorage.setItem("users", JSON.stringify(userMap));
      window.location.href = "/mypage/home.html";
    })

  }


  const currentUserId = localStorage.getItem("currentUser");

  const storedUsers = localStorage.getItem("users");
  const userMap = storedUsers ? JSON.parse(storedUsers) : {};

  if (!currentUserId || !userMap[currentUserId]) {
    alert("로그인이 필요한 서비스입니다.");
    window.location.href = "/auth/login.html";
  }

  const targetUser = userMap[currentUserId];


  function setFirstPage() {
    pageControl(0, -1);
  }



  setupNickname();
  setupGender();
  setupBirthday();
  setupBodyInfo();
  setupAssessment();
  setOnboardComplete();

  setFirstPage();

}