import React,{Component} from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button,  Form, Input } from 'antd';
import { reqLogin } from '../../api';
import './login.css'
import 'antd/dist/antd.css'

const logo =  './images/login.jpg'
// 
class Login extends Component {

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.form.validateFields((err,values) =>{
            if(!err) {
                const {username,password} = values
                reqLogin(username,password).then(response=>{
                    console.log('dengluchenggong',response.data)
                }).catch(error=>{
                    console.log('denglushibai',error)
                })
            }else {

            }
        })
        const form = this.props.form
        const values = form.getFieldsValue()
        console.log('handleSubmit()')
    }

    render() {
        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo}></img>
                    <h1>React后台管理项目</h1>
                </header>
                <section className='login-content'>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        // onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' },
                                    { min:4,message:'用户明最少4位'},
                                    {max:12,message:'用户名最多12位'},
                                    {pattern:/^[a-zA-Z0-9_]+$/,message:'请输入正确的用户名'}
                        ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                           
                           
                        >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                        </Button>
                        
                    </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}

/*
1.高阶函数   (1) 一类特别的函数 a.接受函数类型的参数 b。返回值是函数 (2)
            (2)常见  a.定时器：setTimeout() / setInterval()
                b。Promise
                c。数组遍历相关的方法：forEach()/filte()/map()/reduce()/find()/findIndex()
                d. 函数对象的bind()
            (3) 高阶函数更加动态，更加具有扩展性
2.高阶组件      
    (1) 本质就是一个函数
    (2) 接收一个组件(被包装组件），返回一个新的组件（包装组件），包装组件会向被包装组件传入特定属性
    (3) 扩展组件的功能
*/

//包装Form组件生成一个新的组件
// 新组件会像Form传递一个强大的对象属性：form
const WrapLogin = Form.create()(Login)
export default WrapLogin

//前台表单验证    收集表单数据