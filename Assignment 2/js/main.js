var inputSiteName = document.getElementById("Name");
var inputSiteUrl = document.getElementById("url");
var addBtn = document.getElementById("addBtn");

var bookmarkList = [];

if(localStorage.getItem("bookmarkContainer") !== null){
    bookmarkList = JSON.parse(localStorage.getItem("bookmarkContainer"));
    displayData();
}

function addProduct(){
    var bookmark = {
        name: inputSiteName.value,
        url: inputSiteUrl.value
    };

    bookmarkList.push(bookmark);
    localStorage.setItem("bookmarkContainer", JSON.stringify(bookmarkList));
    displayData();
    console.log(bookmarkList);
    clearForm();
}

function clearForm(){
    inputSiteName.value = null;
    inputSiteUrl.value = null;
}

function displayData() {
    var marks = "";
    for (var i = 0; i < bookmarkList.length; i++) {
        marks += `
            <tr>
                <td>${i + 1}</td>
                <td>${bookmarkList[i].name}</td>
                <td><a href="${bookmarkList[i].url}" target="_blank"><button class="btn btn-primary">Visit</button></a></td>
                <td><button onclick="deleteBookmark(${i})" class="btn btn-danger">Delete</button></td>
            </tr>
        `;
    }
    document.getElementById("tableBody").innerHTML = marks;
}

function deleteBookmark(index){
    bookmarkList.splice(index, 1);
    localStorage.setItem("bookmarkContainer", JSON.stringify(bookmarkList));
    displayData();
}

function validationName(){
    var regex = /^[a-zA-Z][a-zA-Z_ ]{2,20}$/;
    var text = inputSiteName.value;

    var msgName = document.getElementById("msgName");

    if(regex.test(text)){
        inputSiteName.classList.add("is-valid");
        inputSiteName.classList.remove("is-invalid");
        msgName.classList.add("d-none");
        return true;
    }
    else{
        inputSiteName.classList.add("is-invalid");
        inputSiteName.classList.remove("is-valid");
        msgName.classList.remove("d-none");
        return false;
    }
}

function validationUrl(){
    var regex = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
    var text = inputSiteUrl.value;

    var msgUrl = document.getElementById("msgUrl");

    if(regex.test(text)){
        inputSiteUrl.classList.add("is-valid"); // Change this to inputSiteUrl
        inputSiteUrl.classList.remove("is-invalid");
        msgUrl.classList.add("d-none"); // Update to msgUrl for URL validation
        return true;
    }
    else{
        inputSiteUrl.classList.add("is-invalid");
        inputSiteUrl.classList.remove("is-valid");
        msgUrl.classList.remove("d-none");
        return false;
    }
}
