function cariLebar(sudut, tinggi) {
    return tinggi / Math.tan(sudut * (Math.PI / 180))
}
function cariTinggi(sudut, lebar) {
    return lebar * Math.tan(sudut * (Math.PI / 180))
}
function aturSudut(t) {

    if (t.value > 85) {
        t.value = 80;
    }
    let sudut = t.value;
    t.placeholder = t.value + '°';
    t.value = '';

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
    document.querySelector('#outH').innerHTML = `30 mm<br/> <b class="dpn">Depan</b>`;
    document.querySelector('#outW').innerHTML = `40 mm&nbsp;<b class="spg">Samping</b>`;
    document.querySelector('#outD').innerHTML = `50 mm<br/> <b class="mrg">Miring</b>`;
    document.querySelector('#outS').innerHTML = `α 36.87 &deg;`;
    document.querySelector('.sdtB').innerHTML = 90 - 36.87;

    tutupMenu();
    document.getElementById('sudut').value = 36.87;
    document.getElementById('rotasi').value = 0;
    document.querySelectorAll('.sectsdt').forEach(itm => {

        itm.innerHTML = `36.87 &deg;`;
    })

    document.querySelectorAll('.depanTxt').forEach(itm => {
        itm.innerHTML = 30;
    })
    document.querySelectorAll('.sampingTxt').forEach(itm => {
        itm.innerHTML = 40;
    })
    document.querySelectorAll('.miringTxt').forEach(itm => {
        itm.innerHTML = 50;
    })
    document.getElementById('sin').innerHTML = (30 / 50).toFixed(2) * 1;
    document.getElementById('cos').innerHTML = (40 / 50).toFixed(2) * 1;
    document.getElementById('tan').innerHTML = (30 / 40).toFixed(2) * 1;

    document.querySelector('.barMiring').style.height = `200px`;
    document.querySelector('.barMiring').style.transform = `rotate(53.13deg)`;
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

const checkboxes = document.querySelectorAll('.check input');

checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener('change', function () {
        const btm = document.querySelectorAll('.btm')[index]; // Mengambil elemen .btm yang sesuai
        btm.style.opacity = this.checked ? 1 : 0; // Mengatur opasitas
        document.querySelectorAll('.check input').forEach(other => {
            if (checkbox != other) {
                const btm2 = other.parentElement.parentElement.querySelector('.btm'); // Mengambil elemen .btm yang sesuai
                btm2.style.opacity = 0;
                other.checked = false;
            }
        })
        const bar = {
            lebar: document.querySelector('.barWidth'),
            tinggi: document.querySelector('.barHeight'),
            miring: document.querySelector('.barMiring'),
        }
        const out = {
            lebar: document.querySelector('#outW'),
            tinggi: document.querySelector('#outH'),
            miring: document.querySelector('#outD'),
        }
        switch (index) {
            case 0:
                bar.tinggi.style.opacity = this.checked ? 1 : 0;
                bar.lebar.style.opacity = 0;
                bar.miring.style.opacity = this.checked ? 1 : 0;

                out.tinggi.style.opacity = this.checked ? 1 : 0;
                out.lebar.style.opacity = 0;
                out.miring.style.opacity = this.checked ? 1 : 0;
                break;
            case 1:
                bar.tinggi.style.opacity = 0;
                bar.lebar.style.opacity = this.checked ? 1 : 0;
                bar.miring.style.opacity = this.checked ? 1 : 0;

                out.tinggi.style.opacity = 0;
                out.lebar.style.opacity = this.checked ? 1 : 0;
                out.miring.style.opacity = this.checked ? 1 : 0;
                break;
            case 2:
                bar.tinggi.style.opacity = this.checked ? 1 : 0;
                bar.lebar.style.opacity = this.checked ? 1 : 0;
                bar.miring.style.opacity = 0;

                out.tinggi.style.opacity = this.checked ? 1 : 0;
                out.lebar.style.opacity = this.checked ? 1 : 0;
                out.miring.style.opacity = 0;
                break;
        }
    });
});

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

const closeBtn = document.querySelector('.answer button');

// closeBtn.addEventListener('click', (e) => {
//     document.querySelector('.answer').style.transform = 'scale(0) translate(-200%) rotateY(0deg)';
//     document.querySelector('.wrapper-answer').style.opacity = 0;
//     setTimeout(() => {
//         document.querySelector('.wrapper-answer').style.display = 'none';
//     }, 500)
// })

