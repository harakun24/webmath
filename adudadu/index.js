let statusClick = true;
const soundStart = new Audio('./Aset/sound/fclick.wav');

let pCounter = 0;
function clicked(t, x, y) {
    const soundFlip = new Audio('./Aset/sound/flip.wav');
    // const soundFlip = new Audio('./Aset/sound/flip2.wav');

    soundFlip.play();
    t.innerText = `( ${x} , ${y} )`;
    t.style.transform = "rotateY(360deg)";

    // if (t.classList.contains('yellow')) {
    //     t.classList.remove('yellow')
    //     t.innerText = ``;
    //     t.style.transform = "rotateY(0deg)";
    // }
    // else {
    //     t.classList.add('yellow')
    //     // t.innerText = ``;
    // }
    // const rowHat = document.querySelector(`.row:nth-child(${x + 1}) .box:nth-child(1)`);
    // const colHat = document.querySelector(`.row:nth-child(1) .box:nth-child(${y + 1})`);
    // rowHat.querySelector('img').src = `./Aset/merah${x}.png`;
    // colHat.querySelector('img').src = `./Aset/merah${y}.png`;
    // rowHat.style.transform = 'translate(-14px)';
    // colHat.style.transform = 'translateY(-14px)';
    // setTimeout(() => {
    //     colHat.style.transform = 'translateY(0px)';
    //     rowHat.style.transform = 'translate(0px)';
    //     setTimeout(() => {
    //         rowHat.querySelector('img').src = `./Aset/putih${x}.png`;
    //         colHat.querySelector('img').src = `./Aset/putih${y}.png`;
    //         statusClick = true;
    //     }, 200)
    // }, 100)

    let arrAnswer = (mappingDice(currentCondition.val, currentCondition.index));
    if (currentCondition.val2 != null)
        arrAnswer = [...arrAnswer, ...mappingDice(currentCondition.val2, currentCondition.index2)];

    let status = false;
    for (const item of arrAnswer) {
        if ((item.A == x && item.B == y) || (item.A == y && item.B == x)) {
            status = true;
            break;
        }
    }
    let breaker = t.classList.contains('green') || t.classList.contains('red') ? true : false;
    if (status)
        t.classList.add('green')
    else
        t.classList.add('red')

    const rowHat = document.querySelector(`.row:nth-child(${x + 1}) .box:nth-child(1)`);
    const colHat = document.querySelector(`.row:nth-child(1) .box:nth-child(${y + 1})`);
    rowHat.querySelector('img').src = `./Aset/merah${x}.png`;
    colHat.querySelector('img').src = `./Aset/merah${y}.png`;
    rowHat.style.transform = 'translate(-14px)';
    colHat.style.transform = 'translateY(-14px)';
    setTimeout(() => {
        colHat.style.transform = 'translateY(0px)';
        rowHat.style.transform = 'translate(0px)';
        setTimeout(() => {
            rowHat.querySelector('img').src = `./Aset/putih${x}.png`;
            colHat.querySelector('img').src = `./Aset/putih${y}.png`;
        }, 200)
    }, 100)
    chanceChange(breaker, x, y)


}
// black start 9733, white 9734
const quest = document.querySelector('#quest');
const answer = {
    benar: 0,
    salah: 0,
    all: 0
}
let score;
let counter;
let currentCondition;
let totalBenar = 0;
let cleanBenar = 0;
let level = localStorage.getItem('leveldadu') - 0 || 0;

const condition = [
    'jumlahnya kurang dari', // kurang dari
    'jumlahnya', //sama
    'ada bilangan', //ada
    'jumlahnya minimal', //setidaknya,
    'muncul bilangan yang sama',//equal
    'hasil kalinya genap',
    'hasil kalinya ganjil',
];


const peluang = document.getElementById('peluang');
const kunci = document.getElementById('kunci');
const jebakan = document.getElementById('jebakan');

function chanceChange(t, x, y) {
    if (t)
        return;
    let count = ++pCounter;
    peluang.innerHTML = `${count}`;
    // yellow.forEach(item => {
    //     item.innerHTML = `${x} , ${y}`
    // })
}

