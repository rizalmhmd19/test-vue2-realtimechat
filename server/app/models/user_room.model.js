module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      username: String,
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
  
  const UserRoom = mongoose.model("user_room",schema);

  return UserRoom;
};