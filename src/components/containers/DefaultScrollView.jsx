import React from "react";
import { KeyboardAvoidingView, Platform, View, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import PropTypes from "prop-types";
import PlatformUtils from "../../utils/Platform";
import Constants from "expo-constants";

const DefaultScrollView = ({
  children,
  keyboardAvoidView,
  keyboardVerticalOffset,
  style,
  ...scrollViewProps
}) => {
  const { colors } = useTheme();
  const isAndroid = PlatformUtils.isAndroid;
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        enabled={keyboardAvoidView}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <ScrollView
          {...scrollViewProps}
          style={[
            {
              flex: 1,
              paddingVertical: isAndroid ? 0 : 40,
            },
            style,
          ]}
        >
          {children}
          <View style={{ height: isAndroid ? 25 : 50 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

DefaultScrollView.propTypes = {
  keyboardAvoidView: PropTypes.bool,
  keyboardVerticalOffset: PropTypes.number,
};

const headerHeight = 120;
DefaultScrollView.defaultProps = {
  keyboardAvoidView: true,
  keyboardVerticalOffset: headerHeight + Constants.statusBarHeight,
};

export default DefaultScrollView;
