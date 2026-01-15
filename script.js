let currentPhoto = null;

// The main function to switch screens
function showView(viewId) {
    // Hide all sections
    const allViews = document.querySelectorAll('.view');
    allViews.forEach(view => {
        view.classList.add('hidden');
    });

    // Show the one requested
    const targetView = document.getElementById(viewId);
    if (targetView) {
        targetView.classList.remove('hidden');
    } else {
        console.error("View ID not found: " + viewId);
    }
}

// Handle Image Selection
document.getElementById('imageUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            currentPhoto = reader.result;
            const preview = document.getElementById('imagePreview');
            preview.innerHTML = `<img src="${currentPhoto}" alt="Profile">`;
        };
        reader.readAsDataURL(file);
    }
});

// Add Employee Function
function addEmployee() {
    const nameInput = document.getElementById('empName');
    const emailInput = document.getElementById('empEmail');
    const phoneInput = document.getElementById('empNumber');

    // 1. Validation
    if (!nameInput.value || !emailInput.value || !phoneInput.value || !currentPhoto) {
        alert("Fill all the details");
        return;
    }

    // 2. Auto-Uppercase Name
    const upperName = nameInput.value.toUpperCase();

    // 3. Create Card
    const list = document.getElementById('employee-list');
    const card = document.createElement('div');
    card.className = 'employee-card';
    card.innerHTML = `
        <img src="${currentPhoto}" class="card-img">
        <div class="card-info">
            <h3>${upperName}</h3>
            <p><strong>Email:</strong> ${emailInput.value}</p>
            <p><strong>Phone:</strong> ${phoneInput.value}</p>
        </div>
        <button class="del-btn" onclick="this.parentElement.remove()">Delete</button>
    `;

    list.appendChild(card);
    
    // 4. Reset and Switch View
    resetForm();
    showView('dashboard-view');
}

function resetForm() {
    document.getElementById('empName').value = '';
    document.getElementById('empEmail').value = '';
    document.getElementById('empNumber').value = '';
    document.getElementById('imageUpload').value = '';
    document.getElementById('imagePreview').innerHTML = `<span id="preview-text">UPLOAD IMAGE</span>`;
    currentPhoto = null;
}