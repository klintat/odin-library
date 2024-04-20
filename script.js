const myLibrary = [];

function Book(title, author, number, read){
    this.title = title;
    this.author = author;
    this.pages = number;
    this.read = read;
}

function addBookToLibrary() {
    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");
    const pagesInput = document.getElementById("pages");
    const readInput = document.getElementById("read-yes");

    const addBook = new Book(
        titleInput.value, 
        authorInput.value, 
        pagesInput.value,
        readInput.checked
    );

    myLibrary.push(addBook);
    bookDisplay();
}

function bookDisplay(){
    const bookLayout = document.querySelector("#book-layout");
    bookLayout.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
        const newDiv = document.createElement("div");

        newDiv.classList.add("card");
        newDiv.innerHTML = `
            <div class="card-info">
                <h3>${myLibrary[i].title}</h3>
                <p id="author-card">${myLibrary[i].author}</p>
                <p>${myLibrary[i].pages} pages</p>
                <p id="book-status">Book status: ${myLibrary[i].read ? 'read' : 'not read'}</p>
            </div>
            <div class="btn-cards">
                <button type="button" class="btn-status" onclick=onStatus(${i})>Status</button>
                <button type="button" class="btn-delete" onclick="onDelete(${i})">Delete</button>
            </div>
        `;

        bookLayout.appendChild(newDiv);
    }
}

function onDelete(index) {
    myLibrary.splice(index, 1);
    bookDisplay();
}

function onStatus(index) {
    myLibrary[index].read = !myLibrary[index].read;
    bookDisplay();
}

window.onload = function(){ 
    let modal = document.getElementById("myModal");
    let btnOpen = document.getElementById("open");
    let btnClose = document.getElementsByClassName("close")[0];
    let btnAdd = document.getElementById("btn-add");

    btnOpen.onclick = function() {
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("pages").value = "";
        document.getElementById("read-yes").checked = false;
        document.getElementById("read-no").checked = false;

        modal.style.display = "block";
    }
    
    btnClose.onclick = function() {
        modal.style.display = "none";
    }

    btnAdd.onclick = function() {
        addBookToLibrary();
        modal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
};
