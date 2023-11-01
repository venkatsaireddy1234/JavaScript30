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
const todoContainer = document.querySelector("#todo");
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
  console.log("hi");
  let ticketText = ticketContent.value.trim();
  const ticketId = new ShortUniqueId().randomUUID();
  if (ticketText.length) {
    const ticketElem = createTicket(ticketId, ticketText, colorPriority);
    toggleModal();
    ticketContent.value = "";
    ticketArray.push({
      id: ticketId,
      ticketCont: ticketText,
      status: ticketStatus,
      color: colorPriority,
    });
    todoContainer.appendChild(ticketElem);
    updateLocalStorage();
  }
};
const createTicket = (id, text, color) => {
  let ticket = document.createElement("div");
  ticket.className = "ticket-cont";
  ticket.innerHTML = `
    <div class="ticket-color ${color ? color : ""}"></div>
    <div class="ticket-id">#${id}</div>
    <div class="ticket-task">${text}</div>
    <div class="lock-unlock">
        <i class="fa-solid fa-lock"></i>
    </div>
    `;
  ticket.draggable = true;
  ticket.id = id;
  return ticket;
};
const updateLocalStorage = () => {
  let stringifiedTicketData = JSON.stringify(ticketArray);
  localStorage.setItem("tickets", stringifiedTicketData);
};
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
  const ticketCont = createTicket(id, color, color);
  if (status === "todo") {
    todoContainer.appendChild(ticketCont);
  } else if (status === "inProgress") {
    inProgress.appendChild(ticketCont);
  } else {
    completed.appendChild(ticketCont);
  }
};
const loadTicketsFromLocalStorage = () => {
  const storedTickets = localStorage.getItem("tickets");
  if (storedTickets.length) {
    let ticketArr = JSON.parse(storedTickets);
    for (let ticket of ticketArr) {
      appendTicketElem(ticket.id, ticket.text, ticket.color, ticket.status);
    }
  }
};
loadTicketsFromLocalStorage();

//Delete the tickets
const deleteBtn = document.querySelector(".remove-btn");
let color = false;
deleteBtn.addEventListener("click", () => {
  handleDeleteButton();
});
const handleDeleteButton = () => {
  if (color) {
    deleteBtn.style.color = "inherit";
    color = !color;
  } else {
    window.alert("Delete Button has been activated");
    deleteBtn.style.color = "red";
    const tickets = document.querySelectorAll(".ticket-cont");
    tickets.forEach((ticket) => {
      ticket.addEventListener("click", () => {
        if (color) {
          const removedTicket = ticket.remove();
          localStorage.removeItem(removedTicket);
        }
      });
    });
    color = !color;
  }
};
