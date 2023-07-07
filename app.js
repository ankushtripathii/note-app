const addBtn = document.querySelector("#addbtn");
const mainContainer = document.querySelector(".container");

addBtn.addEventListener("click", function () {
  addNote();
});
const saveNotes = () => {
  const notes = document.querySelectorAll(".note textarea");

  const data = [];
  notes.forEach((note) => {
    data.push(note.value);
  });

  if (data.length === 0) {
    localStorage.removeItem("notes");
  } else {
    localStorage.setItem("notes", JSON.stringify(data));
  }
};
const addNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
        <div class="tools">
          <i class="save fa-solid fa-floppy-disk"></i>
          <i class="trash fa-solid fa-trash"></i>
        </div>
        <textarea>${text}</textarea>
   `;
  mainContainer.appendChild(note);
  saveNotes();
  note.querySelector(".trash").addEventListener("click", function () {
    note.remove();
    saveNotes();
  });
  note.querySelector(".save").addEventListener("click", function () {
    saveNotes();
  });

  note.querySelector("textarea").addEventListener("focusout", saveNotes);
};

(function () {
  const storgaeNotes = JSON.parse(localStorage.getItem("notes"));

  if (storgaeNotes === null) {
    addNote();
  } else {
    storgaeNotes.forEach((storgaeNotes) => {
      addNote(storgaeNotes);
    });
  }
})();
