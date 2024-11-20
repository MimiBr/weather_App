const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, minlength: 3 },
    password: {
        type: String, required: true, unique: true, match: [
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
            'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.'
        ]
    },
    favoriteCities: { type: [String], default: [] }
})

userSchema.methods.matchPassword = function (enteredPassword) {
    return enteredPassword === this.password;
};

const User = mongoose.model('User', userSchema);
module.exports = User;