// 第三方组件
import React, { PureComponent } from "react";
import { Button, Form, Input, Drawer, Select } from "antd";

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

import { menuCategroy } from "utils/enum";

@Form.create()
class AddOrEditModal extends PureComponent {
  // 保存
  onSave = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values._id = this.props.rowData && this.props.rowData._id;
        this.props.onSave(values);
      }
    });
  };

  render() {
    const { rowData, appId } = this.props;
    const { getFieldDecorator } = this.props.form;

    // 模态框结构
    const formItemLayout = {
      labelCol: {
        xs: { span: 7 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 15 },
        sm: { span: 15 },
      },
    };
    const i18nKey = rowData
      ? rowData.i18nKey
      : `${appId && appId.toUpperCase()}_FF_`;
    const category = rowData ? rowData.category : "content";
    const zhCN = rowData ? rowData.zhCN : null;
    const enUS = rowData ? rowData.enUS : null;
    const wordClass = rowData ? rowData.wordClass : null;
    const description = rowData ? rowData.description : null;

    return (
      <Drawer
        title={rowData ? "编辑" : "新增"}
        width="40%"
        placement="right"
        visible={this.props.visible}
        onClose={this.props.onClose}
        destroyOnClose={true}
      >
        <Form>
          {(rowData || appId === "etime") && (
            <FormItem {...formItemLayout} label={"i18nKey" + "："}>
              {getFieldDecorator("i18nKey", {
                rules: [
                  {
                    required: true,
                    message: "i18nKey不能为空",
                  },
                ],
                initialValue: i18nKey,
              })(<Input disabled={rowData} />)}
            </FormItem>
          )}
          <FormItem {...formItemLayout} label={"分类" + "："}>
            {getFieldDecorator("category", {
              rules: [
                {
                  required: true,
                  message: "分类不能为空",
                },
              ],
              initialValue: category,
            })(
              <Select disabled={rowData}>
                {menuCategroy.map((item) => (
                  <Option value={item.value} key={item.value} title={item.name}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label={"中文" + "："}>
            {getFieldDecorator("zhCN", {
              initialValue: zhCN,
            })(<TextArea autoSize />)}
          </FormItem>
          <FormItem {...formItemLayout} label={"英文" + "："}>
            {getFieldDecorator("enUS", {
              initialValue: enUS,
            })(<TextArea autoSize />)}
          </FormItem>
          <FormItem {...formItemLayout} label={"词性" + "："}>
            {getFieldDecorator("wordClass", {
              initialValue: wordClass,
            })(<TextArea autoSize />)}
          </FormItem>
          <FormItem {...formItemLayout} label={"说明" + "："}>
            {getFieldDecorator("description", {
              initialValue: description,
            })(<TextArea autoSize />)}
          </FormItem>
        </Form>
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            borderTop: "1px solid #e9e9e9",
            padding: "10px 16px",
            background: "#fff",
            textAlign: "right",
          }}
        >
          <Button type="primary" onClick={this.onSave}>
            确定
          </Button>
        </div>
      </Drawer>
    );
  }
}

export default AddOrEditModal;
