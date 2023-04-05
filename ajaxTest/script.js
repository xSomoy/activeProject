function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("cPallet").innerHTML =
        this.responseText;
      }
    };
    xhttp.open("GET", "colorPallet.txt", true);
    xhttp.send();
};

alert('1')
// AJAX is working