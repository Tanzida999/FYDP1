import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    profileId: {
        type: String,
        unique: true,
        default: () => new mongoose.Types.ObjectId().toString(),
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    company_name: String,
    name: String,
    address: String,
    phone: String,
    website: String,
    medical_service_type: {
        type: String,
    },
    registration_number: String,
    tin: String,
    insurance_license_number: String,
    logo: String,
});

userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }

    next();
});

const User = mongoose.model('User', userSchema);

export default User;
