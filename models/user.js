const { Schema, model } = require("mongoose");

function getSalary(salary) {
  return (salary/100).toFixed(2)
}

function setSalary(salary) {
  return (salary*100).toFixed(2)
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    email: {
      type: String,
      required: [true, "Emailni kiriting"],
      unique: [true, "Bunday email mavjud"],
      lowercase: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Itimos, to'g'ri email kiriting"
      ],
    },

    password: {
      type: String,
      required: true,
      minLength: [6, "Parol juda qisqa"],
      maxLength: [20, "Parol keragidan uzun"]
    },

    age: {
      type: Number,
      min: [18, "18 yoshdan katta bo'lishi kerak"],
      max: [65, "65 yoshdan kichik bo'lishi kerak"],
    },

    gender: {
      type: String,
      enum: ["erkak", "ayol"],
      alias: "jinsi",
    },

    isMarried: Boolean,

    wife: {
      type: Object,
      required: function(){
        return this.isMarried
      },
      name: {
        type: String,
        trim: true
      },
      age: {
        type: Number,
        min: [18, "Kichik"]
      },
    },

    phone:{
      type: String,
      validate: {
        validator: function (value){
          return /\d{2}-\d{3}-\d{2}-\d{2}/.test(value)
        },
        message: (props) => `${props.value} - raqam noto'g'ri ( namuna: 93-500-00-01 )`,
      },
      maxLength: 12,
      index: true
    },

    salary: {
      type: Number,
      get: getSalary,
      set: setSalary,
    },
  },
  {
    versionKey: false,
    toJSON: { getters: true },
  }
);

// STATICS
userSchema.statics.findByName = function (name) {
  return this.find({name: new RegExp(name, "i")});
};

// QUERY HELPERS
userSchema.query.byName = function (name) {
  return this.where({name: new RegExp(name, "i")});
};

// userSchema.set("validateBeforeSave", false);

userSchema.pre("validate", () => console.log("Pre-Validate"))
userSchema.post("validate", () => console.log("Post-Validate"))
userSchema.pre("save", () => console.log("Pre-Save"))
userSchema.post("save", () => console.log("Post-Save"))

module.exports = model("User", userSchema);
