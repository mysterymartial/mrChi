const searchquery = document.querySelector("#search-list input");
const toDoList = document.querySelector("#list ul");
const addListForm = document.querySelector("#add-list");
document.addEventListener("DOMContentLoaded", loadToDosFromStorage);

toDoList.addEventListener('click',(event)=>{
    if (event.target.classList.contains("delete")) {
        const liTag = event.target.parentElement;
        const activityName = liTag.querySelector(".name").textContent;
        
        toDoList.removeChild(liTag);

        deleteFromStorage(activityName);
        console.log(`Deleted: ${activityName}`);
      }
});
addListForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    const newActivity = addListForm.querySelector("input[type = 'text']").value.trim();
    if(newActivity){
        addNewActivity(newActivity);
        saveToStorage(newActivity);
        addListForm.reset();
    }else{
        window.alert('please enter a to do item');
    }
});

searchquery.addEventListener('input', (event)=>{
    const searchedTerm = event.target.value.toLowerCase();
    const items = toDoList.getElementsByTagName("li");
    Array.from(items).forEach((item) =>{
        const itemName = item.querySelector(".name").textContent.toLowerCase();
        if(itemName.includes(searchedTerm)){
            item.style.display = 'block';
        }else{
            item.style.display = 'none';
        }

    });
});

function addNewActivity(activity){
    const listItem = document.createElement("li");
    const activitySpan = document.createElement("span");
    activitySpan.textContent = activity;
    activitySpan.className = "name";

    const deleteSpan = document.createElement("span");
    deleteSpan.textContent = "delete";
    deleteSpan.className = "delete";

    listItem.appendChild(activitySpan);
    listItem.appendChild(deleteSpan);
    toDoList.prepend(listItem);
}
function saveToStorage(activity){
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(activity);
    localStorage.setItem("todos", JSON.stringify(todos));

}


function loadToDosFromStorage(){
    let toDos = JSON.parse(localStorage.getItem("toDos")) || [];
    toDos.forEach(addNewActivity);
}
function deleteFromStorage(activity){
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todos.filter((item) => item !== activity);
    localStorage.setItem("todos", JSON.stringify(todos))
}