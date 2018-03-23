// listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);

//  ==== Submit button ====

function saveBookmark(e){
    // Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    // form validation
    if(!validateForm(siteName, siteUrl)){
        return false;
    }

    // data stored in JSON form
    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    // Local storage ( local storage only stores strings) and we have data in json form
    // Test if bookmarks is null
    
    if(localStorage.getItem('bookmarks') === null){
        // Init array
        var bookmarks = [];
        // Add to array
        bookmarks.push(bookmark);
        // set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
              
    } else {
        // get bookmarks from local storage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookmark);
        // re-set back to Local Storage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }

    // clear form
    document.getElementById('myform').reset();
    
    // Re-fetch bookmarks 
    fetchBookmark();

    // prevent form from submittion
    e.preventDefault();
}

// ==== Delete bookmark ====

function deleteBookmark(url){
    // Get bookmarks from the local Storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through bookmarks
    for(var i =0; i < bookmarks.length; i++){
        if( bookmarks[i].url == url){
        // Remove from array
        bookmarks.splice(i, 1);
    }
  }
    //   Re-set back to localStorage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    
    // Re-fetch bookmarks 
    fetchBookmark();
}

// === fetch bookmark ===

function fetchBookmark(){
    // Get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Get output at id
    var bookmarksResullt = document.getElementById('items');

    // Build output
    bookmarksResullt.innerHTML = '';
    for(var i =0; i< bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
    
    bookmarksResullt.innerHTML += `
                                    <li class="list-group-item">`+ name+`
                                        <span style="float:right"> 
                                            <a target="_blank" href=https:/`+url+` class="visit"> visit</a>
                                            <a onclick="deleteBookmark(\``+url+`\`)" class="cancel">Delete</a>
                                        </span> 
                                    </li>                                   

                                    `;
    }

}

// ===  form VAlidation

function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert('Please fill in the form');
        return false;
    }
    return true;
}  
 













