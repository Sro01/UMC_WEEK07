import { useRef, useState } from "react";
import { X } from "lucide-react";

interface LpCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LpCreateModal: React.FC<LpCreateModalProps> = ({ isOpen, onClose }) => {
  const [imageSrc, setImageSrc] = useState("/images/me-again-cover.jpeg");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click(); // 이미지 클릭 시 파일 입력창 열기
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);

    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setImageSrc(newImageUrl);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <div className="flex justify-end gap-2 mb-4">
          <button
            type="button"
            onClick={() => onClose()}
            className="hover:cursor-pointer"
          >
            <X />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
          className="flex flex-col gap-3 modal-form"
        >
          <div
            className="modal-img hover:cursor-pointer"
            onClick={handleImageClick}
          >
            <img src={imageSrc} />
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />

          <input
            type="text"
            placeholder="LP Name"
            required
            className="modal-input"
          />
          <textarea placeholder="LP Content" required className="modal-input" />
          <input
            type="text"
            placeholder="LP Cover"
            required
            className="modal-input"
          />
          <div className="flex items-center gap-2">
            <input type="text" placeholder="Tag" className="modal-input" />
            <button className="text-black bg-gray-300 p-2 rounded hover:cursor-pointer">
              ADD
            </button>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button type="submit" className="add-button hover:cursor-pointer">
              Add LP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LpCreateModal;
