//#region  import
import * as React from "react";
import { useEffect, useState } from "react";
import { L } from "../../../../lib/abpUtility";
import {
    Button, Col, Form, Input, Modal, Row, Select, Switch, Table, Tag, Tooltip
} from "antd";
import {
    DeleteOutlined, EditOutlined, ExclamationCircleOutlined, FilterOutlined, PlusOutlined, RedoOutlined, RetweetOutlined, SearchOutlined, SortAscendingOutlined,
} from "@ant-design/icons";
import moment from "moment";
import utils from "../../../../utils/utils";
import './style.css'
import { ReadPageLstResourceDto } from "./dtos/readPageLstResourceDto";
import services from './services';
import { TypesRsc } from "./enum/typesRsc";
import { notifyError } from "../../../../components/Common/notification";
import useDebounce from "../../../../components/Common/search";

const { Option } = Select;

declare var abp: any;
//#endregion

const key = 'AtomicResource';

export interface IAtomicResourceProps {
    location: any;
}
const LocationKey = "CONST_TYPE_ATOMIC";

let formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
    },
};

export default function AtomicResource(props: IAtomicResourceProps) {

    //#region START
    const [loadingAll, setloadingAll] = useState<boolean>(false);
    const [loadingTable, setloadingTable] = useState<boolean>(false);
    const [pageSize, setpageSize] = useState<number>(0);
    const [pageIndex, setpageIndex] = useState<number>(0);
    const [totalCount, settotalCount] = useState<number>(0);
    const [loadingButton, setloadingButton] = useState<boolean>(false);
    const [search, setsearch] = useState<string>();
    const [data, setdata] = useState<ReadPageLstResourceDto[]>([]);
    const [isModalVisible, setisModalVisible] = useState(false);
    const [isModalAdd, setisModalAdd] = useState(false);
    const [dataBeginEdit, setdataBeginEdit] = useState<
        ReadPageLstResourceDto | undefined
    >(undefined);

    //#endregion
    //#region RESTART
    const fetdataSearch = () => {
        setloadingTable(true);
    }

    const _restartData = () => {
        setdata([]);
        setsearch('');
        settotalCount(0);
        setloadingTable(false);
        setpageSize(20);
        fetdataSearch();
    };
    //#endregion
    //#region TABLE

    const columns = [
        {
            title: L("key", LocationKey),
            dataIndex: "key",
        },
        {
            title: L("name", LocationKey),
            dataIndex: "name",
        },
        {
            title: L("typesRsc", LocationKey),
            dataIndex: "typesRsc",
            render: (text: number) => (
                <Tag color={utils._randomColor(text)}>{TypesRsc[text]}</Tag>
            ),
        },
        {
            title: L("description", LocationKey),
            dataIndex: "description",
        },
        {
            title: L("isActived", LocationKey),
            dataIndex: "isActived",
            key: "isActived",
            render: (text: boolean) =>
                text === true ? (
                    <Tag color={utils._randomColor(text)}>True</Tag>
                ) : (
                    <Tag color={utils._randomColor(text)}>False</Tag>
                ),
        },
        {
            title: L("createByName", LocationKey),
            dataIndex: "createByName",
            render: (text: string) =>
                text !== null && (text.toUpperCase() !== "ADMIN" || text.toUpperCase() !== "SYSTEM") ? (
                    <Tag color="#b3d4ff">{text}</Tag>
                ) : (
                    <Tag color="#2db7f5">{"SYSTEM"}</Tag>
                ),
        },
        {
            title: L("updatedOnUtc", LocationKey),
            dataIndex: "updatedOnUtc",
            render: (text: Date) => moment(text).format("DD/MM/YYYY hh:mm:ss"),
        },
        {
            title: L("updatedOnUtc", LocationKey),
            dataIndex: "createdOnUtc",
            render: (text: Date) => moment(text).format("DD/MM/YYYY hh:mm:ss"),
        },
        {
            title: L("ACTION", "COMMON"),
            key: "x",
            width: 120,
            render: (text: ReadPageLstResourceDto) => (
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
            selectedRows: ReadPageLstResourceDto[]
        ) => {
            setdataSelectFromTable(selectedRowKeys);
        },
        getCheckboxProps: (record: ReadPageLstResourceDto) => ({
            name: record.name,
        }),
    };

    //#endregion

    useEffect(() => {
        fetdataSearch();
    }, []);

    useEffect(() => {
        fetdataSearch();
    }, [pageIndex, pageSize, search])

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
    const [form] = Form.useForm();

    const onFill = (value: ReadPageLstResourceDto | undefined) => {
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
            .then((values: ReadPageLstResourceDto) => {
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

    const _searchDataOnClick = (page: number, pageSize: number) => {
        setpageSize(pageSize);
        setpageIndex(page);
    }

    const _onOkModalAddOrEdit = () => {
        setloadingButton(true);
        form.validateFields().then((values) => {
            services.createResource(values)
                .then(rs => {
                    if (rs.error) {
                        notifyError("sdadasd", "dsadasdas");
                    }
                    else {

                    }
                }).catch(er => {

                });
        });
    };

    var timeout: any = 0;
    const _onchangeInput = (text: any) => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(function () {
            setsearch(text.target.value);
        }, 500)
    }

    const _selectFileExport = (value: any) => {
        console.log('value :>> ', value);
    }
    //#endregion
    return (
        <>
            <Row gutter={[10, 10]}>
                <Col span={24}>
                    <Row gutter={[10, 10]} className="ZrJziiKjUH">
                        <Col span={12} className="JUVFCIUZTy">
                            <Input
                                className="kkLwRiTajL"
                                allowClear
                                onChange={(text: any) => _onchangeInput(text)}
                                placeholder={L("SEARCH_INPUT", "COMMON")}
                                prefix={<SearchOutlined />} />
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
                                onChange={(value: any) => _selectFileExport(value)}
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
                        dataSource={data}
                        rowSelection={{
                            type: "checkbox",
                            ...rowSelection,
                        }}
                        rowKey={(record: ReadPageLstResourceDto) => record.id}
                        loading={loadingTable}
                        style={{ width: "100%" }}
                        size="small"
                        pagination={{
                            pageSize: pageSize,
                            total: totalCount,
                            defaultCurrent: 1,
                            onChange: (page: number, pageSize: number | undefined) =>
                                _searchDataOnClick(page, pageSize ?? 20),
                            showSizeChanger: true,
                            pageSizeOptions: ["1", "10", "20", "50", "100"],
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
                        label={L("name", LocationKey)}
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: <>{L("NOT_NULL", "COMMON")}</>,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={L("typesRsc", LocationKey)}
                        name="typesRsc"
                        rules={[
                            {
                                required: true,
                                message: <>{L("NOT_NULL", "COMMON")}</>,
                            },
                        ]}
                    >
                        <Select>
                            { }
                            {Object.keys(TypesRsc).map((key: any) => {
                                if (!isNaN(Number(key))) {
                                    return (
                                        <Option value={Number(key)}>
                                            {TypesRsc[key]}
                                        </Option>
                                    );
                                }
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={L("description", LocationKey)}
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: <>{L("NOT_NULL", "COMMON")}</>,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={L("isActived", LocationKey)}
                        name="isActived"
                        valuePropName="checked"
                        rules={[
                            {
                                required: true,
                                message: <>{L("NOT_NULL", "COMMON")}</>,
                            },
                        ]}
                    >
                        <Switch />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
};