let addNotes = document.getElementById("addNotes");
let editNotes = document.getElementById("editNotes");
let cancelNotes = document.getElementById("cancelNotes");
let localKey = "NOTES_KEY_NUMBER";
let editIndex = null;

showNotes();
addNotes.addEventListener("click", addNote);
editNotes.addEventListener("click", editNote);
cancelNotes.addEventListener("click", reset);

function addNote() {
  let inputValue = document.getElementById("inputValue").value;
  if (!inputValue?.trim()?.length) return;
  let arrayOfNotes = localGetItem(localKey) || [];
  arrayOfNotes.push(inputValue);
  localSetItem(localKey, arrayOfNotes);
  document.getElementById("inputValue").value = "";
  showNotes();
}

function editNote() {
  let inputEditValue = document.getElementById("inputEditValue");
  if (!(editIndex !== null && inputEditValue.value?.trim()?.length)) return;
  let arrayOfNotes = localGetItem(localKey);
  arrayOfNotes[editIndex] = inputEditValue.value;
  localSetItem(localKey, arrayOfNotes);
  editIndex = null;
  reset();
}

function showNotes() {
  let arrayOfNotes = localGetItem(localKey) || [];
  let html = "";

  arrayOfNotes?.length &&
    arrayOfNotes?.forEach(function (element, index) {
      html += `
            <div class="noteCard my-2 mx-3 col-12 card" style="width: 20rem;">
                    <div class="card-body bg-light">
                        <h4 class="card-title">Note ${index + 1}</h4>
                        <p class="card-text"> ${element}</p>
                        <button id="${index}"onclick="editButton(this.id)" class="btn btn-primary btn-dark">Edit</button>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary btn-dark">Delete</button>
                    </div>
                </div>`;
    });
  let notesElm = document.getElementById("notes");
  if (arrayOfNotes?.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Add a Note.`;
  }
}

function deleteNote(index) {
  let arrayOfNotes = localGetItem(localKey);
  arrayOfNotes.splice(index, 1);
  localSetItem(localKey, arrayOfNotes);
  editIndex = null;
  reset();
}

function editButton(index) {
  let arrayOfNotes = localGetItem(localKey);
  let value = arrayOfNotes[index];
  document.getElementById("inputEditValue").value = value;
  document.getElementById("notesView").className = "d-none";
  document.getElementById("editView").className = "mt-4 d-block";
  editIndex = index;
}

function reset() {
  document.getElementById("notesView").className = "d-block";
  document.getElementById("editView").className = "mt-4 d-none";
  editIndex = null;
  showNotes();
}

function localSetItem(key, item) {
  localStorage.setItem(key, JSON.stringify(item));
}

function localGetItem(key) {
  return JSON.parse(localStorage.getItem(key));
}
