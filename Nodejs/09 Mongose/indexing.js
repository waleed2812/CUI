var animalSchema = new Schema({
    name: String,
    type: String,
    tags: { type: [String], index: true } // field level
});

animalSchema.index({ name: 1 }); // schema level