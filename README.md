# 202130434 한지수 
---
## 2023-05-18 12주차 
### 13장.합성 VS. 상속
#### [합성]
- Composition이라는 영단어는 구성이라는 뜻
- 그러나 리액트에서의 Composition은 합성을 의미
- 여러 개의 컴포넌트를 합쳐서 새로운 컴포넌트를 만드는 것을 말함
- 리액트로 개발을 하다 보면 여러 개의 컴포넌트를 합쳐서 새로운 컴포넌트를 만드는 일이 많기 때문에 합성은 리액트 전반에 걸쳐서 많이 사용하는 방법
- 조합 방법에 따라 합성의 사용 기법이 나뉘는데 대표적인 합성 사용 기법으로는
    - [Containment]
        - 리액트에서 Containment는 하위 컴포넌트를 포함하는 형태의 합성 방법
        - props.children이나 직접 정의한 props를 이용하여 하위 컴포넌트를 포함하는 형태로 합성하는 방법
    - [Specialization]
        - 범용적인 개념을 구조별이 되게 구체화하는 것
        - 범용적으로 쓸 수 있는 컴포넌트를 만들어 놓고 이를 특수화 시켜서 컴포넌트를 사용하는 합성 방식
    - [Containment와 Specialization을 같이 사용하기]
        - Containment를 위해서 props.children을 사용하고 Specialization을 위해 직접 정의한 props를 사용
#### [상속]
- Inheritance는 상속이라는 뜻
- 컴퓨터 프로그래밍에서 상속은 객체지향 프로그래밍에서 나온 개념
- 부모 클래스를 상속받아서 새로운 자식 클래스를 만든다는 개념으로 자식 클래스는 부모 클래스가 가진 변수나 함수 등의 속성을 갖게 됨
- 복잡한 컴포넌트를 쪼개 여러 개의 컴포넌트로 만들고 만든 컴포넌트들을 조합하여 새로운 컴포넌트를 만드는 것
#### [실습 - Card 컴포넌트 만들기]  
- Card.jsx
```jsx
function Card(props) {
    const {title, backgroundColor, children} = props;

    return (
        <div
            style={{
                margin: 8,
                padding: 8,
                borderRadius: 8,
                boxShadow: "0px 0px 4px grey",
                backgroundColor: backgroundColor || "white",
            }}
        >
            {title && <h1>{title}</h1>}
            {children}
        </div>
    );
}

export default Card;
```
- ProfileCard.jsx
```jsx
import Card from "./Card";

function ProfileCard(props) {
    return (
        <Card title="Inje Lee" backgroundColor="#4ea04e">
            <p>안녕하세요, 소플입니다.</p>
            <p>저는 리액트를 사용해서 개발하고 있습니다.</p>
        </Card>
    );
}

export default ProfileCard;
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
import Accommodate from './chapter_07/Accommodate';
import ConfirmButton from './chapter_08/ConfirmButton';
import LandingPage from './chapter_09/LandingPage';
import AttendanceBook from './chapter_10/AttendanceBook';
import SignUp from './chapter_11/SignUp';
import Calculator from './chapter_12/Calculator';
import ProfileCard from './chapter_13/ProfileCard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProfileCard />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```
### 14장.컨텍스트
#### [컨텍스트]
- 컨텍스는 리액트 컴포넌트들 사이에서 데이터를 기존의 props를 통해 전당하는 방식 대신 컴포넌트 트리를 통해 곧바로 컴포넌트에 전달하는 새로운 방식을 제공
- 컨텍스트를 사용하면 일일이 props에 전달할 필요 럾이 데이터를 필요로 하는 컴포넌트에 곧바로 데이터를 전달할 수 있음
- 코드도 매우 깔끔해지고 데이터를 한 곳에서 관리하기 때문에 디버깅을 하기에도 굉장히 유리함
- 여러 컴포넌트에서 계속해서 접근이 일어날 수 있는 데이터들이 있는 경우 컨텍스를 사용
- Provider의 모든 하위 컴포넌트가 얼마나 깊이 위치해 있는지 관계 없이 컨텍스트릐 데이터를 읽을 수 있음
#### [컨텍스트를 사용하기 전에 고려할 점]
- 무조건 컨텍스를 사용하는 것은 좋은 것이 아님
- 컴포넌트와 컨텍스트가 연동되면 재사용성이 떨어지기 때문
- 다른 레벨의 많은 컴포넌트가 데이터를 필요로 하는 경우가 아니라면 기존에 사용하던 방식대로 props를 통해 데이터를 전달하는 컴포넌트 합성 방법이 더 적합
#### [컨텍스트 API]
- React.createContext
    - 컨텍스트를 사용하기 위해서 가장 먼저 해야 할 일은 컨텍스트를 생성하는 것
    - 컨텍스트를 생성하기 위해서 React.createContext() 함수를 사용
    - 상위 레벨에 매칭되는 Provider가 없다면, 기본값 사용
    - 기본값으로 undefined를 넣으면 기본값이 사용되지 않음
