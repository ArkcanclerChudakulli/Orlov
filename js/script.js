//let audioPath = "audio/Robot/";
let audioPath = "audio/";
let brush_count = 0;
let mask_count = 0;
let micro_count = 0;

let round_count = 0;
let isRound = false;

function mirror(txt, speed = 20, color){
$( "#mirror_txt" ).replaceWith( '<marquee id="mirror_txt" class="font text-center align-middle ' + color + '" direction="up" scrolldelay="1" scrollamount="' + speed + '" behavior="slide"><font id="road_text">' + txt + '</font></marquee>' );
}

function brush(){
	if($('#play').is('[disabled]')){
		$('.game_button').prop('disabled', true);
		mirror(rounds[round_count].brush, 20, "green");
		$('#brush_count').html(++brush_count);
		playAudio(audioPath + round_count + "_brush.mp3");
		isRound = false;		
	}
}

function mask(){
	if($('#play').is('[disabled]')){
		$('.game_button').prop('disabled', true);
		mirror(rounds[round_count].mask, 20, "red");
		$('#mask_count').html(++mask_count);
		playAudio(audioPath + round_count + "_mask.mp3");
		isRound = false;
	}
}

function micro(){
	if($('#play').is('[disabled]')){
		$('.game_button').prop('disabled', true);
		mirror(rounds[round_count].micro, 20, "blue");
		$('#micro_count').html(++micro_count);
		playAudio(audioPath + round_count + "_micro.mp3");
		isRound = false;
	}
}

function play(){
	$('#play').prop('disabled', true);
	isRound = true;
	mirror(rounds[round_count].description, 20, rounds[round_count].color);
	playAudio(audioPath + round_count + ".mp3");
}

function playAudio(name){
	let audio = new Audio(name);
	audio.play();
	audio.onended = function() {
			if(round_count >= 4){
				$('#play').prop('disabled', false);
				$('#play').attr("onclick", "finalClip()");
				playVideo('#final');
			} else {
				if(isRound){
					$('.game_button').prop('disabled', false);
					$('#play').prop('disabled', true);
			} 	else {
					$('#plot').html(rounds[round_count++].next);
					$('#play').prop('disabled', false);
					checkFinal();
			}
		}
	};
}

function checkFinal(){
	if(round_count >= 4){
		$('#play').prop('disabled', false);
		$('#play').attr("onclick", "finalClip()");
		playVideo('#final');
	}
}

function playVideo(name){
	$('#play').click(function () {
	   var crab = $(name).get(0);
	   crab.addEventListener('ended', function() {
		   $('#final').hide();
		   $('#mirror').height(450);
		   $('#mirror').show();
			mirror('<br><span style="color:black">Программист, основной автор текстов: </span>Станислав Васильевский<br><br><span style="color:black">Тестировщик, режиссёр: </span>Анастасия Филиппова<br><br><span style="color:black">Роли озвучивали: </span>Станислав Васильевский, Анастасия Филиппова', 5, "blue");
		});
	   if (crab.paused) {
		   crab.play();
	   } else {
		   crab.pause();
	  }
	});
}

function finalClip(){
	$('#game').hide();
	$('#mirror').hide();
	$('#final').attr("src","video/final.mp4");
	$('#final').show();
}

function win(){
	mirror("Победа!", 20, 'green');
	$('#win').html(++win_count);
}

function lose(){
	mirror("Поражение!", 20, 'red');
	$('#lose').html(++lose_count);
	$('#hint').show();
}

function draw(){
	mirror("Ничья!", 20, 'blue');
	$('#hint').show();
}

function hint(){
	$('#hint').hide();
	mirror(rounds[round_count].round[current_opponent].hint, 20, rounds[round_count].round[current_opponent].color);
}

rounds = [
		{
			description : '"Андрей, у нас сегодня реванш против местной дворовой сборной: трёх старшеклассников, мальца с дедом и одного таджика. Как нам настроиться на победу?"',
			brush : '"Спокойно, ребя, сейчас сварганим фанатский плакат. Мне себя как лучше изобразить? Похожим на Месси или на Роналдо? Аня, подержишь плакат?"',
			mask: 'Сценически потерев подбородок, Андрей выпалил: "Нам необходимо больше точных "спокойных перепасовок" в средней части футбольного поля..."', 
			//направленных в основном на то, чтобы заставить игроков противника как можно больше бегать по полю, в попытках "отнять" мяч у тех, кто "перепасуется""',
			micro: 'Отопнув мяч с дороги, Андрей принялся лихо дирижировать и подпевать воодушевляющему хиту группы Queen.',
			next: 'После матча Андрей сел в машину и поехал...'
		},
		{
			description : 'Индикатор бензина жалобно замигал. Пришлось заехать на Лукойл. Вот только под руками не оказалось скидочной карты. Что делать?',
			brush : 'Так, возьмём похожую красно-белую карту от Максидома. Нужно тут чутка закрасить, а тут подрисовать. И быстро махнуть ей перед носом кассира!)',  
			mask: '"Что значит, нет карты - нет скидки? Да я же ваш постоянный клиент! Как кто? Ну, Андрей. Не помните что ли? А может ваш начальник помнит?"',
			micro: '"Вдруг как в карте вспомню я шифр. Было вроде девять там цифр. Три, пять, восемь и два нуля. Девятнадцать, со-рок!"',
			next: 'Заправив полный бак, Андрей поехал дальше, как вдруг...'
		},
		{
			description : '"Так-с... Желаю здравия! Я сержант Петров. Ваши документы!" - сказал сотрудник дорожного патруля. А документы-то дома остались. Что делать?',
			brush : 'Хорошо, что под руками оказались карандаш и бумага. Быстрый набросок портрета пришёлся сержанту по вкусу!',
			mask: 'Роль Джима Кэрри и блестящий монолог о том, как документы послужили закладкой для книги и были сданы в библиотеку, вызвал рукоплесканья сержанта!',
			micro: 'Трогательная песня о бравых защитниках спокойствия в погонах и их героической службе вызвала бурные аплодисменты сержанта!',
			next: 'Уладив заминку, Андрей, наконец, приехал на репетицию театра "Всерьёз, но Понарошку"'
		},
		{
			description : '"Так, Андрей, генрепа уже час как в разгаре!" - сказала ПомРеж театра ВНП. - "Караул! Мы опять ничего не успеваем. Подключайся скорей!"',
			brush : '"Что, господа концессионеры, декорации не успели нарисовать? Так это я мигом. Сейчас такого Сеятеля изображу, что Бендеру с Кисой и не снилось!"',
			mask: 'Вспомнив заветы Станиславского, Андрей вышел на середину сцены, упёр руки в бока, надул щёки - так чтобы все поверили, из какого он теста.',
			micro: '"Я удалый Колобок, Ничего на свете не боюсь, Я и строен, и высок, Весело смеюсь! Олари-лари-ларила-у-ха-хаха!"',
			next: "ФИНАЛ!!!"
		}
];

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function load(){
	mirror("<h1>С Днём Рождения, Андрей!</h1><i>Один день из жизни Андрея</i>");
}