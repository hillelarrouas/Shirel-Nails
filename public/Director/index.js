const inputSearch = document.querySelector("#inputSearch")
const Search = document.querySelector('.Search')
const cardboxcatygory = document.querySelector('.cardboxcatygory')
const cardCategory = document.querySelector('.cardCategory')
const carbox = document.querySelector('.carbox')
const titlecategory = document.querySelector('.titlecategory')
const ShowAll = document.querySelector('.ShowAll')
const message = document.querySelector("#message")
const Registration = document.querySelector('.Registration')
const textmessage = document.querySelector('.textmessage')
const Searchtml = document.querySelector('.Searchtml')
const outcome = document.querySelector('.outcome')
const cardtext = document.querySelector('.cardtext')
const menu = document.querySelector(".menu")
const menubutoon = document.querySelector(".menubutoon")
const UsersList = document.getElementById('UsersList');
const ShelfList = document.getElementById('ShelfList');
const cardlogin = document.querySelector('.cardlogin')


function connected() {

    fetch('/alluserconnected')
        .then(res =>
            res.json()
        )
        .then(data => {
            console.log(data)
            document.getElementById('UsersList').innerHTML =
                `
                <h1>משתמשים מחוברים</h1>
    <table>
    <thead>
        <tr>
            <th></th>
            <th>זהות משתמש</th>
            <th>שם משתמש</th>
            <th>תפקיד</th>
        </tr>
    </thead>
        <tbody>
            ${data.data.map(elm =>
                    `<tr>
            <td class="flexdeleteuser">
            <a action="Edit" class="deleteuser" onclick='editUser("${elm._id}")'><img src="/img/edit-button.png"></a>
            <a action="Delete" class="deleteuser" onclick='deleteUser("${elm._id}")'><img src="/img/deleteuser.png"></a>
            </td>
                    <td>${elm.id_user}</td>
                    <td>${elm.userName}</td>
                    <td>${elm.role}</td> 
            </tr>
    
    `).join('')}</tbody>
    </table>`;
            outcome.style.display = 'none'
            Registration.style.display = 'none'
            Search.style.display = 'none'
            cardediting.style.display = 'none'
            ShowAll.style.display = 'none'
            cardCategory.style.display = 'none'
            ShelfList.style.display = 'none'
            cardplusvideo.style.display = 'none'
            editUserById.style.display = 'none'
            menubutoondisplayblock()
            UsersList.style.display = 'block'

        })
}

const xdeta = new Date().getHours()
let hour

if (xdeta >= 6 && xdeta < 12) {
    hour = "בוקר טוב"
}
if (xdeta >= 12 && xdeta < 18) {
    hour = "צהרים טובים"
}
if (xdeta >= 18 && xdeta < 23) {
    hour = "ערב טוב"
}
if (xdeta >= 23 || xdeta >= 0 && xdeta < 6) {
    hour = "לילה טוב"
}

setInterval(function () { testcoocik() }, 100000);

testcoocik()
function testcoocik() {
    fetch('/Cookie-test')
        .then(r => r.json())
        .then(data => {
            if (data.validated == "ok") {
                document.body.style.display = "block"
                cardlogin.innerHTML = `<div class="textcardlogin">${hour}</div><img onclick='editUsercardlogin("${data.id}")' src="/img/user.jpg" alt=""><div class="textcardlogin">${data.name}</div>`

            } else if (data.validate == 'none') {
                location.href = '/userRegular/index.html'
            } else {
                location.href = '/login/login.html'
            }
        })
}
function Output() {
    fetch('/Output')
        .then(res =>
            res.json()
        )
        .then(data => {
            if (data) {
                location.href = '/login/login.html'
            }
        })
}

