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
            required: true,
            min: 0,
            default: 0,
        },
        adventure: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
        heritage: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
        costOfLivingIndex: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
        restaurantPriceIndex: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
    },
    {timestamps: true}
);

const Country = mongoose.model("Country", countrySchema);
export default Country;