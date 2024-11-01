import { BeatLoader } from "react-spinners";

export const OverlayLoader = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black/35 z-10  absolute top-0 left-0">
      <BeatLoader />
    </div>
  );
};