function randomized() {
    let result;
    let val;
    const index = Math.floor(Math.random() * (condition.length));
    if (index == 0)
        val = Math.floor(Math.random() * (12 - 4 + 1) + 4);
    else if (index == 1 || index == 3)
        val = Math.floor(Math.random() * (12 - 3 + 1) + 3);
    else if (index == 2)
        val = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    else
        val = Math.floor(Math.random() * 12)
    const redundant = Math.floor(Math.random() * 100) % 2;
    if (redundant == 0 && level > 4) {
        let val2;
        let index2 = Math.floor(Math.random() * (condition.length));
        while (index2 == index)
            index2 = Math.floor(Math.random() * (condition.length));
        if (index2 == 0)
            val2 = Math.floor(Math.random() * (12 - 4 + 1) + 4);
        else if (index2 == 1 || index2 == 3)
            val2 = Math.floor(Math.random() * (12 - 2 + 1) + 2);
        else if (index2 == 2)
            val2 = Math.floor(Math.random() * (6 - 1 + 1) + 1);
        else
            val2 = Math.floor(Math.random() * 12)
        result = { val, index, val2, index2 }
    }
    else
        result = { val, index, val2: null, index2: null };
    return result;
}
function indexing() {
    const soundIndex = new Audio('./Aset/sound/mm.wav');
    soundIndex.play();

    document.querySelector('#quest').classList.add('active')
    counter = localStorage.getItem('counterdadu') - 0 || 0;
    score = localStorage.getItem('scoredadu') - 0 || 0;
    level = localStorage.getItem('leveldadu') - 0 || 0;
    pCounter = 0;
    document.querySelector('#peluang').innerHTML = pCounter;
    if (document.querySelector('.quit').classList.contains('pass'))
        document.querySelector('.quit').classList.remove('pass');
    if (counter > 4 + (level * 5)) {
        document.querySelector('.board .peluang').classList.remove('active');
        // if (counter > 2) {

        localStorage.setItem('leveldadu', level);
        quest.innerHTML = ``;
        document.querySelector('#quest').classList.remove('active')
        document.querySelectorAll('.wrapper-left button').forEach(item => {
            item.remove();
        });
        const stars = Math.ceil(score / (counter * 10) * 5);
        let indexStars = 0;
        let msgHeader = stars > 3 ? 'Selamat! poin mencukupi untuk bisa naik level!' : stars > 0 ? 'Poin belum mencukupi untuk naik level. ulangi untuk mengumpulkan lebih banyak poin' : 'Jangan patah semangat! coba lagi.';
        let msgBtn = stars > 3 ? '<button class="reset" onclick="reset()" > Ulangi level </button ><button class="reset" onclick="reset(true)" > Naik level </button >' : '<button class="reset" onclick="reset()" style="opacity:0"> Ulangi level </button ><button class="reset" onclick="reset()" > Ulangi level </button >';

        document.querySelector('.inner').innerHTML = `<h4 class="habis">${msgHeader}<span style="font-size:120%"></span><br/><span id="rate" style="font-size:350%">
        ${Array(5).fill(0).map(e => indexStars++ < stars ? '&#9733;' : '&#9734;').join('')}
        </span><br/> <span style="font-size:100%">Total poin : ${score} dari ${counter * 10} poin</span></h4 ><div class='btn-reset'>${msgBtn}</div>`;

        localStorage.setItem('gameStart', false);
        return;
    }
    if (!document.querySelector('.board .peluang').classList.contains('.active'))
        document.querySelector('.board .peluang').classList.add('active');

    document.querySelector(".banner h2").innerHTML = `Level ${level + 1}`;
    document.querySelectorAll('.skor button')[1].style.display = 'none';
    document.querySelectorAll('.skor button')[0].style.display = 'block';

    document.querySelector('#add').innerHTML = `${score} poin`
    const r = randomized();
    currentCondition = r;
    let strText = `${counter + 1}. Peluang ${condition[r.index]} ${r.index < 4 ? r.val : ''}`;
    if (r.val2)
        strText += ` atau ${condition[r.index2]} ${r.index2 < 4 ? r.val2 : ''}`
    quest.innerText = strText;

    localStorage.setItem('counterdadu', counter)

    document.getElementById('benar').innerHTML = `??`;
    document.getElementById('lewat').innerHTML = `??`;
    document.getElementById('salah').innerHTML = `??`;
    peluang.innerHTML = `0`;
    kunci.innerHTML = `??`;
    jebakan.innerHTML = `??`;
    document.querySelector('.inner').innerHTML = `<div class="row">
            <div class="box"></div>
            <div class="box"><img src="./Aset/putih1.png" alt=""></div>
            <div class="box"><img src="./Aset/putih2.png" alt=""></div>
            <div class="box"><img src="./Aset/putih3.png" alt=""></div>
            <div class="box"><img src="./Aset/putih4.png" alt=""></div>
            <div class="box"><img src="./Aset/putih5.png" alt=""></div>
            <div class="box"><img src="./Aset/putih6.png" alt=""></div>
            </div>
            <div class="row">
            <div class="box"><img src="./Aset/putih1.png" alt=""></div>
            <div class="box" onclick="clicked(this,1,1)"></div>
            <div class="box" onclick="clicked(this,1,2)"></div>
            <div class="box" onclick="clicked(this,1,3)"></div>
            <div class="box" onclick="clicked(this,1,4)"></div>
            <div class="box" onclick="clicked(this,1,5)"></div>
            <div class="box" onclick="clicked(this,1,6)"></div>
          </div>
          <div class="row">
            <div class="box"><img src="./Aset/putih2.png" alt=""></div>
            <div class="box" onclick="clicked(this,2,1)"></div>
            <div class="box" onclick="clicked(this,2,2)"></div>
            <div class="box" onclick="clicked(this,2,3)"></div>
            <div class="box" onclick="clicked(this,2,4)"></div>
            <div class="box" onclick="clicked(this,2,5)"></div>
            <div class="box" onclick="clicked(this,2,6)"></div>
            </div>
            <div class="row">
            <div class="box"><img src="./Aset/putih3.png" alt=""></div>
            <div class="box" onclick="clicked(this,3,1)"></div>
            <div class="box" onclick="clicked(this,3,2)"></div>
            <div class="box" onclick="clicked(this,3,3)"></div>
            <div class="box" onclick="clicked(this,3,4)"></div>
            <div class="box" onclick="clicked(this,3,5)"></div>
            <div class="box" onclick="clicked(this,3,6)"></div>
            </div>
            <div class="row">
            <div class="box"><img src="./Aset/putih4.png" alt=""></div>
            <div class="box" onclick="clicked(this,4,1)"></div>
            <div class="box" onclick="clicked(this,4,2)"></div>
            <div class="box" onclick="clicked(this,4,3)"></div>
            <div class="box" onclick="clicked(this,4,4)"></div>
            <div class="box" onclick="clicked(this,4,5)"></div>
            <div class="box" onclick="clicked(this,4,6)"></div>
            </div>
            <div class="row">
            <div class="box"><img src="./Aset/putih5.png" alt=""></div>
            <div class="box" onclick="clicked(this,5,1)"></div>
            <div class="box" onclick="clicked(this,5,2)"></div>
            <div class="box" onclick="clicked(this,5,3)"></div>
            <div class="box" onclick="clicked(this,5,4)"></div>
            <div class="box" onclick="clicked(this,5,5)"></div>
            <div class="box" onclick="clicked(this,5,6)"></div>
            </div>
            <div class="row">
            <div class="box"><img src="./Aset/putih6.png" alt=""></div>
            <div class="box" onclick="clicked(this,6,1)"></div>
            <div class="box" onclick="clicked(this,6,2)"></div>
            <div class="box" onclick="clicked(this,6,3)"></div>
            <div class="box" onclick="clicked(this,6,4)"></div>
            <div class="box" onclick="clicked(this,6,5)"></div>
            <div class="box" onclick="clicked(this,6,6)"></div>
          </div>`;
    document.querySelectorAll('.row:not(:nth-child(1)) .box:not(:nth-child(1))').forEach(e => {
        e.addEventListener('mouseenter', () => {
            e.style.background = 'rgba(245, 245, 12, 0.795)';
        })
        e.addEventListener('mouseleave', () => {
            setTimeout(() => {
                e.style.background = '';
            }, 300)
        })

    })
}
function checkAnswer() {
    const soundIndex = new Audio('./Aset/sound/menyuu.wav');
    soundIndex.play();
    if (pCounter < 1)
        return alert('minimal pilih satu kotak!');
    counter++;
    let arrAnswer = (mappingDice(currentCondition.val, currentCondition.index));
    if (currentCondition.val2 != null)
        arrAnswer = [...arrAnswer, ...mappingDice(currentCondition.val2, currentCondition.index2)];

    for (const item of arrAnswer) {
        const el = document.querySelector(`.row:nth-child(${item.A + 1}) .box:nth-child(${item.B + 1})`);

        if (!el.classList.contains('yellow') && !el.classList.contains('green')) {
            el.innerHTML = "&#10003;";
            el.classList.add('flag');
        }
        else {
            el.innerHTML = "&#10003;";
            el.classList.add('green');
            el.classList.remove('yellow');
        }
    }
    document.querySelectorAll('.red').forEach(e => {
        e.innerHTML = "&#10005;";
    })
    document.querySelectorAll('.row:not(:nth-child(1)) .box:not(:nth-child(1)):not(.red):not(.yellow):not(.green):not(.flag)').forEach(e => {
        e.innerHTML = "&#10005;";
        // e.classList.remove('yellow');
        e.classList.add('null');
    })

    document.querySelectorAll('.box').forEach(e => {
        e.onclick = null;
    })
    answer.benar = document.querySelectorAll('.green').length;
    answer.salah = document.querySelectorAll('.red').length;
    answer.all = answer.benar + document.querySelectorAll('.flag').length;

    document.getElementById('benar').innerHTML = `${answer.benar}`;
    document.getElementById('lewat').innerHTML = `${answer.all - answer.benar}`;
    document.getElementById('salah').innerHTML = `${answer.salah}`;

    totalBenar += answer.all;
    cleanBenar += answer.benar;
    kunci.innerHTML = `${answer.all}`;
    jebakan.innerHTML = `${36 - answer.all}`;
    // let currentScore = (answer.benar * 10) - (answer.salah * 5);
    // let currentScore = answer.salah < 1 ? (answer.all - answer.benar < 1 ? 10 : 0) : 0;
    // let currentScore = Math.ceil(answer.benar / answer.all * 10) - Math.ceil(answer.salah / 36 * 3);
    let currentScore = answer.all - answer.benar == 0 ? 10 : 0;

    // if (currentScore > 0)
    score += currentScore;

    localStorage.setItem('scoredadu', score);
    localStorage.setItem('counterdadu', counter);

    document.querySelector('#add').innerHTML = `${score} poin`
    // document.querySelector('#add').innerHTML = `${currentScore > -1 ? '+' : ''}${currentScore} poin`;
    document.querySelectorAll('.skor button')[0].style.display = 'none';
    document.querySelectorAll('.skor button')[1].style.display = 'block';
}