const editUsercardlogin = (userId) => {
    menubutoondisplayblock()
    outcome.style.display = 'none'
    Registration.style.display = 'none'
    Search.style.display = 'none'
    cardplusvideo.style.display = 'none'
    cardediting.style.display = 'none'
    ShowAll.style.display = 'none'
    cardCategory.style.display = 'none'
    UsersList.style.display = 'none'
    ShelfList.style.display = 'none'

    fetch('/get-details-users' + userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(data => {
            editUserById.style.display = "block"

            document.getElementById('editUserById').innerHTML =
                `
                <h1>עריכת פרטים אישיים</h1>
                    <form onsubmit="handleEditUser(event)">
                 <div class="rtl">
                     <label for="id_user">מספר זהות:
                    <input type="text" name="id_user" id="id_user" value="${data.id_user}" disabled="disabled" autocomplete='off'></br>
                </label>
                <label for="name">שם:
                    <input type="text" name="name" id="name" value="${data.name}" autocomplete='off'></br>
                </label>
                <label for="userName">שם משתמש:
                    <input type="text" name="username" id="userName" value=${data.userName} autocomplete='off'></br>
                </label>
                <label for="password">סיסמה:
                    <input type="text" name="password" id="password" value=${data.password} autocomplete='off'></br>
                </label>
                <label for="email">אימייל:
                    <input type="email" name="email" id="email" value=${data.email} autocomplete='off'></br>
                </label>
                <label for="phone">פלאפון:
                    <input type="text" name="phone" id="phone" value=${data.phone} autocomplete='off'></br>
                </label>
            </div>
            <input type="text" value="${data.role}" disabled="disabled" autocomplete='off'></br>
            <div id="messag"></div></br>
            <input type="submit" value="שמור שינויים">
        </form>`
        })
}

function displaynoneeditusercardlogin() {
    editUserById.style.display = 'none'
}


inputSearch.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        functionSearch()
    }
})

function deletesearch() {
    Search.style.display = 'none'
    inputSearch.value = ''
}

function cardCategorydisplaynone() {
    cardCategory.style.display = 'none'
}

function Addauser() {
    menubutoondisplayblock()
    editUserById.style.display = "none"
    cardCategory.style.display = 'none'
    ShowAll.style.display = 'none'
    Search.style.display = 'none'
    UsersList.style.display = 'none'
    cardediting.style.display = 'none'
    cardplusvideo.style.display = 'none'
    Registration.style.display = 'block'
}
function Registrationdisplaynone() {
    Registration.style.display = 'none'
}


function Searchdisplayblock() {
    menubutoondisplayblock()
    Search.style.display = 'block'
    editUserById.style.display = "none"
    cardCategory.style.display = 'none'
    ShowAll.style.display = 'none'
    cardediting.style.display = 'none'
    UsersList.style.display = 'none'
    cardplusvideo.style.display = 'none'
    Registration.style.display = 'none'
    ShelfList.style.display = 'none'
    inputSearch.focus()
}
function deleteoutcome() {
    outcome.style.display = 'none'
}


function functionSearch() {
    const inputvalue = inputSearch.value

    if (inputvalue.length == 0) {
        textmessage.innerHTML = 'הזן מידע לחיפוש'
    }
    else {
        textmessage.innerHTML = '<img src="/img/gif.gif">'

        fetch('/Searchdeta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inputvalue })
        }).then(res =>
            res.json()
        )
            .then(data => {
                Searchtml.innerHTML = ""

                if (data.data[0] == undefined) {
                    textmessage.innerHTML = "מידע לא נמצא"
                }
                else {
                    textmessage.innerHTML = "console.log"
                    console.log(data.data)
                }
            })
    }
}

