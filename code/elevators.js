function callElevator(btn){
    if( btn.style.background =="green"){
        var callElv=setInterval(function (){
            //To initialize settings
            if(elevatorsObj.length==0){clearInterval(callElv)}
            //Checking if there is an available elevator
            if(numberOFBusyElevators< elevatorsObj.length){
                btn.style.background='red';
                let elevator= getCloseElevator();
                elevator.isAvailable=false;
                numberOFBusyElevators++;
                startElevatorTimer(elevator, btn);
                elevator.curFloor= floorNumber;
                clearInterval(callElv)
            }else{
                //All the elevators are busy
                btn.style.background='orange';
            }
        }, 500);
    }
}

//Getting an available close elevator by calculating distance
function getCloseElevator(){
    let i=0;
    let distance=0;
    let elv=null;
    //Init the first elevator
    for(i=0;i<elevatorsObj.length;i++){
        let tempEl= elevatorsObj[i];
        if(tempEl.isAvailable){
            elv=elevatorsObj[i];
            distance=Math.abs(tempEl.curFloor- floorNumber);
            break;
        }
    }
    //Choose a closer elevator
    for(i=0;i<elevatorsObj.length;i++){
        let tempEl= elevatorsObj[i];
        if(tempEl.isAvailable){
            let tempDis= Math.abs(tempEl.curFloor- floorNumber);
            if(distance>tempDis){
                elv=tempEl;
                distance=tempDis
            }
        }
    }
    return elv;
}

//Timer for the arrival of the elevator to the floor
function startElevatorTimer(elv, btn){
    let currentFloor=floorNumber;
    let elvImg=document.getElementById(`imgElv${elv.elvID}Floor${currentFloor}`);
    elvImg.style.border = "5px solid red"
    let timer= Math.abs(currentFloor-elv.curFloor);
    let timeLabel= document.getElementById(`timer${currentFloor}`);
    let timerInterval=setInterval(function () {
        //To initialize settings
        if(elevatorsObj.length==0){clearInterval(timerInterval)}
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        timeLabel.innerText=seconds;
        if(--timer<0){//The elevator reached the floor
            elvImg.style.borderColor ='green'
            btn.style.background='green';
            clearInterval(timerInterval);
            busyElevator(elv,currentFloor)
            if(currentFloor==floorNumber){
                new Audio('resources/elevator-ding-sound.mp3').play();
            }
                }
    }, 1000);
}

// Set free the elevator after two seconds
function busyElevator(elv,elvFloor){
    let busyTimeout=setTimeout(function(){
        //To initialize settings
        if(elevatorsObj.length==0){clearTimeout(busyTimeout)}
        elv.isAvailable=true;
        let elvImg=document.getElementById(`imgElv${elv.elvID}Floor${elvFloor}`);
        if(!elvImg.style){
            elvImg.style.removeProperty('border');
        }
        numberOFBusyElevators--;
    },2000);
}


