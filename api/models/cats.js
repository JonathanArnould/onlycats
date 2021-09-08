import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const catsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    isFavorite: {
      type: Boolean,
      required: false,
      default: false
    },
    createdAt: {
      type: Date,
      required: false,
    },
    coordinates: {
      longitude: String,
      latitude: String,
    }
  },
)

const CatModel = mongoose.model("Cats", catsSchema);

export default CatModel
