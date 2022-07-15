/* COMPONENTS */
import MainLayout from "../components/MainLayout"
import Tasks from "../components/Tasks"

/* CONST */
const subtitle = "Movie list"
const tasks = [
    {
        id: 1,
        text: "Зеленая миля",
        isCompleted: false,
    },
    {
        id: 2,
        text: "Список Шиндлера",
        isCompleted: false,
    },
    {
        id: 3,
        text: "Форрест Гамп",
        isCompleted: false,
    },
]

const Movies = () => {
    return (
        <MainLayout subtitle={subtitle}>
            <Tasks defaultList={tasks} storageAddition="movies" />
        </MainLayout>
    )
}

export default Movies
