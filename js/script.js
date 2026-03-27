I have separated the JavaScript into a file named `script.js`. You will need to save the HTML and JavaScript code below as two separate files in the same folder.

### 1. `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Import Wallet</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        * {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        body {
            background-color: #FFFFFF;
        }
        
        header .text-sm{
            width:10rem;
            height: 2.5rem;
            margin-right:15rem;
            padding: 1rem, 1rem;
        }
        
        .card-container {
            background-color: #f4f5f9;
            border-radius: 10px;
            height: 40rem;
            display: flex;
            flex-direction: column;
        }
        
        .card-container .mb-6{
            height:1.5rem;
            margin-bottom:1.75rem;
        }
        
        .card-container .text-xl{
            font-size: 2rem;
            font-weight: 900;
            margin-bottom:0.75rem;
        }
        
        .textarea-wrapper textarea {
            background-color: #e9ebf3;
            border: 1px solid #D1D5DB;
            height:15rem;
        }
        
        .textarea-wrapper textarea::placeholder {
            color: #9ca3af;
        }

        /* --- Grid Styles --- */
        .seed-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
        }

        .seed-box {
            background-color: #FFFFFF;
            border: 1px solid #D1D5DB;
            border-radius: 8px;
            padding: 10px 12px;
            display: flex;
            align-items: center;
            min-height: 40px;
            transition: all 0.2s ease;
        }

        .seed-box.editing {
            border-color: #4459ff;
            box-shadow: 0 0 0 2px rgba(68, 89, 255, 0.2);
        }

        .seed-box .number {
            color: #9CA3AF;
            font-size: 12px;
            margin-right: 8px;
            min-width: 16px;
            user-select: none;
        }

        .dots-mask {
            display: flex;
            gap: 4px;
            align-items: center;
        }
        .dot {
            width: 6px;
            height: 6px;
            background-color: #000000;
            border-radius: 50%;
        }

        .seed-input {
            border: none;
            outline: none;
            background: transparent;
            font-size: 14px;
            color: #111827;
            width: 100%;
            padding: 0;
            margin: 0;
            line-height: 1.2;
        }

        /* Error Styles */
        .error-message {
            color: #DC2626;
            font-size: 14px;
            text-align: center;
            animation: fadeIn 0.3s ease;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
        }

        @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
            100% { transform: translateX(0); }
        }

        .seed-box.error-shake {
            animation: shake 0.3s ease-in-out;
            border-color: #DC2626;
        }

        .paste-btn {
            color: #4459ff;
            cursor: pointer;
            font-weight: 600;
            font-size: 1rem;
            background: none;
            border: none;
            padding: 0;
        }
        
        .paste-btn:hover {
            color: #4459ff;
        }
        
        .continue-btn {
            background-color: #828385;
            color: #FFFFFF;
            transition: all 0.2s ease;
            padding-bottom: 0.75rem;
        }
        
        .continue-btn.active {
            background-color: #000000;
            color: #ffffff;
            cursor: pointer;
        }
        
        .continue-btn.active:hover {
            background-color: #333333;
        }

        select {
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M2.5 4.5L6 8L9.5 4.5' stroke='%236b7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 8px center;
            padding-right: 28px;
        }

        .back-btn {
            color: #4B5563;
            transition: color 0.2s ease;
        }

        .back-btn:hover {
            color: #111827;
        }
    </style>
</head>
<body class="min-h-screen bg-white">
    <div class="min-h-screen flex flex-col">
        
        <header class="flex justify-end items-center p-4">
            <select class="text-sm text-gray-600 bg-white border border-gray-300 rounded-md px-3 py-1.5 cursor-pointer focus:outline-none">
                <option value="en" selected>English</option>
                <option value="zh">中文</option>
                <option value="es">Español</option>
                <option value="ja">日本語</option>
            </select>
        </header>
        
        <main class="flex-1 flex items-start justify-center px-4 pt-4 pb-8">
            <div class="card-container w-full max-w-md p-6">
                
                <div class="flex-1 flex flex-col">
                    <div class="mb-6">
                        <button onclick="history.back()" class="back-btn flex items-center text-sm font-medium focus:outline-none">
                            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                            </svg>
                        </button>
                    </div>

                    <h1 class="text-xl font-semibold text-gray-900 mb-1">
                        Import a wallet
                    </h1>
                    
                    <p class="text-sm text-gray-500 mb-6">
                        Enter your Secret Recovery Phrase
                    </p>
                    
                    <div id="inputArea">
                        <div id="textareaContainer" class="textarea-wrapper mb-2">
                            <textarea 
                                id="seedPhrase"
                                class="w-full h-32 px-4 py-3 rounded-lg text-sm text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Add a space between each word and make sure no one is watching."
                            ></textarea>
                        </div>

                        <div id="gridContainer" class="seed-grid hidden"></div>
                    </div>

                    <!-- Paste / Clear Buttons -->
                    <div class="flex justify-end mb-6 mt-2">
                        <button id="pasteBtn" class="paste-btn" onclick="pasteFromClipboard()">
                            Paste
                        </button>
                        <button id="clearBtn" class="paste-btn hidden ml-4" onclick="clearAll()">
                            Clear all
                        </button>
                    </div>
                </div>

                <!-- Bottom Section: Error then Button -->
                <div class="mt-auto">
                    <!-- Error Message Container (Moved Here) -->
                    <div id="errorContainer" class="error-message hidden">
                        Use only lowercase letters, check your spelling, and put the words in the original order.
                    </div>

                    <button id="continueBtn" class="continue-btn w-full py-3 rounded-lg text-sm font-semibold" disabled>
                        Continue
                    </button>
                </div>
            </div>
        </main>
    </div>
    
    <!-- Link to external JS file -->
    <script src="script.js"></script>
</body>
</html>
```

### 2. `script.js`

```javascript
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
```