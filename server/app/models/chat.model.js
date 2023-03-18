module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      username: String,
      text_chat: String,
      room: String
    },
    {
      timestamps: true
    }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Chat = mongoose.model("chat", schema);

  return Chat;
};