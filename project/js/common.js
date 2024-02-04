
window.onload = function() {
   const loggedUser = localStorage.getItem("loggedUser");
   if(loggedUser) {
       updateMenu();
   }
}
window.document.onload = function(e){ 
    console.log(123)
    console.log("document.onlowwad", e, Date.now() ,window.tdiff,  
    (window.tdiff[0] = Date.now()) && window.tdiff.reduce(fred) ); 
}
window.onload = function(e){ 
    console.log("window.onload", e, Date.now() ,window.tdiff, 
    (window.tdiff[1] = Date.now()) && window.tdiff.reduce(fred) ); 
}
