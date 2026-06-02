## 서비스 소개

## 담당 부분
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
* css, js, fonts, images

### localStorage 구조 일부
- `users` 구조 확립
```json
"username": {
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
  * 각 사용자 별 기본 정보 (로그인 아이디, 비밀번호, 별명, 생일, 성별, 키, 몸무게) 를 지님.
  * 날짜별 트레이닝 정보를 저장하기 위한 객체 (`plans`) 내에서 날짜 (`YYYY-MM-DD`) 형태의 key를 가지는 하위 object를 지님.
  * 하위 object에서 각 날짜 별 노트를 기록하기 위한 `memo`와 실제 트레이닝 과정을 담은 하위 object `program`을 지님.
  * `program` 내에서 다시 운동의 상위 카테고리를 key로 가지는 하위 list가 존재하며, 각 list는 운동 이름 (`workout`)과 세트 정보 (`set`)으로 구성됨.
  * 각 `set`는 완료 여부 (`isCompleted`)와 무게 (`kgs`)[^kgs] 와 반복 횟수 (`rep`)[^rep]를 지님.
#### 추가 수정
  * 탐색을 원활하게 하기 위해 users의 타입을 list에서 object로 바꾼 후, key를 `username`으로 변경함.
  * 이 구조를 초안으로 잡은 채 문의 게시판에서 답변을 남길 수 있는 사용자를 구분하기 위한 boolean 값 `admin`이 추가됨.

[^kgs]: 맨몸 운동의 경우 사용자가 작성하지 않으며, 0으로 설정된다.
[^rep]: 유산소 운동은 이 수치가 시간(분)을 의미하며, 맨몸 운동의 플랭크는 이 수치가 시간(초)를 의미한다.

### 각 페이지 별 와이어프레임 제작
- https://canva.link/0edkg08syuch9wj
### `header.html`
- [롯데월드 민속박물관](https://adventure.lotteworld.com/museum/) 웹 사이트를 참고해 제작되었습니다.


### `index.html`
- [SPOANY](https://www.spoany.co.kr/) 웹 사이트를 참고해 제작되었습니다.
- 이 페이지의 스크린샷에서 나타나는 유튜브 영상의 모든 권리는 해당 영상의 창작자에게 귀속됩니다.

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
  - 3번째 (마지막) 컨텐츠에서 다시 1번째 컨텐츠로 이동할 수 있도록 `subPage2Scroll` 함수를 구성함.

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
### 전체 디자인 통일

## 소감
- 여러 팀원과 함께 수일이 걸리는 프로젝트를 하는 경험이 처음이었기에, 하나의 작은 프로젝트를 완성하며 성취감을 느낀 한편, 여러 사람이 함께 협업할 때 어떻게 시너지를 발생시켜야 하는지, 기한이 한정되어 있을 때 팀장의 역할이 무엇인지에 대해 고민할 기회가 되었다. 
- 초기에 디자인 규칙을 명확히 확립하지 못했기에, 각자 맡은 기능에 해당하는 웹 페이지를 만든 후 마지막에 합쳐 디자인을 다듬는 과정으로 진행했다. 그러나 이 과정에서 몇 가지 한계를 느꼈다.
  - 우선 디자인을 통일하는 역할을 맡은 사람에게 업무가 과중되었고, 다른 팀원이 이 상황을 이해하고 디자인 관련 기여를 하고자 할 때에도 구체적으로 결정된 사항이 없어 원활한 의사소통이 어려웠다.
  - html의 태그 별 명확한 역할을 정하지 않아 `common.css`를 뒤늦게 만드는 과정에서 충돌이 발생했다. 예를 들어 테두리 없이 텍스트로만 구성된 버튼은 `<button>` 태그 또는 `<a>` 태그를 사용할 수 있었으나 어느 쪽을 표준으로 사용할지를 정하지 않아 같은 역할을 하는 태그가 혼용되었다. `common.css`에서 별도의 클래스 구분 (`:not(.ignore-default)`) 을 주는 방법으로 적용했으나 선택자 우선순위로 인해 의도치 않은 변경이 관찰되어 되돌리는 상황도 발생했다. 
## 피드백
