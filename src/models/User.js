const mongoose = require('mongoose');


const UserScheme = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

UserScheme.methods.toJSON = function() {
    const user = this;
    const userObj = user.toObject();
    delete userObj.password;

    return userObj;
}

UserScheme.statics.findByMail = async function(email) {
    try{
        const user = await User.findOne({email});
        return user;
    } catch(error) {
        return null;
    }
}


const User = new mongoose.model('User', UserScheme);

module.exports = User;