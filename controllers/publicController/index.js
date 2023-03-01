const User = require("../../Models/userSchema");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../../config/generateToken");



/* register */
const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    const { firstName, lastName, email, phone, password, confirm_password } =
      req.body;
    if (!firstName || !lastName || !phone || !email || !password) {
      return res.status(400).json({ error: "please filled properly" });
    }

    /* for email exieted or not */
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already Exist" });
    }
    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      password,
      confirm_password,
    });

    /* user infor store in database */
    const userSignUp = await user.save();
    if (userSignUp) {
      res.status(201).json({ message: "user signup successfully" });
    } else {
      res.status(500).json({ error: "Failed to signup" });
    }
  } catch (err) {
    console.log(err);
  }
};

/* login */
const authUser = async (req, res) => {
  // console.log(req.body.data);

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "please filled you data" });
  }

  try {
    const userLogin = await User.findOne({ email: email });
    // console.log(userLogin); // get full information

    if (userLogin) {
      /* password checking with bcrypt */
      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (!isMatch) {
        res.status(400).json({ error: "password wrong" });
      } else {
        res.json({
          token: generateToken(email),
          message: "user login successfully",
        });
      }
    } else {
      res.status(400).json({ error: "user is not register " });
    }
  } catch (err) {
    console.log(err);
  }
};


const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const translateOpen = async (req, res) => {
  const { target, text } = req.body;
  console.log(target, text);
  if (!text || !target) {
    return res.status(400).json({ error: "please filled you data" });
  }
  const prompt =  `Translate this into 1. ${target}:\n\n${text}\n\n`;
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.3,
      max_tokens: 100,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    // console.log("response",response.data.choices[0])
    if(response){
      res.status(200).json({ data: response.data.choices[0].text.trim() });
    }else{
      res.status(400).json({ data: "not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  registerUser,
  authUser,
  translateOpen,
};
