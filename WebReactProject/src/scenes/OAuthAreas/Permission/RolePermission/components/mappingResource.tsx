import { EditOutlined, SearchOutlined, PlusOutlined, RedoOutlined, DeleteOutlined, RetweetOutlined, FilterOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { Button, Col, Input, Modal, Row, Select, Table, Tag, Tooltip } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';

import { L } from "../../../../../lib/abpUtility";
import utils from '../../../../../utils/utils';
import { MenuReadDto } from '../dtos/menuReadDto';

const { Option } = Select;

export interface IMappingResource {
    location: any;
}

const LocationKey = "MAPPING_RESOURCE_PERMISSION";

export default function MappingResource(props: IMappingResource) {
    const data = [{ name: "1", isActive: "true", typesRsc: "0", description: "Ví dụ", createByName: "Trần Hải Nam", updatedOnUtc: "12/12/2022", createdOnUtc: "12/12/2022" }]

    //#region START
    const [loadingAll, setloadingAll] = useState<boolean>(false);
    const [loadingTable, setloadingTable] = useState<boolean>(false);
    const [menuReadDto, setMenuReadDto] = useState<{
        name: string;
        isActive: string;
        typesRsc: string;
        description: string;
        createByName: string;
        updatedOnUtc: string;
        createdOnUtc: string;
    }[]>(data);
    const [pageSize, setpageSize] = useState<number>(0);
    const [totalCount, settotalCount] = useState<number>(0);
    const [loadingButton, setloadingButton] = useState<boolean>(false);
    const [search, setsearch] = useState(false);
    //#endregion
    //#region CSS Layout Item
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 18 },
        },
    };
    //#endregion
    const columns = [
        {
            title: L("NAME", LocationKey),
            dataIndex: "name",
        },
        {
            title: L("IS_ACTIVE", LocationKey),
            dataIndex: "isActive",
            key: "isActive",
            render: (text: boolean) =>
                text === true ? (
                    <Tag color={utils._randomColor(text)}>True</Tag>
                ) : (
                    <Tag color={utils._randomColor(text)}>False</Tag>
                ),
        },
        {
            title: L("TYPES_RSC_NAME", LocationKey),
            dataIndex: "typesRsc",
            render: (text: number) => (
                <Tag color={utils._randomColor(text)}>{L('MenuConst[text]', LocationKey)}</Tag>
            ),
        },
        {
            title: L("DESCRIPTION", LocationKey),
            dataIndex: "description",
        },
        {
            title: L("CREATE_BY_NAME", LocationKey),
            dataIndex: "createByName",
            render: (text: string) =>
                text.toUpperCase() === "ADMIN" || text.toUpperCase() === "SYSTEM" ? (
                    <Tag color="#b3d4ff">{text}</Tag>
                ) : (
                    <Tag color="#2db7f5">{text}</Tag>
                ),
        },
        {
            title: L("CREATE_DATE_UTC", LocationKey),
            dataIndex: "updatedOnUtc",
            render: (text: Date) => moment(text).format("DD/MM/YYYY hh:mm:ss"),
        },
        {
            title: L("UPDATE_DATE_UTC", LocationKey),
            dataIndex: "createdOnUtc",
            render: (text: Date) => moment(text).format("DD/MM/YYYY hh:mm:ss"),
        },
        {
            title: L("ACTION", "COMMON"),
            key: "x",
            width: 120,
            render: (text: MenuReadDto) => (
                <div style={{ textAlign: "center" }}>
                    <Tooltip title={L("EDIT", "COMMON")}>
                        <Button
                            type="link"
                            icon={<EditOutlined />}
                        ></Button>
                    </Tooltip>
                </div>
            ),
        },
    ];

    const rowSelection = {
        onChange: (
            selectedRowKeys: React.Key[],
            selectedRows: MenuReadDto[]
        ) => {
        },
        getCheckboxProps: (record: MenuReadDto) => ({
            name: record.name,
        }),
    };

    return (
        <>
            <Modal title="CHANGE_ROLE_AND_PERMISSON" visible={false} className={"SxwSbqQaIf"}>
                <Row gutter={[10, 10]}>
                    <Col span={24}>
                        <Row gutter={[10, 10]} className="ZrJziiKjUH">
                            <Col span={12} className="JUVFCIUZTy">
                                <Input className="kkLwRiTajL" placeholder="Tìm kiếm" prefix={<SearchOutlined />} />
                            </Col>
                            <Col span={12} className="JUVFCIUZTy" style={{ justifyContent: "flex-end" }}>
                                <Button
                                    loading={loadingAll}
                                    type="text"
                                    block
                                >{<PlusOutlined />} {L("ADD", "COMMON")}</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[10, 10]} className="ZrJziiKjUH">
                            <Col span={12} className="JUVFCIUZTy">
                                <Button
                                    loading={loadingAll}
                                    type="text"
                                    block
                                >
                                    {<RedoOutlined />}{L("REFRESH", "COMMON")}
                                </Button>
                                <Button
                                    loading={loadingAll}
                                    type="text"
                                    block
                                >
                                    {<DeleteOutlined />}{L("DELETE", "COMMON")}
                                </Button>
                                <Button
                                    loading={loadingAll}
                                    type="text"
                                    block
                                >{<RetweetOutlined />} {L("CHANGE", "COMMON")}</Button>
                                <Select
                                    placeholder={L("REPORT_FILE", "COMMON")}
                                    bordered={false}
                                >
                                    <Option value={0}>{L("SELECT", "COMMON")}</Option>
                                    <Option value={1}>{L("EXCEL", "COMMON")}</Option>
                                    <Option value={2}>{L("PDF", "COMMON")}</Option>
                                    <Option value={3}>{L("ALL", "COMMON")}</Option>
                                </Select>
                            </Col>
                            <Col span={12} className="JUVFCIUZTy" style={{ justifyContent: "flex-end" }}>
                                <Button
                                    loading={loadingAll}
                                    type="text"
                                    block
                                >
                                    {<FilterOutlined />}{L("REFRESH", "COMMON")}
                                </Button>
                                <Button
                                    loading={loadingAll}
                                    type="text"
                                    block
                                >
                                    {<SortAscendingOutlined />}{L("DELETE", "COMMON")}
                                </Button>
                                <Select
                                    placeholder={L("REPORT_FILE", "COMMON")}
                                    bordered={false}
                                >
                                    <Option value={0}>{L("SELECT", "COMMON")}</Option>
                                    <Option value={1}>{L("EXCEL", "COMMON")}</Option>
                                    <Option value={2}>{L("PDF", "COMMON")}</Option>
                                    <Option value={3}>{L("ALL", "COMMON")}</Option>
                                </Select>
                            </Col>
                        </Row>
                    </Col>
                    <Col style={{ margin: "10px 0", width: "100%" }}>
                        <Table
                            columns={columns}
                            dataSource={menuReadDto}
                            // rowSelection={{
                            //     type: "checkbox",
                            //     ...rowSelection,
                            // }}
                            //rowKey={(record: MenuReadDto) => record.id}
                            loading={loadingTable}
                            style={{ width: "100%" }}
                            size="small"
                            pagination={{
                                pageSize: pageSize,
                                total: totalCount,
                                defaultCurrent: 1,
                                // onChange: (page: number, pageSize?: number | undefined) =>
                                //     _searchDataOnClick(page, pageSize, false),
                                showSizeChanger: true,
                                pageSizeOptions: ["5", "10", "20", "50", "100"],
                            }}
                        />
                    </Col>
                </Row>
            </Modal>
            <Modal title="CHANGE_CONNECT_PERMISSION" visible={false} className={"iJftpaETov"}>
                <Row gutter={[10, 10]}>
                    <Col span={24}>
                        <Row gutter={[10, 10]} className="ZrJziiKjUH">
                            <Col span={12} className="JUVFCIUZTy">
                                <Input className="kkLwRiTajL" placeholder="Tìm kiếm" prefix={<SearchOutlined />} />
                            </Col>
                        </Row>
                    </Col>
                    <Col style={{ margin: "10px 0", width: "100%" }}>
                        <Table
                            columns={columns}
                            dataSource={menuReadDto}
                            // rowSelection={{
                            //     type: "checkbox",
                            //     ...rowSelection,
                            // }}
                            //rowKey={(record: MenuReadDto) => record.id}
                            loading={loadingTable}
                            style={{ width: "100%" }}
                            size="small"
                            pagination={{
                                pageSize: pageSize,
                                total: totalCount,
                                defaultCurrent: 1,
                                // onChange: (page: number, pageSize?: number | undefined) =>
                                //     _searchDataOnClick(page, pageSize, false),
                                showSizeChanger: true,
                                pageSizeOptions: ["5", "10", "20", "50", "100"],
                            }}
                        />
                    </Col>
                </Row>
            </Modal>
        </>
    )
};
