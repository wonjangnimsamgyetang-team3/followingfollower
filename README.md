# <img src="https://github.com/wonjangnimsamgyetang-team3/followingfollower/assets/152264010/c55c72fa-3831-4f3b-a0ae-699967893e2b" width="6%" height="6%">프로젝트 "FF88(Followingollower88)"<img src="https://github.com/wonjangnimsamgyetang-team3/followingfollower/assets/152264010/c55c72fa-3831-4f3b-a0ae-699967893e2b" width="6%" height="6%">

### < 목차 >

**# 프로젝트 팀 "🐔원장님 3계탕 먹고싶조"소개**

- 팀원소개

**# 프로젝트 소개**

- 개발 기간 & 프로젝트 명 & 소개 & 목표 & 프로젝트 Rule

**# 시작가이드**

- Installation

**# 와이어프레임**

- 프로젝트 화면 구성 및 기능

  - 필수 사항

  - 선택 사항

  - 트러블슈팅

  - 기능담당

  - 기능소개

- 파일 구조





<br />

## 프로젝트 팀 "🐔원장님 3계탕 먹고싶조" 소개

<br />

**🐓팀원 소개🐓**

---

|                         김소현                         |                         남지현                         |                         양유진                         |                         성예지                         |                         남해리                         |
| :----------------------------------------------------: | :----------------------------------------------------: | :----------------------------------------------------: | :----------------------------------------------------: | :----------------------------------------------------: |
|                          ENFJ                          |                          EEEE                          |                          INFJ                          |                          ISTP                          |                       ENFJ, INFP                       |
| <p><img src="https://github.com/wonjangnimsamgyetang-team3/followingfollower/assets/152264010/1a43eeb6-ebaf-4e0b-828d-2eef9dd8d849" /></p> | <p><img src="https://github.com/wonjangnimsamgyetang-team3/followingfollower/assets/152264010/1a43eeb6-ebaf-4e0b-828d-2eef9dd8d849" /></p> | <p><img src="https://github.com/wonjangnimsamgyetang-team3/followingfollower/assets/152264010/1a43eeb6-ebaf-4e0b-828d-2eef9dd8d849" /></p> | <p><img src="https://github.com/wonjangnimsamgyetang-team3/followingfollower/assets/152264010/1a43eeb6-ebaf-4e0b-828d-2eef9dd8d849" /></p> | <p><img src="https://github.com/wonjangnimsamgyetang-team3/followingfollower/assets/152264010/1a43eeb6-ebaf-4e0b-828d-2eef9dd8d849" /></p> |
|         [@aotoyae](https://github.com/aotoyae)         |        [@jihyun-N](https://github.com/jihyun-N)        |        [@kewii33](https://github.com/kewii33/)         |         [@dpwl032](https://github.com/dpwl032)         |       [@r03181231](https://github.com/r03181231)       |
|                         🐓 팀장                         |                         🐓 팀원                         |                         🐓 팀원                         |                         🐓 팀원                         |                         🐓 팀원                         |
|                        우두머리                        |                          닭발                          |                         닭다리                         |                         닭날개                         |                        닭가슴살                        |



<br />

<br />



**🐓팀 목표🐓** 

---

\- 개인과제 마감기간 내로 잘 제출하기

\- 강의 최대한 이해하고 완강하기

\- 포기하지 말자! 



<br />


<br />



## <img src="C:\Users\user\Desktop\React\followingfollower\src\assets\FF3.jpg" width="10%" height="10%">프로젝트 "FF88(Followingollower88)"

**배포 도메인** : https://followingfollower-six.vercel.app/

**프로젝트 명** : 프로젝트 "FF88(Followingollower88)"

**개발 기간** : 2024.03. 18~ 2023.03.25 (8일) 

**프로젝트 소개** : 팔로워하는 SNS, 블로그처럼 내가 할 일을 등록하여 일상을 공유할 수 있는 서비스입니다.

**프로젝트 목표** : 마이페이지에서 계획한 일을 작성해서 캘린더로 일정 관리가 가능하고, 커뮤니티에 일상을 공유하고 응원받을 수 있습니다.

<br />

### 🚦 Project Rules

#### **개발 환경**

- **Environment :** Visual Studio Code, git, github
- **Language :** TypeScript
- **Framwork** : Next.js
- **Library** : zustand, fullcalendar, daisy Ui, tanstack/ react-query, tailwindcss
- **DB**:  supabase
- **Communication** : figma, slack, notion, zep

<br />

### Code Convention

1. **기능에 대한 주석은 반드시 포함**
2. Airbnb ESLint 사용
3. 작명 방식
   1. TSX 파일 (ex. Home.tsx)
      1. PascalCase
      2. rafce 스니펫 사용
   2. ts 파일 (ex. configStore.ts) : camelCase
   3. 함수명, 변수명: camelCase
4. 주요 디렉토리 구조
   1. common : 재사용 가능한 컴포넌트
   2. component: 고정된 컴포넌트 (ex. Header, Footer)
   3. app : URL에 해당하는 페이지 (ex. Home, Detail)
   4. shared : Zustand Store와 state관리
5. 시맨틱 태그(main, header, nav, section, ul, li) 사용
6. 프리티어 설정 :

```json
{
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "bracketSpacing": true,
  "trailingComma": "none"
}
```


<br />

<br />

<br />



### **📚프로젝트 운영 방식 및 Rules 예시📚**

  #### **깃허브 규칙**

  - 브랜치 이름 : feat/기능 이름

------

  #### 깃헙 커밋 규칙

| 타입     | 설명                                                         |
| -------- | ------------------------------------------------------------ |
| feat     | 기능 구현                                                    |
| rename   | 파일/폴더 이름 변경 및 이동                                  |
| script   | package.json 변경(npm 설치 등)                               |
| fix      | 버그 및 코드 수정                                            |
| chore    | 주석 추가/삭제, console 제거                                 |
| refactor | 줄바꿈(tab)이나, 세미콜론 추가, 코드의 위치만 바꾸거나 등 코드를 더 이쁘게 수정했을 때 |
| style    | CSS 코드                                                     |
| test     | 테스트 코드                                                  |
| docs     | 문서 수정                                                    |
| delete   | 파일, 코드, 기능 삭제했을 때                                 |

------

  #### <이슈(Issue) 작성 규칙>

  - `나 이런 거 할 거다` 를 이슈의 제목으로 입력

  - 위의 `깃헙 커밋 규칙` 의 타입을 참고하여 `[타입] - 하려는 내용` 형태의 이슈 제목 작성

    - 주요 예시
      - 기능 구현 : [feat] - 페인페이지 레이아웃 구현
      - 라이브러리 추가 : [script] - supabase 라이브러리 추가
      - 버그 수정 : [fix] - supabase env 미연결 문제 해결

  - `Assignees` 를 클릭하여 담당자(자기 자신) 지정

  - **이슈 본문**

    - Issue Feature : 하려는 내용

    - Todo : 수행할(→ 수행한) 주요 작업 리스트 (커밋 1개당 Todo 1개를 작성하는 게 아님)

      - 예시

        ```markdown
        제목 : [feat] - 메인페이지 레이아웃 구현
        
        Issue Feature : 메인페이지 레이아웃 구현
        
        Todo
        - [] MainPage.jsx 생성
        - [] Router에 MainPage 연결 // Router처럼 모두가 사용하는 기능을 조작하는 경우 반드시 Todo에 작성
        - [] 세부 컴포넌트 생성
        ```

    - 할 수 있다면 세부적인 내용도 작성해보기 (필수 X)

  - **이슈에 커밋(commit)을 반영하는 방법**

    - 이슈를 생성하면 해당 이슈의 번호(ex. `#12` )가 생기므로 해당 번호를 활용
    - 커밋 메시지를 `[커밋 타입/#이슈번호] - 커밋 내용` 형태로 작성 (ex. `[feat/#12] - Router에 MainPage 연결` )

  - **이슈의 Todo를 모두 끝낸 경우**

    - PR (Pull Request) 할 때 PR 본문에 `키워드 #이슈번호` 입력
    - 키워드 종류
      - `close` / `closes` / `close` `fix` / `fixes` / `fixed` `resolve` / `resolves` / `resolved`

------

  ### PR (Pull Request), Pull 규칙

    1. **PR (Pull Request) 하기 전**

  - 커밋은 가능하면 자주 할 것
  - 본인 github 브랜치에 push도 가능하면 자주 할 것
  - PR은 너무 뜸하지 않게 주기적으로 실시할 것 (주기가 너무 뜸하면, 그만큼 검토해야할 코드가 늘어나기 때문에 그만큼 시간이 지연됨)

    2. **PR (Pull Request) 주의사항**

  - **(중요) 반드시 검토할 사람이 있을 때 PR을 올릴 것!!**
  - 라이브러리를 추가한 경우, 어떤 라이브러리가 추가되었는지 PR 본문에 작성할 것
  - 공통적인 부분 (ex. Route, 공통 컴포넌트, 공통 스타일 등) 을 수정한 경우, 어떤 부분을 수정했는지 PR 본문에 작성할 것

    3. **PR (Pull Request) 수행 이후에 할 일**
       1. Slack에 PR URL 주소를 올림
       2. 다른 사람들이 PR을 검토하고 “승인” 하면 Merge 진행
       3. Slack에 Merge 했다고 메시지를 남김
    4. **Merge 수행 이후에 할 일**
       1. Merge 성공 여부를 검토할 사람이 본인 브랜치에서 작업하던 중간 지점까지 commit
       2. `git pull origin dev`
       3. 추가된 라이브러리가 있는 경우 `yarn`
       4. `yarn start` 하여 충돌 여부 확인
       5. 충돌 없이 정상 작동 시 `"확인했다"` , `"이상 없다"` 같은 내용을 Slack에 남기기 충돌이 있을 시 `"어떤 부분에서 충돌이 있다"` , `"충돌이 있었는데 이렇게 해결했다"` 같은 내용을 Slack에 남기기
    5. **Pull 규칙**

  - **(중요) 자주 하기 (나중에 한꺼번에 pull 해서 오류가 와장창 생기면 본인 책임**

    6. 소통 규칙

  7. pr 보내고 슬랙에 메세지
  8. 한 명 이상 팀원에게 확인 받고 merge

🚨 merge 시 마지막 커밋 메세지로 title 적기



<br />

<br />

<br />

---


## 🚩시작 가이드

<br />

### Installation

```bash
$ git clone https://github.com/wonjangnimsamgyetang-team3/followingfollower.git
$ cd followingfollower
$ yarn install or npm install
$ yarn run start or npm run start
```

### Environment variable

- 파일 이름 : .env.local
- 변수 이름1 : NEXT_PUBLIC_SUPABASE_URL
- 변수 이름2 : NEXT_PUBLIC_SUPABASE_ANON_KEY
- DB는 supabase를 사용하여 관련된 변수 이름을 부여
- Supabase 클라이언트를 초기화하기 위한 도우미 파일 : src/supabase/supabase.js



<br />

## 🎨 와이어 프레임

<img src="https://github.com/wonjangnimsamgyetang-team3/followingfollower/assets/152264010/d84f53b1-f95f-4838-93d8-c27ede5349da" />


<br />
<br />
<br />


### 🖼 프로젝트 화면 구성 및 기능

<br />

<br />


|                  컬러 가이드와 메인 페이지                   |                   로그인과 회원가입 페이지                   |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| <p><img src="https://github.com/wonjangnimsamgyetang-team3/followingfollower/assets/152264010/af6d7a3b-b8ad-4062-96db-4db8605127e6" align="center" width="100%" height="100%" ></p><br /><p><img src="https://github.com/wonjangnimsamgyetang-team3/followingfollower/assets/152264010/e0ab4b35-0b00-4f6a-b76c-aaf749ea0ce7" align="center" width="100%" height="100%" ></p> | <p><img src="https://github.com/wonjangnimsamgyetang-team3/followingfollower/assets/152264010/4df5bb9d-baa8-4cd1-80c7-3abeb0497959" width="100%" height="100%"></p><br /><p><img src="https://github.com/wonjangnimsamgyetang-team3/followingfollower/assets/152264010/92617edf-f0ad-4808-b36d-9a330cf6e311" width="100%" height="100%"></p> |
|                      서비스 소개 페이지                      |                        88피드 페이지                         |
| <p><img src="https://github.com/wonjangnimsamgyetang-team3/followingfollower/assets/152264010/604d7cfa-23da-4a8d-95a6-0a55bc8e4651" width="100%" height="100%" /></p> | <p><img src="https://github.com/wonjangnimsamgyetang-team3/followingfollower/assets/152264010/5f2fe63d-1c36-4be6-9a48-712a394bf35f" width="100%" height="100%" /></p> |
|                          마이페이지                          |                       todo 상세 페이지                       |
| <p><img src="https://github.com/wonjangnimsamgyetang-team3/followingfollower/assets/152264010/9443215b-d83c-4ddc-be1f-d1a4b49f29cf" width="100%" height="100%"></p> | <p><img src="https://github.com/wonjangnimsamgyetang-team3/followingfollower/assets/152264010/d2550add-0d29-407f-816f-d8c058208511" width="100%" height="100%" /></p> |



<br />

<br />


## 💥트러블 슈팅💥

---

<br />

<br />


<br />

<br />



<br />

<br />



<br />

<br />

<br />

### 🛠기능 담당

---

| 기능                                                         | 담당자 |
| ------------------------------------------------------------ | ------ |
| 캘린더 라이브러리 이용하여 Todo 일정 표시, about페이지 구성, 전체 Todo와 가입 User현황 표시 | 김소현 |
| 메인 페이지 구현, 일정 목록 불러오기, 최신순, 인기순 정렬    | 남지현 |
| 마이 페이지 구현, 유저 정보 수정, 생성한 게시글과 좋아요를 누른 게시글 조회   | 남해리 |
| 로그인 / 회원가입 구현(소셜 / 이메일), 비밀번호 찾기 모달 창 portal사용하여 구현 | 성예지 |
| crud 및 사진 파일 첨부, 피드 페이지 구현, 피드 최신, 인기순 정렬, 상세 todo 모달 창 portal사용하여 구현 | 양유진 |



<br />
<br />


### 🔎기능 소개

---

**로그인/회원가입 페이지**

- 이메일, 비밀번호, 닉네임의 유효성 검사를 실시합니다,
- 로그인한 유저의 정보를 “현재 로그인한 유저 DB”에 저장합니다.
- “현재 로그인한 유저 DB”를 참고하여 중복된 로그인을 방지합니다.
- 비밀번호 찾기로 유저의 이메일을 통해 비밀번호를 찾습니다.



**메인 페이지**

- 피드 게시글이 인기글, 최신글로 표시됩니다.
- 인기 유저를 top 3까지 표시합니다.



**마이 페이지**

- 유저 프로필
  - 수정 버튼을 클릭 후, 수정 모드일 때,
  - 이미지 미리보기 :
    - 등록 버튼을 클릭하고, 선택한 이미지를 등록하면 미리보기로 해당 이미지를 확인할 수 있습니다.
  - 이미지, 닉네임 수정 :
    - 이미지를 등록을 하고 닉네임을 수정하고 완료버튼을 클릭 시, “수정내용을 저장하시겠습니까?” 라는 선택 메세지가 뜬 후 “확인 버튼”을 클릭하면 이미지 수정이 됩니다.
- 내가 할 일 / 좋아요 한 일 모음
  - 유저가 게시한 글을 마이페이지에서 확인할 수 있게 했습니다.
  - 유저가 좋아요를 누른 글을 마이페이지에서 확인할 수 있게 했습니다.



**Todo 등록 페이지**

- 제목, 내용, 사진 파일, 시작일 ~ 마감일 작성이 필수인 글 등록 페이지입니다.
- 현재 로그인한 유저의 아바타와 닉네임을 불러옵니다.
- 이미지 추가를 하지 않을 경우 기본 이미지로 설정됩니다



**88피드 페이지**

- todo를 클릭하여 todo의 상세 모달을 확인할 수 있습니다.
- todo를 삭제, 수정, 할 수 있습니다.
- 글의 대해서 댓글을 작성할 수 있고 댓글은 삭제만 가능합니다.
- 유효성검사가 들어가 있고, 삭제 시 컨펌을 활용해서 한번 더 의사를 확인합니다.

<br />
<br />


## 🎫 파일 구조

<div>
  <p><img src="https://github.com/wonjangnimsamgyetang-team3/followingfollower/assets/152264010/49a2fcea-588c-4d37-855a-7aa71eb2f133" width="150px" align="left"/><p>
  <p><img src="https://github.com/wonjangnimsamgyetang-team3/followingfollower/assets/152264010/1cb9f377-661f-4b75-9c19-64284544f77b" width="150px" align="left"/><p>
  <p><img src="https://github.com/wonjangnimsamgyetang-team3/followingfollower/assets/152264010/5fb9c278-7b19-4c1b-8c3f-57c3bf026bd6" width="150px" align="left"/><p>
  <p><img src="https://github.com/wonjangnimsamgyetang-team3/followingfollower/assets/152264010/14dedcb8-7bbe-40f0-b281-e91988631116" width="150px" align="left"/><p>
</div>


<br />
