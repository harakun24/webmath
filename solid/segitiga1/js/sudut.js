function cariLebar(sudut, tinggi) {
    return tinggi / Math.tan(sudut * (Math.PI / 180))
}
function cariTinggi(sudut, lebar) {
    return lebar * Math.tan(sudut * (Math.PI / 180))
}
function aturSudut(t) {
    let sudut = t.value;
    if (t.value > 85) {
        t.value = 80;
        t.placeholder = t.value + '°';

        t.value = ''
        return;
    }

    t.placeholder = sudut + '°';
    t.value = ''
    const newWidth = cariLebar(sudut, segitiga.clientHeight);
    // segitiga.style.height = `${newSize.tinggi}px`;

    if (newWidth < 60 || document.querySelector('.content').clientWidth < newWidth) {
        let newHeight = cariTinggi(sudut, segitiga.clientWidth);
        if (newHeight < 60) {
            newHeight *= 1.4;
            segitiga.style.width = `${segitiga.clientWidth * 1.4}`;
        }
        if (newHeight > document.querySelector('.content').clientHeight) {
            const altHeight = document.querySelector('.content').clientHeight * 0.5;

            segitiga.style.height = `${altHeight}px`;
            segitiga.style.width = `${cariLebar(sudut, altHeight)}px`;
        }
        else
            segitiga.style.height = `${newHeight}px`;

    }
    else
        segitiga.style.width = `${newWidth}px`;

    hitungSudut(sudut);
}

function resetSegitiga() {
    segitiga.style.marginLeft = '0px';
    segitiga.style.marginTop = '0px';
    segitiga.style.width = '160px';
    segitiga.style.height = '120px';
    parents = 0;
    rotating({ value: 0 });
    document.querySelector('#outH').innerHTML = `30 m<br/> <b class="dpn">Depan</b>`;
    document.querySelector('#outW').innerHTML = `40 mm<br/> <b class="spg">Samping</b>`;
    document.querySelector('#outD').innerHTML = `50 mm<br/> <b class="mrg">Miring</b>`;
    document.querySelector('#outS').innerHTML = `α 36.87&deg`;
    document.querySelector('.sdtB').innerHTML = 90 - 36.87;

    // hitungSudut();
    tutupMenu();
    document.getElementById('sudut').value = 36.87;
    document.getElementById('rotasi').value = 0;
}
const tempSize = {
    panjang: 0, lebar: 0
}
function toggleContent(t) {
    const btn = t.querySelector('.show');
    if (btn.classList.contains('fa-expand')) {
        tempSize.panjang = document.querySelector('.page2').clientHeight;
        tempSize.lebar = document.querySelector('.page2').clientWidth;
        document.querySelector('.page2').style.width = '100%';
        document.querySelector('.page2').style.height = '100%';
        btn.classList.remove('fa-expand');
        btn.classList.add('fa-compress');

        if (document.querySelector('body').requestFullscreen) {
            document.querySelector('body').requestFullscreen();
        } else if (document.querySelector('body').mozRequestFullScreen) { // Firefox
            document.querySelector('body').mozRequestFullScreen();
        } else if (document.querySelector('body').webkitRequestFullscreen) { // Chrome, Safari, and Opera
            document.querySelector('body').webkitRequestFullscreen();
        } else if (document.querySelector('body').msRequestFullscreen) { // IE/Edge
            document.querySelector('body').msRequestFullscreen();
        }
    }
    else {
        document.querySelector('.page2').style.width = `${tempSize.lebar}px`;
        document.querySelector('.page2').style.height = `${tempSize.panjang}px`;
        btn.classList.remove('fa-compress');
        btn.classList.add('fa-expand');

        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    }
}

document.querySelectorAll('.button-dock button').forEach(e => {
    e.addEventListener('click', () => {
        if (!e.classList.contains('submit'))

            if (e.classList.contains('active'))
                e.classList.remove('active');
            else
                e.classList.add('active');

        document.querySelectorAll('.button-dock button').forEach(f => {
            if (f != e)
                f.classList.remove('active')
        })
    })
})