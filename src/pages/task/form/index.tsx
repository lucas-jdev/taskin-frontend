import { Status, convertStatusToString } from "@/models/Task";
import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function TaskForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(Status.NOT_STARTED);
    const router = useRouter();
    const { taskId } = router.query;

    useEffect(() => {
        if (taskId) {
            fetch(`https://taskin-backend-production.up.railway.app/api/task/${taskId}`)
                .then(async(response) => {
                    if(response.status >= 400){
                        const err = JSON.parse(JSON.stringify(await response.json()))
                        toast.error(err.message);
                        return;
                    }
                    return response.json()
                })
                .then(data => {
                    setTitle(data.title);
                    setDescription(data.description);
                    setStatus(data.status);
                });
        }
    }, [taskId]);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const endpoint = taskId ? `https://taskin-backend-production.up.railway.app/api/task/${taskId}` : "https://taskin-backend-production.up.railway.app/api/task";
        const method = taskId ? "PUT" : "POST";

        const options = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                description,
                status
            }),
        };
         
        await fetch(endpoint, options)
            .then(response => {
                const dataJSON = JSON.stringify(response.json())
                toast.info(JSON.parse(dataJSON))
                if (response.status >= 400) {
                    const err = JSON.parse(dataJSON)
                    toast.error(err.message);
                    return;
                }

                if (taskId) {
                    toast.warn('Tarefa atualizada');
                    router.push('/task');
                } else {
                    toast.success('Tarefa cadastrada');
                    router.push('/task');
                }
            });
        
    };

    return (
        <form className="container" method="post" onSubmit={handleSubmit}>
            <h1>{taskId ? "Edit Task" : "Create Task"}</h1>
            <div className="mb-3">
                <label 
                  className="form-label" 
                  htmlFor="titleTask"
                >
                    Título
                </label>
                <input 
                  className="form-control" 
                  type="text" 
                  name="title" 
                  id="titleTask" 
                  placeholder="Título..." 
                  value={title} 
                  onChange={event => setTitle(event.target.value)} />
            </div>
            <div className="mb-3">
                <label 
                  htmlFor="descriptionTask"
                  className="form-label"
                >
                    Descrição
                </label>
                <textarea
                  rows={3}
                  className="form-control"
                  name="description" 
                  placeholder="Descrição..."
                  id="descriptionTask" 
                  value={description} 
                  onChange={event => setDescription(event.target.value)}
                ></textarea>
            </div>
            {taskId && (
                <select
                  className="form-select" 
                  name="status" 
                  value={status} 
                  onChange={event => setStatus(event.target.value as Status)}>
                    <option value={Status.NOT_STARTED}>{convertStatusToString(Status.NOT_STARTED)}</option>
                    <option value={Status.IN_PROGRESS}>{convertStatusToString(Status.IN_PROGRESS)}</option>
                    <option value={Status.COMPLETED}>{convertStatusToString(Status.COMPLETED)}</option>
                </select>
            )}
            <br />
            <button 
              className={taskId ? "btn btn-warning" : "btn btn-success"} 
              type="submit"
            >
                {taskId ? "Update" : "Create"}
            </button>
        </form>
    );
}

