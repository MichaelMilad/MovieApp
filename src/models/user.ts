import mongoose, { Document } from 'mongoose';
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose';
// const bcrypt = require('bcrypt');
// const createHttpError = require('http-errors');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  movieList: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Movie'
    }
  ]
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

export interface SavedUserDocument extends Document {
  name: string;
  movieList: [];
  age: number;
}

const User = mongoose.model<SavedUserDocument>('User', UserSchema);
export default User;
