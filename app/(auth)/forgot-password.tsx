import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";

const ForgotPasswordScreen = () => {
    return (
        <View>
            <Text>Authentication Screen</Text>
            <Button onPress={() => { }}>
                <Text>Go to login</Text>
            </Button>
        </View>
    );
}

export default ForgotPasswordScreen;