const cities = [
	{
		id: 0,
		name: 'Брест',
		imgUrl: "img/brest.jpg",
		description: 'Брестский Железнодорожный вокзал, построенный в 1883 году был назван лучшим в Российской империи',
	},
	{
		id: 1,
		name: 'Гродно',
		imgUrl: "img/grodno.jpg",
		description: 'Гродно — это самый быстрорастущий город в Беларуси в течение трех десятилетий',
	},
	{
		id: 2,
		name: 'Витебск',
		imgUrl: "img/vitebsk.jpg",
		description: 'Во времена Российской империи трамваи в Витебске появились раньше, чем в Москве и Санкт-Петербурге',
	},
	{
		id: 3,
		name: 'Могилев',
		imgUrl: "img/mogilev.jpg",
		description: 'Искусным могилевским кафелем, которым местные жители обкладывали печи в домах, выложены полы в московском Кремле',
	},
	{
		id: 4,
		name: 'Гомель',
		imgUrl: "img/gomel.jpg",
		description: 'Жители Гомельщины видят рассвет раньше всех в Беларуси',
	},
	{
		id: 5,
		name: 'Минск',
		imgUrl: "img/minsk.jpg",
		description: 'В Минске в два раза больше туманов чем в Лондоне',
	},
	{
		id: 6,
		name: 'Борисов',
		imgUrl: "img/borisov.jpg",
		description: 'На месте основания Борисова располагается храм, которому почти 150 лет',
	},
];

const body = document.querySelector('body');

const root = document.querySelector('.root');

let blocks = [...(document.getElementsByClassName('block'))];

const startScreen = document.createElement('div');
startScreen.classList.add('startScreen');
const title = document.createElement('h1');
title.textContent = 'GameOfBel';
const startButton = document.createElement('button');
startButton.classList.add('start');
startButton.textContent = 'СТАРТ';

const mainAnimation = document.querySelector('.mainAnimation');

const musicYes = document.querySelector('.musicYes');

const musicNo = document.querySelector('.musicNo');
const mainAudio = document.querySelector("#mainAudio");
const finalAudio = document.querySelector('#finalAudio');
finalAudio.volume= 0.15;

musicYes.onclick = function() {
	event.stopPropagation();
	if(mainAudio.paused) {
		mainAudio.play();
		musicYes.style.display = 'none';
		musicNo.style.display = 'block';
	}
};
musicNo.onclick = function() {
	event.stopPropagation();
	if(mainAudio.play) {
		mainAudio.pause();
		musicNo.style.display = 'none';
		musicYes.style.display = 'block';
	}
};
function finalMusic() {
	musicNo.style.display = 'none';
	musicYes.style.display = 'none';
	mainAudio.src="";
	finalAudio.play();
};
const wellMusic = document.querySelector('#wellMusic');
function wellAudio() {
	wellMusic.play();
	wellMusic.volume = 0.3;
};
const failMusic = document.querySelector('#failMusic');
function failAudio() {
   failMusic.play();
   failMusic.volume = 0.3;
};

startScreen.append(title, startButton);
root.append(startScreen);

const squareWrapper = document.createElement('div');
squareWrapper.classList.add('squareWrapper');

const mainSquare = document.createElement('div');
mainSquare.classList.add('mainSquare');

const moovingSquare = document.createElement('div');
moovingSquare.classList.add('moovingSquare');
squareWrapper.append(mainSquare, moovingSquare);
root.append(squareWrapper); 


const finalBlock = document.createElement('div');
finalBlock.classList.add('finalBlock');
const cityName = document.createElement('h2');

const cityDescription = document.createElement('p');

const buttonNext = document.createElement('button');
buttonNext.textContent = 'Давай ещё!';
buttonNext.classList.add('buttonNext');

const buttonFinal = document.createElement('button');
buttonFinal.textContent = 'ТЫ ВЫИГРАЛ!';
buttonFinal.classList.add('buttonFinal');

finalBlock.append(cityName, cityDescription, buttonNext, buttonFinal);
root.append(finalBlock); 

let a1X = mainSquare.getBoundingClientRect().x;
let secondCordMoovingSquare = 100;
let a2X = a1X + 500;

let wellDone = false;
let stopFail = false;
let mainCounter = 0;
let clickCounter = 0;

let randomes = [];



function randomBloks(){
	for ( let i = 0; i < 16; i++ ) {
	  let item = Math.floor(Math.random() * blocks.length);
	  randomes.push(blocks[item]);
	  blocks.splice(item, 1); 
	}
	  randomes.map(block => {
	  block.style.opacity = 0;
	  block.style.transition = "opacity 1.5s, visibility 0s linear 1.5s"; 
	})	
  }

