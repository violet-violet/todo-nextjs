/* COMPONENTS */
import MainLayout from "../components/MainLayout"
import Tasks from "../components/Tasks"

/* CONST */
const title = "TODOS"
const subtitle = "Basic list"

const Home = () => {
    return (
        <MainLayout title={title} subtitle={subtitle}>
            <Tasks />
        </MainLayout>
    )
}

export default Home
