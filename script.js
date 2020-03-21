const portfolioTabs = document.querySelectorAll('.portfolio ul li');
const img = document.querySelectorAll('.gallery img');

document.addEventListener('scroll', onScroll);

function onScroll(e) {
    const curPos = window.scrollY + 1;
    const links = document.querySelectorAll('nav a');
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