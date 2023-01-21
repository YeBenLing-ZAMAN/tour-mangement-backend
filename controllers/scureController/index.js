const Wallet = require("../../Models/walletSchema");

const createWallet = async (req, res) => {
  // const user_id = req.auth.id;
  // console.log(user_id);
  try {
    const { walletAddress, requestAmount, requestType, time } = req.body;

    if (!walletAddress || !requestAmount || !requestType || !time) {
      return res.status(422).json({ error: "please filled properly" });
    }

    const WalletExist = await Wallet.findOne({ walletAddress: walletAddress });

    if (WalletExist) {
      return res.status(422).json({ error: "Wallet address already register" });
    } else {
      const wallet = Wallet({
        walletAddress,
        requestAmount,
        requestType,
        time,
      });
      const walletAdd = await wallet.save();
      if (walletAdd) {
        return res.status(201).json({
          status: "success",
          message: "Wallet info add successfully",
          data: walletAdd,
        });
      } else {
        return res.status(500).json({ error: "Failed to add wallet info" });
      }
    }
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: "somethings is wrong",
      error: err.message,
    });
  }
};

const getWallet = async (_req, res) => {
  try {
    const allWalletInfo = await Wallet.find();
    res.send(allWalletInfo);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createWallet,
  getWallet,
};
