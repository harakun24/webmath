function showDialog() {
    document.querySelector('.panel').style.transform = 'scale(0)';
    document.querySelector('.dialogPetunjuk').style.display = 'grid';
    setTimeout(() => {
        document.querySelector('.panel').style.transform = 'scale(1)';
    }, 300);
    document.querySelector('.page1').style.filter = 'blur(8px)';
    document.querySelector('.cover').style.filter = 'blur(8px)';
}
function hideDialog() {
    document.querySelector('.page1').style.filter = 'blur(0px)';
    document.querySelector('.cover').style.filter = 'blur(0px)';
    document.querySelector('.dialogPetunjuk').style.display = 'none'
}

const segitiga = document.querySelector('.wrapper-segitiga');
const right = document.querySelector('.btnUp');
const left = document.querySelector('.btnLeft');

let isDrag = false;
let rotate = 0;
left.addEventListener('mousedown', e => {
    isDrag = "kanan";
    document.addEventListener('mousemove', rotateDiv);
});
right.addEventListener('mousedown', e => {
    isDrag = "kiri";
    document.addEventListener('mousemove', rotateDiv);
});
left.addEventListener('touchstart', e => {
    isDrag = "kanan";
    document.addEventListener('touchmove', rotateDiv);
});
right.addEventListener('touchstart', e => {
    isDrag = "kiri";
    document.addEventListener('touchmove', rotateDiv);
});

document.addEventListener('mouseup', () => {
    isDrag = false;
    document.removeEventListener('mousemove', rotateDiv);
})
document.addEventListener('touchend', () => {
    isDrag = false;
    document.removeEventListener('touchmove', rotateDiv);
})
function rotateDiv(en) {
    let parent = parents % 360;
    if (parent < 0)
        parent = parent * -1;

    isDragging = false;
    const e = {
        clientX: en.clientX || en.touches[0].clientX,
        clientY: en.clientY || en.touches[0].clientY,
    }
    if (isDrag == "kanan") {
        let newWidth;

        if (parent < 46)
            newWidth = Math.min(document.querySelector('.content').clientWidth * 0.7, (segitiga.getBoundingClientRect().right - e.clientX));
        else if (parent < 136)
            newWidth = Math.min(document.querySelector('.content').clientWidth * 0.7, (segitiga.getBoundingClientRect().bottom - e.clientY));
        else if (parent < 216)
            newWidth = Math.min(document.querySelector('.content').clientWidth * 0.7, (e.clientX - segitiga.getBoundingClientRect().left));
        else
            newWidth = Math.min(document.querySelector('.content').clientWidth * 0.7, (e.clientY - segitiga.getBoundingClientRect().top));
        //untuk 90
        //e.clientY - rect.top;
        if (newWidth > 90) {
            segitiga.style.width = `${newWidth}px`;
        }

    }
    else if (isDrag == 'kiri') {
        let newHeight;

        if (parent < 46)
            newHeight = Math.min(document.querySelector('.content').clientHeight * 0.7, segitiga.getBoundingClientRect().bottom - e.clientY);
        else if (parent < 136)
            newHeight = Math.min(document.querySelector('.content').clientHeight * 0.7, e.clientX - segitiga.getBoundingClientRect().left);
        else if (parent < 216)
            newHeight = Math.min(document.querySelector('.content').clientWidth * 0.7, (e.clientY - segitiga.getBoundingClientRect().top));
        else
            newHeight = Math.min(document.querySelector('.content').clientWidth * 0.7, (segitiga.getBoundingClientRect().right - e.clientX));

        //untuk 90
        //e.clientX - rect.left;
        if (newHeight > 90)
            segitiga.style.height = `${newHeight}px`;



    }
    // segitiga.style.transform = `rotate(${rotate}deg)`;
    hitungSudut();



}
let parents = 0;