- Context.Provider
    - 데이터를 제공해주는 컴포넌트
    - Context.Provider 컴포넌트로 하위 컴포넌트들을 감싸주면 모든 하위 컴포넌트들이 해당 컨텍스트의 데이터에 접근할 수 있게 됨
- Class.contextType
    - Provider 하위에 있는 클래스 컴포넌트에서 컨텍스트의 데이터에 접근하기 위해 사용
    - MyClass.contextType = MyContext;라고 해주면 MyClass하는 클래스 컴포넌트는 MyContext의 데이터에 접근할 수 있게 됨
    - 이 API는 단 하나의 컨텍스트만을 구독할 수 있음
- Context.Consumer
    - 컨텍스트의 데이터를 구독하는 컴포넌트
    - 클래스 컴포넌트에서는 위에 나온 Class.contextType을 사용하면 되고, 함수 컴포넌트에서는 Context.Consumer를 사용하여 컨텍스트를 구독할 수 있음
    - 컴포넌트의 자식으로 함수가 올 수 있는데 funtion as a child라고 부름
- Context.displayName
    - 컨텍스트 객체는 displayName이라는 문자열 속성을 가짐
    - 크롬의 리액트 개발자 도구에서는 컨텍스트의 Provider나 Consumer를 표시할 때 displayName을 함께 표시해 줌
---
## 2023-05-11 11주차 
### 12장.State 끌어올리기
#### [Shared State]
- 공유된 state
- 자식 컴포넌트들이 가장 가까운 공통된 부모 컴포넌트의 state를 공유해서 사용하는 것
- 어떤 컴포넌트의 state에 있는 데이터를 여러 개의 하위 컴포넌트에서 공통적으로 사용하는 경우
#### [하위 컴포넌트에서 State 공유하기]
- state를 상위 컴포넌트로 올린다는 것을 State 끌어올리기라고 표현
- State 끌어올리기를 하면 state는 제거되고 오로지 상위 컴포넌트에서 전달받은 값만을 사용
- 각 컴포넌트가 state에 값을 갖고 있는 것이 아니라 공통된 상위 컴포넌트로 올려서 공유하는 방법을 사용하면 리액트에서 더욱 간결하고 효율적인 개발을 할 수 있음
#### [실습 - 섭씨온도와 화씨온도 표시하기]  
- TemperatureInput.jsx
```jsx
const scaleNames = {
    c: "섭씨",
    f: "화씨",
};

function TemperatureInput(props) {
    const handleChange = (event) => {
        props.onTemperatureChange(event.target.value);
    };

    return (
        <fieldset>
            <legend>
                온도를 입력하세요(단위: {scaleNames[props.scale]}):
            </legend>
            <input value={props.temperature} onChange={handleChange} />
        </fieldset>
    );
}

export default TemperatureInput;
```
- Calculator.jsx
```jsx
import React, {useState} from "react";
import TemperatureInput from "./TemperatureInput";

function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>물이 끓습니다.</p>;
    }
    return <p>물이 끓지 않습니다.</p>;
}

function toCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return "";
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

function Calculator(props) {
    const [temperature, setTemperature] = useState("");
    const [scale, setScale] = useState("c");

    const handleCelsiusChange = (temperature) => {
        setTemperature(temperature);
        setScale("c");
    };

    const handleFahrenheitChange = (temperature) => {
        setTemperature(temperature);
        setScale("f");
    };

    const celsius =
        scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit =
        scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
        <div>
            <TemperatureInput
                scale="c"
                temperature={celsius}
                onTemperatureChange={handleCelsiusChange}
            />
            <TemperatureInput
                scale="f"
                temperature={fahrenheit}
                onTemperatureChange={handleFahrenheitChange}
            />  
            <BoilingVerdict celsius={parseFloat(celsius)} />
        </div>
    );
}

export default Calculator;
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
import Accommodate from './chapter_07/Accommodate';
import ConfirmButton from './chapter_08/ConfirmButton';
import LandingPage from './chapter_09/LandingPage';
import AttendanceBook from './chapter_10/AttendanceBook';
import SignUp from './chapter_11/SignUp';
import Calculator from './chapter_12/Calculator';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```
---
## 2023-05-04 10주차 
### 10장.리스트와 키
#### [리스트와 키]
- 컴퓨터 프로그래밍에서 리스트는 같은 아이템을 순서대로 모아놓은 것
- 리스트를 위해 사용하는 구조가 바로 배열
    - 배열은 자바스크립트의 변수나 객체를 하나의 변수로 묶어놓은 것
