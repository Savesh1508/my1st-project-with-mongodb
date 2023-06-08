const {Schema, model} = require("mongoose")

const postSchema = new Schema (
    {
        title: {type: String, required: true},
        post_text: {type: String, required: true},
        author: {
            type: Object,
            required:true,
            name: {
                type: String,
                required: true,
                trim: true,
                uppercase: true
            },

            age: {
                type: Number,
                required: true,
                min: [0, "Bunday yosh mavjud emas"],
                max: [100, "Bunday yosh mavjud emas"]
            },

            gender: {
                type: String,
                enum: ["erkak", "ayol"],
                alias: "jinsi"
            },

            email: {
                type: String,
                required: [true, "Emailni kiriting"],
                match: [ /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ , "Itimos, to'g'ri email kiriting" ],
                lowercase: true
            }
        },
    },
    {
        versionKey: false,
        timestamps: true
    }
);

postSchema.pre("validate", () => console.log("Pre-Validate"));
postSchema.post("validate", () => console.log("Post-Validate"));
postSchema.pre("save", () => console.log("Pre-Save"));
postSchema.post("save", () => console.log("Post-Save"));


module.exports = model("Post", postSchema);