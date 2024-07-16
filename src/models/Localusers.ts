import { Schema, model, models } from 'mongoose';

interface ILocalusers {
  name: string;
  email: string;
  password: string;
  isadmin: boolean;
  isSocialUser: boolean;
  origin: string;
  subId: string;
}

const LocalUserSchema = new Schema<ILocalusers>({
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

const LocalUser = models.Localuser || model<ILocalusers>('Localuser', LocalUserSchema);
export default LocalUser;
