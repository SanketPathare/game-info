import {
  FaSteam,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaShoppingCart,
} from "react-icons/fa";
import { SiEpicgames, SiNintendo, SiGoogleplay } from "react-icons/si";
import { Icon } from "@iconify/react";

const getStoreIcon = (storeName: any) => {
  const lowerCaseStoreName = storeName.toLowerCase();
  switch (lowerCaseStoreName) {
    case "steam":
      return <FaSteam size={30} className="mr-1" />;
    case "playstation store":
      return <FaPlaystation size={30} className="mr-1" />;
    case "xbox 360 store":
    case "xbox store":
      return <FaXbox size={30} className="mr-1" />;
    case "apple app store":
    case "app store":
    case "ios store":
      return <FaApple size={30} className="mr-1" />;
    case "epic games":
      return <SiEpicgames size={30} className="mr-1" />;
    case "gog":
      return <Icon icon="mdi:gog" width={30} className="mr-1" />;
    case "nintendo store":
      return <SiNintendo size={30} className="mr-1" />;
    case "google play":
      return <SiGoogleplay size={30} className="mr-1" />;

    default:
      return <FaShoppingCart size={30} className="mr-1" />;
  }
};

export default getStoreIcon;
