/* COMPONENTS */
import MainLayout from "../components/MainLayout"
import Tasks from "../components/Tasks"

/* CONST */
const subtitle = "Empty list"

const Home = () => {
    return (
        <MainLayout subtitle={subtitle} isNoLink>
            <Tasks storageAddition="index" />
        </MainLayout>
    )
}

export default Home
