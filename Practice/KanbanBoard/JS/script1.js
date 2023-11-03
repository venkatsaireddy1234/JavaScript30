//Add Button
const addBtn = document.querySelector(".add-btn");
const modalCont = document.querySelector(".modal-overlay");
let modal = true;
addBtn.addEventListener("click", () => {
  handleAddButton();
});
const handleAddButton = () => {
  toggleModal();
};

const toggleModal = () => {
  modalCont.style.display = modal ? "block" : "none";
  modal = !modal;
};

//close Button

const closeBtn = document.querySelector(".fa-times-circle");
closeBtn.addEventListener("click", () => {
  closeModal();
});
const closeModal = () => {
  toggleModal();
};

//Adding Ticket
const addTicket = document.querySelector(".add-card");
const ticketContent = document.querySelector(".modal-textarea");
const todoContainer = document.getElementById("todo");
let colorPriority = "red";
let ticketStatus = "todo";
let ticketArray = [];
const colors = document.querySelectorAll(".priority-color");
for (let color of colors) {
  color.addEventListener("click", () => {
    handleGetColorName(color);
  });
}
addTicket.addEventListener("click", () => {
  handleAddTicket();
});
const handleAddTicket = () => {
  let ticketText = ticketContent.value.trim();
  if (ticketText.length) {
    createTicket(ticketText);
  }
};

const createTicket = (ticketText) => {
  const ticketId = new ShortUniqueId().randomUUID();
  const ticketElem = createTicketEle(ticketId, ticketText, colorPriority);
  todoContainer.appendChild(ticketElem);
  toggleModal();
  clearTextArea();
  ticketArray.push({
    id: ticketId,
    ticketCont: ticketText,
    status: ticketStatus,
    color: colorPriority,
  });
  updateLocalStorage();
  handleEditTicket(ticketElem, ticketId);
};
function createTicketEle(id, text, color) {
  let ticket = document.createElement("div");
  ticket.className = "ticket-cont";
  ticket.innerHTML = `
    <div class="ticket-color ${color ? color : ""}"></div>
    <div class="ticket-id">${id}</div>
    <div class="ticket-task">${text}</div>
    <button class="lock-unlock">
      <i class="fa-solid fa-lock">Locked</i>
    </button>
    `;
  ticket.draggable = true;
  ticket.id = id;
  return ticket;
}
const updateLocalStorage = () => {
  let stringifiedTicketData = JSON.stringify(ticketArray);
  localStorage.setItem("tickets", stringifiedTicketData);
};

function clearTextArea() {
  ticketContent.value = "";
}
const handleGetColorName = (color) => {
  deActivateColorStyle(colors);
  activateColorStyle(color);
  colorPriority = color.classList[1];
};
const deActivateColorStyle = (colors) => {
  for (let color of colors) {
    color.classList.remove("active");
  }
};
const activateColorStyle = (color) => {
  color.classList.add("active");
};

//Loading Tickets from local Storage

const inProgress = document.querySelector("#inProgress");
const completed = document.querySelector("#completed");
const appendTicketElem = (id, text, color, status) => {
  const ticketCont = createTicketEle(id, text, color);
  if (status === "todo") {
    todoContainer.appendChild(ticketCont);
  } else if (status === "inProgress") {
    inProgress.appendChild(ticketCont);
  } else {
    completed.appendChild(ticketCont);
  }
  handleEditTicket(ticketCont, id);
};
const loadTicketsFromLocalStorage = () => {
  const storedTickets = localStorage.getItem("tickets");
  if (storedTickets) {
    let ticketArray = JSON.parse(storedTickets);
    if (ticketArray.length) {
      for (let ticket of ticketArray) {
        appendTicketElem(
          ticket.id,
          ticket.ticketCont,
          ticket.color,
          ticket.status
        );
      }
    }
  } else {
    return;
  }
};
loadTicketsFromLocalStorage();

//Delete the tickets
let deleteBtn = document.querySelector(".remove-btn");
let color = false;

// Define an array to store references to ticket elements
let tickets = document.querySelectorAll(".ticket-cont");