- 컴퓨터 프로그래밍에서의 키는 각 개체나 아이템을 구분할 수 있는 고유한 값
#### [여러 개의 컴포넌트 렌더링하기]
- 동적으로 화면의 내용이 바뀌는 경우에는 코드를 직접 하나씩 넣는 방식으로는 구현하기가 까다로운데, 이러한 경우에 사용하는 것이 자바스크립트 배열의 map() 함수
- map 함수는 영단어 mapping을 떠올리면 생각하기 쉬움
- 이곳에서의 매핑도 배열에 들어있는 각 변수에 어떤 처리를 한 뒤 리턴하는 것
#### [기본적인 리스트 컴포넌트]
- 리스트 아이템에는 무조건 키가 있어야 함
#### [리스트의 키]
- 리액트에서 키는 리스트에서 아이템을 구분하기 위한 고유한 문자열
- 키는 리스트에서 어떤 아이템이 변경, 추가, 또는 제거되었는지 구분하기 위해 사용함
- 리액트에서의 키의 값은 같은 리스트에 있는 엘리먼트 사이에서만 고유한 값이면 됨
- 키값의 사용법
    - 키값으로 숫자의 값을 사용
    - 키값으로 id를 사용
    - 키값으로 인덱스를 사용
        - 리액트에서는 키를 명시적으로 넣어 주지 않으면 기본적으로 인덱스 값을 키값으로 사용
