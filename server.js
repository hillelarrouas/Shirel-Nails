const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jwt-simple');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'))
const mongoose = require('mongoose');

const secret = 'gvfdgb%$^$%&3$4054423654073467$6@$&*(@%$^&2310*/-/+'

const url = "mongodb+srv://hillel:Aa25802580@cluster0.rv8jb.mongodb.net/Tens";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


const Users = mongoose.model('User', {
    name: String,
    password: String,
    email: String,
    phone: String,
    LastSeen: String
});


const Tens = mongoose.model('Tens', {
    Revenue: Number,
    Fromensbrought: Number,
    total: Number,
    Remarks: String,
    idUser: String,
    Dailydate: String,
    time: String
});

const pagserver = 2
let versionUpdate = 'true'
let coocik


app.post('/LastSeen', async (req, res) => {
    try {
        const { _id, LastSeen, pag } = req.body

        if (pagserver !== pag) {
            console.log(pag)
            res.send({versionUpdate})
            return false
        }
            await Users.updateOne({ _id }, { LastSeen })
            res.send(true)
    }
    catch (e) {
        console.log(e)
    }
})


app.get('/get-userid', testcoocik, async (req, res) => {
    try {
        let user = req.cookies.user
        let jwtuser = jwt.decode(user, secret);
        userid = jwtuser.id
        const deta = await Users.find({ _id: userid })
        res.send({ deta })
    }
    catch (e) {
        console.log(e)
    }
})


app.post('/get-categoryinit', async (req, res) => {
    try {
        if (req.body.pag !== pagserver) {
            res.send({ versionUpdate })
            return false
        }
        let user = req.cookies.user
        const newDate = new Date().getTime()

        if (user) {
            let jwtuser = jwt.decode(user, secret);
            userid = jwtuser.id
            Dateuser = jwtuser.newDate

            if (Dateuser + 172800000 < newDate) {
                res.cookie('user', user, { maxAge: 0, httpOnly: true })
                validated = false
            }
            else {
                const deta = await Tens.find({ idUser: userid })
                res.send({ deta })
            }
        }
    }
    catch (e) {
        console.log(e)
    }
})

app.post("/button-plus", async (req, res) => {
    try {
        const { Revenue, Fromensbrought, Remarks, Dailydate, time } = req.body
        let user = req.cookies.user
        let jwtuser = jwt.decode(user, secret);
        let userid = jwtuser.id
        const total = Revenue * 0.10 - Fromensbrought
        const Tensdata = new Tens({ Revenue, total, Fromensbrought, Remarks, idUser: userid, Dailydate, time });
        await Tensdata.save().then(doc => console.log(doc)).catch(e => console.log(e));
        res.send(true)
    }
    catch (e) {
        console.log(e)
    }
})

app.post('/edete-list', async (req, res) => {
    try {
        const { _id } = req.body
        const deta = await Tens.findOne({ _id })
        res.send({ deta })
    }
    catch (e) {
        console.log(e)
    }
})

app.post('/clickbuttonediting', async (req, res) => {
    try {
        const { Revenueediting, Fromensbroughtediting, Remarksediting, id, Dailydate, time } = req.body
        const total = Revenueediting * 0.10 - Fromensbroughtediting
        await Tens.updateOne({ _id: id }, { Revenue: Revenueediting, Fromensbrought: Fromensbroughtediting, total, Remarks: Remarksediting, Dailydate, time })
        res.send(true)
    }
    catch (e) {
        console.log(e)
    }
})

app.post('/deletelistditing', async (req, res) => {
    try {
        const { id } = req.body
        await Tens.deleteOne({ _id: id })
        res.send(true)
    }
    catch (e) {
        console.log(e)
    }
})

app.post('/login', async (req, res) => {
    let ok
    try {
        const { emaillogin, paswordlogin } = req.body
        const deta = await Users.find({})
        for (i = 0; i < deta.length; i++) {
            if (emaillogin == deta[i].email && paswordlogin == deta[i].password) {
                const id = deta[i]._id
                newDate = new Date().getTime()
                const token = jwt.encode({ id, newDate }, secret)
                coocik = token
                res.cookie('user', token, { httpOnly: true })
                ok = true
                break
            } else {
                ok = false
            }
        }
        res.send({ ok })
    }
    catch (e) {
        console.log(e)
    }
})


app.post('/sing_in', async (req, res) => {
    let ok = true
    let mesag = ''
    try {
        const { namesing_in, telsing_in, emailsing_in, paswordsing_in } = req.body
        const deta = await Users.find({})
        for (i = 0; i < deta.length; i++) {
            if (emailsing_in == deta[i].email) {
                if (paswordsing_in == deta[i].password) {
                    ok = false
                    mesag = 'חשבון זה כבר קיים'
                    break
                }
                else {
                    mesag = 'מייל כבר קיים במערכת'
                    ok = false
                    break
                }
            } else {
                ok = true
            }
        }
        if (ok == true) {
            const plueuser = new Users({ name: namesing_in, phone: telsing_in, email: emailsing_in, password: paswordsing_in });
            await plueuser.save().then(doc => {
                const id = doc._id
                newDate = new Date().getTime()
                const token = jwt.encode({ id, newDate }, secret)
                res.cookie('user', token, { httpOnly: true })
            }
            ).catch(e => console.log(e));
        }
        res.send({ ok, mesag })
    }
    catch (e) {
        console.log(e)
    }
})


app.post('/UserUpdate', testcoocik, async (req, res) => {
    try {
        const { namesing_in, telsing_in, emailsing_in, paswordsing_in, _id } = req.body
        // const deta = await Users.find({})
        // for (i = 0; i < deta.length; i++) {
        //     if (emailsing_in == deta[i].email && _id ==  deta[i]._id) {
        //         if (paswordsing_in == deta[i].password) {
        //             ok = false
        //             mesag = 'חשבון זה כבר קיים'
        //             break
        //         }
        //         else{
        //             mesag = 'מייל כבר קיים במערכת'
        //             ok = false
        //             break
        //         }
        //     } else {
        //         ok = true
        //     }
        // }
        await Users.updateOne({ _id }, { name: namesing_in, phone: telsing_in, email: emailsing_in, password: paswordsing_in })

        res.send({ ok: true })
    }
    catch (e) {
        console.log(e)
    }
})

app.get('/Output', (req, res) => {
    let user = req.cookies.user
    res.cookie('user', user, { maxAge: 0, httpOnly: true })
    res.send(true)
})


app.get('/Entrance', testcoocik, (req, res) => {
    let validated = true
    res.send({ validated })
})


function testcoocik(req, res, next) {
    let user = req.cookies.user
    const newDate = new Date().getTime()
    let validated = false
    if (user) {
        let jwtuser = jwt.decode(user, secret);
        let Dateuser = jwtuser.newDate
        if (Dateuser + 172800000 < newDate) {
            res.cookie('user', user, { maxAge: 0, httpOnly: true })
            res.send({ validated })
        }
        else {
            next()
        }
    }
    else {
        res.send({ validated })
    }
}


const port = process.env.PORT || 8080;
app.listen(port, () => console.log('listen on port 8080'))

