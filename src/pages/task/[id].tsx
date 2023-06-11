import { TaskProps } from "@/models/Task";
import { GetServerSideProps } from "next";
import Link from "next/link";

export default function TaskPost({ task }: Task) {
    return (
        <div className="container">
            <h1 className="title">
                {task.title}
            </h1>
            <p className="text">
                {task.description}
            </p>
            <div className="mt-2">
                <Link 
                  href={"/task"}
                  className="btn btn-primary m-md-1"
                >
                    Listagem
                </Link>
                <Link
                  href={`/task/form/${task.id}`}
                  className="btn btn-warning"
                >
                    Editar
                </Link>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const response = await fetch(`https://taskin-backend-production.up.railway.app/api/task/${params?.id}`)
    const data = await response.json()

    return {
        props: {
            task: data
        }
    }
}


interface Task {
    task: TaskProps;
}