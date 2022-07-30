import Layout from "../components/Layout"
import Content from "../modules/Login"

export default function Login () {
    return (
        <Layout
            page={{
                title: 'Welcome',
            }}
            >

            <Content/>
            
        </Layout>
    )
}