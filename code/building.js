var elevatorsObj=[];
var floorsObj=[];
var floorNumber=0;
var numberOFBusyElevators=0


function setElevators(elNumber){
    for(i=0;i<elNumber; i++){
        addElevator(i);
    }
}

function addElevator(i){
    let elv= {
        elvID: i,
        curFloor:0,
        isAvailable: true
    };
    elevatorsObj.push(elv);
}

//Set building floors HTML
function setFloorNumber(flNumber){
    let floorList= document.getElementById('floorsList');
    floorList.innerHTML='';
    let curFloor= document.getElementById('curfloor');
    //Set floors number
    for (let i=0;i<flNumber;i++){
        let imgGrid= document.createElement("div");
        if(i==0){
            imgGrid.className="grid-container"
            document.getElementById("floorNum").innerText=`Floor ${i+1}`
        }else{ imgGrid.className="noActiveImg"}
        imgGrid.id=`gridFloor${i}`
        imgGrid=addElevatorImage(imgGrid,i)
        floorList.appendChild(addFloorButton(i))
        curFloor.appendChild(addFloorCallButton(i))
        curFloor.appendChild(addFloorTimer(i))
        curFloor.appendChild(imgGrid)
    }
}

function addFloorButton(flrNumber){
    let btn= document.createElement("button");
    btn.innerText=`Floor ${flrNumber+1}`;
    btn.id=`floorNum${flrNumber}`
    btn.className="infoBtn"
    btn.onclick= function() { changeFloor(flrNumber); };
    return btn;
}

function addFloorCallButton(flrNumber){
    let btn= document.createElement("button");
    btn.innerText=`Call Elevator`;
    btn.style.background='green'
    btn.id=`callBtn${flrNumber}`
    btn.style.margin='20px'
    btn.onclick= function() { callElevator(this)};
    if(flrNumber==0){
        btn.className='activeCallBtn'
    }
    return btn;
}

function addFloorTimer(flrNumber){
    let floorLabel= document.createElement("label");
    floorLabel.innerText='00';
    floorLabel.id=`timer${flrNumber}`
    floorLabel.style.fontSize='30px'
    if(flrNumber==0){
        floorLabel.className='activeTimer'
    }
    return floorLabel;
}

function addElevatorImage(imgGrid,floor){
    for(let i=0;i<elevatorsObj.length;i++){
        let elvImage= document.createElement("img");
        elvImage.id=`imgElv${i}Floor${floor}`;
        elvImage.src='resources/closeElevator.png'
        elvImage.className="grid-item"
        imgGrid.appendChild(elvImage)
    }
    return imgGrid
}

//Change floor view
function changeFloor(floorNum){
    let activeTimer = document.getElementsByClassName("activeTimer");
    let activeCallBtn=document.getElementsByClassName("activeCallBtn");
    let activeImgGrid= document.getElementsByClassName("grid-container");
    activeTimer[0].classList.remove("activeTimer");
    activeCallBtn[0].classList.remove("activeCallBtn");
    activeImgGrid[0].className="noActiveImg";
    activeTimer= document.getElementById(`timer${floorNum}`);
    activeCallBtn= document.getElementById(`callBtn${floorNum}`);
    activeImgGrid=document.getElementById(`gridFloor${floorNum}`);
    activeTimer.classList.add("activeTimer")
    activeCallBtn.classList.add("activeCallBtn")
    activeImgGrid.className="grid-container";
    floorNumber=floorNum
    document.getElementById("floorNum").innerText=`Floor ${floorNum+1}`
}

//Clear building data
function clearBuildingData(){
    elevatorsObj=[];
    floorsObj=[];
    floorNumber=0;
    numberOFBusyElevators=0
}



