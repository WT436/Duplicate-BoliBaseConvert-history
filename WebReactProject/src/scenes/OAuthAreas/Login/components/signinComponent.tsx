import * as React from 'react';
import { Button, Checkbox, Col, Divider, Input, Select } from 'antd';
import { L } from "../../../../lib/abpUtility";
import Form from 'antd/lib/form';
import '../style.css'
import { useEffect, useState } from 'react';
import service from '../services'
import Authv2Component from './authv2Component';
import { TenantCommonDto } from '../dtos/tenantRep';
import { notifyError } from '../../../../components/Common/notification';
import { ToClientException } from '../../../../services/dto/clientExceptionDto';

const { Option } = Select;
declare var abp: any;
//const key = 'login';

export interface ISigninProps {
    location: any;
}

export default function Signin(props: ISigninProps) {

    const [loadding, setloadding] = useState<boolean>(false);
    const [tenantCommon, settenantCommon] = useState<TenantCommonDto[]>([]);

    const _fetchData = async () => {

        let result = await service.loadTenant({
            propertySearch: [],
            valuesSearch: [],
            propertyOrder: undefined,
            valueOrderBy: true,
            pageIndex: 1,
            pageSize: 20
        });

        console.log('result :>> ', result);

        if (result && !result.error) {
            settenantCommon(result.result?.items);
        }
        else {
            let errorMessage = ToClientException(result.messageError);
            notifyError("Đã sảy ra lỗi nội bộ", errorMessage.content);
        }
    }

    useEffect(() => {
        _fetchData();
    }, [])

    const onFinish = async (values: any) => {
        setloadding(true);
        let checktoken = await service.isTenantAvailable({ tenancyName: values.tenant });
        if (checktoken && !checktoken.error) {
            abp.multiTenancy.setTenantIdCookie(checktoken.result.tenantId);
            let dataAuth = await service.loggin(
                {
                    usernameOrEmailAddress: values.username,
                    password: values.password
                },
                checktoken.result.tenantId);

            if (dataAuth && !dataAuth.error) {
                console.log('dataAuth :>> ', dataAuth);
                // cấu hình token
                abp.auth.setToken(dataAuth.result.accessToken);
                // cấu hình access token
            }
            else {
                notifyError("Cảnh Báo", "Thông tin tài khoản mật khẩu không chính xác!");
            }
        }
        else {
            notifyError("Cảnh Báo", checktoken?.messageError);
        }

        await service.authenticate(undefined);
        setloadding(false);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Col className='QGschfHCeo'>
            <Form
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className='fxgoyaPanE'
            >
                <div className='URQKddgnba'>
                    <img src="./logo512.png" alt="" />
                </div>
                <div className='nRqxyzTkGx'>
                    <span className="ant-form-text">{L("Đăng Nhập", "COMMON")}</span>
                </div>
                <Form.Item
                    label={L("Phân hệ", "COMMON")}
                    name="tenant"
                    style={{ cursor: 'pointer' }}
                >
                    <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder={L("Lựa chọn phân hệ", "COMMON")}
                        optionFilterProp="children"
                        filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA!.children as unknown as string)
                                .toLowerCase()
                                .localeCompare((optionB!.children as unknown as string).toLowerCase())
                        }
                    >
                        {tenantCommon
                            ? tenantCommon.map((m) => (<Option key={m.name} value={m.name}>{m.tenancyName}</Option>))
                            : <></>
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label={L("Tài khoản", "COMMON")}
                    name="username"
                    rules={[{ required: true, message: L("Tài khoản không được để trống!", "COMMON") }]}
                >
                    <Input placeholder={L("Tài khoản", "COMMON")} />
                </Form.Item>
                <Form.Item
                    label={L("Mật khẩu", "COMMON")}
                    name="password"
                    rules={[{ required: true, message: L("Mật khẩu không để trống!", "COMMON") }]}
                >
                    <Input.Password placeholder={L("Mật khẩu", "COMMON")} />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 4, span: 20 }}>
                    <Checkbox>{L("Remember me", "COMMON")}</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
                    <Button type="primary" loading={loadding} block htmlType="submit">
                        {L("Đăng Nhập", "COMMON")}
                    </Button>
                </Form.Item>
                <div className='PAutlFXLff'>
                    <div><a href="">{L("Đăng ký ngay!", "COMMON")}</a></div>
                    <div><a href="">{L("Đổi mật khẩu!", "COMMON")}</a></div>
                </div>
                <Divider orientation="center">Or</Divider>
                <Authv2Component location={undefined} />
            </Form>
        </Col>
    )
};