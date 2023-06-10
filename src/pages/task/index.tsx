import { useState } from "react";
import { TaskProps } from "@/models/Task";
import { GetServerSideProps } from "next";
import TaskForm from "./form";
import { Card } from "@/components/card";

export default function IndexTask({ tasks }: HomeProps) {
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(prevState => !prevState);
    };

    return (
        <>
            <h1 className="container">
                Tasks |{" "}
                <button className={showForm ? "btn btn-danger" : "btn btn-primary round"} onClick={toggleForm}>{showForm ? "X" : "Nova Task"}</button>
            </h1>
            {showForm ? (
                <TaskForm />
            ) : (
                <section className="container d-flex justify-content-center">
                    <div className="d-flex flex-wrap">
                            {tasks.map(task => (        
                                <div key={task.id} className="w-33 p-2">
                                    <Card style={{maxWidth: '340px'}} task={task} />       
                                </div>
                            ))}
                    </div>
                </section>    
            )}
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const response = await fetch('https://taskin-backend-production.up.railway.app/api/task');
    const data = await response.json();
    
    return {
        props: {
            tasks: data
        }
    };
};

interface HomeProps {
    tasks: TaskProps[];
}
