let container = document.getElementById("container");

//initial elements
let elements = [
  {
    id: "4c842b55-e690-49a8-ae4a-0e811409bab9",
    type: "input",
    label: "Label",
    placeholder: "Sample Placeholder",
  },
  {
    id: "e8728827-197b-48df-9cd1-b43960254fdd",
    type: "textarea",
    label: "Text Area",
    placeholder: "Sample Placeholder",
  },
  {
    id: "4acb4219-2a2b-4107-8bac-92f21124991a",
    type: "select",
    label: "Select",
    placeholder: "Sample Placeholder",
  },
];

// adding event Listener to side bar buttons
let addButtons = document.querySelectorAll(".addButtons");
addButtons.forEach((ele) => {
  ele.addEventListener("click", (e) =>
    addElement(e.target.getAttribute("data-name"))
  );
});

// Adding Element as per event Buttons
function addElement(name) {
  //  Setting the base Div
  let div = document.createElement("div");
  div.className = "dragged";
  div.draggable = true;
  div.id = crypto.randomUUID();
  // setting base div event Listeners
  div.addEventListener("dragstart", () => {
    div.classList.add("dragging");
  });
  div.addEventListener("dragend", () => {
    div.classList.remove("dragging");
  });
  //setting the label and delete buttons
  let labelDiv = document.createElement("div");
  labelDiv.className = "label-box";

  // 1. setting the label
  let label = document.createElement("label");
  label.contentEditable = true;
  label.textContent = setLable(name);

  // 2. setting the delete button
  let icon = document.createElement("i");
  icon.className = "fa-solid fa-trash";
  icon.addEventListener("click", (e) => {
    deleteNode(e.target);
  });

  // 3. adding lable-box to div
  labelDiv.appendChild(label);
  labelDiv.appendChild(icon);
  div.appendChild(labelDiv);

  // creating new element
  let newElement = document.createElement(name);
  if (name !== "select") {
    newElement.placeholder = "Sample Placeholder";
  }

  //if it is select , adding options
  if (name === "select") {
    const div2 = document.createElement("div");
    div2.className = "custom-select";

    const opt1 = document.createElement("option");
    opt1.innerText = "Option 1";
    const opt2 = document.createElement("option");
    opt2.innerText = "Option 2";
    newElement.appendChild(opt1);
    newElement.appendChild(opt2);
    div2.appendChild(newElement);
    div.appendChild(div2);
  } else {
    div.appendChild(newElement);
  }

  //adding newly created element to element list
  container.appendChild(div);
  let newObject = {
    id: div.id,
    type: name,
    label: setLable(name),
    [name !== "select" ? "placeholder" : "options"]:
      name !== "select"
        ? "Sample placeholder"
        : ["Option1", "Option2", "Option3"],
  };
  elements.push(newObject);
}

//setting the lable of Element
function setLable(name) {
  if (name === "input") {
    return "Sample Label";
  } else if (name === "select") {
    return "Select";
  } else {
    return "Text Area";
  }
}

//delete a particular element
function deleteNode(button) {
  if (confirm("Do you want to delete this element?") == true) {
    button.parentNode.parentNode.remove();
  } else {
    return;
  }
}

let draggable = document.querySelectorAll(".dragged");
draggable.forEach((item) => {
  //adding class on drag Start
  item.addEventListener("dragstart", () => {
    item.classList.add("dragging");
  });
  //removing class on drag end
  item.addEventListener("dragend", () => {
    item.classList.remove("dragging");
  });
});

function findElement(e) {
  const draggedItem = document.querySelector(".dragging");
  //getting all elements except current drag element and making array of elements
  const siblings = [...container.querySelectorAll(".dragged:not(.dragging)")];

  //finding the element after which the dragging item will be placed
  let nextSibling = siblings.find((sibling) => {
    return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
  });
  container.insertBefore(draggedItem, nextSibling);
}

container.addEventListener("dragover", findElement);

//implementing save form 
const saveButton = document.querySelector("#save");
saveButton.addEventListener("click", () => {
  console.log(JSON.stringify(elements));
  alert("Hurray Your Form is saved !");
});
