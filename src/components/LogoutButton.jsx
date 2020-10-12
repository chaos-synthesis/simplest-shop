import * as React from "react";
import { View } from "react-native";
import { FAB, Button, Paragraph, Dialog, Portal } from "react-native-paper";

const LogoutButton = ({ style, onConfirm }) => {
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const confirmDialog = () => {
    onConfirm && onConfirm();
    hideDialog();
  };

  return (
    <View>
      <FAB icon="logout-variant" style={style} onPress={showDialog} />
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

export default LogoutButton;
