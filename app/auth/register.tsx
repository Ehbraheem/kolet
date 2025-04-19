import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { wp, hp, validateNigerianPhoneNumber } from "@/helpers/common";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import CustomTextInput from "@/components/CustomTextInput";
import { UserContext } from "@/contexts/UserContext";
import { useGetBankList, useGetAccountName } from "@/api/account";
import BankInput from "@/components/CustomBankInput";

const Register = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const { user, updateUser } = useContext(UserContext);
  const {
    mutate: getAccountName,
    isPending: isLoadingAccountName,
    data: accountNameData,
    error: accountNameError,
  } = useGetAccountName();

  const [selectedBank, setSelectedBank] = useState<any>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberTouched, setPhoneNumberTouched] = useState(false);
  const [accountNumberTouched, setAccountNumberTouched] = useState(false);
  const [bankTouched, setBankTouched] = useState(false);

  const {
    data: banks = [],
    isLoading: isLoadingBanks,
    isError: bankError,
    error: bankErrorMessage,
    refetch: refetchBanks,
  } = useGetBankList();

  useEffect(() => {
    if (accountNumber.length === 10 && selectedBank) {
      getAccountName(
        {
          BANK_ACCOUNT_NUMBER: accountNumber,
          BANK_NAME: selectedBank.code,
        },
        {
          onSuccess: (data) => {
            if (data) {
              setAccountName(data.data.accountName || data.accountName);
            }
          },
          onError: (error) => {
            console.log("Error fetching account name:", error);
            setAccountName("");
          },
        }
      );
    } else {
      setAccountName("");
    }
  }, [accountNumber, selectedBank]);

  const handleSubmit = () => {
    updateUser({
      ...user,
      BANK_NAME: selectedBank?.name || "",
      BANK_CODE: selectedBank?.code || "",
      BANK_ACCOUNT_NUMBER: accountNumber,
      BANK_ACCOUNT_NAME: accountName,
      PHONE_NUMBER: phoneNumber,
    });

    router.push("/auth/createPassword");
  };

  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
    setBankTouched(true);
  };

  const checkButtonDisabled = () => {
    return (
      !selectedBank ||
      accountNumber.length < 10 ||
      !validateNigerianPhoneNumber(phoneNumber) ||
      !accountName
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { paddingTop }]}
    >
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 40,
          width: wp(100),
          gap: 15,
        }}
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
        horizontal={false}
      >
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          style={styles.heading}
        >
          <Text style={styles.headingTextTitle}>
            Add Your{" "}
            <Text style={{ color: Colors.main.primary }}>Bank Details</Text>{" "}
          </Text>
          <Text style={styles.headingTextDescript}>
            Link your bank account to start using Kolet for seamless
            transactions
          </Text>
        </Animated.View>
        <View>
          <CustomTextInput
            inputMode="numeric"
            maxLength={10}
            value={accountNumber}
            onChange={(text) => {
              setAccountNumber(text);
              setAccountNumberTouched(true);
            }}
            placeholder="Bank Account Number"
            keyboardType="number-pad"
            iconName="credit-card"
            iconHieght={15}
            iconWidth={15}
          />
          {accountNumberTouched && accountNumber.length < 10 && (
            <Text style={styles.validationText}>
              Please enter a valid 10-digit account number
            </Text>
          )}

          {/* Account Name Display Section */}
          {accountNumber.length === 10 && selectedBank && (
            <View style={styles.accountNameContainer}>
              {isLoadingAccountName ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color={Colors.main.primary} />
                  <Text style={styles.loadingText}>
                    Fetching account name...
                  </Text>
                </View>
              ) : accountName ? (
                <Text style={styles.accountNameText}>
                  Account Name: {accountName}
                </Text>
              ) : accountNameError ? (
                <Text style={styles.validationText}>
                  Could not verify account. Please check details and try again.
                </Text>
              ) : null}
            </View>
          )}
        </View>
        <View style={styles.formContainer}>
          {/* Bank Selection Dropdown */}
          <BankInput
            selectedBank={selectedBank}
            setSelectedBank={handleBankSelect}
            banks={banks}
            isLoadingBanks={isLoadingBanks}
            bankError={bankError}
            bankErrorMessage={bankErrorMessage}
            refetchBanks={refetchBanks}
            label="Select your bank"
          />

          <View>
            <CustomTextInput
              inputMode="numeric"
              maxLength={15}
              value={phoneNumber}
              onChange={(text) => {
                setPhoneNumber(text);
                setPhoneNumberTouched(true);
              }}
              placeholder="Phone Number"
              keyboardType="number-pad"
              iconName="phone"
              iconHieght={15}
              iconWidth={15}
            />
            {phoneNumberTouched &&
              !validateNigerianPhoneNumber(phoneNumber) && (
                <Text style={styles.validationText}>
                  Please enter a valid Nigerian phone number
                </Text>
              )}
          </View>
        </View>

        {/* progressBar */}
        <Animated.View entering={FadeIn.delay(800)} style={styles.progressBar}>
          <View
            style={
              !checkButtonDisabled()
                ? styles.progressBarItemActive
                : styles.progressBarItemInactive
            }
          />
          <View style={styles.progressBarItemInactive} />
          <View style={styles.progressBarItemInactive} />
        </Animated.View>
        {/* Footer */}
        <Animated.View
          entering={FadeInDown.delay(700).springify()}
          style={styles.footer}
        >
          <Text style={styles.footerTextTiltle}>
            By signing up, you agree to our{" "}
            <Text style={{ color: Colors.main.primary }}>Terms</Text> and{" "}
            <Text style={{ color: Colors.main.primary }}>Conditions</Text> and{" "}
            <Text style={{ color: Colors.main.primary }}>Privacy Policy</Text>
          </Text>
          <TouchableOpacity
            disabled={checkButtonDisabled()}
            onPress={handleSubmit}
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

          <Text
            onPress={() => router.navigate("/auth/login")}
            style={styles.footerText}
          >
            Already a member?{" "}
            <Text style={{ color: Colors.main.primary }}>Login</Text>
          </Text>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main.inputBg,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  heading: {
    alignItems: "center",
    gap: 20,
  },
  headingTextTitle: {
    fontSize: 30,
    fontWeight: "600",
    fontFamily: "Raleway-SemiBold",
    color: Colors.main.text,
  },
  headingTextDescript: {
    fontFamily: "Montserrat-Regular",
    color: Colors.main.description,
    textAlign: "center",
    fontSize: 15,
  },
  formContainer: {
    width: "100%",
    gap: 16,
    marginTop: 20,
  },
  validationText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
    fontFamily: "Montserrat-Regular",
  },
  progressBar: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 50,
    gap: 10,
    marginVertical: 35,
  },
  progressBarItemActive: {
    height: hp(1),
    width: "30%",
    borderRadius: 20,
    backgroundColor: Colors.main.primary,
  },
  progressBarItemInactive: {
    height: hp(1),
    width: "30%",
    borderRadius: 20,
    backgroundColor: "white",
  },
  footer: {
    flex: 1,
    width: "100%",
    gap: 15,
    alignItems: "center",
  },
  footerTextTiltle: {
    fontWeight: "300",
    fontFamily: "Raleway-RegularS",
    textAlign: "center",
    fontSize: 16,
    alignItems: "center",
  },
  footerBtn: {
    backgroundColor: Colors.main.primary,
    padding: 15,
    width: "80%",
    borderRadius: 4,
  },
  footerBtnText: {
    fontWeight: "600",
    fontFamily: "Raleway-SemiBold",
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
  },
  footerText: {
    fontWeight: "600",
    fontFamily: "Raleway-Regular",
    textAlign: "center",
    color: Colors.main.text,
    fontSize: 16,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 4,
    gap: 8,
    marginTop: 8,
  },
  loadingText: {
    fontFamily: "Montserrat-Regular",
    color: Colors.main.text,
    fontSize: 12,
  },
  accountNameContainer: {
    marginTop: 8,
    marginBottom: 4,
  },
  accountNameText: {
    fontFamily: "Montserrat-Medium",
    color: Colors.main.primary,
    fontSize: 14,
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: Colors.main.primary,
  },
  errorContainer: {
    backgroundColor: "#ffeeee",
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ffcccc",
  },
  errorText: {
    color: "red",
    fontFamily: "Montserrat-Regular",
    textAlign: "center",
  },
});
