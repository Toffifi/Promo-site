const portfolioTabs = document.querySelectorAll('.portfolio ul li');
const img = document.querySelectorAll('.gallery img');
const form = document.querySelector('form');
const modal = document.querySelector('#myModal');
const span = document.querySelector(".close");

document.addEventListener('scroll', onScroll);
document.querySelector('#slider-button-left')?.addEventListener('click', () => sliderButtonClick(false));
document.querySelector('#slider-button-right')?.addEventListener('click', (I) => sliderButtonClick(true));
document.querySelector('.vertPhone')?.addEventListener('click', () => phoneClick(".vertImg"));
document.querySelector('.horPhone')?.addEventListener('click', () => phoneClick(".horImg"));
document.querySelector('.phone1')?.addEventListener('click', () => phoneClick(".img1"));
document.querySelector('.phone2')?.addEventListener('click', () => phoneClick(".img2"));
document.querySelector('.phone3')?.addEventListener('click', () => phoneClick(".img3"));

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


let busy = false
let scrollOffset = 0;
function sliderButtonClick(button) {
    if (busy) {
        setTimeout(() => sliderButtonClick(button), 100);
        return;
    } 
    busy = true;
    setTimeout(() => busy = false, 600);
    const container = document.querySelector('.slider-container');
    if (container) {
        scrollOffset += button ? 1 : -1;
        const pages = document.querySelectorAll('.slider-page');
        if (container.children.length < 3) {
            const dubPage = pages[pages.length - 1].cloneNode(true);
            dubPage.style.transform = `translateX(-100%)`;
            dubPage.children[0]?.addEventListener('click', () => phoneClick(".img1"));
            dubPage.children[2]?.addEventListener('click', () => phoneClick(".img2"));
            dubPage.children[4]?.addEventListener('click', () => phoneClick(".img3"));
            container.prepend(dubPage);
        }
        container.style.transform = `translateX(${scrollOffset * 100 * -1}%)`;
        const newPage = pages[1].cloneNode(true);
        if (Math.abs(scrollOffset % 2) === 1) {
            newPage.children[0]?.addEventListener('click', () => phoneClick(".vertImg"));
            newPage.children[2]?.addEventListener('click', () => phoneClick(".horImg"));
        } else {
            newPage.children[0]?.addEventListener('click', () => phoneClick(".img1"));
            newPage.children[2]?.addEventListener('click', () => phoneClick(".img2"));
            newPage.children[4]?.addEventListener('click', () => phoneClick(".img3"));
        }
        newPage.style.transform = `translateX(${(scrollOffset + (button ? 1 : -1)) * 100}%)`;
        pages[button ? 0 : (pages.length -1)].remove();
        if (button) {
            container.append(newPage);
        } else {
            container.prepend(newPage);
        }
    }

}

function phoneClick(name) {
    const item = document.querySelector(name);
    if (!item.style.display) {
        item.style.display = 'none';
    } else {
        item.style.display = "";
    }
}