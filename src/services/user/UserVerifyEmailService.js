const OTPSModel = require("../../models/Users/OTPSModel");
const sendEmail = require("../../utility/SendEmailUtility");

const UserVerifyEmailService = async (Request, DataModel) => {
  try {
    // Email Account Query
    let email = Request.params.email;
    let OTPCode = Math.floor(100000 + Math.random() * 900000);

    // Database First process
    let UserCount = (await DataModel.aggregate([{$match: {email: email}}, {$count: "total"}]))[0]
      .total;

    if (UserCount > 0) {
      await OTPSModel.create({ email: email, otp: OTPCode });

      try {
        await sendEmail(OTPCode, email);
        return { status: "success", data: "OTP sent successfully" };
      } catch (error) {
        console.error("Error sending email:", error);
        return { status: "fail", data: "Failed to send OTP" };
      }
    } else {
      return { status: "fail", data: "No User Found" };
    }
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = UserVerifyEmailService;
