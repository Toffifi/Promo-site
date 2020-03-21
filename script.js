document.addEventListener('scroll', onScroll);

function onScroll(e) {
    const curPos = window.scrollY + 1;
    const links = document.querySelectorAll('nav a');
    document.querySelectorAll('section').forEach((el) => {
        if(el.offsetTop <= curPos && (el.offsetTop + el.offsetHeight) > curPos) {
            links.forEach((a) => {
                a.classList.remove('active');
                if (el.getAttribute('id') === a.getAttribute('href').substring(1)) {
                    a.classList.add('active')
                }
            })
        }
    })
}