deleteBtn.addEventListener("click", () => {
  handleRemoveBtn();
});

function handleRemoveBtn() {
  if (!color) {
    window.alert("Delete button has been activated");
    deleteBtn.style.color = "red";

    // Add event listeners to each ticket for removal
    tickets.forEach((ticket) => {
      ticket.addEventListener("click", () => {
        if (color === true) {
          // Get the ticket ID and remove the ticket element
          const ticketId = ticket.id;
          ticket.remove();

          // Remove the corresponding entry from localStorage
          removeTicketFromLocalStorage(ticketId);
        }
      });
    });

    color = true;
  } else {
    color = false;
    deleteBtn.style.color = "inherit";

  }
}

function removeTicketFromLocalStorage(ticketId) {
  // Get the stored tickets from localStorage
  const storedTickets = localStorage.getItem("tickets");
  if (storedTickets) {
    const ticketArray = JSON.parse(storedTickets);

    // Find the index of the ticket with the matching ID
    const idx = ticketArray.findIndex((ticket) => ticket.id === ticketId);
    console.log(idx);
    if (idx !== -1) {
      // Remove the ticket entry from the array
      ticketArray.splice(idx, 1);

      // Update localStorage with the modified ticket array
      localStorage.setItem("tickets", JSON.stringify(ticketArray));
    }
  }
}

//Filter colors
const colour = document.querySelectorAll(".color");
colour.forEach((clr) => {
  clr.addEventListener("click", () => {
    let selectedClr = clr.classList[1];
    const tickets = document.querySelectorAll(".ticket-color");

    tickets.forEach((ticket) => {
      let currentTicketColor = ticket.classList[1];
      if (selectedClr === "all") {
        ticket.parentElement.style.display = "block";
      } else {
        let displayStyle =
          currentTicketColor === selectedClr ? "block" : "none";
        ticket.parentElement.style.display = displayStyle;
      }
    });
  });
});

//Edit the Ticket
function handleEditTicket(ticketElem, ticketId) {
  const unLockSymbol = ticketElem.querySelector(".lock-unlock i");
  const ticketTxt = ticketElem.querySelector(".ticket-task");
  let toggle = true;

  unLockSymbol.addEventListener("click", () => {
    if (toggle) {
      unLockSymbol.innerText = "Unlocked";
      ticketTxt.contentEditable = true;
      ticketTxt.focus();

      toggle = !toggle;
    } else {
      unLockSymbol.innerText = "Locked";
      ticketTxt.contentEditable = false;

      const idx = ticketArray.findIndex((obj) => obj.id === ticketId);
      ticketArray[idx].ticketCont = ticketTxt.innerText;
      updateLocalStorage();
      toggle = !toggle;
    }
  });
}

//Drag and Drop
const mainCont = document.querySelector('.main-cont');

mainCont.addEventListener('dragstart', handleTicketDragStart);
mainCont.addEventListener('dragend', handleTicketDragEnd);
mainCont.addEventListener('dragover', handleTicketDragOver);
mainCont.addEventListener('drop', handleDrop);

function handleTicketDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
  event.target.classList.add("dragging");
}

function handleTicketDragEnd(event) {
  event.target.classList.remove("dragging");
}

function handleTicketDragOver(event) {
  event.preventDefault();
}

function handleDrop(event) {
  event.preventDefault();

  const ticketId = event.dataTransfer.getData("text/plain");
  const droppedTicket = document.getElementById(ticketId);

  if (droppedTicket) {
    const targetContainer = event.target.closest(".ticket-container");

    if (targetContainer) {
      const newStatus = targetContainer.id;

      // Remove ticket from the source container
      const sourceContainer = droppedTicket.closest(".ticket-container");
      sourceContainer.removeChild(droppedTicket);

      // Add the ticket to the target container
      targetContainer.appendChild(droppedTicket);

      // Update the ticket's status in your data
      const idx = ticketArray.findIndex((obj) => obj.id === ticketId);

      if (idx !== -1) {
        ticketArray[idx].status = newStatus;
        updateLocalStorage();
      }
    }
  }
}