function checkAnswer() {
    const btnGroup = document.querySelectorAll('.button-dock button');
    if (!document.querySelector('.button-dock .active'))
        return console.log('null')

    document.querySelector('.wrapper-answer').style.opacity = 1;
    document.querySelector('.answer').style.transform = 'scale(0) translate(200%)';
    document.querySelector('.wrapper-answer').style.display = 'grid';
    setTimeout(() => {
        document.querySelector('.answer').style.transform = 'scale(1) translate(0) rotateY(0deg)';
        // document.querySelector('.answer').style.opacity = 1;
    }, 500)
    if (btnGroup[0].classList.contains('active')) {
        document.querySelector('.answer h2').innerHTML = 'Selamat! Kamu memahami sisi segitiga siku-siku';
        document.querySelector('.answer p').innerHTML = '&nbsp;&nbsp;Tali layangan merupakan sisi terpanjang pada segitiga yang terbentuk. Karena itu, tali layangan adalah sisi miring.';
    }
    else {
        document.querySelector('.answer h2').innerHTML = 'Sayang sekali! Jawaban kamu belum tepat.';
        document.querySelector('.answer p').innerHTML = '&nbsp;&nbsp;Coba cermati kembali gambar yang disajikan. Kemudian silahkan jawab kembali!';
    }
}

function closeKesimpulan() {
    document.querySelector('.qcard').style.opacity = 0;
    document.querySelector('.qcard').style.transform = 'scale(0) translateY(-200%)';
    setTimeout(() => {
        document.querySelector('.kesimpulan').style.display = 'none';
    }, 500)
}
function openKesimpulan() {
    tutupMenu();
    document.querySelector('.kesimpulan').style.display = 'grid';
    document.querySelector('.qcard').style.opacity = 0;
    document.querySelector('.qcard').style.transform = 'scale(0) translateY(200%)';
    setTimeout(() => {
        document.querySelector('.qcard').style.opacity = 1;
        document.querySelector('.qcard').style.transform = 'scale(1) translateY(0)';

    }, 200)
}

document.querySelector('.uji button').addEventListener('click', function () {
    this.classList.add('active');
    setTimeout(() => {
        this.classList.remove('active');
    }, 500)
})

function closeQuest() {
    document.querySelector('.q-card').style.transform = 'scale(0) translateY(-200%)';
    setTimeout(() => {
        document.querySelector('.q-quest').style.display = 'none';
    }, 500)


    document.body.classList.add('body');
}
function openQuest() {
    window.scrollTo({
        top: 0
    });
    document.body.classList.remove('body');
    document.querySelector('.q-quest').style.display = 'grid';
    document.querySelector('.q-card').style.transform = 'scale(0) translateY(-200%)';
    setTimeout(() => {
        document.querySelector('.q-card').style.transform = 'scale(1) translateY(0%)';
    }, 500)
}

function menjawab() {
    const answer = document.querySelector('.answ input').value;
    if (!answer)
        return;
    if (answer == '0,4') {
        document.querySelector('.q-answer img').src = './assets/Correct.png';
        document.querySelector('.q-answer h1').innerHTML = 'Selamat!';
        document.querySelector('.q-answer p').innerHTML = 'Kamu telah berhasil memahami perbandingan trigonometri dengan baik!';
    }
    else {
        document.querySelector('.q-answer h1').innerHTML = 'Coba lagi!';
        document.querySelector('.q-answer p').innerHTML = 'Periksa kembali jawabanmu! gunakan tanda koma (,) bukan tanda titik (.) jika diperlukan...';
        document.querySelector('.q-answer img').src = './assets/Wrong.png';
    }
    document.querySelector('.answ input').value = '';
    document.querySelector('.q-banner').style.display = 'grid';
    document.querySelector('.q-answer').style.transform = 'scale(0)';
    setTimeout(() => {
        document.querySelector('.q-answer').style.transform = 'scale(1)';
    }, 500)
}

function closeJawab() {
    document.querySelector('.q-answer').style.transform = 'scale(0)';
    setTimeout(() => {
        document.querySelector('.q-banner').style.display = 'none';
    }, 500)
}