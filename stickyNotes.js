window.onload = init;

function init() {
  for (var i = 0; i < localStorage.length; i += 1) {
    var key = localStorage.key(i);
    // We check to ensure substring starts with "sticky" so we don't display
    //  localStorage information that the user didn't store as a sticky note.
    if (key.substring(0, 6) == "sticky") {
      var value = localStorage.getItem(key);
      
      // We know our keys are user generated and want to display them on the site for user.
      addStickyNoteToDOM(value);
    }
  }
  
  // More init() functionality should go here
}
// // Just me practicing writing this function so I can do it by memory
// function addStickyNoteToDOM1(note) {
//   var userInput = document.getElementById("stickyNotes"); // Set variable for user input
//   var stickyNotes = document.createElement("li"); // Variable for creating a new <li></li> element
//   var span = document.createElement("span"); // Variable for creating new sticky note <span>s
//   span.setAttribute("class", "sticky"); // Setting spans to have the 'sticky' class
//   span.innerHTML = note; // Adding user generated content from init() to our new 'sticky' span element
//   stickyNotes.appendChild(span); // Making our <li></li> elements children of the <span> 
//   userInput.appendChild(stickyNotes); // Making the <li></li> part of the sticky list
// }
// 
// function addStickyNoteToDOM2(note) {
//   var theList = document.getElementById("stickyNotes");
//   var item = document.createElement("li");
//   var noteStyle = document.createElement("span");
//   noteStyle.innerHTML = note;
//   item.appendChild(noteStyle);
//   theList.appendChild(item);
// }

function addStickyNoteToDOM(userInput) {
  var noteList = document.getElementById("stickyNotes"); // Set variable to equal sticky note list
  var listItem = document.createElement("li"); // Set variable that creates a <li></li> element
  var listItemStyle = document.createElement("span"); // Set variable that creates a <span></span> element
  listItemStyle.setAttribute("class", "sticky"); // Set a variable that assings the class="sticky" to an element
  listItemStyle.innerHTML = userInput; // Adds the values from the user's localStorage array that starts with 'sticky' to the inner HTML of an element
  listItem.appendChild(listItemStyle); // Adds the contents of the <span>/listItemStyle to the <li>/listItem
  noteList.appendChild(listItem); // Adds the contents of the <li>/listItem to the <ul>/noteList
}