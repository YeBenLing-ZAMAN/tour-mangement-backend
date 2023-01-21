const mongoose = require('mongoose');


const walletSchema = new mongoose.Schema({
    walletAddress: {
        type: String,
        required: true
    },
    requestAmount: {
        type: String,
        required: true
    },
    requestType: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})


const Wallet = mongoose.model('WALLET', walletSchema);
module.exports = Wallet;