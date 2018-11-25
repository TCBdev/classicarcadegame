// WELCOME SCREEN
// INSTRUCTIONS MODAL


var modal = document.getElementById('startModal'); // GET MODAL ELEMENT
var modalBtn = document.getElementById('modalBtn'); // GET OPEN MODAL BUTTON
var closeBtn = document.getElementsByClassName('closeBtn')[0]; // GET CLOSE BUTTON

// CLICK EVENT LISTENERS - OPEN
modalBtn.addEventListener('click', openModal);

// CLICK EVENT LISTENERS - CLOSE
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', clickOutside);

// OPEN MODAL FUNCTION
function openModal() {
    modal.style.display = 'block';
}

// CLOSE MODAL FUNCTION
function closeModal() {
    modal.style.display = 'none';
}

// CLOSE MODAL FUNCTION IF CLICKED OUTSIDE MODAL
function clickOutside(e) {
    if (e.target == modal){
    modal.style.display = 'none';
    }
}