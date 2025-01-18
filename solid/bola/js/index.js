var count = 0;
let ditimbang = false;
const keranjang = document.querySelector('.keranjang');

document.querySelectorAll('.btn-group button').forEach(itm => {
    itm.addEventListener('mousedown', () => {

        itm.classList.add('active');
    })
    itm.addEventListener('mouseup', () => {
        itm.classList.remove('active');
    })
})
document.querySelectorAll('.add').forEach(itm => {
    itm.addEventListener('mousedown', () => {
        const sound = new Audio('./assets/sound/flip.wav');
        sound.play();
        itm.classList.add('active');
        setTimeout(() => {
            itm.classList.remove('active');
        }, 300)
    })
})


const point = {
    x: 80,
    y: 57,
    z: 45,
}

const mainCount = {
    x: 0,
    y: 0,
    z: 0,
}
const totalCount = [];
let ArrFn = [''];
function generateBall(ballName) {
    ditimbang = false;
    if (ArrFn.length > 3)
        return showNotif('Maksimal 3 persamaan')
    if (keranjang.querySelector('.chart3').children.length > 4)
        return showNotif('overload balls');

    const count = document.querySelectorAll('.ball.' + ballName).length;
    if (count > 2)
        return showNotif('Maksimal 3 bola untuk jenis ' + (ballName == 'pong' ? 'ping pong' : ballName));

    const ball = document.createElement('div');
    ball.classList.add('ball');
    ball.classList.add(ballName);
    ball.style.transform = ' translateY(-330%) translate(-5%) rotate(270deg)';
    if (keranjang.querySelector('.chart2').children.length > 4)
        keranjang.querySelector('.chart3').appendChild(ball);
    else if (keranjang.querySelector('.chart1').children.length > 4)
        keranjang.querySelector('.chart2').appendChild(ball);
    else
        keranjang.querySelector('.chart1').appendChild(ball);

    setTimeout(() => {
        ball.style.transform = ` translateY(20%) translate(0) rotate(-30deg)`;
        setTimeout(() => {
            ball.style.transform = ` translateY(20%) translate(0%) rotate(0deg)`;
        }, 1200)
    }, 300)

    document.querySelector('.berat').innerHTML = `--<span> gram</span>`;
    saveFn();
}

function timbang() {
    const sound = new Audio('./assets/sound/flip.wav');
    sound.play();
    const balls = {
        x: keranjang.querySelectorAll('.voli').length,
        y: keranjang.querySelectorAll('.tenis').length,
        z: keranjang.querySelectorAll('.pong').length,
    }
    const weight = (balls.x * point.x) + (balls.y * point.y) + (balls.z * point.z);

    const countNonZero = Object.values(balls).filter(value => value > 0).length;


    if (countNonZero > 1) {
        ditimbang = true;
        document.querySelector('.berat').innerHTML = `${weight} <span> gram</span>`;
        saveFn();
    }
    else {

        document.querySelector('.berat').innerHTML = `--<span> gram</span>`;
        showNotif('Minimal pilih 2 jenis bola untuk ditimbang');
        // alert('minimal 2 jenis bola')
    }
}

function gameStart() {
    const sound = new Audio('./assets/sound/flip.wav');
    sound.play();
    document.querySelector('.content').style.display = 'grid';
    document.querySelector('.wrapper').style.display = 'none';
}

document.querySelectorAll('.btn-groups button').forEach(e => {
    e.addEventListener('mousedown', () => {
        e.classList.add('active');
        setTimeout(() => {
            e.classList.remove('active');
        }, 500)
    })
})


window.onload = function () {

    document.querySelector('.calk').innerHTML = '';
}