const handleRegistration = (e) => {
    e.preventDefault();

    let id_user = document.querySelector('#id_user')
    let name = document.querySelector('#name')
    let userName = document.querySelector('#userName')
    let password = document.querySelector('#password')
    let email = document.querySelector('#email')
    let phone = document.querySelector('#phone')
    let role = document.querySelector('#role')

    if (id_user.value.length !== 9) {
        message.innerHTML = 'מספר זהות לא תקין'
    } else if (name.value.length < 2) {
        message.innerHTML = 'נדרש להזין שם מלא תקין'
    } else if (userName.value.length < 2) {
        message.innerHTML = 'נדרש להזין שם משתמש</br> המכיל 2 תווים לפחות '
    } else if (password.value.length < 6) {
        message.innerHTML = 'בחר/י סיסמה המכילה 6</br> תווים לפחות'
    } else if (email.value.length == 0) {
        message.innerHTML = 'נדרש להזין כתובת מייל'
    } else if (phone.value.length !== 9 && phone.value.length !== 10) {
        message.innerHTML = 'מספר טלפון לא תקין'
    } else if (role.value == "דירוג") {
        message.innerHTML = 'בחר דירוג למשתמש'
    } else {
        let concat = {
            "id_user": id_user.value,
            "name": name.value,
            "userName": userName.value,
            "password": password.value,
            "email": email.value,
            "phone": phone.value,
            "role": role.value,
        }
        message.innerHTML = '<img src="/img/gif.gif">'

        fetch('/send-User-details-sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(concat)
        }).then(res =>
            res.json()
        )
            .then(data => {
                console.log(data.message)
                if (data.message == 'ok') {
                    message.innerHTML = "הוספת המשתמש בוצע בהצלחה"
                    console.log('הוספת המשתמש בוצע בהצלחה')
                    id_user.value = ''
                    name.value = ''
                    userName.value = ''
                    password.value = ''
                    email.value = ''
                    phone.value = ''
                    role.value = 'דירוג'

                    setTimeout(() => {
                        getListUsers()
                    }, 500);

                } else {
                    message.innerHTML = data.message
                }
            })
    }
}


function getCategory() {
    menubutoondisplayblock()
    let aryycategory = []
    cardediting.style.display = 'none'
    cardplusvideo.style.display = 'none'
    editUserById.style.display = "none"
    Registration.style.display = 'none'
    Search.style.display = 'none'
    ShowAll.style.display = 'none'
    UsersList.style.display = 'none'
    ShelfList.style.display = 'none'
    cardCategory.style.display = 'block'
    cardboxcatygory.innerHTML = ''
    fetch('/get-category')
        .then(res =>
            res.json()
        )
        .then(data => {
            console.log(data.data[0])
            if (data.data[0] == undefined) {
                cardboxcatygory.innerHTML = '<h1>אין לך סרטונים</h1>'
            } else {
                data.data.forEach(elm => {
                    console.log(elm._id)
                    cardboxcatygory.innerHTML += `<div class="videodiv"><img src="/img/editing.png" onclick="editingvideo('${elm._id}')"><h1>${elm.name}</h1>${elm.link}</div>`
                })
            }
        })
}

const cardediting = document.querySelector('.cardediting')
function editingvideo(id) {

    cardediting.style.display = 'block'
    cardCategory.style.display = 'none'

    fetch('/editingvideo', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    }).then(res =>
        res.json()
    )
        .then(data => {
            cardediting.innerHTML =
                `<img src="/img/return.png" onclick="reterngetCategory()">
            <h1>עריכת ווידאו</h1>
                <div class="rtl">
                    <label for="namevideo">שם ווידאו
                        <input type="text" name="namevideo" id="namevideoediting" autocomplete='off' value="${data.data.name}"></br>
                    </label>
                    <label for="linkvideo">קישור ווידאו
                        <input type="text" name="linkvideo" id="linkvideoediting" autocomplete='off' value='${data.data.link}'></br>
                    </label>
                </div>
                <div class="mesaediting"></div>
                <button onclick='editing("${data.data._id}")'>שמירה</button>
                <button onclick='deletevideo("${data.data._id}")'>מחיקה</button>
        `
        })
}

