window.onload = function()
{
	window.requestAnimFrame = (function(callback) {
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
			function(callback) {
			window.setTimeout(callback, 1000 / 60);
			};
			})();
	
	window.onbeforeunload = function (e) {
    var e = e || window.event;

    // For IE and Firefox
    if (e) {
        e.returnValue = 'Προσοχή! Όλες οι επιλογές και το σκορ σας θα χαθούν.';
    }

    // For Safari
    return 'Προσοχή! Όλες οι επιλογές και το σκορ σας θα χαθούν.';
	};
	
	
	x = 0;
	y = -300;
	speed = 5;
	//angle = 0;
	mod = 0;
	score=0;
	question_no=1;
	move_flag=1;
	click_once=true;
	dogx=750;
	dogy=-80;
	rainx=0;
	rainy=-800;
	lx=380;
	ly=-250;
	busx=380;
	busy=-230;
	car_comming_x=200;
	car_comming_y=-150;
	drive_sound=new Audio();
	drive_sound.src='sounds/inside.mp3';
	correct_sound=new Audio();
	correct_sound.src='sounds/correct.mp3';
	wrong_sound=new Audio();
	wrong_sound.src='sounds/wrong.mp3';
	//stay_sound=new Audio();
	//stay_sound.src='sounds/inside.mp3';
	allow_sounds=true;
	fx=0;
	fy=-50;
		
	//real_speed=120;

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	lines = new Image();
    lines.src="\images/lines.png";
	car = new Image();
    car.src="\images/car.png";
	car_comming= new Image();
    car_comming.src="\images/car2.png";
	dog = new Image();
    dog.src="\images/dog.png";
	rain=new Image();
    rain.src="\images/rain.png";
	lakouva=new Image();
    lakouva.src="\images/lakouva.png";
	bus = new Image();
    bus.src="\images/bus.png";
	busstop = new Image();
    busstop.src="\images/busstop.png";
	s1 = new Image();
    s1.src="\images/shma1.png";
	s2 = new Image();
    s2.src="\images/shma2.png";
	bluep = new Image();
    bluep.src="\images/bper.png";
	redp = new Image();
    redp.src="\images/rper.png";
	yellowp = new Image();
    yellowp.src="\images/yper.png";
	finish = new Image();
    finish.src="\images/finish.png";
	//people_flag=0;
	
	
    window.addEventListener("keydown", keypress_handler, false);
    window.addEventListener("keyup", keyup_handler, false);

	var move = setInterval(function()
	{
		draw();
		show_score_speed();

		
	}, 30);
	
	
	//localStorage.setItem('scr',score);
	
};

