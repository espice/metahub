import Layout from "../components/Layout"
import Content from "../modules/Register"

export default function Register () {
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