#### [실습 - 출석부 출력하기]  
- AttendanceBook.jsx
```jsx
import React from "react";

const students = [
    {
        id: 1,
        name: "InJe",
    },
    {
        id: 2,
        name: "Steve",
    },
    {
        id: 3,
        name: "Bill",
    },
    {
        id: 4,
        name: "Jeff",
    },
];

function AttendanceBook(props) {
    return (
        <ul>
            {students.map((student) => {
                return <li key={student.id}>{student.name}</li>;
            })}
        </ul>
    );
}

export default AttendanceBook;
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
import Accommodate from './chapter_07/Accommodate';
import ConfirmButton from './chapter_08/ConfirmButton';
import LandingPage from './chapter_09/LandingPage';
import AttendanceBook from './chapter_10/AttendanceBook';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AttendanceBook />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```
### 11장.폼
#### [폼]
- 폼은 사용자로부터 입력을 받기 위해 사용
#### [제어 컴포넌트]
- 사용자가 입력한 값에 접근하고 제어할 수 있도록 해주는 컴포넌트
- 그 값이 리액트의 통제를 받는 입력 폼 엘리먼트
#### [textarea 태그]
- 여러 줄에 걸쳐서 나올 정도로 긴 텍스트릴 입력받기 위한 HTML 태그
- 리액트에서는 value라는 attribute를 사용하여 텍스트를 표시
#### [select 태그]
- 드롭다운 목록을 보여주기 위한 HTML 태그
- 드롭다운 목록은 여러 가지 옵션 중에서 하나를 선택할 수 있는 기능을 제공
- value라는 attribute를 통해 값을 전달하고 값을 변경할 때는 onChange에서 setValue() 함수를 사용하여 값을 업데이트
#### [File input 태그]
- 디바이스의 저장 장치로부터 사용자가 하나 또는 여러 개의 파일을 선택할 수 있게 해주는 태그
- 서버를 파일로 업로드하거나 자바스크립트의 File API를 사용해서 파일을 다룰 때 사용
#### [여러개의 입력 다루기]
- 하나의 컴포넌트에서 여러개의 입력을 다루기 위해서는 여러개의 state를 선언하여 각각의 입력에 대해 사용하면 됨
#### [Input Null Value]
- 제어 컴포넌트에 value prop을 정해진 값으로 넣으면 코드를 수정하지 않는 한 입력값을 바꿀 수 없음
- value prop은 넣되 자유롭게 입력할 수 있게 만들고 싶다면 값에 undefined 또는 null을 넣어주면 됨
#### [실습 - 사용자 정보 입력받기]  
- SignUp.jsx
```jsx
import React, {useState} from "react";

function SignUp(props) {
    const [name, setName] = useState("");
    const [gender, setGender] = useState("남자");

    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleChangeGender = (event) => {
        setGender(event.target.value);
    };

    const handleSubmit = (event) => {
        alert(`이름: ${name}, 성별: ${gender}`);
        event.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                이름:
                <input type="text" value={name} onChange={handleChangeName} />
            </label>
            <br />
            <label>
                성별:
                <select value={gender} onChange={handleChangeGender}>
                    <option value="남자">남자</option>
                    <option value="여자">여자</option>
                </select>
            </label>
            <button type="submit">제출</button>
        </form>
    );
}

export default SignUp;
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
import Accommodate from './chapter_07/Accommodate';
import ConfirmButton from './chapter_08/ConfirmButton';
import LandingPage from './chapter_09/LandingPage';
import AttendanceBook from './chapter_10/AttendanceBook';
import SignUp from './chapter_11/SignUp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SignUp />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```
---
## 2023-04-27 9주차 
### 8장.이벤트 핸들링
#### [이벤트 처리하기]
- 카멜 표기법 사용
    - 카멜 표기법 : 첫글자는 소문자로 시작하고, 중간에 나오는 새로운 단어의 첫글자를 대문자로 사용하는 방법  
- DOM에서는 이벤트를 처리할 함수를 문자열로 전달하지만 리액트에서는 함수 그대로 전달함
- DOM에도 이벤트가 있고 리액트에도 이벤트가 있지만 사용하는 방법이 조금 다름
- 어떤 이벤트가 발생했을 때 해당 이벤트를 처리하는 함수가 있는데 이것을 이벤트 핸들러라고 부름
- 또는 이벤트가 발생하는 것을 계속 듣고 있다는 의미로 이벤트 리스너라고 부르기도 함
- JSX에서 this의 의미에 대해 유의해야하는데 bind를 하는 이유는 자바스크립트에서는 
    - 기본적으로 클래스 함수들이 바운드 되지 않기 때문
    - bind를 하지 않으면 this.handleClick은 글로벌 스코프에서 호출되는데 글로벌 스코프에서 this.handleClick은 undefined이므로 사용할 수가 없음
    - 이것은 리액트에만 해당되는 내용이 아니라 자바스크립트 함수의 작동 원리 중 일부분
- bind를 사용하는 방식이 번거로우면 클래스 필드 문법을 사용하면 됨
- bind와 클래드 필드 문법을 사용하지 않으려면 이벤트 핸들러를 넣는 곳에 arrow function을 사용하는 방법도 있음
#### [Arguments 전달하기]
- 영단어 Argument는 주장, 논쟁, 말다툼이라는 뜻인데 여기에서는 주장이라는 뜻에 가까움 
- 함수에 주장할 내용이라는 의미
- 함수에 전달할 데이터를 Arguments라고 하며 같은 의미로 파라미터라는 용어도 많이 사용함, 우리 말로는 매개변수
- 클래스 컴포넌트에서는 
    1. arrow function 사용 
    2. Function.prototype.bind 사용 
