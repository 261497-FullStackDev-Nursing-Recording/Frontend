import { Card, Text } from "@mantine/core";

export default function P_Card() {
  return (
    <div>
      <Card
        // shadow="lg"
        // padding="xl"
        // component="a"
        // href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        className="w-4/5 flex flex-row justify-between bg-[#d0ebfd] font-semibold mb-[10px] mx-[10%] pl-[30px] rounded-[10px]"
      >
        {/* <Text weight={500} size="lg" mt="md">
          You&apos;ve won a million dollars in cash!
        </Text>

        <Text mt="xs" color="dimmed" size="sm">
          Please click anywhere on this card to claim your reward, this is not a
          fraud, trust us
        </Text> */}

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
