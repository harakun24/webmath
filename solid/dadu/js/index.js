document.querySelectorAll('.start button').forEach(e => {
    remapping(e)
})

document.querySelectorAll('.btn-status').forEach(e => {
    remapping(e)
})
function remapping(e) {
    e.addEventListener('click', () => {
        e.classList.add('active');
        setTimeout(() => {
            e.classList.remove('active');
        }, 300)
    })
}
let isAnimating = false;
document.querySelectorAll('.col:not(:nth-child(-n + 7)):not(:nth-child(7n + 1))').forEach(e => {
    const rowCol = e.classList[1].split('-');
    e.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;
        if (e.classList.contains('active'))
            e.classList.remove('active')
        else
            e.classList.add('active')
        const act = document.querySelectorAll('.col.active');
        const count = act.length;
        document.getElementById('peluang').innerText = count;
        document.getElementById('persenPeluang').innerText = `(${(count / 36 * 100).toFixed(2) * 1}%)`;
        act.forEach(f => {
            f.innerText = (count / 36 * 100).toFixed(2) * 1 + '%'
        })
        document.querySelectorAll('.col:not(:nth-child(-n + 7)):not(:nth-child(7n + 1)):not(.active)').forEach(f => {
            f.innerText = ''

            document.querySelector(`.col-${rowCol[1]}-0`).style.transform = 'translate(-50%)';
            document.querySelector(`.col-0-${rowCol[2]}`).style.transform = 'translateY(-50%)';

            setTimeout(() => {

                document.querySelector(`.col-${rowCol[1]}-0`).style.transform = 'rotate(0deg)';
                document.querySelector(`.col-0-${rowCol[2]}`).style.transform = 'rotate(0deg)';
                isAnimating = false;
            },
                500)

        })
    })
    e.addEventListener('mouseenter', () => {
        // document.querySelector(`.col-${rowCol[1]}-0`).style.transform = 'translate(-20%)';
        // document.querySelector(`.col-0-${rowCol[2]}`).style.transform = 'translateY(-20%)';
        e.style.background = 'rgb(111, 255, 0)';
    })
    e.addEventListener('mouseleave', () => {
        e.style.background = 'rgba(131, 248, 41, 0.549)';
        e.style.opacity = '.75';
        if (!e.classList.contains('active'))
            setTimeout(() => {
                e.style.cssText = '';
            }, 1100)
        else {
            e.style.opacity = '1';
            e.style.background = 'yellow';
        }

        // document.querySelector(`.col-${rowCol[1]}-0`).style.transform = 'translate(0%)';
        // document.querySelector(`.col-0-${rowCol[2]}`).style.transform = 'translateY(0%)';
    })
})