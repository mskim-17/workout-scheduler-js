## 프로젝트 소개

## 담당 부분
### 각 페이지 별 와이어프레임 제작
- https://canva.link/0edkg08syuch9wj

### 프로젝트 폴더 구조
```
📁 project
├── 📁 assets
│   ├── 📁 css
│   │   ├── 📁 pages
│   │   │   │   ├── 📁 auth 
│   │   │   │   ├── 📁 community
│   │   │   │   ├── 📁 mypage
│   │   │   │   └── 📁 onboard
│   │   ├── 🎨 common.css
│   │   └── 🎨 reset.css
│   ├── 📁 js
│   │   ├── 📁 common
│   │   ├── 📁 pages
│   │   │   │   ├── 📁 auth 
│   │   │   │   ├── 📁 community
│   │   │   │   ├── 📁 mypage
│   │   │   │   └── 📁 onboard
│   ├── 📁 fonts
│   ├── 📁 images
│   │   │   ├── 📁 common 
│   │   │   ├── 📁 index
│   │   │   └── 📁 onboard
└── 📁 auth
│   ├── 📃 login.html
│   └── 📃 signup.html
└── 📁 community
│   ├── 📃 faq.html
│   ├── 📃 inquiry-list.html
│   ├── 📃 inquiry-view.html
│   └── 📃 inquiry-write.html
└── 📁 components
│   ├── 📃 header.html
│   ├── 🎨 header.css
│   └── ⚙️ header.js
└── 📁 mypage
│   ├── 📃 home.html
│   ├── 📃 plan.html
│   └── 📃 review.html
└── 📁 onboard
│   └── 📃 onboard.html
└── 📃 index.html
└── 📃 settings.html
```
* 각 html 파일을 최상위 폴더로 두되, 비슷한 역할을 하는 여러 페이지가 있을 경우 폴더로 분리함
* css, js, fonts, images를 `assets` 폴더로 묶어 관리함

### localStorage 구조 일부
- `users` 구조 확립
```json
"username": {
  "id": "`crypto.randomUUID()`"
  "nickname": "테스트 계정"
  "birthday": "2000-01-01",
  "gender": "male/female/other",
  "height": 170,
  "weight": 65,
  "username": "user1",
  "password": "1234",
  "onBoard": true,
  "plans": {
    "2026-05-01" : {
      "memo": "오운완!"
      "program": {
        "맨몸 운동": [
          {
            "workout": "푸쉬업"
            "set": [
              {
                "isCompleted": true,
                "kgs": 0,
                "rep": 25
              },
              {
                "isCompleted": true,
                "kgs": 0,
                "rep": 25
              }
            ]
          },
          {
            "workout": "맨몸 스쿼트"
            "set": [
              {
                "isCompleted": true,
                "kgs": 0,
                "rep": 25
              },
              {
                "isCompleted": false,
                "kgs": 0,
                "rep": 25
              }
            ]
          }
        ]
      }
    }
  }
}
```
#### 최초 구조
  * 각 사용자 별 기본 정보 (로그인 아이디, 비밀번호, 별명, 생일, 성별, 키, 몸무게) 를 지님
  * 날짜별 트레이닝 정보를 저장하기 위한 객체 (`plans`) 내에서 날짜 (`YYYY-MM-DD`) 형태의 key를 가지는 하위 object를 지님
  * 하위 object에서 각 날짜 별 노트를 기록하기 위한 `memo`와 실제 트레이닝 과정을 담은 하위 object `program`을 지님
  * `program` 내에서 다시 운동의 상위 카테고리를 key로 가지는 하위 list가 존재하며, 각 list는 운동 이름 (`workout`)과 세트 정보 (`set`)으로 구성됨
  * 각 `set`는 완료 여부 (`isCompleted`)와 무게 (`kgs`)[^kgs] 와 반복 횟수 (`rep`)[^rep]를 지님
