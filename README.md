# 202130434 한지수 
---
## 2023-04-06 6주차 
### 5장.컴포넌트와 Props
#### [컴포넌트 추출]
- 컴포넌트 합성과 반대로 복잡한 컴포넌트를 쪼개서 여러 개의 컴포넌트로 나눌 수도 있는데 이런 과정을 컴포넌트 추출이라고 함
- 큰 컴포넌트에서 일부를 추출해서 새로운 컴포넌트를 만든다는 뜻
- 컴포넌트 추출을 잘 활용하게 되면 컴포넌트의 재사용성이 올라가게 되고, 개발 속도도 향상됨
- 컴포넌트를 어느 정도 수준까지 추출하는 것이 좋은지에 대해 정해진 기준은 없지만, 기능 단위로 구분하는 것이 좋고, 나중에 곧바로 재사용이 가능한 형태로 추출하는 것이 좋음
#### [실습 - 댓글 컴포넌트 만들기]
- Comment.jsx
```jsx
import React from "react";

const styles = {
    wrapper: {
        margin: 8,
        padding: 8,
        display: "flex",
        flexDirection: "row",
        border: "1px solid grey",
        borderRadius: 16,
    },
    imageContainer: {},
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    contentContainer: {
        marginLeft: 8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    nameText: {
        color: "black",
        fontSize: 16,
        fontWeight: "bold",
    },
    commentText: {
        color: "black",
        fontSize: 16,
    },
  };
  

function Comment(props) {
    return (
        <div style={styles.wrapper}>
            <div style={styles.imageContainer}>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                    style={styles.image}
                />    
            </div>

            <div style={styles.contentContainer}>
                <span style={styles.nameText}>{props.name}</span>
                <span style={styles.commentText}>{props.comment}</span>
            </div>
        </div>
    );
}

export default Comment;
```
- CommentList.jsx
```jsx
import React from "react";
import Comment from "./Comment";

const comments = [
    {
        name: "한지수",
        comment: "안녕하세요. 한지수입니다.",
    },
    {
        name: "두지수",
        comment: "안녕하세요. 두지수입니다.",
    },
    {
        name: "세지수",
        comment: "안녕하세요. 세지수입니다.",
    },
];

function CommentList(props) {
    return (
        <div>
            {comments.map((c) => {
                return (
                    <Comment name={c.name} comment={c.comment} />
                );
            })}
        </div>
    );
}

export default CommentList;
```
- index.js
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Library from './chapter_03/Library';
import Clock from './chapter_04/Clock';
import CommentList from './chapter_05/CommentList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CommentList />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```
### 6장.State와 생명주기
#### [State]
- 리액트에서의 state는 리액트 컴포넌트의 상태를 의미
  - 단 상태라는 단어가 정상인지 비정상인지를 나타내는 것이라기 보다는 리액트 컴포넌트의 데이터라는 의미에 더 가까움
- 쉽게 말하면, 리액트 컴포넌트의 변경 가능한 데이터를 state
- state를 정의할 때 중요한 점은 꼭 렌더링이나 데이터 흐름에 사용되는 값만 state에 포함시켜야 함
- 데이터 흐름에 관련없는 값은 컴포넌트 인스턴트의 필드로 정의하면 됨
#### [State의 특징] 
- 리액트의 state는 따로 복잡한 형태가 있는 것이 아니라, 그냥 하나의 자바스크립트 객체
- state는 직접적인 변경이 불가능  
  - state를 변경하고자 할 때에는 꼭 setState()라는 함수를 사용해야 함
#### [리액트의 생명주기]
- 리액트도 사람과 마찬가지로 컴포넌트가 생성되는 시점과 사라지는 시점이 정해져 있음
- {componentDidMount}, {componentDidUpdate}, {componentWillUnmount}는 생명주기에 따라 호출되는 클래스 컴포넌트의 함수인데, 이 함수들을 Lifecycle method라고 부르며 번역하면 생명주기 함수임
- 컴포넌트는 계속 존재하는 것이 아니라 시간의 흐름에 따라 생성되고 업데이트되다가 사라짐
- 마운트
  - 출생
  - 컴포넌트가 생성되는 시점
  - Mount(마운트)라고 부르고 이때 constructor(생성자)가 실행됨
  - 생성자에서는 컴포넌트의 state를 정의하게 됨
- 업데이트
  - 리액트 컴포넌트는 생애 동안 변화를 겪으며 여러번 렌더링됨
  - 업데이트 과정에서는 컴포넌트의 props가 변경되거나 setState() 함수 호출에 의해 state가 변경되거나, forceUpdate() 라는 강제 업데이트 함수 호출로 인해 컴포넌트가 다시 렌더링되고, 렌더링 이후에 componentDidUpdate() 함수가 호출됨