function hitungSudut(sdt = false, dst = false) {
    let widthSegitiga = segitiga.clientWidth - 0;
    let heightSegitiga = segitiga.clientHeight - 0;
    let miringSegitiga = Math.sqrt((widthSegitiga * widthSegitiga) + (heightSegitiga * heightSegitiga));
    let radianA = Math.atan(heightSegitiga / widthSegitiga);
    let sudut = {};
    sudut.a = (radianA * (180 / Math.PI)).toFixed(2) * 1;
    sudut.b = (90 - sudut.a).toFixed(2) * 1;
    sudut.c = 90;

    document.querySelector('#outH').innerHTML = `${(heightSegitiga / 4).toFixed(2) * 1} mm<br/> <b class="dpn">Depan</b>`;
    document.querySelector('#outW').innerHTML = `${(widthSegitiga / 4).toFixed(2) * 1} mm&nbsp;<b class="spg">Samping</b>`;
    document.querySelector('#outD').innerHTML = `${(miringSegitiga / 4).toFixed(2) * 1} mm<br/> <b class="mrg">Miring</b>`;
    if (sdt)
        document.querySelector('#outS').innerHTML = `α = ${sdt}&deg`;
    else {
        // document.getElementById('sudut').value = dst ? '36.87&deg' : sudut.a;
        document.getElementById('sudut').placeholder = sudut.a + "°";

        document.querySelector('#outS').innerHTML = `α = ${sudut.a}&deg`;
    }
    document.querySelector('.sdtB').innerHTML = sudut.b;

    // document.querySelector('#outS').innerHTML = `α = ${sudut.a}&deg`;


}
hitungSudut(false);

document.querySelectorAll('.control-nav a').forEach(item => {
    item.onclick = function () {
        document.querySelectorAll('.control-nav a').forEach(i => {
            if (item != i)
                i.classList.remove('active');
            else
                i.classList.add('active');
        })
    }
})

function startGame() {
    document.querySelector('.page1').style.display = 'none';
    document.querySelector('.page2').style.display = 'grid';
    console.log('game start');
    hitungSudut();
}

function rotating(t) {
    parents = t.value - 0;
    t.placeholder = t.value + '°';
    t.value = ''
    console.log(t.value)
    segitiga.style.transition = `.3s`;
    segitiga.style.transform = `translate(-50%) translateY(-50%) rotate(${parents}deg) `;
    setTimeout(() => {

        segitiga.style.transition = `none`;
    }, 300)

    let angel = parents * -1;

    document.getElementById('outH').style.transform = `translateX(100%) rotate(${angel}deg)`;
    document.getElementById('outW').style.transform = `translateY(100%) translate(-30%) rotate(${angel}deg)`;
    document.getElementById('outD').style.transform = `translateX(5%) rotate(${angel}deg)`;
    if (parents % 360 > 135 && parents % 360 < 305)
        document.getElementById('outS').style.transform = `translate(55%) rotate(180deg)`;
    else
        document.getElementById('outS').style.transform = `translate(55%) rotate(0deg)`;

}
function tutupMenu() {
    document.querySelector('.bcover').style.display = 'none';
    document.querySelector('.page2').style.filter = 'blur(0px)';
    document.querySelector('.cover').style.flter = 'blur(0px)';
}
function bukaMenu() {
    document.querySelector('.bcover').style.display = 'block';
    document.querySelector('.page2').style.filter = 'blur(2px)';
    document.querySelector('.cover').style.flter = 'blur(2px)';
    document.querySelector('.setting').style.opacity = '0';
    setTimeout(() => {
        document.querySelector('.setting').style.opacity = '1';
    }, 300)
}

function showContoh() {
    document.querySelector('.contoh').style.display = 'block';
    tutupMenu();
    document.querySelector('.contoh').style.opacity = 0;
    setTimeout(() => {
        document.querySelector('.contoh').style.opacity = 1;
    }, 300)
}
function hideContoh() {
    document.querySelector('.contoh').style.opacity = 0;
    setTimeout(() => {
        document.querySelector('.contoh').style.display = 'none';
    }, 300)
}