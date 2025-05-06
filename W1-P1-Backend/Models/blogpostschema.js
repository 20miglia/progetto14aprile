import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: String, required: true }
  });


const postSchema = new mongoose.Schema({
    category: {type: "string", required: true},
    title: {type: "string", required: true},
    cover: {type: "string", required: true},
    readTime: {
        value: {type: Number, required: true},
        unit: {type: "string", required: true}
    },
    author: {type: "string", required: true},
    content: {type: "string", required: true},
    comments: [commentSchema]
})

const postModel = mongoose.model("Posts", postSchema)

export default postModel
