import { formatTime } from "@/utils/helpers";
import { Avatar } from "@nextui-org/react";

const Message = ({
  userImage,
  text,
  date,
  sender,
}: {
  userImage: string;
  text: string;
  date: Date;
  sender: "friend" | "me";
}) => {
  //   console.log(userImage);

  return sender === "friend" ? (
    <div className={`w-full flex items-end justify-start gap-2 mb-2`}>
      <Avatar src={userImage} className="w-7 h-7 text-tiny" />
      <div className="bg-[#e3e4e7] py-2 px-4 rounded-md rounded-bl-none flex items-end gap-2 max-w-lg">
        <span className="break-all">{text}</span>
        <span className="text-[10px] font-light whitespace-nowrap">
          {formatTime(date)}
        </span>
      </div>
    </div>
  ) : (
    <div className={`w-full flex items-end justify-end gap-2 mb-2`}>
      <div className="bg-[#76c799] py-2 px-4 rounded-md rounded-br-none flex items-end gap-2 max-w-lg">
        <span className="text-white break-all">{text}</span>
        <span className="text-[10px] text-white font-light whitespace-nowrap">
          {formatTime(date)}
        </span>
      </div>
      <Avatar src={userImage} className="w-7 h-7 text-tiny" />
    </div>
  );
};

export default Message;
