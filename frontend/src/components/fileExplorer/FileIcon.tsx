import csvIcon from "../assets/icons/csv.png";
import docxIcon from "../assets/icons/docx.png";
import exeIcon from "../assets/icons/exe.png";
import fileIcon from "../assets/icons/file.png";
import folderIcon from "../assets/icons/folder.png";
import imageIcon from "../assets/icons/image.png";
import jsonIcon from "../assets/icons/json.png";
import pdfIcon from "../assets/icons/pdf.png";
import rarIcon from "../assets/icons/rar.png";
import txtIcon from "../assets/icons/txt.png";
import zipIcon from "../assets/icons/zip.png";

const iconMap: Record<string, string> = {
  csv: csvIcon,
  docx: docxIcon,
  exe: exeIcon,
  file: fileIcon,
  folder: folderIcon,
  image: imageIcon,
  json: jsonIcon,
  pdf: pdfIcon,
  rar: rarIcon,
  txt: txtIcon,
  zip: zipIcon,
};

interface FileIconProps {
  type: "file" | "directory";
  extension?: string;
  className?: string;
}

const FileIcon: React.FC<FileIconProps> = ({ type, extension, className }) => {
  let iconSrc = fileIcon;

  if (type === "directory") {
    iconSrc = folderIcon;
  } else if (extension && iconMap[extension.toLowerCase()]) {
    iconSrc = iconMap[extension.toLowerCase()];
  }

  return <img src={iconSrc} alt={type} className={className || "w-6 h-6"} />;
};

export default FileIcon;
