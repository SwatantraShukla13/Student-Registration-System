const studentForm = document.getElementById("StudentForm");
// console.log(studentForm);
const studentDataTable = document.getElementById("student-data");
studentForm.addEventListener("submit", addstudentdetail);

function addstudentdetail(e) {
    e.preventDefault(); 
    
    // Get form values from form 
    const name = document.getElementById("name").value;
    const studentId = document.getElementById("id").value;
    const email = document.getElementById("email").value;
    const contact = document.getElementById("contact").value;
    
    // Create object for student data
    const student = { name, studentId, email, contact };
    
    // Add student data to table
    addStudentRow(name, studentId, email, contact);
    
    // Save student data to localStorage
    saveToLocalStorage(student);
    
       
    studentForm.reset();
    }

function addStudentRow(name, studentId, email, contact) {
    const newRow = document.createElement("tr");
    
    newRow.innerHTML = `
        <td>${name}</td>
        <td>${studentId}</td>
        <td>${email}</td>
        <td>${contact}</td>
        <td><button class="editButton">Edit</button></td>
        <td><button class="deleteButton">Delete</button></td>
        `;
    
    // Add new row to the table body
    studentDataTable.appendChild(newRow);
}
function saveToLocalStorage(student) {
    const storedData = JSON.parse(localStorage.getItem("students")) || [];
    storedData.push(student);
    localStorage.setItem("students", JSON.stringify(storedData));
}
    
studentDataTable.addEventListener("click", dataUpdateDelete);
    function dataUpdateDelete(e) {
        if (e.target.classList.contains("deleteButton")) {
            // Delete the student row
            const row = e.target.closest("tr");
            const studentId = row.children[1].textContent;
            deleteFromLocalStorage(studentId);
            row.remove();
        } else if (e.target.classList.contains("editButton")) {
            // Edit functionality
            const row = e.target.closest("tr");
            const name = row.children[0].textContent;
            const studentId = row.children[1].textContent;
            const email = row.children[2].textContent;
            const contact = row.children[3].textContent;
    
           
            document.getElementById("name").value = name;
            document.getElementById("id").value = studentId;
            document.getElementById("email").value = email;
            document.getElementById("contact").value = contact;
    
            
            row.remove(); 
        }
    }

    function deleteFromLocalStorage(studentId) {
        let storedData = JSON.parse(localStorage.getItem("students")) || [];
        storedData = storedData.filter(student => student.studentId !== studentId);
        localStorage.setItem("students", JSON.stringify(storedData));
    }
    window.addEventListener("load", function() {
        const storedData = JSON.parse(localStorage.getItem("students"));
        if (storedData && storedData.length > 0) {
            storedData.forEach(student => {
                addStudentRow(student.name, student.studentId, student.email, student.contact);
            });
        }
    });