- 언마운트
  - 사망
  - 상위 컴포넌트에서 현재 컴포넌트를 더 이상 화면에 표시하지 않게 될 때 언마운트됨
#### [실습 - state와 생명주기 함수 사용하기]
- Notification.jsx
```jsx
import React from "react";

const styles = {
    wrapper: {
        margin: 8,
        padding: 8,
        display: "flex",
        flexDirection: "row",
        border: "1px solid grey",
        borderRadius: 16,
    },
    messageText: {
        color: "black",
        fontSize: 16,
  },
};

class Notification extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div style={styles.wrapper}>
                <span style={styles.messageText}>
                    {this.props.message}
                </span>
            </div>
        );
    }
}

export default Notification;
```
- NotificationList.jsx
```jsx
import React from "react";
import Notification from "./Notification";

const reservedNotifications = [
    {
        message: "안녕하세요, 오늘 일정을 알려드립니다.",
    },
    {
        message: "점심식사 시간입니다.",
    },
    {
        message: "이제 곧 미팅이 시작됩니다.",
    },
];

var timer;

class NotificationList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notifications: [],
        };
    }

    componentDidMount() {
        const { notifications } = this.state;
        timer = setInterval(() => {
            if (notifications.length < reservedNotifications.length) {
                const index = notifications.length;
                notifications.push(reservedNotifications[index]);
                this.setState({
                notifications: notifications,
                });
            } else {
                clearInterval(timer);
            }
        }, 1000);
    }

    render() {
        return (
            <div>
            {this.state.notifications.map((notification) => {
            return <Notification message={notification.message} />
            })}
            </div>
        );
    }
}

export default NotificationList;
```
- index.js
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Library from './chapter_03/Library';
import Clock from './chapter_04/Clock';
import CommentList from './chapter_05/CommentList';
import NotificationList from './chapter_06/NotificationList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NotificationList />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```
---
## 2023-03-30 5주차 
#### [클론 만들기]
- 똑같은 파일 하나 더 만드는 것
- 커밋하는 창 가서 clone 클릭
- 클릭하고 주소 입력하는 곳에는 깃허브에서 code 누르고 복사해오기
### 4장.엘리먼트 렌더링
#### [엘리먼트]
- Element라는 영단어는 요소, 성분이라는 뜻
- 리액트의 엘리먼트는 리액트 앱을 구성하는 요소
- 엘리먼트는 리액트 앱의 가장 작은 빌딩 블록들
- 리액트 엘리먼트는 DOM 엘리먼트의 가상 표현
- DOM 엘리먼트는 리액트 엘리먼트에 비해서 많은 정보를 담고 있기 때문에 상대적으로 크고 무거움
- 리액트 엘리먼트는 화면에서 보이는 것을 기술
#### [엘리먼트의 생김새]
- 리액트 엘리먼트는 자바스크립트 객체 형태로 존재
- 엘리먼트는 컴포넌트 유형과 속성 및 내부의 모든 자식에 대한 정보를 포함하고 있는 일반적인 자바스크립트 객체
- 마음대로 변경할 수 없는 불변성을 갖고 있음
- 리액트의 엘리먼트는 우리 눈에 실제로 보이는 것을 기술
#### [엘리먼트의 특징]
- 불변성을 가지고 있음
- 엘리먼트 생성 후에는 children이나 attributes를 바꿀 수 없음
#### [엘리먼트 렌더링하기]
- 렌더링을 위해 ReactDOM의 render()라는 함수를 사용
  - 리액트 엘리먼트를 HTML 엘리먼트에 렌더링하는 역할
- 렌더링되는 과정은 Virtual DOM에서 실제 DOM으로 이동하는 과정  
#### [렌더링 된 엘리먼트 업데이트하기]
- 엘리먼트는 한 번 생성되면 바꿀 수 없기 때문에 엘리먼트를 업데이트하기 위해서는 다시 생성해야 함
- 기존 엘리먼트를 변경하는 것이 아니라 새로운 엘리먼트를 생성해서 바꿔치기 하는 것
- test.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
        function tick() {
        const element = (
            <div>
                <h1>안녕 리액트!</h1>
                <h2>현재 시간 : {new Date().toLocaleTimeString()}</h2>
            </div>
        );
    
        ReactDOM.render(element, document.getElementById('root'));
    }
    
    setInterval(tick, 1000);
    </script>
