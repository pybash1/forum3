import { Orbis } from "@orbisclub/orbis-sdk";
import { useState } from "react";

let orbis = new Orbis();

const defaults: Colors = {
  background: "#F7FFF7",
  headerBackground: "#EBFFEB",
  closedBackground: "#F7FFF7",
  accent: "#388697",
  textColor: "#161316",
  buttonColor: "#388697",
  inputColor: "#388697",
  inputBackground: "#EBFFEB",
};

const darkDefaults: Colors = {
  background: "#161316",
  headerBackground: "#2C262C",
  closedBackground: "#161316",
  accent: "#FCE4D8",
  textColor: "#F7FFF7",
  buttonColor: "#FCE4D8",
  inputColor: "#FCE4D8",
  inputBackground: "#2C262C",
};

export default function Forum({
  position = "bottom-right",
  dark = false,
  theme = dark ? darkDefaults : defaults,
  headerText,
  closedText,
}: Props) {
  const [user, setUser] = useState<string>();

  async function connect() {
    let res = await orbis.connect();

    res.status === 200
      ? setUser(
          res.did.toString().split(":")[4].substr(0, 6) +
            "..." +
            res.did.toString().split(":")[4].substr(36)
        )
      : console.log(res);
  }

  async function disconnect() {
    let res = await orbis.logout();

    res.status === 200 ? setUser(undefined) : console.log(res);
  }

  return (
    <div
      className={`w-80 h-96 translate-y-[21rem] fixed ${
        position === "top-left" || position === "top-right"
          ? "rounded-b-xl"
          : "rounded-t-xl"
      } mx-14 hover:translate-y-0 transition ease-in-out group`}
      style={{
        bottom:
          position === "bottom-right" || position === "bottom-left" ? 0 : "",
        top: position === "top-right" || position === "top-left" ? 0 : "",
        right: position === "bottom-right" || position === "top-right" ? 0 : "",
        left: position === "bottom-left" || position === "top-left" ? 0 : "",
        backgroundColor: theme.background,
      }}
    >
      <div
        className="group-hover:hidden px-6 py-3 font-semibold flex flex-row items-center gap-2"
        style={{ color: theme.textColor || theme.accent }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-question-circle"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path
            d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.0
09.94z"
          />
        </svg>
        {closedText}
      </div>
      <div className="hidden group-hover:flex flex-col justify-between h-96">
        <div
          className={`px-4 py-3 text-center font-semibold ${
            position === "top-left" || position === "top-right"
              ? "rounded-b-xl"
              : "rounded-t-xl"
          }`}
          style={{
            backgroundColor: theme.headerBackground || theme.background,
            color: theme.textColor || theme.accent,
          }}
        >
          {headerText}
        </div>
        <div className="px-4 py-3 h-full flex items-center justify-center">
          {user ? (
            <></>
          ) : (
            <button
              className="rounded-xl px-4 py-2 font-semibold hover:bg-opacity-70"
              style={{
                backgroundColor: theme.buttonColor || theme.accent,
                color: theme.background,
              }}
              onClick={() => connect()}
            >
              Connect Wallet
            </button>
          )}
        </div>
        {user ? (
          <div
            className="h-20 px-3"
            style={{
              backgroundColor: theme.inputBackground || theme.background,
            }}
          >
            <div className="flex items-center justify-between gap-3 pt-3">
              <input
                className={`w-full h-10 rounded-xl p-2 text-sm font-semibold placeholder-[${
                  theme.placeholder || theme.background
                }]`}
                placeholder="Type question"
                style={{
                  background: theme.inputColor || theme.accent,
                  color: theme.background,
                }}
              />
              <button
                className="rounded-full p-2"
                style={{
                  background: theme.buttonColor || theme.accent,
                  color: theme.background,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-send-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                </svg>
              </button>
            </div>
            <div
              className="text-xs pb-1 pt-2"
              style={{ color: theme.textColor }}
            >
              Logged in as {user}.{" "}
              <button style={{ color: theme.accent }} onClick={() => disconnect()}>Disconnect?</button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

interface Props {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  theme?: Colors;
  dark?: boolean;
  closedText: string;
  headerText: string;
}

interface Colors {
  background: string;
  headerBackground?: string;
  inputBackground?: string;
  closedBackground?: string;
  accent: string;
  textColor?: string;
  inputColor?: string;
  buttonColor?: string;
  placeholder?: string;
}