function deletevideo(id) {
    fetch('/deletevideo', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    }).then(res =>
        res.json()
    )
        .then(data => {
            namevideo.value = ''
            linkvideo.value = ''
            getCategory()
        })
}
function reterngetCategory() {
    cardediting.style.display = 'none'
    cardplusvideo.style.display = 'none'
    cardCategory.style.display = 'block'
}



function editing(id) {

    const mesaediting = document.querySelector('.mesaediting')
    const namevideovalue = document.querySelector('#namevideoediting').value
    const linkvideovalue = document.querySelector('#linkvideoediting').value
console.log(linkvideovalue.length)
    cardboxcatygory.innerHTML = ''

    if (namevideovalue.length == 0) {
        mesaediting.innerHTML = 'הזן שם לסרטון'
    } else if (linkvideovalue.length == 0) {
        mesaediting.innerHTML = 'הוסף קישור'
    } else if (linkvideovalue.length !== 219) {
        mesaediting.innerHTML = 'קישור לא תקין'
    } else {

        fetch('/editing', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ linkvideovalue, namevideovalue, id })
        }).then(res =>
            res.json()
        )
            .then(data => {
                getCategory()
            })
    }
}




const cardplusvideo = document.querySelector('.cardplusvideo')
const namevideo = document.querySelector('#namevideo')
const linkvideo = document.querySelector('#linkvideo')
const mesa = document.querySelector('.mesa')

function plusvideo() {
    cardplusvideo.style.display = 'block'
    cardCategory.style.display = 'none'
    namevideo.focus()
    menubutoondisplayblock()
}

function oksubmitvideo(e) {
    e.preventDefault();

    const namevideovalue = namevideo.value
    const linkvideovalue = linkvideo.value
    cardboxcatygory.innerHTML = ''

    if (namevideovalue.length == 0) {
        mesa.innerHTML = 'הזן שם לסרטון'
    } else if (linkvideovalue.length == 0) {
        mesa.innerHTML = 'הוסף קישור'
    }else if (linkvideovalue.length !== 219) {
        mesa.innerHTML = 'קישור לא תקין'
    } else {

        fetch('/plusvideo', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ linkvideovalue, namevideovalue })
        }).then(res =>
            res.json()
        )
            .then(data => {
                data.data.forEach(elm => {
                    cardboxcatygory.innerHTML += `<div class="videodiv"><img src="/img/editing.png" onclick="editingvideo("${elm._id}")"><h1>${elm.name}</h1>${elm.link}</div>`
                })
                
                getCategory()
                cardplusvideo.style.display = 'none'
                
            })
    }
}








function getListUsers() {
    menu.style.right = '-220px'

    fetch('/get-List-Users')
        .then(res =>
            res.json()
        )
        .then(data => {
            if (data.data != null) {
                cardplusvideo.style.display = 'none'
                outcome.style.display = 'none'
                Registration.style.display = 'none'
                Search.style.display = 'none'
                ShowAll.style.display = 'none'
                cardCategory.style.display = 'none'
                editUserById.style.display = "none"
                ShelfList.style.display = 'none'
                UsersList.style.display = 'block'
                alluser(data.data)
            }
        })
}

