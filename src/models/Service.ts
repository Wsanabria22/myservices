import mongoose, { Schema, model, models, Types } from 'mongoose';

interface IService {
  name: string;
  description: string;
  duration: number;
  price: number;
  category: Schema.Types.ObjectId;
  picturePath: string;
}

const ServiceSchema = new Schema<IService>({
  name: {
    type: String,
    required: [true, 'El nombres es requerido'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'La descripcion es requerida'],
  },
  duration: {
    type: Number,
  },
  price: {
    type: Number,
    required: [true, 'El precio es requerido']
  },
  category: {
    type: Schema.Types.ObjectId, 
    ref: 'Category',
  },
  picturePath: {
    type: String
  },
}, {
  timestamps: true,
}
);

const Service = models.Service || model<IService>('Service', ServiceSchema);
export default Service;
