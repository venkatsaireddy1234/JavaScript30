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
         <div class="ticket-id">#${id}</div>
         <div class="task-area">${ticketTask}</div>
         <div class="ticket-lock">
           <i class="fa-solid fa-lock"></i>
        </div>`;

  let mainCont = document.querySelector(".main-cont");
  mainCont.append(ticketCont);

  if (!ticketID) {
    ticketsArr.push({ ticketTask, ticketColor, ticketID: id });
    localStorage.setItem("tickets", JSON.stringify(ticketsArr));
  }

  // console.log(ticketsArr);
}
// Get a reference to the color elements
const toolboxColors = document.querySelectorAll(".color");
toolboxColors.forEach((toolboxColor) => {
  toolboxColor.addEventListener("click", () => {
    let selectedToolBoxColor = toolboxColor.classList[0];

    //use ticketsArr array to filter tickets
    let filteredTickets = ticketsArr.filter((ticket) => {
      return selectedToolBoxColor == ticket.ticketColor;
    });

    let allTickets = document.querySelectorAll(".ticket-cont");

    // remove all tickets
    allTickets.forEach((ticket) => {
      ticket.remove();
    });

    // recreate tickets within filtered array
    filteredTickets.forEach((filteredTicket) => {
      createTicket(
        filteredTicket.ticketTask,
        filteredTicket.ticketColor,
        filteredTicket.ticketID
      );
    });
  });
});
const toolboxContainer = document.querySelectorAll(".toolbox-priority-cont .color");
toolboxContainer.forEach((elem)=>{
    elem.addEventListener("dblclick", (e)=>{
        const mainCont = document.querySelector(".main-cont");
        // mainCont.querySelectorAll(".ticket-cont").forEach((elem)=>{
        //     elem.remove();
        // });
        mainCont.innerHTML = "";
        ticketsArr.forEach(function (ticket) {
            createTicket(ticket.ticketTask, ticket.ticketColor, ticket.ticketID);
          });
     })
 })