const deleteUser = (userId) => {

    fetch('/' + userId, {

        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(res =>
        res.json()
    )
        .then(data => {
            alluser(data)
        })
}

function displayblockmenu(event) {
    menu.style.right = '0'
}

function menubutoondisplayblock() {
    menu.style.right = '-220px'
}

function UsersListnone() {
    UsersList.style.display = 'none'
}

function alluser(data) {
    document.getElementById('UsersList').innerHTML =
        `<div class="col-sm-4">
        <button class="Addanewuser" onclick="Addauser()"><img src="/img/adduser.png"></button>
        </div>
<table>
<thead>
    <tr>
        <th></th>
        <th>זהות משתמש</th>
        <th>שם משתמש</th>
        <th>תפקיד</th>
    </tr>
</thead>
    <tbody>
        ${data.map(elm =>
            `<tr>
        <td class="flexdeleteuser">
        <a action="Edit" class="deleteuser" onclick='editUser("${elm._id}")'><img src="/img/edit-button.png"></a>
        <a action="Delete" class="deleteuser" onclick='deleteUser("${elm._id}")'><img src="/img/deleteuser.png"></a>
        </td>
                <td>${elm.id_user}</td>
                <td>${elm.userName}</td>
                <td>${elm.role}</td> 
        </tr>

`).join('')}</tbody>
</table>`;
}

const editUserById = document.querySelector("#editUserById")

function editUserByIddisplaynone() {
    editUserById.style.display = "none"
    UsersList.style.display = 'block'
}

const editUser = (userId) => {
    menubutoondisplayblock()
    letdistinctResult = [];
    fetch('/get-details-users' + userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(data => {
            editUserById.style.display = "block"
            UsersList.style.display = 'none'

            document.getElementById('editUserById').innerHTML =
                `<img class="imgdeleteeditUser" src="/img/return.png" onclick="editUserByIddisplaynone()">
                    <h1>עריכת משתמש</h1>
                    <form onsubmit="handleEditUser(event)">
                    
                 <div class="rtl">
                 
                     <label for="id_user">מספר זהות:
                    <input type="text" name="id_user" id="id_user" value="${data.id_user}" disabled="disabled" autocomplete='off'></br>
                </label>
                <label for="name">שם:
                    <input type="text" name="name" id="name" value="${data.name}" autocomplete='off'></br>
                </label>
                <label for="userName">שם משתמש:
                    <input type="text" name="username" id="userName" value=${data.userName} autocomplete='off'></br>
                </label>
                <label for="password">סיסמה:
                    <input type="text" name="password" id="password" value=${data.password} autocomplete='off'></br>
                </label>
                <label for="email">אימייל:
                    <input type="email" name="email" id="email" value=${data.email} autocomplete='off'></br>
                </label>
                <label for="phone">פלאפון:
                    <input type="text" name="phone" id="phone" value=${data.phone} autocomplete='off'></br>
                </label>
            </div>
            <select name="role" id="role" value=${data.role}>
                <option style="display: none;">${data.role}</option>
                <option>תלמידה</option>
                <option>מנהל</option>
            </select></br>
            <div id="messag"></div></br>
            <input type="submit" value="שמור שינויים">
        </form>`
        })
}


function handleEditUser(e) {
    e.preventDefault();

    let id_user = e.target[0].value;
    let name = e.target[1].value;
    let userName = e.target[2].value;
    let password = e.target[3].value;
    let email = e.target[4].value;
    let phone = e.target[5].value;
    let role = e.target[6].value;


    let message = document.getElementById('messag');
    message.innerHTML = ''
    if (name.length < 2) {
        message.innerHTML = 'נדרש להזין שם מלא תקין'
    } else if (userName.length < 2) {
        message.innerHTML = 'נדרש להזין שם משתמש</br> המכיל 2 תווים לפחות '
    } else if (password.length < 6) {
        message.innerHTML = 'בחר/י סיסמה המכילה 6</br> תווים לפחות'
    } else if (email.length == 0) {
        message.innerHTML = 'נדרש להזין כתובת מייל'
    } else if (phone.length !== 9 && phone.length !== 10) {
        message.innerHTML = 'מספר טלפון לא תקין'
    } else if (role == "דירוג") {
        message.innerHTML = 'בחר דירוג למשתמש'
    } else {

        console.log(id_user, name, userName, password, email, role)

        fetch("/update", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_user, name, userName, password, email, phone, role })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message == 'ok') {
                    message.innerHTML = 'המשתמש עודכן במערכת'
                    getListUsers()

                } else {
                    message.innerHTML = data.message
                }
            })
    }
}




function addNewShelf() {
    menubutoondisplayblock()
    ShelfList.style.display = 'none'

}

function addShelflist() {
    ShelfList.style.display = 'block'
}