function draw()
{
	context = canvas.getContext("2d");
	context.clearRect(0, 0, 700, 600);
	context.drawImage(car,400,450,car.width,car.height);
	
	
	//context.fillStyle = "rgb(200, 100, 220)";
	//context.fillRect(50, 50, 100, 100);
	//x += (speed*mod);
	y += (speed*mod);
	car_comming_y+=(20*mod);
	dogx-=(9*mod);
	dogy+=(5*mod);
	
	
	if(allow_sounds && question_no!=-1)
	{
		if(mod==1)
		{
			drive_sound.play();
		}
		else
		{
			drive_sound.pause();
		}
	
	}
	//document.getElementById("sound").innerHTML = '<img src=\"images/no_sound.png\"></img>';
	if(y==0)
	{
		y=-300;
		//question_no++;
		
	}
	
	//document.getElementById("agent_talk").style.display='block';
	//document.getElementById("agent_talk").innerHTML = 'Πολύ σωστά! Έπρεπε να χτυπήσεις το ζώο.';
	context.save();
	//context.translate(x, y);
	//context.rotate(Math.PI/180 * angle);
	if(y>-100 && y<-90)
	{
		move_flag=0;
		document.getElementById("agent_talk").style.display = 'block';
		if(question_no==1 && click_once)
			document.getElementById("agent_talk").innerHTML = '<p>Τα ελαστικά σου είναι σε <font color=\"red\">καλή</font> κατάσταση. Πώς θα αντιδράσεις;</p>';
		else if(question_no==2 && click_once)
			document.getElementById("agent_talk").innerHTML = '<p>Τα ελαστικά σου είναι σε <font color=\"red\">κακή</font> κατάσταση. Πώς θα αντιδράσεις;</p>';
		else if(question_no==3 && click_once)
			document.getElementById("agent_talk").innerHTML = '<p>Το λεωφορείο μόλις σταμάτησε στη στάση. Πώς θα αντιδράσεις;</p>';
		else
			document.getElementById("agent_talk").style.display='none';
		//show_options();
		//question();
		//question_no++;
	}
	//context.drawImage(lines,x,y,lines.width,lines.height);	
	if(question_no==1)
	{	
		context.drawImage(car_comming,car_comming_x,car_comming_y,car_comming.width,car_comming.height);	
		context.drawImage(lines,x,y,lines.width,lines.height);
		context.drawImage(dog,dogx,dogy,dog.width,dog.height);
		if(y<-290)
		{
			context.rect(0, 0, 700, 600);		
			context.fillStyle = "rgba(50, 50, 50, 0.8)";
			context.fill();
			context.font="20px Calibri";
			context.fillStyle = "rgba(255, 255, 255,1)";
			context.fillText("Ενότητα 1: Οδήγηση σε δρόμο ταχείας κυκλοφορίας",135,200);
		}
		show_hide("korna","both","timoni","gazi","prosperasi","wait","freno");
	
		
	}
	else if(question_no==2)
	{
		ly+=(5*mod);
		rainx-=(4*mod);
		rainy+=(5*mod);
		context.drawImage(rain,rainx,rainy,rain.width,rain.height);
		context.drawImage(lakouva,lx,ly,lakouva.width,lakouva.height);
		context.drawImage(s1,600,ly+550,s1.width,s1.height);
		context.drawImage(lines,x,y,lines.width,lines.height);
		show_hide("gazi","freno","timoni","korna","prosperasi","wait","both");
	}
	else if(question_no==3)
	{
		busy+=(5*mod);
		
		context.drawImage(busstop,70,busy-300,busstop.width,busstop.height);
		context.drawImage(s2,600,busy+300,s2.width,s2.height);
		context.drawImage(bus,busx,busy,bus.width,bus.height);
		context.drawImage(bluep,480,busy-60,bluep.width,bluep.height);
		context.drawImage(redp,490,busy+90,redp.width,redp.height);
		context.drawImage(yellowp,500,busy-40,yellowp.width,yellowp.height);
		context.drawImage(lines,x,y,lines.width,lines.height);	
		if(busy<-220)
		{
			context.rect(0, 0, 700, 600);		
			context.fillStyle = "rgba(50, 50, 50, 0.8)";
			context.fill();
			context.font="20px Calibri";
			context.fillStyle = "rgba(255, 255, 255,1)";
			context.fillText("Ενότητα 2: Οδήγηση στην πόλη",215,200);
		}
		
		show_hide("korna","prosperasi","wait","freno","timoni","gazi","both");
	}
	
	else if(question_no==-1)
	{
		move_flag==0;
		context.clearRect(0, 0, 700, 600);
		context.drawImage(finish,fx,fy,finish.width,finish.height);
		context.fillStyle="white";
		context.font="30px Calibri";
		context.fillText("Your score is: "+scr*100+"%",230,200);
	}

	
	context.restore();
}






function keyup_handler(event)
{
	if(event.keyCode == 38 || event.keyCode == 40)
	{
		mod = 0;
		
	}
}

function keypress_handler(event)
{
	console.log(event.keyCode);
	
		if(event.keyCode == 38)
		{
			if(move_flag==1)
			{
				mod = 1;
				//if(allow_sounds)
					//drive_sound.pause();
				document.getElementById("agent_talk").style.display = 'none';
			}
			else
				mod=0;
		}
	
	
	/*if(event.keyCode == 40)
	{
		mod = -1;
	}
	if(event.keyCode == 37)
	{
		angle -= 5;
	}
	if(event.keyCode == 39)
	{
		angle+=5;
	}*/
}

