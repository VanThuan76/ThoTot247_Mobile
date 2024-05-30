import { Link, Tabs } from "expo-router";
import { View } from "lucide-react-native";
import { Pressable } from "react-native";

import { Home } from "@shared/lib/icons/Home"
import { UsersRound } from "@shared/lib/icons/UsersRound"
import { LineChart } from "@shared/lib/icons/LineChart"
import { Container } from "@shared/lib/icons/Container"
import { Expand } from "@shared/lib/icons/Expand"
import { cn } from "@shared/lib/utils";

import { Text } from "~/components/ui/text";
import { useColorScheme } from "@shared/lib/useColorScheme";

export default function TabsLayout() {
    const { isDarkColorScheme } = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    position: "absolute",
                    bottom: 27,
                    left: 16,
                    right: 16,
                    height: 72,
                    elevation: 0,
                    backgroundColor: isDarkColorScheme ? 'white' : '#EBECF1',
                    borderRadius: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                },
                tabBarLabelStyle: {
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Trang chủ',
                    tabBarIcon: ({ focused }) => <Home size={24} color={focused ? "#f2874e" : "#000"} />,
                }}
            />
            <Tabs.Screen
                name="customer"
                options={{
                    title: 'Khách hàng',
                    tabBarIcon: ({ focused }) => <UsersRound size={24} color={focused ? "#f2874e" : "#000"} />,
                }}
            />
            <Tabs.Screen
                name="campaign"
                options={{
                    title: 'Chiến dịch',
                    tabBarIcon: ({ focused }) => <LineChart size={24} color={focused ? "#f2874e" : "#000"} />,
                }}
            />
            <Tabs.Screen
                name="order"
                options={{
                    title: 'Đơn hàng',
                    tabBarIcon: ({ focused }) => <Container size={24} color={focused ? "#f2874e" : "#000"} />,
                }}
            />
            <Tabs.Screen
                name="setting"
                options={{
                    title: 'Mở rộng',
                    tabBarIcon: ({ focused }) => <Expand size={24} color={focused ? "#f2874e" : "#000"} />,
                }}
            />
        </Tabs>
    )
}