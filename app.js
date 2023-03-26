const btn = document.getElementById('btn');
const i = document.getElementById("myText");
function showBtn(){
    var x = document.getElementById("myText").value;
    if(x.length > 0){
        btn.style.display = "block";
        btn.style.borderRadius = "0 5px 5px 0"
        i.style.borderRadius = "5px 0 0 5px"
    }
    else{
        btn.style.display = "none";
        i.style.borderRadius = "5px"
    }
}

// Update thr todos

let itemJsonArray = [];
let itemJsonArraystr;

function getAndUpdate(){
    let myToDo = document.getElementById('myText').value;
    console.log(myToDo);
    if(myToDo !== ""){
        if(localStorage.getItem('itemJson') == null){
            itemJsonArray = [];
            itemJsonArray.push([myToDo]);
            localStorage.setItem('itemJson', JSON.stringify(itemJsonArray));
        }
        else{
            itemJsonArraystr = localStorage.getItem('itemJson');
            itemJsonArray = JSON.parse(itemJsonArraystr);
            itemJsonArray.push([myToDo]);
            localStorage.setItem('itemJson', JSON.stringify(itemJsonArray));
        }
        update();
        clearTextField();
        showBtn()
    }
    else{
        alert("Error....!");
    }
}

function update(){
    if(localStorage.getItem('itemJson') == null){
        itemJsonArray = [];
        localStorage.setItem('itemJson', JSON.stringify(itemJsonArray));
    }
    else{
        itemJsonArraystr = localStorage.getItem('itemJson');
        itemJsonArray = JSON.parse(itemJsonArraystr);
    }
    let tableBody = document.getElementById('tableBody');
    let tablehead = document.getElementById('tablehead');
    let he = '';
    let str = '';
    itemJsonArray.forEach((element, index) =>{
        he = `<tr>
            <th>Items</th>
            <th>Action</th>
        </tr>`;
        str += `
            <tr>
                <td id="${index}">${element[0]}</td>
                <td class="ali"><i class="bi bi-trash-fill" id="delete" onclick="deleted(${index})"></i></td>
            </tr>
        `;
        // <i class="bi bi-check-square-fill" onclick="checked(${index})"></i>
    });
    tablehead.innerHTML = he;
    tableBody.innerHTML = str;
}

function clearTextField(){
    document.getElementById('myText').value = "";
}

btn.addEventListener('click', getAndUpdate);
update();

function deleted(item){
    console.log("Deleted", item);
    itemJsonArraystr = localStorage.getItem('itemJson');
    itemJsonArray = JSON.parse(itemJsonArraystr);

    itemJsonArray.splice(item, 1);
    localStorage.setItem('itemJson', JSON.stringify(itemJsonArray));
    update();
}