export class Keyboard {
  #swichEl; // #(해시) => 프라이빗 변수는 클래스 외부에서 조회하거나 덮어쓸 수 없게된다.
  #fontSelectEl;
  #containerEl;
  #keyboradEl;
  #inputGroupEl;
  #inputEl;
  #keyPress = false;
  #mouseDown = false;

  constructor() { // 키보드 클래스 인스턴스가 실행될 때 아래 메소드를 생성하고 초기화한다.
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#containerEl = document.getElementById("container");
    this.#swichEl = this.#containerEl.querySelector("#switch");
    this.#fontSelectEl = this.#containerEl.querySelector("#font");
    this.#keyboradEl = this.#containerEl.querySelector("#keyboard");
    this.#inputGroupEl = this.#containerEl.querySelector("#input-group");
    this.#inputEl = this.#inputGroupEl.querySelector("#input");
  }

  #addEvent() {
    // console.log(this.#swichEl);
    this.#swichEl.addEventListener("change", this.#onChangeTheme);
    this.#fontSelectEl.addEventListener("change", this.#onChangeFont);
    document.addEventListener("keydown" , this.#onKeyDown.bind(this));
    document.addEventListener("keyup" , this.#onKeyUp.bind(this));
    this.#inputEl.addEventListener("input", this.#onInput); // 한글을 공백으로(빈 string) 치환
    this.#keyboradEl.addEventListener('mousedown', this.#onMouseDown.bind(this));
    document.addEventListener('mouseup', this.#onMouseUp.bind(this));
  }

  #onMouseDown (event) {
    if(this.#keyPress) return;
    this.#mouseDown = false;
    event.target.closest("div.key")?.classList.add('active'); //closest => 일치하는 요소를 찾을 때까지, 자기 자신을 포함해 위쪽(부모 방향, 문서 루트까지)으로 문서 트리를 순회합니다
  }
  #onMouseUp (event) {
    if(this.#keyPress) return;
    this.#mouseDown = true;
    const keyEl = event.target.closest("div.key") 
    const isActive =  !!keyEl?.classList.contains("active");// 타입캐스팅해서 옵셔널채이닝으로 반환되는 undefined 값은 false로 변경
    const val = keyEl?.dataset.val;
    if(isActive && !!val && val !== "Space" && val !== "Backspace") {
      this.#inputEl.value += val;
    }
    if(isActive &&val === "Space"){
      this.#inputEl.value += " ";
    }
    if(isActive &&val === "Backspace"){
      this.#inputEl.value = this.#inputEl.value.slice(0, -1); // 마지막 String 값을 자워서 값에 넣음
    }
    this.#keyboradEl.querySelector(".active")?.classList.remove("active");
  }

  #onKeyDown(event) {
    if(this.#mouseDown) return;
    this.#keyPress = true;

    // 한글 조합에 대한 정규식 사용으로 한글 입력 에러 표시
    // console.log(event.key, /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(event.key));
    this.#inputGroupEl.classList.toggle("error", /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(event.key));

    // OS마다 특수키 위치가 다름에 따라 제외를 위해 ?.) Optional chaining 사용 => 에러가 발생하는 것 대신에 표현식의 리턴 값은 undefined
    this.#keyboradEl.querySelector(`[data-code = ${event.code}]`)
    ?.classList.add('active');

    this.#keyboradEl.addEventListener('mousedown', this.#onMouseDown.bind(this));
    document.addEventListener('mouseup', this.#onMouseUp.bind(this));
  }

  #onKeyUp(event) {
    if(this.#mouseDown) return;
    this.#keyPress = false;

    this.#keyboradEl.querySelector(`[data-code = ${event.code}]`)
    ?.classList.remove('active');
  } 

  #onInput(event) {
    event.target.value = event.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, "");
  }

  #onChangeTheme(event) {
    document.documentElement.setAttribute(
      "theme",
      event.target.checked ? "dark-mode" : "",
    );
  }

  #onChangeFont(event) {
    document.body.style.fontFamily = event.target.value;
  }
}
