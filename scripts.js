// © Om Kanabar 2025 
// All Rights Reserved

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('debug')) {
        localStorage.clear();
    }
    formCheck();
});

function startCheck(){
    document.getElementById("main").classList.remove("hidden");
    stats();
    document.title = "Hoperation Fund | Student-Led Charitable Investment Fund";
    changeFavicon('https://static.wixstatic.com/media/4cb111_d554f6c98c02402a94d999971087a302%7Emv2.png/v1/fill/w_192%2Ch_192%2Clg_1%2Cusm_0.66_1.00_0.01/4cb111_d554f6c98c02402a94d999971087a302%7Emv2.png');
}

let storedHashes = ['10b3adb10e86e99fe88fd5c02f7782f15f3896a3c9cf00273bf0f6909bcada59', 'd88b4413986bc5a7ae96723c0c42f761d244216d6435949ae19544298d329d8c'];

function bufToHex(buffer) {
    const bytes = new Uint8Array(buffer);
    return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function sha256Hex(message) {
    const enc = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest('SHA-256', enc.encode(message));
    return bufToHex(hashBuffer);
}

function setMessage(text, type = 'info') {
    const msg = document.getElementById('message');
    msg.textContent = text;
    msg.className = '';
    if (type === 'success') msg.classList.add('alert', 'alert-success', 'mt-5', 'w-50');
    else if (type === 'error') msg.classList.add('alert', 'alert-danger', 'mt-5', 'w-50');
    else msg.classList.add('alert', 'alert-secondary', 'mt-5', 'w-50');
}

function formCheck(){
    const form = document.getElementById('check');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // If previously unlocked, skip form and update UI
    if (localStorage.getItem('unlocked') === 'true') {
        setMessage('Already unlocked.', 'success');
        form.classList.add("hidden");
        startCheck();        
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        setMessage('Checking...', 'info');

        const username = usernameInput.value || '';
        const password = passwordInput.value || '';

        const combined = `${username}:${password}`;

        if (username === 'admin' && password === 'password123') {
            setMessage("I'm not stupid enough to make that the username and password.", 'error');
            return;
        }

        try {
            const hex = await sha256Hex(combined);

            const match = storedHashes.some(h => h.toLowerCase() === hex.toLowerCase());
            if (match) {
                setMessage('Unlocked — credentials match.', 'success');
                localStorage.setItem('unlocked', 'true');
                form.classList.add("hidden");
                startCheck();
            } else {
                setMessage('Invalid credentials.', 'error');
            }
        } catch (err) {
            console.error(err);
            setMessage('Error while hashing. Check browser support.', 'error');
        }
    });
}

// Change the favicon to a different image
function changeFavicon(url) {
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = url;
}

function pause(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function stats(){
    await pause(200)
    let elem = document.getElementById("investLectures");
    if (!elem) return;
    let current = 0;
    let max = 100;
    while (current <= max) {
        elem.innerHTML = current.toLocaleString()
        await pause(20);
        current++;
    }
    elem.innerHTML = `${max}+`;

    await pause(100)

    elem = document.getElementById("moneyRaised")
    current = 0;
    max = 20000;
    while (current <= max) {
        elem.innerHTML = current.toLocaleString()
        await pause(0.001);
        current = current + 35;
    }
    elem.innerHTML = `${max}+`;

    await pause(100)

    elem = document.getElementById("nonprofits")
    current = 0;
    max = 20;
    while (current <= max) {
        elem.innerHTML = current.toLocaleString()
        await pause(50);
        current++;
    }
    elem.innerHTML = `${max}+`;
}

