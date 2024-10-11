import { RingLoader } from "react-spinners";

export const OverlayLoader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black/35 z-10 absolute top-0 left-0">
      <RingLoader />
    </div>
  );
};
