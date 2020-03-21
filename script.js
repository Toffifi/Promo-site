const portfolioTabs = document.querySelectorAll('.portfolio ul li');
const img = document.querySelectorAll('.gallery img');
const form = document.querySelector('form');
const modal = document.querySelector('#myModal');
const span = document.querySelector(".close");

document.addEventListener('scroll', onScroll);

function onScroll(e) {
    const curPos = window.scrollY + 1;
    const links = document.querySelectorAll('nav a');
    const maxOffset = document.querySelector('main')?.offsetHeight - window.innerHeight;
    if (curPos >= maxOffset ) {
        links.forEach((a) => a.classList.remove('active'));
        links[links.length - 1].classList.add('active');
    } else {
        document.querySelectorAll('section').forEach((el) => {
            if(el.offsetTop <= curPos && (el.offsetTop + el.offsetHeight) > curPos) {
                links.forEach((a) => {
                    a.classList.remove('active');
                    if (el.getAttribute('id') === a.getAttribute('href').substring(1)) {
                        a.classList.add('active');
                    }
                })
            }
        })
    }
}

portfolioTabs.forEach((el) => {
    el.addEventListener('click', (e) => {      
        const img = document.querySelector('.gallery');  
        for (let i = img.children.length; i >= 0; i--) {
            img.appendChild(img.children[Math.random() * i | 0]);
        }
        portfolioTabs.forEach((a) => {
            a.classList.remove('portfolioActive');
        })
        e.target.classList.add('portfolioActive');

    })
})

img.forEach((el) => {
    el.addEventListener('click', (e) => {
        img.forEach((a) => {
            a.classList.remove('activeImg');
        })
        e.target.classList.add('activeImg');
    })
})

form.addEventListener('submit', (event) => {
    event.preventDefault();
    modal.style.display = "block";
    let subVal = document.querySelector('#subjectInput').value;
    let textVal = document.querySelector('#textInput').value;
    if (!subVal) {
        subVal = "No subject";
    }
    if (!textVal) {
        textVal = "No description";
    }
    if (subVal.length > 50) {
        subVal = subVal.substring(0, 50) + "...";
    }
    if (textVal.length > 50) {
        textVal = textVal.substring(0, 50) + "...";
    }
    const modalBody = document.querySelector('.modal-body');
    modalBody.children[1].textContent = "Subject: " + subVal;
    modalBody.children[2].textContent = "Description: " + textVal;
})

span.addEventListener('click', () => {
    modal.style.display = "none";
    document.querySelector('#nameInput').value = "";
    document.querySelector('#emailInput').value = "";
    document.querySelector('#subjectInput').value = "";
    document.querySelector('#textInput').value = "";
})