- 함수 컴포넌트에서는
    - 이벤트 핸들러에 매개변수를 전달할 때 원하는 순서대로 전달하면 됨
#### [실습 - 클릭 이벤트 처리하기] 
- ConfirmButton.jsx
```jsx 
import React from "react";

class ConfirmButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isConfirmed: false,
        };

        this.handleConfirm = this.handleConfirm.bind(this);
    }

    handleConfirm() {
        this.setState((prevState) => ({
            isConfirmed: !prevState.isConfirmed,
        }));
    }

    render() {
        return (
            <button
                onClick={this.handleConfirm}
                disabled={this.state.isConfirmed}
            >
                {this.state.isConfirmed ? "확인 됨" : "확인하기"}
            </button>
        );
    }
}

export default ConfirmButton;
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
import Accommodate from './chapter_07/Accommodate';
import ConfirmButton from './chapter_08/ConfirmButton';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfirmButton />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```
### 9장.조건부 렌더링
#### [조건부 렌더링]
- Conditional Rendering을 조건에 따른 렌더링이라고 해석하고 일반적으로 조건부 렌더링이라고 줄여서 부름
- 조건부 렌더링은 어떠한 조건에 따라서 렌더링이 달라지는 것을 의미함
- 조건은 프로그래밍에서 사용하는 조건문이라고 이해하면 됨
- 조건문의 결과는 true아니면 false
#### [엘리먼트 변수]
- 조건부 렌더링을 사용하다 보면 렌더링해야 될 컴포넌트를 변수처럼 다루고 싶을 때가 있는데 이때 사용할 수 있는 방법이 바로 엘리먼트 변수
- 엘리먼트 변수는 이름 그대로 리액트 엘리먼트를 변수처럼 다루는 방법
#### [인라인 조건]
- 인라인 조건이라고 하면 조건문을 코드 안에 집어넣는 것
- 인라인 If
    - 인라인 If는 if문을 필요한 곳에 직접 집어넣어서 사용하는 방법
    - 실제로 if문을 넣는 것은 아니고 if문과 동일한 효과를 내기 위해 &&라는 논리연산자를 사용
    - && 연산자는 AND연산이라고 부르는데 양쪽에 나오는 조건문이 모두 true인 경우에만 전체 결과가 true가 됨
    - 따라서 첫 번째 조건문이 true이면 두 번째 조건문을 평가하고, 첫 번째 조건문이 false이면 두 번째 조건문은 평가룰 안하는데 컴퓨터 프로그래밍에서는 이것을 단축 평가라고 함
- 인라인 If-Else
    - 인라인 If-Else는 If-Else문을 필요한 곳에 직접 넣어서 사용하는 방법
    - 인라인 If는 보여주거나 안 보여주는 두 가지 경우만 있었지만, 인라인 If-Else는 조건문의 값에 따라 다른 엘리먼트를 보여줄 때 사용
    - 그리고 이를 위해서 삼항 연산자라고 부르는 ? 연산자를 사용함
    - ? 연산자의 경우 앞에 나오는 조건문이 true이면 첫 번째 항목을 리턴하고, false이면 두 번째 항목을 리턴함
    - 삼항 연산자의 작동 방식
        - 조건문 ? 참일 경우 : 거짓일 경우
    - 인라인 If-Else는 조건에 따라 각기 다른 엘리먼트를 렌더링하고 싶을 때 사용