/*function question()
{
	if(question_no==1)
	{
		
		context.drawImage(dog,dogx,dogy,dog.width,dog.height);
		
	}
	if(question_no==2)
	{
		context.drawImage(lakouva,lx,ly,lakouva.width,lakouva.height);
		
	}
	if(question_no==3)
	{
		
		context.drawImage(bus,busx,busy,bus.width,bus.height);
		
	}
	
}*/
function help()
{
	alert("Χρησιμοποιήστε το πλήκτρο με το βέλος που δείχνει προς τα πάνω για να κινηθείτε. Κάθε φορά που σταματάτε να κινείστε καλείστε να πάρετε μια απόφαση επιλέγοντας κάποιο από τα τρία τετράγωνα κουτάκια που βρίσκονται στο δεξί μέρος της οθόνης σας.");
}
function stop_start_sounds()
{
	allow_sounds=!allow_sounds;
	if(!allow_sounds)
			document.getElementById("sound").innerHTML = '<img src=\"images/no_sound.png\"></img>';
	else
			document.getElementById("sound").innerHTML = '';
	
	
}
function show_score_speed()
{
	scr=(score/question_no).toFixed(2);
	if(question_no!=1 && question_no!=-1)
	{
		scr=(score/(question_no-1)).toFixed(2);
		if(scr<=0.33)
			document.getElementById("life").innerHTML = '<img src=\"images/fuel_low.png\"></img>';
		else if(scr>0.33 && scr<=0.66)
			document.getElementById("life").innerHTML = '<img src=\"images/fuel_med.png\"></img>';
		else
			document.getElementById("life").innerHTML = '<img src=\"images/fuel_high.png\"></img>';
	}
	else if(question_no==-1)
	{
		scr=(score/3).toFixed(2);
		if(scr<=0.33)
			document.getElementById("life").innerHTML = '<img src=\"images/fuel_low.png\"></img>';
		else if(scr>0.33 && scr<=0.66)
			document.getElementById("life").innerHTML = '<img src=\"images/fuel_med.png\"></img>';
		else
			document.getElementById("life").innerHTML = '<img src=\"images/fuel_high.png\"></img>';
	}
	else
	{
		document.getElementById("life").innerHTML = '<img src=\"images/fuel.png\"></img>';
	}
	
	if(question_no==1)
	{
		//document.getElementById("life").innerHTML = '<p>Score:---</p>';
		document.getElementById("speed").innerHTML = '<p><font color=\"red\">120</font></p>';
	}
	else if(question_no==2)
		document.getElementById("speed").innerHTML = '<p>90</p>';
	else if(question_no==3)
	{
		if(move_flag==1)
			document.getElementById("speed").innerHTML = '<p>50</p>';
		else
			document.getElementById("speed").innerHTML = '<p>0</p>';
	}
}
function show_hide(a,b,c,d,e,f,g)
{
	
	document.getElementById(a).style.display = 'block';
	document.getElementById(b).style.display = 'block';
	document.getElementById(c).style.display = 'block';
	document.getElementById(d).style.display = 'none';
	document.getElementById(e).style.display = 'none';
	document.getElementById(f).style.display = 'none';
	document.getElementById(g).style.display = 'none';
	
	
}


function mo(element)
{
	document.getElementById(element+"_img").src = '\images/'+element+'_mo.png';
}

function mout()
{
	document.getElementById("both_img").src ="\images/no_img.png";
	document.getElementById("freno_img").src ="\images/no_img.png";
	document.getElementById("timoni_img").src = "\images/no_img.png";
	document.getElementById("korna_img").src = "\images/no_img.png";
	document.getElementById("gazi_img").src ="\images/no_img.png";
	document.getElementById("prosperasi_img").src ="\images/no_img.png";
	document.getElementById("wait_img").src ="\images/no_img.png";
}
function freno_clicked()
{
	if(move_flag==0 && click_once)
	{
		//if(question_no==1)
			//q1_freno_animation(400,450,dogx,dogy);
		if(question_no==2)
			q2_freno_animation(400,450,rainx,rainy,400,800,0);
		//else if()
		var brake=new Audio();
		brake.src='sounds/brakenc.mp3';
		if(allow_sounds)
			brake.play();
		click_once=!click_once;
	}
	
	
}

