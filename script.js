// Utility function to add elements
function addElement(parentId, htmlTemplate) {
    const parent = document.getElementById(parentId);
    if (!parent) {
        console.error(`Parent element with ID "${parentId}" not found.`);
        return;
    }
    const div = document.createElement('div');
    div.innerHTML = htmlTemplate;
    parent.appendChild(div);
    saveresume();
}

// Utility function to remove elements
function removeElements(event, parentSelector) {
    const allInputCheckboxes = event.target.parentElement.querySelectorAll(parentSelector);
    if (allInputCheckboxes.length === 0) {
        alert("No fields are present to be deleted!");
        return;
    }

    let val = 0;
    allInputCheckboxes.forEach(element => {
        if (element.checked) {
            val = 1;
            element.closest('div').remove();
        }
    });

    if (val === 0) {
        alert("Please select the checkboxes to delete the required field!");
    }
    saveresume();
}

// Add Education
function addedu() {
    addElement("education", `
        <div class="edublock">
            <span><input type="checkbox" class="input-checkbox"></span>
            <span class="education-head" contenteditable="true">YOUR DEGREE</span>
            <div>
                <span contenteditable="true">Institute name</span> - 
                <span contenteditable="true">Passing Year</span>
            </div>
        </div>
    `);
}

// Remove Education
function remedu(event) {
    removeElements(event, ".edublock .input-checkbox");
}

// Add Skill
function addskill() {
    addElement("skills", `
        <div class="skill">
            <span><input type="checkbox" class="input-checkbox"></span>
            <span><i class="fas fa-chevron-circle-right"></i></span>
            &nbsp;&nbsp;&nbsp;
            <span contenteditable="true">Write your skill here</span>
        </div>
    `);
}

// Remove Skill
function remskill(event) {
    removeElements(event, ".skill .input-checkbox");
}

// Add Language
function addLang() {
    addElement("languages", `
        <div class="language">
            <span><input type="checkbox" class="input-checkbox"></span>
            <span contenteditable="true">LANGNAME</span>&nbsp;-&nbsp;
            <span contenteditable="true">Level you know</span>
        </div>
    `);
}

// Remove Language
function remLang(event) {
    removeElements(event, ".language .input-checkbox");
}

// Add Achievement
function addAch() {
    addElement("achievement", `
        <div class="achieve">
            <span><input type="checkbox" class="input-checkbox"></span>
            <span contenteditable="true">Write your achievement</span>
        </div>
    `);
}

// Remove Achievement
function remAch(event) {
    removeElements(event, ".achieve .input-checkbox");
}

// Add Interest
function addInt() {
    addElement("interest", `
        <div class="achieve">
            <span><input type="checkbox" class="input-checkbox"></span>
            <span contenteditable="true">Write interest</span>
        </div>
    `);
}

// Remove Interest
function remInt(event) {
    removeElements(event, ".achieve .input-checkbox");
}

// Add New Section
let maxNewSection = 1;
function addsec() {
    if (maxNewSection >= 2) {
        alert("At most 1 NEW SECTION can be added!");
        return;
    }

    addElement("newsec", `
        <div>
            <span><input type="checkbox" class="input-checkbox"></span>
            <span class="title" contenteditable="true">NEW SECTION</span>
            <br><br>
            <div contenteditable="true">
                This is the description part of your new section. Try to stay within limit and write something which has less than 400 characters. The spaces and symbols you use will also be included so use them for an indentation effect.
            </div>
        </div>
    `);
    maxNewSection++;
}

// Remove New Section
function remsec(event) {
    removeElements(event, ".new-section-div .input-checkbox");
    maxNewSection--;
}

// Save Resume
function saveresume() {
    const sec = document.getElementById("print");
    if (!sec) {
        console.error("Element with ID 'print' not found.");
        return;
    }
    const info = document.getElementById("custinfo");
    if (info) {
        info.value = sec.innerHTML;
    }
}

// Print PDF
function printpdf() {
    const content = document.getElementById("print");
    if (!content) {
        console.error("Element with ID 'print' not found.");
        return;
    }

    // Hide buttons and checkboxes
    const allButtons = content.querySelectorAll("button");
    const allInputCheckboxes = content.querySelectorAll(".input-checkbox");

    // Add a class to hide buttons and checkboxes
    allButtons.forEach(button => button.style.display = "none");
    allInputCheckboxes.forEach(input => input.style.display = "none");

    // Generate PDF with margins
    html2pdf(content, {
        margin: [20, 20], // Add 20px margins on all sides
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, logging: true, dpi: 500, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).then(() => {
        // Restore buttons and checkboxes after PDF generation
        allButtons.forEach(button => button.style.display = "");
        allInputCheckboxes.forEach(input => input.style.display = "");
    });
}