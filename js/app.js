//selectors
const $input = document.querySelector(".app__input")
const $add = document.querySelector(".app__add")
const $list = document.querySelector(".app__todo-list")


//events
$add.addEventListener("click", makeToDo)
$list.addEventListener("click", doneRemove)
$selectItems.addEventListener("click", filterToDo)

//functions
function makeToDo(e){
    
    e.preventDefault()
    //create elements
    const div = document.createElement("div")
    const li = document.createElement("li")
    const btnDone = document.createElement("button")
    const btnRemove = document.createElement("button")

    //add classes to elements
    div.classList.add("todo")
    btnDone.classList.add("btnDone")
    btnRemove.classList.add("btnRemove")

    //add inner
    li.innerText = $input.value;
    saveToDo($input.value)
    btnDone.innerHTML = '<i class="far fa-check-circle"></i>'
    btnRemove.innerHTML = '<i class="fas fa-trash-alt"></i>'
    
    //add node 
    div.appendChild(li)
    div.appendChild(btnDone)
    div.appendChild(btnRemove)
    $list.appendChild(div)


    $input.value = ""
}

function doneRemove(e){
    const target = e.target
    const parentTarget = target.parentNode
    
    if(target.classList.contains("btnDone")){
        parentTarget.children[0].classList.toggle("done")
    }

    if(target.classList.contains("btnRemove")){
        removeToDo(parentTarget.childNodes[0].innerText)
        parentTarget.classList.add("fall")
        parentTarget.addEventListener("transitionend", () => parentTarget.remove())
    }
}



function filterToDo(e){
    const elem = e.target.dataset.select
    const todos = $list.childNodes
    
    switch(elem){
        case "all":
            todos.forEach(item => item.classList.remove("hide"))
            break;
        case "completed":
            todos.forEach(function(item){
                if(item.children[0].classList.contains("done")){
                    item.classList.remove("hide")
                }else{
                    item.classList.add("hide")
                }
            })
            break;
        case "uncompleted":{
            todos.forEach(function(item){
                if(!item.children[0].classList.contains("done")){
                    item.classList.remove("hide")
                }else{
                    item.classList.add("hide")
                }
            })
            break;
        }
    }
}

//save todo in localstorage

function saveToDo(todo){
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos))
}

//download ToDo list from localStorage

(function loadTodo(){
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = []
        return
    }

    todos = JSON.parse(localStorage.getItem("todos"))
    
    todos.forEach( item => {
        const div = document.createElement("div")
        const li = document.createElement("li")
        const btnDone = document.createElement("button")
        const btnRemove = document.createElement("button")

        //add classes to elements
        div.classList.add("todo")
        btnDone.classList.add("btnDone")
        btnRemove.classList.add("btnRemove")

        //add inner
        li.innerText = item;
        btnDone.innerHTML = '<i class="far fa-check-circle"></i>'
        btnRemove.innerHTML = '<i class="fas fa-trash-alt"></i>'
        
        //add node 
        div.appendChild(li)
        div.appendChild(btnDone)
        div.appendChild(btnRemove)
        $list.appendChild(div)
    })


})()

//remove todo

function removeToDo(todo){


    todos = JSON.parse(localStorage.getItem("todos"))

    let indexToDo = todos.indexOf(todo)

    todos.splice(indexToDo, 1)
    
    
    localStorage.setItem("todos", JSON.stringify(todos))
    
    
}

//  removeToDo("a")