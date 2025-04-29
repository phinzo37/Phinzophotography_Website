import mongoose, { Document, Schema } from 'mongoose';

export interface IPhoto extends Document {
  title: string;
  description?: string;
  album?: string;
  url: string;
  uploadDate: Date;
}

const PhotoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
  },
  url: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IPhoto>('Photo', PhotoSchema); 