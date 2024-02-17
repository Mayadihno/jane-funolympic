/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { Button, Card, CardContent, Stack } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import OtpInput from "otp-input-react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import styles from "../../components/styles/styles";
import { doc, setDoc } from "firebase/firestore";

const Local = ({ setActive }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [user, setUser] = useState(null);
  const [showOTP, setShowOTP] = useState(false);
  const navigate = useNavigate();

  const onCaptchVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
            console.log(response);
          },
          "expired-callback": () => {},
        }
      );
    }
    // Set appVerificationDisabledForTesting property
    auth.appVerificationDisabledForTesting = true;
  };

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + phoneNumber;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP Send Successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        if (error.code === "auth/invalid-phone-number") {
          toast.error("Invalid Phone Number");
        }
        if (error.code === "auth/too-many-requests") {
          console.error(
            "Too many authentication attempts. Please try again later."
          );
        }
      });
  }
  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);

        await setDoc(doc(db, "users", res.user.uid), {
          phoneNumber: res.user.phoneNumber,
        });
      })
      .catch((err) => {
        console.log(err.code);
        setLoading(false);
      });
  }
  if (user) {
    navigate("/fixtures", { replace: true });
    toast.success("You Have Login Successfully");
  }
  return (
    <React.Fragment>
      <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-50 flex justify-center items-center">
        <div className=" relative w-[98%] 800px:w-[60%] h-[50vh] 800px:h-[75vh] bg-white rounded-md p-4 shadow-sm">
          <RxCross1
            size={30}
            className="absolute right-3 top-3 z-50 cursor-pointer"
            onClick={() => setActive(false)}
          />
          <h1 className={`${styles.heading} !text-center mt-5`}>
            Local user signin
          </h1>
          <div className="flex justify-center items-center mt-10">
            <div className="phone">
              <div
                id="recaptcha-container"
                className="recaptcha-container"
              ></div>
              {!user && (
                <div className="phone__content">
                  {!showOTP ? (
                    <Card className="text-center">
                      <CardContent>
                        <h1 className="text-[16px] font-[600] font-Poppins pb-6">
                          Sign In with UK phone number
                        </h1>
                        <div className="icons"></div>
                        <div className="phone__input">
                          <PhoneInput
                            country="gb"
                            enableAreaCodes={true}
                            onlyCountries={["gb", "ng"]}
                            preserveOrder={[
                              "onlyCountries",
                              "preferredCountries",
                            ]}
                            value={phoneNumber}
                            onChange={setPhoneNumber}
                          />
                        </div>
                        <div className="button">
                          <Stack
                            align="center"
                            padding={"20px 0px"}
                            display={"flex"}
                            justifyContent={"center"}
                          >
                            {loading ? (
                              <Button
                                color="primary"
                                variant="contained"
                                startIcon={
                                  <span className="text-[14px]">
                                    Sending Code...
                                  </span>
                                }
                              />
                            ) : (
                              <Button
                                onClick={onSignup}
                                color="primary"
                                variant="contained"
                              >
                                <span>Get Code</span>
                              </Button>
                            )}
                          </Stack>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="phone__otp">
                      <Card className="text-center">
                        <CardContent>
                          <h1 className="text-[16px] font-[600] font-Poppins pb-3">
                            Welcome back user
                          </h1>
                          <div className="icons"></div>
                          <div className=" text-gray-700 text-[14px] pb-2">
                            Input Receive OTP Here
                          </div>
                          <div className="otp">
                            <OtpInput
                              OTPLength={6}
                              otpType="number"
                              value={otp}
                              onChange={setOtp}
                              disabled={false}
                              autoFocus
                              className="otp-container"
                            ></OtpInput>
                          </div>
                          <div className="button">
                            <Stack
                              align="center"
                              padding={"20px 0px"}
                              display={"flex"}
                              justifyContent={"center"}
                            >
                              {loading ? (
                                <Button
                                  color="primary"
                                  variant="contained"
                                  startIcon={<span>Verifying OTP</span>}
                                />
                              ) : (
                                <Button
                                  onClick={onOTPVerify}
                                  color="primary"
                                  variant="contained"
                                >
                                  <span>Verify OTP</span>
                                </Button>
                              )}
                            </Stack>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Local;
