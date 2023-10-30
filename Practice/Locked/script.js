// WARNING: DO NOT EDIT THE BELOW CODE OR DATA

// DUMMY DATA FOR THE COLORS
let ticketsArr = [
  {
    ticketTask: "This is task 1 (lightgreen)",
    ticketColor: "lightgreen",
    ticketID: "dGSUFjfiq",
  },
  {
    ticketTask: "This is task 2 (black)",
    ticketColor: "black",
    ticketID: "ay8dQS0o1",
  },
  {
    ticketTask: "This is task 3 (lightblue)",
    ticketColor: "lightblue",
    ticketID: "fOqBFgQtx",
  },
  {
    ticketTask: "This is task 4 (lightpink)",
    ticketColor: "lightpink",
    ticketID: "fOqBFgQtx",
  },
];

// CALLING createTicket() function for each value in ticketsArr
ticketsArr.forEach(function (ticket) {
  createTicket(ticket.ticketTask, ticket.ticketColor, ticket.ticketID);
});

// ADDING TICKET TO DOM
function createTicket(ticketTask, ticketColor, ticketID) {
  let id = ticketID || shortid();
  let ticketCont = document.createElement("div");
  ticketCont.setAttribute("class", "ticket-cont");

  ticketCont.innerHTML = `<div class="ticket-color ${ticketColor}"></div>
         <div class="ticket-id">${id}</div>
         <div class="task-area">${ticketTask}</div>
         <div class="ticket-lock">
         <button>Locked</button>
        </div>`;

  let mainCont = document.querySelector(".main-cont");
  mainCont.append(ticketCont);

  if (!ticketID) {
    ticketsArr.push({ ticketTask, ticketColor, ticketID: id });
    localStorage.setItem("tickets", JSON.stringify(ticketsArr));
  }
}


const ticketArr = document.querySelectorAll('.ticket-cont')
ticketArr.forEach((ticket)=>{
    const lockBtn = ticket.querySelector('button');
    const taskArea = ticket.querySelector('.task-area')
    lockBtn.addEventListener('click',()=>{
        if(lockBtn.innerHTML === "Locked"){
            lockBtn.innerHTML = "Unlocked"
            taskArea.setAttribute("contenteditable",true);
        }else{
            lockBtn.innerHTML = "Locked"
            taskArea.setAttribute("contenteditable",false);

        }
    })
})