function both_clicked()
{
	if(move_flag==0 && click_once)
	{
		if(question_no==1)
			q1_freno_animation(400,450,dogx,dogy);
		
		var brake=new Audio();
		brake.src='sounds/brakenc.mp3';
		var horn=new Audio();
		horn.src='sounds/horn.mp3';
			
		if(allow_sounds)
		{
			brake.play();
			horn.play();
		}
		click_once=!click_once;
	}
	
	
}

function timoni_clicked()
{
	if(move_flag==0 && click_once)
	{
		if(question_no==1)
			q1_timoni_animation(400,450,dogx,dogy,0);
		else if(question_no==2)
			q2_timoni_animation(400,450,rainx,rainy,150,-750,0);
			
		click_once=!click_once;
	}
	
}

function korna_clicked()
{
	if(move_flag==0 && click_once)
	{
		var horn=new Audio();
		horn.src='sounds/horn.mp3';
		if(allow_sounds)
			horn.play();
		if(question_no==1)
			q1_korna_animation(400,450,dogx,dogy);
		else if(question_no==3)
		{
						
						//document.getElementById("agent_talk").style.display='block';
						//document.getElementById("agent_talk").innerHTML = '<p>Δεν υπάρχει λόγος να κορνάρεις. Περίμενε υπομονετικά πίσω από το λεωφορείο.</p>';
						
						setTimeout(function() 
						{ 
						document.getElementById("agent_talk").style.display='block';
						document.getElementById("agent_talk").innerHTML = '<p><font color=\"red\">Δεν υπάρχει λόγος να κορνάρεις. Περίμενε υπομονετικά πίσω από το λεωφορείο.</font></p>';
							y += (speed);
							move_flag=1; 
							////score--;
							question_no=-1;
							click_once=true;
							if(allow_sounds)
								wrong_sound.play();
						},500);
		}
		click_once=!click_once;
	}
}

function gazi_clicked()
{
	if(move_flag==0 && click_once)
	{
		if(question_no==2)
			q2_gazi_animation(400,450,rainx,rainy);
			
	click_once=!click_once;
		
	}
	
}

function prosperasi_clicked()
{
	if(move_flag==0 && click_once)
	{
		if(question_no==3)
			q3_prosperasi_animation(400,450,480,busy-60,0);
			
		click_once=!click_once;
		
	}
}

function wait_clicked()
{
	if(move_flag==0 && click_once)
	{
		if(question_no==3)
			q3_wait_animation(400,450,480,busy-60,busx,busy);
			
		click_once=!click_once;
		
	}
}
function eyes_front_mo()
{
	if(move_flag==0)
	{
		document.getElementById("img").style.display = 'block';
		
		if(question_no==3)
		{
			document.getElementById("img").src = '\images/front_nocar.png';
			
		}
		else if(question_no==1)
		{
			document.getElementById("img").src = '\images/front_dog.png';
		}
		else if(question_no==2)
		{
			document.getElementById("img").src = '\images/front_car.png';
		}
			
		
	}
}

function eyes_back_mo()
{
	if(move_flag==0)
	{
		if(question_no==1)
		{
			document.getElementById("img").src = '\images/back_nocar.png';
			
		}
		else if(question_no==2 || question_no==3)
		{
			document.getElementById("img").src = '\images/back_car.png';
		}
		document.getElementById("img").style.display = 'block';
	}
}

function hide_img()
{
	document.getElementById("img").style.display = 'none';
}



