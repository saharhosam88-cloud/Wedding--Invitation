// Target Wedding Date
const weddingDate = new Date("October 27, 2026 17:00:00").getTime();

// Countdown Timer Function
function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days < 10 ? '0' + days : days;
    document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? '0' + seconds : seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Audio Toggle Controller
let isPlaying = false;
function toggleMusic() {
    const audio = document.getElementById("weddingAudio");
    const icon = document.getElementById("musicIcon");

    if (isPlaying) {
        audio.pause();
        icon.className = "fas fa-music text-xs text-softGold";
    } else {
        audio.play().then(() => {
            icon.className = "fas fa-pause text-xs text-softGold";
        }).catch(err => {
            console.log("Audio playback blocked by browser: " + err);
        });
    }
    isPlaying = !isPlaying;
}

// Photo Upload Handler
let activePhotoId = null;

function triggerUpload(imgId) {
    activePhotoId = imgId;
    document.getElementById("photoUploader").click();
}

function applyUploadedPhoto(event) {
    const file = event.target.files[0];
    if (file && activePhotoId) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById(activePhotoId).src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
}

// RSVP Form Submission Handler
function submitRSVP(event) {
    event.preventDefault();
    
    const name = document.getElementById("guestName").value;
    const attendance = document.getElementById("attendance").value;
    const count = document.getElementById("guestCount").value;

    showToast(`Thank you ${name}! Your RSVP (${attendance}) has been recorded.`);
    document.getElementById("rsvpForm").reset();
}

// Toast Alert Function
function showToast(message) {
    const toast = document.getElementById("toast");
    const toastMsg = document.getElementById("toastMsg");
    
    toastMsg.innerText = message;
    toast.classList.remove("translate-y-[-100px]", "opacity-0");
    toast.classList.add("translate-y-0", "opacity-100");

    setTimeout(() => {
        toast.classList.remove("translate-y-0", "opacity-100");
        toast.classList.add("translate-y-[-100px]", "opacity-0");
    }, 4000);
}