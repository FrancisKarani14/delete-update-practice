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
    <button class="deleteBtn" data-id="${member.id}">Delete</button>
    <button class="updateBtn" data-id="${member.id}">update</button>
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
// event delegation that listens to clicks on specific buttins
displaySection.addEventListener("click", (e)=>{
    if (e.target.classList.contains("deleteBtn")) {
       const memberID = e.target.dataset.id;
       const confirmDelete = confirm("are you sure you want to delete? deleting a member is permanent!")
       if(confirmDelete){
        deleteMember(memberID) 
       }
       
    }
})
//  the function for deleting a member

function deleteMember(memberID){
    // the fetch for delete
     
    fetch(`http://localhost:3000/members/${memberID}`,{
        method:"DELETE",
    })
    .then(()=>{
        const card = document.querySelector(`.divCard[data-id="${memberID}"]`);
        if (card) {
            card.remove();
            
        }

    })
    .catch(err => console.error("Delete error:", err));
}
// update handler
// Event delegation that listens to clicks
displaySection.addEventListener("click", (e)=>{
if(e.target.classList.contains("updateBtn")){
const memberId = e.target.dataset.id;

fetch(`http://localhost:3000/members/${memberId}`)
.then(res=>res.json())
.then(data=>{
    nameInput.value=data.name;
    contributionInput.value=data.contribution;
    updateId=memberId;
    addUpdateButton()
})
.catch(err => console.error("Fetch single member error:", err));
}
})
function addUpdateButton() {
  if (document.getElementById("confirmUpdate")) return;

  const updateBtn = document.createElement("button");
  updateBtn.id = "confirmUpdate";
  updateBtn.textContent = "Confirm Update";
  updateBtn.style.background = "#e67e22";
  updateBtn.style.color = "#fff";
  updateBtn.style.padding = "10px 16px";
  updateBtn.style.marginTop = "10px";
  updateBtn.style.border = "none";
  updateBtn.style.borderRadius = "5px";
  updateBtn.style.cursor = "pointer";

  form.appendChild(updateBtn);

  updateBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const updatedData = {
      name: nameInput.value,
      contribution: contributionInput.value
    };

    fetch(`http://localhost:3000/members/${updateId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData)
    })
      .then(res => res.json())
      .then(() => {
        fetchMembers();        
        form.reset();          
        updateBtn.remove();    
        updateId = null;       
      })
      .catch(err => console.error("Update error:", err));
  });
}
