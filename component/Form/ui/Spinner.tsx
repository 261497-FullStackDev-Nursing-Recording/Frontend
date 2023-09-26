import { Loader2 } from "lucide-react";
import { FC } from "react";

const Spinner: FC = () => {
  return <Loader2 className="h-4 w-4 animate-spin" />;
};

export default Spinner;
