const { getDb } = require("../Utils/dbConnect");
const jwt = require('jsonwebtoken');
const { ObjectId } = require("mongodb");
module.exports.getAllUser = async (req, res) => {
    const db = getDb();
    const userCollection = db.collection('users');
    const query = {};
    const cursor = userCollection.find(query);
    const result = await cursor.toArray();
    res.send(result);
}
module.exports.getUser = async (req, res) => {
    const db = getDb();
    const userCollection = db.collection('users');
    const email = req.params.email;
    const query = {email: email};
    const cursor = userCollection.find(query);
    const result = await cursor.toArray();
    res.send(result);
}
module.exports.loginUser = async (req, res) => {
    const db = getDb();
    const userCollection = db.collection('users');
    const user = req.body.user;
    const query = { email: user.email };
    const cursor = userCollection.find(query);
    const result = await cursor.toArray();
    const token = jwt.sign({ email: user.email }, process.env.WEB_TOKEN_SECRET, { expiresIn: '1d' });
    if(user.email === result[0]?.email){
        if(user.password === result[0].password){
            res.send({ result, token, success:true });
        }else{
            res.send({message: "Wrong Password", success:false})
        }
    }else{
        res.send({message: "Invalid user", success: false})
    }
};

module.exports.updateUser = async (req, res) => {
    const db = getDb();
    const userCollection = db.collection('users');
    const email = req.params.email;
    const data = req.body;
    const filter = { email: email };
    const options = { upsert: true };
    const updateDoc = {
        $set: data
    };
    const result = await userCollection.updateOne(filter, updateDoc, options);
    res.send(result);
};
module.exports.registerUser = async (req, res) => {
    const db = getDb();
    const userCollection = db.collection('users');
    const user = req.body;
    const result = await userCollection.insertOne(user)
    res.send(result);
};