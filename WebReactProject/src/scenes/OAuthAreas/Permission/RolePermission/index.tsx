//#region  import
import * as React from "react";
import { useState } from "react";
import { L } from "../../../../lib/abpUtility";
import { Button, Card, Col, Form, Input, Modal, Row, Select, Switch, Table, Tag, Tooltip } from "antd";
import {
    DeleteOutlined, EditOutlined, ExclamationCircleOutlined, FilterOutlined, IdcardFilled, PlusOutlined, RedoOutlined, RetweetOutlined, SearchOutlined, SortAscendingOutlined,
} from "@ant-design/icons";
import moment from "moment";
import utils from "../../../../utils/utils";
import { MenuReadDto } from "./dtos/menuReadDto";
import Search from "../../../../components/Search";
import './style.css'
import MappingResource from "./components/mappingResource";

const { Option } = Select;

declare var abp: any;
//#endregion

const key = 'AtomicResource';

export interface IAtomicResourceProps {
    location: any;
}
const LocationKey = "CONST_TYPE_ATOMIC";
export default function AtomicResource(props: IAtomicResourceProps) {
    //#region START
    const [loadingAll, setloadingAll] = useState<boolean>(false);
    const [loadingTable, setloadingTable] = useState<boolean>(false);
    const [menuReadDto, setMenuReadDto] = useState<MenuReadDto[]>([]);
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
    //#region RESTART
    const _restartData = () => {

    };
    //#endregion
    //#region TABLE
    const dataColumn = [{
        field: "String",
        typeFld: "String",
        formatFld: "",
        width: 200
    },
    {
        field: "Number",
        typeFld: "Number",
        formatFld: "",
        width: 200
    },
    {
        field: "Date",
        typeFld: "Date",
        formatFld: "",
        width: 200
    },
    {
        field: "Boloean",
        typeFld: "Boolean",
        formatFld: "",
        width: 200
    }];

    dataColumn.push({ field: "Action", typeFld: "Action", formatFld: "", width: 200 });

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
                            onClick={() => {
                                onFill(text);
                            }}
                        ></Button>
                    </Tooltip>
                </div>
            ),
        },
    ];

    const [dataSelectFromTable, setdataSelectFromTable] = useState<React.Key[]>(
        []
    );
    const rowSelection = {
        onChange: (
            selectedRowKeys: React.Key[],
            selectedRows: MenuReadDto[]
        ) => {
            setdataSelectFromTable(selectedRowKeys);
        },
        getCheckboxProps: (record: MenuReadDto) => ({
            name: record.name,
        }),
    };
    //#endregion
    //#region REMOVE
    const _removeItemSelect = () => {
        Modal.confirm({
            title: <>{L("WANNING_PROCESSS_DELETE", "COMMON")}</>,
            icon: <ExclamationCircleOutlined />,
            content: <>{L("CONTENT_PROCESSS_DELETE", "COMMON")}</>,
            okText: <>{L("OK", "COMMON")}</>,
            cancelText: <>{L("CANCEL", "COMMON")}</>,
            onOk: () => {
                _restartData();
            },
        });
    };
    //#endregion
    //#region EDIT STATUS
    const _editItemSelect = () => {
        Modal.confirm({
            title: <>{L("WANNING_EDIT", "COMMON")}</>,
            icon: <ExclamationCircleOutlined />,
            content: <>{L("CONTENT_EDIT", "COMMON")}</>,
            okText: <>{L("OK", "COMMON")}</>,
            cancelText: <>{L("CANCEL", "COMMON")}</>,
            onOk: () => {
                _restartData();
            },
        });
    };
    //#endregion
    //#region INSERT OR UPDATE FORM DATA
    const [isModalVisible, setisModalVisible] = useState(false);
    const [isModalAdd, setisModalAdd] = useState(false);
    const [dataBeginEdit, setdataBeginEdit] = useState<
        MenuReadDto | undefined
    >(undefined);
    const [form] = Form.useForm();

    const onFill = (value: MenuReadDto | undefined) => {
        setdataBeginEdit(value);
        if (value === undefined) {
            setisModalAdd(true);
            form.resetFields();
            setisModalVisible(true);
        } else {
            setisModalAdd(false);
            form.setFieldsValue(value);
            setisModalVisible(true);
        }
    };

    const _onCancelModalAddOrEdit = () => {
        form
            .validateFields()
            .then((values: MenuReadDto) => {
                if (
                    values.name !== dataBeginEdit?.name
                ) {
                    _notificationEdit();
                } else {
                    form.setFieldsValue(undefined);
                    setisModalVisible(false);
                }
            })
            .catch((values) => {
                if (
                    values.values.description !== undefined ||
                    values.values.name !== undefined ||
                    values.values.typesRsc !== undefined ||
                    values.values.isActive !== undefined
                ) {
                    _notificationEdit();
                } else {
                    form.setFieldsValue(undefined);
                    setisModalVisible(false);
                }
            });
    };

    const _notificationEdit = () => {
        Modal.confirm({
            title: <>{L("WANNING_PROCESSS_DELETE", "COMMON")}</>,
            icon: <ExclamationCircleOutlined />,
            content: <>{L("CONTENT_CANCEL_EDIT", "COMMON")}</>,
            okText: <>{L("OK", "COMMON")}</>,
            cancelText: <>{L("CANCEL", "COMMON")}</>,
            onOk: () => {
                form.setFieldsValue(undefined);
                setisModalVisible(false);
            },
            onCancel: () => {
                setisModalVisible(true);
            },
        });
    };

    const _onOkModalAddOrEdit = () => {
        form.validateFields().then((values) => {

        });
    };
    //#endregion

    return (
        <>
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
                                onClick={() => {
                                    onFill(undefined);
                                }}
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
                                onClick={() => _restartData()}
                            >
                                {<RedoOutlined />}{L("REFRESH", "COMMON")}
                            </Button>
                            <Button
                                loading={loadingAll}
                                type="text"
                                onClick={() => _removeItemSelect()}
                                disabled={dataSelectFromTable.length === 0}
                                block
                            >
                                {<DeleteOutlined />}{L("DELETE", "COMMON")}
                            </Button>
                            <Button
                                loading={loadingAll}
                                type="text"
                                onClick={() => _editItemSelect()}
                                disabled={dataSelectFromTable.length === 0}
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
                                onClick={() => _restartData()}
                            >
                                {<FilterOutlined />}{L("REFRESH", "COMMON")}
                            </Button>
                            <Button
                                loading={loadingAll}
                                type="text"
                                onClick={() => _removeItemSelect()}
                                disabled={dataSelectFromTable.length === 0}
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
                        rowSelection={{
                            type: "checkbox",
                            ...rowSelection,
                        }}
                        rowKey={(record: MenuReadDto) => record.id}
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

            <Modal
                title={<>{isModalAdd ? L("ADD", "COMMON") : L("EDIT", "COMMON")}</>}
                visible={isModalVisible}
                onOk={() => {
                    _onOkModalAddOrEdit();
                }}
                onCancel={() => {
                    _onCancelModalAddOrEdit();
                }}
                okText={<>{L("OK", "COMMON")}</>}
                cancelText={<>{L("CANCEL", "COMMON")}</>}
                maskClosable={false}
                confirmLoading={loadingButton}
            >
                <Form layout="horizontal" {...formItemLayout} form={form}>
                    <Form.Item
                        label={L("ID", LocationKey)}
                        name="id"
                        hidden={isModalAdd}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label={L("NAME", LocationKey)}
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: <>{L("DO_NOT_LEAVE_THIS_BOX_BLANK", "COMMON")}</>,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={L("TYPES_RSC", LocationKey)}
                        name="typesRsc"
                        rules={[
                            {
                                required: true,
                                message: <>{L("DO_NOT_LEAVE_THIS_BOX_BLANK", "COMMON")}</>,
                            },
                        ]}
                    >
                        <Select>
                            {/* {Object.keys(confirmTypesMenu).map((key: any) => {
                                if (!isNaN(Number(key))) {
                                    return (
                                        <Option value={Number(key)}>
                                            {MenuConst[key]}
                                        </Option>
                                    );
                                }
                            })} */}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={L("DESCRIPTION", LocationKey)}
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: <>{L("DO_NOT_LEAVE_THIS_BOX_BLANK", "COMMON")}</>,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={L("IS_ACTIVE", LocationKey)}
                        name="isActive"
                        valuePropName="checked"
                        rules={[
                            {
                                required: true,
                                message: <>{L("DO_NOT_LEAVE_THIS_BOX_BLANK", "COMMON")}</>,
                            },
                        ]}
                    >
                        <Switch />
                    </Form.Item>
                </Form>
            </Modal>
            <MappingResource location={undefined}/>
{/* 
            <Search
                key={key}
                title="Tìm kiếm"
                show={true}
                onChange={(value) => { console.log(value); setsearch(false) }} /> */}
        </>
    )
};