import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import Review from './review';

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

MovieSchema.post('findOneAndDelete', async (doc) => {
  if (doc) {
    await Review.deleteMany({
      _id: { $in: doc.reviews }
    });
  }
});

const Movie = mongoose.model('Movie', MovieSchema);
export default Movie;
