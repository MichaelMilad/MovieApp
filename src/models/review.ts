import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  movieName: {
    type: Schema.Types.ObjectId,
    ref: 'Movie'
  }
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