function writeCalk(formula) {
    const math = `
    \\left\\{
        \\begin{array}{l}
        ${formula}
        \\end{array}
                    \\right.
                    `;

    katex.render(`${math}`, document.querySelector('.calk'), {
        throwOnError: false
    });
    if (count == 0) {
        document.querySelector('.vlist > span:nth-child(1)').style.opacity = 1;
    } else if (count == 1) {
        document.querySelector('.vlist > span:nth-child(1)').style.opacity = 0.6;
        document.querySelector('.vlist > span:nth-child(2)').style.opacity = 1;
    } else if (count == 2) {
        document.querySelector('.katex-html .vlist-r:nth-of-type(1) .mord').style.opacity = 0.6;
        document.querySelector('.katex-html .vlist > span:nth-of-type(2) .mord').style.opacity = 0.6;
    } else if (count == 3) {
        document.querySelector('.katex-html .vlist > span:nth-of-type(1) .mord').style.opacity = 1;
        document.querySelector('.katex-html .vlist > span:nth-of-type(2) .mord').style.opacity = 1;
    }

}
function closeNotif(t) {
    t.parentNode.style.opacity = 0;
    // t.parentNode.style.width = 0;
}

function showNotif(teks) {
    document.querySelector('.alert span').innerHTML = teks;
    document.querySelector('.alert').style.opacity = 1;

    setTimeout(() => {
        document.querySelector('.alert').style.opacity = 0;
    }, 5000)
}

function undo() {
    const sound = new Audio('./assets/sound/flip.wav');
    sound.play();
    ditimbang = false;
    let chart;
    if (keranjang.querySelector('.chart2').children.length > 0)
        chart = keranjang.querySelector('.chart2').lastElementChild;
    else
        chart = keranjang.querySelector('.chart1').lastElementChild;
    if (!chart)
        return showNotif('Belum ada bola pada timbangan')
    chart.style.transition = 'ease-in .5s';
    chart.style.transform = 'translateY(-500%)';
    showNotif('Bola dikembalikan...')
    setTimeout(() => {
        chart.remove();
        saveFn();
    }, 500)
    document.querySelector('.berat').innerHTML = `--<span> 9</span>`;
}

function reset() {
    const sound = new Audio('./assets/sound/flip.wav');
    sound.play();
    ditimbang = false;
    keranjang.querySelector('.chart1').innerHTML = ''
    keranjang.querySelector('.chart2').innerHTML = ''
    keranjang.querySelector('.chart3').innerHTML = ''

    document.querySelector('.berat').innerHTML = `--<span> gram</span>`;
    saveFn();
    showNotif('Timbangan diatur ulang...')
    // document.querySelector('.calk').innerHTML = '';
    // ArrFn = [];
}

