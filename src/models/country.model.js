import mongoose, {Schema} from "mongoose";

const countrySchema = new Schema(
    {
        country: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        qualityOfLife: {
            type: Number,
            min: 0,
            default: null,
        },
        adventure: {
            type: Number,
            min: 0,
            default: null,
        },
        heritage: {
            type: Number,
            min: 0,
            default: null,
        },
        costOfLivingIndex: {
            type: Number,
            min: 0,
            default: null,
        },
        restaurantPriceIndex: {
            type: Number,
            min: 0,
            default: null,
        },
    },
    {timestamps: true}
);

// Override `toJSON` method
countrySchema.method("toJSON", function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

const Country = mongoose.model("Country", countrySchema);
export default Country;