newExperience.onshow=function(){
      ddnSeatType.clear()
      for (i = 0; i <= seatType.length - 1; i++)
      ddnSeatType.addItem(seatType[i])
    
   // get the data to populate the dropdown with names from database
    let pw = 'Bluejays20'
    let query = "SELECT ballparkName FROM ballparks"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=rww04096&pass=" + pw + "&database=rww04096&query=" + query)

    if (req.status == 200) { //transit worked.
            ballparks = JSON.parse(req.responseText)
            //console.log(`${ballparks}`)
            ddnBallpark.clear()
            for (i = 0; i <= ballparks.length - 1; i++)
                ddnBallpark.addItem(ballparks[i])
    } else {
        NSB.MsgBox(`Error: ${req.status}`);
    }  

}

btnMain.onclick=function(){
  ChangeForm(begin)
}

ddnBallpark.onclick=function(s){
    if (typeof(s) == "object"){  
    return                     
  } else {
    ddnBallpark.value = s   
    NSB.MsgBox(`Now select a seat type at ${s}.`)
  }
}
ddnSeatType.onclick=function(s){
    if (typeof(s) == "object"){  
    return                     
  } else {
    ddnSeatType.value = s   
    NSB.MsgBox(`If ${s} is a seat at the park you've selected, enter your comment and maybe the score from the game!`)
  }
}

btnEnter.onclick=function(){
  let commentLong = inptComment.value
  let comment = commentLong.substring(0,249)
  let park = ddnBallpark.value 
  let seat = ddnSeatType.value
    if (commentLong.length >= 250) {
    NSB.MsgBox(`Your comment is too long- revise to less than 250 characters`)
  } else {
      query = "INSERT INTO experience (park,seat,comment) VALUES ('" + park + "', '" + seat + "', '" + comment + "')"
      pw = 'Bluejays20'
      req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=rww04096&pass=" + pw + "&database=rww04096&query=" + query)
        if (req.status == 200) { 
            if (req.responseText == 500) {   
                NSB.MsgBox(`Experience added`)
                inptComment.value = ""
                ddnBallpark.value = ""
                ddnSeatType.value = ""
            } else
                NSB.MsgBox(`Experience not added`)
        } else 
            NSB.MsgBox(`Error: ${req.status}`);
    }
}
