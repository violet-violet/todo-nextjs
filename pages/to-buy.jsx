/* COMPONENTS */
import MainLayout from "../components/MainLayout"
import Tasks from "../components/Tasks"

export function getStaticProps() {
    return {
        props: {
            tasks: [
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
            ],
            subtitle: "Shop list",
        },
    }
}

const Shop = ({ tasks, subtitle }) => (
    <MainLayout subtitle={subtitle}>
        <Tasks defaultList={tasks} storageAddition="shop" />
    </MainLayout>
)

export default Shop
