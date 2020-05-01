
addNewBallpark.onshow=function(){
    let pw = 'Bluejays20'
    let query = "SELECT ballparkName FROM ballparks"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=rww04096&pass=" + pw + "&database=rww04096&query=" + query)

    if (req.status == 200) {
            allBallparks = JSON.parse(req.responseText)
           // console.log(`${allBallparks}`)
            ddnChange.clear()
            for (i = 0; i <= allBallparks.length - 1; i++)
                ddnChange.addItem(allBallparks[i])
    } else {
            NSB.MsgBox(`Error: ${req.status}`);
    }  
}
ddnChange.onclick=function(s){
    if (typeof(s) == "object"){  
    return                     
  } else {
    ddnChange.value = s   
    NSB.MsgBox(`Enter the new name for ${s}.`)
  }
}
btnUpdate.onclick=function(){
    let newName = inptChange.value
    let oldName = ddnChange.value
    
    let found = false
    for (i = 0; i <= allBallparks.length - 1; i++) {
        if (oldName == allBallparks[i]) {
            found = true
            break
        }
     }   
    if (found == false) 
       NSB.MsgBox("That ballpark is not in the database.")
    else if (found == true) {
        query = "UPDATE ballparks SET ballparkName =" + '"' + newName + '"' + " WHERE ballparkName = " + '"' + oldName + '"'
        pw = 'Bluejays20'
        req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=rww04096&pass=" + pw + "&database=rww04096&query=" + query)

        if (req.status == 200) { 
            if (req.responseText == 500) {   
                NSB.MsgBox(`Ballpark name changed`)
                inptChange.value = ""
                ddnChange.value = ""
            } else
                NSB.MsgBox(`There was a problem changing the name.`)
        } else 
            NSB.MsgBox(`Error: ${req.status}`);
    }
}

btnBack.onclick=function(){
  ChangeForm(begin)
}
let newBallpark = inptBallpark.value

btnSubmit.onclick=function(){
  //add to database or array
  ballparksMLB.push(inptBallpark.value)
   NSB.MsgBox(`Added ballpark`)
   newBallpark = ""
}
