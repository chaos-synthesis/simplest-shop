import React from "react";
import { View } from "react-native";
import { FAB, Button, Paragraph, Dialog, Portal } from "react-native-paper";
import PropTypes from "prop-types";

const LogoutButton = ({ fab, style, onConfirm }) => {
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const confirmDialog = () => {
    onConfirm && onConfirm();
    hideDialog();
  };

  return (
    <View>
      {fab ? (
        <FAB icon="logout-variant" style={style} onPress={showDialog} />
      ) : (
        <Button
          onPress={showDialog}
          icon="logout"
          uppercase={false}
          contentStyle={{ justifyContent: "flex-end" }}
        >
          Log Out
        </Button>
      )}
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Log Out</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to log out?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={confirmDialog}>Yes</Button>
            <Button onPress={hideDialog}>No</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

LogoutButton.propTypes = {
  style: PropTypes.object,
  onConfirm: PropTypes.func,
  fab: PropTypes.bool,
};

LogoutButton.defaultProps = {
  fab: false,
};

export default LogoutButton;
