import { Schema, model, models } from 'mongoose';

interface IClient {
  firstName: string;
  lastName: string;
  idNumber: string;
  celPhone: string;
  address: string;
  email: string;
};

const ClientSchema = new Schema<IClient>({
  firstName: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'El aplellido es requerido'],
    trim: true,
  },
  idNumber:{
    type: String,
    required: false,
    trim: true,
  },
  celPhone: {
    type: String,
    required: [true, 'El Numero de celular es requerido']
  },
  address: {
    type: String,
    required: false,
  },
  email: {
    type:String,
    required: false,
    trim: true,
  },
},
{
  timestamps: true,
}) ;

const Client = models.Client || model<IClient>('Client', ClientSchema);
export default Client;