function q1_freno_animation(cx,cy,dx,dy)
{
	
	//y += (speed);
	//move_flag=1;
	document.getElementById("canvas").style.display = 'none';
	document.getElementById("canvas_animation").style.display = 'block';
	canvass = document.getElementById("canvas_animation");
	contextt = canvass.getContext("2d");
	
	
	
	contextt.clearRect(0, 0, 700, 600);
	contextt.drawImage(lines,x,y,lines.width,lines.height);
	contextt.drawImage(car,cx,cy,car.width,car.height);
	contextt.drawImage(dog,dx,dy,dog.width,dog.height);
	
	
	requestAnimFrame(function() 
	{
					if(cy>200)
					{
						if(cy>350)
						{
							
							
							
							q1_freno_animation(cx,cy-5,dx,dy);
						}
						else if(cy<=350 && cy>250)
						{
							car.src="\images/car_rot1.png";
							q1_freno_animation(cx-2,cy-2.5,dx,dy);
							
							
							
						}
						else
							setTimeout(function() { q1_freno_animation(cx-1000,cy-1000,dx,dy) },1000);
						
					}
					else
					{
						y += (speed);
						move_flag=1;
						car.src="\images/car.png";
						document.getElementById("canvas").style.display = 'block';
						document.getElementById("canvas_animation").style.display = 'none';
						document.getElementById("agent_talk").style.display='block';
						document.getElementById("agent_talk").innerHTML = '<p><font color= \"red\">Δεν πρέπει να φρενάρεις απότομα όταν οδηγείς με τόσο μεγάλη ταχύτητα. Καλύτερα να χτυπούσες το ζώο.</font></p>';
						////score--;
						question_no++;
						click_once=true;
						if(allow_sounds)
							wrong_sound.play();
						
					}
			
						
					
					
	});	
	
	
}
function q2_timoni_animation(cx,cy,rx,ry,c2x,c2y,sound_flag)
{
	document.getElementById("canvas").style.display = 'none';
	document.getElementById("canvas_animation").style.display = 'block';
	canvass = document.getElementById("canvas_animation");
	contextt = canvass.getContext("2d");
	
	car2= new Image();
	car2.src="\images/car2.png";
	//car2x=150;
	//car2y=ry+100;
	contextt.clearRect(0, 0, 700, 600);
	contextt.drawImage(lines,x,y,lines.width,lines.height);
	contextt.drawImage(car,cx,cy,car.width,car.height);
	contextt.drawImage(rain,rx,ry,rain.width,rain.height);
	contextt.drawImage(car2,c2x,c2y,car2.width,car2.height);
	contextt.drawImage(lakouva,lx,ly,lakouva.width,lakouva.height);
	//contextt.translate(cx, cy);
	
	
	//ly+=speed;
	
	contextt.restore();
	if(sound_flag==0)
	{
		var snd=new Audio();
		snd.src='sounds/crash.mp3';
		
		sound_flag==1;
		setTimeout(function()
		{
			if(allow_sounds)
				snd.play(); 
		},1500);
	}
	requestAnimFrame(function() 
	{
					if(cy>80)
					{
						if(cy>190)
						{
						
							car.src="\images/car_rot1.png";
							
							q2_timoni_animation(cx-2.5,cy-2.5,rx-1,ry+1,c2x,c2y+8,1);
						}
						else
						{
							//q2_timoni_animation(cx,cy,rx-1,ry+1,c2x,c2y,1);
							setTimeout(function() { q2_timoni_animation(cx,-1000,rx,ry,c2x,c2y,1) },1500);
							
						}
						
						
					}
					else
					{
						y += (speed);
						move_flag=1;
						car.src="\images/car.png";
						document.getElementById("canvas").style.display = 'block';
						document.getElementById("canvas_animation").style.display = 'none';
						document.getElementById("agent_talk").style.display='block';
						document.getElementById("agent_talk").innerHTML = '<p><font color=\"red\">Θα ήταν προτιμότερο να περνούσες πάνω από τα νερά χωρίς να πατάς γκάζι.</font></p>';
						////score--;
						question_no++;
						click_once=true;
						if(allow_sounds)
							wrong_sound.play();
					}
			
						
					
					
	});	
	
	
}
function q1_timoni_animation(cx,cy,dx,dy,sound_flag)
{
	
	if(sound_flag==0)
	{
		var snd=new Audio();
		snd.src='sounds/wheels.mp3';
		
		sound_flag==1;
		setTimeout(function()
		{
			if(allow_sounds)
				snd.play(); 
		},500);
	}
	document.getElementById("canvas").style.display = 'none';
	document.getElementById("canvas_animation").style.display = 'block';
	canvass = document.getElementById("canvas_animation");
	contextt = canvass.getContext("2d");
	
	
	
	contextt.clearRect(0, 0, 700, 600);
	contextt.drawImage(lines,x,y,lines.width,lines.height);
	contextt.drawImage(car,cx,cy,car.width,car.height);
	contextt.drawImage(dog,dx,dy,dog.width,dog.height);
	//contextt.translate(cx, cy);
	
	
	//ly+=speed;
	
	contextt.restore();
	requestAnimFrame(function() 
	{
					if(cy>200)
					{
						if(cy>300)
						{
							
							
							
							q1_timoni_animation(cx,cy-5,dx,dy,1);
						}
						else if(cy<=300 && cy>250) 
						{
							
							car.src="\images/car_rot3.png";
							q1_timoni_animation(cx+1,cy-0.5,dx,dy,1);
							
							
						}
						else
						{
							setTimeout(function() { q1_timoni_animation(cx-1000,cy-1000,dx,dy,1) },1000);
						}
						
					}
					else
					{
						y += (speed);
						move_flag=1;
						car.src="\images/car.png";
						document.getElementById("canvas").style.display = 'block';
						document.getElementById("canvas_animation").style.display = 'none';
						document.getElementById("agent_talk").style.display='block';
						document.getElementById("agent_talk").innerHTML = '<p><font color=\"red\">Δεν πρέπει να κάνεις απότομους ελιγμούς όταν οδηγείς με τόσο μεγάλη ταχύτητα. Καλύτερα να χτυπούσες το ζώο.</font></p>';
						////score--;
						question_no++;
						click_once=true;
						if(allow_sounds)
							wrong_sound.play();
					}
			
						
					
					
	});	
	
	
}


