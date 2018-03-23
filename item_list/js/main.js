let form = document.getElementById("addform");
let itemList = document.getElementById("items");
let filter = document.getElementById("filter");

// Submit  the form event
form.addEventListener('submit', addItem);
// Filter event
filter.addEventListener('keyup', filterItems);


// add item
function addItem(e){
    // Prevent from submitting
    e.preventDefault();
    
    // Get input value
    let newitem = document.getElementById('item').value;

    var Item = {
        value: newitem
    }    
    if(!validateForm(newitem)){
        return false;
    }
    //  local storage is null
    if(localStorage.getItem('items') === null){
        let newitemList =[];
        newitemList.push(Item);
        localStorage.setItem("items", JSON.stringify(newitemList));
    } else {
    // if there is list of item
        let newitemList = JSON.parse(localStorage.getItem('items'));
        newitemList.push(Item);
        // re-set back to local storage
        localStorage.setItem('items',JSON.stringify(newitemList));
    }

    // fetch items
    fetchItems(); 

    // re-set the input 
    document.getElementById('addform').reset();
}

function fetchItems(){
    // get items from localstorage
    let newitemList = JSON.parse(localStorage.getItem('items'));
    // get output at id 
    let itemsResult = document.getElementById('items');

    // Build output 
    itemsResult.innerHTML = "";
    for(let i =0; i< newitemList.length ;i++){
       let value = newitemList[i].value;

        itemsResult.innerHTML += `
                                <li class="list-group-item">`+ value +`<a onclick="deleteItem(\``+value+`\`)" 
                                class="cancel">Delete</a></span> </li>

        `;  
    }
}

//  Remove Item
function deleteItem(value){
    // Get bookmarks from the local Storage
    var newitemList = JSON.parse(localStorage.getItem('items'));
    // Loop through bookmarks
    for(var i =0; i < newitemList.length; i++){
        if(newitemList[i].value == value){
            // Remove from array
            newitemList.splice(i, 1);
          }
    }
        
    // reset the item list
    localStorage.setItem('items',JSON.stringify(newitemList));
    
    fetchItems();
}

// Filter items
function filterItems(e){
    // convert text to lowercase
    let text = e.target.value.toLowerCase();
    let items = itemList.getElementsByTagName('li');
    // convert to an array
    Array.from(items).forEach(function(item){
        let itemName = item.firstChild.textContent;
        if(itemName.toLowerCase().indexOf(text) != -1){
            // when it matches
            item.style.display = "block";
        }else{
            item.style.display = 'none';
        }

    });
}

// == form Validation

function validateForm(newitem){
    if(!newitem){
        alert('Please fill the form');
        return false;
    }
    return true;   
}