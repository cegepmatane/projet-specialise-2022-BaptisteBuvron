import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export default function Notification() {
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) =>
            setExpoPushToken(token)
        );

        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener((response) => {
                console.log(response);
            });

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current
            );
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    return null;
}

export async function schedulePushNotification(
    className,
    slot,
    type,
    time,
    day
) {
    time = new Date(time.getTime() - 5 * 60000);
    var days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const weekday = days.indexOf(day) + 1;
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const id = await Notifications.scheduleNotificationAsync({
        content: {
            title: className + " " + type,
            body: slot,
            // sound: 'default',
        },
        trigger: {
            weekday: weekday,
            hour: hours,
            minute: minutes,
            repeats: true,
        },
    });
    console.log("notif id on scheduling",id)
    return id;
}

export async function cancelNotification(notifId){
    await Notifications.cancelScheduledNotificationAsync(notifId);
}