function q1_korna_animation(cx,cy,dx,dy)
{
	
	//y += (speed);
	//move_flag=1;
	document.getElementById("canvas").style.display = 'none';
	document.getElementById("canvas_animation").style.display = 'block';
	canvass = document.getElementById("canvas_animation");
	contextt = canvass.getContext("2d");
	
	
	
	contextt.clearRect(0, 0, 700, 600);
	contextt.drawImage(lines,x,y,lines.width,lines.height);
	contextt.drawImage(car,cx,cy,car.width,car.height);
	contextt.drawImage(dog,dx,dy,dog.width,dog.height);
	//contextt.translate(cx, cy);
	
	
	//ly+=speed;
	
	contextt.restore();
	requestAnimFrame(function() 
	{
					if(cy>-160)
					{
						if(cy>dy+dog.height)
						{
							
							q1_korna_animation(cx,cy-8,dx,dy);
						}
						else if(cy<=dy+dog.height && cy>-150) 
						{
							q1_korna_animation(cx,cy-8,dx+9,dy-9);
							
						}
						else
						{
							setTimeout(function() { q1_korna_animation(cx-1000,cy-1000,dx,dy) },1000);
						}
						
					}
					else
					{
						y += (speed);
						move_flag=1;
						car.src="\images/car.png";
						document.getElementById("canvas").style.display = 'block';
						document.getElementById("canvas_animation").style.display = 'none';
						document.getElementById("agent_talk").style.display='block';
						document.getElementById("agent_talk").innerHTML = '<p><font color=\"green\">Πολύ σωστά! Λόγω της μεγάλης ταχύτητας επρεπε να χτυπήσεις το ζώο, διαφορετικά θα κινδύνευες εσύ.</font></p>';
						score++;
						question_no++;
						click_once=true;
						if(allow_sounds)
							correct_sound.play();
					}
			
						
					
					
	});	
	
	
}

