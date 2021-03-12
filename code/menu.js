
function setSettings(){
    if(validationInput()){
        let elnum= document.getElementById('elnum').value;
        let flnum= document.getElementById('flnum').value;
        setElevators(elnum)
        setFloorNumber(flnum)
        changeActiveSection("floorSection")
    }
}

//Initializing system and back to setting screen 
function backToSetting(){
    document.getElementById("floorsList").innerHTML='';
    document.getElementById("curfloor").innerHTML='';
    clearBuildingData();
    changeActiveSection("structureMenuSection");
}

function changeActiveSection(id){
    let section = document.getElementsByClassName("activeSection");
    section[0].classList.remove("activeSection");
    section= document.getElementById(id)
    section.classList.add("activeSection");
}

function validationInput(){
    let elnum= document.getElementById('elnum');
    if(!elnum.value || elnum.value<=0){
        document.getElementById('elnumLb').style.color='red'
        return false;
    }
    document.getElementById('elnumLb').style.color=''
    let flnum= document.getElementById('flnum')
    if(!flnum.value || flnum.value<=0){
        document.getElementById('flnumLb').style.color='red'
        return false;
    }
    document.getElementById('flnumLb').style.color=''
    return true;
}



