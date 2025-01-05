import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true,},
    password: {type: String, required: true, minLength: 8, select: false},
    confirmPassword: {type: String, required: true, validate:
            { validator: function (v) {
                            return v === this.password
            }}
    },
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
})

userSchema.pre('save', async function (next) {
    if(!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 12)
    this.confirmPassword = undefined;
    next();
})

const user = mongoose.model('User', userSchema);
export default user;