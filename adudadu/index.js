function clicked(t, x, y) {
    if (t.classList.contains('yellow')) {
        t.classList.remove('yellow')
        t.innerText = ``;
        t.style.transform = "rotateY(0deg)";
    }
    else {
        t.classList.add('yellow')
        t.innerText = `( ${x} , ${y} )`;
        // t.innerText = ``;
        t.style.transform = "rotateY(360deg)";
    }
    const rowHat = document.querySelector(`.row:nth-child(${x + 1}) .box:nth-child(1)`);
    const colHat = document.querySelector(`.row:nth-child(1) .box:nth-child(${y + 1})`);
    rowHat.style.transform = 'translate(-14px)';
    colHat.style.transform = 'translateY(-14px)';
    setTimeout(() => {
        colHat.style.transform = 'translateY(0px)';
        rowHat.style.transform = 'translate(0px)';
        console.log(rowHat)
    }, 500)
    console.log({ x, y })
    chanceChange(t, x, y)
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

const condition = [
    'jumlahnya kurang dari', // kurang dari
    'jumlahnya', //sama
    'ada bilangan', //ada
    'jumlahnya setidaknya', //setidaknya,
    'muncul bilangan yang sama',//equal
    'hasil kalinya genap',
    'hasil kalinya ganjil',
];


const peluang = document.getElementById('peluang');
const kunci = document.getElementById('kunci');
const jebakan = document.getElementById('jebakan');

function chanceChange(t, x, y) {
    const yellow = document.querySelectorAll('.yellow')
    const count = yellow.length;
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
    console.log(redundant)
    if (redundant == 0) {
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
    counter = localStorage.getItem('counterdadu') - 0 || 0;
    score = localStorage.getItem('scoredadu') - 0 || 0;
    if (counter > 20) {
        quest.innerHTML = ``;
        document.querySelectorAll('.wrapper-left button').forEach(item => {
            item.remove();
        });
        const stars = Math.ceil((cleanBenar / totalBenar) * 5);
        let indexStars = 0;
        console.log(stars)
        document.querySelector('.inner').innerHTML = `<h4 class="habis"><span style="font-size:120%">Selamat! Kamu telah berhasil memahami ruang sampel dengan baik!</span><br/><span id="rate" style="font-size:350%">
        ${Array(5).fill(0).map(e => indexStars++ < stars ? '&#9733;' : '&#9734;').join('')}
        </span><br/> <span style="font-size:100%">total jawaban benar ${cleanBenar} dari ${totalBenar}</span></h4 ><button class="reset" onclick="reset()" > Ulangi</button >`;

        localStorage.setItem('gameStart', false);
        return;
    }
    document.querySelectorAll('.skor button')[1].style.display = 'none';
    document.querySelectorAll('.skor button')[0].style.display = 'block';

    document.querySelector('#score').innerHTML = `${score} p`
    const r = randomized();
    currentCondition = r;
    console.log(r)
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
            e.style.background = 'rgba(88, 236, 47, 0.757)';
        })
        e.addEventListener('mouseleave', () => {
            setTimeout(() => {
                e.style.background = '';
            }, 300)
        })

    })
}
function checkAnswer() {
    const count = document.querySelectorAll('.yellow').length;
    if (count < 1)
        return alert('minimal pilih satu kotak!');
    counter++;
    let arrAnswer = (mappingDice(currentCondition.val, currentCondition.index));
    if (currentCondition.val2 != null)
        arrAnswer = [...arrAnswer, ...mappingDice(currentCondition.val2, currentCondition.index2)];
    console.log(arrAnswer);
    for (const item of arrAnswer) {
        const el = document.querySelector(`.row:nth-child(${item.A + 1}) .box:nth-child(${item.B + 1})`);
        // el.classList.add('yellow');
        // el.innerHTML = `${item.A} | ${item.B}`;
        if (!el.classList.contains('yellow') && !el.classList.contains('green')) {
            // el.innerHTML = "&#9873;";
            el.innerHTML = "&#10003;";
            el.classList.add('flag');
        }
        else {
            el.innerHTML = "&#10003;";
            el.classList.add('green');
            el.classList.remove('yellow');
        }
    }
    document.querySelectorAll('.yellow').forEach(e => {
        e.innerHTML = "&#10005;";
        e.classList.remove('yellow');
        e.classList.add('red');
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
    let currentScore = (answer.benar * 10) - (answer.salah * 5);

    // if (currentScore > 0)
    score += currentScore;

    localStorage.setItem('scoredadu', score);
    localStorage.setItem('counterdadu', counter);

    document.querySelector('#score').innerHTML = `${score} p`
    document.querySelector('#add').innerHTML = `${currentScore > -1 ? '+' : ''}${currentScore} p`;
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

function reset() {
    if (confirm('Poin akan direset kembali menjadi 0, Lanjut?')) {
        // start();
        document.location.reload()
    }
    else
        console.log('cancel reset');
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
    localStorage.setItem('scoredadu', 0);
    localStorage.setItem('counterdadu', 0);
    localStorage.setItem('gameStart', true);
    indexing();
    document.querySelector('#score').innerHTML = '0 p'
    document.querySelector('#add').innerHTML = '+0 p';
}
if (localStorage.getItem('gameStart') == 'true')
    indexing();

function quit() {
    if (confirm('yakin ingin keluar? Skor akan hilang jika melanjutkan')) {
        // document.querySelector('.right').innerHTML = `
        //  <h4 id="quest">Permainan belum dimulai</h4>
        // <div class="inner">
        //   <h1 class="habis">Selamat Datang</h1>

        //   <button class="reset" onclick="start()">Mulai</button>
        // </div>
        // `;
        // peluang.innerHTML = '??/36 (??%)';
        // benar.innerText = "??/??";
        // salah.innerText = ""
        localStorage.setItem('gameStart', false);
        // localStorage.setItem('scoredadu', 0);

        document.location.reload();
    }
}