function сhanger (mainCounter) {
	cities.map(city => {
		if(mainCounter === city.id) {
			body.style.backgroundImage = `url(${city.imgUrl})`;
			cityName.textContent = 	`${city.name}`;
			cityDescription.textContent = `${city.description}`;
		};
	});
};

function niceAlert() {
	swal({
	  title: "Все просто!",
	  text: "Твоя задача попасть меньшим квадратиком в больший",
	  confirmButtonText: "Погнали играть!",
	  confirmButtonColor: "#ffa600",
	  imageUrl: "img/potatoStart.png",
	  imageWidth: 400,
	  imageHeight: 350,
      imageAlt: "potato",
	});	
	let confirmButton = document.querySelector('.swal2-confirm');
	let swal2Container = document.querySelector('.swal2-container');
	swal2Container.onclick = function() {
		event.stopPropagation();
	}
	confirmButton.onclick = function() {
	  event.stopPropagation();
	  swal2Container.style.display = 'none';
	  moovingSquare.style.display = "block";
	  body.addEventListener("click", showBlocks);	
	} 
};
function whyNotUpsAlert() {
	if(clickCounter === 0 && stopFail === false) {
		upsAlert();
		failAudio();
	}
}
function upsAlert() {
	body.removeEventListener("click", showBlocks);
	swal({
		title: "УПС!",
		text: "А нет, не так уж это и просто",
		imageUrl: "img/potatoUps.png",
		imageWidth: 400,
		imageHeight: 350,
		imageAlt: "potato",
		confirmButtonText: "Еще раз",
		confirmButtonColor: "#ffa600",
	  });
	  let confirmButton = document.querySelector('.swal2-confirm');
	  let swal2Container = document.querySelector('.swal2-container');
	  swal2Container.onclick = function() {
		event.stopPropagation();
	}
	  confirmButton.onclick = function() {
		event.stopPropagation();
		swal2Container.style.display = 'none';
		moovingSquare.style.display = "block";	
		body.addEventListener("click", showBlocks);	
	  } 
}

startButton.onclick = function() {
	event.stopPropagation();
	mainAnimation.style.display = 'none';
	сhanger (mainCounter);
	startScreen.style.display = "none";
	niceAlert();
	interval(status);
	body.style.cursor = 'pointer';
};

function interval(status) {
	const intervalId = setInterval(function() {
		let b1X = moovingSquare.getBoundingClientRect().x;
	   let b2X = b1X + secondCordMoovingSquare;
	   if(a1X < b1X && a2X > b2X) {
		   wellDone = true;
	   } else {
		   wellDone = false;
	   };
	}, 25);
	 if (status === 'clear') {
		 clearInterval(intervalId);
	   };
   };

function allBlocksCovering() {
    randomes.map( block => {		
		block.style.opacity = 0.96;
		block.style.transition = "opacity 0s, visibility 0s linear 0s";
		block.style.backgroundColor = "#cdfafa";
		blocks = [...blocks, ...randomes];
		randomes = [];
	});
};