#### [컴포넌트 렌더링 막기]
- 컴포넌트를 렌더링 하고 싶지 않을 때에는 null을 리턴하면 됨
- 리액트에서 특정 컴포넌트를 렌더링하고 싶지 않을 때에는 nill을 리턴하면 됨
- but, 클래스 컴포넌트의 render()함수에서 null을 리턴하는 것은 컴포넌트의 생명주기 함수에 전혀 영향을 미치지 않음
#### [실습 - 로그인 여부를 나타내는 툴바 만들기]
- Toolbar.jsx
```jsx
import React from "react";

const styles = {
    wrapper: {
        padding: 16,
        dispaly: "flex",
        flexDirection: "row",
        borderBottom: "1px sokid grey",
    },
    greeting: {
        marginRight: 8,
    },
};

function Toolbar(props) {
    const { isLoggedIn, onClickLogin, onClickLogout } = props;

    return (
        <div style={styles.wrapper}>
            { isLoggedIn && <span style={styles.greeting}>환영합니다!</span>}

            {isLoggedIn ? (
                <button onClick={onClickLogout}>로그아웃</button>
            ) : (
                <button onClick={onClickLogin}>로그인</button>
            )}
        </div>
    );
}

export default Toolbar;
```
- LandingPage.jsx
```jsx
import React, {useState} from "react";
import Toolbar from "./Toolbar";

function LandingPage(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const onClickLogin = () => {
        setIsLoggedIn(true);
    };

    const onClickLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <div>
            <Toolbar
                isLoggedIn = {isLoggedIn}
                onClickLogin = {onClickLogin}
                onClickLogout = {onClickLogout}
            />
            <div style={{padding: 16}}>소플과 함께하는 리액트 공부!</div>
        </div>
    );
}

export default LandingPage;
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
import Accommodate from './chapter_07/Accommodate';
import ConfirmButton from './chapter_08/ConfirmButton';
import LandingPage from './chapter_09/LandingPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```
---
## 2023-04-20 8주차 
### 중간고사
---
## 2023-04-13 7주차 
### 7장.훅
#### [훅]
- 기존 함수 컴포넌트는 클래스 컴포넌트와 다르게 코드도 간결하고, 별도로 state를 정의해서 사용하거나 컴포넌트의 생명주기에 맞춰 어떤 코드가 실행되도록 할 수 없었기 때문에 함수 컴포넌트에 이런 기능을 지원하기 위해 나온것이 훅
- 훅을 사용하면 함수 컴포넌트도 클래스 컴포넌트의 기능을 모두 동일하게 구현 가능
- 리액트에서의 훅은 리액트의 state와 생명주기 기능에 갈고리를 걸어 원하는 시점에 정해진 함수를 실행되도록 만든 것
- 훅의 이름은 모두 use로 시작
#### [useState]
- 가장 대표적이고 많이 사용되는 훅
- state를 사용하기 위한 훅
- useState()를 호출할 때에는 파라미터로 선언할 state의 초깃값이 들어감
- useState()를 사용하는 방법에서는 변수 각각에 대해 set 함수가 따로 존재
- useState() 는 아래와 같이 사용
    - const [변수명, set함수명] = useState(초깃값);
#### [useEffect]
- useState()와 같이 가장 많이 사용되는 훅
- 사이드 이펙트를 수행하기 위한 훅
-   여기서 사이드 이펙트란 사전적으로 부작용이라는 뜻   
- useEffect()는 클래스 컴포넌트에서 제공하는 생명주기 함수인 componentDidMount(), componentDidUpdate() 그리고 componentWillUnMount()와 동일한 기능을 하나로 통합해서 제공
- useEffect() 훅만으로 생명주기 함수와 동일한 기능을 수행할 수 있음
- 첫 번째 파라미터로는 이펙트 함수가 들어가고, 두 번째 파라미터로는 의존성 배열이 들어감
    - 의존성 배열은 이펙트가 의존하고 있는 배열인데 배열 안에 있는 변수 중에 하나라도 값이 변경되었을 때 이펙트 함수가 실행
- 의존성 배열 없이 useEffect()를 사용하면 리액트는 DOM이 변경된 이후에 해당 이펙트 함수를 실행하라는 의미로 받아들임
- useEffect()에서 리턴하는 함수는 컴포넌트가 마운트 해제될 때 호출    
- useEffect()는 아래와 같이 사용
   - useEffect(이펙트 함수, 의존성 배열);
