import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import Modal from "../modal";
import { request } from "services/http-request";
import { useAuthContext } from "providers/auth-provider";

const firebaseConfig = {
  apiKey: "AIzaSyCtp1-uBttn4YQXCE95xjxADTeCU4MV4Tk",
  authDomain: "snippit-266be.firebaseapp.com",
  projectId: "snippit-266be",
  storageBucket: "snippit-266be.appspot.com",
  messagingSenderId: "676256783802",
  appId: "1:676256783802:web:a427fe71963a278e995183",
  measurementId: "G-SGBDKJR7PV",
};
const app = initializeApp(firebaseConfig);
let analytics: any;
let messaging: any;

if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
  messaging = getMessaging(app);
}

const onMessageListener = () =>
  new Promise((resolve) => {
    if (typeof window !== "undefined")
      onMessage(messaging, (payload) => {
        console.log("payload", payload);
        resolve(payload);
      });
  });
const setupFCM = (userID: number) => {
  if (typeof window !== "undefined")
    getToken(messaging, { vapidKey: process.env.VAPID })
      .then(async (currentToken) => {
        // Send token to backend
        console.log("TOKEN: ", currentToken);
        const response = await request({
          url: `/users/management/${userID}`,
          method: "patch",
          data: {
            fcm_token: currentToken,
          },
        });
        console.log("FCM, res:", response);
        // currentToken
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        // ...
      });
  onMessageListener()
    .then((payload: any) => {
      logEvent(analytics, "notification_received");
      new Notification(payload?.notification?.title, {
        body: payload?.notification?.body,
        image: payload?.notification?.image,
      });
    })
    .catch((err) => console.log("Notification failed: ", err));
};

async function showNotification(userID: number) {
  Notification.requestPermission().then((result) => {
    if (result === "granted") {
      setupFCM(userID);
    }
  });
}

const Notifications = ({ children }: any) => {
  const [visible, setVisible] = useState(false);

  const toggleModal = () => {
    setVisible(!visible);
  };

  const { userAuth } = useAuthContext();

  useEffect(() => {
    if (Notification.permission == "default") {
      // show Modal
      setTimeout(() => {
        toggleModal();
      }, 1000);
    }
    if (Notification.permission == "denied") {
      // show denied message
      setTimeout(() => {
        toggleModal();
        // toggleModalErr();
      }, 1000);
    }
    if (Notification.permission == "granted") {
      // show granted message
      showNotification(userAuth.user_id);
    }
  }, []);
  return Notification.permission !== "denied" ? (
    <>
      <Modal
        options={{
          title: "Attention",
          icon: () => {
            return (
              <svg
                className="w-6 h-6 blue"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            );
          },
          toggle: [visible, setVisible],
          buttons: [
            {
              type: "info",
              title: "Yes",
              action: () => {
                showNotification(userAuth.user_id).then(() => {
                  toggleModal();
                });
              },
            },
            {
              type: "normal",
              title: "Later",
              action: () => {
                toggleModal();
              },
            },
          ],
          onClose: () => {
            // console.log("modal closed");
          },
        }}
      >
        <p>
          Dear user, to ensure you receive important updates promptly, push
          notifications are now required. Would you like to allow them now?
        </p>
      </Modal>
    </>
  ) : (
    <>
      <Modal
        options={{
          title: "Attention",
          icon: () => {
            return (
              <svg
                className="w-6 h-6 blue"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            );
          },
          toggle: [visible, setVisible],
          buttons: [
            {
              type: "normal",
              title: "Okay",
              action: () => {
                toggleModal();
              },
            },
          ],
          onClose: () => {
            // console.log("modal closed");
          },
        }}
      >
        <div>
          Notifications have been blocked, to fix this:
          <ul className="mt-5">
            <li>
              To the left of the web address, click View site information
              Default (Secure).
            </li>
            <li>Click Site settings.</li>
            <li>Change a permission setting.</li>
          </ul>
        </div>
      </Modal>
    </>
  );
};

export default Notifications;
