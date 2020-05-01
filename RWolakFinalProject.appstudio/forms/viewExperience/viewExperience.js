viewExperience.onshow=function(){
    let pw = 'Bluejays20'
    let query = "SELECT ballparkName FROM ballparks"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=rww04096&pass=" + pw + "&database=rww04096&query=" + query)
    if (req.status == 200) { //transit worked.
            allParks = JSON.parse(req.responseText)
            // names now in results array - load names into the dropdown 
            ddnPark.clear()
            for (i = 0; i <= allParks.length - 1; i++)
                ddnPark.addItem(allParks[i])
   } else {
        // transit error
        NSB.MsgBox(`Error: ${req.status}`);
    }  

}
ddnPark.onclick=function(vp){
    if (typeof(vp) == "object"){  
    return                     
  } else {
    ddnPark.value = vp   
    NSB.MsgBox(`Hit 'Go!' to see results from your visits to ${vp}.`)
  }
}

btnGo.onclick=function(){
    var query1 = ""
    var req = ""
    var results = ""
    query1 = "SELECT comment FROM experience WHERE park = '"+ ddnPark.value +"' "
    pw = 'Bluejays20'
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=rww04096&pass=" + pw + "&database=rww04096&query=" + query1)
    if (req.status == 200) {
        results = JSON.parse(req.responseText)
      if (results.length == 0)
          NSB.MsgBox("There is no experience for this field.")
      else {        
          lblOutput.value = results
    } 

  } else {
        NSB.MsgBox("Error code: " + req.status)
}
}

btnHome.onclick=function(){
  ChangeForm(begin)
}