#### [useMemo]
- useMemo()훅은 Memoized value를 리턴하는 훅
- useMemo()훅을 사용하면 컴포넌트가 다시 렌더링될 때마다 연산량이 높은 작업을 반복하는 것을 피할 수 있기 때문에 결과적으로는 빠른 렌더링 속도 얻을 수 있음
- useMemo()로 전달된 함수는 렌더링이 일어나는 동안 실행됨
- useMemo()는 아래와 같이 사용
   - const memoizedValue = useMemo (값 생성 함수, 의존성 배열);
#### [useCallback]
- useCallback()훅은 useMemo()훅과 유사한 역할을 함
- useMemo()훅과의 차이점은 값이 아닌 함수를 반환한다는 점
- useCallback()는 아래와 같이 사용
   - const memoizedCallback = useCallback(콜백 함수, 의존성 배열);
#### [useRef]
- useRef()훅은 레퍼런스를 사용하기 위한 훅
- 리액트에서 레퍼런스란 특정 컴포넌트에 접근할 수 있는 객체를 의미
- useRef()훅은 변경 가능한 .current라는 속성을 가진 하나의 상자
- useRef()훅은 매번 렌더링될 때마다 항상 같은 ref 객체를 반환
- useRef()는 아래와 같이 사용
   - const refContainer = useRef(초깃값);
#### [훅의 규칙]
1. 훅은 무조건 최상위 레벨에서만 호출해야 함
   - 여기서 최상위 레벨은 리액트 함수 컴포넌트의 최상위 레벨
   - 반복문이나 조건문 또는 중첩된 함수들 안에서 훅을 호출하면 안됨
   - 훅은 컴포넌트가 렌더링 될 때마다 매번 같은 순서로 호출되어야 함
2. 리액트 함수 컴포넌트에서만 훅을 호출해야 함
   - 일반적인 자바스크립트 함수에서 훅을 호출하면 안됨
   - 훅은 리액트 함수 컴포넌트에서 호출하거나 직접 만든 커스텀 훅에서만 호출할 수 있음
#### [커스텀 훅]
- 리액트에서 기본적으로 제공되는 훅들 이외에 추가적으로 필요한 기능이 있다면 직접 훅을 만들어 사용할 수 있는데, 이것을 커스텀 훅이라고 부름
- 커스텀 훅 추출
   - 이름이 use로 시작하고 내부에서 다른 훅을 호출하는 하나의 자바스크립트 함수로 하면 됨
- 커스텀 훅 사용
   - 커스텀 훅은 리액트 기능이 아닌 훅의 디자인에서 자연스럽게 따르는 규칙
   - 이름은 꼭 use로 시작, use로 시작하지 않는다면 특정 함수의 내부에서 훅을 호출하는지를 알 수 없기 때문에 훅의 규칙 위반 여부를 자동으로 확인할 수 없음
#### [실습 - 훅을 사용한 컴포넌트 개발] 
- Accommodate.jsx
```jsx
import React, {useState, useEffect} from "react";
import useCounter from "./useCounter";

const MAX_CAPACITY = 10;

function Accommodate(props) {
    const [isFull, setIsFull] = useState(false);
    const [count, increaseCount, decreaseCount] = useCounter(0);

    useEffect(() => {
        console.log("=======================");
        console.log("useEffect() is called.");
        console.log(`isFull : ${isFull}`);
    });

    useEffect(() => {
        setIsFull(count >= MAX_CAPACITY);
        console.log(`Current count value: ${count}`);
    }, [count]);

    return (
        <div style={{padding: 16}}>
            <p>{`총 ${count}명 수용했습니다.`}</p>

            <button onClick={increaseCount} disabled={isFull}>입장</button>
            <button onClick={decreaseCount}>퇴장</button>

            {isFull && <p style={{color: "red"}}>정원이 가득찼습니다.</p>}
        </div>
    );
}

export default Accommodate;
```
- useCounter.jsx
```jsx
import React, {useState} from "react";

function useCounter(initialValue) {
    const [count, setCount] = useState(initialValue);

    const increaseCount = () => setCount((count) => count + 1);
    const decreaseCount = () => setCount((count) => Math.max(count - 1, 0));

    return [count, increaseCount, decreaseCount];
}

export default useCounter;
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
import Accommodate from './chapter_07/Accommodate';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Accommodate />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```
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