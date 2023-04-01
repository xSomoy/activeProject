function loadData(){
    // Create New Request 
    const xhr = new XMLHttpRequest();

    // What to do when response arraives
    xhr.onload = function (){
        const container = document.getElementById('demo');
        demo.innerHTML = xhr.responseText;

    };

    // prepare request - methods : GET , POST, PUT, PATCH, DELETE, OPTIONS 

    xhr.open("GET","./ajax/data.txt" );
    // Send Request

    xhr.send();
};

// AJAX is working