import { useEffect, useState } from "react";
import { getPlatform } from "../../api/api";
import LinuxIcon from "../assets/icons/linux.png";
import MacIcon from "../assets/icons/mac.png";
import WinIcon from "../assets/icons/windows.png";
import { storage } from "../../utils/storage";

const PLATFORM_KEY = "platform";

const PlatformBadge: React.FC = () => {
  const [platformName, setPlatformName] = useState<string>("");

  useEffect(() => {
    const cachedPlatform = storage.get<string>(PLATFORM_KEY);

    if (cachedPlatform) {
      setPlatformName(cachedPlatform);
    } else {
      getPlatform()
        .then((data) => {
          setPlatformName(data);
          storage.set(PLATFORM_KEY, data);
        })
        .catch((error) => console.error("Error fetching platform", error));
    }
  }, []);

  const getIconType = (platform: string) => {
    switch (platform) {
      case "Windows":
        return WinIcon;
      case "MacOS":
        return MacIcon;
      default:
        return LinuxIcon;
    }
  };

  if (!platformName) return null;

  return (
    <div className="inline-flex items-center rounded-md bg-blue-200 px-2 py-1 font-medium ring-1 ring-purple-700/10 ring-inset">
      <img
        src={getIconType(platformName)}
        alt={`${platformName}-icon`}
        width={16}
        height={16}
        className="mr-1"
      />
      <span className="text-blue-700 text-xs">{platformName}</span>
    </div>
  );
};

export default PlatformBadge;
