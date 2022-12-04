import { Orbis } from "@orbisclub/orbis-sdk";
import { useEffect, useState } from "react";
import sanitizeHtml from "sanitize-html";
import toast, { Toaster } from "react-hot-toast";

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
  messageColor: "#8FB339",
  sentMessageColor: "#B7CE63",
  linkColor: "#0A81D1",
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
  messageColor: "#C06E52",
  sentMessageColor: "#F96F5D",
  linkColor: "#653E3F",
};

export default function Forum({
  position = "bottom-right",
  dark = false,
  theme = dark ? darkDefaults : defaults,
  headerText,
  closedText,
  context,
}: Props) {
  const [user, setUser] = useState<string>();
  const [did, setDid] = useState<string>();
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState<any[][]>();
  const [messagesEnd, setMessagesEnd] = useState<Element | null>();
  const [reply, setReply] = useState<string | null>(null);
  const [replyMsg, setReplyMsg] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);

  async function connect() {
    let res = await orbis.connect();

    res.status === 200
      ? setUser(
          res.did.toString().split(":")[4].substr(0, 6) +
            "..." +
            res.did.toString().split(":")[4].substr(36)
        )
      : toast.error("Could not connect wallet!");
    res.status === 200 ? setDid(res.did) : console.log(res);
  }

  async function disconnect() {
    let res = await orbis.logout();

    res.status === 200 ? setUser(undefined) : toast.error("Failed to disconnect");
  }

  async function send() {
    if (!msg || !msg.replace(/\s/g, '').length) {
      toast.error("Message cannot be empty");
      return;
    }

    reply != null
      ? await orbis.createPost({ body: msg, context: context, reply_to: reply })
      : await orbis.createPost({ body: msg, context: context });

    let posts = await orbis.getPosts({ context: context });
    setMsgs(
      posts.data
        .map((msg: any) => [
          msg.content.body,
          msg.creator,
          msg.reply_to_details?.body,
          msg,
        ])
        .reverse()
    );
    setMsg("");
    setReply(null);
    messagesEnd?.scrollIntoView({ behavior: "smooth" });
  }

  const highlightLinks = (text: string) => {
    let cp = text;
    text = sanitizeHtml(text);
    let exp =
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
    let text1 = text.replace(
      exp,
      `<a target='_blank' style='color: ${
        theme.linkColor || theme.textColor || theme.background
      }' href='$1'>$1</a>`
    );
    let exp2 = /(^|[^/])(www\.[\S]+(\b|$))/gim;
    return [text1.replace(
      exp2,
      `$1<a target="_blank" style="color: ${
        theme.linkColor || theme.textColor || theme.background
      };" href="http://$2">$2</a>`
    ), text, cp];
  };

  useEffect(() => {
    orbis.getPosts({ context: context }).then((data: any) => {
      setMsgs(
        data.data
          .map((msg: any) => [
            msg.content.body,
            msg.creator,
            msg.reply_to_details?.body,
            msg,
          ])
          .reverse()
      );
    });
    // console.log(msgs);
  });

  useEffect(() => {
    messagesEnd?.scrollIntoView({ behavior: "smooth" });
  }, [messagesEnd]);

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
      <Toaster />
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
        <div
          className="px-2 flex items-center justify-center text-black"
          style={{ height: user ? "" : "100%" }}
        >
          {user ? (
            <div className="w-full h-[15rem] overflow-hidden overflow-y-scroll flex flex-col gap-2 py-4">
              {msgs?.map((msg, ind) => (
                <div
                  key={ind}
                  className="flex flex-col gap-0.5"
                  style={{ color: theme.textColor || theme.background }}
                >
                  <div
                    className="text-xs"
                    style={{ marginLeft: msg[1] === did ? "auto" : "", opacity: "0.7" }}
                  >
                    {msg[3].creator === did
                      ? "You"
                      : msg[3].creator.split(":")[4].substr(0, 6) +
                        "..." +
                        msg[3].creator.split(":")[4].substr(36)}
                  </div>
                  {msg[1] === did ? (
                    <div
                      key={ind}
                      style={{
                        backgroundColor:
                          theme.sentMessageColor ||
                          theme.messageColor ||
                          theme.accent,
                      }}
                      className="ml-auto p-2 w-fit max-w-[75%] rounded-xl text-sm overflow-wrap relative group/reply rounded-br-none"
                    >
                      <button
                        onClick={() => {
                          setReply(msg[3].stream_id);
                          setReplyMsg(msg[0]);
                        }}
                        className={`absolute -bottom-2 rounded-full p-2 w-6 h-6 group-hover/reply:flex items-center justify-center -left-4 hidden hover:bg-[${theme.inputColor}]`}
                        onMouseEnter={() => setHovered(!hovered)}
                        onMouseLeave={() => setHovered(!hovered)}
                        style={{
                          background: theme.accent,
                          color: theme.background,
                        }}
                      >
                        <img
                          src="https://cerscan.com/img/icons/question-replyto.png"
                          alt="relpyto icon"
                          className="h-3 w-5"
                        />
                      </button>
                      {msg[2] ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: highlightLinks(msg[2])[0],
                          }}
                          className="border-l-4 rounded-md pl-1 text-white"
                          style={{
                            borderColor: theme.replyColor || theme.background,
                          }}
                        ></div>
                      ) : null}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: highlightLinks(msg[0])[0],
                        }}
                      ></div>
                    </div>
                  ) : (
                    <div
                      key={ind}
                      style={{
                        backgroundColor: theme.messageColor || theme.accent,
                      }}
                      className="p-2 w-fit max-w-[75%] rounded-xl text-sm overflow-wrap relative group/reply rounded-bl-none"
                    >
                      <button
                        onClick={() => {
                          setReply(msg[3].stream_id);
                          setReplyMsg(msg[0]);
                        }}
                        className={`absolute -bottom-2 rounded-full p-2 w-6 h-6 group-hover/reply:flex items-center justify-center -right-4 hidden hover:bg-[${theme.inputColor}]`}
                        onMouseEnter={() => setHovered(!hovered)}
                        onMouseLeave={() => setHovered(!hovered)}
                        style={{
                          background: theme.accent,
                          color: theme.background,
                        }}
                      >
                        <img
                          src="https://cerscan.com/img/icons/question-replyto.png"
                          alt="relpyto icon"
                          className="h-3 w-5"
                        />
                      </button>

                      {msg[2] ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: highlightLinks(msg[2])[0],
                          }}
                          className="border-l-4 rounded-md pl-1 text-white"
                          style={{
                            borderColor: theme.replyColor || theme.background,
                          }}
                        ></div>
                      ) : null}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: highlightLinks(msg[0])[0],
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={(el) => setMessagesEnd(el)}></div>
            </div>
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
            className="px-3"
            style={{
              backgroundColor: theme.inputBackground || theme.background,
              height: reply != null ? "96px" : "80px",
            }}
          >
            {reply != null ? (
              <div
                className="text-xs pt-2 flex flex-row justify-between"
                style={{ color: theme.textColor || theme.accent }}
              >
                Replying to "{replyMsg?.substr(0, 20)}..."
                <button
                  style={{ color: theme.accent }}
                  onClick={() => setReply(null)}
                >
                  X
                </button>
              </div>
            ) : null}
            <div
              className="flex items-center justify-between gap-3"
              style={{ paddingTop: reply ? "4px" : "12px" }}
            >
              <input
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                className="w-full h-10 rounded-xl p-2 text-sm font-semibold"
                placeholder="Type question"
                style={{
                  background: theme.inputColor || theme.accent,
                  color: theme.background,
                }}
              />
              <button
                onClick={send}
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
              <button
                style={{ color: theme.accent }}
                onClick={() => disconnect()}
              >
                Disconnect?
              </button>
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
  context: string;
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
  messageColor?: string;
  sentMessageColor?: string;
  linkColor?: string;
  replyColor?: string;
}
