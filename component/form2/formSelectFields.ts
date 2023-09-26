// [
//   {
//     inputType: "text",
//     preLabel: "Docter Diagnosis",
//     inputText: "",
//     postLabel: "",
//     inputCode: "DOCTOR",
//     inputCodeName: "Docter Diagnosis",
//   },
//   {
//     inputType: "number",
//     preLabel: "WBC Count",
//     inputText: "",
//     postLabel: "1000 / ml",
//     inputCode: "O_WBC",
//     inputCodeName: "WBC Count",
//   },
//   {
//     inputType: "text",
//     preLabel: "ค่าการวัดผลแลปอื่นๆ",
//     inputText: "",
//     postLabel: "",
//     inputCode: "O_LAB_OTHER",
//     inputCodeName: "ค่าการวัดผลแลปอื่นๆ",
//   },
//   {
//     inputType: "textarea",
//     preLabel: "ผลอื่นๆ",
//     inputText: "",
//     postLabel: "",
//     inputCode: "O_FREE_TEXT",
//     inputCodeName: "ผลอื่นๆ",
//   },
//   {
//     inputType: "range",
//     preLabel: "การส่งเสริม 1",
//     inputText: "",
//     postLabel: "",
//     inputCode: "I_11",
//     inputCodeName: "การส่งเสริม 1",
//   },
//   {
//     inputType: "datetime-local",
//     preLabel: "การส่งเสริม 2",
//     inputText: "",
//     postLabel: "",
//     inputCode: "I_12",
//     inputCodeName: "การส่งเสริม 2",
//   },
//   {
//     inputType: "file",
//     preLabel: "การป้องกัน 1",
//     inputText: "",
//     postLabel: "",
//     inputCode: "I_21",
//     inputCodeName: "การป้องกัน 1",
//   },
//   {
//     inputType: "date",
//     preLabel: "การป้องกัน 2",
//     inputText: "",
//     postLabel: "",
//     inputCode: "I_22",
//     inputCodeName: "การป้องกัน 2",
//   },
// ];

const OFields = [
  {
    inputType: "number",
    preLabel: "DTX",
    inputText: "",
    postLabel: "mg%",
    inputCode: "O_DTX",
    inputCodeName: "DTX",
  },
  {
    inputType: "number",
    preLabel: "GCS",
    inputText: "",
    postLabel: "mg%",
    inputCode: "O_GCS",
    inputCodeName: "GCS",
  },
  {
    inputType: "number",
    preLabel: "Ketone",
    inputText: "",
    postLabel: "mg%",
    inputCode: "O_KETONE",
    inputCodeName: "Ketone",
  },
  {
    inputType: "text",
    preLabel: "โรคประจำตัว",
    inputText: "",
    postLabel: "",
    inputCode: "PRECONDITION",
    inputCodeName: "โรคประจำตัว",
  },
  {
    inputType: "textarea",
    preLabel: "ผลอื่นๆ",
    inputText: "",
    postLabel: "",
    inputCode: "O_FREE_TEXT",
    inputCodeName: "ผลอื่นๆ",
  },
];

const SFields = [
  {
    inputType: "text",
    preLabel: "ข้อมูลจากผู้ป่วย",
    inputText: "",
    postLabel: "",
    inputCode: "S_PATIENT",
    inputCodeName: "ข้อมูลจากผู้ป่วย",
  },
  {
    inputType: "textarea",
    preLabel: "ข้อมูลอื่นๆ",
    inputText: "",
    postLabel: "",
    inputCode: "S_FREE_TEXT",
    inputCodeName: "ข้อมูลอื่นๆ",
  },
];

const EFields = [
  {
    inputType: "text",
    preLabel: "ข้อมูลจากผู้ป่วย",
    inputText: "",
    postLabel: "",
    inputCode: "S_PATIENT",
    inputCodeName: "ข้อมูลจากผู้ป่วย",
  },
  {
    inputType: "textarea",
    preLabel: "ข้อมูลอื่นๆ",
    inputText: "",
    postLabel: "",
    inputCode: "S_FREE_TEXT",
    inputCodeName: "ข้อมูลอื่นๆ",
  },
];

const IFields = [
  {
    inputType: "text",
    preLabel: "ข้อมูลจากผู้ป่วย",
    inputText: "",
    postLabel: "",
    inputCode: "S_PATIENT",
    inputCodeName: "ข้อมูลจากผู้ป่วย",
  },
  {
    inputType: "textarea",
    preLabel: "ข้อมูลอื่นๆ",
    inputText: "",
    postLabel: "",
    inputCode: "S_FREE_TEXT",
    inputCodeName: "ข้อมูลอื่นๆ",
  },
];

const NDXFields = [
  {
    inputType: "textarea",
    preLabel: "",
    inputText:
      "เสี่ยงต่อภาวะ Hyperglycemia และ Hypoglycemia เนื่องจาก ตับอ่อนสร้าง Insulin ลดลง",
    postLabel: "",
    inputCode: "NDX_DTX1",
    inputCodeName: "เสี่ยงต่อภาวะ Hyperglycemia และ Hypoglycemia",
  },
  {
    inputType: "textarea",
    preLabel: "",
    inputText: "เสี่ยงต่อการติดเชื้อ เพิ่มขึ้น เนื่องจากระบบภูมิคุ้มกันลดลง",
    postLabel: "",
    inputCode: "NDX_DTX2",
    inputCodeName: "เสี่ยงต่อการติดเชื้อเพิ่มขึ้น",
  },
];

export function getFormSelectFields(formType: string) {
  if (formType === "O") {
    return OFields;
  } else if (formType === "S") {
    return SFields;
  } else if (formType === "E") {
    return EFields;
  } else if (formType === "I") {
    return IFields;
  }else if (formType === "NDX") {
    return NDXFields;
  }else {
    return [];
  }
}
