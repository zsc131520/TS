import React from "react";
import { Form, Input, Button, Checkbox, InputNumber, Switch, message } from 'antd';
import { WrappedFormUtils } from "antd/lib/form/Form";
import { IMovie } from '../services/MovieService';
import ImgUploader from "./ImgUploader";
import { withRouter, RouteComponentProps } from "react-router";


interface IFormProp extends RouteComponentProps {
    form: WrappedFormUtils<any>
    onSubmit: (movie: IMovie) => Promise<string>

    /**
     * 编辑电影时传入电影对象，可选的
     */
    movie?: IMovie
}

const formItemLayout = {
    labelCol: {
        span: 4
    },
    wrapperCol: {
        span: 19,
        offset: 1
    }
};
const AllAreas: { label: string, value: string }[] = [
    { label: '三亚', value: '三亚' },
    { label: '美国', value: '美国' },
    { label: '日本', value: '日本' },
    { label: '台湾', value: '台湾' },
    { label: '香港', value: '香港' },
    { label: '保山', value: '保山' },
    { label: '杭州', value: '杭州' },
    { label: '澳门', value: '澳门' }
];

const AreaGroups = Checkbox.Group;

const AllTypes: { label: string, value: string }[] = [
    { label: '喜剧', value: '喜剧' },
    { label: '灾难', value: '灾难' },
    { label: '动作', value: '动作' },
    { label: '恐怖', value: '恐怖' },
    { label: '悬疑', value: '悬疑' },
    { label: '综艺', value: '综艺' },
    { label: '动漫', value: '动漫' },
    { label: '爱情', value: '爱看' }
];

const TypeGroups = Checkbox.Group;

class MovieForm extends React.Component<IFormProp>{

    private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // 获取表单数据
        this.props.form.validateFields(async errors => {
            if (!errors) {
                const formData = this.props.form.getFieldsValue();
                const result = await this.props.onSubmit(formData as IMovie);
                if (result) {
                    message.error(result)
                }
                else {
                    message.success("处理成功", 1, () => {
                        // 跳转页面
                        this.props.history.push("/movie")
                    })
                }
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form
                onSubmit={this.handleSubmit.bind(this)}
                {...formItemLayout}
                style={{ width: "400px" }}>
                <Form.Item
                    label="电影名称"
                >
                    {getFieldDecorator<IMovie>('name', {
                        rules: [{ required: true, message: '请填写电影名称' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item
                    label="封面图"
                >
                    {getFieldDecorator<IMovie>('poster')(<ImgUploader />)}
                </Form.Item>
                <Form.Item
                    label="地区"
                >
                    {getFieldDecorator<IMovie>("areas", {
                        rules: [{ required: true, message: '请选择地区' }],
                    })(
                        <AreaGroups options={AllAreas}></AreaGroups>
                    )}
                </Form.Item>
                <Form.Item
                    label="类型"
                >
                    {getFieldDecorator<IMovie>("types", {
                        rules: [{ required: true, message: '请选择类型' }],
                    })(
                        <TypeGroups options={AllTypes}></TypeGroups>
                    )}
                </Form.Item>
                <Form.Item
                    label="时长(分钟)"
                >
                    {getFieldDecorator<IMovie>("timeLong", {
                        rules: [{ required: true, message: '请填写时长' }],
                    })(
                        <InputNumber min={1} step={10} />
                    )}
                </Form.Item>
                <Form.Item
                    label="正在热映"
                >
                    {getFieldDecorator<IMovie>("isHot", {
                        initialValue: false,
                        valuePropName: "checked"
                    })(
                        <Switch />
                    )}
                </Form.Item>
                <Form.Item
                    label="即将上映"
                >
                    {getFieldDecorator<IMovie>("isComing", {
                        initialValue: false,
                        valuePropName: "checked"
                    })(
                        <Switch />
                    )}
                </Form.Item>
                <Form.Item
                    label="经典影片"
                >
                    {getFieldDecorator<IMovie>("isClasic", {
                        initialValue: false,
                        valuePropName: "checked"
                    })(
                        <Switch />
                    )}
                </Form.Item>
                <Form.Item
                    label="描述"
                >
                    {getFieldDecorator<IMovie>("description")(
                        <Input.TextArea />
                    )}
                </Form.Item>
                <Form.Item
                    labelCol={{ span: 0 }}
                    wrapperCol={{ span: 19, offset: 5 }}
                >
                    <Button type="primary" htmlType="submit">提交</Button>
                </Form.Item>
            </Form>
        );
    }
}

type MovieFields = {
    [P in Exclude<keyof IMovie, "_id">]: any
};

function getDefaultField(movie: any): MovieFields {
    const obj: any = {};
    for (const key in movie) {
        obj[key] = Form.createFormField({
            value: movie[key]
        })
    }
    return obj;
}

export default withRouter(Form.create<IFormProp>({
    // 转入默认值到表单上
    mapPropsToFields: props => {
        if (props.movie) {
            return getDefaultField(props.movie)
        }
    }
})(MovieForm));