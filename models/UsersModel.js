const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')
const usersSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,'Please enter a valid email address'],
        unique:true,
        lowercase:true,
        validate:[isEmail, 'Please enter a valid email']
    },
    password:{
        type:String,
        required:[true,'Please enter a valid password'],
        minLength:[6, 'minimum length of password is 6 characters'],
    }
});


//fire a function after doc saved to db
usersSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt)
    next();
});

//static methods to login user
usersSchema.statics.login = async function (email,password){
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        }
        throw Error('Invalid password')

    }
    throw Error('Invalid email')
};

const User = mongoose.model('users',usersSchema)
module.exports = User