function mappingDice(val, index) {
    const arrAnswer = [];
    let diceA = [1, 2, 3, 4, 5, 6];
    let diceB = [1, 2, 3, 4, 5, 6];
    for (let i = 0; i < diceA.length; i++)
        for (let j = 0; j < diceB.length; j++)
            switch (index) {
                case 0:
                    if (diceA[i] + diceB[j] < val)
                        arrAnswer.push({ A: diceA[i], B: diceB[j] })
                    break;
                case 1:
                    if (diceA[i] + diceB[j] == val)
                        arrAnswer.push({ A: diceA[i], B: diceB[j] })
                    break;
                case 2:
                    if (diceA[i] == val || diceB[j] == val)
                        arrAnswer.push({ A: diceA[i], B: diceB[j] })
                    break;
                case 3:
                    if (diceA[i] + diceB[j] >= val)
                        arrAnswer.push({ A: diceA[i], B: diceB[j] })
                    break;
                case 4:
                    if (diceA[i] == diceB[j])
                        arrAnswer.push({ A: diceA[i], B: diceB[j] })
                    break;
                case 5:
                    if ((diceA[i] * diceB[j]) % 2 == 0)
                        arrAnswer.push({ A: diceA[i], B: diceB[j] })
                    break;
                case 6:
                    if ((diceA[i] * diceB[j]) % 2 == 1)
                        arrAnswer.push({ A: diceA[i], B: diceB[j] })
                    break;
            }
    return arrAnswer;
}
// indexing();

