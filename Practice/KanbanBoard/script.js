class KanbanBoard {
  constructor() {
    this.toolboxContainer = document.querySelector(".toolbox-cont");
    this.modal = document.querySelector(".modal-overlay");
    this.closeModalBtn = document.querySelector(".modal-close-btn");
    this.addCardBtn = document.querySelector(".add-card");
    this.textArea = document.querySelector(".modal-textarea");
    this.mainCont = document.querySelector(".main-cont");
    this.allPriorityColorElems = document.querySelectorAll(".priority-color");
    this.removeBtn = document.querySelector(".remove-btn");
    this.todoContainer = document.getElementById("todo");

    this.addModal = true;
    this.colors = ["red", "blue", "green", "black"];
    this.modalPriorityColor = "red";
    this.ticketArr = [];
    this.removeFlag = false;
    this.status = "todo";

    this.bindEvents();

    this.loadTicketsFromLocalStorage();
  }

  bindEvents() {
    this.toolboxContainer.addEventListener(
      "click",
      this.handleToolboxClick.bind(this)
    );
    this.closeModalBtn.addEventListener("click", this.closeModal.bind(this));
    this.addCardBtn.addEventListener(
      "click",
      this.handleAddCardClick.bind(this)
    );

    for (const priorityColorElem of this.allPriorityColorElems) {
      priorityColorElem.addEventListener(
        "click",
        this.handlePriorityColorClick.bind(this, priorityColorElem)
      );
    }

    this.mainCont.addEventListener(
      "dragstart",
      this.handleTicketDragStart.bind(this)
    );
    this.mainCont.addEventListener(
      "dragend",
      this.handleTicketDragEnd.bind(this)
    );

    this.mainCont.addEventListener(
      "dragover",
      this.handleTicketDragOver.bind(this)
    );
    this.mainCont.addEventListener("drop", this.handleDrop.bind(this));
  }

  handleToolboxClick(event) {
    // console.log('toolbox clicked');

    const targetClassList = event.target.classList;

    if (targetClassList.contains("fa-plus")) {
      // open the modal
      this.toggleModal();
    } else if (targetClassList.contains("color")) {
      this.filterTicketByColor(targetClassList[1]);
    } else if (targetClassList.contains("fa-trash")) {
      this.toggleRemoveFlag();
    }
  }

  toggleModal() {
    this.modal.style.display = this.addModal ? "block" : "none";
    this.addModal = !this.addModal;
  }

  closeModal() {
    this.toggleModal();
  }

  handleAddCardClick() {
    const task = this.textArea.value.trim();

    if (task.length) {
      this.createTicket(task);
    }
  }

  createTicket(task) {
    const id = new ShortUniqueId().randomUUID();
    const ticketCont = this.createTicketElement(
      task,
      id,
      this.modalPriorityColor
    );
    this.todoContainer.appendChild(ticketCont);
    this.toggleModal();
    this.clearTextarea();

    this.ticketArr.push({
      color: this.modalPriorityColor,
      id,
      task,
      status: this.status,
    });

    this.updateLocalStorage();
    this.handleLockUnlock(ticketCont, id);
  }

  createTicketElement(task, id, color) {
    const ticketCont = document.createElement("div");
    ticketCont.className = "ticket-cont";

    ticketCont.innerHTML = `
            <div class="ticket-color ${color ? color : ""}"></div>
            <div class="ticket-id">#${id}</div>
            <div class="ticket-task">${task}</div>
            <div class="lock-unlock">
                <i class="fa-solid fa-lock"></i>
            </div>
        `;

    ticketCont.draggable = true;
    ticketCont.id = id;

    return ticketCont;
  }

  updateLocalStorage() {
    const strArr = JSON.stringify(this.ticketArr);
    localStorage.setItem("tickets", strArr);
  }

  loadTicketsFromLocalStorage() {
    const storedTickets = localStorage.getItem("tickets");
    //console.log(storedTickets);

    if (storedTickets.length) {
      this.ticketArr = JSON.parse(storedTickets);
      this.renderStoredTickets();
    }
  }

  renderStoredTickets() {
    for (const ticket of this.ticketArr) {
      console.log(ticket.status);
      this.appendTicketElement(
        ticket.id,
        ticket.color,
        ticket.task,
        ticket.status
      );
    }
  }

  appendTicketElement(id, color, task, status) {
    console.log(id, color, task, status);
    const ticketCont = this.createTicketElement(task, id, color, status);

    if (status === "todo") {
      this.todoContainer.appendChild(ticketCont);
    } else if (status === "inProgress") {
      const inProgressContainer = document.getElementById("inProgress");
      inProgressContainer.appendChild(ticketCont);
    } else if (status === "completed") {
      const completedContainer = document.getElementById("completed");
      completedContainer.appendChild(ticketCont);
    }

    this.handleLockUnlock(ticketCont, id);
  }

  clearTextarea() {
    this.textArea.value = "";
  }

  handlePriorityColorClick(priorityColorElem) {
    //console.log(priorityColorElem);
    this.decActivatePriorityColors();
    this.activatePriorityColor(priorityColorElem);
    this.modalPriorityColor = priorityColorElem.classList[1];
  }

  decActivatePriorityColors() {
    for (const priorityColorElem of this.allPriorityColorElems) {
      priorityColorElem.classList.remove("active");
    }
  }

  activatePriorityColor(priorityColorElem) {
    priorityColorElem.classList.add("active");
  }

  filterTicketByColor(selectedColor) {
    //console.log(typeof selectedColor);
    const allAllTickets = document.querySelectorAll(".ticket-color");
    for (const ticketElem of allAllTickets) {
      const currentTicketColor = ticketElem.classList[1];
      const displayStyle =
        currentTicketColor === selectedColor ? "block" : "none";

      ticketElem.parentElement.style.display = displayStyle;
    }
  }

  handleLockUnlock(ticketCont, id) {
    const lockUnlockBtn = ticketCont.querySelector(".lock-unlock i");

    const ticketTask = ticketCont.querySelector(".ticket-task");

    lockUnlockBtn.addEventListener("click", () => {
      lockUnlockBtn.classList.toggle("fa-lock");
      lockUnlockBtn.classList.toggle("fa-unlock");

      const contentEditable = lockUnlockBtn.classList.contains("fa-unlock"); // boolean value as true or false

      ticketTask.contentEditable = contentEditable;

      const idx = this.ticketArr.findIndex((obj) => obj.id === id);

      this.ticketArr[idx].task = ticketTask.innerText;

      this.updateLocalStorage();
    });
  }

  handleTicketDragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
    event.target.classList.add("dragging");
  }

  handleTicketDragEnd(event) {
    event.target.classList.remove("dragging");
  }

  handleTicketDragOver(event) {
    event.preventDefault();
  }

  handleDrop(event) {
    event.preventDefault();

    const ticketId = event.dataTransfer.getData("text/plain");
    //console.log(ticketId);

    const droppedTicket = document.getElementById(ticketId);
    console.log(droppedTicket);

    if (droppedTicket) {
      const targetContainer = event.target.closest(".ticket-container");

      if (targetContainer) {
        const newStatus = targetContainer.id;

        // Remove ticket from the todo container
        const sourceContainer = droppedTicket.closest(".ticket-container");
        sourceContainer.removeChild(droppedTicket);

        // Add ticket into closest target container
        targetContainer.appendChild(droppedTicket);

        const idx = this.ticketArr.findIndex((obj) => obj.id === ticketId);

        if (idx !== -1) {
          this.ticketArr[idx].status = newStatus;
          this.updateLocalStorage();
        }
      }
    }
  }
}

new KanbanBoard();

let deleteBtn = document.querySelector(".remove-btn");
let color = false;
deleteBtn.addEventListener("click", () => {
  handleRemoveBtn();
});

let tickets = document.querySelectorAll(".ticket-cont");
function handleRemoveBtn() {
  if (!color) {
    window.alert("delete button has been activated");
    deleteBtn.style.color = "red";
    tickets.forEach((ticket) => {
      ticket.addEventListener("click", () => {
        if (color === true) {
          const removed = ticket.remove();
          localStorage.removeItem("tickets", removed);
        }
      });
    });
    color = !color;
  } else if (color) {
    deleteBtn.style.color = "inherit";
  }
}
