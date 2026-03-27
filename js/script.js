const textarea = document.getElementById('seedPhrase');
const continueBtn = document.getElementById('continueBtn');
const inputArea = document.getElementById('inputArea');
const textareaContainer = document.getElementById('textareaContainer');
const gridContainer = document.getElementById('gridContainer');
const errorContainer = document.getElementById('errorContainer');
const pasteBtn = document.getElementById('pasteBtn');
const clearBtn = document.getElementById('clearBtn');

const TOTAL_WORDS = 12;
let words = [];
let activeIndex = 0;

function isInvalidWord(word) {
    return !/^[a-z]+$/.test(word);
}

function showError() {
    errorContainer.classList.remove('hidden');
}

function hideError() {
    errorContainer.classList.add('hidden');
}

// --- Default Textarea Logic ---

textarea.addEventListener('input', function(e) {
    const val = e.target.value;
    
    // Hide paste button immediately on typing
    if (val.length > 0) {
        pasteBtn.classList.add('hidden');
    } else {
        pasteBtn.classList.remove('hidden');
    }

    if (val.includes(' ') || val.includes('\n')) {
        switchToGridMode(val);
    } else {
        updateButtonState();
    }
});

function updateButtonState() {
    let count = words.length;
    
    if (!gridContainer.classList.contains('hidden')) {
         count = words.length;
    } else {
         const val = textarea.value.trim();
         count = val.length > 0 ? 1 : 0;
    }

    if (count === TOTAL_WORDS) {
        continueBtn.disabled = false;
        continueBtn.classList.add('active');
    } else {
        continueBtn.disabled = true;
        continueBtn.classList.remove('active');
    }
}

async function pasteFromClipboard() {
    try {
        const text = await navigator.clipboard.readText();
        
        if (gridContainer.classList.contains('hidden')) {
            textarea.value = text;
            pasteBtn.classList.add('hidden'); // Hide after paste
            if (text.trim().split(/\s+/).length > 1) {
                switchToGridMode(text);
            } else {
                textarea.dispatchEvent(new Event('input'));
            }
        } else {
            handleGridPaste(text);
        }
    } catch (err) {
        console.log('Failed to read clipboard contents');
    }
}

// --- Grid Mode Logic ---

function switchToGridMode(initialText = "") {
    textareaContainer.classList.add('hidden');
    gridContainer.classList.remove('hidden');
    
    // Hide paste button when switching to grid
    pasteBtn.classList.add('hidden');
    hideError();
    
    if (initialText.trim().length > 0) {
        const parsed = initialText.trim().split(/\s+/).filter(w => w.length > 0);
        words = [];
        activeIndex = 0;
        
        parsed.forEach(w => {
            if (words.length < TOTAL_WORDS) {
                words.push(w);
                activeIndex++;
            }
        });
    } else {
        words = [];
        activeIndex = 0;
    }
    
    renderGrid();
    if (activeIndex < TOTAL_WORDS) {
        activateBox(activeIndex);
    }
    toggleClearButton();
}

function renderGrid() {
    gridContainer.innerHTML = '';
    
    words.forEach((word, index) => {
        const box = document.createElement('div');
        box.className = 'seed-box';
        box.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="dots-mask">
                <div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div>
            </div>`;
        
        box.onclick = () => {
            words = words.slice(0, index);
            activeIndex = index;
            renderGrid();
            activateBox(index);
            toggleClearButton();
            hideError();
        };
        gridContainer.appendChild(box);
    });

    if (words.length < TOTAL_WORDS) {
        const box = document.createElement('div');
        box.className = 'seed-box';
        box.id = 'active-box';
        box.innerHTML = `<span class="number">${words.length + 1}</span>`;
        gridContainer.appendChild(box);
    }
    
    updateButtonState();
}

function activateBox(index) {
    const box = document.getElementById('active-box');
    if (!box) return;

    box.classList.add('editing');
    box.innerHTML = `
        <span class="number">${index + 1}</span>
        <input type="text" class="seed-input" id="active-input" autofocus>
    `;
    
    const input = box.querySelector('#active-input');
    input.focus();
    input.onkeydown = handleKeyDown;
    
    // Listen for typing to ensure paste is hidden
    input.addEventListener('input', () => {
        pasteBtn.classList.add('hidden');
    });
}

function handleKeyDown(e) {
    const input = document.getElementById('active-input');
    if (!input) return;

    if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        const word = input.value.trim();
        
        if (word.length > 0) {
            if (isInvalidWord(word)) {
                showError();
                const box = document.getElementById('active-box');
                box.classList.add('error-shake');
                setTimeout(() => box.classList.remove('error-shake'), 300);
            } else {
                hideError();
                confirmWord(word);
            }
        }
    }
    
    if (e.key === 'Backspace' && input.value === "") {
        e.preventDefault();
        hideError();
        if (words.length > 0) {
            goBack();
        }
    }
}

function confirmWord(word) {
    words.push(word);
    activeIndex = words.length;
    renderGrid();
    if (activeIndex < TOTAL_WORDS) {
        activateBox(activeIndex);
    } else {
        document.getElementById('active-box')?.remove();
    }
    toggleClearButton();
}

function goBack() {
    words.pop();
    activeIndex = words.length;
    renderGrid();
    activateBox(activeIndex);
    toggleClearButton();
}

function handleGridPaste(text) {
    const pastedWords = text.split(/\s+/).filter(w => w.length > 0);
    
    let hasError = false;

    pastedWords.forEach(word => {
        if (words.length < TOTAL_WORDS) {
            if (isInvalidWord(word)) {
                hasError = true;
            } else {
                words.push(word);
                activeIndex++;
            }
        }
    });

    if (hasError) {
        showError();
    } else {
        hideError();
    }

    renderGrid();
    if (activeIndex < TOTAL_WORDS) {
        activateBox(activeIndex);
    }
    toggleClearButton();
}

function clearAll() {
    words = [];
    activeIndex = 0;
    hideError();
    renderGrid();
    activateBox(0);
    toggleClearButton();
    
    // Show paste button again when cleared
    pasteBtn.classList.remove('hidden'); 
}

function toggleClearButton() {
    if (words.length > 0) {
        clearBtn.classList.remove('hidden');
    } else {
        clearBtn.classList.add('hidden');
    }
}
