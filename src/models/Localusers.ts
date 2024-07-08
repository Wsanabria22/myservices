import { Schema, model, models } from 'mongoose';

const LocalUserSchema = new Schema({
    name: {
      type: String,
      require: [ true, "El nombre es requerido"],
      trim: true
    },
    email: {
      type: String,
      required: [ true, 'El email es requerido'],
      trim: true
    },
    password: {
      type: String,
      trim: true
    },
    isadmin: {
      type: Boolean,
      default: false,
      required: [ true, 'El tipo de usuario es requerido']
    },
    isSocialUser: {
      type: Boolean,
      default: false,
    },
    origin: {
      type: String,
      default: 'credentials'
    },
    subId: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const LocalUser = models.Localuser || model('Localuser', LocalUserSchema);
export default LocalUser;