function showBlocks() {
if(wellDone === true) {
	clickCounter += 1;	
	wellAudio();
} else {
	clickCounter = 0;
	whyNotUpsAlert();
	allBlocksCovering();
	secondCordMoovingSquare = 100;
	moovingSquare.style.width = `${secondCordMoovingSquare}px`;
	moovingSquare.style.height = `${secondCordMoovingSquare}px`;
	moovingSquare.style.marginLeft = "-50px";
	moovingSquare.style.marginTop = "-50px";
};	

if(clickCounter === 1) {
	secondCordMoovingSquare = secondCordMoovingSquare + 50;
	moovingSquare.style.width = `${secondCordMoovingSquare}px`;
	moovingSquare.style.height = `${secondCordMoovingSquare}px`;
	moovingSquare.style.marginLeft =`-${secondCordMoovingSquare / 2}px`;
	moovingSquare.style.marginTop = `-${secondCordMoovingSquare / 2}px`;
	randomBloks();	 
} else if(clickCounter === 2) {
	secondCordMoovingSquare = secondCordMoovingSquare + 50;
	moovingSquare.style.width = `${secondCordMoovingSquare}px`;
	moovingSquare.style.height = `${secondCordMoovingSquare}px`;
	moovingSquare.style.marginLeft =`-${secondCordMoovingSquare / 2}px`;
	moovingSquare.style.marginTop = `-${secondCordMoovingSquare / 2}px`;
	randomBloks();
} else if(clickCounter === 3) {
	secondCordMoovingSquare = secondCordMoovingSquare + 50;
	moovingSquare.style.width = `${secondCordMoovingSquare}px`;
	moovingSquare.style.height = `${secondCordMoovingSquare}px`;
	moovingSquare.style.marginLeft =`-${secondCordMoovingSquare / 2}px`;
	moovingSquare.style.marginTop = `-${secondCordMoovingSquare / 2}px`;
	randomBloks();
} else if(clickCounter === 4) {
	secondCordMoovingSquare = secondCordMoovingSquare + 50;
	moovingSquare.style.width = `${secondCordMoovingSquare}px`;
	moovingSquare.style.height = `${secondCordMoovingSquare}px`;
	moovingSquare.style.marginLeft =`-${secondCordMoovingSquare / 2}px`;
	moovingSquare.style.marginTop = `-${secondCordMoovingSquare / 2}px`;
	randomBloks();
} else if(clickCounter === 5) {
	secondCordMoovingSquare = secondCordMoovingSquare + 50;
	moovingSquare.style.width =  `${secondCordMoovingSquare}px`;
	moovingSquare.style.height =  `${secondCordMoovingSquare}px`;
	moovingSquare.style.marginLeft =`-${secondCordMoovingSquare / 2}px`;
	moovingSquare.style.marginTop = `-${secondCordMoovingSquare / 2}px`;
	randomBloks();
} else if(clickCounter === 6) {
	body.removeEventListener("click", showBlocks);
	interval('clear');
	randomBloks();
	mainSquare.style.display = "none";
	moovingSquare.style.display = "none"; 
	finalBlock.style.display = 'flex';
	if(mainCounter > 5) {
	finalMusic(); 
		buttonNext.style.display = 'none';
		buttonFinal.style.display = 'flex';
		const potatoFinal = document.querySelector('.potatoFinal');
		potatoFinal.style.display = 'block';
		const dancePotato = document.querySelector('.dancePotato');
		dancePotato.style.display = 'block';
	}
	finalBlock.style.opacity = 1;
	finalBlock.style.transition = "opacity 1.5s, visibility 0s linear 1.5s";
  };	
};

buttonNext.onclick = function() {
	stopFail = true;
	setTimeout(() => stopFail = false, 10);
	body.addEventListener("click", showBlocks);
	if(mainCounter <= 6) {
		finalBlock.style.opacity = 0;
		finalBlock.style.transition = "opacity 0s, visibility 0s linear 0s";
		finalBlock.style.display = 'none';
		mainCounter += 1;
		clickCounter = 0;
		сhanger (mainCounter);
		mainSquare.style.display = "block";
		moovingSquare.style.display = "block";
	} 
};

 body.onclick = function effect (e) { 

	if(wellDone === true) {

	let amount = 60;
	if (e.clientX === 0 && e.clientY === 0) {
		const bbox = e.target.getBoundingClientRect();
		const x = bbox.left + bbox.width / 2;
		const y = bbox.top + bbox.height / 2;
		for (let i = 0; i < 60; i++) {
			createParticle(x, y);
		}
		} else {
		for (let i = 0; i < amount; i++) {
			createParticle(e.clientX, e.clientY);
		}
	}
  }
}   
  function createParticle (x, y) {
	const particle = document.createElement('particle');
	document.body.appendChild(particle);
	let width = Math.floor(Math.random() * 30 + 8);
	let height = width;
	let destinationX = (Math.random() - 0.5) * 800;
	let destinationY = (Math.random() - 0.5) * 800;
	let rotation = Math.random() * 520;
	let delay = Math.random() * 100;
	
		
		var color = `hsl(${Math.random() * 50 + 720}, 100%, 50%)`; // Цвет 
		particle.style.boxShadow = `0 0 ${Math.floor(Math.random() * 5 + 10)}px ${color}`; // Тень
		particle.style.background = color;
		particle.style.borderRadius = '10%'; // Радиус
		width = height = Math.random() * 70 + 5; // Размеры
		
	
	particle.style.width = `${width}px`;
	particle.style.height = `${height}px`;
	const animation = particle.animate([
		{
			transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(0deg)`,
			opacity: 1
		},
		{
			transform: `translate(-50%, -50%) translate(${x + destinationX}px, ${y + destinationY}px) rotate(${rotation}deg)`,
			opacity: 0
		}
		], {
		duration: Math.random() * 1000 + 1000, // Продолжительность всех эффектов
		easing: 'cubic-bezier(0, .9, .57, 1)',
		delay: delay
	});
	animation.onfinish = removeParticle;
  }
  function removeParticle (e) {
	e.srcElement.effect.target.remove();
  }

