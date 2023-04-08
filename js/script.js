function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        document.getElementById("test").innerHTML =
        this.responseText;
    };
    xhttp.open("GET", "../commetPart/comments.html", true);
    xhttp.send();
};

loadDoc();