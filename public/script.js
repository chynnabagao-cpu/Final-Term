// script.js

// Register form submission
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        fetch('/api/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('message').innerHTML = '<p style="color: green;">' + data.message + '</p>';
            this.reset();
        })
        .catch(error => {
            document.getElementById('message').innerHTML = '<p style="color: red;">Error: ' + error.message + '</p>';
        });
    });
}

// Load students list
if (document.getElementById('studentBody')) {
    loadStudents();
}

function loadStudents() {
    fetch('/api/students')
    .then(response => response.json())
    .then(students => {
        const tbody = document.getElementById('studentBody');
        tbody.innerHTML = '';
        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.student_id}</td>
                <td>${student.full_name}</td>
                <td>${student.course}</td>
                <td>${student.year_level}</td>
                <td>${student.email}</td>
                <td>
                    <a href="/edit/${student.id}">Edit</a> |
                    <a href="#" onclick="deleteStudent(${student.id})">Delete</a>
                </td>
            `;
            tbody.appendChild(row);
        });
    })
    .catch(error => console.error('Error loading students:', error));
}

// Delete student
function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        fetch(`/api/students/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            loadStudents();
        })
        .catch(error => alert('Error: ' + error.message));
    }
}

// Edit form
if (document.getElementById('editForm')) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = window.location.pathname.split('/').pop();

    fetch(`/api/students/${id}`)
    .then(response => response.json())
    .then(student => {
        document.getElementById('id').value = student.id;
        document.getElementById('student_id').value = student.student_id;
        document.getElementById('full_name').value = student.full_name;
        document.getElementById('course').value = student.course;
        document.getElementById('year_level').value = student.year_level;
        document.getElementById('email').value = student.email;
    })
    .catch(error => console.error('Error loading student:', error));

    document.getElementById('editForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        const id = data.id;
        delete data.id;

        fetch(`/api/students/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('message').innerHTML = '<p style="color: green;">' + data.message + '</p>';
        })
        .catch(error => {
            document.getElementById('message').innerHTML = '<p style="color: red;">Error: ' + error.message + '</p>';
        });
    });
}