var tagPararAlarme = document.querySelector("#tagPararAlarme");
var tagsOpcTmp = document.querySelectorAll("input[name='opcTmp']");

var tagTmpMin = document.querySelector("#tagTmpMin");
var tagTmpSeg = document.querySelector("#tagTmpSeg");
var tagTmpHor = document.querySelector("#tagTmpHor");

var tagTmpAtual = document.querySelector("#tagTmpAtual");


var tagAlarme = document.querySelector("#tagAlarme");

var tagBtIniciaCrono = document.querySelector("#tagBtIniciaCrono");
var tagBtParaCrono = document.querySelector("#tagBtParaCrono");
var tagBtCancelaCrono = document.querySelector("#tagBtCancelaCrono");



var alarmModeSel;
var cronometro;
var tmpCrono = 0;
var horarioEscolhido = new Date();
var horarioLimite;

var tagTxtPararAlarme = document.querySelector("#tagTxtPararAlarme");
var tagTxtAlarme = document.querySelector("#tagTxtAlarme");
var tagTxtTimer = document.querySelector("#tagTxtTimer");

var tagsTxtTempo = document.querySelectorAll("#dvTagsTempo legend");
var txtBtInicia = ["Iniciar","Continuar"]; 

var msgCancela = "A operação foi cancelada."; 

checaIdiomaNavegador();


function checaIdiomaNavegador(){


if(navigator.language != "pt-BR" && navigator.language != "pt-PT"){

tagTxtPararAlarme.innerHTML = "Stop Alarm";
tagTxtAlarme.innerHTML = "Alarm Clock";
tagTxtTimer.innerHTML  = "Timer"; 

tagsTxtTempo[0].innerHTML = "Hours";
tagsTxtTempo[1].innerHTML = "Minutes";
tagsTxtTempo[2].innerHTML = "Seconds";

txtBtInicia = ["Start","Resume"];

tagBtParaCrono.innerHTML = "Pause";
tagBtCancelaCrono.innerHTML = "Cancel";

msgCancela = "The operation has been canceled.";


}

tagBtIniciaCrono.innerHTML = txtBtInicia[0];

}



switchEstadoBts(tagBtCancelaCrono,true);

zeraTagsTempo(tagTmpHor);
zeraTagsTempo(tagTmpMin);
zeraTagsTempo(tagTmpSeg);


tagsOpcTmp[0].checked = true;
selecionaOpcCrono();


tagsOpcTmp[0].addEventListener("input",selecionaOpcCrono);
tagsOpcTmp[1].addEventListener("input",selecionaOpcCrono);




tagTmpHor.addEventListener("input",addTmpCrono);
tagTmpMin.addEventListener("input",addTmpCrono);
tagTmpSeg.addEventListener("input",addTmpCrono);


function zeraTagsTempo(tag){

tag.value = 0;
    
}

function switchTagsTempo(tag,chave){

tag.disabled = chave;
        
}



function checaEstadoTagsRadio(){

for(var x = 0; x < tagsOpcTmp.length; x++){

var tag = tagsOpcTmp[x];

if(tag.parentElement.getAttribute("class","eleDesativado"))
tag.parentElement.classList.remove("eleDesativado");




if(tag.checked){
   
tag.parentElement.classList.add("eleSelecionado");
if(tag.parentElement.getAttribute("class","eleNaoSelecionado"))
tag.parentElement.classList.remove("eleNaoSelecionado");



}else{


tag.parentElement.classList.add("eleNaoSelecionado");
if(tag.parentElement.getAttribute("class","eleSelecionado"))
tag.parentElement.classList.remove("eleSelecionado");


}

}

}


function selecionaOpcCrono(){



if(this.value == undefined)
    alarmModeSel = 1;
else
    alarmModeSel = parseInt(this.value);
    

checaEstadoTagsRadio();
addTmpCrono();

}




function addTmpCrono(){
    
if(isNaN(parseInt(this.value)) || parseInt(this.value) < 0){

zeraTagsTempo(this);

}else{

tmpCrono =  parseInt((tagTmpHor.value * 3600)) + parseInt((tagTmpMin.value * 60)) + parseInt((tagTmpSeg.value));

switchEstadoBts(
    tagBtIniciaCrono,(!((tmpCrono > 0) || (alarmModeSel)))
   );

}

}



tagBtIniciaCrono.addEventListener("click",function(){

    switchBtsCrono(this,tagBtParaCrono);
    iniciaCrono();
 

});


