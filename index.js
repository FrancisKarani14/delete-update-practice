const displaySection = document.querySelector(".display-members")
const addMemberBtn = document.querySelector("#addBtn")
const nameInput = document.querySelector("#name")
const contributionInput = document.querySelector("#contribution")
const form =document.querySelector("form")
// function to create a card
function createCard(member) {
    return `
    <div class="divCard" data-id="${member.id}">
    <h3>${member.name}</h3>
    <h4>Member Contribution KSH${member.contribution}</h4>
    <button id="deletebtn">Delete</button>
    <button id="updatebtn">update</button>
    </div>
    `
   
    
}
// createCard(member)
 // fetch data and display in the DOM.
 function fetchMembers() {
    fetch( "http://localhost:3000/members")
    .then(res=>res.json())
    .then (data =>{
        // displaySection.innerHTML="";
        data.forEach(member=>{
            
            displaySection.innerHTML+=createCard(member);
        })
    })
    .catch(err => console.error("Fetch error:", err));
 }
 fetchMembers()
//  add members on the list 
function postHandler() {
    

form.addEventListener("submit", (Event)=>{
    Event.preventDefault();
    // create a way of getting input data
    const memberData ={
        name:nameInput.value,
        contribution:contributionInput.value
    };
    
fetch("http://localhost:3000/members",{
    method:"Post",
    headers:{"content-type": "application/json"},
    body:JSON.stringify(memberData)
})
.then(res => res.json())
.then(data => {
    displaySection.innerHTML+=createCard(data);
    form.reset();
})
 .catch(err => console.error("POST error:", err));   
    
    


});
}

postHandler()
// delete handler
function handleDelete() {
    const deleteButton = document.querySelector("#deleteBtn")
deleteButton.addEventListener("click", ()=>{
    fetch
})
    
}