#### 추가 수정
  * 탐색을 원활하게 하기 위해 users의 타입을 list에서 object로 바꾼 후, key를 `username`으로 변경함
  * 이 구조를 초안으로 잡은 채 문의 게시판에서 답변을 남길 수 있는 사용자를 구분하기 위한 boolean 값 `admin`이 추가됨
  * 각각의 user에게 `crypto.randomUUID()`로 생성한 `id` 별도 부여

[^kgs]: 맨몸 운동의 경우 사용자가 작성하지 않으며, 0으로 설정된다.
[^rep]: 유산소 운동은 이 수치가 시간(분)을 의미하며, 맨몸 운동의 플랭크는 이 수치가 시간(초)를 의미한다.

### `header.html`
- [롯데월드 민속박물관](https://adventure.lotteworld.com/museum/) 웹 사이트를 참고해 제작되었습니다.
###### 비로그인 상태에서의 header
<img width="1920" height="68" alt="Image" src="https://github.com/user-attachments/assets/24c1a38b-59d4-4675-ac53-aac2a886f538" />

###### 로그인 상태에서의 header
<img width="1920" height="68" alt="Image" src="https://github.com/user-attachments/assets/d7f11e97-1414-460f-8011-18dff971d9ac" />

###### header 내의 "마이페이지" 또는 "커뮤니티"에 마우스를 hover했을 때의 header
<img width="1920" height="195" alt="Image" src="https://github.com/user-attachments/assets/ec046df1-2241-49e4-ae4c-e27db8508d96" />

###### 프로필 버튼을 클릭했을 때의 overlay
<img width="200"  alt="Image" src="https://github.com/user-attachments/assets/6ff77bb4-21fe-4bd2-8f22-a4853ab7fb5d" />

#### header 내의 submenu 위치
- header의 일부 콘텐츠를 호버했을 때 전체 submenu가 나타나는 것을 목표로 했고, 로그인 상태에 따라 header에 표시되는 메뉴 구성에 차이가 발생해 submenu도 이에 맞춰 위치를 바꾸는 작업이 필요했고, 이를 CSS만으로 구현하는 데에 어려움을 겪음
  - JavaScript의 `.getBoundingClientRect()`를 이용해 요소의 위치를 고정하는 방법을 익혔고, 이를 배운 후 profile 버튼을 눌렀을 때 나타나는 오버레이의 좌우 위치도 같은 방법으로 고정함
- submenu가 나타난 후에 submenu가 열린 상태로 유지되기 위해 hover해야하는 요소가 총 3개 ("마이페이지", "커뮤니티", 열려 있는 submenu 요소) 였는데, 각기 다른 요소를 오가며 submenu가 잠깐 닫히려다 다시 열리는 flickering 현상을 해결하는 데에 어려움을 겪음
  - submenu를 여는 작업은 즉시 하되, submenu를 닫는 작업은 `setTimeOut()` 함수를 통해 약간의 (80ms) 여유를 두고 다시 열린 상태를 유지하는 요소에 hover가 감지되면 `clearTimeOut()`를 쓰는 방식을 습득 후 구현함
#### header 내 배경 blur 효과
- `backdrop-filter`를 사용함
- `.profile-dropdown`에만 원인을 알 수 없이 filter가 적용되지 않는 문제가 있었음
  - 정확한 원인은 결국 파악하지 못했으나, backdrop-filter가 이미 적용된 요소 내에 다시 backdrop-filter가 있는 요소를 사용할 수 없다고 가정하고 별도의 div로 분리해 해결함


### `index.html`
- [SPOANY](https://www.spoany.co.kr/) 웹 사이트를 참고해 제작되었습니다.

#### 슬로건 section (`#main-page-1`)
<img width="720" height="405" alt="Image" src="https://github.com/user-attachments/assets/516b49c4-2389-4d6b-a9cf-e6ddeec06ed1" />

##### 스크롤 상태에 따른 배경 그라디언트 변경
  - 공통적으로 적용되는 수평 방향 `linear-gradient`를 최상위 div에 적용
  - 스크롤이 최상단일 때를 위한 어두운 수직 방향 `linear-gradient`를 `::before` 가상 선택자에 적용
  - 스크롤이 최상단이 아니거나 header의 특정 부분에 `:hover`했을 때 나타날 밝은 수직 방향 `linear-gradient`를 `::after` 가상 선택자에 적용
  - 해당 객체 전체에 `.transparent` class를 이용해 각 가상선택자의 opacity를 조절
  - `transition` (`ease`) 을 통해 자연스럽게 바뀌도록 변경
##### 배경에 따른 header style 덮어쓰기
  - 배경이 어두운 (`.transparent`) 상태일 때 텍스트의 색상을 변경하고, 로고의 색상을 `filter`를 통해 하얀색으로 변경
##### 텍스트가 skew된 상태로 떠오르다 완전히 나타났을 때 skew가 해제되는 애니메이션
  - class를 이용해 `translate`, `skew` 등의 `transform`을 정의하고 `transition`을 이용해 애니메이션을 구현함
  - 텍스트를 `span` 태그와 `div.text-floating-animation-container` 태그로 감쌈
    - `overflow: hidden`을 통해 텍스트가 등장하기 전에 보이는 것을 막음
  - 아래의 수평선은 별도의 class (`hr-with-animation hidden`) 및 transition을 통해 구성함
#### 서비스 소개 section (`main-page-2`)
<img width="720" height="405" alt="Image" src="https://github.com/user-attachments/assets/139603ef-ddeb-4dcd-b1d7-fbfdb4ce0684" />

##### 각각의 컨텐츠가 원둘레를 따라가는 애니메이션
  - 단순히 div의 컨텐츠만 `rotate`로 돌리고 `translate`를 통해 이동시킬 경우 원둘레를 따라가는 것이 아닌, 이전 위치와 최종 위치의 선형 궤도를 따라가 원보다 안쪽으로 이동하게 됨
  - 원하는 애니메이션을 구현하기 위해 각 컨텐츠마다 따라가고자 하는 원둘레의 크기만큼의 wrapper div를 만들어 `rotate`만으로 애니메이션을 구현하고, `overflow: hidden` 속성을 통해 필요하지 않은 부분을 잘라냄
  - `.inactive-left`, `.inactive-right`에서 왼쪽으로 사라질 때, 오른쪽으로 사라질 때의 `transform` (`rotate`), `opacity`를 작성한 후, `transition`을 통해 자연스럽게 바뀌도록 변경
    - `opacity` 속성은 `ease`를 주었으나, 이동 애니메이션은 목표 위치보다 더 이동했다가 다시 돌아오는 연출을 위해 `cubic-bezier(0.175, 0.885, 0.32, 1.275)` (ease-out-back) 를 사용함
  - 3번째 (마지막) 컨텐츠에서 다시 1번째 컨텐츠로 이동할 수 있도록 `subPage2Scroll` 함수를 구성함

#### wheel 이벤트 구현
<img width="720" height="405" alt="Image" src="https://github.com/user-attachments/assets/a7dbc5fa-2318-4919-89d3-e385f170a83f" />

##### wheel 이벤트 강제 제어
  - 스크롤을 할 때마다 각 section을 온전히 보여줄 수 있게 하고자 함
  - `e.preventDefault();`를 통해 일반적인 wheel 이벤트로 인해 발생하는 스크롤 이벤트 등을 비활성화
  - `lastDirection`, `scrollCounting` 변수를 둬 실수로 인한 조작에 지나치게 민감하게 반응하지 않도록 두 번 연속 같은 방향의 입력만 받았을 때 이벤트를 발생하게 함
  - `isAutoScrolling` 변수를 둬 자동 스크롤 이벤트가 발생할 때 다시 입력이 들어와 원치 않게 애니메이션이 중첩되거나 `scrollCounting`이 영향을 받지 않도록 일종의 잠금 역할을 수행하게 함
  - auto scroll 이벤트가 완전히 종료한 후에 `isAutoScrolling`을 바꿀 수 있도록 `setTimeOut()` 함수 활용
##### wheel 이벤트 시 보여줄 컨텐츠 적용
  - `main-page-1`에서 아래쪽 스크롤 시 `.scrollIntoView()` 함수를 이용해 `main-page-2`로 이동
  - `main-page-2`에서 아래쪽 스크롤 시 뒤의 컨텐츠를 보여주도록 `subPage2Scroll()` 함수 실행, 현재 페이지가 3번째 (마지막)일 경우 다시 1번째로 오도록 mod 연산자 사용
  - `main-page-2`에서 위쪽 스크롤 시
    - 첫 번째 컨텐츠일 경우 `.scrollIntoView()`를 이용해 `main-page-1`으로 이동
    - 아닐 경우 앞의 컨텐츠를 보여주도록 `subPage2Scroll()` 함수 실행
    - 
### `onboard.html`
- 사용된 이미지의 출처는 다음과 같다.
  - <a href="https://www.flaticon.com/free-icons/calendar" title="calendar icons">Calendar icons created by Anggara - Flaticon</a>
  - <a href="https://www.flaticon.com/free-icons/gender-neutral" title="gender neutral icons">Gender neutral icons created by Freepik - Flaticon</a>
  - <a href="https://www.flaticon.com/free-icons/body-check" title="body check icons">Body check icons created by Marsiholo - Flaticon</a>
  - <a href="https://www.flaticon.com/free-icons/checklist" title="checklist icons">Checklist icons created by Freepik - Flaticon</a>
  - <a href="https://www.flaticon.com/free-icons/barbell" title="barbell icons">Barbell icons created by kerismaker - Flaticon</a>
  - <a href="https://www.flaticon.com/free-icons/bench-press" title="bench press icons">Bench press icons created by kerismaker - Flaticon</a>
  - <a href="https://www.flaticon.com/free-icons/deadlifting" title="deadlifting icons">Deadlifting icons created by kerismaker - Flaticon</a>
  - <a href="https://www.flaticon.com/free-icons/health" title="health icons">Health icons created by Freepik - Flaticon</a>
  - <a href="https://www.flaticon.com/free-icons/confetti" title="confetti icons">Confetti icons created by Freepik - Flaticon</a>
### 기타 페이지 기여
- `home.html`의 타이머에서 최소/최대 시간에 따른 버튼 비활성화 및 최대 시간 강제 설정 기능, 직전 타이머의 시간 설정을 기억한 채 타이머를 종료하는 기능, 타이머가 활성화되었을 때 나타나는 프로그레스 링을 작업함
- `review.html`의 진행도 그래프에서 진행도에 따른 색상 변화와 백분율 표기를 작업함
### 전체 디자인 통일
- `common.css`를 통한 각 요소 별 기본 스타일, 기본 글꼴 등 결정
- `login.html`, `signup.html`, `faq.html`, `inquiry-*.html` 디자인 요소를 위한 HTML 구조 수정을 포함한 디자인 수정
- `home.html`에서 타이머에 한정해 HTML 구조 수정 및 기능 개선을 포함한 디자인 수정
- `mypage`에 속한 페이지 중 우측에 위치한 운동 계획의 `height` 통일
## 소감
### 협업
  - 여러 팀원과 함께 수일이 걸리는 프로젝트를 하는 경험이 처음이었기에, 하나의 작은 프로젝트를 완성하며 성취감을 느낀 한편, 여러 사람이 함께 협업할 때 어떻게 시너지를 발생시켜야 하는지, 기한이 한정되어 있을 때 팀장의 역할이 무엇인지에 대해 고민할 기회가 되었다.
  - 팀원 개인으로서 맡은 부분은 높은 완성도를 확보했으나, 팀원의 역량을 파악하고 상황에 따라 유동적으로 역할을 재분배하기 위한 반복적인 의사소통 과정이 미흡했던 점을 개선하고자 한다.
  - 개인적인 건강 관리 및 수면 시간 관리 실패로 개인 작업이 미뤄지거나, 팀원의 작업을 위해 필요한 정보 전달이 지연되는 상황이 발생해 발표 자료가 완성되지 못한 채 발표를 진행하였다. 전체 작업 중 일부의 완료를 위한 노력만큼이나 작업을 위한 컨디션 관리가 필요함을 느꼈다.
### 데이터 활용
  - 운동 종류 및 정보를 받아올 수 있는 것으로 추정되는 공공데이터 API[^workout-api] 를 발견했으나, 근골격계 운동보다는 재활 운동에 맞춰져 있다고 판단해 실제로 사용하진 않았다. 이 프로젝트의 완성도를 높일 기회가 있다면 `/assets/json/exercise.json` 부분을 API로 받아오고, 신뢰도 높은 영상이나 수행 방법을 우선 보여주는 방법이 있을 것 같다.
### 각 페이지 별
- `onboard.html` 관련
  - 여러 div가 같은 위치에 겹친 상태에서 등장, 퇴장 애니메이션을 적용함과 동시에 보이는 요소가 상호작용하게 하는 과정에서 큰 어려움을 겪었다. `pointer-events`를 활용하는 방법 외의 더 안정적인 방법이 있는지를 고민해 보고 싶다.
  - 이 페이지를 구현한 후에 `index.html`의 `#main-page-2`를 작업했는데, 이 페이지도 좌우 애니메이션을 넣었다면 div가 겹침으로서 발생하는 문제를 회피할 수 있었을 것 같다.
  - 아직 React 등의 프레임워크를 배우지 않았는데, 이를 배웠을 때 구현 상의 이점이 클지 궁금하다.
- `index.html` 관련
  - `index.html`만의 모양 및 애니메이션 자체를 구현하는 데에는 큰 어려움이 없었다.
  - header의 style을 덮어씌우는 형태로 구현했는데, 더 유지보수가 원활한 방법으로 구현하는 방법을 조사할 필요가 있다.
  - 마우스 휠 이벤트를 가로채는 방식을 구현하는 과정에서는 LLM을 통한 정보 탐색을 진행했다. 이를 온전히 이해하기 위한 추가 학습이 필요하다.
- `home.html` 관련
  - 프로그레스 링의 위치는 `review.html` 내에 있는 달성도 표시 구현을 참고했는데, 아직 정확히 이해하지 못해 추가 학습이 필요하다.
### 디자인 통일 관련
  - 각 페이지 별
    - 회원정보 수정 페이지 (`settings.html`) 에서 변할 수 있는 `window.innerWidth`에 따라 각 입력상자의 크기를 동일하게 만드는 것이 어려웠다. HTML 구조 상의 한계가 있었던 것으로 보이며, grid를 사용하거나 flex의 정확한 사용 방법을 익힐 필요가 있다.
  - 디자인 규칙 미확립
  - 초기에 디자인 규칙을 명확히 확립하지 못했기에, 각자 맡은 기능에 해당하는 웹 페이지를 만든 후 마지막에 합쳐 디자인을 다듬는 과정으로 진행했다. 그러나 이 과정에서 몇 가지 한계를 느꼈다.
  - 디자인을 통일하는 역할을 맡은 사람에게 업무가 과중되었고, 다른 팀원이 이 상황을 이해하고 디자인 관련 기여를 하고자 할 때에도 구체적으로 결정된 사항이 없어 원활한 의사소통 및 작업 진행이 어려웠다.
  - html의 태그 별 명확한 역할을 정하지 않아 `common.css`를 뒤늦게 만드는 과정에서 충돌이 발생했다. 예를 들어 테두리 없이 텍스트로만 구성된 버튼은 `<button>` 태그 또는 `<a>` 태그를 사용할 수 있었으나 어느 쪽을 표준으로 사용할지를 정하지 않아 같은 역할을 하는 태그가 혼용되었다. `common.css`에서 별도의 클래스 구분 (`:not(.ignore-default)`) 을 주는 방법으로 적용했으나 선택자 우선순위로 인해 의도치 않은 변경이 관찰되어 되돌리는 상황도 발생했다.
  - 숙련도 또는 경험 부족으로 인한 문제
    - 주로 사용하는 태그 중 일부 (`<select>` 태그 아래의 `<option>`에 애니메이션 삽입, `<input type="password">`에 커스텀 표시하기 버튼 삽입) 는 CSS에서 바꾸는 것이 불가능해 HTML을 건드리는 작업이 필요했다. 각 태그별로 바꿀 수 있는 스타일의 범위를 미리 파악하는 과정이 필요하다.
    - 팀원 전원이 JavaScript (또는 `<script>` 태그)를 통해 동적으로 DOM 요소를 삽입하는 경험을 처음 했는데, 이 과정에서 DOM 내에서 style을 직접 지정하는 경우를 뒤늦게 발견해 통합에 어려움을 겪었다. 프로젝트부터는 모든 style을 가능한 한 `css`로 구성하게 하는 제약을 미리 고지함으로써 해결할 수 있는 문제였으므로 다음 프로젝트부터는 이러한 문제를 원활히 관리할 수 있을 것이다. 
   - 기타
     - 다크모드 지원을 염두에 둔 채 CSS Variable을 구성했는데, 이를 충분히 적용하지 못하고 시간 관계상 구현하지 못한 것이 아쉽다.
[^workout-api]: https://www.data.go.kr/data/15108846/openapi.do#tab_layer_detail_function
## 피드백
### 개선 방안
- 초기 사용자 관점에서의 UI가 불친절함
  - 타이머의 주 용도가 인터벌 (휴식 구간) 관리 용도라는 것을 초기 사용자, 특히 근력 운동 경험이 없는 이가 알기 어려움
  - `mypage` 하위 각각의 페이지 (홈, 되돌아보기, 계획하기)의 용도를 초기 사용자가 알기 쉽게 하고, 헤더에만 있는 링크를 버튼 등을 통해 더 직관적인 위치에 배치시킬 것
  - 추후 다른 프로젝트를 진행할 경우 다른 팀의 팀원 1명에게 요청해 서비스를 이용하게 함으로써 비직관성을 파악할 수 있음
- 운동을 계획 목록에 넣은 후에도 `mypage` 하위 페이지에서 운동 이름을 클릭했을 때 운동 방법이 담긴 YouTube Modal이 있기를 바람
  + **[📝 노트]** 이 부분은 원래 계획 당시에 구현하는 것을 목표로 두었으나, 시간 관계 상 구현되지 않았다.
### 발견된 버그 (발표 당시)
- `onboard/onboard.html` 페이지에서 이탈 후 다른 서비스를 이용할 수 있는 문제
  - **[📝 노트]** `currentUser` key가 존재하며 상태이면서 onBoard가 false일 때 alert 창을 띄워 강제로 이동하게 하는 방법과, 회원가입 절차와 통합해 onboard를 완료한 후에 계정을 생성하는 두 가지 해결 방법을 떠올렸다. 일반적인 회원가입 절차를 떠올렸을 때 정보 입력을 두 번에 나눠 하는 것은 부자연스러우므로 합치는 쪽으로 진행하고 싶다.
- 탈퇴한 아이디로 다시 가입할 수 있는 문제
  - 로그인 ID가 같을 때 게시물을 편집할 수 있기 때문에 버그로 분류함
  - **[📝 노트]** user 객체에 `isActive` boolean 값을 추가해 이 값이 false일 때 로그인 불가, 같은 ID로 가입 불가로 처리하는 방법과, `crypto.randomUUID()`로 생성된 `id`를 동일 인물 판별 기준으로 잡는 두 가지 방법이 떠올랐다. 후자로 구현할 경우 탈퇴한 사용자에 대한 정보를 따로 관리해 로그인 ID (`username`)가 나타날 곳에 "(탈퇴한 사용자)" 따위를 띄우게 하는 것을 고려했다.
