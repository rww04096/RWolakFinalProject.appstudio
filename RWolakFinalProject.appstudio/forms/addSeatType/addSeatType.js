let seatType = ["bleachers", "club level", "upper deck", "suite level", "terrace reserved"]
let ballparksAL = ["Camden Yards", "Fenway Park", "Yankee Stadium", "Oakland Coliseum"]
let ballparksNL = ["Wrigley Field", "Miller Park", "Busch Stadium", "Dodger Stadium"]
let ballparksMLB = ballparksAL.concat(ballparksNL)

addSeatType.onshow=function(){
    
    ddnBallparks.clear()   
   
    for (i = 0; i <= ballparksMLB.length - 1; i++) 
        ddnBallparks.addItem(ballparksMLB[i])
}

btnReturn.onclick=function(){
  ChangeForm(begin)
}

ddnBallparks.onclick=function(s){
    if (typeof(s) == "object"){  
    return                     
  } else {
    ddnBallparks.value = s   
    NSB.MsgBox(`Enter a seat location at ${s}.`)
  }
}
let newSeat = inptSeat.value 

btnAddSeat.onclick=function(){
   seatType.push(inptSeat.value)
   NSB.MsgBox(`Added seat`)
   newSeat = ""
}
