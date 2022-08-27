const base = document.querySelector('.base'),
      timeScreen = document.querySelector('.time-screen'),
      button = document.querySelector('button'),
      timeScreenMin = document.querySelector('.time-screen_min'),  
      timeScreenSec = document.querySelector('.time-screen_sec'),
      title = document.querySelector('title'),
      buttonStart = document.querySelector('.start'),
      gameEnd = document.querySelector('.game_end'), 
      gameStop = document.querySelector('.game_stop'),   
      classError = document.querySelector('.error'), 
      buttonStop = document.querySelector('.stop');

let tomato = 1500000, // один рабочий томат
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

}



function start() {

    imgObjremuw();
    if (tomatoCounting === 10) {

        funGameEnd();
        funGameStop();

    } else if (countingInterval === 1) {

        setTimeoutZero = setTimeout(coffeeInterval, interval);
  
        obj.two3.classList.remove('dispnon');

        getZeroTimeSec( 04, 60 );
        getZeroTimeMin( 04 );

        funTitleTime(04, 60);

        timeScreenMin.innerHTML = '04';

    } else if (many === 4) {

        setTimeoutZero = setTimeout(timeoutLunch, interval);

        obj.two1.classList.remove('dispnon');

        getZeroTimeSec( 29, 60 );
        getZeroTimeMin( 29 );

        funTitleTime(29, 60);

        titleMin = 29;

        timeScreenMin.innerHTML = '29';

    } else if (many <= 3) { 
        
        setTimeoutZero = setTimeout( startTomato, tomato);

        obj.two2.classList.remove('dispnon');

        getZeroTimeSec( 24, 60 );
        getZeroTimeMin( 24 );

        funTitleTime(24, 60);

        titleMin = 24;

        timeScreenMin.innerHTML = '24';

    } else {

        funGameEnd();
        funError();

    }


    audioStartTimeoutLunch.stop();
    
    buttonStart.classList.add('dispnon');
    buttonStop.classList.remove('dispnon');

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

}



function coffeeInterval() {

    countingInterval = 0;

    imgObjremuw();

    audioStartCoffeeInterval.play();

    obj.two2.classList.remove('dispnon');

    buttonStart.classList.remove('dispnon');
    buttonStop.classList.add('dispnon');

    timeScreenMin.innerHTML = '25';

}



function timeoutLunch() {

    many = 0;
    countingInterval = 0;

    audioStartTimeoutLunch.play();

    buttonStart.classList.remove('dispnon');
    buttonStop.classList.add('dispnon');

    timeScreenMin.innerHTML = '25';

}



function imgObjremuw() {

    for (key in obj) { obj[key].classList.add('dispnon'); }

}



function funGameEnd() {

    return (
        gameEnd.classList.toggle('z5'),
        gameEnd.classList.toggle('z-10')
    )
    
}



function funError() {

    return classError.classList.toggle('dispnon')
    
}



function funGameStop() {

    return gameStop.classList.toggle('dispnon')

}



HTMLAudioElement.prototype.stop = function() {

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



function funTitleTime(min, sec) {
    
    title.innerHTML = `${getZeroNum(min)} : ${getZeroNum(sec)}`;

}



function getZeroTimeSec(min, sec) {

    getZeroSec = setInterval(()=>{

        --sec;

        if(sec > 0) {

            funTitleTime(min, sec);

        } else if(sec === 0) {

            sec = 60;
            --min;

        }
        
        timeScreenSec.innerHTML = getZeroNum(sec);

    }, second);
}



function getZeroTimeMin( min ) {

    getZeroMin = setInterval(()=>{

        --min;

        if(min === 0){
            
            setTimeout(()=>{
                clearInterval(getZeroSec);  
                timeScreenSec.innerHTML = '00';
                title.innerHTML = 'tomato-timer';

                console.log('STOP getZeroSec: ', getZeroMin);
            }, minute)

            clearInterval(getZeroMin);

        }

        timeScreenMin.innerHTML = getZeroNum(min);

    }, minute);
}