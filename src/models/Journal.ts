import mongoose, { Schema, model, models } from 'mongoose';

interface IJournal {
  professional: Schema.Types.ObjectId;
  journalDate: Date;
  indexHour: number;
  appointment: Schema.Types.ObjectId;
  journalStatus: string;
}

const JournalSchema = new Schema<IJournal>({
  professional: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Professional",
  },
  journalDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  indexHour: {
    type: Number,
    required: true,
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Appointment",
  },
  journalStatus: {
    type: String,
    default: "free",
    required: true,
  }
},
{
  timestamps: true,
});

const Journal = models.Journal || model<IJournal>('Journal', JournalSchema);
export default Journal;
