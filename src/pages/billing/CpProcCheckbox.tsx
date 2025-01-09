import { Checkbox } from "antd";
import Billing from "../../constants/interfaces/Billing";

interface ComponentsProps {
  data: Billing;
  postCheck: (sn: number) => void;
}

const CpProcCheckbox = ({ data, postCheck }: ComponentsProps) => {
  function handleCheckboxChange(sn: number) {
    postCheck(sn);
  }

  return <Checkbox onChange={() => handleCheckboxChange(data.sn)} />;
};

export default CpProcCheckbox;