function saveFn() {

    if (ArrFn.length > 3)
        return showNotif('Maksimal 3 persamaan dapat disimpan');
    const sound = new Audio('./assets/sound/flip.wav');
    sound.play();
    mainCount.x = document.querySelectorAll('.ball.voli').length
    mainCount.y = document.querySelectorAll('.ball.tenis').length
    mainCount.z = document.querySelectorAll('.ball.pong').length
    const countNonZero = Object.values(mainCount).filter(value => value > 0).length;
    const total = ditimbang ? ((mainCount.x * point.x) + (mainCount.y * point.y) + (mainCount.z * point.z)).toString() : '??';

    if (countNonZero < 1 && ArrFn.length < 2 && !!ArrFn[ArrFn.length - 1] == !!'    ')
        return document.querySelector('.calk').innerHTML = '';
    if (countNonZero > 1)
        ArrFn[ArrFn.length - 1] = (`${mainCount.x > 1 ? mainCount.x : ''}${mainCount.x > 0 ? 'x' : ''} ${mainCount.x > 0 && mainCount.y > 0 ? ' + ' : ' '}${mainCount.y > 1 ? mainCount.y : ''}${mainCount.y > 0 ? 'y' : ''}${mainCount.z > 0 && (mainCount.x > 0 || mainCount.y > 0) ? ' + ' : ' '}${mainCount.z > 1 ? mainCount.z : ''}${mainCount.z > 0 ? 'z' : ''} ${countNonZero < 1 ? '' : '= ' + total}`);
    else
        ArrFn[ArrFn.length - 1] = (`${mainCount.x > 1 ? mainCount.x : ''}${mainCount.x > 0 ? 'x' : ''} ${mainCount.x > 0 && mainCount.y > 0 ? ' + ' : ' '}${mainCount.y > 1 ? mainCount.y : ''}${mainCount.y > 0 ? 'y' : ''}${mainCount.z > 0 && (mainCount.x > 0 || mainCount.y > 0) ? ' + ' : ' '}${mainCount.z > 1 ? mainCount.z : ''}${mainCount.z > 0 ? 'z' : ''} ${countNonZero < 1 ? '' : '= ??'}`);

    writeCalk(ArrFn.join(`\\\\\\ `));


}
function rmLine() {

    if (ArrFn.length == 1)
        return showNotif('Belum ada persamaan yang disimpan')
    const sound = new Audio('./assets/sound/flip.wav');
    sound.play();
    ArrFn.pop();
    ditimbang = false;
    count--;
    totalCount.pop();
    if (ArrFn.length == 1)
        document.querySelector('.calk').innerHTML = '';
    // else
    saveFn();
    // reset();
    showNotif('Berhasil menghapus persamaan')
}
function simpanFn() {
    if (ArrFn.length > 3) {
        return showNotif('Maksimal 3 persamaan dapat disimpan');
    }
    else {
        const sound = new Audio('./assets/sound/flip.wav');
        sound.play();
        if (!ditimbang)
            return showNotif('Bola perlu ditimbang dulu')
        mainCount.x = document.querySelectorAll('.ball.voli').length
        mainCount.y = document.querySelectorAll('.ball.tenis').length
        mainCount.z = document.querySelectorAll('.ball.pong').length
        const countNonZero = Object.values(mainCount).filter(value => value > 0).length;
        if (countNonZero > 1) {
            ArrFn.push('');
            totalCount.push({ ...mainCount });
            count++;
            if (totalCount.length == 3) {
                const ex = totalCount.map(e => e.x);
                const ey = totalCount.map(e => e.y);
                const ez = totalCount.map(e => e.z);
                // console.log({ ex, ey, ez });

                if (!(ex.reduce((a, b) => a + b, 0) && ey.reduce((a, b) => a + b, 0) && ez.reduce((a, b) => a + b, 0))) {
                    count--;
                    totalCount.pop();
                    ArrFn.pop();
                    reset();
                    return showNotif(`bola ${ex.reduce((a, b) => a + b, 0) == 0 ? 'Voli' : ey.reduce((a, b) => a + b, 0) == 0 ? 'Tenis' : 'Ping-pong'} belum pernah ditimbang`)
                }
                else
                    saveFn();
            }
            if (ArrFn.length > 3) {
                document.querySelector('.katex-html .vlist > span:nth-of-type(1) .mord').style.opacity = 1;
                document.querySelector('.katex-html .vlist > span:nth-of-type(2) .mord').style.opacity = 1;
            }
            reset();
            return showNotif('Persamaan tersimpan!');
        }
        else
            return showNotif('Minimal timbang 2 jenis bola');

    }
}
window.onload = function () {

    katex.render(`x`, document.querySelector('.ex'))
    katex.render(`x`, document.querySelectorAll('.ex')[1])
    katex.render(`y`, document.querySelector('.ey'))
    katex.render(`y`, document.querySelectorAll('.ey')[1])
    katex.render(`z`, document.querySelector('.ez'))
    katex.render(`z`, document.querySelectorAll('.ez')[1])
}

