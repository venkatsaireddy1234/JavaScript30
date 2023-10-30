document.addEventListener("DOMContentLoaded", function() {
    const fill = document.querySelector(".fill");
    const emptyList = document.querySelectorAll(".empty");
  
    fill.addEventListener("dragstart", dragStart);
    fill.addEventListener("dragend", dragEnd);
  
    emptyList.forEach((empty) => {
      empty.addEventListener("dragenter", dragEnter);
      empty.addEventListener("dragover", dragOver);
      empty.addEventListener("dragleave", dragLeave);
      empty.addEventListener("drop", dragDrop);
    });
  
    function dragStart() {
    //   setTimeout(() => this.classList.add("invisible"), 5000);
    }
  
    function dragEnd() {
      this.className = "fill";
    }
  
    function dragOver(event) {
      event.preventDefault();
    }
  
    function dragEnter(event) {
      event.preventDefault();
      this.classList.add("boxHover");
    }
  
    function dragLeave() {
      this.classList.remove("boxHover");
    }
  
    function dragDrop() {
      this.classList.remove("boxHover");
      this.appendChild(fill);
    }
  });
  