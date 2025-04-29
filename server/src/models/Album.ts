import mongoose, { Document, Schema } from 'mongoose';

export interface IAlbum extends Document {
  title: string;
  description?: string;
  coverPhoto?: string;
  photos: string[];
  createdAt: Date;
  updatedAt: Date;
}

const AlbumSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  coverPhoto: {
    type: Schema.Types.ObjectId,
    ref: 'Photo',
  },
  photos: [{
    type: Schema.Types.ObjectId,
    ref: 'Photo',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
AlbumSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model<IAlbum>('Album', AlbumSchema); 