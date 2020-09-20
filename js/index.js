
//selectors
const $select = document.querySelector(".select")
const $selectItems = document.querySelector(".options-items")


//listeners
$select.addEventListener("click", openList)
$selectItems.addEventListener("click", selectItem)

//functions

function openList(){
    $selectItems.classList.toggle('hide')
}

function selectItem(e){
    if(e.target.tagName == "LI"){
        const text = e.target.innerHTML
        $select.innerText = text
        this.classList.toggle('hide')
    }
}