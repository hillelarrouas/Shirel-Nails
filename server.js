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
});


const Tens = mongoose.model('Tens', {
    Revenue: Number,
    Fromensbrought: Number,
    total: Number,
    Remarks: String,
});

app.get('/get-categoryinit', async (req, res) => {
    try {
        const deta = await Tens.find({})
        res.send({ deta })
    }
    catch (e) {
        console.log(e)
    }
})

app.post("/button-plus", async (req, res) => {
    try {
        const { Revenue, Fromensbrought, Remarks } = req.body
        const total = Revenue * 0.10 - Fromensbrought
        const Tensdata = new Tens({ Revenue, total, Fromensbrought, Remarks });
        await Tensdata.save().then(doc => console.log(doc)).catch(e => console.log(e));
        const deta = await Tens.find({})
        res.send({ deta })
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
        const { Revenueediting, Fromensbroughtediting, Remarksediting, id } = req.body
        const total = Revenueediting * 0.10 - Fromensbroughtediting
        await Tens.updateOne({ _id: id }, { Revenue: Revenueediting, Fromensbrought: Fromensbroughtediting, total, Remarks: Remarksediting })
        const deta = await Tens.find({})
        res.send({ deta })
    }
    catch (e) {
        console.log(e)
    }
})

app.post('/deletelistditing', async (req, res) => {
    try {
        const { id } = req.body
        await Tens.deleteOne({ _id: id })
        const deta = await Tens.find({})
        res.send({ deta })
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
    try {
        const { namesing_in, telsing_in, emailsing_in, paswordsing_in } = req.body
        const deta = await Users.find({})
        for (i = 0; i < deta.length; i++) {
            if (emailsing_in == deta[i].email && paswordsing_in == deta[i].password) {
                ok = false
                break
            } else {
                ok = true
            }
        }
        if (ok == true) {
            const plueuser = new Users({ name: namesing_in, phone: telsing_in, email: emailsing_in, password: paswordsing_in });
            await plueuser.save().then(doc => console.log(doc)).catch(e => console.log(e));
        }
        console.log(ok)
        res.send({ ok })
    }
    catch (e) {
        console.log(e)
    }
})



const port = process.env.PORT || 8080;
app.listen(port, () => console.log('http://localhost:8080/login/login.html'))