function q2_gazi_animation(cx,cy,rx,ry)
{
	
	document.getElementById("canvas").style.display = 'none';
	document.getElementById("canvas_animation").style.display = 'block';
	canvass = document.getElementById("canvas_animation");
	contextt = canvass.getContext("2d");
	
	contextt.clearRect(0, 0, 700, 600);
	contextt.drawImage(lines,x,y,lines.width,lines.height);
	contextt.drawImage(lakouva,lx,ly,lakouva.width,lakouva.height);
	contextt.drawImage(car,cx,cy,car.width,car.height);
	contextt.drawImage(rain,rx,ry,rain.width,rain.height);
	
	//contextt.translate(cx, cy);
	
	
	//ly+=speed;
	
	contextt.restore();
	requestAnimFrame(function() 
	{
					if(cy>-100)
					{
						
						if(cy>130)
						{
						
							q2_gazi_animation(cx,cy-3,rx-1,ry+1);
						}
						else if(cy<=130 && cy>120)
						{
						
							q2_gazi_animation(cx+3,cy-2,rx-1,ry+1);
						}
						else if(cy<=120 && cy>100)
						{
						
							q2_gazi_animation(cx-3,cy-2,rx-1,ry+1);
						}
						else if(cy<=100 && cy>80)
						{
							q2_gazi_animation(cx+3,cy-2,rx-1,ry+1);
						}
						
						else
						{
							q2_gazi_animation(cx,cy-2,rx-1,ry+1);
							
						}
						
						
					}
					else
					{
						y += (speed);
						move_flag=1;
						//car.src="\images/car.png";
						document.getElementById("canvas").style.display = 'block';
						document.getElementById("canvas_animation").style.display = 'none';
						document.getElementById("agent_talk").style.display='block';
						document.getElementById("agent_talk").innerHTML = '<p><font color=\"green\">Πολύ σωστά! Όταν το όχημα δισχίζει τα νερά κράτα γερά το τιμόνι.</font></p>';
						score++;
						question_no++;
						click_once=true;
						if(allow_sounds)
							correct_sound.play();
					}
			
						
					
					
	});	
	
}
function q2_freno_animation(cx,cy,rx,ry,c2x,c2y,sound_flag)

{
	document.getElementById("canvas").style.display = 'none';
	document.getElementById("canvas_animation").style.display = 'block';
	canvass = document.getElementById("canvas_animation");
	contextt = canvass.getContext("2d");
	
	car2= new Image();
	car2.src="\images/car2b.png";
	//car2x=150;
	//car2y=ry+100;
	contextt.clearRect(0, 0, 700, 600);
	contextt.drawImage(lines,x,y,lines.width,lines.height);
	contextt.drawImage(car,cx,cy,car.width,car.height);
	contextt.drawImage(rain,rx,ry,rain.width,rain.height);
	contextt.drawImage(car2,c2x,c2y,car2.width,car2.height);
	contextt.drawImage(lakouva,lx,ly,lakouva.width,lakouva.height);
	//contextt.translate(cx, cy);
	
	
	//ly+=speed;
	
	contextt.restore();
	if(sound_flag==0)
	{
		var snd=new Audio();
		snd.src='sounds/crash.mp3';
		
		sound_flag==1;
		setTimeout(function() 
		{
			if(allow_sounds)
				snd.play(); 
		},0);
	}
	requestAnimFrame(function() 
	{
					if(cy>150)
					{
						if(cy>280)
						{
						
							q2_freno_animation(cx,cy-4,rx-1,ry+1,c2x,c2y-9,1);
						}
						else if(cy<=280 && cy>200)
						{
							q2_freno_animation(cx,cy-0.5,rx-1,ry+1,c2x,c2y-0.5,1);
						}
						else
						{
							setTimeout(function() { q2_freno_animation(cx,-100,rx,ry,c2x,c2y,1) },1000);
							
						}
						
						
					}
					else
					{
						y += (speed);
						move_flag=1;
						car.src="\images/car.png";
						document.getElementById("canvas").style.display = 'block';
						document.getElementById("canvas_animation").style.display = 'none';
						document.getElementById("agent_talk").style.display='block';
						document.getElementById("agent_talk").innerHTML = '<p><font color=\"red\">Θα ήταν προτιμότερο να περνούσες πάνω από τα νερά χωρίς να πατάς γκάζι.</font></p>';
						////score--;
						question_no++;
						click_once=true;
						if(allow_sounds)
							wrong_sound.play();
					}
			
						
					
					
	});	
	
	

}

function q3_prosperasi_animation(cx,cy,bpx,bpy,sound_flag)

