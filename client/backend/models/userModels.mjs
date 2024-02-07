import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import validator from 'validator';

const RegisterSchema = new mongoose.Schema({
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
        enum: ['general', 'surgery', 'pediatrics', 'others']
    },
    registration_number: String,
    tin: String,
    insurance_license_number: String,
    logo: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date
}, { timestamps: true });

RegisterSchema.statics.signup = async function (email, password, role) {
    if (!email || !password || !role) {
        throw Error("All fields must be filled!");
    }
    if (!validator.isEmail(email)) {
        throw Error("Not a valid email");
    }

    const exists = await this.findOne({ email });

    if (exists) {
        throw Error("Email already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash, role });

    return user;
};

RegisterSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled');
    }

    const user = await this.findOne({ email });
    if (!user) {
        throw Error('Incorrect email');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error('Incorrect password');
    }

    return user;
};

RegisterSchema.statics.profile = async function (email, phone, address) {
    const updateFields = {};

    if (typeof phone !== 'undefined') {
        updateFields.phone = phone !== '' ? phone : null;
    }

    if (typeof address !== 'undefined') {
        updateFields.address = address !== '' ? address : null;
    }

    const user = await this.findOneAndUpdate({ email }, { $set: updateFields }, { new: true });

    return user;
};

RegisterSchema.statics.getUser = async function (email) {
    const user = await this.findOne({ email });

    return user;
};

export default mongoose.model("user", RegisterSchema);
