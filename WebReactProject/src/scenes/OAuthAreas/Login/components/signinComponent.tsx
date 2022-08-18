import * as React from 'react';
import { Button, Checkbox, Col, Divider, Input, Select } from 'antd';
import { L } from "../../../../lib/abpUtility";
import Form from 'antd/lib/form';
import '../style.css'
import { useState } from 'react';
import service from '../services'
import Authv2Component from './authv2Component';

const { Option } = Select;
//const key = 'login';

export interface ISigninProps {
    location: any;
}

export default function Signin(props: ISigninProps) {

    const [loadding, setloadding] = useState<boolean>(false);

    const onFinish = async (values: any) => {
        setloadding(true);
        let checktoken = await service.isTenantAvailable({ tenancyName: "Default" });
        console.log('Success:', checktoken);
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
                        <Option value="1">Not Identified</Option>
                        <Option value="2">Closed</Option>
                        <Option value="3">Communicated</Option>
                        <Option value="4">Identified</Option>
                        <Option value="5">Resolved</Option>
                        <Option value="6">Cancelled</Option>
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