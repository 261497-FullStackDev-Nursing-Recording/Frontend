import React from "react";

interface FieldProps {
	field: {
		created_at: string;
		field_code: string;
		field_post_label: string;
		field_pre_label: string;
		field_data: string;
		field_value: string;
		id: string;
		modified_at: string;
		record_id: string;
		user_id: string;
	};
}

const FieldComponent: React.FC<FieldProps> = ({ field }) => {
	return (
		<div className="box">
			<p>
				<strong>สร้างเมื่อ:</strong> {field.created_at}
			</p>
			<p>
				<strong>ประเภทบันทึก:</strong> {field.field_pre_label}
			</p>
			{/* <p>
        <strong>field_post_label:</strong> {field.field_post_label}
      </p> */}
			{/* <p>
        <strong>field_pre_label:</strong> {field.field_pre_label}
      </p> */}
			<p>
				<strong>ข้อมูลบันทึก:</strong> {field.field_data}
			</p>
			<p>
				<strong>แก้ไขเมื่อ:</strong> {field.modified_at}
			</p>
			{/* <p>
				<strong>record_id:</strong> {field.record_id}
			</p> */}
			{/* <p>
        <strong>user_id:</strong> {field.user_id}
      </p> */}
		</div>
	);
};

export default FieldComponent;
