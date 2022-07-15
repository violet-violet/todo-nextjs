/* COMPONENTS */
import MainLayout from "../components/MainLayout"
import Tasks from "../components/Tasks"

/* CONST */
const subtitle = "Shop list"
const tasks = [
    {
        id: 1,
        text: "Лук",
        isCompleted: false,
    },
    {
        id: 2,
        text: "Картошка",
        isCompleted: false,
    },
    {
        id: 3,
        text: "Хлеб",
        isCompleted: false,
    },
]

const Shop = () => {
    return (
        <MainLayout subtitle={subtitle}>
            <Tasks defaultList={tasks} storageAddition="shop" />
        </MainLayout>
    )
}

export default Shop
