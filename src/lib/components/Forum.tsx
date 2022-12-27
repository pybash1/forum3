import { Orbis } from "@orbisclub/orbis-sdk";
import { useEffect, useState } from "react";
import sanitizeHtml from "sanitize-html";
import toast, { Toaster } from "react-hot-toast";
import { ReactNode } from "react";
import * as IPFS from "ipfs-core";

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
  background: "#32383b",
  headerBackground: "#9ca3af",
  closedBackground: "#32383b",
  accent: "#3cf0fd",
  textColor: "#F7FFF7",
  buttonColor: "#3cf0fd",
  inputColor: "#3cf0fd",
  inputBackground: "#2C262C",
  messageColor: "#186065",
  sentMessageColor: "#2aa8b1",
  linkColor: "#3cf0fd",
};

export default function Forum({
  position = "bottom-right",
  dark = true,
  icon = true,
  iconOnly = false,
  theme = dark ? darkDefaults : defaults,
  headerText,
  closedText,
  admins = [],
  indicator = true,
  allowImages = true,
  // @ts-ignore
  context = process.env.REACT_APP_FORUM_CONTEXT || process.env.NEXT_PUBLIC_FORUM_CONTEXT || import.meta.env.VITE_FORUM_CONTEXT || "",
}: Props) {
  const [user, setUser] = useState<string>();
  const [did, setDid] = useState<string>();
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState<any[][]>();
  const [messagesEnd, setMessagesEnd] = useState<Element | null>();
  const [reply, setReply] = useState<string | null>(null);
  const [replyMsg, setReplyMsg] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);
  const [ipfs, setIpfs] = useState<any>();
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(0);
  const [loadMoreBtn, setLoadMoreBtn] = useState(true);
  const [newMsgs, setNewMsgs] = useState(false);
  const [lastMsg, setLastMsg] = useState<string>();

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

    res.status === 200
      ? setUser(undefined)
      : toast.error("Failed to disconnect");
  }

  async function send() {
    if (!msg || !msg.replace(/\s/g, "").length) {
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
    for (let i = 0; i <= page; i++) {
      await load(i);
    }
    messagesEnd?.scrollIntoView({ behavior: "smooth" });
    setNewMsgs(false);
  }

  async function upload() {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const buf = Buffer.from(reader.result as string);
      const { cid } = await ipfs.add(buf);
      let cid_ = cid.toString();
      reply != null
        ? await orbis.createPost({
            body: msg + "###IMAGE###" + cid_,
            context: context,
            reply_to: reply,
          })
        : await orbis.createPost({
            body: msg + "###IMAGE###" + cid_,
            context: context,
          });
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
      setNewMsgs(false);
    };
    // @ts-ignore
    reader.readAsArrayBuffer(document.getElementById("photo").files[0]);
  }

  async function trigger() {
    document.getElementById("photo")?.click();
  }

  const render = (text: string) => {
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
    return [
      sanitizeHtml(
        text1
          .replace(
            exp2,
            `$1<a target="_blank" style="color: ${
              theme.linkColor || theme.textColor || theme.background
            };" href="http://$2">$2</a>`
          )
          .replace(/###IMAGE###(.*)/, '<img src="https://ipfs.io/ipfs/$1" />'),
        {
          allowedTags: [
            "address",
            "article",
            "aside",
            "footer",
            "header",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "hgroup",
            "main",
            "nav",
            "section",
            "blockquote",
            "dd",
            "div",
            "dl",
            "dt",
            "figcaption",
            "figure",
            "hr",
            "li",
            "main",
            "ol",
            "p",
            "pre",
            "ul",
            "a",
            "abbr",
            "b",
            "bdi",
            "bdo",
            "br",
            "cite",
            "code",
            "data",
            "dfn",
            "em",
            "i",
            "kbd",
            "mark",
            "q",
            "rb",
            "rp",
            "rt",
            "rtc",
            "ruby",
            "s",
            "samp",
            "small",
            "span",
            "strong",
            "sub",
            "sup",
            "time",
            "u",
            "var",
            "wbr",
            "caption",
            "col",
            "colgroup",
            "table",
            "tbody",
            "td",
            "tfoot",
            "th",
            "thead",
            "tr",
            allowImages ? "img" : "tr",
          ],
          allowedAttributes: {
            a: ["href", "name", "target"],
            img: [
              "src",
              "srcset",
              "alt",
              "title",
              "width",
              "height",
              "loading",
            ],
          },
        }
      ),
      text,
      cp,
    ];
  };

  async function load(_page: number) {
    const { data } = await orbis.getPosts({ context: context }, _page);
    const _data = await orbis.getPosts({ context: context }, _page + 1);
    if (data) {
      if (_page === 0) {
        setMsgs(
          data
            .map((msg: any) => [
              msg.content.body,
              msg.creator,
              msg.reply_to_details?.body,
              msg,
            ])
            .reverse()
        );
      } else {
        let _msgs = [
          ...data
            .map((msg: any) => [
              msg.content.body,
              msg.creator,
              msg.reply_to_details?.body,
              msg,
            ])
            .reverse(),
        ];
        let __msgs = _msgs.concat(msgs as any[][]);
        setMsgs(__msgs);
      }
      if (_data.data.length === 0) {
        setLoadMoreBtn(false);
      }
    } else {
      setMsgs([]);
    }
  }

  function loadMore() {
    let _page = page + 1;
    load(_page);
    setPage(_page);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      load(page);
      for (let i = 0; i <= page; i++) {
        load(i);
      }
    }, 10000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (!context) {
      console.error(
        "Using default Orbis context as no context was specified and FORUM_CONTEXT environment variable was not found."
      );
    }
  }, [context]);

  useEffect(() => {
    IPFS.create({ repo: "ok" + Math.random() }).then((data) => setIpfs(data));
  }, []);

  useEffect(() => {
    messagesEnd?.scrollIntoView({ behavior: "smooth" });
  }, [messagesEnd]);

  useEffect(() => {
    if (msgs && msgs[msgs?.length - 1][0] !== lastMsg) {
      setLastMsg(msgs[msgs.length - 1][0]);
      setNewMsgs(true);
    }
  }, [msgs]);

  return (
    <div
      onMouseEnter={() => setNewMsgs(false)}
      className={`w-80 h-96 fixed ${
        position === "top-left" || position === "top-right"
          ? "rounded-b-xl -translate-y-[21rem]"
          : "rounded-t-xl translate-y-[21rem]"
      } mx-14 hover:translate-y-0 transition ease-in-out group z-[100]`}
      style={{
        bottom:
          position === "bottom-right" || position === "bottom-left" ? 0 : "",
        top: position === "top-right" || position === "top-left" ? 0 : "",
        right: position === "bottom-right" || position === "top-right" ? 0 : "",
        left: position === "bottom-left" || position === "top-left" ? 0 : "",
        backgroundColor: theme.closedBackground || theme.background,
      }}
    >
      <Toaster
        toastOptions={{
          style: {
            background: theme.accent,
            color: theme.background,
          },
        }}
      />
      {visible ? (
        <div
          className={`h-full w-full z-[999] backdrop-blur-lg hidden absolute px-6 group-hover:flex items-center justify-center ${
            position === "top-left" || position === "top-right"
              ? "rounded-b-xl"
              : "rounded-t-xl"
          }`}
        >
          <div
            className="rounded-xl px-6 py-4"
            style={{ backgroundColor: theme.accent, color: theme.background }}
          >
            <div className="text-center font-bold font-inter text-lg">
              Upload Image
            </div>
            <div>
              Are you sure you want to upload this image? This action is
              irreversible.
            </div>
            <div className="flex flex-row gap-3 items-center justify-center pt-2">
              <button
                className="rounded-xl px-2.5 py-1.5"
                style={{ background: theme.background, color: theme.accent }}
                onClick={() => {
                  setVisible(false);
                  upload();
                  toast.success("File uploaded");
                }}
              >
                Yes
              </button>
              <button
                className="rounded-xl px-2.5 py-1.5"
                style={{ background: theme.background, color: theme.accent }}
                onClick={() => {
                  setVisible(false);
                  toast.error("File upload cancelled");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div
        className={`group-hover:hidden px-6 py-3 font-semibold flex flex-row items-center gap-2 ${
          position === "top-left" || position === "top-right"
            ? "absolute bottom-0"
            : ""
        }`}
        style={{
          color: theme.textColor || theme.accent,
          justifyContent: iconOnly ? "center" : "",
        }}
      >
        {icon === true ? (
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
        ) : icon === false ? null : (
          icon
        )}
        {!iconOnly ? closedText : null}
        {indicator && newMsgs ? (
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        ) : null}
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
              {loadMoreBtn ? (
                <button
                  onClick={loadMore}
                  className="rounded-xl px-3 py-2 w-fit self-center"
                  style={{ background: theme.accent, color: theme.background }}
                >
                  Load More
                </button>
              ) : null}
              {msgs?.map((msg, ind) => (
                <div
                  key={ind}
                  className="flex flex-col gap-0.5"
                  style={{ color: theme.textColor || theme.background }}
                >
                  <div
                    className="text-xs"
                    style={{
                      marginLeft: msg[1] === did ? "auto" : "",
                      opacity: "0.7",
                    }}
                  >
                    {msg[3].creator === did
                      ? "You" + (admins.includes(user) ? "(Admin)" : "")
                      : msg[3].creator.split(":")[4]?.substr(0, 6) +
                        "..." +
                        msg[3].creator.split(":")[4]?.substr(36) +
                        (admins.includes(
                          msg[3].creator.split(":")[4]?.substr(0, 6) +
                            "..." +
                            msg[3].creator.split(":")[4]?.substr(36)
                        )
                          ? "(Admin)"
                          : "")}
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
                            __html: render(msg[2])[0],
                          }}
                          className="border-l-4 rounded-md pl-1 text-white"
                          style={{
                            borderColor: theme.replyColor || theme.background,
                          }}
                        ></div>
                      ) : null}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: render(msg[0])[0],
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
                            __html: render(msg[2])[0],
                          }}
                          className="border-l-4 rounded-md pl-1 text-white"
                          style={{
                            borderColor: theme.replyColor || theme.background,
                          }}
                        ></div>
                      ) : null}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: render(msg[0])[0],
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
                Replying to "{replyMsg?.substring(0, 20)}
                {replyMsg?.substring(0, 20) !== replyMsg ? "..." : null}"
                <button
                  style={{ color: theme.accent }}
                  onClick={() => setReply(null)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-x"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </button>
              </div>
            ) : null}
            <div
              className="flex items-center justify-between gap-2"
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
              <input
                type="file"
                id="photo"
                className="hidden"
                accept="image/*"
                onChange={() => setVisible(true)}
              />
              {allowImages ? (
                <button
                  onClick={trigger}
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
                    className="bi bi-upload"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                  </svg>
                </button>
              ) : null}
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
              Logged in as {user}
              {admins.includes(user) ? "(Admin)" : null}.{" "}
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
  context?: string;
  icon?: boolean | ReactNode;
  iconOnly?: boolean;
  admins?: string[];
  indicator?: boolean;
  allowImages?: boolean;
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
