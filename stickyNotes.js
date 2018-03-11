window.onload = init;
var stickies = getStickiesList(); // First we set a variable to be equal to the stickies array object in localStorage

function init() {
  var button = document.getElementById("submitButton"); // Set variable to button
  button.onclick = getSticky; // Assign click event of button to getSticky function
  
  // Here we use Array to write data to the localStorage
  
  for (var i = 0; i < stickies.length; i += 1) { // Now we iterate through the stickies array
    var key = stickies[i];
    var value = localStorage[key];
    addStickyNoteToDOM(key, value);
  }
  
  var colorButton = document.getElementById("stickieColor");
  // colorButton.onclick = 
  
  // // We initially used this JSON function to add to the localStorage object
  // for (var i = 0; i < localStorage.length; i += 1) {
  //   var key = localStorage.key(i);
  //   // We check to ensure substring starts with "sticky" so we don't display
  //   //  localStorage information that the user didn't store as a sticky note.
  //   if (key.substring(0, 6) == "sticky") {
  //     var value = localStorage.getItem(key);
  // 
  //     // We know our keys are user generated and want to display them on the site for user.
  //     addStickyNoteToDOM(value);
  //   }
  // }
  // 
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

function addStickyNoteToDOM(key, userInput) {
  var noteList = document.getElementById("stickyNotes"); // Set variable to equal sticky note list
  var listItem = document.createElement("li"); // Set variable that creates a <li></li> element
  listItem.setAttribute("id", key); // *This sets the key as the id attribute for each sticky note (for delete functionality)
  var listItemStyle = document.createElement("span"); // Set variable that creates a <span></span> element
  listItemStyle.setAttribute("class", "sticky"); // Set a variable that assings the class="sticky" to an element
  listItemStyle.innerHTML = userInput; // Adds the values from the user's localStorage array that starts with 'sticky' to the inner HTML of an element
  listItem.appendChild(listItemStyle); // Adds the contents of the <span>/listItemStyle to the <li>/listItem
  noteList.appendChild(listItem); // Adds the contents of the <li>/listItem to the <ul>/noteList
  listItem.onclick = deleteSticky; // *This sets the key as the id attribute for each sticky note (for delete functionality)  
}

// // This getSticky function works with the object style. Below we write for array
// function getSticky() {
//   var key = "sticky_" + localStorage.length; // Not excellent way to manage keys as the # could grow disproportionatly with localStorage.length
//   var value = document.getElementById('noteToAdd').value;
//   localStorage.setItem(key, value);
//   addStickyNoteToDOM(value);
// }

function getSticky() {
  // In order to get a unique key, we make it equal to the current time in ms since 1970
  // var stickies = getStickiesList();
  var currentDate = new Date();
  var time = currentDate.getTime();
  var key = "sticky_" + time;
  var value = document.getElementById("noteToAdd").value;
  
  localStorage.setItem(key, value);
  stickies.push(key);
  localStorage.setItem("stickies", JSON.stringify(stickies));
  addStickyNoteToDOM(key, value);
}

function getStickiesList() {
  var stickies = localStorage.getItem("stickies");
  if (!stickies) {
    stickies = [];
    localStorage.setItem("stickies", JSON.stringify(stickies));
  } else {
    stickies = JSON.parse(stickies);
  }
  
  return stickies;
}

function deleteSticky(e) {
  var key = e.target.id;
  if (e.target.tagName.toLowerCase() == "span") {
    key = e.target.parentNode.id;
  }
  
  localStorage.removeItem(key);
  var sticky = getStickiesList();
  if (sticky) {
    for (var i = 0; i < sticky.length; i += 1) {
      if (key == sticky[i]) {
        sticky.splice(i, 1)
      }
    }
    
    localStorage.setItem("stickies", JSON.stringify(sticky));
    removeStickyFromDOM(key);
  }
}

function removeStickyFromDOM(k) {
  var sticky = document.getElementById(k);
  sticky.parentNode.removeChild(sticky);
}