tagBtParaCrono.addEventListener("click",function(){

tagBtIniciaCrono.innerHTML = txtBtInicia[1];

switchBtsCrono(this,tagBtIniciaCrono);
   
paraCrono();
     
});


function switchBtsCrono(tag1,tag2){

var classesBt = tag1.getAttribute("class") + " " + "ghost";

tag1.setAttribute("class",classesBt);

if(tag2.hasAttribute("class","ghost"))
tag2.classList.remove("ghost");

}



tagBtCancelaCrono.addEventListener("click",function(){
   

    window.clearInterval(cronometro);
    alert(msgCancela);
    switchBtsCrono(tagBtParaCrono,tagBtIniciaCrono);
    finalizaCrono();
    switchEstadoBts(this,true);    
  

 });


 function paraCrono(){

    window.clearInterval(cronometro);
    
}

function iniciaCrono(){


switchEstadoBts(tagsOpcTmp[0],true);
switchEstadoBts(tagsOpcTmp[1],true);


tagsOpcTmp[0].parentElement.setAttribute("class","fundoCinza2 eleDesativado");
tagsOpcTmp[1].parentElement.setAttribute("class","fundoCinza2 eleDesativado");


switchTagsTempo(tagTmpHor,true);
switchTagsTempo(tagTmpMin,true);
switchTagsTempo(tagTmpSeg,true);
switchEstadoBts(tagBtCancelaCrono,false);

if(alarmModeSel){
        switchEstadoBts(tagBtParaCrono,true);
        setTimeout(configAlarme,1000);

        }

cronometro = window.setInterval(attCrono,1000);

}


function configAlarme(){

   

    horarioEscolhido.setHours(tagTmpHor.value);
    horarioEscolhido.setMinutes(tagTmpMin.value);
    horarioEscolhido.setSeconds(tagTmpSeg.value);  
    
    horarioLimite = new Date();
        
    var segsHorarioEscolhido = (horarioEscolhido.getHours() * 3600) + (horarioEscolhido.getMinutes() * 60) + (horarioEscolhido.getSeconds());
    var segsHorarioLimite = (horarioLimite.getHours() * 3600) + (horarioLimite.getMinutes() * 60) + (horarioLimite.getSeconds());
    
    if(segsHorarioEscolhido >= segsHorarioLimite)
        tmpCrono = segsHorarioEscolhido - segsHorarioLimite;
    else
        tmpCrono = (segsHorarioEscolhido + (3600 * 24)) - segsHorarioLimite;
}


function attCrono(){

if(tmpCrono == 0){

        window.clearInterval(cronometro);
        tocaAlarme(); 
        switchEstadoBts(tagBtIniciaCrono,true);
        switchEstadoBts(tagBtParaCrono,true);
        switchEstadoBts(tagBtCancelaCrono,true);
    
        tagPararAlarme.setAttribute("class","eleAtivado");
        tagPararAlarme.addEventListener("click",pausaAlarme);
}else{

    tmpCrono--;
}     

var horas = ((tmpCrono - (tmpCrono % 3600)) / 3600);
var minutos = ((tmpCrono - (tmpCrono % 60)) / 60) - (horas * 60);
var segundos = (tmpCrono % 60);
tagTmpAtual.innerHTML = addZero(horas) + ":" + addZero(minutos) + ":" + addZero(segundos);     

}




function addZero(val){

if(val < 10)
val = "0" + val;

return val;

}


function tocaAlarme(){

tagAlarme.play();

}

function pausaAlarme(){

tagAlarme.pause();
finalizaCrono();
switchBtsCrono(tagBtParaCrono,tagBtIniciaCrono);

switchEstadoBts(tagBtIniciaCrono,false);
switchEstadoBts(tagBtParaCrono,false);
switchEstadoBts(tagBtCancelaCrono,true);


tagPararAlarme.setAttribute("class","eleDesativado");

}

function finalizaCrono(){

switchTagsTempo(tagTmpHor,false);    
switchTagsTempo(tagTmpMin,false);
switchTagsTempo(tagTmpSeg,false);

switchEstadoBts(tagsOpcTmp[0],false);
switchEstadoBts(tagsOpcTmp[1],false);

checaEstadoTagsRadio();


tagBtIniciaCrono.innerHTML = txtBtInicia[0];

tmpAtual = 0;
tagTmpAtual.innerHTML = "00:00:00"; 

tagPararAlarme.removeEventListener("click",finalizaCrono);

addTmpCrono();

}




function switchEstadoBts(bt,chave){

bt.disabled = chave;

}