const base = document.querySelector('.base'),
      timeScreen = document.querySelector('.time-screen'),
      button = document.querySelector('button'),
      timeScreenMin = document.querySelector('.time-screen_min'),  
      timeScreenSec = document.querySelector('.time-screen_sec'),
      title = document.querySelector('title'),
      buttonStart = document.querySelector('.start'),  
      buttonStop = document.querySelector('.stop');

let tomato = 1500000, // один рабочий томат
// let tomato = 2000,
//     interval = 1000,
//     timeout = 1500,  
 interval = 300000, // 5 минутный перерыв 
 timeout = 1800000, // получасовой перерыв
    second = 1000, 
    minute = 60000,
    many = 0,
    tomatoCounting = 0,
    countingInterval = 0,
    getZeroMin,
    getZeroSec,
    setTimeoutZero;


const obj = {
    two0 : document.getElementById('img_obj0'),
    two1 : document.getElementById('img_obj1'),
    two2 : document.getElementById('img_obj2'),
    two3 : document.getElementById('img_obj3')
};


buttonStart.addEventListener("click", start);

buttonStop.addEventListener("click", stop);


function stop() {
    clearTimeout(setTimeoutZero);
    clearInterval(getZeroMin);
    clearInterval(getZeroSec);

    buttonStart.classList.remove('dispnon');
    buttonStop.classList.add('dispnon');

    many = 0;
    tomatoCounting = 0;
    countingInterval = 0;

    console.log('stop', setTimeoutZero);
}




function start() {

    imgObjremuw();
    if (tomatoCounting === 10) {
        console.log("на сегодня хватит", tomatoCounting);

    } else if (countingInterval === 1) {
        setTimeoutZero = setTimeout(coffeeInterval, interval);
  
        obj.two3.classList.remove('dispnon');

        getZeroTimeSec( 60 );
        getZeroTimeMin( 05 );

    } else if (many === 4) {
        setTimeoutZero = setTimeout(timeoutLunch, interval);

        obj.two1.classList.remove('dispnon');

        getZeroTimeSec( 60 );
        getZeroTimeMin( 30 );

    } else if (many <= 3) { 
        setTimeoutZero = setTimeout( startTomato, tomato);

        obj.two2.classList.remove('dispnon');

        getZeroTimeSec( 60 );
        getZeroTimeMin( 25 );

        title.innerHTML = '25:00';

    } else {
        console.log("error");
    }


    audioStartTimeoutLunch.stop();
    
    buttonStart.classList.add('dispnon');
    buttonStop.classList.remove('dispnon');

    console.log('start', setTimeoutZero);
}






function startTomato() {

    ++many;
    ++tomatoCounting;
    ++countingInterval;

    audioStartTomato.play();
    
    imgObjremuw();
    
    obj.two3.classList.remove('dispnon');
    buttonStart.classList.remove('dispnon');
    buttonStop.classList.add('dispnon');

    timeScreenMin.innerHTML = '05';

    if(many === 4) {
        countingInterval = 0; 
        imgObjremuw();
        obj.two1.classList.remove('dispnon');
        timeScreenMin.innerHTML = '30';
    }

    console.log("startTomato", many, countingInterval, tomatoCounting, tomato);
}





function coffeeInterval() {

    countingInterval = 0;

    imgObjremuw();

    audioStartCoffeeInterval.play();

    obj.two2.classList.remove('dispnon');

    buttonStart.classList.remove('dispnon');
    buttonStop.classList.add('dispnon');

    timeScreenMin.innerHTML = '25';

    console.log("coffeeInterval", many, countingInterval, tomatoCounting, interval); 
}





function timeoutLunch() {

    many = 0;
    countingInterval = 0;

    audioStartTimeoutLunch.play();

    buttonStart.classList.remove('dispnon');
    buttonStop.classList.add('dispnon');

    timeScreenMin.innerHTML = '25';

    console.log("timeout :", many, countingInterval, tomatoCounting, timeout);
}





function imgObjremuw() {
    for (key in obj) { obj[key].classList.add('dispnon'); }
    console.log("imgObjremuw");
}





HTMLAudioElement.prototype.stop = function()
{
this.pause();
this.currentTime = 0.0;
}

function getZeroNum(num){
    if (num >= 0 && num < 10) { 
        return '0' + num;
    } else {
        return num;
    }
}



function getZeroTimeSec(sec) {
    getZeroSec = setInterval(()=>{

        --sec;

        if(sec === 0) {
            sec = 60;
        }
        
        timeScreenSec.innerHTML = getZeroNum(sec);

        // getZeroSec = setInterval(()=>{

        // }, minute);
        // title.innerHTML = `${mingetZeroNum(min)}`;

        console.log(getZeroSec);

    }, second);
}

function getZeroTimeMin(min) {
    getZeroMin = setInterval(()=>{

        --min;
        if(min === 0){
            
            setTimeout(()=>{
                clearInterval(getZeroSec);  
                timeScreenSec.innerHTML = '00';
                title.innerHTML = 'tomato-timer';
            }, minute)

            clearInterval(getZeroMin);
            
        }

        timeScreenMin.innerHTML = getZeroNum(min);

        console.log(getZeroMin);

    }, minute);
}