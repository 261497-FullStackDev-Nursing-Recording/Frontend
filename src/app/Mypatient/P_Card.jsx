import { Card, Text } from "@mantine/core";

export default function P_Card() {
  return (
    <div>
      <Card className="w-4/5 flex flex-row justify-between bg-[#b2f5ea] font-semibold mb-[5px] mx-[10%] pl-[30px] pr-[20px] rounded-[10px] text-[#319795]">
        <div className="PText">
          <div className="mt-[10px]">
            <span className="NameTitle">นาย </span>
            <span className="PNameText">ณัฐพล สายทอง</span>
          </div>
          <div className="mt-[1px] mb-[10px]">
            <span className="IDText">ID </span>
            <span className="IDNo">XXXXXXXXXX</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
