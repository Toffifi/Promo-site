const portfolioTabs = document.querySelectorAll('.portfolio ul li');
const img = document.querySelectorAll('.gallery img');
const form = document.querySelector('form');
const modal = document.querySelector('#myModal');
const span = document.querySelector(".close");
const sliderContainer = document.querySelector('.slider-container');
const burger = document.querySelector('.burger');
const blur = document.querySelector('#blur');
const head = document.querySelector('.head');
const links = document.querySelectorAll('nav a');

let busy = false
let scrollOffset = 0;
let burgerState = false;

document.addEventListener('scroll', onScroll);

document.querySelector('#slider-button-left')?.addEventListener('click', () => sliderButtonClick(false));
document.querySelector('#slider-button-right')?.addEventListener('click', (I) => sliderButtonClick(true));

document.querySelectorAll(".slider-page > div").forEach(el => addPhoneEventListeners(el));


// addPhoneEventListeners(1, sliderContainer.children[0]);
// addPhoneEventListeners(2, sliderContainer.children[1]);

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

links.forEach((a) => a.addEventListener('click', () => {
    if(burgerState) {
        burgerStateChanged();
    }
}));

span.addEventListener('click', () => {
    modal.style.display = "none";
    document.querySelector('#nameInput').value = "";
    document.querySelector('#emailInput').value = "";
    document.querySelector('#subjectInput').value = "";
    document.querySelector('#textInput').value = "";
})
burger.addEventListener('click', burgerStateChanged);
blur.addEventListener('click', burgerStateChanged);

function onScroll(e) {
    const curPos = window.scrollY + 1;
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

function burgerStateChanged() {
    if(burgerState){
        burgerState = false;
        burger.classList.remove('burger-open');
        blur.classList.remove('blurOpen');
        head.classList.remove('bmOpen');
    } else {
        burgerState = true;
        burger.classList.add('burger-open');
        blur.classList.add('blurOpen');
        head.classList.add('bmOpen');
    }
}

function addPhoneEventListeners(el) {
    el.addEventListener('click', (event) => phoneClick(event))
    el.addEventListener('mousedown', (e) => e.preventDefault(), false);
}

function sliderButtonClick(button) {
    if (busy) {
        return;
    } 
    busy = true;
    setTimeout(() => busy = false, 600);
    const container = sliderContainer;
    if (container) {
        scrollOffset += button ? 1 : -1;
        if (container.children.length < 3) {
            const dubPage = container.children[container.children.length - 1].cloneNode(true);
            dubPage.style.transform = `translateX(-100%)`;
            Array.from(dubPage.children).forEach(el => addPhoneEventListeners(el));
            container.prepend(dubPage);
        }
        const newPage = container.children[1].cloneNode(true);
        Array.from(newPage.children).forEach(el => addPhoneEventListeners(el));
        container.style.transform = `translateX(${scrollOffset * 100 * -1}%)`;
        newPage.style.transform = `translateX(${(scrollOffset + (button ? 1 : -1)) * 100}%)`;
        if (button) {
            container.children[0].remove();
            container.append(newPage);
        } else {
            container.children[container.children.length -1].remove();
            container.prepend(newPage);
        }
    }

}

function phoneClick(event) {
    event.preventDefault();
    const item = event.target.children[0];
    if (item) {
        if (!item.style.opacity || item.style.opacity === '1') {
            item.style.opacity = '0';
        } else {
            item.style.opacity = '1';
        }
    }
}
