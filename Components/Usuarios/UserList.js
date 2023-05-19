import { View, Text } from "react-native";
import User from "./Users";

const UserList = (props) => {
  return (
    <View>
      {props.items.map((user) => (
        <User
          key={user["Object Id"]}
          image={user.Picture}
          name={user["Display name"]}
          title={user.Title}
        />
      ))}
    </View>
  );
};

export default UserList;