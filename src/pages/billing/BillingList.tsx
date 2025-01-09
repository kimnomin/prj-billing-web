import { Button, Space, Table, TableColumnsType, theme } from "antd";
import { useEffect, useState } from "react";

import ArrayUtils from "../../utils/ArrayUtils";
import Formatter from "../../utils/Formatter";
import Billing from "../../constants/interfaces/Billing";
import BillingReg from "./BillingReg";
import CpProcCheckbox from "./CpProcCheckbox";
import { getList, procAmount } from "../../apis/BillingApi";

const BillingList = () => {
  const [sumAmount, setSumAmount] = useState<number>(0);
  const [selectedRows, setSelectedRows] = useState<Array<number>>([]);
  const [list, setList] = useState<Array<Billing> | undefined>();

  const init = () => {
    setSumAmount(0);
    setSelectedRows([]);
  };

  const postCheck = (sn: number) => {
    const temp = [...selectedRows];
    const idx = temp.indexOf(sn);
    if (idx > -1) {
      temp.splice(idx, 1);
    } else {
      temp.push(sn);
    }
    setSelectedRows(temp);

    if (list) {
      const sum = ArrayUtils.sumByKeys(list, temp, "sn", "useAmt");
      setSumAmount(sum);
    }
  };

  const columns: TableColumnsType<Billing> = [
    {
      title: "설명",
      dataIndex: "expln",
    },
    {
      title: "금액",
      dataIndex: "useAmt",
      render: (value: number) => Formatter.addComma(value) + " 원",
    },
    {
      title: "사용일",
      dataIndex: "useYmd",
      sorter: (a: Billing, b: Billing) => a.useYmd.localeCompare(b.useYmd),
      render: (value: string) => Formatter.formatDate(value),
    },
    {
      title: "처리여부",
      dataIndex: "prcsYn",
      render: (value: string, record: Billing) =>
        value == "Y" ? (
          "처리완료"
        ) : (
          <CpProcCheckbox data={record} postCheck={postCheck} />
        ),
    },
    {
      title: "처리일시",
      dataIndex: "prcsDt",
      render: (value: string) =>
        !value
          ? ""
          : new Intl.DateTimeFormat("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            }).format(new Date(value)),
    },
  ];

  const fillList = async () => {
    const resp = await getList();

    if (resp) {
      setList(resp.data as Array<Billing>);

    }
  };

  const cbPostSubmit = () => fillList();
  const handleProcAmount = async () => {
    const res = await procAmount(selectedRows);

    if (res) {
      fillList();
      init();
    }
  };

  useEffect(() => {
    fillList();
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div
      style={{
        background: colorBgContainer,
        minHeight: 280,
        padding: 24,
        borderRadius: borderRadiusLG,
      }}
    >
      <Space
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div>
          <BillingReg postSubmit={cbPostSubmit} />
        </div>
        <div>
          {sumAmount > 0 && (
            <Button type="primary" onClick={handleProcAmount}>
              {sumAmount > 0
                ? Formatter.addComma(sumAmount) + " 원 처리완료"
                : ""}
            </Button>
          )}
        </div>
      </Space>
      <Table<Billing>
        rowKey={"sn"}
        columns={columns}
        dataSource={list}
        pagination={false}
        scroll={{ y: 500 }}
      />
    </div>
  );
};

export default BillingList;
