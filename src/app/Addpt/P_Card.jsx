import { Card, Text } from "@mantine/core";

export default function P_Card() {
  return (
    <div>
      <Card
        // shadow="lg"
        // padding="xl"
        // component="a"
        // href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        className="w-4/5 flex flex-row justify-between bg-[#d0ebfd] font-semibold mb-[5px] mx-[10%] pl-[30px] rounded-[10px]"
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
        <button
          className="flex w-[45px] h-[40px] bg-transparent mr-[5px] mt-[15px] pt-[3px] border-[none]"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 46 46"
            fill="none"
          >
            <path
              d="M43.4444 25.5556H2.55556C1.15852 25.5556 0 24.397 0 23C0 21.603 1.15852 20.4444 2.55556 20.4444H43.4444C44.8415 20.4444 46 21.603 46 23C46 24.397 44.8415 25.5556 43.4444 25.5556Z"
              fill="#292D32"
            />
            <path
              d="M23 46C21.603 46 20.4445 44.8415 20.4445 43.4444V2.55554C20.4445 1.1585 21.603 -1.52588e-05 23 -1.52588e-05C24.3971 -1.52588e-05 25.5556 1.1585 25.5556 2.55554V43.4444C25.5556 44.8415 24.3971 46 23 46Z"
              fill="#292D32"
            />
          </svg>
        </button>
      </Card>
    </div>
  );
}
