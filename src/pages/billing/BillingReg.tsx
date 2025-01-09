import {
  Button,
  Form,
  FormProps,
  Input,
  InputNumber,
  Modal,
  Space,
} from "antd";
import { useState } from "react";
import { insert } from "../../apis/BillingApi";
import Billing from "../../constants/interfaces/Billing";
import Formatter from "../../utils/Formatter";

interface ComponentsProps {
  postSubmit: () => void;
}

const formItemLayout = {
  labelCol: {
    sm: { span: 4 },
  },
  wrapperCol: {
    sm: { span: 18 },
  },
};

const BillingReg = ({ postSubmit }: ComponentsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit: FormProps<Billing>["onFinish"] = (values) => {
    insert(values).then((result) => {
      if (result) {
        closeModal();
        postSubmit();
      }
    });
  };

  return (
    <>
      <Button type="primary" onClick={openModal}>
        등록
      </Button>
      <Modal
        open={isOpen}
        onCancel={closeModal}
        onOk={form.submit}
        title="사용내역 등록"
      >
        <br />
        <Form
          {...formItemLayout}
          form={form}
          onFinish={handleSubmit}
          initialValues={{
            useYmd: Formatter.formatDateToYYYYMMDD(new Date()),
          }}
        >
          <Form.Item<Billing>
            label="사용처"
            name={"expln"}
            rules={[{ required: true }]}
          >
            <Input placeholder="사용처를 입력하세요." />
          </Form.Item>
          <Form.Item<Billing>
            label="금액"
            name={"useAmt"}
            rules={[{ required: true }]}
          >
            <Space>
              <InputNumber
                placeholder="금액을 입력하세요."
                style={{ width: "100%" }}
              />
              <span className="ant-form-text" style={{ marginInlineStart: 8 }}>
                원
              </span>
            </Space>
          </Form.Item>
          <Form.Item<Billing>
            label="사용일자"
            name={"useYmd"}
            rules={[
              { required: true },
              {
                pattern: /^(20)\d{2}[0-1]\d[0-3]\d$/,
                message: "사용일자 항목은 YYYYMMDD 형식으로 입력해야 합니다.",
              },
            ]}
          >
            <Input
              placeholder="사용일자(YYYYMMDD)를 입력하세요."
              minLength={8}
              maxLength={8}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BillingReg;