function reset(status = false) {
    let sttr = status ? '+5 Soal untuk level berikutnya, Lanjut?' : 'Soal akan dimulai dari awal, Lanjut?'
    if (confirm(sttr)) {
        // start();
        if (status)
            localStorage.setItem('leveldadu', ++level)
        document.location.reload()
    }
}

function isAnswer() {
    document.querySelector('.dialog').style.display = 'grid';
    document.querySelector('.card').style.transform = 'scale(0%)';
    setTimeout(() => {
        document.querySelector('.card').style.transform = 'none';

    }, 200);
    document.querySelector('.wrapper').style.filter = 'blur(5px)';
}
function notReady() {
    document.querySelector('.dialog').style.display = 'none';
    document.querySelector('.wrapper').style.filter = 'none';
}

function start() {
    soundStart.play();
    localStorage.setItem('scoredadu', 0);
    localStorage.setItem('counterdadu', 0);
    localStorage.setItem('gameStart', true);
    indexing();
    document.querySelector('#score').innerHTML = '0 poin'
    document.querySelector('#add').innerHTML = '0 poin';
}
if (localStorage.getItem('gameStart') == 'true')
    indexing();

function quit() {
    soundStart.play();
    if (confirm('yakin ingin keluar? Level anda akan direset')) {
        document.querySelector('.quit').classList.add('pass');
        soundStart.play();
        localStorage.setItem('gameStart', false);
        localStorage.setItem('leveldadu', 0);

        // level = 0;

        document.location.reload();
    }
}

if (level > 0)
    document.querySelector('.habis').innerHTML = `Level ${level + 1}`
if (level == 9999)
    level--;


if (level > 10)
    document.querySelector('.inner').innerHTML = `<h4 class="habis"><span style="font-size:120%">Game telah Tamat!</span><br/><span id="rate" style="font-size:350%">
        ${Array(5).fill(0).map(e => '&#9733;').join('')}
        </span><br/> <span style="font-size:100%">Selamat anda telah berhasil menamatkan simulasi ruang sampel</span></h4 ><div class='btn-reset'><button class="reset" onclick="quit()" > Ulangi lv. 1 </button ><button class="reset" onclick="quit(true)" > Keluar </button ></div>`;