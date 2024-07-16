import { Schema, model, models } from 'mongoose';

interface IProfessional {
  firstName: string;
  lastName: string;
  idNumber: string;
  title: string;
  picturePath: string;
}

const ProfessionalSchema = new Schema<IProfessional>({
  firstName: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'El apellido es requerido'],
    trim: true,
  },
  idNumber: {
    type: String,
    required: [true, 'La identificacion es requedida'],
    trim: true,
  },
  title: {
    type: String
  },
  picturePath: {
    type: String
  },
},
{
  timestamps: true,
});

const Professional = models.Professional || model<IProfessional>('Professional', ProfessionalSchema);
export default Professional;
