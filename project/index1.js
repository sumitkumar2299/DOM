function loadtodos() {
    // this function will load the todos from browser
    const todos = JSON.parse(localStorage.getItem("todos")) || {"todolist":[]};
    console.log(todos);
    return todos;
 
 }
 
 
 function AddToDoToLocalStorage(todo){
     const todos = loadtodos();
     todos.todolist.push(todo);
     localStorage.setItem("todos",JSON.stringify(todos));
     
 }

 function executefilteraction(event) {
    const todolist = document.getElementById("todolist");
    const element = event.target;
    const value = element.getAttribute("data-filter");
    const todos = loadtodos();

    todolist.innerHTML= " ";
    if(value === "all") {
        todos.todolist.forEach(todo => {
            appendtodoinhtml(todo);
        });
    

    }else if(value === "pending"){
        todos.todolist.forEach(todo => {
            if(!todo.isCompleted)
            appendtodoinhtml(todo);
        });

    }else if (value === "completed") {
        todos.todolist.forEach(todo => {
            if (todo.isCompleted) appendtodoinhtml(todo);
        });
    }
}
 
 function appendtodoinhtml(todo){
     const todolist = document.getElementById("todolist");
     const todoitem = document.createElement("li");

     const textdiv = document.createElement('div');

     textdiv.textContent = todo.text;
     todoitem.classList.add("todoitem");

     const wrapper = document.createElement("div");
     wrapper.classList.add("todobuttons");
 
     const editbutton = document.createElement("button");
     editbutton.textContent = "Edit";
     editbutton.classList.add("editbutton");
     
 
     const deletebutton = document.createElement("button");
     deletebutton.textContent = "Delete";
     deletebutton.classList.add("deletebutton");
 
     const completebutton = document.createElement("button");
     completebutton.textContent = "Complete";
     completebutton.classList.add("completebutton");
 
     wrapper.appendChild(editbutton);
     wrapper.appendChild(deletebutton);
     wrapper.appendChild(completebutton);

     todoitem.appendChild(textdiv);

     todoitem.appendChild(wrapper);
     
     todolist.appendChild(todoitem);
 }
 
 
 document.addEventListener("DOMContentLoaded",()=>{
     const todoinput = document.getElementById("todoinput");
 
     const submitbutton = document.getElementById("addtodo");
 
     const todolist = document.getElementById("todolist");


     const filterBtns = document.getElementsByClassName("filter-btn");
    
     console.log(filterBtns);

     for(btn of filterBtns) {
        btn.addEventListener("click",executefilteraction());
     }
 
 
     submitbutton.addEventListener("click",(event) =>{
        event.preventDefault();
         const todotext = todoinput.value;
         if(todotext === ""){
             alert("please write something for the todo");
         } else {
             const newtodo = {
                text : todotext,
                isCompleted: false
             };
             AddToDoToLocalStorage(newtodo);
             appendtodoinhtml(newtodo);
             todoinput.value = "";
         }
        
     })
 
     todoinput.addEventListener("change",(event)=>{
         // this callback method is fired everytime when there is a change in input tag 
        const todotext = event.target.value;
        event.target.value = todotext.trim();
     })
 
     const todos = loadtodos();
     
     todos.todolist.forEach(todo => {
         appendtodoinhtml(todo);
 
 
     })
 });