const studentList = document.getElementById('studentList');
const studentNameInput = document.getElementById('studentName');
const addStudentButton = document.getElementById('addStudent');

// Array para armazenar os alunos
let students = [];

// Função para adicionar aluno
addStudentButton.addEventListener('click', () => {
    const name = studentNameInput.value.trim();
    if (name) {
        const student = { name: name, present: false };
        students.push(student);
        studentNameInput.value = '';
        updateStudentList();
    } else {
        alert('Por favor, insira o nome do aluno.');
    }
});

// Função para atualizar a lista de alunos
function updateStudentList() {
    studentList.innerHTML = '';
    students.forEach((student, index) => {
        const li = document.createElement('li');
        li.textContent = student.name;
        li.classList.add(student.present ? 'present' : 'absent');

        // Botão para marcar presença
        const togglePresenceButton = document.createElement('button');
        togglePresenceButton.textContent = student.present ? 'Marcar Ausente' : 'Marcar Presente';
        togglePresenceButton.addEventListener('click', () => {
            student.present = !student.present;
            updateStudentList();
        });

        // Botão para editar o nome do aluno
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', () => {
            const newName = prompt('Digite o novo nome do aluno:', student.name);
            if (newName && newName.trim()) {
                student.name = newName.trim();
                updateStudentList();
            } else {
                alert('Nome inválido. Tente novamente.');
            }
        });

        li.appendChild(togglePresenceButton);
        li.appendChild(editButton); // Adiciona o botão de editar
        studentList.appendChild(li);
    });
}

// Função para salvar dados em JSON
document.getElementById('saveData').addEventListener('click', () => {
    const dataStr = JSON.stringify(students, null, 2); // Converte o array de alunos em uma string JSON
    const blob = new Blob([dataStr], { type: 'application/json' }); // Cria um objeto Blob
    const url = URL.createObjectURL(blob); // Cria uma URL para o Blob

    const a = document.createElement('a'); // Cria um elemento âncora
    a.href = url; // Define o href para a URL do Blob
    a.download = 'frequencia_alunos.json'; // Define o nome do arquivo que será salvo
    document.body.appendChild(a); // Adiciona o âncora ao corpo do documento
    a.click(); // Simula um clique no âncora para iniciar o download
    document.body.removeChild(a); // Remove o âncora após o download
});
