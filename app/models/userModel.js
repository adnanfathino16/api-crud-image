export default (mongoose) => {
  const userSchema = new mongoose.Schema({
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  });

  const User = mongoose.model("users", userSchema);
  return User;
};
