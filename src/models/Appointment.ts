import mongoose, { Schema, model, models } from 'mongoose';

interface IAppointment {
  user: string;
  client: Schema.Types.ObjectId;
  service: Schema.Types.ObjectId;
  professional: Schema.Types.ObjectId;
  quantity: number;
  appointmentStatus: string;
  serviceDate: Date;
  idxStartHour: string;
  idxFinalHour: string;
}

const AppointmentSchema = new Schema<IAppointment>({
  user: {
    type: String, 
    required: true,
  },
  client:{
    type: mongoose.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Service",
  },
  professional: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Professional",
  },
  quantity: {
    type: Number,
    required: true,
  },
  appointmentStatus: {
    type: String,
    default: "Processing",
  },
  serviceDate: {
    type: Date,
    default: Date.now,
  },
  idxStartHour: {
    type: String,
    required: true,
  },
  idxFinalHour: {
    type: String,
    required: true,
  }
},
{
  timestamps: true,
});

const Appointment = models.Appointment || model<IAppointment>('Appointment', AppointmentSchema);
export default Appointment;