document.querySelector('.inputGroup button').addEventListener('click', function () {

    this.classList.add('active');
    const inputs = document.querySelectorAll('.qcard input');

    if (inputs[0].value && inputs[1].value && inputs[2].value) {
        inputs[0].classList.remove('valid');
        inputs[1].classList.remove('valid');
        inputs[2].classList.remove('valid');

        const img = document.querySelector('.qcard img:nth-of-type(2)');
        img.style.transform = 'scale(0) rotate(-21deg)';
        let status = 0;

        if (point.x == inputs[0].value - 0) {
            inputs[0].classList.add('valid');
            status++;
        }
        else if (point.x != inputs[0].value - 0)
            inputs[0].classList.add('invalid')

        if (point.y == inputs[1].value - 0) {
            inputs[1].classList.add('valid');
            status++;
        }
        else if (point.y != inputs[1].value - 0)
            inputs[1].classList.add('invalid')

        if (point.z == inputs[2].value - 0) {
            inputs[2].classList.add('valid');
            status++;
        }
        else if (point.z != inputs[2].value - 0)
            inputs[2].classList.add('invalid')

        document.querySelector('.q-hint').classList.add('active');
        let strAudio = status < 3 ? 'w' : 'c';
        const sound = new Audio(`./assets/sound/${strAudio}.mp3`);
        sound.play();
        if (status < 3) {
            img.src = './assets/Wrong.png'
            document.querySelector('.q-hint').innerHTML = 'Silahkan periksa jawaban anda kembali!'
        }
        else {
            document.querySelector('.q-hint').innerHTML = 'Jawaban anda benar!'
            img.src = './assets/Correct.png'
        }

        // img.style.transform = 'scale(1) rotate(24deg)';
        // img.style.opacity = '1';
        setTimeout(() => {
            this.classList.remove('active');
            const img = document.querySelector('.qcard img:nth-of-type(2)');
            img.style.transform = 'scale(1) rotate(24deg) translateY(13%)';
            img.style.opacity = '1';

            setTimeout(() => {
                img.style.transform = 'scale(0.5) rotate(0deg) translateY(13%)';
                img.style.opacity = '0';

            }, 1200)
        }, 500)
    }


})

function openLatihan() {
    const sound = new Audio('./assets/sound/flip.wav');
    sound.play();
    if (ArrFn.length != 4)
        return showNotif('Simpan 3 Persamaan terlebih dulu')

    document.querySelector('.qcard .calk').innerHTML = document.querySelector('.desc .calk').innerHTML;
    const latihan = document.querySelector('.latihan');
    latihan.style.display = 'grid';
    document.querySelector('.qcard').style.transform = 'scale(0)';
    latihan.style.opacity = '1';
    setTimeout(() => {
        document.querySelector('.qcard').style.transform = 'scale(1)';
    }, 100)
}

function closeLatihan() {
    const sound = new Audio('./assets/sound/flip.wav');
    sound.play();
    const latihan = document.querySelector('.latihan');
    latihan.style.opacity = '0';
    document.querySelector('.qcard .calk').innerHTML = '';
    document.querySelectorAll('.inputGroup input').forEach(e => {
        e.value = '';
        e.classList.remove('valid')
        e.classList.remove('invalid')
    })
    const img = document.querySelector('.qcard img:nth-of-type(2)');
    img.style.transform = 'scale(0) rotate(-21deg)';


    document.querySelector('.q-hint').classList.remove('active');
    document.querySelector('.q-hint').innerHTML = ''

    setTimeout(() => {
        latihan.style.display = 'none';
    }, 500)
}

let index = 1;

function setImg() {
    if (index == 4)
        index = 0;
    index++;
    document.querySelector('.contoh img').src = `./assets/page${index}.png`
}
function setImgBack() {
    if (index == 1)
        index = 5;
    index--;
    document.querySelector('.contoh img').src = `./assets/page${index}.png`
}

function openContoh() {
    document.querySelector('.contoh').style.display = 'flex';
    document.querySelector('.contoh img').style.opacity = 0;
    setTimeout(() => {
        document.querySelector('.contoh img').style.opacity = 1;

    }, 100)
}
function closeContoh() {
    document.querySelector('.contoh img').style.opacity = 0;
    setTimeout(() => {

        document.querySelector('.contoh').style.display = 'none';
    }, 500)
}