</body>
</html>
```
#### [실습 - 시계 만들기]
- Clock.jsx
```jsx
import React from "react";

function Clock(props) {
    return (
        <div>
            <h1>안녕 리액트!</h1>
            <h2>현재 시간 : {new Date().toLocaleTimeString()}</h2>
        </div>
    );
}

export default Clock;
```
- index.js
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Library from './chapter_03/Library';
import Clock from './chapter_04/Clock';

setInterval(() => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Clock />
    </React.StrictMode>
  );
}, 1000);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```
### 5장.컴포넌트와 Props
#### [컴포넌트]
- 리액트를 컴포넌트 기반이라고 부르는 것은 작은 컴포넌트들이 모여서 하나의 컴포넌트를 구성하고, 이러한 컴포넌트들이 모여서 전체 페이지를 구성하기 때문
- 리액트 컴포넌트는 개념적으로 자바스크립트의 함수와 비슷
- 리액트 컴포넌트가 해주는 역할은 어떠한 속성들을 입력으로 받아서 그에 맞는 리액트 엘리먼트를 생성하여 리턴해주는 것
- 리액트 컴포넌트는 만들고자 하는 대로 props(속성)을 넣으면 해당 속성에 맞춰 화면에 나타날 엘리먼트를 만들어 주는 것
- 리액트의 컴포넌트는 객체 지향까지는 아니지만 비슷한 개념을 가지고 있음
#### [Props의 개념]
- 리액트 컴포넌트의 속성
- 컴포넌트의 모습과 속성을 결정하는 것이 바로 Props
- 컴포넌트에 전달할 다양한 정보를 담고 있는 자바스크립트 객체
#### [Props의 특징]
- props의 중요한 특징은 읽기 전용이라는 것
- props의 값은 리액트 컴포넌트가 엘리먼트를 생성하기 위해서 사용하는 값
- 리액트 컴포넌트에서는 props를 바꿀 수 없음
- 같은 props에 대해서 항상 같은 결과를 보여줘야 함
- 리액트 컴포넌트의 props는 바꿀 수 없고, 같은 props가 들어오면 항상 같은 엘리먼트를 리턴해야 함
#### [Props의 사용법]
- JSX를 사용하는 경우에는 키와 값으로 이루어진 키-값 쌍의 형태로 컴포넌트에 props를 넣을 수 있음
- props에 값을 넣을 때 문자열 이외에 정수, 변수, 그리고 다른 컴포넌트등이 들어갈 경우에는 중괄호를 사용해서 감싸주어야 함
- JSX를 사용하지 않는 경우에는 createElement() 함수 사용
#### [컴포넌트의 종류]
- 리액트에서의 컴포넌트는 클래스 컴포넌트와 함수 컴포넌트로 나뉨
- 리액트 초기 버전에서는 클래스 컴포넌트를 주로 사용하였지만, 사용하기 불편하다는 의견이 나왔고, 이후에는 함수 컴포넌트를 개선해서 사용하게 됨
#### [함수 컴포넌트]
- 모든 리액트 컴포넌트는 Pure 함수 같은 역할을 해야 하는데, 이 말은 리액트의 컴포넌트를 일종의 함수라고 생각한다는 뜻
- 함수 컴포넌트는 간단한 코드를 장점으로 가짐
#### [클래스 컴포넌트]
- 클래스 컴포넌트는 자바스크립트 ES6의 클래스라는 것을 사용해서 만들어진 형태의 컴포넌트
- 클래스 컴포넌트의 경우에는 함수 컴포넌트에 비해서 몇 가지 추가적인 기능을 가지고 있음
- 리액트의 모든 클래스 컴포넌트는 함수 컴포넌트와 다르게 React.Component를 상속받아 만들게 됨
#### [컴포넌트 이름 짓기]
- 컴포넌트의 이름은 항상 대문자로 시작해야 됨
#### [컴포넌트 렌더링]
- 컴포넌트로부터 엘리먼트를 생성하여 이를 리액트 DOM에 전달함
#### [컴포넌트 합성]
- 여러 개의 컴포넌트를 합쳐서 하나의 컴포넌트를 만드는 것
---
## 2023-03-23 4주차 
#### [마크다운(MarkDown) 언어]
- h1 = # + 공백 
- h2 = ## + 공백 
- h3 = ### + 공백 
- h4 = #### + 공백 
- h5 = ##### + 공백 
- h6 = ###### + 공백 
- 순서 있는 목록 : 1/2/3... + 공백 
- 순서 없는 목록 : -/+/* + 공백
- 코드 쓸 때 : ``` + 코드종류 + 줄바꾸기 + 작성할코드 + 줄바꾸기 + 처음과 똑같은 `*3
#### [터미널 코드]
- 깃허브 등록 예시1 : git config --global user.name "user name" 
    - "는 스페이스가 있기 때문 스페이스가 없다면 " 생략 가능
- 깃허브 등록 확인 예시1 : git config --global user.name -> user name    
- 깃허브 등록 예시2 : git config --global user.email aaa@email.com    
- 깃허브 등록 확인 예시2 : git config --global user.email -> aaa@email.com
- 프로젝트 생성 예시 : npx create-react-app 23-react1  
### 3장.JSX 소개
#### [JSX]
- JSX는 JavaScript와 XML/HTML을 합친 것
- JSX = JavaScript and XML
- 리액트로 개발을 하려면 필수적으로 JSX 코드와 친해져야 함
#### [JSX의 역할]
- JSX를 사용하면 코드가 더욱 간결해지고 생산성과 가독성을 올라가게 할 수 있음
- JSX로 작성된 코드는 모두 자바스크립트 코드로 변환
#### [JSX의 장점]
1. 간결해진 코드
2. 향상된 가독성
3. Injection Attack이라 불리는 해킹 방법을 방어함으로써 올라간 보안성
#### [JSX 사용법]
- 기본적으로 JSX는 자바스크립트 문법을 향상시킨 것이기 때문에 모든 자바스크립트 문법을 지원하고, 여기에 추가로 XML과 HTML을 섞어서 사용하면 됨
- HTML 태그 중간이 아닌 태그의 속성에 값을 넣고 싶을 때에는 큰따옴표 사이에 문자열을 넣거나 중괄호 사이에 자바스크립트 코드를 넣으면 됨
- JSX에서는 중괄호를 사용하면 무조건 자바스크립트 코드가 들어간다라고 외워 두는 게 좋음
#### [실습 - JSX 코드 작성해 보기]
- Book.jsx
```jsx
import React from "react";

function Book(props) {
  return (
    <div>
      <h1>{`이 책의 이름은 ${props.name}입니다.`}</h1>
      <h2>{`이 책은 총 ${props.numOfPage}페이지로 이뤄져 있습니다.`}</h2>
    </div>
  );
}

export default Book;
```
- Library.jsx
```jsx
import React from "react";
import Book from "./Book";

function Library(props) {
  return (
    <div>
      <Book name="처음 만난 파이썬" numOfPage={300} />
      <Book name="처음 만난 AWS" numOfPage={400} />
      <Book name="처음 만난 리엑트" numOfPage={500} />
    </div>
  );
}

export default Library;
```
- index.js
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Library from './chapter_03/Library';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Library />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```
---
## 2023-03-16 3주차 
#### 이름은 h1, 날짜는 h2
### 0장.준비하기
#### [개발 환경 설정하기]
Node.js는 LTS로 다운
#### [요약]
HTML
- 웹사이트의 뼈대를 구성하기 위해 사용
- 태그를 사용해서 웹사이트의 구조 만듦

CSS
- 웹사이트의 레이아웃과 글꼴, 색상 등의 디자인을 입히는 역할을 하는 언어

자바스크립트
- 웹페이지에서 동적인 부분을 구현하기 위한 스크립트 언어
- 웹사이트가 살아 움직이도록 생명을 불어넣는 역할
### 1장.리액트 소개
#### [리액트]
- 사용자 인터페이스를 만들기 위한 자바스크립트 라이브러리
- SPA를 쉽고 빠르게 만들 수 있도록 해주는 도구
- 유저 인터페이스 - 사용자와 컴퓨터 프로그럄이 서로 상호작용을 하기 위해 중간에서 서로 간에 입력과 출력을 제어해주는 것
- 사용자 인터페이스 - 버튼, 텍스트 입력창
- 사용자 인터페이스를 만들기 위한 기능 모음집을 UI 라이브러리라고 부르고 리액트는 대표적인 자바스크립트 UI 라이브러리
- 리액트는 사용자와 웹사이트의 상호작용을 돕는 입터페이스를 만들기 위한 자바스크립트 기능 모음집
#### [리액트의 장점]
1. 빠른 업데이트와 렌더링 속도
2. 컴포넌트 기반 구조
3. 재사용성
4. 든든한 지원군
5. 활발한 지식 공유 & 커뮤니티
6. 모바일 앱 개발 가능
#### [리액트의 단점]
1. 방대한 학습량
2. 높은 상태 관리 복잡도