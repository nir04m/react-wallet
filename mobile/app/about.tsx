import { View, Text, Image } from "react-native";
import { RollInLeft } from "react-native-reanimated";
const About = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "blue" }}>This is the About page.</Text>

      {/* <Image
        source={{ uri: "https://images.unsplash.com/photo-1726066012634-b2bff55c829d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }}
        style={{ width: 100, height: 100, marginTop: 20 }}
      /> */}
      <Image
        source={require("../assets/images/react-logo.png")}
        style={{ width: 100, height: 100, marginTop: 20 }}
      />
    </View>
  );
}

export default About;