{
	document.getElementById("canvas").style.display = 'none';
	document.getElementById("canvas_animation").style.display = 'block';
	canvass = document.getElementById("canvas_animation");
	contextt = canvass.getContext("2d");
	
	
	contextt.clearRect(0, 0, 700, 600);
	contextt.drawImage(busstop,70,busy-300,busstop.width,busstop.height);
	contextt.drawImage(lines,x,y,lines.width,lines.height);
	contextt.drawImage(car,cx,cy,car.width,car.height);
	contextt.drawImage(s2,600,busy+300,s2.width,s2.height);
	contextt.drawImage(bus,busx,busy,bus.width,bus.height);
	contextt.drawImage(bluep,bpx,bpy,bluep.width,bluep.height);
	contextt.drawImage(redp,490,busy+90,redp.width,redp.height);
	contextt.drawImage(yellowp,500,busy-40,yellowp.width,yellowp.height);
	//contextt.translate(cx, cy);
	
	
	//ly+=speed;
	
	contextt.restore();
	if(sound_flag==0)
	{
		var snd=new Audio();
		snd.src='sounds/brakenc.mp3';
		
		sound_flag==1;
		setTimeout(function() 
		{
			if(allow_sounds)
				snd.play(); 
		},2000);
	}
	requestAnimFrame(function() 
	{
					if(cy>busy)
					{
						if(cx>busx-car.width-10)
							q3_prosperasi_animation(cx-2,cy-2,bpx-1.3,bpy,1)
						else
							q3_prosperasi_animation(cx,cy-4,bpx-1.3,bpy,1)
						
						
					}
					else if(cy<=busy && cy>busy-20)
					{
						if(cy>bpy+bluep.height)
							q3_prosperasi_animation(cx,cy-2,bpx,bpy,1)
						else
							q3_prosperasi_animation(cx,cy-0.5,bpx+3,bpy-1,1)
						
					}
					else
					{
						setTimeout(function() 
						{
							y += (speed);
							move_flag=1;
							car.src="\images/car.png";
							document.getElementById("canvas").style.display = 'block';
							document.getElementById("canvas_animation").style.display = 'none';
							document.getElementById("agent_talk").style.display='block';
							document.getElementById("agent_talk").innerHTML = '<p><font color=\"red\">Πολύ συχνά οι επιβάτες περνούν μπροστά από τα σταματημένα ΜΜΜ. Καλύτερα περίμενε υπομονετικά.</font></p>';
							////score--;
							question_no=-1;
							click_once=true;
							if(allow_sounds)
							wrong_sound.play();
						},2000);
					}
			
						
					
					
	});	
	
	

}

function q3_wait_animation(cx,cy,bpx,bpy,bx,by)

{
	document.getElementById("canvas").style.display = 'none';
	document.getElementById("canvas_animation").style.display = 'block';
	canvass = document.getElementById("canvas_animation");
	contextt = canvass.getContext("2d");
	
	car2= new Image();
	car2.src="\images/car2b.png";
	//car2x=150;
	//car2y=ry+100;
	contextt.clearRect(0, 0, 700, 600);
	contextt.drawImage(busstop,70,busy-300,busstop.width,busstop.height);
	contextt.drawImage(lines,x,y,lines.width,lines.height);
	contextt.drawImage(car,cx,cy,car.width,car.height);
	contextt.drawImage(car2,cx,cy+200,car2.width,car2.height);
	contextt.drawImage(s2,600,busy+300,s2.width,s2.height);
	contextt.drawImage(bus,bx,by,bus.width,bus.height);
	contextt.drawImage(bluep,bpx,bpy,bluep.width,bluep.height);
	contextt.drawImage(redp,490,busy+90,redp.width,redp.height);
	contextt.drawImage(yellowp,500,busy-40,yellowp.width,yellowp.height);
	//contextt.translate(cx, cy);
	
	
	//ly+=speed;
	
	contextt.restore();
	
	requestAnimFrame(function() 
	{
					if(bpx>busx-(bluep.width)-10)
						q3_wait_animation(cx,cy,bpx-1.5,bpy,bx,by);
					else
					{
						if(by>-800)
						{
							q3_wait_animation(cx,cy-5,bpx,bpy,bx,by-5);
						}
						else
						{
								y += (speed);
								move_flag=1;
								car.src="\images/car.png";
								document.getElementById("canvas").style.display = 'block';
								document.getElementById("canvas_animation").style.display = 'none';
								document.getElementById("agent_talk").style.display='block';
								document.getElementById("agent_talk").innerHTML = '<p><font color=\"green\">Πολύ σωστά! Ίσως αργήσεις δύο λεπτά να φτάσεις στον προορισμό σου όμως δεν κινδύνεψε κανείς!</font></p>';
								score++;
								question_no=-1;
								click_once=true;
								if(allow_sounds)
							correct_sound.play();
							
						}
					}
			
						
					
					
	});	
	
	

}