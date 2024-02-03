export class Keyboard {
  #swichEl; // #(해시) => 프라이빗 변수는 클래스 외부에서 조회하거나 덮어쓸 수 없게된다.
  
  constructor() { // 키보드 클래스 인스턴스가 실행될 때 아래 메소드를 생성하고 초기화한다.
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#swichEl = document.getElementById("switch");
  }

  #addEvent() {
    console.log(this.#swichEl);
    this.#swichEl.addEventListener("change", (event) => {
      document.documentElement.setAttribute(
        "theme",
        event.target.checked ? "dark-mode" : "",
      );
    });
  }
}
