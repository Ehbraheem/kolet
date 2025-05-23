import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
  } from "react-native";
  import React, { useRef, useState } from "react";
  import { Colors } from "@/constants/Colors";
  import { hp, wp } from "@/helpers/common";
  import { useSafeAreaInsets } from "react-native-safe-area-context";
  import Animated, {
    FadeInDown,
    FadeInUp,
  } from "react-native-reanimated";
  import { router } from "expo-router";
  import ArrowLftIC from "@/assets/images/svg/ArrowLftIC";
  const PaymentVerification = () => {
    const handleButton = () => {
      router.navigate("/(tabs)/nfcPayment/verifyOTP");
    };
    const { top } = useSafeAreaInsets();
    const paddinTop = top > 0 ? top + 10 : 30;
    const [otpValues, setOtpValues] = useState(["", "", "", ""]);
    const otpInputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const handleOTPEnter = (value: string, index: number) => {
      const newOTPValues = [...otpValues];
      newOTPValues[index] = value;
      setOtpValues(newOTPValues);
    };
    const focusNext = (currentIndex: number) => {
      if (currentIndex < 5) {
        // Move focus to the next input field
        otpInputRefs[currentIndex + 1]?.current?.focus();
      }
    };
    const checkButtonDisabled = () => {
      const value = otpValues.join("");
      return value.length < 4;
    };
    //console.log(checkButtonDisabled());
    return (
      <View style={[styles.container, { paddingTop: paddinTop }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ width: "100%", paddingVertical: 5, paddingHorizontal: 20 }}
        >
          <ArrowLftIC width={30} height={30} />
        </TouchableOpacity>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 40,
            width: wp(100),
            //   gap: hp(2.5)
          }}
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          horizontal={false}
        >
          {/* Heading */}
  
          <Animated.View
            entering={FadeInDown.delay(200).springify()}
            style={styles.heading}
          >
            <View style={styles.headerImg}>
              <Image
                source={require("@/assets/images/cards.png")}
                style={{ width: "100%", height: "100%" }}
              />
            </View>
            <Text style={styles.headingTextTitle}>Secure Payment Verification</Text>
            <Text style={styles.headingTextDescript}>
            Enter the PIN for the card ending{'\n'} in 1234 to proceed.
            </Text>
          </Animated.View>
  
          <View style={styles.formContainer}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {otpValues.map((digit, index) => (
                <Animated.View
                  entering={FadeInUp.delay(200).springify()}
                  style={[
                    styles.otpFieldContainer,
                    {
                      borderColor:
                        otpValues[index].length > 0
                          ? Colors.main.primary
                          : Colors.main.description,
                    },
                  ]}
                  key={index}
                >
                  <TextInput
                    ref={otpInputRefs[index]}
                    textContentType="oneTimeCode"
                    style={styles.otpField}
                    keyboardType="numeric"
                    maxLength={1} // Allow only one digit
                    value={digit}
                    onChangeText={(text) => {
                      handleOTPEnter(text, index);
                      // Move to the next input field
                      if (text !== "" && index < 6) {
                        focusNext(index);
                      }
                    }}
                  />
                </Animated.View>
              ))}
            </View>
          </View>
          
          {/* Footer */}
          <Animated.View
            entering={FadeInDown.delay(700).springify()}
            style={styles.footer}
          >
            <TouchableOpacity
              disabled={checkButtonDisabled()}
              onPress={handleButton}
              style={[
                styles.footerBtn,
                {
                  backgroundColor: Colors.main.primary,
                  opacity: !checkButtonDisabled() ? 1 : 0.5,
                },
              ]}
            >
              <Text style={styles.footerBtnText}>Next</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </View>
    );
  };
  
  export default PaymentVerification;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.main.inputBg,
      alignItems: "center",
      justifyContent: "flex-start",
    },
    heading: {
      //backgroundColor:'red',
      alignItems: "center",
      gap: 25,
      height: hp(40),
    },
    headerImg: {
      //backgroundColor: 'red',
      width: "60%",
  
      height: "50%",
      alignItems: "center",
    },
    headingTextTitle: {
      fontSize: 28,
      fontWeight: "600",
      fontFamily: "Raleway-SemiBold",
      color: Colors.main.text,
      textAlign: 'center',
    },
    headingTextDescript: {
      fontFamily: "Montserrat-Regular",
      color: Colors.main.description,
      textAlign: "center",
      fontSize: 15,
    },
    formContainer: {
      width: "100%",
      marginTop:30,
      gap: 20,
      //backgroundColor: 'red'
    },
    otpField: {
      fontFamily: "Montserrat-SemiBold",
      width: "100%",
      height: "100%",
      color: "#333",
      fontSize: hp(4),
      textAlign: "center",
    },
    otpFieldContainer: {
      backgroundColor: "white",
      flexDirection: "row",
      alignItems: "center",
      width: "22%",
      height: 70,
      borderWidth: 0.7,
      borderRadius: 4,
    },
    timerCon: {
      //backgroundColor: 'red',
      alignItems: "center",
      marginBottom: 70,
    },
    timerText: {
      fontFamily: "Montserrat-Regular",
    },
  
    footer: {
      //backgroundColor: "red",
        marginVertical: 40,
      //flex: 1,
      width: "100%",
      //gap: hp(3.5),
      alignItems: "center",
    },
    footerBtn: {
      padding: 15,
      width: "80%",
      borderRadius: 4,
    },
    footerBtnText: {
      fontWeight: "600",
      fontFamily: "Raleway-SemiBold",
      color: "#fff",
      textAlign: "center",
      fontSize: 18,
    },
  });
  
